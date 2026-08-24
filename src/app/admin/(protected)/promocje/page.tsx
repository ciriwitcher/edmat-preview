import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPromotionsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: promotions } = supabase
    ? await supabase.from("promotions").select("id, title, active, valid_until").order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-ink">Promocje</h1>
          <p className="mt-1 text-sm text-ink-soft">{promotions?.length ?? 0} pozycji</p>
        </div>
        <Link href="/admin/promocje/nowa" className="bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark">
          + Dodaj promocję
        </Link>
      </div>

      <div className="mt-8 divide-y divide-line border border-line bg-white">
        {promotions && promotions.length > 0 ? (
          promotions.map((promotion) => {
            const isExpired = promotion.valid_until ? new Date(promotion.valid_until) < new Date() : false;
            return (
              <Link key={promotion.id} href={`/admin/promocje/${promotion.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper-alt">
                <p className="font-medium text-ink">{promotion.title}</p>
                <span
                  className={`shrink-0 px-2.5 py-1 text-xs font-medium ${
                    !promotion.active ? "bg-ink/10 text-ink-soft" : isExpired ? "bg-ink/10 text-ink-soft" : "bg-accent/10 text-accent"
                  }`}
                >
                  {!promotion.active ? "Wyłączona" : isExpired ? "Zakończona" : "Aktywna"}
                </span>
              </Link>
            );
          })
        ) : (
          <p className="px-5 py-8 text-center text-ink-soft">Brak promocji — dodaj pierwszą.</p>
        )}
      </div>
    </div>
  );
}
