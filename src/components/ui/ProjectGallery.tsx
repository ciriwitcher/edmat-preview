"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";

export type GalleryImage = {
  src: string;
  alt: string;
};

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, showPrev, showNext]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <Reveal
            as="button"
            key={image.src}
            type="button"
            delay={staggerDelay(index, 50, 300)}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setOpenIndex(index);
            }}
            className="relative aspect-square overflow-hidden bg-paper-alt focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={`Powiększ zdjęcie ${index + 1} z ${images.length}: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia realizacji"
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 p-4 sm:p-8"
        >
          <div className="flex items-center justify-between text-paper">
            <span className="text-sm">
              {openIndex + 1} / {images.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Zamknij podgląd"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1">
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            <button
              type="button"
              onClick={showPrev}
              className="flex h-12 w-12 items-center justify-center border border-paper/30 text-paper focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Poprzednie zdjęcie"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={showNext}
              className="flex h-12 w-12 items-center justify-center border border-paper/30 text-paper focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Następne zdjęcie"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
