import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { Database, News } from "@/types/supabase";
import { fetchAllNews } from "@/utils/fetchNews";
import { fetchPrograms } from "@/utils/fetchPrograms";
import {
  montevideoNow,
  toMinutes,
  type MontevideoNow,
} from "@/utils/montevideo";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CircleDot,
  MapPin,
  Newspaper,
  Plus,
  Radio,
  Video,
} from "lucide-react";
import Link from "next/link";

type SpecialEvent = Database["special_events"];

async function getUpcomingEvents(now: MontevideoNow) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("special_events")
    .select("*")
    .gte("date", now.date)
    .order("date")
    .order("start_time");

  if (error) {
    console.error("Error fetching dashboard events:", error);
    return [];
  }

  return ((data as SpecialEvent[]) ?? []).filter(
    (event) => event.date > now.date || toMinutes(event.end_time) > now.minutes,
  );
}

export default async function AdminDashboard() {
  const now = montevideoNow();
  const [news, programs, upcomingEvents] = await Promise.all([
    fetchAllNews(),
    fetchPrograms(),
    getUpcomingEvents(now),
  ]);
  const publishedCount = news.filter((item) => item.published).length;
  const draftCount = news.length - publishedCount;
  const cv10Count = upcomingEvents.filter((event) => event.en_cv10).length;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <header className="mb-8 flex flex-col gap-5 border-b border-neutral-800 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Panel de administración
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">
            Gestioná lo que sale al aire, las transmisiones especiales y las
            noticias del sitio.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg border border-neutral-700 px-4 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-900 hover:text-white"
        >
          Ver sitio
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </header>

      <section aria-label="Resumen" className="mb-8">
        <div className="grid overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 sm:grid-cols-3 sm:divide-x sm:divide-neutral-800">
          <SummaryItem
            icon={<Newspaper className="h-5 w-5" />}
            label="Noticias"
            value={news.length}
            detail={`${publishedCount} publicadas · ${draftCount} borradores`}
            href="/admin/noticias"
          />
          <SummaryItem
            icon={<Radio className="h-5 w-5" />}
            label="Programas semanales"
            value={programs.length}
            detail="Grilla habitual"
            href="/admin/programacion"
          />
          <SummaryItem
            icon={<CalendarClock className="h-5 w-5" />}
            label="Próximos eventos"
            value={upcomingEvents.length}
            detail={
              cv10Count === 1
                ? "1 con transmisión CV10"
                : `${cv10Count} con transmisión CV10`
            }
            href="/admin/programacion#eventos-especiales"
          />
        </div>
      </section>

      <section className="mb-10" aria-labelledby="quick-actions-title">
        <h2
          id="quick-actions-title"
          className="mb-3 text-sm font-semibold text-neutral-300"
        >
          Crear contenido
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <QuickAction href="/admin/noticias/nueva" label="Nueva noticia" />
          <QuickAction
            href="/admin/programacion/nuevo"
            label="Nuevo programa"
          />
          <QuickAction
            href="/admin/programacion/eventos/nuevo"
            label="Nuevo evento especial"
            primary
          />
        </div>
      </section>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <RecentNews news={news.slice(0, 5)} />
        <UpcomingEvents events={upcomingEvents.slice(0, 4)} now={now} />
      </div>
    </div>
  );
}

function SummaryItem({
  icon,
  label,
  value,
  detail,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  detail: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-36 items-start justify-between border-b border-neutral-800 p-5 transition-colors last:border-b-0 hover:bg-neutral-900 sm:border-b-0"
    >
      <div>
        <div className="mb-5 text-neutral-500 transition-colors group-hover:text-red-400">
          {icon}
        </div>
        <p className="text-3xl font-semibold tracking-tight text-white">
          {value}
        </p>
        <p className="mt-1 text-sm font-medium text-neutral-200">{label}</p>
        <p className="mt-1 text-xs text-neutral-400">{detail}</p>
      </div>
      <ArrowRight
        className="mt-0.5 h-4 w-4 text-neutral-600 transition group-hover:translate-x-0.5 group-hover:text-neutral-300"
        aria-hidden="true"
      />
    </Link>
  );
}

