import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PatternSwatch } from "@/components/ui/PatternSwatch";
import { Accordion } from "@/components/ui/Accordion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";
import { CtaBand } from "@/components/sections/CtaBand";
import { getPublishedProjects } from "@/lib/queries";
import type { CategoryHubContent } from "@/lib/content/category-hubs";

export async function CategoryHubPage({ content }: { content: CategoryHubContent }) {
  const projects = content.showFeaturedProjects ? await getPublishedProjects({ limit: 6 }) : [];

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: content.title }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-12 sm:py-16">
        <div className="container-edmat max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{content.eyebrow}</span>
          <h1 className="mt-4 text-balance text-4xl sm:text-5xl">{content.title}</h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">{content.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Zapytaj o wycenę
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-alt py-14 sm:py-20">
        <div className="container-edmat">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.items.map((item, index) => (
              <Reveal key={item.href} delay={staggerDelay(index)}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col border border-line bg-white transition-colors hover:border-accent"
                >
                  {item.image ? (
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    item.pattern && <PatternSwatch variant={item.pattern} className="h-32 w-full" />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-lg text-ink">{item.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-ink-soft">{item.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Dowiedz się więcej
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {content.showFeaturedProjects && projects.length > 0 && (
        <section className="border-b border-line bg-paper py-14 sm:py-20">
          <div className="container-edmat">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Realizacje" title="Zobacz nasze realizacje" />
              <Link href="/realizacje" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Wszystkie realizacje <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={staggerDelay(index)}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-line bg-paper-alt py-14 sm:py-20">
        <div className="container-edmat max-w-3xl">
          <h2 className="text-2xl sm:text-3xl">Pytania i odpowiedzi</h2>
          <div className="mt-8">
            <Accordion items={content.faq} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
