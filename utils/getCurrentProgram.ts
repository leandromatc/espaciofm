import { programs } from "@/lib/programs";

export const getCurrentProgram = () => {
  const now = new Date();
  const currentDay = now.toLocaleString("es-UY", { weekday: "long" });
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return programs.find(
    (program) =>
      program.days.includes(currentDay) &&
      currentTime >= program.startTime &&
      currentTime < program.endTime
  );
};
