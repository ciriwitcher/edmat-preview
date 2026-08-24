import Image from "next/image";
import Link from "next/link";
import type { PostRow } from "@/lib/supabase/database.types";
import { SITE_IMAGES_BUCKET, getPublicStorageUrl } from "@/lib/supabase/storage";

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(dateString)
  );
}

export function PostCard({ post }: { post: PostRow }) {
  const cover = getPublicStorageUrl(SITE_IMAGES_BUCKET, post.cover_image_path);
  const date = formatDate(post.published_at);

  return (
    <Link href={`/aktualnosci/${post.slug}`} className="group flex flex-col border border-line bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-alt">
        {cover ? (
          <Image
            src={cover}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-3xl text-ink-faint">Ed</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {date && <span className="text-xs uppercase tracking-[0.1em] text-ink-faint">{date}</span>}
        <h3 className="mt-2 font-display text-xl text-ink group-hover:text-accent">{post.title}</h3>
        {post.excerpt && <p className="mt-2 flex-1 text-sm text-ink-soft">{post.excerpt}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Czytaj więcej <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
