"use client";

import React, { useEffect, useState } from "react";
import { getTodayPrograms } from "@/utils/getTodayPrograms";
import Link from "next/link";
import { getCurrentProgram } from "@/utils/getCurrentProgram";
import Ping from "./Ping";
import { ArrowRight } from "lucide-react";

interface Program {
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
}

const TodayPrograms = () => {
  const [programs, setPrograms] = useState<Array<Program> | null>(null);
  const [currentProgram, setCurrentProgram] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = () => {
      const todayPrograms = getTodayPrograms();
      if (todayPrograms) {
        setPrograms(todayPrograms);
      }
    };
    const updateProgram = () => {
      const program = getCurrentProgram();
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
        <h2 className="text-3xl font-medium uppercase">Programación de hoy</h2>
        <span className="block h-[2px] w-[100px] bg-red-600"></span>
      </div>
      <div className="flex flex-col gap-5 py-5">
        {programs ? (
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
                <p className="text-sm text-neutral-300">
                  {program.startTime} - {program.endTime}
                </p>
              </div>
              {currentProgram === program.name && (
                <span className="flex items-center gap-2 text-xs">
                  <Ping />
                  En vivo
                </span>
              )}
            </article>
          ))
        ) : (
          <p>No hay programas para hoy.</p>
        )}
      </div>
      <Link href="/programacion">
        <span className="flex items-center gap-1 text-xs text-neutral-200 hover:underline">
          Ver toda la programación <ArrowRight />
        </span>
      </Link>
    </section>
  );
};

export default TodayPrograms;
