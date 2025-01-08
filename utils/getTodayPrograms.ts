import { fetchPrograms } from "./fetchPrograms";

export const getTodayPrograms = async () => {
  const now = new Date();
  const currentDay = now.toLocaleString("es-UY", { weekday: "long" });
  const programs = await fetchPrograms();
  const todayPrograms = programs
    .filter((program) => program.days.includes(currentDay))
    .sort((a, b) => a.start_time.localeCompare(b.start_time));
  return todayPrograms;
};
