import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Klient Supabase dla PUBLICZNYCH, anonimowych odczytów (realizacje, aktualności,
 * promocje na stronach publicznych — src/lib/queries.ts).
 *
 * Celowo NIE korzysta z next/headers cookies(), w przeciwieństwie do
 * createSupabaseServerClient(). Dzięki temu może być wywoływany również w
 * generateStaticParams / podczas builda, gdzie nie ma kontekstu żądania HTTP.
 * Publiczne dane i tak są chronione przez RLS (polityki "published = true"),
 * więc świadomość sesji użytkownika nie jest tu potrzebna.
 *
 * Panel /admin i Server Actions wymagające znajomości zalogowanego użytkownika
 * powinny nadal korzystać z createSupabaseServerClient().
 */
export function createSupabasePublicClient() {
  if (!isSupabaseConfigured) return null;
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: { persistSession: false },
  });
}
