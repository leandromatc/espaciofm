import { createClient } from "@supabase/supabase-js";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  ProgramacionPanel,
  type EventoItem,
  type ProgramaItem,
} from "@/components/admin/ProgramacionPanel";
import { formatEventDate, formatTime } from "@/lib/adminFormat";
import { MEDIO_LABEL, medioOf, radioIdsOf } from "@/lib/medio";
import { montevideoNow, toMinutes } from "@/utils/montevideo";

type Program = {
  id: number;
  name: string;
  days: string[];
  start_time: string;
  end_time: string;
};

type SpecialEvent = {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  lugar: string | null;
  en_cv10: boolean;
};

async function getData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [programsRes, eventsRes] = await Promise.all([
    supabase.from("programming").select("*").order("start_time"),
    supabase
      .from("special_events")
      .select("*")
      .order("date")
      .order("start_time"),
  ]);

  return {
    programs: (programsRes.data as Program[]) ?? [],
    events: (eventsRes.data as SpecialEvent[]) ?? [],
  };
}

export default async function AdminProgramacionPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const { programs, events } = await getData();
  const now = montevideoNow();
  const radioIds = radioIdsOf(events);

  const programItems: ProgramaItem[] = programs.map((p) => ({
    id: p.id,
    name: p.name.trim(),
    start: formatTime(p.start_time),
    end: formatTime(p.end_time),
    days: p.days ?? [],
  }));

  const eventItems: EventoItem[] = events.map((e) => {
    const medio = medioOf(radioIds.has(e.id), e.en_cv10);
    return {
      id: e.id,
      name: e.name.trim(),
      dateLabel: formatEventDate(e.date, now.date),
      start: formatTime(e.start_time),
      end: formatTime(e.end_time),
      lugar: e.lugar?.trim() || null,
      medioLabel: MEDIO_LABEL[medio],
      medioVariant:
        medio === "radio-cv10" ? "info" : medio === "cv10" ? "warning" : "secondary",
      past:
        e.date < now.date ||
        (e.date === now.date && toMinutes(e.end_time) <= now.minutes),
    };
  });

  return (
    <>
      <PageHeader
        title="Programación"
        description="La grilla de la semana y los eventos especiales."
      />
      <ProgramacionPanel
        programs={programItems}
        events={eventItems}
        initialTab={tab === "eventos" ? "eventos" : "programas"}
      />
    </>
  );
}
