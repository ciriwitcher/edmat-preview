import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const furnitureLinks = [
  { label: "Meble kuchenne", href: "/meble-na-wymiar/kuchenne" },
  { label: "Szafy na wymiar", href: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy" },
  { label: "Meble do salonu", href: "/meble-na-wymiar/do-salonu" },
  { label: "Meble do sypialni", href: "/meble-na-wymiar/do-sypialni" },
  { label: "Meble łazienkowe", href: "/meble-na-wymiar/lazienkowe" },
  { label: "Meble biurowe", href: "/meble-na-wymiar/biurowe" },
];

const windowLinks = [
  { label: "Rolety", href: "/rolety" },
  { label: "Żaluzje", href: "/zaluzje" },
  { label: "Moskitiery", href: "/moskitiery" },
  { label: "Rolety zewnętrzne", href: "/rolety/zewnetrzne" },
  { label: "Żaluzje aluminiowe", href: "/zaluzje/aluminiowe" },
  { label: "Moskitiery okienne", href: "/moskitiery/okienne" },
];

const companyLinks = [
  { label: "O firmie", href: "/o-firmie" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Promocje", href: "/promocje" },
  { label: "FAQ", href: "/najczestsze-pytania-faq" },
  { label: "Mapa witryny", href: "/mapa-witryny" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="container-edmat py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl font-semibold">
              <span className="text-accent">Ed</span>mat
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
              Meble na wymiar oraz osłony okienne — projekt, produkcja i montaż w Krośnie od {siteConfig.foundedYear} roku.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="EDMAT na Facebooku"
                className="flex h-10 w-10 items-center justify-center border border-paper/25 text-paper/80 transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.7 1.7-1.7H16.6V3.1C16.3 3.1 15.3 3 14.1 3 11.6 3 10 4.5 10 7.3v2.7H7.4v3.5H10V21h3.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">Meble na wymiar</p>
            <ul className="space-y-2.5 text-sm text-paper/80">
              {furnitureLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">Osłony okienne</p>
            <ul className="space-y-2.5 text-sm text-paper/80">
              {windowLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
            <p className="mb-4 mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">Firma</p>
            <ul className="space-y-2.5 text-sm text-paper/80">
              {companyLinks.slice(0, 3).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">Kontakt</p>
            <ul className="space-y-3 text-sm text-paper/80">
              <li>
                <address className="not-italic">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </address>
              </li>
              <li>
                <a href={siteConfig.contact.phoneHref} className="hover:text-accent">{siteConfig.contact.phone}</a>
              </li>
              <li>
                <a href={siteConfig.contact.emailHref} className="hover:text-accent">{siteConfig.contact.email}</a>
              </li>
              <li className="pt-2 text-paper/60">
                {siteConfig.hours[0].days}: {siteConfig.hours[0].hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} EDMAT. Wszelkie prawa zastrzeżone.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/polityka-prywatnosci" className="hover:text-accent">Polityka prywatności</Link>
            <Link href="/mapa-witryny" className="hover:text-accent">Mapa witryny</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
