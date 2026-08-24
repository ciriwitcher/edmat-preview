import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Klient Supabase do użycia w Server Components, Server Actions i Route Handlers.
 * Zwraca null, gdy zmienne środowiskowe nie są jeszcze skonfigurowane, aby
 * strona mogła działać (bez treści z CMS) przed podłączeniem realnego projektu.
 */
export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Wywołane z Server Component bez możliwości zapisu ciasteczek —
          // bezpieczne do zignorowania, gdy middleware odświeża sesję.
        }
      },
    },
  });
}
