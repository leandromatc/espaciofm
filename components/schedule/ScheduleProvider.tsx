"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fetchPrograms } from "@/utils/fetchPrograms";
import { supabase } from "@/lib/supabaseClient";
import { DAYS, montevideoNow, toMinutes } from "@/utils/montevideo";
import { radioIdsOf } from "@/lib/medio";

export type Slot = {
  key: string;
  name: string;
  description: string;
  start: string; // HH:MM
  end: string; // HH:MM
  isSpecial: boolean;
  /** YYYY-MM-DD, solo eventos especiales */
  date?: string;
  /** cancha o lugar, solo eventos especiales */
  lugar?: string | null;
  /** el evento tiene video por CV10, solo eventos especiales */
  enCv10?: boolean;
  /** suena por la radio, solo eventos especiales (false = solo CV10) */
  enRadio?: boolean;
};

type Program = {
  id: number;
  name: string;
  days: string[];
  start_time: string;
  end_time: string;
  description: string;
};

type SpecialEvent = {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string | null;
  // columnas opcionales: son undefined hasta aplicar la migración 004
  lugar?: string | null;
  en_cv10?: boolean | null;
};

export type NextSlot = Slot & {
  /** "hoy", "mañana" o el día ("lunes") */
  when: string;
};

type ScheduleState = {
  ready: boolean;
  today: Slot[];
  /** programa de la grilla al aire ahora */
  current: Slot | null;
  /** evento especial en curso ahora (tiene prioridad sobre la grilla) */
  liveEvent: Slot | null;
  /** evento en curso que va solo por CV10: la radio sigue con su programa */
  liveVideoOnly: Slot | null;
  /** primer evento especial de hoy que todavía no empezó */
  todayEvent: Slot | null;
  /** minutos que faltan para todayEvent */
  minutesToEvent: number | null;
  /** lo que está al aire: el evento en curso o, si no hay, el programa */
  onAir: Slot | null;
  next: NextSlot | null;
  /** Eventos especiales de hoy en adelante que todavía no terminaron */
  upcoming: Slot[];
  /** minuto de juego: transcurrido y total del programa al aire */
  progress: { elapsed: number; total: number } | null;
  /** minutos desde las 00:00, hora de Montevideo (0 hasta que monta el cliente) */
  nowMinutes: number;
  nowLabel: { day: string; date: string };
};

const ScheduleContext = createContext<ScheduleState | null>(null);

const hhmm = (t: string) => t.slice(0, 5);

