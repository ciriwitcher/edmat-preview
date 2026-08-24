import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLdScript } from "@/lib/seo";
import { getAllPublishedProjectSlugs, getProjectBySlug, getPublishedProjects } from "@/lib/queries";
import { categoryLabels, categoryServiceHref } from "@/lib/content/categories";
import { PROJECT_IMAGES_BUCKET, getPublicStorageUrl } from "@/lib/supabase/storage";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const slugs = await getAllPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const title = project.seo_title || project.title;
  const description = project.seo_description || project.description || `${project.title} — realizacja EDMAT.`;

  return {
    title,
    description,
    alternates: { canonical: `/realizacje/${project.slug}` },
    openGraph: { title, description, url: `/realizacje/${project.slug}`, type: "article" },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const images = project.project_images
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => ({
      src: getPublicStorageUrl(PROJECT_IMAGES_BUCKET, image.storage_path) ?? "",
      alt: image.alt_text ?? project.title,
    }))
    .filter((image) => image.src);

  const coverImage =
    getPublicStorageUrl(PROJECT_IMAGES_BUCKET, project.cover_image_path) ?? images[0]?.src ?? null;

  const related = (await getPublishedProjects({ category: project.category, limit: 4 })).filter(
    (p) => p.id !== project.id
  );

  const serviceHref = categoryServiceHref[project.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: project.title,
    description: project.description ?? undefined,
    contentUrl: coverImage ?? undefined,
    url: `${siteConfig.url}/realizacje/${project.slug}`,
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs
            items={[
              { label: "Realizacje", href: "/realizacje" },
              { label: project.title },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10 sm:py-14">
        <div className="container-edmat">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {categoryLabels[project.category]}
          </span>
          <h1 className="mt-3 text-balance text-4xl sm:text-5xl">{project.title}</h1>
          {project.location && <p className="mt-2 text-ink-soft">{project.location}</p>}

          {coverImage && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden">
              <Image src={coverImage} alt={project.title} fill priority sizes="90vw" className="object-cover" />
            </div>
          )}

          {project.description && (
            <p className="mt-8 max-w-3xl text-balance text-lg leading-relaxed text-ink-soft">
              {project.description}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Zapytaj o podobną realizację
            </Link>
            {serviceHref && (
              <Link
                href={serviceHref}
                className="inline-flex items-center justify-center border border-ink/25 px-7 py-4 text-base font-medium text-ink transition-colors hover:border-ink"
              >
                Zobacz ofertę: {categoryLabels[project.category]}
              </Link>
            )}
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="border-b border-line bg-paper-alt py-14 sm:py-20">
          <div className="container-edmat">
            <h2 className="text-2xl sm:text-3xl">Galeria</h2>
            <div className="mt-8">
              <ProjectGallery images={images} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-b border-line bg-paper py-14 sm:py-20">
          <div className="container-edmat">
            <h2 className="text-2xl sm:text-3xl">Podobne realizacje</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
