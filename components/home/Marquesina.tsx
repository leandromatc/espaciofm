"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { useSchedule } from "@/components/schedule/ScheduleProvider";

const BASE = "Espacio Sport 91.5 FM · Mercedes, Soriano";

function Dot() {
  return (
    <span
      aria-hidden
      className="mx-5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
    />
  );
}

/**
 * La cinta blanca de arriba: lo que suena ahora, lo que sigue y el video de CV10.
 * Se arma con la programación real; mientras carga, muestra solo el nombre.
 */
export function Marquesina() {
  const { ready, onAir, next, upcoming } = useSchedule();
  // WCAG 2.2.2: la cinta se mueve sola más de 5 s, así que se puede frenar con un toque
  const [paused, setPaused] = useState(false);

  const items: string[] = [];
  if (ready) {
    items.push(
      onAir ? `Al aire: ${onAir.name}` : "Al aire: Espacio Sport 91.5",
    );
    if (next) {
      const when = next.when === "hoy" ? "" : `${next.when} `;
      items.push(`Sigue: ${next.name} · ${when}${next.start}`);
    }
    const nextSpecial = upcoming.find((s) => s.key !== next?.key && s.key !== onAir?.key);
    if (nextSpecial?.date) {
      const d = new Date(`${nextSpecial.date}T12:00:00`);
      const label = d.toLocaleDateString("es-UY", {
        weekday: "short",
        day: "numeric",
      });
      items.push(`Transmisión: ${nextSpecial.name} · ${label} ${nextSpecial.start}`);
    }
    items.push("Video en vivo por CV10");
  }
  items.push(BASE);

  const segment = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center whitespace-nowrap py-2.5 font-display text-lg font-extrabold uppercase tracking-wider text-ink"
    >
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          {t}
          <Dot />
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-chrome
      className="cinta relative overflow-hidden bg-chalk"
      role="region"
      aria-label={items.slice(0, 2).join(". ")}
    >
      <div className="cinta-track" style={{ animationPlayState: paused || !ready ? "paused" : undefined }}>
        {segment(false)}
        {segment(true)}
        {segment(true)}
        {segment(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Reanudar la cinta de novedades" : "Pausar la cinta de novedades"}
        className="press absolute inset-y-0 right-0 grid w-11 place-items-center border-l border-ink/20 bg-chalk text-ink motion-reduce:hidden"
      >
        {paused ? <Play aria-hidden className="h-4 w-4" fill="currentColor" /> : <Pause aria-hidden className="h-4 w-4" fill="currentColor" />}
      </button>
    </div>
  );
}
