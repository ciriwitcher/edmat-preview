"use client";

import Image from "next/image";
import { useTransition } from "react";
import { deleteProjectImage, moveProjectImage, setProjectCover } from "@/lib/actions/admin-projects";
import { PROJECT_IMAGES_BUCKET, getPublicStorageUrl } from "@/lib/supabase/storage";

type ImageItem = { id: string; storage_path: string; alt_text: string | null };

export function ProjectImageManager({
  projectId,
  images,
  coverPath,
}: {
  projectId: string;
  images: ImageItem[];
  coverPath: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  if (images.length === 0) {
    return <p className="text-sm text-ink-soft">Brak zdjęć — dodaj pierwsze powyżej.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => {
        const url = getPublicStorageUrl(PROJECT_IMAGES_BUCKET, image.storage_path);
        const isCover = image.storage_path === coverPath;

        return (
          <div key={image.id} className="border border-line bg-white">
            <div className="relative aspect-square bg-paper-alt">
              {url && <Image src={url} alt={image.alt_text ?? ""} fill sizes="220px" className="object-cover" />}
              {isCover && (
                <span className="absolute left-2 top-2 bg-accent px-2 py-0.5 text-xs font-medium text-white">Okładka</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 p-2">
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={index === 0 || isPending}
                  onClick={() => startTransition(() => moveProjectImage(projectId, image.id, "up"))}
                  className="flex-1 border border-line py-1 text-xs disabled:opacity-30"
                  aria-label="Przesuń wcześniej"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index === images.length - 1 || isPending}
                  onClick={() => startTransition(() => moveProjectImage(projectId, image.id, "down"))}
                  className="flex-1 border border-line py-1 text-xs disabled:opacity-30"
                  aria-label="Przesuń później"
                >
                  ↓
                </button>
              </div>
              <button
                type="button"
                disabled={isCover || isPending}
                onClick={() => startTransition(() => setProjectCover(projectId, image.storage_path))}
                className="border border-line py-1 text-xs disabled:opacity-30"
              >
                Ustaw jako okładkę
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  if (window.confirm("Usunąć to zdjęcie? Tej operacji nie można cofnąć.")) {
                    startTransition(() => deleteProjectImage(image.id, projectId));
                  }
                }}
                className="border border-accent/40 py-1 text-xs text-accent"
              >
                Usuń
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
