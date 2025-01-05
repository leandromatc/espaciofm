import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-5 py-10">
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <Link href="/">
          <Image
            src="/logo.png"
            width={400}
            height={200}
            alt="Logo de Espacio Sport FM"
            className="aspect-auto max-w-[200px] object-contain"
          />
        </Link>
        <div>
          <h6 className="font-medium">Contactanos</h6>
          <ul className="text-sm md:text-right">
            <li>Dirección</li>
            <li>Teléfono</li>
            <li>Mail</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full justify-center pt-5">
        <span className="text-center text-xs text-neutral-200">
          © 2025 91.5 Espacio FM Sport. Desarrollado por{" "}
          <Link href={"https://beima.dev"} className="underline">
            BeiMa Devs
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
