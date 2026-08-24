import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function CtaBand({
  title = "Porozmawiajmy o Twoim wnętrzu",
  description = "Umów bezpłatny pomiar i konsultację — odpowiemy na pytania i przygotujemy wstępną wycenę.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-accent py-16 text-white sm:py-20">
      <div className="container-edmat flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-balance text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-balance text-lg text-white/85">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center bg-ink px-7 py-4 text-base font-medium text-white transition-colors hover:bg-ink/85"
          >
            Zapytaj o wycenę
          </Link>
          <a
            href={siteConfig.contact.phoneHref}
            className="inline-flex items-center justify-center border border-white/70 px-7 py-4 text-base font-medium text-white transition-colors hover:bg-white hover:text-accent"
          >
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
