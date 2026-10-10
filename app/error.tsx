"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PaginaMensaje,
  botonPrincipal,
  enlaceSecundario,
} from "@/components/PaginaMensaje";

// Error en una página: se muestra dentro del sitio, con el menú, y permite reintentar.
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Navbar />
      <PaginaMensaje
        titulo="Se cortó la transmisión"
        acciones={
          <>
            <button type="button" onClick={reset} className={botonPrincipal}>
              Reintentar
            </button>
            <Link href="/" className={enlaceSecundario}>
              Volver al inicio
            </Link>
          </>
        }
      >
        Algo falló de nuestro lado. Probá de nuevo; si sigue, volvé al inicio y
        escuchá la radio en vivo.
      </PaginaMensaje>
      <Footer />
    </>
  );
}
