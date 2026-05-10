import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#noticias", label: "Noticias" },
  { href: "/programacion", label: "Programación" },
  { href: "/#servicios", label: "Servicios" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-800/60 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            width={320}
            height={160}
            alt="Logo de 91.5FM Espacio Sport"
            className="max-w-[150px]"
          />
        </Link>

        <div className="flex items-center gap-1">
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
      </div>
    </nav>
  );
};

export default Navbar;
