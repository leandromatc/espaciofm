"use client";

import React, { Suspense, useEffect, useState } from "react";
import { getTodayPrograms } from "@/utils/getTodayPrograms";
import Link from "next/link";
import { getCurrentProgram } from "@/utils/getCurrentProgram";
import Ping from "./Ping";
import { ArrowRight } from "lucide-react";
import Loading from "../app/loading";

interface Program {
  name: string;
  start_time: string;
  end_time: string;
  description: string;
}

const TodayPrograms = () => {
  const [programs, setPrograms] = useState<Array<Program> | null>(null);
  const [currentProgram, setCurrentProgram] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      const todayPrograms = await getTodayPrograms();
      if (todayPrograms) {
        setPrograms(todayPrograms);
      }
    };
    const updateProgram = async () => {
      const program = await getCurrentProgram();
      setCurrentProgram(program ? program.name : "Espacio Sport 91.5");
    };

    fetchPrograms();
    updateProgram();
    const interval = setInterval(updateProgram, 60000);

    return () => clearInterval(interval);
  }, []); // Agrega un arreglo de dependencias vacío para que se ejecute solo al montar.

  return (
    <section className="px-5">
      <div className="w-max">
        <h2 className="text-wrap font-medium uppercase md:text-3xl">
          Programación de hoy
        </h2>
        <span className="block h-[2px] w-[100px] bg-red-600"></span>
      </div>
      <Suspense fallback={<p>Cargando...</p>}>
        <div className="flex flex-col gap-5 py-5">
          {programs &&
            programs.map((program, index) => (
              <article
                key={index}
                className={`flex cursor-pointer items-center justify-between rounded-lg bg-neutral-900 p-4 ring-1 ring-inset ring-neutral-800 ${
                  currentProgram === program.name
                    ? "bg-neutral-950/80 ring-red-600"
                    : ""
                }`}
              >
                <div>
                  <h3 className="text-xl font-medium">{program.name}</h3>
                  <p className="text-xl text-neutral-300">
                    {program.start_time} - {program.end_time}
                  </p>
                  <p className="text-xs">{program.description}</p>
                </div>
                {currentProgram === program.name && (
                  <span className="flex flex-shrink-0 items-center gap-2 text-xs">
                    <Ping />
                    En vivo
                  </span>
                )}
              </article>
            ))}
        </div>
      </Suspense>
      <Link href="/programacion">
        <span className="flex items-center gap-1 text-xs text-neutral-200 hover:underline">
          Ver toda la programación <ArrowRight />
        </span>
      </Link>
    </section>
  );
};

export default TodayPrograms;
