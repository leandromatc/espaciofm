"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  Volume2,
  VolumeX,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getCurrentProgram } from "@/utils/getCurrentProgram";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentProgram, setCurrentProgram] = useState<string | null>(null);

  useEffect(() => {
    const updateProgram = async () => {
      const program = await getCurrentProgram();
      setCurrentProgram(program ? program.name : "Espacio Sport 91.5");
    };

    updateProgram();
    const interval = setInterval(updateProgram, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      if (startTime === null) {
        setStartTime(Date.now() / 1000); // Record start time in seconds
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const [vol] = newValue;
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const rewind10Seconds = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0,
      );
    }
  };

  const goToLive = () => {
    if (audioRef.current && startTime !== null) {
      const elapsed = Date.now() / 1000 - startTime; // Time since the start in seconds
      const liveTime = elapsed; // The maximum available time
      audioRef.current.currentTime = liveTime;
      setCurrentTime(liveTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-primary text-primary-foreground mx-auto max-w-5xl rounded-lg bg-neutral-950 p-4 shadow-lg ring-1 ring-inset ring-neutral-900">
      <audio
        ref={audioRef}
        src="https://medios.ciudaddigital.com.uy:18098/EspacioFM"
      />
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={rewind10Seconds}>
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={goToLive}>
            <RefreshCcw className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <span className="text-xs">En vivo</span>
        </div>
      </div>
      <div className="mt-4 text-center text-sm font-light">
        <p className="">
          Estás escuchando:{" "}
          <span className="font-normal">{currentProgram}</span>
        </p>
      </div>
    </div>
  );
}
