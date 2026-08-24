import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";

export function DesignFeature() {
  return (
    <section className="border-b border-line bg-ink py-16 text-paper sm:py-24">
      <div className="container-edmat grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Projektowanie mebli</span>
          <h2 className="mt-4 text-balance text-3xl text-white sm:text-4xl">
            Projekt komputerowy, w którym uczestniczą Państwo od pierwszej wersji
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-paper/75">
            Mierzymy pomieszczenie, a następnie wspólnie ustalamy układ, materiały i okucia w programie
            komputerowym — projekt można korygować, zanim trafi do produkcji.
          </p>
          <Link
            href="/meble-na-wymiar/projektowanie"
            className="mt-8 inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Zobacz proces projektowania
          </Link>
        </Reveal>

        <dl className="grid grid-cols-2 gap-px overflow-hidden border border-paper/15 bg-paper/15 text-sm">
          {[
            { label: "Pomiar i projekt wstępny", value: "Bezpłatnie" },
            { label: "Czas przygotowania projektu", value: "do 7 dni" },
            { label: "Produkcja i montaż", value: "4–8 tygodni" },
            { label: "Montaż kuchni", value: "do 2 dni" },
          ].map((stat, index) => (
            <Reveal as="div" key={stat.label} delay={staggerDelay(index, 60, 240)} className="bg-ink p-6">
              <dt className="text-paper/60">{stat.label}</dt>
              <dd className="mt-2 font-display text-2xl text-white">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
