import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Panel · Espacio Sport 91.5 FM",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email: string | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
  } catch {
    // Si falla, mostramos el panel igual
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
