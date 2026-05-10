import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { signOut } from "@/app/actions/auth";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Newspaper, Radio, LogOut } from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { href: "/admin/programacion", label: "Programación", icon: Radio },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // El middleware ya protege todas las rutas /admin.
  // Acá solo leemos el email para mostrarlo en el sidebar.
  let email: string | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
  } catch {
    // Si falla, mostramos el sidebar igual
  }

  return (
    <div className="flex min-h-screen bg-neutral-950">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r border-neutral-800 bg-neutral-900">
        <div className="border-b border-neutral-800 p-4">
          <Link href="/">
            <Image
              src="/logo.png"
              width={200}
              height={100}
              alt="Logo"
              className="max-w-[140px]"
            />
          </Link>
          <p className="mt-1 text-xs text-neutral-500">Panel de administración</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-neutral-800 p-3">
          {email && (
            <p className="mb-2 truncate px-3 text-xs text-neutral-500">
              {email}
            </p>
          )}
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
