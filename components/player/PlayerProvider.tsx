"use client";

import {
  useCallback,
  createContext,
  useEffect,
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
export type RemotePlaybackStatus =
  | "unavailable"
  | "available"
  | "connecting"
  | "connected";

type AirPlayAudio = HTMLAudioElement & {
  webkitCurrentPlaybackTargetIsWireless?: boolean;
  webkitShowPlaybackTargetPicker?: () => void;
};

type AirPlayAvailabilityEvent = Event & {
  availability?: "available" | "not-available";
};

type PlayerState = {
  isPlaying: boolean;
  status: StreamStatus;
  /** ya sonó al menos una vez (habilita Ir al vivo después de pausar) */
  hasStarted: boolean;
  volume: number;
  isMuted: boolean;
  /** el play grande del tablero está a la vista (la barra se esconde) */
  heroInView: boolean;
  remotePlaybackStatus: RemotePlaybackStatus;
  setHeroInView: (v: boolean) => void;
  requestRemotePlayback: () => void;
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
  const [remotePlaybackStatus, setRemotePlaybackStatus] =
    useState<RemotePlaybackStatus>("unavailable");
  const remoteAvailableRef = useRef(false);
  const airPlayAvailableRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const updateRemoteAvailability = useCallback(() => {
    setRemotePlaybackStatus((current) => {
      if (current === "connecting" || current === "connected") return current;
      return remoteAvailableRef.current || airPlayAvailableRef.current
        ? "available"
        : "unavailable";
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const airPlayAudio = audio as AirPlayAudio;
    let active = true;
    let availabilityWatchId: number | undefined;

    // Safari necesita este atributo para ofrecer el stream como destino AirPlay.
    audio.setAttribute("x-webkit-airplay", "allow");

    const onAirPlayAvailability = (event: Event) => {
      airPlayAvailableRef.current =
        (event as AirPlayAvailabilityEvent).availability === "available";
      updateRemoteAvailability();
    };
    const onAirPlayConnectionChange = () => {
      setRemotePlaybackStatus(
        airPlayAudio.webkitCurrentPlaybackTargetIsWireless
          ? "connected"
          : airPlayAvailableRef.current || remoteAvailableRef.current
            ? "available"
            : "unavailable",
      );
    };

    audio.addEventListener(
      "webkitplaybacktargetavailabilitychanged",
      onAirPlayAvailability,
    );
    audio.addEventListener(
      "webkitcurrentplaybacktargetiswirelesschanged",
      onAirPlayConnectionChange,
    );

    const remote = audio.remote;
    const onConnecting = () => setRemotePlaybackStatus("connecting");
    const onConnect = () => setRemotePlaybackStatus("connected");
    const onDisconnect = () => {
      setRemotePlaybackStatus(
        remoteAvailableRef.current || airPlayAvailableRef.current
          ? "available"
          : "unavailable",
      );
    };

    if (remote) {
      if (remote.state === "connected") {
        setRemotePlaybackStatus("connected");
      } else if (remote.state === "connecting") {
        setRemotePlaybackStatus("connecting");
      }
      remote.addEventListener("connecting", onConnecting);
      remote.addEventListener("connect", onConnect);
      remote.addEventListener("disconnect", onDisconnect);
      remote
        .watchAvailability((available) => {
          remoteAvailableRef.current = available;
          updateRemoteAvailability();
        })
        .then((id) => {
          if (active) {
            availabilityWatchId = id;
          } else {
            remote.cancelWatchAvailability(id).catch(() => {});
          }
        })
        .catch(() => {
          // Algunos navegadores ofrecen prompt() pero no permiten observar
          // disponibilidad; en ese caso dejamos que el selector nativo decida.
          remoteAvailableRef.current = true;
          updateRemoteAvailability();
        });
    }

    return () => {
      active = false;
      audio.removeEventListener(
        "webkitplaybacktargetavailabilitychanged",
        onAirPlayAvailability,
      );
      audio.removeEventListener(
        "webkitcurrentplaybacktargetiswirelesschanged",
        onAirPlayConnectionChange,
      );
      if (remote) {
        remote.removeEventListener("connecting", onConnecting);
        remote.removeEventListener("connect", onConnect);
        remote.removeEventListener("disconnect", onDisconnect);
        if (availabilityWatchId !== undefined) {
          remote.cancelWatchAvailability(availabilityWatchId).catch(() => {});
        }
      }
    };
  }, [updateRemoteAvailability]);

  const requestRemotePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // prompt() debe ocurrir directamente dentro del gesto del usuario.
    if (remoteAvailableRef.current && audio.remote) {
      audio.remote.prompt().catch(() => {
        // Cancelar el selector no es un error de reproducción.
      });
      return;
    }

    if (airPlayAvailableRef.current) {
      (audio as AirPlayAudio).webkitShowPlaybackTargetPicker?.();
    }
  }, []);

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
        remotePlaybackStatus,
        setHeroInView,
        requestRemotePlayback,
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
