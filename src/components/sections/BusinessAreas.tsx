import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";

const areas = [
  {
    title: "Meble na wymiar",
    description:
      "Kuchnie, szafy, zabudowy i meble do każdego pomieszczenia — od pomiaru i projektu 3D po produkcję i montaż.",
    href: "/meble-na-wymiar",
    cta: "Poznaj ofertę mebli",
  },
  {
    title: "Osłony okienne",
    description:
      "Rolety, żaluzje i moskitiery marki Anwis — dobrane do typu okna, z montażem w 1–3 tygodnie.",
    href: "/rolety",
    cta: "Poznaj osłony okienne",
  },
];

export function BusinessAreas() {
  return (
    <section className="border-b border-line bg-paper py-16 sm:py-24">
      <div className="container-edmat grid gap-6 md:grid-cols-2">
        {areas.map((area, index) => (
          <Reveal key={area.href} delay={staggerDelay(index)}>
            <Link
              href={area.href}
              className="group flex h-full flex-col justify-between border border-line bg-white p-8 transition-colors hover:border-accent sm:p-10"
            >
              <div>
                <h2 className="font-display text-2xl text-ink sm:text-3xl">{area.title}</h2>
                <p className="mt-4 max-w-md text-ink-soft">{area.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {area.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
