import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
} from "react-icons/fa";

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
    <div className="flex flex-col gap-5 items-center justify-center p-4 bg-neutral-50 rounded-lg shadow-lg max-w-md mx-auto">
      <audio
        ref={audioRef}
        src="https://medios.ciudaddigital.com.uy:18098/EspacioFM"
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="text-neutral-50 rounded-full p-4 bg-red-600 hover:text-neutral-700 transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        <div className="flex items-center justify-between text-neutral-700 w-full px-4">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={currentTime}
            step="0.1"
            value={currentTime}
            onChange={handleTimeChange}
            className="w-full mx-2"
          />
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button className="text-neutral-700 hover:text-neutral-500 transition">
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
