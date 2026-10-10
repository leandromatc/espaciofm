import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EpisodeList } from "@/components/audio/EpisodeList";
import { SpotifyChip } from "@/components/audio/SpotifyMark";
import { fetchEpisodes, SPOTIFY_SHOW_URL } from "@/lib/podcast";

/**
 * Banda de la portada: los últimos programas de "Más que deportes" para escuchar a pedido.
 * Sin audios (o si el feed no responde) no ocupa lugar.
 */
export async function AudiosFeed() {
  const { episodes } = await fetchEpisodes(4);
  if (episodes.length === 0) return null;

  return (
    <section id="audios" className="scroll-mt-20 px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b border-chalk/30 pb-3">
          <h2 className="font-display text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
            Más que deportes, en audio
          </h2>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <SpotifyChip href={SPOTIFY_SHOW_URL} />
            <Link
              href="/mas-que-deportes"
              className="tiza-link press inline-flex min-h-11 shrink-0 items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider"
            >
              Ver todos
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <EpisodeList episodes={episodes} />
      </div>
    </section>
  );
}
