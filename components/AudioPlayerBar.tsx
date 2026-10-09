"use client";

import { Radio, SkipBack, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/components/player/PlayerProvider";
import { PlayDisc } from "@/components/player/PlayDisc";
import { Equalizer } from "@/components/player/Equalizer";
import { LiveDot } from "@/components/player/LiveDot";
import { StreamStatusText } from "@/components/player/StreamStatus";
import { useSchedule } from "@/components/schedule/ScheduleProvider";

/**
 * Barra fija inferior: siempre a mano en el celular. Cuando el play grande del
 * tablero está a la vista se baja (no hay dos botones iguales en pantalla) y
 * vuelve al scrollear.
 */
export function AudioPlayerBar() {
  const {
    isPlaying,
    status,
    volume,
    isMuted,
    heroInView,
    rewind10,
    goToLive,
    handleVolumeChange,
    toggleMute,
  } = usePlayer();
  const { onAir } = useSchedule();
  const programName = onAir?.name ?? "Espacio Sport 91.5";

  return (
    <div
      inert={heroInView}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-chalk/25 bg-ink pb-[env(safe-area-inset-bottom,0px)] transition-transform duration-200 ease-out-expo motion-reduce:transition-none ${
        heroInView ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-screen-xl items-center gap-3 px-4 sm:gap-4">
        {/* Qué suena */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <LiveDot className="[--dot:11px] text-brand-hot" />
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-extrabold uppercase leading-none tracking-wide">
              {programName}
            </p>
            <p className="mt-1 flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-chalk-dim">
              {status === "idle" ? (
                <span className="whitespace-nowrap">91.5 FM · Al aire</span>
              ) : (
                <StreamStatusText className="whitespace-nowrap text-brand-hot" />
              )}
              <Equalizer
                playing={isPlaying && status === "idle"}
                className="text-brand-hot"
              />
            </p>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={rewind10}
            title="Retroceder 10 segundos"
            aria-label="Retroceder 10 segundos"
            className="press hidden h-11 w-11 place-items-center rounded-full text-chalk-dim hover:text-chalk sm:grid"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <PlayDisc className="h-14 w-14 sm:h-12 sm:w-12" iconClass="h-6 w-6" />
          <button
            type="button"
            onClick={goToLive}
            title="Ir al vivo"
            aria-label="Ir al vivo"
            className="press hidden h-11 w-11 place-items-center rounded-full text-brand-hot hover:text-chalk sm:grid"
          >
            <Radio className="h-4 w-4" />
          </button>
        </div>

        {/* Volumen */}
        <div className="flex items-center justify-end gap-2 sm:flex-1">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            className="press grid h-11 w-11 place-items-center rounded-full text-chalk-dim hover:text-chalk"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
          <Slider
            aria-label="Volumen"
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="hidden w-24 sm:flex"
          />
        </div>
      </div>
    </div>
  );
}
