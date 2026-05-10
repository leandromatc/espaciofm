"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/noticias", label: "Noticias" },
  { href: "/programacion", label: "Programación" },
  { href: "/#servicios", label: "Servicios" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-800/60 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            width={320}
            height={160}
            alt="Logo de 91.5FM Espacio Sport"
            className="max-w-[130px] sm:max-w-[150px]"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-white sm:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 border-neutral-800 bg-neutral-950 p-0"
          >
            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            <div className="flex flex-col gap-1 p-4 pt-8">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
