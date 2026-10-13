"use client";

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
  const { remotePlaybackStatus, requestRemotePlayback } = usePlayer();

  if (remotePlaybackStatus === "unavailable") return null;

  const connected = remotePlaybackStatus === "connected";
  const connecting = remotePlaybackStatus === "connecting";
  const label = connected
    ? "Administrar conexión con la TV"
    : connecting
      ? "Conectando con la TV"
      : "Enviar audio a una TV";

  if (variant === "label") {
    return (
      <button
        type="button"
        onClick={requestRemotePlayback}
        aria-label={label}
        aria-pressed={connected}
        disabled={connecting}
        className={`press inline-flex min-h-11 items-center gap-2 border-b-2 border-chalk/40 font-sans text-sm font-semibold uppercase tracking-wider text-chalk transition-colors hover:border-chalk disabled:cursor-wait disabled:text-chalk-dim ${className}`}
      >
        <Airplay
          aria-hidden
          className={`h-5 w-5 ${connected ? "text-brand-hot" : "text-chalk"}`}
        />
        {connecting ? "Conectando…" : connected ? "En la TV" : "Enviar a TV"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={requestRemotePlayback}
      title={label}
      aria-label={label}
      aria-pressed={connected}
      disabled={connecting}
      className={`press grid h-11 w-11 place-items-center rounded-full transition-colors disabled:cursor-wait ${
        connected ? "text-brand-hot" : "text-chalk-dim hover:text-chalk"
      } ${className}`}
    >
      <Airplay aria-hidden className="h-5 w-5" />
    </button>
  );
}
