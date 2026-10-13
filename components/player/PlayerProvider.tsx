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
const CAST_SDK_URL =
  "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
const CAST_SDK_ID = "google-cast-sender-sdk";

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
  remotePlaybackMessage: string | null;
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
  const [remotePlaybackMessage, setRemotePlaybackMessage] = useState<
    string | null
  >(null);
  const airPlayAvailableRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const castContextRef = useRef<cast.framework.CastContext | null>(null);
  const castPlayerRef = useRef<cast.framework.RemotePlayer | null>(null);
  const castControllerRef =
    useRef<cast.framework.RemotePlayerController | null>(null);
  const castLoadedSessionRef = useRef<string | null>(null);

  const updateRemoteAvailability = useCallback(() => {
    setRemotePlaybackStatus((current) => {
      if (current === "connecting" || current === "connected") return current;
      return castContextRef.current || airPlayAvailableRef.current
        ? "available"
        : "unavailable";
    });
  }, []);

  const startCastSession = useCallback(
    async (session: cast.framework.CastSession) => {
      const sessionId = session.getSessionId();
      const currentMedia = session.getMediaSession()?.media;

      if (castLoadedSessionRef.current === sessionId) {
        if (currentMedia?.contentId === STREAM_URL) {
          setRemotePlaybackStatus("connected");
        }
        return;
      }

      castLoadedSessionRef.current = sessionId;
      setRemotePlaybackStatus("connecting");
      setRemotePlaybackMessage(null);

      const mediaInfo = new chrome.cast.media.MediaInfo(
        STREAM_URL,
        "audio/mpeg",
      );
      mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
      mediaInfo.duration = -1;

      const metadata = new chrome.cast.media.MusicTrackMediaMetadata();
      metadata.title = "Espacio Sport 91.5 FM";
      metadata.artist = "La radio del deporte de Mercedes";
      metadata.albumArtist = "Espacio FM";
      metadata.albumName = "En vivo";
      const cover = new chrome.cast.Image(
        `${window.location.origin}/cast-cover.png?v=1`,
      );
      cover.width = 720;
      cover.height = 720;
      metadata.images = [cover];
      mediaInfo.metadata = metadata;

      const request = new chrome.cast.media.LoadRequest(mediaInfo);
      request.autoplay = true;

      try {
        await session.loadMedia(request);
        audioRef.current?.pause();
        setIsPlaying(true);
        setStatus("idle");
        setHasStarted(true);
        setRemotePlaybackStatus("connected");
      } catch {
        castLoadedSessionRef.current = null;
        setIsPlaying(false);
        setRemotePlaybackStatus("available");
        setRemotePlaybackMessage(
          "La TV se conectó, pero no pudo abrir el audio. Probá de nuevo.",
        );
      }
    },
    [],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const airPlayAudio = audio as AirPlayAudio;
    let active = true;
    let castContext: cast.framework.CastContext | null = null;
    let castPlayer: cast.framework.RemotePlayer | null = null;
    let castController: cast.framework.RemotePlayerController | null = null;

    // Safari necesita este atributo para ofrecer el stream como destino AirPlay.
    audio.setAttribute("x-webkit-airplay", "allow");
    airPlayAvailableRef.current =
      typeof airPlayAudio.webkitShowPlaybackTargetPicker === "function";
    updateRemoteAvailability();

    const onAirPlayAvailability = (event: Event) => {
      airPlayAvailableRef.current =
        (event as AirPlayAvailabilityEvent).availability === "available";
      updateRemoteAvailability();
    };
    const onAirPlayConnectionChange = () => {
      setRemotePlaybackStatus(
        airPlayAudio.webkitCurrentPlaybackTargetIsWireless
          ? "connected"
          : castContextRef.current || airPlayAvailableRef.current
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

    const initializeCast = () => {
      if (!active || !window.cast?.framework || !chrome.cast) return;

      castContext = cast.framework.CastContext.getInstance();
      castContext.setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
      castContextRef.current = castContext;

      castPlayer = new cast.framework.RemotePlayer();
      castController = new cast.framework.RemotePlayerController(castPlayer);
      castPlayerRef.current = castPlayer;
      castControllerRef.current = castController;

      const onCastStateChanged = (event: cast.framework.CastStateEventData) => {
        if (event.castState === cast.framework.CastState.CONNECTING) {
          setRemotePlaybackStatus("connecting");
        } else if (event.castState === cast.framework.CastState.CONNECTED) {
          setRemotePlaybackStatus("connected");
        } else {
          setRemotePlaybackStatus("available");
        }
      };
      const onSessionStateChanged = (
        event: cast.framework.SessionStateEventData,
      ) => {
        if (
          event.sessionState === cast.framework.SessionState.SESSION_STARTED ||
          event.sessionState === cast.framework.SessionState.SESSION_RESUMED
        ) {
          void startCastSession(event.session);
        } else if (
          event.sessionState === cast.framework.SessionState.SESSION_ENDED
        ) {
          castLoadedSessionRef.current = null;
          setIsPlaying(false);
          setRemotePlaybackStatus("available");
        }
      };
      const onRemotePauseChanged = () => {
        if (castPlayer) setIsPlaying(!castPlayer.isPaused);
      };
      const onRemoteVolumeChanged = () => {
        if (castPlayer) setVolume(castPlayer.volumeLevel);
      };
      const onRemoteMuteChanged = () => {
        if (castPlayer) setIsMuted(castPlayer.isMuted);
      };
      const onRemoteConnectionChanged = () => {
        if (castPlayer && !castPlayer.isConnected) {
          castLoadedSessionRef.current = null;
          setIsPlaying(false);
          setRemotePlaybackStatus("available");
        }
      };

      castContext.addEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        onCastStateChanged,
      );
      castContext.addEventListener(
        cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        onSessionStateChanged,
      );
      castController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
        onRemotePauseChanged,
      );
      castController.addEventListener(
        cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED,
        onRemoteVolumeChanged,
      );
      castController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
        onRemoteMuteChanged,
      );
      castController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
        onRemoteConnectionChanged,
      );

      setRemotePlaybackStatus(
        castContext.getCastState() === cast.framework.CastState.CONNECTED
          ? "connected"
          : "available",
      );

      const currentSession = castContext.getCurrentSession();
      if (currentSession) void startCastSession(currentSession);

      return () => {
        castContext?.removeEventListener(
          cast.framework.CastContextEventType.CAST_STATE_CHANGED,
          onCastStateChanged,
        );
        castContext?.removeEventListener(
          cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
          onSessionStateChanged,
        );
        castController?.removeEventListener(
          cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
          onRemotePauseChanged,
        );
        castController?.removeEventListener(
          cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED,
          onRemoteVolumeChanged,
        );
        castController?.removeEventListener(
          cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
          onRemoteMuteChanged,
        );
        castController?.removeEventListener(
          cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
          onRemoteConnectionChanged,
        );
      };
    };

    let cleanupCast: (() => void) | undefined;
    const previousCastCallback = window.__onGCastApiAvailable;
    const onCastAvailable = (available: boolean) => {
      if (available && active) cleanupCast = initializeCast();
    };
    window.__onGCastApiAvailable = onCastAvailable;

    if (window.cast?.framework && chrome.cast) {
      cleanupCast = initializeCast();
    } else if (!document.getElementById(CAST_SDK_ID)) {
      const script = document.createElement("script");
      script.id = CAST_SDK_ID;
      script.src = CAST_SDK_URL;
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      active = false;
      cleanupCast?.();
      castContextRef.current = null;
      castPlayerRef.current = null;
      castControllerRef.current = null;
      if (window.__onGCastApiAvailable === onCastAvailable) {
        window.__onGCastApiAvailable = previousCastCallback;
      }
      audio.removeEventListener(
        "webkitplaybacktargetavailabilitychanged",
        onAirPlayAvailability,
      );
      audio.removeEventListener(
        "webkitcurrentplaybacktargetiswirelesschanged",
        onAirPlayConnectionChange,
      );
    };
  }, [startCastSession, updateRemoteAvailability]);

  const requestRemotePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setRemotePlaybackMessage(null);

    const castContext = castContextRef.current;
    if (castContext) {
      setRemotePlaybackStatus("connecting");
      setRemotePlaybackMessage(null);
      castContext
        .requestSession()
        .then(() => {
          const session = castContext.getCurrentSession();
          if (session) void startCastSession(session);
        })
        .catch((error: chrome.cast.ErrorCode) => {
          setRemotePlaybackStatus("available");
          if (error !== chrome.cast.ErrorCode.CANCEL) {
            setRemotePlaybackMessage(
              "No pudimos conectar con la TV. Revisá que esté encendida y en la misma Wi‑Fi.",
            );
          }
        });
      return;
    }

    if (
      typeof (audio as AirPlayAudio).webkitShowPlaybackTargetPicker ===
      "function"
    ) {
      (audio as AirPlayAudio).webkitShowPlaybackTargetPicker?.();
      return;
    }

    setRemotePlaybackMessage(
      "Este navegador no permite enviar audio. Probá Chrome o Edge en computadora, o Safari con AirPlay.",
    );
  }, [startCastSession]);

  // Si el stream no arranca, la UI vuelve a "pausado" y avisa
  const onPlayFail = () => {
    setIsPlaying(false);
    setStatus("error");
  };

  const togglePlay = () => {
    const castPlayer = castPlayerRef.current;
    const castController = castControllerRef.current;
    if (castPlayer?.isConnected && castController) {
      castController.playOrPause();
      return;
    }

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
    const castSession = castContextRef.current?.getCurrentSession();
    if (castSession) {
      castLoadedSessionRef.current = null;
      void startCastSession(castSession);
      return;
    }

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

    const castPlayer = castPlayerRef.current;
    const castController = castControllerRef.current;
    if (castPlayer?.isConnected && castController) {
      castPlayer.volumeLevel = v;
      castController.setVolumeLevel();
      setIsMuted(v === 0);
      return;
    }

    if (audioRef.current) audioRef.current.volume = v;
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const castPlayer = castPlayerRef.current;
    const castController = castControllerRef.current;
    if (castPlayer?.isConnected && castController) {
      castPlayer.isMuted = !castPlayer.isMuted;
      castController.muteOrUnmute();
      return;
    }

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
        remotePlaybackMessage,
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
