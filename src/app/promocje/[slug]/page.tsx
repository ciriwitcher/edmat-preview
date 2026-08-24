import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllActivePromotionSlugs, getPromotionBySlug } from "@/lib/queries";
import { SITE_IMAGES_BUCKET, getPublicStorageUrl } from "@/lib/supabase/storage";

export async function generateStaticParams() {
  const slugs = await getAllActivePromotionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const promotion = await getPromotionBySlug(slug);
  if (!promotion) return {};

  const title = promotion.seo_title || promotion.title;
  const description = promotion.seo_description || promotion.description;

  return {
    title,
    description,
    alternates: { canonical: `/promocje/${promotion.slug}` },
  };
}

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(dateString)
  );
}

export default async function PromotionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const promotion = await getPromotionBySlug(slug);
  if (!promotion) notFound();

  const cover = getPublicStorageUrl(SITE_IMAGES_BUCKET, promotion.cover_image_path);
  const isExpired = promotion.valid_until ? new Date(promotion.valid_until) < new Date() : false;
  const until = formatDate(promotion.valid_until);
  const from = formatDate(promotion.valid_from);

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Promocje", href: "/promocje" }, { label: promotion.title }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-10 sm:py-14">
        <div className="container-edmat max-w-3xl">
          {isExpired && (
            <div className="mb-6 border border-ink/20 bg-paper-alt px-5 py-4 text-sm text-ink-soft">
              Ta promocja już się zakończyła{until ? ` (${until})` : ""} i nie jest już dostępna. Zapraszamy do
              zapoznania się z{" "}
              <Link href="/promocje" className="font-medium text-accent">
                aktualnymi promocjami
              </Link>{" "}
              lub kontaktu w sprawie indywidualnej wyceny.
            </div>
          )}

          <h1 className="text-balance text-4xl sm:text-5xl">{promotion.title}</h1>
          {(from || until) && (
            <p className="mt-3 text-sm uppercase tracking-[0.1em] text-ink-faint">
              {from && `Od: ${from}`}
              {from && until && " · "}
              {until && `Do: ${until}`}
            </p>
          )}

          {cover && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden">
              <Image src={cover} alt={promotion.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          )}

          <p className="mt-8 text-balance text-lg leading-relaxed text-ink-soft">{promotion.description}</p>

          <div className="mt-8">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-accent px-7 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Zapytaj o wycenę
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
