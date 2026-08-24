import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

const reasons = [
  {
    title: "Projekt, produkcja i montaż w jednej firmie",
    description:
      "Pomiar, projekt komputerowy, produkcja mebli i montaż na miejscu wykonujemy sami — bez pośredników i przekazywania zlecenia dalej.",
  },
  {
    title: "Bezpłatny pomiar i projekt wstępny",
    description:
      "Podstawowy projekt i wizualizacja 3D są bezpłatne, jeśli zdecydują się Państwo na realizację — bez ukrytych kosztów na starcie.",
  },
  {
    title: "Szeroki wybór materiałów",
    description:
      "Laminaty, MDF lakierowany i foliowany, fornir, szkło hartowane lacobel, aluminium oraz blaty kamienne i konglomeratowe.",
  },
  {
    title: `Na rynku od ${siteConfig.foundedYear} roku`,
    description:
      "Wieloletnie doświadczenie w realizacji mebli na wymiar oraz montażu osłon okiennych na terenie Krosna i Podkarpacia.",
  },
];

export function WhyEdmat() {
  return (
    <section className="border-b border-line bg-paper py-16 sm:py-24">
      <div className="container-edmat">
        <SectionHeading eyebrow="Dlaczego EDMAT" title="Jedna firma, od pomiaru po montaż" />

        <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="bg-white p-8">
              <span className="font-display text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl text-ink">{reason.title}</h3>
              <p className="mt-3 text-ink-soft">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
