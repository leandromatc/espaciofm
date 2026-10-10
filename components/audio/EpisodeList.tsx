"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { EpisodePlayer } from "@/components/audio/EpisodePlayer";
import { SpotifyMark } from "@/components/audio/SpotifyMark";
import type { Episode } from "@/lib/podcast";

/**
 * Lista de episodios como una planilla: fecha, título, duración y un bloque rojo
 * "Escuchar". Al tocarlo, la fila se abre y carga el reproductor propio
 * (EpisodePlayer) con autoplay. Hay un episodio abierto a la vez y, si la radio suena, se pausa.
 * El audio solo se baja cuando alguien lo pide.
 */
export function EpisodeList({ episodes }: { episodes: Episode[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const { isPlaying: radioSuena, togglePlay } = usePlayer();

  const toggle = (key: string) => {
    if (openKey === key) {
      setOpenKey(null);
      return;
    }
    // Dos audios a la vez no: si suena la radio, se pausa al empezar el episodio
    if (radioSuena) togglePlay();
    setOpenKey(key);
  };

  return (
    <ol className="divide-y divide-chalk/15 border-y border-chalk/15">
      {episodes.map((ep) => {
        const open = openKey === ep.key;
        return (
          <li
            key={ep.key}
            className={`px-3 py-4 transition-colors sm:px-5 ${open ? "bg-chalk/[0.05]" : ""}`}
          >
            <div className="grid grid-cols-[3.5rem_1fr] items-start gap-x-4 gap-y-3 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-x-6">
              <p className="font-mono text-sm font-bold uppercase leading-tight tracking-wider text-chalk-dim">
                {ep.dateLabel}
              </p>

              <div className="min-w-0">
                <p className="line-clamp-3 font-display text-2xl font-extrabold uppercase leading-[1.02] sm:text-3xl">
                  {ep.title}
                </p>
                {ep.durationLabel && (
                  <p className="tnum mt-1.5 font-mono text-xs uppercase tracking-wider text-chalk-dim">
                    {ep.durationLabel}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => toggle(ep.key)}
                aria-expanded={open}
                aria-label={`${open ? "Cerrar" : "Escuchar"}: ${ep.title}`}
                className={`press col-start-2 inline-flex min-h-11 w-fit items-center gap-2 px-4 font-sans text-sm font-bold uppercase tracking-wider sm:col-start-3 ${
                  open
                    ? "border border-chalk text-chalk hover:bg-chalk hover:text-ink"
                    : "bg-brand text-white hover:bg-chalk hover:text-ink"
                }`}
              >
                {open ? (
                  <>
                    <X aria-hidden className="h-4 w-4" />
                    Cerrar
                  </>
                ) : (
                  <>
                    <Play aria-hidden className="h-4 w-4" fill="currentColor" />
                    Escuchar
                  </>
                )}
              </button>
            </div>

            {open && (
              <div className="mt-4 sm:ml-[6.5rem]">
                <EpisodePlayer src={ep.audioUrl} title={ep.title} />
                <a
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tiza-link press mt-2 inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-chalk-dim hover:text-chalk"
                >
                  <SpotifyMark className="h-4 w-4" mono />
                  Abrir en Spotify
                  <span className="sr-only">(se abre en otra pestaña)</span>
                </a>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
