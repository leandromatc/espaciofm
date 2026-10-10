"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { YOUTUBE_CHANNEL, type Video } from "@/lib/videos";

/**
 * Programas en video. El video más nuevo está arriba y las filas cambian cuál se ve.
 * El reproductor de YouTube (modo privacidad) recién se carga al tocar, así la portada
 * no baja nada de YouTube hasta que alguien lo pide.
 */
export function Videos({ videos }: { videos: Video[] }) {
  const [selectedId, setSelectedId] = useState(videos[0].id);
  const [playing, setPlaying] = useState(false);
  const { isPlaying: radioSuena, togglePlay } = usePlayer();

  const selected = videos.find((v) => v.id === selectedId) ?? videos[0];

  // Dos audios a la vez no: si suena la radio, se pausa al empezar el video
  const play = (id: string) => {
    if (radioSuena) togglePlay();
    setSelectedId(id);
    setPlaying(true);
  };

  return (
    <section id="videos" className="scroll-mt-20 px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b border-chalk/30 pb-3">
          <h2 className="font-display text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
            Programas en video
          </h2>
          <a
            href={YOUTUBE_CHANNEL.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tiza-link press inline-flex min-h-11 shrink-0 items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider"
          >
            Ver canal
            <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only">
              de {YOUTUBE_CHANNEL.name} en YouTube (se abre en otra pestaña)
            </span>
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          {/* El video que se ve */}
          <div className="min-w-0">
            <div className="relative aspect-video overflow-hidden border border-chalk/30 bg-ink-3">
              {playing ? (
                <iframe
                  key={selected.id}
                  src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&rel=0&playsinline=1`}
                  title={selected.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => play(selected.id)}
                  aria-label={`Ver el programa: ${selected.title}`}
                  className="group absolute inset-0 block text-left"
                >
                  <Image
                    src={selected.thumbLarge}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    priority={false}
                  />
                  <span className="press absolute bottom-0 left-0 inline-flex min-h-12 items-center gap-2 bg-brand px-5 font-sans text-sm font-bold uppercase tracking-wider text-white group-hover:bg-chalk group-hover:text-ink">
                    <Play aria-hidden className="h-4 w-4" fill="currentColor" />
                    Ver el programa
                  </span>
                </button>
              )}
            </div>

            <div className="mt-4">
              <p className="font-mono text-sm uppercase tracking-wider text-chalk-dim">
                {selected.dateLabel}
              </p>
              <h3 className="mt-1 font-display text-3xl font-extrabold uppercase leading-[0.98] text-balance sm:text-4xl">
                {selected.title}
              </h3>
              <a
                href={selected.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tiza-link press mt-2 inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-chalk-dim hover:text-chalk"
              >
                Abrir en YouTube
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
            </div>
          </div>

          {/* Los últimos programas */}
          <ul className="divide-y divide-chalk/15 border-y border-chalk/15 lg:self-start">
            {videos.map((v) => {
              const active = v.id === selected.id;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => play(v.id)}
                    aria-current={active ? "true" : undefined}
                    className="fila press grid w-full grid-cols-[1fr_auto] items-center gap-x-4 px-3 py-4 text-left"
                  >
                    <span className="min-w-0">
                      <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-chalk-dim">
                        {v.dateLabel}
                        {active && (
                          <span className="border border-chalk px-1.5 py-0.5 font-bold text-chalk">
                            Viendo
                          </span>
                        )}
                      </span>
                      <span className="mt-1 line-clamp-3 block font-display text-xl font-extrabold uppercase leading-[1.02] sm:text-2xl">
                        {v.title}
                      </span>
                    </span>
                    <span className="relative block aspect-video w-24 shrink-0 overflow-hidden bg-ink-3 sm:w-28">
                      <Image
                        src={v.thumb}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
