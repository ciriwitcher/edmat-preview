"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Klient Supabase do użycia w Client Components (panel /admin: formularze,
 * upload zdjęć, logowanie). Nigdy nie używaj tu service_role — tylko klucz publiczny.
 */
export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase nie jest skonfigurowany. Uzupełnij NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY w .env.local."
    );
  }
  return createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!);
}
