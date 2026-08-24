import Image from "next/image";
import Link from "next/link";
import type { ProjectWithImages } from "@/lib/queries";
import { PROJECT_IMAGES_BUCKET, getPublicStorageUrl } from "@/lib/supabase/storage";
import { categoryLabels } from "@/lib/content/categories";

export function ProjectCard({ project, priority = false }: { project: ProjectWithImages; priority?: boolean }) {
  const cover =
    getPublicStorageUrl(PROJECT_IMAGES_BUCKET, project.cover_image_path) ??
    getPublicStorageUrl(PROJECT_IMAGES_BUCKET, project.project_images[0]?.storage_path);

  return (
    <Link href={`/realizacje/${project.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-alt">
        {cover ? (
          <Image
            src={cover}
            alt={project.project_images[0]?.alt_text ?? project.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-faint">Brak zdjęcia</div>
        )}
      </div>
      <div className="mt-4">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          {categoryLabels[project.category] ?? project.category}
        </span>
        <h3 className="mt-1.5 font-display text-lg text-ink group-hover:text-accent">{project.title}</h3>
        {project.location && <p className="mt-1 text-sm text-ink-soft">{project.location}</p>}
      </div>
    </Link>
  );
}
