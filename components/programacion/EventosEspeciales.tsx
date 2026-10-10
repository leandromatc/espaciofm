"use client";

import { useSchedule } from "@/components/schedule/ScheduleProvider";
import { toMinutes } from "@/utils/montevideo";
import { MEDIO_LABEL, medioOf, radioIdsOf } from "@/lib/medio";

export type EventoEspecial = {
  id: number;
  name: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string;
  description: string | null;
  lugar?: string | null;
  en_cv10?: boolean | null;
};

const fmt = (time: string) => time.slice(0, 5);

/**
 * Eventos que todavía no terminaron. El servidor manda todos y el cliente filtra
 * con la hora de Montevideo; hasta que monta no muestra nada, así el HTML cacheado
 * nunca enseña un evento que ya pasó.
 */
export function EventosEspeciales({ events }: { events: EventoEspecial[] }) {
  const { nowLabel, nowMinutes } = useSchedule();
  if (!nowLabel.date) return null;

  const radioIds = radioIdsOf(events);
  const upcoming = events.filter(
    (e) =>
      e.date > nowLabel.date ||
      (e.date === nowLabel.date && toMinutes(fmt(e.end_time)) > nowMinutes),
  );
  if (upcoming.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-4 border-b border-chalk/30 pb-3 font-display text-5xl font-black uppercase leading-[0.9]">
        Eventos especiales
      </h2>
      <ol className="divide-y divide-chalk/15 border-b border-chalk/15">
        {upcoming.map((event) => {
          const d = new Date(event.date + "T12:00:00");
          return (
            <li
              key={event.id}
              className="grid grid-cols-[4.75rem_1fr] gap-x-4 px-3 py-5 sm:grid-cols-[7rem_1fr] sm:gap-x-6 sm:px-5"
            >
              <div className="font-mono">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-hot">
                  {d
                    .toLocaleDateString("es-UY", { weekday: "short" })
                    .replace(".", "")}
                </p>
                <p className="font-display text-4xl font-black leading-none">
                  {d.getDate()}{" "}
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-chalk-dim">
                    {d
                      .toLocaleDateString("es-UY", { month: "short" })
                      .replace(".", "")}
                  </span>
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">
                  {event.name.trim()}
                </h3>
                <p className="mt-1.5 font-mono text-sm uppercase tracking-wider text-chalk-dim">
                  {fmt(event.start_time)} a {fmt(event.end_time)}
                  {event.lugar ? ` · ${event.lugar}` : ""}
                </p>
                <p
                  className={`mt-1.5 font-sans text-xs font-bold uppercase tracking-wider ${
                    event.en_cv10 ? "text-brand-hot" : "text-chalk-dim"
                  }`}
                >
                  {MEDIO_LABEL[medioOf(radioIds.has(event.id), event.en_cv10)]}
                </p>
                {event.description && (
                  <p className="mt-1.5 line-clamp-2 text-sm text-chalk-dim">
                    {event.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
