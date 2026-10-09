"use client";

import { useRef } from "react";
import { Pause, Play } from "lucide-react";
import { usePlayer } from "./PlayerProvider";

/**
 * El botón de play: un disco que se hunde al apretar. Play y pausa se cruzan
 * (escala + opacidad, 160 ms) en vez de cambiar de golpe.
 */
export function PlayDisc({
  className = "",
  iconClass = "h-1/2 w-1/2",
}: {
  className?: string;
  iconClass?: string;
}) {
  const { isPlaying, togglePlay } = usePlayer();
  // Un doble toque no tiene que prender y apagar la radio: se ignora el segundo
  const last = useRef(0);
  const onClick = () => {
    const now = Date.now();
    if (now - last.current < 350) return;
    last.current = now;
    togglePlay();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? "Pausar la radio" : "Escuchar en vivo"}
      className={`press relative grid shrink-0 place-items-center rounded-full ${
        isPlaying ? "bg-brand text-white" : "bg-chalk text-ink"
      } ${className}`}
    >
      <Play
        aria-hidden
        fill="currentColor"
        strokeWidth={0}
        className={`absolute ml-[6%] transition-[opacity,transform] duration-150 ease-out-expo motion-reduce:scale-100 ${iconClass} ${
          isPlaying ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
      />
      <Pause
        aria-hidden
        fill="currentColor"
        strokeWidth={0}
        className={`absolute transition-[opacity,transform] duration-150 ease-out-expo motion-reduce:scale-100 ${iconClass} ${
          isPlaying ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
