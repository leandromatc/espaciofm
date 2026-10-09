"use client";

import { useSchedule } from "@/components/schedule/ScheduleProvider";
import { DAYS } from "@/utils/montevideo";

const DAY_LETTER: Record<string, string> = {
  lunes: "L",
  martes: "M",
  miércoles: "X",
  jueves: "J",
  viernes: "V",
  sábado: "S",
  domingo: "D",
};

/**
 * Los siete días de un programa. El render del servidor no sabe qué día es hoy
 * (la página no depende de la hora); el cliente marca el día de hoy en hora de
 * Montevideo apenas monta y lo actualiza solo al pasar la medianoche.
 */
export function DayChips({ days }: { days: string[] }) {
  const { nowLabel } = useSchedule();
  const today = nowLabel.day; // "" hasta que monta

  return (
    <ul
      aria-label={`Días: ${days.join(", ") || "ninguno"}`}
      className="col-start-2 flex gap-1 sm:col-start-auto"
    >
      {DAYS.map((d) => {
        const on = days.includes(d);
        return (
          <li
            key={d}
            aria-hidden
            className={`grid h-7 w-7 place-items-center font-mono text-xs font-bold ${
              on
                ? d === today
                  ? "bg-brand text-white"
                  : "bg-chalk text-ink"
                : "border border-chalk/20 text-chalk/30"
            }`}
          >
            {DAY_LETTER[d]}
          </li>
        );
      })}
    </ul>
  );
}
