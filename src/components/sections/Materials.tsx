import { SectionHeading } from "@/components/ui/SectionHeading";

const materials = [
  { name: "Laminat", detail: "Krajowych i zagranicznych producentów, w szerokiej gamie kolorów i struktur." },
  { name: "MDF lakierowany i foliowany", detail: "Gładkie, trwałe fronty w kolorach połysk i mat." },
  { name: "Fornir naturalny", detail: "Naturalny rysunek drewna do wnętrz o cieplejszym charakterze." },
  { name: "Szkło hartowane lacobel", detail: "Także z nadrukiem — jako fronty, panele czy zabudowy przy blacie." },
  { name: "Aluminium", detail: "Ramy, profile i systemy przesuwne o długiej trwałości." },
  { name: "Blaty kamienne i konglomeratowe", detail: "Granit, marmur i konglomerat — do intensywnie użytkowanych blatów." },
];

export function Materials() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="container-edmat">
        <SectionHeading
          eyebrow="Materiały"
          title="Z czego wykonujemy meble na wymiar"
          description="Dobór materiału zależy od pomieszczenia, budżetu i sposobu użytkowania — omawiamy to na etapie wyceny."
        />

        <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <div key={material.name} className="border-t border-line pt-4">
              <h3 className="text-base font-semibold text-ink">{material.name}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{material.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
