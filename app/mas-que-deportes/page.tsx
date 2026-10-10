import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EpisodeList } from "@/components/audio/EpisodeList";
import { SpotifyChip } from "@/components/audio/SpotifyMark";
import { formatDias } from "@/lib/dias";
import { fetchEpisodes, SPOTIFY_SHOW_URL } from "@/lib/podcast";

export const metadata: Metadata = {
  title: "Más que deportes · 91.5 Espacio Sport FM",
  description:
    "Los programas de Más que deportes para escuchar cuando quieras: fútbol y básquet de Mercedes y Soriano.",
};

const PAGE_SIZE = 12;

type Program = {
  id: number;
  name: string;
  days: string[];
  start_time: string;
  end_time: string;
  description: string | null;
};

// Cuándo sale al aire y quién conduce: sale de la grilla (siempre actualizado)
async function getPrograms(): Promise<Program[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data } = await supabase
    .from("programming")
    .select("*")
    .ilike("name", "%que deportes%")
    .order("start_time");
  return (data as Program[]) ?? [];
}

const hhmm = (t: string) => t.slice(0, 5);

export default async function MasQueDeportesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const [programs, { episodes, hasMore, error }] = await Promise.all([
    getPrograms(),
    fetchEpisodes(PAGE_SIZE, (page - 1) * PAGE_SIZE),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-xl px-5 pb-16">
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-chalk/30 pb-4 pt-10 sm:pt-14">
          <h1
            className="font-display font-black uppercase leading-[0.88]"
            style={{ fontSize: "clamp(3.25rem, 11.5vw, 6rem)" }}
          >
            Más que deportes
          </h1>
          <SpotifyChip href={SPOTIFY_SHOW_URL} />
        </header>

        {/* Cuándo sale al aire y quiénes conducen */}
        {programs.length > 0 && (
          <section
            aria-label="Cuándo sale al aire y quiénes conducen"
            className="grid gap-px border-b border-chalk/15 sm:grid-cols-2"
          >
            {programs.map((p) => {
              const sufijo = p.name.split("-").slice(1).join("-").trim();
              return (
                <div key={p.id} className="py-6 sm:pr-8">
                  <h2 className="font-display text-3xl font-extrabold uppercase leading-none">
                    {sufijo || p.name.trim()}
                  </h2>
                  <p className="tnum mt-2 font-mono text-sm uppercase tracking-wider">
                    {formatDias(p.days)} · {hhmm(p.start_time)} a{" "}
                    {hhmm(p.end_time)}
                  </p>
                  {p.description && (
                    <p className="mt-3 max-w-prose text-chalk-dim">
                      {p.description.trim()}
                    </p>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* Los audios */}
        <section className="pt-10">
          <h2 className="mb-4 border-b border-chalk/30 pb-3 font-display text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
            Los programas
          </h2>

          {error ? (
            <div className="py-8">
              <p className="font-display text-3xl font-extrabold uppercase leading-none">
                No pudimos cargar los audios ahora
              </p>
              <p className="mt-3 max-w-prose text-chalk-dim">
                Probá de nuevo en unos minutos, o escuchalos directo en Spotify.
              </p>
              <SpotifyLink />
            </div>
          ) : episodes.length === 0 ? (
            <div className="py-8">
              <p className="font-display text-3xl font-extrabold uppercase leading-none">
                {page > 1 ? "No hay más programas" : "Todavía no hay audios"}
              </p>
              <p className="mt-3 max-w-prose text-chalk-dim">
                {page > 1
                  ? "Ya viste todos los que hay."
                  : "Los audios se publican en Spotify. Cuando haya, aparecen acá."}
              </p>
              {page > 1 ? (
                <Link
                  href="/mas-que-deportes"
                  className="tiza-link press mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider"
                >
                  <ArrowLeft aria-hidden className="h-4 w-4" />
                  Volver al más nuevo
                </Link>
              ) : (
                <SpotifyLink />
              )}
            </div>
          ) : (
            <>
              <EpisodeList episodes={episodes} />
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                {page > 1 && (
                  <Link
                    href={
                      page === 2
                        ? "/mas-que-deportes"
                        : `/mas-que-deportes?page=${page - 1}`
                    }
                    className="tiza-link press inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider"
                  >
                    <ArrowLeft aria-hidden className="h-4 w-4" />
                    Más nuevos
                  </Link>
                )}
                {hasMore && (
                  <Link
                    href={`/mas-que-deportes?page=${page + 1}`}
                    className="press inline-flex min-h-12 items-center gap-2 bg-chalk px-6 font-sans text-sm font-bold uppercase tracking-wider text-ink hover:bg-brand hover:text-white"
                  >
                    Ver más
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                )}
                <SpotifyLink className="sm:ml-auto" />
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function SpotifyLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={SPOTIFY_SHOW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`tiza-link press mt-2 inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-chalk-dim hover:text-chalk ${className}`}
    >
      Ver el programa en Spotify
      <ArrowUpRight aria-hidden className="h-4 w-4" />
      <span className="sr-only">(se abre en otra pestaña)</span>
    </a>
  );
}
