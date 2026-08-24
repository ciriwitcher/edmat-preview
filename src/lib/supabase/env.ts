export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Supabase jest opcjonalny na etapie developmentu — strona ma działać (bez
 * treści dynamicznych) zanim klient poda prawdziwe dane projektu Supabase.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
