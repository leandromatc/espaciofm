import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex w-full flex-col items-center justify-between gap-5 p-4 lg:flex-row">
      <div>
        <Link href="/">
          <Image
            src="/logo.png"
            width={400}
            height={200}
            alt="Logo de 91.5FM Espacio Sport"
            className="max-w-[200px]"
          />
        </Link>
      </div>
      <div className="flex gap-2">
        <Link
          className="group flex gap-1 rounded-full bg-neutral-900 px-4 py-2 text-neutral-200 hover:text-white"
          href="/programacion"
        >
          programación
          <span>
            <ArrowRight className="transition-all group-hover:-rotate-45" />
          </span>
        </Link>
        <Link
          className="group flex gap-1 rounded-full bg-neutral-900 px-4 py-2 text-neutral-200 hover:text-white"
          href="/#servicios"
        >
          servicios
          <span>
            <ArrowRight className="transition-all group-hover:-rotate-45" />
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
