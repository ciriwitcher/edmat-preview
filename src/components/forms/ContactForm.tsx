"use client";

import { useActionState, useRef, useEffect } from "react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

const interestOptions = [
  { value: "meble-na-wymiar", label: "Meble na wymiar" },
  { value: "oslony-okienne", label: "Osłony okienne" },
  { value: "inne", label: "Inne" },
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="border border-accent bg-accent/5 p-8 text-center">
        <p className="font-display text-2xl text-ink">Dziękujemy za wiadomość!</p>
        <p className="mt-3 text-ink-soft">Odpowiemy najszybciej, jak to możliwe — zwykle w ciągu 1–2 dni roboczych.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
      {/* Honeypot — ukryte pole dla botów */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Zostaw to pole puste</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          Imię i nazwisko
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full border border-line bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-accent"
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-accent">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contactMethod" className="mb-2 block text-sm font-medium text-ink">
          Telefon lub e-mail
        </label>
        <input
          id="contactMethod"
          name="contactMethod"
          type="text"
          required
          autoComplete="tel"
          aria-invalid={Boolean(errors.contactMethod)}
          aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}
          className="w-full border border-line bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-accent"
        />
        {errors.contactMethod && (
          <p id="contactMethod-error" className="mt-1.5 text-sm text-accent">
            {errors.contactMethod}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-ink">Czego dotyczy zapytanie?</legend>
        <div className="flex flex-wrap gap-4">
          {interestOptions.map((option) => (
            <label key={option.value} className="flex min-h-11 items-center gap-2 text-sm text-ink-soft">
              <input type="radio" name="interest" value={option.value} required defaultChecked={option.value === "meble-na-wymiar"} />
              {option.label}
            </label>
          ))}
        </div>
        {errors.interest && <p className="mt-1.5 text-sm text-accent">{errors.interest}</p>}
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full border border-line bg-white px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-accent"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-accent">
            {errors.message}
          </p>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          Wyrażam zgodę na przetwarzanie moich danych osobowych przez EDMAT w celu udzielenia odpowiedzi na
          zapytanie, zgodnie z{" "}
          <a href="/polityka-prywatnosci" className="underline hover:text-accent">
            polityką prywatności
          </a>
          .
        </span>
      </label>
      {errors.consent && <p className="text-sm text-accent">{errors.consent}</p>}

      {state.status === "error" && state.message && (
        <div role="alert" className="border border-accent bg-accent/5 px-4 py-3 text-sm text-accent">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {isPending ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
