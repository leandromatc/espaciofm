"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  useSchedule,
  type Slot,
} from "@/components/schedule/ScheduleProvider";

/**
 * Arriba de todo: hay una transmisión especial hoy y todavía no empezó.
 * En la última hora suma la cuenta regresiva (se actualiza cada minuto con el
 * reloj del ScheduleProvider). Sin datos o sin evento, no ocupa lugar.
 */
export function FranjaHoy() {
  const { ready, todayEvent, minutesToEvent } = useSchedule();
  const show = ready && todayEvent !== null;

  // Cuando el evento empieza, la franja se cierra con la transición: el contenido
  // se queda hasta que termina de plegarse en vez de desaparecer de golpe.
  const last = useRef<Slot | null>(null);
  if (show && todayEvent) last.current = todayEvent;
  const event = show ? todayEvent : last.current;

  let cuenta = "";
  if (show && minutesToEvent !== null && minutesToEvent <= 60) {
    cuenta =
      minutesToEvent <= 1 ? "Ya empieza" : `Empieza en ${minutesToEvent} min`;
  }

  return (
    // grid 0fr -> 1fr: la franja se abre una sola vez cuando llegan los datos,
    // en vez de empujar todo de golpe
    <div
      inert={!show}
      aria-hidden={!show || undefined}
      className={`grid transition-[grid-template-rows] duration-300 ease-out-expo motion-reduce:transition-none ${
        show ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        {event && (
          <Link
            href="/#transmisiones"
            className="press flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 bg-brand px-4 py-2 text-center font-sans text-sm font-bold uppercase tracking-wider text-white"
          >
            <span>
              Hoy: {event.name} · {event.start}
              {event.lugar ? ` · ${event.lugar}` : ""}
            </span>
            {cuenta && (
              <span
                role="timer"
                aria-live="off"
                className="bg-white px-2 py-0.5 text-brand"
              >
                {cuenta}
              </span>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
