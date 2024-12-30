import React from "react";
import Navbar from "./Navbar";
import { AudioPlayer } from "./AudioPlayer";
import Ping from "./Ping";

const Hero = () => {
  return (
    <section className='flex flex-col w-full min-h-screen px-5' id='hero'>
      <Navbar />
      <div className='flex-grow flex items-center justify-center gap-10 flex-col'>
        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs flex items-center gap-2 ring-1 ring-inset px-2 py-1 rounded-full bg-neutral-900 ring-neutral-800'>
            <Ping /> Estamos en vivo
          </span>
          <h1 className='md:text-7xl text-4xl md:max-w-2xl text-center font-bold'>
            <span className='text-red-600'>ESPACIO SPORT</span> 91.5 FM
          </h1>
          <p className='text-neutral-200 tracking-wider font-light'>
            La radio de deporte y actualidad local.
          </p>
        </div>
        <AudioPlayer />
      </div>
    </section>
  );
};

export default Hero;
