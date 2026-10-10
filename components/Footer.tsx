import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { CONTACT, MAPS_URL } from "@/lib/contact";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/programacion", label: "Programación" },
  { href: "/mas-que-deportes", label: "Más que deportes" },
  { href: "/noticias", label: "Noticias" },
  { href: "/#pautar", label: "Pautá" },
];

const Footer = () => {
  const rows = [
    { icon: MapPin, label: CONTACT.address, href: MAPS_URL as string | null },
    CONTACT.phone && {
      icon: Phone,
      label: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
    },
    CONTACT.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${CONTACT.whatsapp}`,
    },
    CONTACT.email && {
      icon: Mail,
      label: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
  ].filter(Boolean) as {
    icon: typeof MapPin;
    label: string;
    href: string | null;
  }[];

  return (
    <footer>
      <div className="mx-auto max-w-screen-xl px-5">
        <div className="cal-rule" />
      </div>
      <div className="mx-auto max-w-screen-xl px-5 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="press w-fit" aria-label="Inicio">
              <Image
                src="/logo.png"
                width={320}
                height={160}
                alt="Logo de Espacio Sport FM"
                className="h-auto w-[200px]"
              />
            </Link>
            <p className="max-w-xs font-display text-3xl font-extrabold uppercase leading-[0.98]">
              La radio del deporte local. Al aire desde 1999.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <ul className="flex flex-col">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="tiza-link press inline-flex min-h-11 items-center font-sans font-semibold text-sm uppercase tracking-wider text-chalk-dim hover:text-chalk"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-col gap-3">
            {rows.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-start gap-3 text-chalk-dim">
                <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-hot" />
                {href ? (
                  <a href={href} className="tiza-link inline-flex min-h-11 items-center text-chalk">
                    {label}
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center">{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-chalk/20 pt-6 font-mono text-xs uppercase tracking-wider text-chalk-dim sm:flex-row sm:items-center">
          <p>© 2026 91.5 Espacio Sport FM · Mercedes, Uruguay</p>
          <p>
            Desarrollado por{" "}
            <Link
              href="https://beima.dev"
              className="tiza-link inline-flex min-h-11 items-center text-chalk"
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
