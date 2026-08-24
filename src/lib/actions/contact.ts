"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko.").max(120),
  contactMethod: z.string().trim().min(5, "Podaj numer telefonu lub adres e-mail.").max(160),
  interest: z.enum(["meble-na-wymiar", "oslony-okienne", "inne"], {
    message: "Wybierz rodzaj zainteresowania.",
  }),
  message: z.string().trim().min(10, "Wiadomość jest zbyt krótka.").max(2000),
  consent: z.literal("on", { message: "Zgoda jest wymagana." }),
  // honeypot — pole niewidoczne dla ludzi, wypełniane tylko przez boty
  website: z.string().max(0).optional().or(z.literal("")),
});

const interestLabels: Record<string, string> = {
  "meble-na-wymiar": "Meble na wymiar",
  "oslony-okienne": "Osłony okienne",
  inne: "Inne",
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    contactMethod: String(formData.get("contactMethod") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: String(formData.get("consent") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Sprawdź poprawność formularza.", fieldErrors };
  }

  if (parsed.data.website) {
    // Honeypot wypełniony — prawdopodobnie bot. Udajemy sukces, nic nie zapisujemy.
    return { status: "success" };
  }

  const { name, contactMethod, interest, message } = parsed.data;
  const interestLabel = interestLabels[interest] ?? interest;

  let emailDelivered = false;
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmailTo = process.env.CONTACT_EMAIL_TO || siteConfig.contact.email;

  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_EMAIL_FROM || "EDMAT — formularz kontaktowy <onboarding@resend.dev>",
          to: [contactEmailTo],
          reply_to: undefined,
          subject: `Nowe zapytanie ze strony — ${interestLabel}`,
          text: `Imię i nazwisko: ${name}\nKontakt: ${contactMethod}\nRodzaj zainteresowania: ${interestLabel}\n\nWiadomość:\n${message}`,
        }),
      });
      emailDelivered = response.ok;
      if (!response.ok) {
        console.error("Resend API error", await response.text());
      }
    } catch (error) {
      console.error("Nie udało się wysłać e-maila przez Resend:", error);
    }
  }

  let savedToDatabase = false;
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      contact_method: contactMethod,
      interest: interestLabel,
      message,
      email_delivered: emailDelivered,
    });
    savedToDatabase = !error;
    if (error) console.error("Nie udało się zapisać zgłoszenia w Supabase:", error.message);
  }

  if (!emailDelivered && !savedToDatabase) {
    return {
      status: "error",
      message:
        "Nie udało się wysłać formularza — usługa wysyłki e-mail nie jest jeszcze skonfigurowana. Prosimy o kontakt telefoniczny lub e-mail bezpośrednio.",
    };
  }

  return { status: "success" };
}
