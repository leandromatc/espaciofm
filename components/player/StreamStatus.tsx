"use client";

import type { ReactNode } from "react";
import { usePlayer } from "./PlayerProvider";
import { Equalizer } from "./Equalizer";

/** Avisa (sin gritar) cuando el stream conecta o falla. Vacío si todo va bien. */
export function StreamStatusText({ className = "" }: { className?: string }) {
  const { status, isPlaying } = usePlayer();
  const text =
    status === "error"
      ? "No se pudo conectar. Probá de nuevo."
      : status === "connecting" && isPlaying
        ? "Conectando…"
        : "";
  return (
    <span role="status" aria-live="polite" className={className}>
      {text}
    </span>
  );
}

/**
 * Línea de estado del tablero, pegada al disco: una sola cosa a la vez.
 * El ecualizador solo se mueve cuando ya hay audio (evento playing).
 */
export function HeroStatus() {
  const { status, isPlaying, hasStarted, goToLive } = usePlayer();

  let content: ReactNode;
  if (status === "error") {
    content = (
      <span className="text-brand-hot">
        No se pudo conectar. Tocá el botón para reintentar.
      </span>
    );
  } else if (isPlaying && status === "connecting") {
    content = <span>Conectando…</span>;
  } else if (isPlaying) {
    content = (
      <>
        <Equalizer playing className="[--eq-h:22px] text-brand-hot" />
        <span>Sonando</span>
      </>
    );
  } else if (hasStarted) {
    content = (
      <button
        type="button"
        onClick={goToLive}
        className="tiza-link press inline-flex min-h-11 items-center"
      >
        Ir al vivo
      </button>
    );
  } else {
    content = <span className="text-chalk-dim">Tocá para escuchar</span>;
  }

  return (
    <p
      role="status"
      aria-live="polite"
      className="flex min-h-11 items-center justify-center gap-3 text-center font-sans text-sm font-semibold uppercase tracking-wider"
    >
      {content}
    </p>
  );
}
