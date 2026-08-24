import Link from "next/link";

export function DesignFeature() {
  return (
    <section className="border-b border-line bg-ink py-16 text-paper sm:py-24">
      <div className="container-edmat grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
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
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden border border-paper/15 bg-paper/15 text-sm">
          <div className="bg-ink p-6">
            <dt className="text-paper/60">Pomiar i projekt wstępny</dt>
            <dd className="mt-2 font-display text-2xl text-white">Bezpłatnie</dd>
          </div>
          <div className="bg-ink p-6">
            <dt className="text-paper/60">Czas przygotowania projektu</dt>
            <dd className="mt-2 font-display text-2xl text-white">do 7 dni</dd>
          </div>
          <div className="bg-ink p-6">
            <dt className="text-paper/60">Produkcja i montaż</dt>
            <dd className="mt-2 font-display text-2xl text-white">4–8 tygodni</dd>
          </div>
          <div className="bg-ink p-6">
            <dt className="text-paper/60">Montaż kuchni</dt>
            <dd className="mt-2 font-display text-2xl text-white">do 2 dni</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