function QuickAction({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors sm:justify-start ${
        primary
          ? "bg-red-600 text-white hover:bg-red-500"
          : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white"
      }`}
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}

function RecentNews({ news }: { news: News[] }) {
  return (
    <section aria-labelledby="recent-news-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="recent-news-title" className="text-lg font-semibold text-white">
          Noticias recientes
        </h2>
        <Link
          href="/admin/noticias"
          className="text-sm font-medium text-neutral-400 hover:text-white"
        >
          Ver todas
        </Link>
      </div>

      {news.length > 0 ? (
        <div className="divide-y divide-neutral-800 border-y border-neutral-800">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/admin/noticias/${item.id}`}
              className="group flex min-h-16 items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-100 group-hover:text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  {formatNewsDate(item.created_at)}
                </p>
              </div>
              <StatusBadge published={item.published} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Newspaper className="h-5 w-5" />}
          message="Todavía no hay noticias. Creá la primera para empezar a poblar el sitio."
          href="/admin/noticias/nueva"
          action="Crear noticia"
        />
      )}
    </section>
  );
}

function UpcomingEvents({
  events,
  now,
}: {
  events: SpecialEvent[];
  now: MontevideoNow;
}) {
  return (
    <section aria-labelledby="upcoming-events-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id="upcoming-events-title"
          className="text-lg font-semibold text-white"
        >
          Próximas transmisiones
        </h2>
        <Link
          href="/admin/programacion#eventos-especiales"
          className="text-sm font-medium text-neutral-400 hover:text-white"
        >
          Ver agenda
        </Link>
      </div>

      {events.length > 0 ? (
        <div className="divide-y divide-neutral-800 border-y border-neutral-800">
          {events.map((event) => {
            const isLive =
              event.date === now.date &&
              toMinutes(event.start_time) <= now.minutes &&
              toMinutes(event.end_time) > now.minutes;

            return (
              <Link
                key={event.id}
                href={`/admin/programacion/eventos/${event.id}`}
                className="group block py-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-neutral-100 group-hover:text-white">
                      {event.name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {formatEventDate(event.date, now.date)} ·{" "}
                      {formatTime(event.start_time)}–
                      {formatTime(event.end_time)}
                    </p>
                  </div>
                  {isLive && (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-1 text-[11px] font-semibold text-red-400 ring-1 ring-inset ring-red-500/20">
                      <CircleDot className="h-3 w-3" aria-hidden="true" />
                      Al aire
                    </span>
                  )}
                </div>
                {(event.lugar || event.en_cv10) && (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-400">
                    {event.lugar && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {event.lugar}
                      </span>
                    )}
                    {event.en_cv10 && (
                      <span className="inline-flex items-center gap-1.5 text-neutral-400">
                        <Video className="h-3.5 w-3.5" aria-hidden="true" />
                        CV10
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<CalendarClock className="h-5 w-5" />}
          message="No hay eventos próximos. Cargá el siguiente partido o transmisión especial."
          href="/admin/programacion/eventos/nuevo"
          action="Crear evento"
        />
      )}
    </section>
  );
}

function EmptyState({
  icon,
  message,
  href,
  action,
}: {
  icon: React.ReactNode;
  message: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-neutral-800 bg-neutral-900/40 p-6">
      <div className="mb-3 text-neutral-500">{icon}</div>
      <p className="max-w-sm text-sm leading-6 text-neutral-400">{message}</p>
      <Link
        href={href}
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300"
      >
        {action}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        published
          ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
          : "bg-amber-500/10 text-amber-300 ring-amber-500/20"
      }`}
    >
      {published ? "Publicada" : "Borrador"}
    </span>
  );
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Montevideo",
  }).format(new Date(date));
}

function formatEventDate(date: string, today: string) {
  if (date === today) return "Hoy";
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("es-UY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "America/Montevideo",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}