function addDays(date: string, n: number) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [specials, setSpecials] = useState<SpecialEvent[]>([]);
  const [loaded, setLoaded] = useState(false);
  // null en el servidor y en el primer render del cliente: nada depende de la hora
  // hasta que monta, así el HTML prerenderizado y la hidratación coinciden siempre.
  const [tick, setTick] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      const { date } = montevideoNow();
      // Cada consulta falla por su cuenta: si los eventos no cargan, la grilla igual se ve
      const [progs, sp] = await Promise.all([
        fetchPrograms().catch(() => [] as Program[]),
        Promise.resolve(
          supabase
            .from("special_events")
            .select("*")
            .gte("date", date)
            .order("date")
            .order("start_time"),
        )
          .then(({ data }) => (data ?? []) as SpecialEvent[])
          .catch(() => [] as SpecialEvent[]),
      ]);
      if (!alive) return;
      setPrograms(progs as Program[]);
      setSpecials(sp);
      setLoaded(true);
    }
    load();
    // Reloj: se actualiza al cambiar cada minuto (no cada N segundos desde que cargó la página)
    // y de nuevo al volver a la pestaña, porque el celular congela los timers en segundo plano.
    let timer: ReturnType<typeof setTimeout>;
    const sync = () => setTick(Date.now());
    const arm = () => {
      const msToNextMinute = 60_000 - (Date.now() % 60_000) + 50;
      timer = setTimeout(() => {
        sync();
        arm();
      }, msToNextMinute);
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };
    sync();
    arm();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", sync);
    return () => {
      alive = false;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", sync);
    };
  }, []);

  const value = useMemo<ScheduleState>(() => {
    if (tick === null) {
      return {
        ready: false,
        today: [],
        current: null,
        liveEvent: null,
        liveVideoOnly: null,
        todayEvent: null,
        minutesToEvent: null,
        onAir: null,
        next: null,
        upcoming: [],
        progress: null,
        nowMinutes: 0,
        nowLabel: { day: "", date: "" },
      };
    }
    const now = montevideoNow(new Date(tick));
    // qué eventos suenan por la radio (se deduce del horario y de CV10)
    const radioIds = radioIdsOf(specials);

    const slotsFor = (day: string, date: string): Slot[] => {
      const regular: Slot[] = programs
        .filter((p) => p.days.includes(day))
        .map((p) => ({
          key: `p-${p.id}`,
          name: p.name.trim(),
          description: p.description ?? "",
          start: hhmm(p.start_time),
          end: hhmm(p.end_time),
          isSpecial: false,
        }));
      const special: Slot[] = specials
        // la grilla es de la radio: los eventos solo de CV10 no entran
        .filter((e) => e.date === date && radioIds.has(e.id))
        .map((e) => ({
          key: `s-${e.id}`,
          name: e.name.trim(),
          description: e.description ?? "",
          start: hhmm(e.start_time),
          end: hhmm(e.end_time),
          isSpecial: true,
          date: e.date,
          lugar: e.lugar?.trim() || null,
          enCv10: e.en_cv10 === true, enRadio: radioIds.has(e.id),
        }));
      return [...regular, ...special].sort((a, b) =>
        a.start.localeCompare(b.start),
      );
    };

    const today = slotsFor(now.day, now.date);
    const current =
      today.find(
        (s) =>
          !s.isSpecial &&
          now.minutes >= toMinutes(s.start) &&
          now.minutes < toMinutes(s.end),
      ) ??
      today.find(
        (s) =>
          s.isSpecial &&
          now.minutes >= toMinutes(s.start) &&
          now.minutes < toMinutes(s.end),
      ) ??
      null;

    // Eventos especiales de hoy, de cualquier medio. La radio transmite uno a la vez:
    // el que está en curso por radio manda sobre la grilla; si va solo por CV10, el
    // héroe sigue con el programa y se ofrece el video.
    const specialsToday: Slot[] = specials
      .filter((e) => e.date === now.date)
      .map((e) => ({
        key: `s-${e.id}`,
        name: e.name.trim(),
        description: e.description ?? "",
        start: hhmm(e.start_time),
        end: hhmm(e.end_time),
        isSpecial: true,
        date: e.date,
        lugar: e.lugar?.trim() || null,
        enCv10: e.en_cv10 === true,
        enRadio: radioIds.has(e.id),
      }))
      .sort((a, b) => a.start.localeCompare(b.start));
    const isLive = (s: Slot) =>
      now.minutes >= toMinutes(s.start) && now.minutes < toMinutes(s.end);
    const liveEvent = specialsToday.find((s) => s.enRadio && isLive(s)) ?? null;
    const liveVideoOnly =
      specialsToday.find((s) => !s.enRadio && s.enCv10 && isLive(s)) ?? null;
    const todayEvent =
      specialsToday.find((s) => toMinutes(s.start) > now.minutes) ?? null;
    const minutesToEvent = todayEvent
      ? toMinutes(todayEvent.start) - now.minutes
      : null;
    const onAir = liveEvent ?? current;

    let next: NextSlot | null = null;
    const laterToday = today.find((s) => toMinutes(s.start) > now.minutes);
    if (laterToday) {
      next = { ...laterToday, when: "hoy" };
    } else {
      // Si hoy no queda nada, buscamos el primero de los próximos 7 días
      const startIdx = DAYS.indexOf(now.day as (typeof DAYS)[number]);
      for (let i = 1; i <= 7 && !next; i++) {
        const day = DAYS[(startIdx + i) % 7];
        const date = addDays(now.date, i);
        const first = slotsFor(day, date)[0];
        if (first) next = { ...first, when: i === 1 ? "mañana" : day };
      }
    }

    const upcoming = specials
      .filter(
        (e) =>
          e.date > now.date ||
          (e.date === now.date && toMinutes(hhmm(e.end_time)) > now.minutes),
      )
      .map<Slot>((e) => ({
        key: `s-${e.id}`,
        name: e.name.trim(),
        description: e.description ?? "",
        start: hhmm(e.start_time),
        end: hhmm(e.end_time),
        isSpecial: true,
        date: e.date,
        lugar: e.lugar?.trim() || null,
        enCv10: e.en_cv10 === true, enRadio: radioIds.has(e.id),
      }));

    const progress = onAir
      ? {
          elapsed: now.minutes - toMinutes(onAir.start),
          total: toMinutes(onAir.end) - toMinutes(onAir.start),
        }
      : null;

    return {
      ready: loaded && tick !== null,
      today,
      current,
      liveEvent,
      liveVideoOnly,
      todayEvent,
      minutesToEvent,
      onAir,
      next,
      upcoming,
      progress,
      nowMinutes: now.minutes,
      nowLabel: { day: now.day, date: now.date },
    };
  }, [programs, specials, loaded, tick]);

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule debe usarse dentro de ScheduleProvider");
  return ctx;
}
