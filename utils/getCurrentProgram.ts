import { fetchPrograms } from "./fetchPrograms";
import { supabase } from "../lib/supabaseClient";

const fmt = (time: string) => time.slice(0, 5);

export const getCurrentProgram = async () => {
  const now = new Date();
  const currentDay = now.toLocaleString("es-UY", { weekday: "long" });
  const todayDate = now.toISOString().split("T")[0];
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

  const [programs, { data: specialEvents }] = await Promise.all([
    fetchPrograms(),
    supabase.from("special_events").select("*").eq("date", todayDate),
  ]);

  const regularMatch = programs.find(
    (p) =>
      p.days.includes(currentDay) &&
      currentTime >= p.start_time &&
      currentTime < p.end_time,
  );
  if (regularMatch) return regularMatch;

  const specialMatch = (specialEvents ?? []).find(
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
