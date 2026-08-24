"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SITE_IMAGES_BUCKET } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slugify";
import type { AdminFormState } from "@/lib/actions/admin-projects";

const postSchema = z.object({
  title: z.string().trim().min(2, "Podaj tytuł."),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  content: z.string().trim().min(10, "Treść jest zbyt krótka."),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  published: z.string().optional(),
});

async function requireAdminClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase nie jest skonfigurowany.");
  return supabase;
}

async function uploadCover(
  supabase: Awaited<ReturnType<typeof requireAdminClient>>,
  entityKind: "posts" | "promotions",
  entityId: string,
  file: File | null
) {
  if (!file || file.size === 0) return null;
  const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const storagePath = `${entityKind}/${entityId}/${Date.now()}-${cleanName}`;
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

export async function createPost(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    published: formData.get("published"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Sprawdź poprawność formularza." };
  }

  const supabase = await requireAdminClient();
  const slug = slugify(parsed.data.slug || parsed.data.title);
  const published = parsed.data.published === "on";

  const { data: inserted, error } = await supabase
    .from("posts")
    .insert({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content,
      seo_title: parsed.data.seoTitle || null,
      seo_description: parsed.data.seoDescription || null,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    return { status: "error", message: "Nie udało się zapisać wpisu — sprawdź, czy adres URL jest unikalny." };
  }

  const coverFile = formData.get("cover");
  if (coverFile instanceof File) {
    const coverPath = await uploadCover(supabase, "posts", inserted.id, coverFile);
    if (coverPath) await supabase.from("posts").update({ cover_image_path: coverPath }).eq("id", inserted.id);
  }

  revalidatePath("/admin/aktualnosci");
  revalidatePath("/aktualnosci");
  redirect(`/admin/aktualnosci/${inserted.id}`);
}

export async function updatePost(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    published: formData.get("published"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Sprawdź poprawność formularza." };
  }

  const supabase = await requireAdminClient();
  const slug = slugify(parsed.data.slug || parsed.data.title);
  const published = parsed.data.published === "on";

  const { data: existing } = await supabase.from("posts").select("published").eq("id", id).maybeSingle();

  const { error } = await supabase
    .from("posts")
    .update({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content,
      seo_title: parsed.data.seoTitle || null,
      seo_description: parsed.data.seoDescription || null,
      published,
      published_at: published && !existing?.published ? new Date().toISOString() : undefined,
    })
    .eq("id", id);

  if (error) {
    return { status: "error", message: "Nie udało się zapisać zmian." };
  }

  const coverFile = formData.get("cover");
  if (coverFile instanceof File && coverFile.size > 0) {
    const coverPath = await uploadCover(supabase, "posts", id, coverFile);
    if (coverPath) await supabase.from("posts").update({ cover_image_path: coverPath }).eq("id", id);
  }

  revalidatePath("/admin/aktualnosci");
  revalidatePath(`/admin/aktualnosci/${id}`);
  revalidatePath("/aktualnosci");
  revalidatePath(`/aktualnosci/${slug}`);

  return { status: "success", message: "Zapisano zmiany." };
}

export async function deletePost(id: string) {
  const supabase = await requireAdminClient();

  const { data: post } = await supabase.from("posts").select("cover_image_path").eq("id", id).maybeSingle();
  if (post?.cover_image_path) {
    await supabase.storage.from(SITE_IMAGES_BUCKET).remove([post.cover_image_path]);
  }
  await supabase.from("posts").delete().eq("id", id);

  revalidatePath("/admin/aktualnosci");
  revalidatePath("/aktualnosci");
  redirect("/admin/aktualnosci");
}
