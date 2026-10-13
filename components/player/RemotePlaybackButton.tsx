"use client";

import { useId } from "react";
import { Airplay } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";

type RemotePlaybackButtonProps = {
  variant?: "icon" | "label";
  className?: string;
};

/**
 * Abre el selector nativo: Remote Playback (Chromecast y televisores
 * compatibles) en Chrome/Edge, y AirPlay en Safari.
 */
export function RemotePlaybackButton({
  variant = "icon",
  className = "",
}: RemotePlaybackButtonProps) {
  const { remotePlaybackStatus, remotePlaybackMessage, requestRemotePlayback } =
    usePlayer();
  const helpId = useId();

  const unavailable = remotePlaybackStatus === "unavailable";
  const connected = remotePlaybackStatus === "connected";
  const connecting = remotePlaybackStatus === "connecting";
  const label = unavailable
    ? "Enviar audio a una TV. No disponible en este navegador"
    : connected
      ? "Administrar conexión con la TV"
      : connecting
        ? "Conectando con la TV"
        : "Enviar audio a una TV";
  const showHelp = Boolean(remotePlaybackMessage);
  const help = (
    <p
      id={helpId}
      role="status"
      className="font-sans text-xs leading-relaxed text-chalk-dim"
    >
      {remotePlaybackMessage}
    </p>
  );

  if (variant === "label") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <button
          type="button"
          onClick={requestRemotePlayback}
          aria-label={label}
          aria-pressed={connected}
          aria-expanded={showHelp}
          aria-describedby={showHelp ? helpId : undefined}
          disabled={connecting}
          className="press inline-flex min-h-11 items-center gap-2 border-b-2 border-chalk/40 font-sans text-sm font-semibold uppercase tracking-wider text-chalk transition-colors hover:border-chalk disabled:cursor-wait disabled:text-chalk-dim"
        >
          <Airplay
            aria-hidden
            className={`h-5 w-5 ${connected ? "text-brand-hot" : "text-chalk"}`}
          />
          {connecting ? "Conectando…" : connected ? "En la TV" : "Enviar a TV"}
        </button>
        {showHelp ? <div className="max-w-72 text-center">{help}</div> : null}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={requestRemotePlayback}
        title={label}
        aria-label={label}
        aria-pressed={connected}
        aria-expanded={showHelp}
        aria-describedby={showHelp ? helpId : undefined}
        disabled={connecting}
        className={`press grid h-11 w-11 place-items-center rounded-full transition-colors disabled:cursor-wait ${
          connected ? "text-brand-hot" : "text-chalk-dim hover:text-chalk"
        }`}
      >
        <Airplay aria-hidden className="h-5 w-5" />
      </button>
      {showHelp ? (
        <div className="absolute bottom-full right-0 z-10 mb-3 w-64 border border-chalk/30 bg-ink p-3 text-left">
          {help}
        </div>
      ) : null}
    </div>
  );
}
