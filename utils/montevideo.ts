// La radio vive en hora de Uruguay. Sin esto, el "hoy" cambia a las 21:00
// (cuando en UTC ya es mañana) y la programación sale vacía o corrida.
const TZ = "America/Montevideo";

export type MontevideoNow = {
  /** "lunes", "martes", "miércoles"... igual que se guarda en `programming.days` */
  day: string;
  /** "2026-10-09" */
  date: string;
  /** "09:42" */
  time: string;
  /** minutos desde las 00:00 */
  minutes: number;
};

export function montevideoNow(base: Date = new Date()): MontevideoNow {
  const parts = new Intl.DateTimeFormat("es-UY", {
    timeZone: TZ,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(base);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hh = get("hour").padStart(2, "0");
  const mm = get("minute").padStart(2, "0");
  return {
    day: get("weekday").toLowerCase(),
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${hh}:${mm}`,
    minutes: Number(hh) * 60 + Number(mm),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return Number(h) * 60 + Number(m);
};

export const DAYS = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
] as const;
