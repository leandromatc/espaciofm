import { DAYS } from "@/utils/montevideo";

/**
 * ["lunes","martes","miércoles","jueves","viernes"] -> "lunes a viernes";
 * ["sábado","domingo"] -> "sábado y domingo"; salteados -> "lunes, miércoles y viernes".
 */
export function formatDias(days: string[]): string {
  const idx = [...new Set(days)]
    .map((d) => DAYS.indexOf(d as (typeof DAYS)[number]))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b);
  if (idx.length === 0) return "";
  if (idx.length === 7) return "todos los días";

  const consecutivos = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (consecutivos && idx.length >= 3) {
    return `${DAYS[idx[0]]} a ${DAYS[idx[idx.length - 1]]}`;
  }
  const nombres = idx.map((i) => DAYS[i]);
  if (nombres.length === 1) return nombres[0];
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`;
}
