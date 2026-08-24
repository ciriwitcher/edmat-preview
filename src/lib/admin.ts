import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminSession() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null, isAdmin: false };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, isAdmin: false };

  const { data: isAdmin } = await supabase.rpc("is_admin");

  return { supabase, user, isAdmin: Boolean(isAdmin) };
}
