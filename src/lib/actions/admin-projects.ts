"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PROJECT_IMAGES_BUCKET } from "@/lib/supabase/storage";
import { slugify } from "@/lib/slugify";

export type AdminFormState = { status: "idle" | "error" | "success"; message?: string };

const categoryValues = ["kuchnie", "szafy", "sypialnie", "salony", "lazienki", "przedpokoje", "biura", "inne"] as const;

const projectSchema = z.object({
  title: z.string().trim().min(2, "Podaj tytuł realizacji."),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional(),
  category: z.enum(categoryValues, { message: "Wybierz kategorię." }),
  location: z.string().trim().optional(),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  published: z.string().optional(),
});

async function requireAdminClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase nie jest skonfigurowany.");
  return supabase;
}

async function uploadFiles(
  supabase: Awaited<ReturnType<typeof requireAdminClient>>,
  projectId: string,
  files: File[],
  startOrder: number
) {
  let order = startOrder;
  let firstPath: string | null = null;

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const storagePath = `projects/${projectId}/${Date.now()}-${cleanName}`;
    const buffer = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(PROJECT_IMAGES_BUCKET)
      .upload(storagePath, buffer, { contentType: file.type || "image/jpeg" });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      continue;
    }

    const { error: insertError } = await supabase.from("project_images").insert({
      project_id: projectId,
      storage_path: storagePath,
      sort_order: order,
      alt_text: null,
    });
    if (insertError) console.error("project_images insert error:", insertError.message);

    if (!firstPath) firstPath = storagePath;
    order += 1;
  }

  return firstPath;
}

export async function createProject(_prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
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
    .from("projects")
    .insert({
      title: parsed.data.title,
      slug,
      description: parsed.data.description || null,
      category: parsed.data.category,
      location: parsed.data.location || null,
      seo_title: parsed.data.seoTitle || null,
      seo_description: parsed.data.seoDescription || null,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    return { status: "error", message: error?.message.includes("duplicate") ? "Taki adres URL (slug) już istnieje." : "Nie udało się zapisać realizacji." };
  }

  const files = formData.getAll("images").filter((f): f is File => f instanceof File);
  if (files.length > 0) {
    const coverPath = await uploadFiles(supabase, inserted.id, files, 0);
    if (coverPath) {
      await supabase.from("projects").update({ cover_image_path: coverPath }).eq("id", inserted.id);
    }
  }

  revalidatePath("/admin/realizacje");
  revalidatePath("/realizacje");
  redirect(`/admin/realizacje/${inserted.id}`);
}

export async function updateProject(id: string, _prevState: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
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

  const { data: existing } = await supabase.from("projects").select("published").eq("id", id).maybeSingle();

  const { error } = await supabase
    .from("projects")
    .update({
      title: parsed.data.title,
      slug,
      description: parsed.data.description || null,
      category: parsed.data.category,
      location: parsed.data.location || null,
      seo_title: parsed.data.seoTitle || null,
      seo_description: parsed.data.seoDescription || null,
      published,
      published_at: published && !existing?.published ? new Date().toISOString() : undefined,
    })
    .eq("id", id);

  if (error) {
    return { status: "error", message: "Nie udało się zapisać zmian — sprawdź, czy adres URL jest unikalny." };
  }

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > 0) {
    const { count } = await supabase
      .from("project_images")
      .select("id", { count: "exact", head: true })
      .eq("project_id", id);
    await uploadFiles(supabase, id, files, count ?? 0);

    const { data: project } = await supabase.from("projects").select("cover_image_path").eq("id", id).maybeSingle();
    if (!project?.cover_image_path) {
      const { data: firstImage } = await supabase
        .from("project_images")
        .select("storage_path")
        .eq("project_id", id)
        .order("sort_order", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (firstImage) {
        await supabase.from("projects").update({ cover_image_path: firstImage.storage_path }).eq("id", id);
      }
    }
  }

  revalidatePath("/admin/realizacje");
  revalidatePath(`/admin/realizacje/${id}`);
  revalidatePath("/realizacje");
  revalidatePath(`/realizacje/${slug}`);

  return { status: "success", message: "Zapisano zmiany." };
}

export async function deleteProject(id: string) {
  const supabase = await requireAdminClient();

  const { data: images } = await supabase.from("project_images").select("storage_path").eq("project_id", id);
  if (images && images.length > 0) {
    await supabase.storage.from(PROJECT_IMAGES_BUCKET).remove(images.map((i) => i.storage_path));
  }

  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/admin/realizacje");
  revalidatePath("/realizacje");
  redirect("/admin/realizacje");
}

export async function deleteProjectImage(imageId: string, projectId: string) {
  const supabase = await requireAdminClient();

  const { data: image } = await supabase.from("project_images").select("storage_path").eq("id", imageId).maybeSingle();
  if (!image) return;

  await supabase.storage.from(PROJECT_IMAGES_BUCKET).remove([image.storage_path]);
  await supabase.from("project_images").delete().eq("id", imageId);

  const { data: project } = await supabase.from("projects").select("cover_image_path").eq("id", projectId).maybeSingle();
  if (project?.cover_image_path === image.storage_path) {
    const { data: nextImage } = await supabase
      .from("project_images")
      .select("storage_path")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();
    await supabase
      .from("projects")
      .update({ cover_image_path: nextImage?.storage_path ?? null })
      .eq("id", projectId);
  }

  revalidatePath(`/admin/realizacje/${projectId}`);
  revalidatePath("/realizacje");
}

export async function setProjectCover(projectId: string, storagePath: string) {
  const supabase = await requireAdminClient();
  await supabase.from("projects").update({ cover_image_path: storagePath }).eq("id", projectId);
  revalidatePath(`/admin/realizacje/${projectId}`);
  revalidatePath("/realizacje");
}

export async function moveProjectImage(projectId: string, imageId: string, direction: "up" | "down") {
  const supabase = await requireAdminClient();

  const { data: images } = await supabase
    .from("project_images")
    .select("id, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (!images) return;

  const index = images.findIndex((img) => img.id === imageId);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= images.length) return;

  const current = images[index];
  const swap = images[swapIndex];

  await supabase.from("project_images").update({ sort_order: swap.sort_order }).eq("id", current.id);
  await supabase.from("project_images").update({ sort_order: current.sort_order }).eq("id", swap.id);

  revalidatePath(`/admin/realizacje/${projectId}`);
}
