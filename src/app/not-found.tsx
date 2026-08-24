import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strona nie została znaleziona",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center bg-paper py-20">
      <div className="container-edmat max-w-2xl text-center">
        <span className="font-display text-7xl text-accent">404</span>
        <h1 className="mt-6 text-balance text-3xl sm:text-4xl">Nie znaleźliśmy tej strony</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Podany adres mógł zostać zmieniony lub nie istnieje. Skorzystaj z poniższych linków, aby wrócić do
          najważniejszych sekcji strony.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link href="/" className="border border-ink/25 px-6 py-4 text-ink transition-colors hover:border-ink">
            Strona główna
          </Link>
          <Link href="/meble-na-wymiar" className="border border-ink/25 px-6 py-4 text-ink transition-colors hover:border-ink">
            Meble na wymiar
          </Link>
          <Link href="/realizacje" className="border border-ink/25 px-6 py-4 text-ink transition-colors hover:border-ink">
            Realizacje
          </Link>
          <Link href="/kontakt" className="border border-ink/25 px-6 py-4 text-ink transition-colors hover:border-ink">
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  );
}
