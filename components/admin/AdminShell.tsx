"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Newspaper,
  UserRound,
} from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { AvisoToast } from "@/components/admin/AvisoToast";
import { Button } from "@/components/admin/ui/button";
import { ToastProvider } from "@/components/admin/ui/toast";
import { cn } from "@/lib/utils";

type Destino = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const INICIO: Destino = { href: "/admin", label: "Inicio", icon: LayoutDashboard, exact: true };
const NOTICIAS: Destino = { href: "/admin/noticias", label: "Noticias", icon: Newspaper };
const PROGRAMACION: Destino = { href: "/admin/programacion", label: "Programación", icon: CalendarClock };
const CUENTA: Destino = { href: "/admin/cuenta", label: "Cuenta", icon: UserRound };

// Celular: los cuatro destinos en la barra de pestañas. Escritorio: los mismos, en grupos.
const NAV = [INICIO, NOTICIAS, PROGRAMACION, CUENTA];
const GRUPOS: { titulo: string | null; items: Destino[] }[] = [
  { titulo: null, items: [INICIO] },
  { titulo: "Contenido", items: [NOTICIAS, PROGRAMACION] },
  { titulo: "Ajustes", items: [CUENTA] },
];

// Las pantallas de nivel superior llevan la barra de pestañas; los formularios
// (nueva, editar) llevan su propia barra de guardar y no la muestran.
const TOP_LEVEL = new Set(NAV.map((n) => n.href));

export function AdminShell({
  email,
  children,
}: {
  email: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // El login no tiene navegación: solo la tarjeta centrada
  if (pathname === "/admin/login") {
    return (
      <div data-admin className="min-h-dvh">
        <ToastProvider>{children}</ToastProvider>
      </div>
    );
  }

  const showTabs = TOP_LEVEL.has(pathname);
  const isActive = (d: Destino) =>
    d.exact ? pathname === d.href : pathname.startsWith(d.href);

  return (
    <div data-admin className="min-h-dvh font-sans antialiased lg:flex">
      <ToastProvider>
        {/* Escritorio: barra lateral */}
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
          <div className="flex flex-col gap-3 px-5 pb-5 pt-6">
            <Link
              href="/admin"
              aria-label="Inicio del panel"
              className="w-fit rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src="/logo.png"
                width={200}
                height={100}
                alt="Espacio Sport 91.5 FM"
                className="h-auto w-36"
              />
            </Link>
            <p className="text-xs text-muted-foreground">Panel de administración</p>
          </div>

          <nav
            aria-label="Secciones del panel"
            className="flex flex-1 flex-col gap-5 overflow-y-auto border-t border-border px-3 py-4"
          >
            {GRUPOS.map((g, i) => (
              <div key={g.titulo ?? i} className="flex flex-col gap-1">
                {g.titulo && (
                  <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {g.titulo}
                  </p>
                )}
                {g.items.map((d) => {
                  const active = isActive(d);
                  const Icon = d.icon;
                  return (
                    <Link
                      key={d.href}
                      href={d.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "bg-accent text-foreground ring-1 ring-inset ring-border"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      )}
                    >
                      <Icon
                        aria-hidden
                        className={cn("size-4", active && "text-destructive-foreground")}
                      />
                      {d.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-1 border-t border-border p-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              render={<Link href="/" target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink aria-hidden />
              Ver sitio
            </Button>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5">
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold uppercase"
              >
                {email?.[0] ?? "?"}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {email ?? "Sin sesión"}
                </span>
              </span>
              <form action={signOut}>
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Cerrar sesión"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut aria-hidden />
                </Button>
              </form>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Celular: barra superior chica */}
          <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-4 pt-[env(safe-area-inset-top,0px)] lg:hidden">
            <Link href="/admin" aria-label="Inicio del panel" className="flex min-h-11 items-center">
              <Image
                src="/logo.png"
                width={200}
                height={100}
                alt="Espacio Sport 91.5 FM"
                className="h-auto w-28"
              />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/" target="_blank" rel="noopener noreferrer" />}
            >
              Ver sitio
              <ExternalLink aria-hidden />
            </Button>
          </div>

          <main
            className={cn(
              "mx-auto w-full max-w-3xl flex-1 px-4 py-5 sm:px-6 lg:max-w-4xl lg:px-10 lg:py-10",
              showTabs
                ? "pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] lg:pb-10"
                : "pb-6",
            )}
          >
            {children}
          </main>
        </div>

        {/* Celular: barra de pestañas inferior */}
        {showTabs && (
          <nav
            aria-label="Secciones del panel"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom,0px)] lg:hidden"
          >
            <ul className="mx-auto grid max-w-md grid-cols-4">
              {NAV.map((d) => {
                const active = isActive(d);
                const Icon = d.icon;
                return (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground active:text-foreground",
                      )}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-primary"
                        />
                      )}
                      <Icon
                        aria-hidden
                        className={cn("size-5", active && "text-destructive-foreground")}
                      />
                      {d.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <Suspense fallback={null}>
          <AvisoToast />
        </Suspense>
      </ToastProvider>
    </div>
  );
}
