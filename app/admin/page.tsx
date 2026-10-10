import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  MapPin,
  Plus,
  Video,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { Database } from "@/types/supabase";
import { fetchAllNews } from "@/utils/fetchNews";
import { fetchPrograms } from "@/utils/fetchPrograms";
import { montevideoNow, toMinutes, type MontevideoNow } from "@/utils/montevideo";
import { MEDIO_LABEL, medioOf, radioIdsOf } from "@/lib/medio";
import {
  formatEventDate,
  formatLongToday,
  formatNewsDate,
  formatTime,
} from "@/lib/adminFormat";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import {
  Card,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/admin/ui/card";

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

type Item = { key: string; name: string; start: string; end: string };

/** Qué está al aire ahora y qué sigue hoy, en la radio. */
function ahoraYSigue(
  programs: Awaited<ReturnType<typeof fetchPrograms>>,
  events: SpecialEvent[],
  now: MontevideoNow,
) {
  const radioIds = radioIdsOf(events);
  const items: Item[] = [
    ...programs
      .filter((p) => p.days.includes(now.day))
      .map((p) => ({
        key: `p${p.id}`,
        name: p.name.trim(),
        start: formatTime(p.start_time),
        end: formatTime(p.end_time),
      })),
    ...events
      .filter((e) => e.date === now.date && radioIds.has(e.id))
      .map((e) => ({
        key: `e${e.id}`,
        name: e.name.trim(),
        start: formatTime(e.start_time),
        end: formatTime(e.end_time),
      })),
  ].sort((a, b) => a.start.localeCompare(b.start));

  // Un evento en curso manda sobre la grilla (igual que en el sitio)
  const live = (i: Item) =>
    toMinutes(i.start) <= now.minutes && now.minutes < toMinutes(i.end);
  const actual =
    items.find((i) => i.key.startsWith("e") && live(i)) ??
    items.find(live) ??
    null;
  const siguiente = items.find((i) => toMinutes(i.start) > now.minutes) ?? null;
  const soloVideo =
    events.find(
      (e) =>
        e.date === now.date &&
        !radioIds.has(e.id) &&
        e.en_cv10 &&
        toMinutes(e.start_time) <= now.minutes &&
        now.minutes < toMinutes(e.end_time),
    ) ?? null;
  return { actual, siguiente, soloVideo };
}

export default async function AdminDashboard() {
  const now = montevideoNow();
  const [news, programs, upcomingEvents] = await Promise.all([
    fetchAllNews(),
    fetchPrograms(),
    getUpcomingEvents(now),
  ]);
  const radioIds = radioIdsOf(upcomingEvents);
  const { actual, siguiente, soloVideo } = ahoraYSigue(programs, upcomingEvents, now);

  return (
    <>
      <PageHeader
        title="Inicio"
        description={formatLongToday(now.date)}
        action={
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex lg:hidden"
            render={<Link href="/" target="_blank" rel="noopener noreferrer" />}
          >
            Ver sitio
            <ExternalLink aria-hidden />
          </Button>
        }
      />

      <div className="flex flex-col gap-6">
        {/* Qué sale ahora */}
        <Card>
          <CardPanel className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Al aire ahora
                </p>
                <p className="mt-1 truncate text-lg font-semibold leading-6">
                  {actual ? actual.name : "Nada de la grilla ahora"}
                </p>
                {actual && (
                  <p className="tnum mt-0.5 font-mono text-sm text-muted-foreground">
                    {actual.start}–{actual.end}
                  </p>
                )}
              </div>
              {actual && (
                <Badge variant="live">
                  <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                  En vivo
                </Badge>
              )}
            </div>
            {siguiente && (
              <p className="border-t border-border pt-3 text-sm text-muted-foreground">
                Sigue{" "}
                <span className="font-medium text-foreground">{siguiente.name}</span>{" "}
                <span className="tnum font-mono">a las {siguiente.start}</span>
              </p>
            )}
            {soloVideo && (
              <p className="flex items-center gap-2 border-t border-border pt-3 text-sm">
                <Video aria-hidden className="size-4 text-warning-foreground" />
                <span>
                  Ahora en CV10 (sin radio):{" "}
                  <span className="font-medium">{soloVideo.name}</span>
                </span>
              </p>
            )}
          </CardPanel>
        </Card>

        {/* Crear */}
        <section aria-labelledby="crear" className="flex flex-col gap-2">
          <h2 id="crear" className="text-sm font-medium text-muted-foreground">
            Crear
          </h2>
          <div className="grid gap-2 sm:grid-cols-3">
            <Button size="lg" render={<Link href="/admin/noticias/nueva" />}>
              <Plus aria-hidden />
              Nueva noticia
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/admin/programacion/eventos/nuevo" />}
            >
              <Plus aria-hidden />
              Nuevo evento
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/admin/programacion/nuevo" />}
            >
              <Plus aria-hidden />
              Nuevo programa
            </Button>
          </div>
        </section>

        {/* Atajos con números: en una línea, sin tarjetas */}
        <nav aria-label="Atajos" className="-mt-2 flex flex-wrap gap-x-5">
          <Atajo href="/admin/noticias" texto={`${news.length} noticias`} />
          <Atajo href="/admin/programacion" texto={`${programs.length} programas`} />
          <Atajo href="/admin/programacion?tab=eventos" texto={`${upcomingEvents.length} eventos por venir`} />
        </nav>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Próximos eventos */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Próximos eventos</CardTitle>
            </CardHeader>
            {upcomingEvents.length === 0 ? (
              <CardPanel className="pt-0 text-sm text-muted-foreground">
                No hay eventos cargados.{" "}
                <Link
                  href="/admin/programacion/eventos/nuevo"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Cargar el próximo partido
                </Link>
              </CardPanel>
            ) : (
              <ul className="divide-y divide-border border-t border-border">
                {upcomingEvents.slice(0, 4).map((e) => {
                  const medio = medioOf(radioIds.has(e.id), e.en_cv10);
                  return (
                    <li key={e.id}>
                      <Link
                        href={`/admin/programacion/eventos/${e.id}`}
                        className="flex items-center gap-3 p-3 outline-none transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-5"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            {e.name}
                          </span>
                          <span className="tnum mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                            <span className="font-mono">
                              {formatEventDate(e.date, now.date)} ·{" "}
                              {formatTime(e.start_time)}
                            </span>
                            {e.lugar && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin aria-hidden className="size-3" />
                                {e.lugar}
                              </span>
                            )}
                          </span>
                        </span>
                        <Badge
                          variant={
                            medio === "radio-cv10"
                              ? "info"
                              : medio === "cv10"
                                ? "warning"
                                : "secondary"
                          }
                        >
                          {MEDIO_LABEL[medio]}
                        </Badge>
                        <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          {/* Noticias recientes */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Noticias recientes</CardTitle>
            </CardHeader>
            {news.length === 0 ? (
              <CardPanel className="pt-0 text-sm text-muted-foreground">
                Todavía no hay noticias.{" "}
                <Link
                  href="/admin/noticias/nueva"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Crear la primera
                </Link>
              </CardPanel>
            ) : (
              <ul className="divide-y divide-border border-t border-border">
                {news.slice(0, 4).map((n) => (
                  <li key={n.id}>
                    <Link
                      href={`/admin/noticias/${n.id}`}
                      className="flex items-center gap-3 p-3 outline-none transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-5"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {n.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {formatNewsDate(n.created_at)}
                        </span>
                      </span>
                      <Badge variant={n.published ? "success" : "warning"}>
                        {n.published ? "Publicada" : "Borrador"}
                      </Badge>
                      <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

function Atajo({ href, texto }: { href: string; texto: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
    >
      {texto}
    </Link>
  );
}
