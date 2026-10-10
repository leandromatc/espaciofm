"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Marquesina } from "@/components/home/Marquesina";
import { FranjaHoy } from "@/components/home/FranjaHoy";

const links = [
  { href: "/programacion", label: "Programación" },
  { href: "/noticias", label: "Noticias" },
  { href: "/#pautar", label: "Pautá" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <FranjaHoy />
      <Marquesina />
      <nav data-chrome className="sticky top-0 z-40 border-b border-chalk/20 bg-ink pt-[env(safe-area-inset-top,0px)]">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 py-3">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link href="/" className="press flex min-h-11 shrink-0 items-center" aria-label="Espacio Sport 91.5 FM, inicio">
              <Image
                src="/logo.png"
                width={320}
                height={160}
                alt="Logo de 91.5FM Espacio Sport"
                priority
                className="h-auto w-[120px] sm:w-[140px]"
              />
            </Link>
            <p className="max-w-[9.5rem] border-l border-chalk/30 pl-3 font-sans text-xs font-semibold leading-tight text-chalk-dim sm:max-w-none sm:pl-4 sm:text-sm sm:uppercase sm:tracking-wide">
              La radio del deporte de Mercedes
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden items-center gap-8 sm:flex">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`tiza-link py-3 font-sans font-semibold text-sm uppercase tracking-wider ${
                    active ? "text-chalk" : "text-chalk-dim hover:text-chalk"
                  }`}
                  style={active ? { backgroundSize: "100% 2px" } : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Celular */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className="press grid h-11 w-11 place-items-center rounded-full text-chalk sm:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88%] max-w-sm border-chalk/20 bg-ink p-0 text-chalk data-[state=open]:duration-300"
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex flex-col px-6 pt-[calc(4rem+env(safe-area-inset-top,0px))]">
                {[{ href: "/", label: "Inicio" }, ...links].map(
                  ({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="fila press border-b border-chalk/20 break-words py-4 font-display text-4xl font-black uppercase leading-none tracking-wide"
                    >
                      {label}
                    </Link>
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
