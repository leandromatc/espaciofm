// Formato de fechas y horas del panel. Siempre en hora de Montevideo.
const TZ = "America/Montevideo";

export const formatTime = (time: string) => time.slice(0, 5);

export function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(date));
}

/** "Hoy", "Mañana" o "vie 10 oct" para una fecha YYYY-MM-DD */
export function formatEventDate(date: string, today: string) {
  if (date === today) return "Hoy";
  const [y, m, d] = date.split("-").map(Number);
  const tomorrow = new Date(`${today}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const isTomorrow = tomorrow.toISOString().slice(0, 10) === date;
  if (isTomorrow) return "Mañana";
  return new Intl.DateTimeFormat("es-UY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: TZ,
  })
    .format(new Date(Date.UTC(y, m - 1, d, 12)))
    .replace(".", "");
}

/** "viernes 9 de octubre" */
export function formatLongToday(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("es-UY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(new Date(Date.UTC(y, m - 1, d, 12)));
}
