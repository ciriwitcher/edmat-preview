"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, string> = {
  up: "translateY(22px)",
  down: "translateY(-22px)",
  left: "translateX(22px)",
  right: "translateX(-22px)",
  none: "none",
};

// SSR/pierwsze malowanie renderuje zwykły element bez żadnych stylów ukrywających —
// treść jest widoczna od razu w HTML. Dopiero po zamontowaniu, jeśli przeglądarka
// wspiera IntersectionObserver i użytkownik nie preferuje ograniczonych animacji,
// komponent "uzbraja" się (ukrywa na czas trwania 0ms, więc bez migotania) i czeka
// na wejście w viewport, żeby odtworzyć wejście. Gdyby cokolwiek w tym łańcuchu
// zawiodło — obserwator się nie odpali, JS wyrzuci błąd, urządzenie będzie wolne —
// zabezpieczenie w postaci timeoutu i tak przywraca pełną widoczność.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealOwnProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  className?: string;
  /** Opóźnienie startu animacji w ms, liczone od momentu wejścia w viewport. */
  delay?: number;
  /** Czas trwania animacji w ms. */
  duration?: number;
  direction?: Direction;
  /** Czy animować tylko raz (domyślnie tak — element nie znika przy wyjściu z viewportu). */
  once?: boolean;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  children,
  as,
  className,
  delay = 0,
  duration = 600,
  direction = "up",
  once = true,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "visible">("static");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    setPhase("hidden");

    // Zabezpieczenie: nawet gdyby obserwator nigdy nie odpalił (nietypowy
    // layout, błąd przeglądarki), treść i tak stanie się w pełni widoczna.
    const safety = setTimeout(() => setPhase("visible"), 1800);

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setPhase("visible");
              clearTimeout(safety);
              if (once) observer?.unobserve(el);
            } else if (!once) {
              setPhase("hidden");
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );
      observer.observe(el);
    } catch {
      clearTimeout(safety);
      setPhase("visible");
    }

    return () => {
      observer?.disconnect();
      clearTimeout(safety);
    };
  }, [once]);

  const hidden = phase === "hidden";

  const style = {
    "--reveal-duration": `${duration}ms`,
    "--reveal-delay": `${delay}ms`,
    "--reveal-offset": OFFSETS[direction],
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      {...rest}
      className={["reveal", hidden ? "reveal-hidden" : "", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </Tag>
  );
}
