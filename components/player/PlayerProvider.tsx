"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

// URL y handlers del stream: sin cambios respecto de AudioPlayerBar.
// Lo único nuevo es que el <audio> vive acá para que el play del tablero y
// la barra fija controlen el mismo elemento.
export const STREAM_URL = "https://medios.ciudaddigital.com.uy:18098/EspacioFM";

export type StreamStatus = "idle" | "connecting" | "error";

type PlayerState = {
  isPlaying: boolean;
  status: StreamStatus;
  /** ya sonó al menos una vez (habilita Ir al vivo después de pausar) */
  hasStarted: boolean;
  volume: number;
  isMuted: boolean;
  /** el play grande del tablero está a la vista (la barra se esconde) */
  heroInView: boolean;
  setHeroInView: (v: boolean) => void;
  togglePlay: () => void;
  rewind10: () => void;
  goToLive: () => void;
  handleVolumeChange: (val: number[]) => void;
  toggleMute: () => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [heroInView, setHeroInView] = useState(false);
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Si el stream no arranca, la UI vuelve a "pausado" y avisa
  const onPlayFail = () => {
    setIsPlaying(false);
    setStatus("error");
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      setStatus("connecting");
      audio.play().catch(onPlayFail);
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const rewind10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0,
      );
    }
  };

  const goToLive = () => {
    if (audioRef.current) {
      setStatus("connecting");
      audioRef.current.load();
      audioRef.current.play().catch(onPlayFail);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (val: number[]) => {
    const [v] = val;
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !isMuted;
    audioRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        status,
        hasStarted,
        volume,
        isMuted,
        heroInView,
        setHeroInView,
        togglePlay,
        rewind10,
        goToLive,
        handleVolumeChange,
        toggleMute,
      }}
    >
      {/* Si el sistema pausa el stream (auriculares, pantalla de bloqueo), la UI lo sigue */}
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => isPlaying && setStatus("connecting")}
        onPlaying={() => {
          setStatus("idle");
          setHasStarted(true);
        }}
        onError={() => {
          setIsPlaying(false);
          setStatus("error");
        }}
      />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer debe usarse dentro de PlayerProvider");
  return ctx;
}
