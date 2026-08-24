import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";
import { CtaBand } from "@/components/sections/CtaBand";
import { getPublishedProjects } from "@/lib/queries";
import type { ProjectCategory } from "@/lib/supabase/database.types";

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Realizacje EDMAT — meble na wymiar wykonane dla klientów w Krośnie, Rzeszowie i na Podkarpaciu. Kuchnie, szafy, sypialnie, biura i inne meble na zamówienie.",
  alternates: { canonical: "/realizacje" },
};

const categories: { value: ProjectCategory | "wszystkie"; label: string }[] = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "kuchnie", label: "Kuchnie" },
  { value: "szafy", label: "Szafy" },
  { value: "sypialnie", label: "Sypialnie" },
  { value: "salony", label: "Salony" },
  { value: "lazienki", label: "Łazienki" },
  { value: "przedpokoje", label: "Przedpokoje" },
  { value: "biura", label: "Biura" },
  { value: "inne", label: "Inne" },
];

export default async function RealizacjePage({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string }>;
}) {
  const { kategoria } = await searchParams;
  const activeCategory = categories.some((c) => c.value === kategoria) ? (kategoria as ProjectCategory) : undefined;

  const projects = await getPublishedProjects(activeCategory ? { category: activeCategory } : undefined);

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Realizacje" }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-12 sm:py-16">
        <div className="container-edmat max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Portfolio</span>
          <h1 className="mt-4 text-balance text-4xl sm:text-5xl">Realizacje</h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">
            Meble na wymiar zaprojektowane i wykonane przez EDMAT — kuchnie, szafy, sypialnie i inne realizacje dla
            klientów z Krosna, Rzeszowa i całego Podkarpacia.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-4">
        <div className="container-edmat">
          <nav aria-label="Filtruj realizacje po kategorii" className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive =
                category.value === "wszystkie" ? !activeCategory : activeCategory === category.value;
              const href = category.value === "wszystkie" ? "/realizacje" : `/realizacje?kategoria=${category.value}`;
              return (
                <Link
                  key={category.value}
                  href={href}
                  className={`border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "border-accent bg-accent text-white" : "border-line text-ink hover:border-accent"
                  }`}
                >
                  {category.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-edmat">
          {projects.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={staggerDelay(index)}>
                  <ProjectCard project={project} priority={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-line p-10 text-center text-ink-soft">
              {activeCategory
                ? "Brak realizacji w tej kategorii — sprawdź pozostałe filtry lub wróć do pełnej galerii."
                : "Galeria realizacji jest w trakcie uzupełniania. Zapraszamy do kontaktu telefonicznego lub odwiedzenia naszej siedziby w Krośnie, gdzie można zobaczyć przykłady naszych mebli."}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
