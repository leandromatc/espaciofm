"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  Newspaper,
  Radio,
  KeyRound,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { href: "/admin/programacion", label: "Programación", icon: Radio },
  { href: "/admin/cuenta", label: "Mi cuenta", icon: KeyRound },
];

function NavContent({
  email,
  onNavigate,
}: {
  email: string | null;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="p-4">
        <Link href="/" onClick={onNavigate}>
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

      <Separator className="bg-neutral-800" />

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navLinks.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive(href, exact)
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <Separator className="bg-neutral-800" />

      {/* Footer */}
      <div className="p-3">
        {email && (
          <p className="mb-2 truncate px-3 text-xs text-neutral-500">{email}</p>
        )}
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminSidebar({ email }: { email: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-neutral-800 bg-neutral-900 lg:flex lg:flex-col">
        <NavContent email={email} />
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3 lg:hidden">
        <Link href="/">
          <Image
            src="/logo.png"
            width={200}
            height={100}
            alt="Logo"
            className="max-w-[120px]"
          />
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 border-neutral-800 bg-neutral-900 p-0"
          >
            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            <NavContent email={email} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
