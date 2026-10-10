import type { ReactNode } from "react";
import { Dial } from "@/components/Dial";

/**
 * Pantalla de mensaje (404, error): el dial busca señal arriba, un titular grande y las
 * salidas. Sin números ni códigos técnicos: dice qué pasó y cómo volver al aire.
 */
export function PaginaMensaje({
  titulo,
  children,
  acciones,
}: {
  titulo: string;
  children: ReactNode;
  acciones: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-screen-xl flex-col justify-center px-5 py-14">
      <div className="max-w-sm">
        <Dial />
      </div>
      <h1
        className="mt-10 max-w-3xl font-display font-black uppercase leading-[0.88]"
        style={{ fontSize: "clamp(3.25rem, 11.5vw, 6rem)" }}
      >
        {titulo}
      </h1>
      <p className="mt-5 max-w-prose text-lg text-chalk-dim">{children}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{acciones}</div>
    </main>
  );
}

export const botonPrincipal =
  "press inline-flex min-h-12 items-center gap-2 bg-brand px-6 font-sans text-sm font-bold uppercase tracking-wider text-white hover:bg-chalk hover:text-ink";
export const enlaceSecundario =
  "tiza-link press inline-flex min-h-11 items-center font-sans text-sm font-semibold uppercase tracking-wider";
