import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

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
    // Si falla, mostramos el sidebar igual
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-neutral-950 lg:flex-row">
      <AdminSidebar email={email} />
      <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
