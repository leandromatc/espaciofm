import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PaginaMensaje,
  botonPrincipal,
  enlaceSecundario,
} from "@/components/PaginaMensaje";

export const metadata: Metadata = {
  title: "Página no encontrada · 91.5 Espacio Sport FM",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <PaginaMensaje
        titulo="No hay señal acá"
        acciones={
          <>
            <Link href="/" className={botonPrincipal}>
              Volver al inicio
            </Link>
            <Link href="/programacion" className={enlaceSecundario}>
              Ver la programación
            </Link>
          </>
        }
      >
        Esa página no existe o cambió de lugar. Volvé al aire desde el inicio.
      </PaginaMensaje>
      <Footer />
    </>
  );
}
