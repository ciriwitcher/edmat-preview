import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PromotionCard } from "@/components/ui/PromotionCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { getActivePromotions, getArchivedPromotions } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Promocje",
  description: "Aktualne promocje EDMAT na meble na wymiar i osłony okienne w Krośnie.",
  alternates: { canonical: "/promocje" },
};

export default async function PromocjePage() {
  const [active, archived] = await Promise.all([getActivePromotions(), getArchivedPromotions()]);

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Promocje" }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-12 sm:py-16">
        <div className="container-edmat max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Firma</span>
          <h1 className="mt-4 text-balance text-4xl sm:text-5xl">Promocje</h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">
            Sprawdź aktualne promocje na meble na wymiar oraz osłony okienne.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-edmat">
          <h2 className="text-2xl sm:text-3xl">Aktualne promocje</h2>
          {active.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} />
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-dashed border-line p-10 text-center text-ink-soft">
              Obecnie nie prowadzimy żadnej promocji. Zapraszamy do kontaktu — chętnie przygotujemy indywidualną
              wycenę.
            </div>
          )}
        </div>
      </section>

      {archived.length > 0 && (
        <section className="border-t border-line bg-paper-alt py-14 sm:py-20">
          <div className="container-edmat">
            <h2 className="text-2xl sm:text-3xl">Promocje archiwalne</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {archived.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} archived />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
