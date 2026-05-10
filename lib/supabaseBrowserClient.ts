import { createBrowserClient } from "@supabase/ssr";

// Usa cookies en vez de localStorage — el middleware puede leer la sesión.
export function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
