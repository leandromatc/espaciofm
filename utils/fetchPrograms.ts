import { supabase } from "../lib/supabaseClient";
const formatTime = (time: string): string => time.slice(0, 5);

type Program = {
  id: number;
  name: string;
  days: string[];
  start_time: string;
  end_time: string;
  description: string;
};

export const fetchPrograms = async (): Promise<Program[]> => {
  const { data, error } = await supabase.from("programming").select("*");

  if (error) {
    console.error("Error fetching programs:", error);
    return [];
  }

  return data.map((program) => ({
    ...program,
    start_time: formatTime(program.start_time),
    end_time: formatTime(program.end_time),
  }));
};
