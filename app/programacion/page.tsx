import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { Radio, Star } from "lucide-react";

const fmt = (time: string) => time.slice(0, 5);

const DAY_ABBR: Record<string, string> = {
  lunes: "LUN",
  martes: "MAR",
  miércoles: "MIÉ",
  jueves: "JUE",
  viernes: "VIE",
  sábado: "SÁB",
  domingo: "DOM",
};

export default async function ProgramacionPage() {
  const supabase = await createSupabaseServerClient();
  const today = new Date().toISOString().split("T")[0];

  const [{ data: programs }, { data: specialEvents }] = await Promise.all([
    supabase.from("programming").select("*").order("start_time"),
    supabase
      .from("special_events")
      .select("*")
      .gte("date", today)
      .order("date")
      .order("start_time"),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-lg px-5 pb-16">
        {/* Header */}
        <div className="py-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-red-500">
            <Radio className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">91.5 FM</span>
          </div>
          <h1 className="text-4xl font-bold lg:text-6xl">Programación</h1>
          <p className="mt-3 text-neutral-400">
            La grilla semanal de Espacio Sport
          </p>
        </div>

        {/* Programs grid */}
        {(programs ?? []).length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {(programs ?? []).map((program) => (
              <article
                key={program.id}
                className="flex gap-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-inset ring-neutral-800"
              >
                {/* Time block */}
                <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-neutral-800 py-2 text-center">
                  <span className="text-sm font-bold tabular-nums text-white">
                    {fmt(program.start_time)}
                  </span>
                  <span className="text-[10px] text-neutral-500">a</span>
                  <span className="text-sm font-bold tabular-nums text-white">
                    {fmt(program.end_time)}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold leading-tight">
                    {program.name}
                  </h2>
                  {program.description && (
                    <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                      {program.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(program.days as string[]).map((day) => (
                      <span
                        key={day}
                        className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium uppercase text-neutral-400"
                      >
                        {DAY_ABBR[day] ?? day.slice(0, 3).toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-neutral-500">
            No hay programas cargados aún.
          </p>
        )}

        {/* Special events */}
        {(specialEvents ?? []).length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex items-center gap-3">
              <Star className="h-5 w-5 text-amber-400" />
              <h2 className="text-2xl font-bold">Eventos especiales</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {specialEvents!.map((event) => (
                <article
                  key={event.id}
                  className="flex gap-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-inset ring-amber-500/20"
                >
                  {/* Date block */}
                  <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-amber-500/10 py-2 text-center">
                    <span className="text-xs font-bold uppercase text-amber-400">
                      {new Date(event.date + "T12:00:00").toLocaleDateString(
                        "es-UY",
                        { month: "short" },
                      )}
                    </span>
                    <span className="text-2xl font-bold tabular-nums text-white">
                      {new Date(event.date + "T12:00:00").getDate()}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {fmt(event.start_time)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 inline-block rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                      Evento especial
                    </span>
                    <h2 className="font-semibold leading-tight">{event.name}</h2>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {fmt(event.start_time)} – {fmt(event.end_time)}
                    </p>
                    {event.description && (
                      <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
