import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getPublishedProjects } from "@/lib/queries";

export async function FeaturedProjects() {
  const projects = await getPublishedProjects({ limit: 6 });

  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="container-edmat">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Realizacje"
            title="Wybrane projekty"
            description="Meble na wymiar zaprojektowane i wykonane dla naszych klientów."
          />
          <Link href="/realizacje" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            Wszystkie realizacje
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-line p-10 text-center text-ink-soft">
            Galeria realizacji jest w trakcie uzupełniania. Pełne portfolio wkrótce pojawi się w tym miejscu —
            tymczasem zapraszamy do kontaktu telefonicznego lub odwiedzenia naszej siedziby w Krośnie.
          </div>
        )}
      </div>
    </section>
  );
}
