import { createClient } from "@supabase/supabase-js";
import { DeleteProgramButton } from "@/components/admin/DeleteProgramButton";
import Link from "next/link";
import { Plus, Pencil, Calendar } from "lucide-react";

type Program = {
  id: number;
  name: string;
  days: string[];
  start_time: string;
  end_time: string;
  description: string;
};

type SpecialEvent = {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
};

async function getData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [programsRes, eventsRes] = await Promise.all([
    supabase.from("programming").select("*").order("start_time"),
    supabase.from("special_events").select("*").order("date"),
  ]);

  return {
    programs: (programsRes.data as Program[]) ?? [],
    events: (eventsRes.data as SpecialEvent[]) ?? [],
  };
}

const fmt = (t: string) => t?.slice(0, 5) ?? "";

export default async function AdminProgramacionPage() {
  const { programs, events } = await getData();

  return (
    <div className="flex flex-col gap-12">
      {/* ── Programas semanales ─────────────────────── */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Programas semanales</h1>
            <p className="text-sm text-neutral-500">{programs.length} programas</p>
          </div>
          <Link
            href="/admin/programacion/nuevo"
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            <Plus className="h-4 w-4" />
            Nuevo programa
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {programs.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 rounded-lg bg-neutral-900 px-4 py-3 ring-1 ring-inset ring-neutral-800"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-neutral-400">
                  {fmt(p.start_time)} – {fmt(p.end_time)}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.days?.map((day) => (
                    <span
                      key={day}
                      className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs capitalize text-neutral-400 ring-1 ring-inset ring-neutral-700"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/admin/programacion/${p.id}`}
                  className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  title="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteProgramButton id={p.id} type="program" />
              </div>
            </div>
          ))}
          {programs.length === 0 && (
            <p className="py-10 text-center text-sm text-neutral-500">
              No hay programas cargados.
            </p>
          )}
        </div>
      </section>

      {/* ── Eventos especiales ──────────────────────── */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Eventos especiales</h1>
            <p className="text-sm text-neutral-500">{events.length} eventos</p>
          </div>
          <Link
            href="/admin/programacion/eventos/nuevo"
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700"
          >
            <Plus className="h-4 w-4" />
            Nuevo evento
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {events.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between gap-4 rounded-lg bg-neutral-900 px-4 py-3 ring-1 ring-inset ring-neutral-800"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium">{e.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-neutral-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {e.date
                    ? new Date(e.date + "T00:00:00").toLocaleDateString("es-UY", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                  {" · "}
                  {fmt(e.start_time)} – {fmt(e.end_time)}
                </p>
                {e.description && (
                  <p className="text-xs text-neutral-500">{e.description}</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/admin/programacion/eventos/${e.id}`}
                  className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  title="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteProgramButton id={e.id} type="event" />
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="py-10 text-center text-sm text-neutral-500">
              No hay eventos especiales cargados.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
