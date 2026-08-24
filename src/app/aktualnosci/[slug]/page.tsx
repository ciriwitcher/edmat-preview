import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLdScript } from "@/lib/seo";
import { getAllPublishedPostSlugs, getPostBySlug } from "@/lib/queries";
import { SITE_IMAGES_BUCKET, getPublicStorageUrl } from "@/lib/supabase/storage";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const slugs = await getAllPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || post.title;

  return {
    title,
    description,
    alternates: { canonical: `/aktualnosci/${post.slug}` },
    openGraph: { title, description, url: `/aktualnosci/${post.slug}`, type: "article" },
  };
}

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(dateString)
  );
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cover = getPublicStorageUrl(SITE_IMAGES_BUCKET, post.cover_image_path);
  const date = formatDate(post.published_at);
  const paragraphs = post.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    url: `${siteConfig.url}/aktualnosci/${post.slug}`,
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Aktualności", href: "/aktualnosci" }, { label: post.title }]} />
        </div>
      </div>

      <article className="border-b border-line bg-paper py-10 sm:py-14">
        <div className="container-edmat max-w-3xl">
          {date && <span className="text-xs uppercase tracking-[0.1em] text-ink-faint">{date}</span>}
          <h1 className="mt-3 text-balance text-4xl sm:text-5xl">{post.title}</h1>

          {cover && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden">
              <Image src={cover} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          )}

          <div className="prose-edmat mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
