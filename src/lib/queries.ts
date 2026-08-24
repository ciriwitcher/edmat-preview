import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { PostRow, ProjectImageRow, ProjectRow, PromotionRow } from "@/lib/supabase/database.types";

export type ProjectWithImages = ProjectRow & { project_images: ProjectImageRow[] };

export async function getPublishedProjects(options?: { limit?: number; category?: string }) {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  let query = supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (options?.category) {
    query = query.eq("category", options.category as ProjectRow["category"]);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getPublishedProjects error", error.message);
    return [];
  }
  return (data ?? []) as ProjectWithImages[];
}

export async function getProjectBySlug(slug: string) {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getProjectBySlug error", error.message);
    return null;
  }
  if (!data) return null;

  const images = [...data.project_images].sort((a, b) => a.sort_order - b.sort_order);
  return { ...data, project_images: images } as ProjectWithImages;
}

export async function getAllPublishedProjectSlugs() {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];
  const { data } = await supabase.from("projects").select("slug").eq("published", true);
  return (data ?? []).map((row) => row.slug);
}

export async function getPublishedPosts(options?: { limit?: number }) {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) {
    console.error("getPublishedPosts error", error.message);
    return [];
  }
  return (data ?? []) as PostRow[];
}

export async function getPostBySlug(slug: string) {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getPostBySlug error", error.message);
    return null;
  }
  return data as PostRow | null;
}

export async function getAllPublishedPostSlugs() {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];
  const { data } = await supabase.from("posts").select("slug").eq("published", true);
  return (data ?? []).map((row) => row.slug);
}

export async function getActivePromotions() {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("active", true)
    .or(`valid_until.is.null,valid_until.gte.${today}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getActivePromotions error", error.message);
    return [];
  }
  return (data ?? []) as PromotionRow[];
}

export async function getArchivedPromotions() {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("active", true)
    .lt("valid_until", today)
    .order("valid_until", { ascending: false });

  if (error) return [];
  return (data ?? []) as PromotionRow[];
}

export async function getPromotionBySlug(slug: string) {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    console.error("getPromotionBySlug error", error.message);
    return null;
  }
  return data as PromotionRow | null;
}

export async function getAllActivePromotionSlugs() {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];
  const { data } = await supabase.from("promotions").select("slug").eq("active", true);
  return (data ?? []).map((row) => row.slug);
}
