import { fetchPrograms } from "./fetchPrograms";
import { supabase } from "../lib/supabaseClient";

const fmt = (time: string) => time.slice(0, 5);

type SpecialEvent = {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string | null;
};

export const getTodayPrograms = async () => {
  const now = new Date();
  const currentDay = now.toLocaleString("es-UY", { weekday: "long" });
  const todayDate = now.toISOString().split("T")[0];

  const [programs, { data: rawSpecial }] = await Promise.all([
    fetchPrograms(),
    supabase.from("special_events").select("*").eq("date", todayDate),
  ]);
  const specialEvents = (rawSpecial ?? []) as SpecialEvent[];

  const regularToday = programs.filter((p) => p.days.includes(currentDay));

  const specialToday = specialEvents.map((e) => ({
    id: e.id,
    name: e.name,
    days: [] as string[],
    start_time: fmt(e.start_time),
    end_time: fmt(e.end_time),
    description: e.description ?? "",
    isSpecial: true,
  }));

  return [...regularToday, ...specialToday].sort((a, b) =>
    a.start_time.localeCompare(b.start_time),
  );
};
