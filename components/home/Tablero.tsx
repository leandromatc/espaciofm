"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { PlayDisc } from "@/components/player/PlayDisc";
import { LiveDot } from "@/components/player/LiveDot";
import { HeroStatus } from "@/components/player/StreamStatus";
import { useSchedule } from "@/components/schedule/ScheduleProvider";
import { CV10_URL } from "@/lib/contact";

const SEGMENTS = 12;

/** Esquina de cancha: el cuarto de círculo que dibuja el córner. */
function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-7 w-7 border-chalk/40 ${className}`}
    />
  );
}

/**
 * El tablero: lo primero que se ve. Play gigante, qué suena y desde cuándo.
 * Es el único h1 de la portada.
 */
export function Tablero() {
  const { setHeroInView } = usePlayer();
  const { ready, onAir, liveEvent, liveVideoOnly, next, progress } = useSchedule();
  const playRef = useRef<HTMLDivElement>(null);

  // Mientras el play grande se ve, la barra fija se esconde
  useEffect(() => {
    const el = playRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      setHeroInView(false);
    };
  }, [setHeroInView]);

  const title = onAir?.name ?? "Espacio Sport 91.5";
  const filled = progress
    ? Math.min(
        SEGMENTS,
        Math.max(0, Math.floor((progress.elapsed / progress.total) * SEGMENTS)),
      )
    : 0;

  return (
    <section className="px-4 pb-10 pt-5 sm:px-5 sm:pt-10">
      <div className="tablero-in relative mx-auto max-w-screen-xl border border-chalk/30 px-5 py-6 sm:px-10 sm:py-12">
        <Corner className="-left-px -top-px rounded-br-full border-b border-r" />
        <Corner className="-right-px -top-px rounded-bl-full border-b border-l" />
        <Corner className="-bottom-px -left-px rounded-tr-full border-r border-t" />
        <Corner className="-bottom-px -right-px rounded-tl-full border-l border-t" />

        <div className="grid gap-6 sm:gap-8 lg:min-h-[min(28rem,calc(100svh-14rem))] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
          <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:min-w-0 lg:flex-col lg:justify-center lg:gap-10">
          {/* Qué está pasando */}
          <div className="order-1 min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-2.5 bg-brand px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-wider text-white">
                <LiveDot className="[--dot:10px] text-white" />
                {liveEvent ? "Al aire · En vivo" : "Al aire"}
              </span>
            </div>

            <h1
              className="font-display font-black uppercase leading-[0.92] tracking-tight text-balance"
              style={{ fontSize: "clamp(3.25rem, 11.5vw, 6rem)" }}
            >
              {title}
            </h1>

            {liveEvent?.lugar && (
              <p className="mt-4 flex items-center gap-2 font-sans text-base font-semibold uppercase tracking-wider text-chalk">
                <MapPin aria-hidden className="h-4 w-4 shrink-0 text-brand-hot" />
                {liveEvent.lugar}
              </p>
            )}

            {onAir?.description && (
              <p className={`line-clamp-2 max-w-xl text-base text-chalk-dim ${liveEvent?.lugar ? "mt-2" : "mt-4"}`}>
                {onAir.description}
              </p>
            )}
          </div>

          {/* Minuto de programa y qué sigue */}
          <div className="order-3 min-w-0">
            {progress && (
              <div className="mb-5 max-w-xl">
                <p className="mb-2 font-mono text-sm uppercase tracking-wider text-chalk-dim">
                  Min {progress.elapsed} de {progress.total}
                </p>
                <div
                  role="img"
                  aria-label={`Van ${progress.elapsed} minutos de ${progress.total}`}
                  className="flex gap-1"
                >
                  {Array.from({ length: SEGMENTS }, (_, i) => (
                    <span
                      key={i}
                      className={`h-3 flex-1 ${i < filled ? "bg-brand" : "bg-chalk/20"}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {ready && next && (
              <p className="font-mono text-sm uppercase tracking-wider text-chalk">
                <span className="text-brand-hot">Sigue</span>{" "}
                {next.name} ·{" "}
                {next.when === "hoy" ? "" : `${next.when} `}
                {next.start}
              </p>
            )}
          </div>
          </div>

          {/* El play: en celular va entre el título y lo que sigue (order-2) */}
          <div
            ref={playRef}
            className="order-2 flex flex-col items-center gap-3 lg:col-start-2 lg:row-start-1"
          >
            <div className="grid place-items-center rounded-full border border-chalk/30 p-3 sm:p-4">
              <PlayDisc
                className="h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64"
                iconClass="h-2/5 w-2/5"
              />
            </div>
            <HeroStatus />
            {liveVideoOnly && (
              <a
                href={CV10_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press mt-1 inline-flex min-h-12 max-w-full flex-wrap items-center justify-center gap-x-2 bg-brand px-6 py-2 text-center font-sans text-sm font-bold uppercase tracking-wider text-white hover:bg-chalk hover:text-ink"
              >
                Ahora por CV10: {liveVideoOnly.name}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
            )}
            {liveEvent?.enCv10 && (
              <a
                href={CV10_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press mt-1 inline-flex min-h-12 items-center gap-2 bg-brand px-6 font-sans text-sm font-bold uppercase tracking-wider text-white hover:bg-chalk hover:text-ink"
              >
                Verlo en video · CV10
                <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only">(se abre en otra pestaña)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
