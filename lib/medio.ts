// Por dónde se transmite un evento especial. La radio transmite UN partido a la vez:
// un evento puede ir solo por radio, por radio y CV10, o solo por CV10 (video).
//
// No hay una columna "en radio": se deduce. Si un evento marcado con CV10 coincide en
// horario con otro que NO está marcado con CV10, el de CV10 va solo por video (la radio
// se queda con el otro). Un evento con CV10 que no coincide con ninguno va por radio y CV10.
type EventoHorario = {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  en_cv10?: boolean | null;
};

const mins = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));

/** Ids de los eventos que suenan por la radio. */
export function radioIdsOf(events: EventoHorario[]): Set<number> {
  const ids = new Set<number>();
  for (const e of events) {
    if (e.en_cv10 !== true) {
      ids.add(e.id);
      continue;
    }
    const pisaUnoDeRadio = events.some(
      (o) =>
        o.id !== e.id &&
        o.date === e.date &&
        o.en_cv10 !== true &&
        mins(e.start_time) < mins(o.end_time) &&
        mins(o.start_time) < mins(e.end_time),
    );
    if (!pisaUnoDeRadio) ids.add(e.id);
  }
  return ids;
}
export type Medio = "radio" | "radio-cv10" | "cv10";

export function medioOf(
  enRadio: boolean | null | undefined,
  enCv10: boolean | null | undefined,
): Medio {
  // enRadio viene de radioIdsOf(); sin dato se asume radio
  const radio = enRadio !== false;
  const cv10 = enCv10 === true;
  if (radio && cv10) return "radio-cv10";
  if (!radio && cv10) return "cv10";
  return "radio";
}

export const MEDIO_LABEL: Record<Medio, string> = {
  radio: "Radio",
  "radio-cv10": "Radio + CV10",
  cv10: "Solo en CV10",
};
