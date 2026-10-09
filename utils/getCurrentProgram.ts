import { fetchPrograms } from "./fetchPrograms";
import { supabase } from "../lib/supabaseClient";
import { montevideoNow } from "./montevideo";

const fmt = (time: string) => time.slice(0, 5);

type SpecialEvent = {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string | null;
};

export const getCurrentProgram = async () => {
  // Hora de Uruguay, no la del navegador ni UTC. Las filas guardan HH:MM:SS.
  const { day: currentDay, date: todayDate, time } = montevideoNow();
  const currentTime = `${time}:00`;

  const [programs, { data: rawSpecial }] = await Promise.all([
    fetchPrograms(),
    supabase.from("special_events").select("*").eq("date", todayDate),
  ]);
  const specialEvents = (rawSpecial ?? []) as SpecialEvent[];

  // fetchPrograms devuelve HH:MM; se compara por HH:MM
  const hhmm = time;
  const regularMatch = programs.find(
    (p) =>
      p.days.includes(currentDay) && hhmm >= p.start_time && hhmm < p.end_time,
  );
  if (regularMatch) return regularMatch;

  const specialMatch = specialEvents.find(
    (e) => currentTime >= e.start_time && currentTime < e.end_time,
  );
  if (specialMatch)
    return {
      id: specialMatch.id,
      name: specialMatch.name,
      days: [] as string[],
      start_time: fmt(specialMatch.start_time),
      end_time: fmt(specialMatch.end_time),
      description: specialMatch.description ?? "",
    };

  return null;
};
