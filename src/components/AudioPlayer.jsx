import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const togglePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-5 rounded-lg bg-neutral-50 p-4 shadow-lg">
      <audio
        autoPlay
        ref={audioRef}
        src="https://medios.ciudaddigital.com.uy:18098/EspacioFM"
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="rounded-full bg-red-600 p-4 text-neutral-50 transition hover:text-neutral-700"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        <div className="flex w-full items-center justify-between px-4 text-neutral-700">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={currentTime}
            step="0.1"
            value={currentTime}
            onChange={handleTimeChange}
            className="mx-2 w-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button className="text-neutral-700 transition hover:text-neutral-500">
          <FaVolumeUp />
        </button>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-32"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
