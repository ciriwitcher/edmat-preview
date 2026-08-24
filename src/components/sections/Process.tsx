import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";

const steps = [
  {
    title: "Konsultacja i pomiar",
    description: "Ustalamy potrzeby, oglądamy pomieszczenie i wykonujemy bezpłatny pomiar na miejscu.",
  },
  {
    title: "Wycena i projekt 3D",
    description: "Przygotowujemy wycenę oraz wizualizację komputerową, którą można na bieżąco korygować.",
  },
  {
    title: "Produkcja",
    description: "Meble powstają w oparciu o zatwierdzony projekt — zwykle w 4–6, maksymalnie 8 tygodni.",
  },
  {
    title: "Montaż",
    description: "Montujemy meble w Państwa domu — standardowa kuchnia zajmuje zwykle do 2 dni.",
  },
];

export function Process() {
  return (
    <section className="bg-ink py-16 text-paper sm:py-24">
      <div className="container-edmat">
        <SectionHeading
          eyebrow="Jak pracujemy"
          title="Od pomiaru do montażu, krok po kroku"
          tone="paper"
        />

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={staggerDelay(index)} className="relative border-t border-paper/25 pt-6">
              <span className="font-display text-3xl text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
