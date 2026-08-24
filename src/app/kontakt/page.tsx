import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z EDMAT w Krośnie — telefon, e-mail, adres i formularz kontaktowy. Zapytaj o wycenę mebli na wymiar lub osłon okiennych.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.mapsQuery)}`;

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Kontakt" }]} />
        </div>
      </div>

      <section className="bg-paper py-12 sm:py-16">
        <div className="container-edmat">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Kontakt</span>
          <h1 className="mt-4 text-balance text-4xl sm:text-5xl">Porozmawiajmy o Twoim wnętrzu</h1>
          <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-ink-soft">
            Zadzwoń, napisz lub odwiedź nas w Krośnie — odpowiemy na pytania i umówimy bezpłatny pomiar.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-ink">Telefon</h2>
                <a href={siteConfig.contact.phoneHref} className="mt-1 block text-2xl text-accent">
                  {siteConfig.contact.phone}
                </a>
                <a href={siteConfig.contact.phoneMobileHref} className="mt-1 block text-ink-soft">
                  {siteConfig.contact.phoneMobile} ({siteConfig.contact.phoneMobileContact})
                </a>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-ink">E-mail</h2>
                <a href={siteConfig.contact.emailHref} className="mt-1 block text-lg text-accent">
                  {siteConfig.contact.email}
                </a>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-ink">Adres</h2>
                <address className="mt-1 not-italic leading-relaxed text-ink-soft">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </address>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                >
                  Zobacz na mapie <span aria-hidden="true">→</span>
                </a>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-ink">Godziny otwarcia</h2>
                <ul className="mt-1 space-y-1 text-ink-soft">
                  {siteConfig.hours.map((entry) => (
                    <li key={entry.days} className="flex justify-between gap-6">
                      <span>{entry.days}</span>
                      <span>{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-ink">Social media</h2>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-accent"
                >
                  Facebook <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="border border-line bg-white p-6 sm:p-8">
              <h2 className="text-2xl">Formularz kontaktowy</h2>
              <p className="mt-2 text-sm text-ink-soft">Odpowiemy najszybciej, jak to możliwe.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
