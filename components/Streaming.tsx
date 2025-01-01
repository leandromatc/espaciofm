import Link from "next/link";
import React from "react";

const Streaming = () => {
  return (
    <section className="px-5 py-10">
      <Link
        href={"https://cv10.plag.tv"}
        target="_blank"
        aria-label="Streaming de CV10"
      >
        <div className="grid h-full w-full cursor-pointer grid-cols-1 rounded-xl bg-gradient-to-r from-red-700 to-transparent p-10 md:grid-cols-2">
          <div className="col-span-1">
            <h5 className="max-w-xl text-5xl font-semibold">
              Mira el básquetbol y el fútbol local por CV10
            </h5>
            <p className="my-2">
              Disponible para todo el mundo exceptuando Soriano y Río Negro
            </p>
            <p className="text-xs underline">Click para ir a la web.</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Streaming;
