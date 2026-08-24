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
import type { ServicePageContent } from "@/lib/content/types";

const defaultProcess = [
  { title: "Konsultacja i pomiar", description: "Bezpłatnie ustalamy potrzeby i wykonujemy pomiar na miejscu." },
  { title: "Wycena i projekt", description: "Przygotowujemy wycenę oraz projekt dopasowany do pomieszczenia." },
  { title: "Produkcja", description: "Realizujemy zamówienie z wybranych materiałów i okuć." },
  { title: "Montaż", description: "Montujemy gotowy produkt w uzgodnionym terminie." },
];

export async function ServiceLandingPage({ content }: { content: ServicePageContent }) {
  const steps = content.process ?? defaultProcess;
  const relatedProjects = content.relatedProjectsCategory
    ? await getPublishedProjects({ category: content.relatedProjectsCategory, limit: 3 })
    : [];

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: content.parentLabel, href: content.parentHref }, { label: content.title }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-12 sm:py-16">
        <div className="container-edmat grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{content.eyebrow}</span>
            <h1 className="mt-4 text-balance text-4xl sm:text-5xl">{content.title}</h1>
            <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink-soft">{content.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark"
              >
                Zapytaj o wycenę
              </Link>
              <Link
                href="/realizacje"
                className="inline-flex items-center justify-center border border-ink/25 px-7 py-4 text-base font-medium text-ink transition-colors hover:border-ink"
              >
                Zobacz realizacje
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {content.heroImage ? (
              <Image
                src={content.heroImage}
                alt={content.heroImageAlt ?? content.title}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            ) : (
              <PatternSwatch variant={content.heroPattern ?? "slats-horizontal"} className="h-full w-full" label={content.title} />
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-alt py-14 sm:py-20">
        <div className="container-edmat grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl">Zastosowanie</h2>
            <ul className="mt-6 space-y-3">
              {content.applications.map((application) => (
                <li key={application} className="flex items-start gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {application}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl">Zalety</h2>
            <ul className="mt-6 space-y-3">
              {content.advantages.map((advantage) => (
                <li key={advantage.title} className="border-l-2 border-accent pl-4">
                  <p className="font-medium text-ink">{advantage.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{advantage.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-14 sm:py-20">
        <div className="container-edmat">
          <h2 className="text-2xl sm:text-3xl">Warianty</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.variants.map((variant, index) => (
              <Reveal as="div" key={variant.title} delay={staggerDelay(index)} className="border border-line bg-white p-6">
                <h3 className="font-display text-lg text-ink">{variant.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{variant.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {content.materials && content.materials.length > 0 && (
        <section className="border-b border-line bg-paper-alt py-14 sm:py-20">
          <div className="container-edmat">
            <h2 className="text-2xl sm:text-3xl">Materiały</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {content.materials.map((material) => (
                <span key={material} className="border border-line bg-white px-4 py-2 text-sm text-ink">
                  {material}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-line bg-ink py-14 text-paper sm:py-20">
        <div className="container-edmat">
          <SectionHeading eyebrow="Jak pracujemy" title="Proces realizacji" tone="paper" />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={staggerDelay(index)} className="border-t border-paper/25 pt-5">
                <span className="font-display text-2xl text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-paper/70">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="border-b border-line bg-paper py-14 sm:py-20">
          <div className="container-edmat">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Realizacje" title="Zobacz nasze realizacje" />
              <Link href="/realizacje" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Wszystkie realizacje <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
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

      {content.relatedServices.length > 0 && (
        <section className="border-b border-line bg-paper py-14 sm:py-20">
          <div className="container-edmat">
            <h2 className="text-2xl sm:text-3xl">Powiązane usługi</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {content.relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
