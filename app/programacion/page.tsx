import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@supabase/supabase-js";
import { DayChips } from "@/components/programacion/DayChips";
import { EventosEspeciales } from "@/components/programacion/EventosEspeciales";

const fmt = (time: string) => time.slice(0, 5);

// Lectura pública (RLS permite SELECT a todos): sin cookies, así la página es estática (ISR).
// Se regenera al guardar en el admin (revalidatePath("/programacion")) o cada 5 minutos.
// No depende de la hora: el día de hoy y los eventos vencidos se resuelven en el cliente.
export const revalidate = 300;

export default async function ProgramacionPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [{ data: programs }, { data: specialEvents }] = await Promise.all([
    supabase.from("programming").select("*").order("start_time"),
    // Todos los eventos: cuáles ya pasaron se decide en el cliente, en hora de Montevideo
    supabase
      .from("special_events")
      .select("*")
      .order("date")
      .order("start_time"),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-xl px-5 pb-16">
        <header className="border-b border-chalk/30 pb-4 pt-10 sm:pt-14">
          <h1
            className="font-display font-black uppercase leading-[0.88]"
            style={{ fontSize: "clamp(3.25rem, 11.5vw, 6rem)" }}
          >
            Programación
          </h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-wider text-chalk-dim">
            La grilla de la semana
          </p>
        </header>

        {(programs ?? []).length > 0 ? (
          <ol className="divide-y divide-chalk/15 border-b border-chalk/15">
            {(programs ?? []).map((program) => {
              const days = program.days as string[];
              return (
                <li
                  key={program.id}
                  className="grid grid-cols-[4.75rem_1fr] gap-x-4 gap-y-3 px-3 py-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-x-6 sm:px-5"
                >
                  <div className="font-mono">
                    <p className="text-lg font-bold leading-none sm:text-2xl">
                      {fmt(program.start_time)}
                    </p>
                    <p className="mt-1 text-xs text-chalk-dim">
                      a {fmt(program.end_time)}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">
                      {program.name.trim()}
                    </h2>
                    {program.description && (
                      <p className="mt-1.5 line-clamp-2 text-sm text-chalk-dim">
                        {program.description}
                      </p>
                    )}
                  </div>

                  <DayChips days={days} />
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="py-16 text-chalk-dim">No hay programas cargados todavía.</p>
        )}

        <EventosEspeciales events={specialEvents ?? []} />
      </main>
      <Footer />
    </>
  );
}
