"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteContactSubmission(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from("contact_submissions").delete().eq("id", id);
  revalidatePath("/admin/zapytania");
}
