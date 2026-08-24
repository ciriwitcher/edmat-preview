import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex flex-col leading-none ${className}`}
      aria-label="EDMAT – strona główna"
    >
      <span className="font-display text-[1.75rem] font-semibold tracking-tight sm:text-3xl">
        <span className="text-accent">Ed</span>
        <span className="text-ink">mat</span>
      </span>
      <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-ink-soft">
        Meble na wymiar
      </span>
    </Link>
  );
}
