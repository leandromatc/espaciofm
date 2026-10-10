"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";

const SPEEDS = [1, 1.25, 1.5, 2];

function clock(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const s = Math.floor(t);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

/**
 * Reproductor del episodio: play/pausa grande, barra para saltar, -15 / +30 segundos
 * (programas de más de una hora) y velocidad. Arranca solo: se abre porque alguien lo pidió.
 */
export function EpisodePlayer({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    ref.current?.play().catch(() => setWaiting(false));
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setFailed(true));
    else a.pause();
  };
  const skip = (secs: number) => {
    const a = ref.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || Infinity, a.currentTime + secs));
  };
  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (ref.current) ref.current.playbackRate = next;
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const ctl =
    "press inline-flex h-11 min-w-11 items-center justify-center gap-1.5 border border-chalk/30 px-2.5 font-mono text-xs font-bold tracking-wider hover:border-chalk hover:bg-chalk hover:text-ink disabled:opacity-40";

  return (
    <div className="border border-chalk/30 bg-chalk/[0.04] p-3 sm:p-4">
      <audio
        ref={ref}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlaying={() => setWaiting(false)}
        onWaiting={() => setWaiting(true)}
        onCanPlay={() => setWaiting(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setWaiting(false);
        }}
      />

      {failed ? (
        <p role="alert" className="text-chalk-dim">
          No pudimos reproducir este audio. Abrilo en Spotify.
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={`${playing ? "Pausar" : "Reproducir"}: ${title}`}
            className="press inline-flex h-12 w-12 shrink-0 items-center justify-center bg-chalk text-ink hover:bg-brand hover:text-white"
          >
            {playing ? (
              <Pause aria-hidden className="h-5 w-5" fill="currentColor" />
            ) : (
              <Play
                aria-hidden
                className={`h-5 w-5 ${waiting ? "animate-pulse" : ""}`}
                fill="currentColor"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => skip(-15)}
            disabled={duration === 0}
            aria-label="Retroceder 15 segundos"
            className={ctl}
          >
            <RotateCcw aria-hidden className="h-4 w-4" />
            15
          </button>
          <button
            type="button"
            onClick={() => skip(30)}
            disabled={duration === 0}
            aria-label="Adelantar 30 segundos"
            className={ctl}
          >
            30
            <RotateCw aria-hidden className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={cycleSpeed}
            aria-label={`Velocidad ${speed} veces. Cambiar`}
            className={`${ctl} ml-auto sm:order-last sm:ml-0`}
          >
            {speed}×
          </button>

          <div className="order-last flex w-full items-center gap-3 sm:order-none sm:w-auto sm:flex-1">
            <span className="tnum w-12 shrink-0 text-right font-mono text-xs text-chalk-dim">
              {clock(current)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(current, duration || 0)}
              disabled={duration === 0}
              onChange={(e) => {
                const t = Number(e.target.value);
                setCurrent(t);
                if (ref.current) ref.current.currentTime = t;
              }}
              aria-label="Posición del episodio"
              aria-valuetext={`${clock(current)} de ${clock(duration)}`}
              className="ep-range flex-1"
              style={{ "--p": `${progress}%` } as React.CSSProperties}
            />
            <span className="tnum w-12 shrink-0 font-mono text-xs text-chalk-dim">
              {clock(duration)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
