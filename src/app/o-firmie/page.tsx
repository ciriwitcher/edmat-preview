import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import heroImage from "@/assets/marketing/hero-kuchnia.jpg";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "O firmie",
  description:
    "EDMAT — meble na wymiar oraz osłony okienne w Krośnie od 1992 roku. Projekt, produkcja i montaż mebli kuchennych, szaf, zabudów, rolet i żaluzji.",
  alternates: { canonical: "/o-firmie" },
};

export default function OFirmiePage() {
  const yearsInBusiness = new Date().getFullYear() - siteConfig.foundedYear;

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "O firmie" }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-12 sm:py-16">
        <div className="container-edmat grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">O firmie</span>
            <h1 className="mt-4 text-balance text-4xl sm:text-5xl">
              Meble na wymiar i osłony okienne z Krosna, od {siteConfig.foundedYear} roku
            </h1>
            <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">
              EDMAT działa na rynku od {siteConfig.foundedYear} roku jako firma handlowo-usługowa specjalizująca się
              w wyposażeniu wnętrz i zabudowach na wymiar. Naszą specjalnością są meble robione na wymiar — projektujemy
              je do każdego pomieszczenia: kuchni, łazienek, salonów, przedpokoi i sypialni.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image src={heroImage} alt="Realizacja EDMAT — kuchnia na wymiar" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-alt py-14 sm:py-20">
        <div className="container-edmat grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl">Czym się zajmujemy</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Łączymy dwa obszary działalności: meble na wymiar (kuchnie, szafy wnękowe, zabudowy, meble do salonu,
              sypialni, łazienki, przedpokoju i biura) oraz nowoczesne osłony okienne marki Anwis — rolety, żaluzje
              i moskitiery. Szczególnie popularną częścią naszej oferty są szafy wnękowe do zabudowy, które pozwalają
              maksymalnie wykorzystać przestrzeń niewielkich mieszkań.
            </p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl">Obszar działania</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Siedziba firmy znajduje się w Krośnie przy ul. Powstańców Warszawskich 2. Realizujemy zlecenia głównie
              na terenie Krosna, Rzeszowa i całego województwa podkarpackiego, sporadycznie również w województwie
              małopolskim.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Przez {yearsInBusiness}+ lat działalności zrealizowaliśmy meble na wymiar w wielu domach i biurach
              regionu — od pojedynczych szaf po kompleksowe zabudowy kuchni i biur.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-14 sm:py-20">
        <div className="container-edmat">
          <h2 className="text-2xl sm:text-3xl">Jak pracujemy</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            EDMAT prowadzi klienta od pomiaru i projektu komputerowego, przez produkcję, aż po montaż gotowych
            mebli w Państwa domu — na każdym etapie w kontakcie z tym samym zespołem.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/meble-na-wymiar/projektowanie"
              className="inline-flex items-center justify-center border border-ink/25 px-7 py-4 text-base font-medium text-ink transition-colors hover:border-ink"
            >
              Zobacz proces projektowania
            </Link>
            <Link
              href="/realizacje"
              className="inline-flex items-center justify-center border border-ink/25 px-7 py-4 text-base font-medium text-ink transition-colors hover:border-ink"
            >
              Zobacz realizacje
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <CtaBand />
    </>
  );
}
