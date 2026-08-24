import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/marketing/hero-kuchnia.jpg";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const yearsInBusiness = new Date().getFullYear() - siteConfig.foundedYear;

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="container-edmat grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-20">
        <div className="hero-sequence flex flex-col gap-7">
          <span className="inline-flex w-fit items-center gap-2 border border-line bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
            Krosno · od {siteConfig.foundedYear} roku
          </span>

          <h1 className="text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Meble na wymiar i osłony okienne, zaprojektowane pod Twoje wnętrze
          </h1>

          <p className="max-w-xl text-balance text-lg leading-relaxed text-ink-soft">
            Od {yearsInBusiness}&nbsp;lat projektujemy, produkujemy i montujemy meble kuchenne, szafy, zabudowy
            oraz rolety i żaluzje dla klientów z&nbsp;Krosna, Rzeszowa i&nbsp;całego Podkarpacia.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Umów bezpłatny pomiar
            </Link>
            <Link
              href="/realizacje"
              className="inline-flex items-center justify-center border border-ink/25 px-7 py-4 text-base font-medium text-ink transition-colors hover:border-ink"
            >
              Zobacz realizacje
            </Link>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-6 border-t border-line-soft pt-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.1em] text-ink-faint">Na rynku</dt>
              <dd className="mt-1 font-display text-2xl text-ink">{yearsInBusiness}+ lat</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.1em] text-ink-faint">Zakres</dt>
              <dd className="mt-1 font-display text-2xl text-ink">Projekt → montaż</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs uppercase tracking-[0.1em] text-ink-faint">Obszar</dt>
              <dd className="mt-1 font-display text-2xl text-ink">Krosno, Rzeszów</dd>
            </div>
          </dl>
        </div>

        <div className="hero-photo-in relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden lg:max-w-none">
          <Image
            src={heroImage}
            alt="Kuchnia na wymiar zrealizowana przez EDMAT — biała zabudowa z wyspą i blatem dębowym"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
