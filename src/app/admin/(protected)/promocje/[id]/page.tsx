import Link from "next/link";
import { notFound } from "next/navigation";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { deletePromotion, updatePromotion } from "@/lib/actions/admin-promotions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EditPromotionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: promotion } = await supabase.from("promotions").select("*").eq("id", id).maybeSingle();
  if (!promotion) notFound();

  const updatePromotionWithId = updatePromotion.bind(null, id);
  const deletePromotionWithId = deletePromotion.bind(null, id);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/promocje" className="text-sm text-ink-soft hover:text-accent">
          ← Wszystkie promocje
        </Link>
        <DeleteEntityButton action={deletePromotionWithId} confirmMessage={`Usunąć promocję "${promotion.title}"? Tej operacji nie można cofnąć.`} />
      </div>
      <h1 className="mt-3 text-2xl text-ink">{promotion.title}</h1>
      <div className="mt-6 border border-line bg-white p-6">
        <PromotionForm action={updatePromotionWithId} promotion={promotion} submitLabel="Zapisz zmiany" />
      </div>
    </div>
  );
}
