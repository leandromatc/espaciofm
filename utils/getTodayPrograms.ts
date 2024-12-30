import { programs } from "@/lib/programs";

interface Program {
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
}

export const getTodayPrograms = () => {
  const now = new Date();
  const currentDay = now.toLocaleString("es-UY", { weekday: "long" });
  const todayPrograms: Array<Program> = programs.filter((program) =>
    program.days.includes(currentDay)
  );
  return todayPrograms;
};
