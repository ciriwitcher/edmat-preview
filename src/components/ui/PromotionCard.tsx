import Image from "next/image";
import Link from "next/link";
import type { PromotionRow } from "@/lib/supabase/database.types";
import { SITE_IMAGES_BUCKET, getPublicStorageUrl } from "@/lib/supabase/storage";

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(dateString)
  );
}

export function PromotionCard({ promotion, archived = false }: { promotion: PromotionRow; archived?: boolean }) {
  const cover = getPublicStorageUrl(SITE_IMAGES_BUCKET, promotion.cover_image_path);
  const until = formatDate(promotion.valid_until);

  return (
    <Link
      href={`/promocje/${promotion.slug}`}
      className={`group flex flex-col border bg-white ${archived ? "border-line opacity-80" : "border-accent/40"}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-paper-alt">
        {cover ? (
          <Image src={cover} alt={promotion.title} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-3xl text-ink-faint">%</div>
        )}
        {archived && (
          <span className="absolute left-3 top-3 bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Zakończona
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-ink group-hover:text-accent">{promotion.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-soft">{promotion.description}</p>
        {until && (
          <p className="mt-3 text-xs uppercase tracking-[0.1em] text-ink-faint">
            {archived ? "Zakończona: " : "Ważna do: "}
            {until}
          </p>
        )}
      </div>
    </Link>
  );
}
