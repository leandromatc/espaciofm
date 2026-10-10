"use client";

import "./globals.css";

// Último recurso: falló el layout raíz, así que no hay menú, fuentes ni player.
// Usa solo lo mínimo (HTML plano con los colores del sitio) y un enlace para volver.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es" className="dark">
      <body className="grid min-h-svh place-items-center bg-ink px-5 font-sans text-chalk antialiased">
        <div className="max-w-xl">
          <h1
            className="font-black uppercase leading-[0.9]"
            style={{ fontSize: "clamp(3rem, 11vw, 5.5rem)" }}
          >
            Se cortó la transmisión
          </h1>
          <p className="mt-5 text-lg text-chalk-dim">
            Algo falló de nuestro lado. Probá de nuevo en unos segundos.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center bg-brand px-6 text-sm font-bold uppercase tracking-wider text-white hover:bg-chalk hover:text-ink"
            >
              Reintentar
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="inline-flex min-h-11 items-center text-sm font-semibold uppercase tracking-wider underline underline-offset-4">
              Volver al inicio
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
