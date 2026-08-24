import Link from "next/link";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { createPromotion } from "@/lib/actions/admin-promotions";

export default function NewPromotionPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/promocje" className="text-sm text-ink-soft hover:text-accent">
        ← Wszystkie promocje
      </Link>
      <h1 className="mt-3 text-2xl text-ink">Nowa promocja</h1>
      <div className="mt-6 border border-line bg-white p-6">
        <PromotionForm action={createPromotion} submitLabel="Utwórz promocję" />
      </div>
    </div>
  );
}
