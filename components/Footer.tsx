import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#noticias", label: "Noticias" },
  { href: "/programacion", label: "Programación" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#sobre-nosotros", label: "Sobre nosotros" },
];

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800/60 bg-neutral-900/40">
      <div className="mx-auto max-w-screen-xl px-5 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/logo.png"
                width={320}
                height={160}
                alt="Logo de Espacio Sport FM"
                className="max-w-[160px] object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-500">
              La radio del deporte local en Mercedes, Soriano. Transmitiendo
              desde 1999.
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Navegación
            </h6>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-500 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Contacto
            </h6>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-neutral-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                18 de Julio y Aldunate, Mercedes, Soriano
              </li>
              <li className="flex items-center gap-2.5 text-sm text-neutral-500">
                <Phone className="h-4 w-4 shrink-0 text-neutral-600" />
                <span>Teléfono</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-neutral-500">
                <Mail className="h-4 w-4 shrink-0 text-neutral-600" />
                <span>Email</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-800/60 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © 2026 91.5 Espacio Sport FM · Mercedes, Uruguay
          </p>
          <p className="text-xs text-neutral-600">
            Desarrollado por{" "}
            <Link
              href="https://beima.dev"
              className="text-neutral-500 underline hover:text-neutral-300"
            >
              BeiMa Devs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
