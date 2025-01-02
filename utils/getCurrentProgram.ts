import { fetchPrograms } from "./fetchPrograms";

export const getCurrentProgram = async () => {
  const now = new Date();
  const currentDay = now.toLocaleString("es-UY", { weekday: "long" });
  const programs = await fetchPrograms();

  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

  return programs.find(
    (program) =>
      program.days.includes(currentDay) &&
      currentTime >= program.start_time &&
      currentTime < program.end_time,
  );
};
