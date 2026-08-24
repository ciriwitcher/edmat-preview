"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SITE_IMAGES_BUCKET } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slugify";
import type { AdminFormState } from "@/lib/actions/admin-projects";

const promotionSchema = z.object({
  title: z.string().trim().min(2, "Podaj tytuł."),
  slug: z.string().trim().optional(),
  description: z.string().trim().min(5, "Podaj opis promocji."),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  validFrom: z.string().trim().optional(),
  validUntil: z.string().trim().optional(),
  active: z.string().optional(),
});

async function requireAdminClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase nie jest skonfigurowany.");
  return supabase;
}

async function uploadCover(
  supabase: Awaited<ReturnType<typeof requireAdminClient>>,
  entityId: string,
  file: File | null
) {
  if (!file || file.size === 0) return null;
  const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const storagePath = `promotions/${entityId}/${Date.now()}-${cleanName}`;
  const buffer = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(SITE_IMAGES_BUCKET)
    .upload(storagePath, buffer, { contentType: file.type || "image/jpeg" });

  if (error) {
    console.error("Cover upload error:", error.message);
    return null;
  }
  return storagePath;
}

export async function createPromotion(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = promotionSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    validFrom: formData.get("validFrom"),
    validUntil: formData.get("validUntil"),
    active: formData.get("active"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Sprawdź poprawność formularza." };
  }

  const supabase = await requireAdminClient();
  const slug = slugify(parsed.data.slug || parsed.data.title);

  const { data: inserted, error } = await supabase
    .from("promotions")
    .insert({
      title: parsed.data.title,
      slug,
      description: parsed.data.description,
      seo_title: parsed.data.seoTitle || null,
      seo_description: parsed.data.seoDescription || null,
      valid_from: parsed.data.validFrom || null,
      valid_until: parsed.data.validUntil || null,
      active: parsed.data.active === "on",
    })
    .select("id")
    .single();

  if (error || !inserted) {
    return { status: "error", message: "Nie udało się zapisać promocji — sprawdź, czy adres URL jest unikalny." };
  }

  const coverFile = formData.get("cover");
  if (coverFile instanceof File) {
    const coverPath = await uploadCover(supabase, inserted.id, coverFile);
    if (coverPath) await supabase.from("promotions").update({ cover_image_path: coverPath }).eq("id", inserted.id);
  }

  revalidatePath("/admin/promocje");
  revalidatePath("/promocje");
  redirect(`/admin/promocje/${inserted.id}`);
}

export async function updatePromotion(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = promotionSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    validFrom: formData.get("validFrom"),
    validUntil: formData.get("validUntil"),
    active: formData.get("active"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Sprawdź poprawność formularza." };
  }

  const supabase = await requireAdminClient();
  const slug = slugify(parsed.data.slug || parsed.data.title);

  const { error } = await supabase
    .from("promotions")
    .update({
      title: parsed.data.title,
      slug,
      description: parsed.data.description,
      seo_title: parsed.data.seoTitle || null,
      seo_description: parsed.data.seoDescription || null,
      valid_from: parsed.data.validFrom || null,
      valid_until: parsed.data.validUntil || null,
      active: parsed.data.active === "on",
    })
    .eq("id", id);

  if (error) {
    return { status: "error", message: "Nie udało się zapisać zmian." };
  }

  const coverFile = formData.get("cover");
  if (coverFile instanceof File && coverFile.size > 0) {
    const coverPath = await uploadCover(supabase, id, coverFile);
    if (coverPath) await supabase.from("promotions").update({ cover_image_path: coverPath }).eq("id", id);
  }

  revalidatePath("/admin/promocje");
  revalidatePath(`/admin/promocje/${id}`);
  revalidatePath("/promocje");
  revalidatePath(`/promocje/${slug}`);

  return { status: "success", message: "Zapisano zmiany." };
}

export async function deletePromotion(id: string) {
  const supabase = await requireAdminClient();

  const { data: promotion } = await supabase.from("promotions").select("cover_image_path").eq("id", id).maybeSingle();
  if (promotion?.cover_image_path) {
    await supabase.storage.from(SITE_IMAGES_BUCKET).remove([promotion.cover_image_path]);
  }
  await supabase.from("promotions").delete().eq("id", id);

  revalidatePath("/admin/promocje");
  revalidatePath("/promocje");
  redirect("/admin/promocje");
}
