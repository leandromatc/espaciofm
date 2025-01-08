import React from "react";
import Navbar from "./Navbar";
import { AudioPlayer } from "./AudioPlayer";
import Ping from "./Ping";

const Hero = () => {
  return (
    <section className="flex w-full flex-col px-5 md:min-h-screen" id="hero">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-10 py-20 md:flex-grow md:py-0">
        <div className="flex flex-col items-center gap-4">
          <span className="flex items-center gap-2 rounded-full bg-neutral-900 px-2 py-1 text-xs ring-1 ring-inset ring-neutral-800">
            <Ping /> Estamos en vivo
          </span>
          <h1 className="text-center text-4xl font-bold md:max-w-2xl md:text-7xl">
            <span className="text-red-600">ESPACIO SPORT</span> 91.5 FM
          </h1>
          <p className="font-light tracking-wider text-neutral-200">
            Deporte, música y actualidad
          </p>
        </div>
        <AudioPlayer />
      </div>
    </section>
  );
};

export default Hero;
