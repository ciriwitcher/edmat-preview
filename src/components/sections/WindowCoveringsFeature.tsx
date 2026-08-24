import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PatternSwatch } from "@/components/ui/PatternSwatch";

const products = [
  {
    title: "Rolety",
    description: "Zewnętrzne, dzień/noc, rzymskie, dachowe, kasetowe i wolnowiszące.",
    href: "/rolety",
    variant: "roller" as const,
  },
  {
    title: "Żaluzje",
    description: "Aluminiowe, drewniane, plisowane i pionowe — do każdego typu okna.",
    href: "/zaluzje",
    variant: "slats-horizontal" as const,
  },
  {
    title: "Moskitiery",
    description: "Okienne, drzwiowe, ramkowe i rolowane, montowane bez ingerencji w ramę okna.",
    href: "/moskitiery",
    variant: "mesh" as const,
  },
];

export function WindowCoveringsFeature() {
  return (
    <section className="border-b border-line bg-paper-alt py-16 sm:py-24">
      <div className="container-edmat">
        <SectionHeading
          eyebrow="Osłony okienne"
          title="Rolety, żaluzje i moskitiery marki Anwis"
          description="Dobieramy typ osłony do rodzaju okna i sposobu montażu — z realizacją zwykle w 1–3 tygodnie."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group flex flex-col border border-line bg-white transition-colors hover:border-accent"
            >
              <PatternSwatch variant={product.variant} className="h-40 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl text-ink">{product.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{product.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Zobacz ofertę
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
