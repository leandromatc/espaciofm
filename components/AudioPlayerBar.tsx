"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getCurrentProgram } from "@/utils/getCurrentProgram";
import Ping from "@/components/Ping";

const STREAM_URL = "https://medios.ciudaddigital.com.uy:18098/EspacioFM";

export function AudioPlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<string>("Espacio Sport 91.5");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const updateProgram = async () => {
      const program = await getCurrentProgram();
      setCurrentProgram(program ? program.name : "Espacio Sport 91.5");
    };
    updateProgram();
    const interval = setInterval(updateProgram, 60000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
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
      audioRef.current.load();
      audioRef.current.play();
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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-red-600 bg-neutral-950 shadow-[0_-4px_24px_rgba(220,38,38,0.15)]">
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3 sm:py-3">

        {/* Station info */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="shrink-0">
            <Ping />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {currentProgram}
            </p>
            <p className="text-xs text-neutral-400">Espacio Sport 91.5 FM</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={rewind10}
            className="hidden h-8 w-8 sm:flex"
            title="Retroceder 10 segundos"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="h-12 w-12 rounded-full bg-red-600 text-white hover:bg-red-500 sm:h-10 sm:w-10"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 sm:h-5 sm:w-5" />
            ) : (
              <Play className="h-6 w-6 sm:h-5 sm:w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToLive}
            className="hidden h-8 w-8 sm:flex"
            title="Ir al vivo"
          >
            <Radio className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        {/* Volume — desktop only; mute toggle on mobile */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-9 w-9 sm:h-8 sm:w-8"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 sm:h-4 sm:w-4" />
            ) : (
              <Volume2 className="h-5 w-5 sm:h-4 sm:w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="hidden w-20 sm:block"
          />
        </div>
      </div>
    </div>
  );
}
