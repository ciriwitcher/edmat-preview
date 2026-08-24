import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLdScript } from "@/lib/seo";
import { faqGroups } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Najczęstsze pytania (FAQ)",
  description:
    "Odpowiedzi na najczęstsze pytania o meble na wymiar oraz rolety, żaluzje i moskitiery EDMAT — ceny, czas realizacji, gwarancja, materiały.",
  alternates: { canonical: "/najczestsze-pytania-faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-12 sm:py-16">
        <div className="container-edmat max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Firma</span>
          <h1 className="mt-4 text-balance text-4xl sm:text-5xl">Najczęstsze pytania</h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">
            Odpowiedzi na pytania, które najczęściej padają przed zamówieniem mebli na wymiar oraz osłon okiennych.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-edmat max-w-3xl space-y-14">
          {faqGroups.map((group) => (
            <div key={group.slug}>
              <h2 className="text-2xl sm:text-3xl">{group.title}</h2>
              <div className="mt-6">
                <Accordion items={group.items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Nie znaleźli Państwo odpowiedzi?"
        description="Zadzwoń lub napisz do nas — chętnie odpowiemy na dodatkowe pytania i doradzimy najlepsze rozwiązanie."
      />
    </>
  );
}
