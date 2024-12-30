"use client";

import React, { useEffect, useState } from "react";
import { getTodayPrograms } from "@/utils/getTodayPrograms";
import Link from "next/link";
import { getCurrentProgram } from "@/utils/getCurrentProgram";
import Ping from "./Ping";

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
    <section className='px-5'>
      <div className='w-max'>
        <h2 className='uppercase text-3xl font-medium'>Programación de hoy</h2>
        <span className='h-[2px] w-[100px] bg-red-600 block'></span>
      </div>
      <div className='py-5 flex gap-5 flex-col'>
        {programs ? (
          programs.map((program, index) => (
            <article
              key={index}
              className={`bg-neutral-900 ring-1 ring-inset ring-neutral-800 rounded-lg p-4 flex cursor-pointer justify-between items-center ${
                currentProgram === program.name
                  ? "ring-red-600 bg-neutral-950/80"
                  : ""
              }`}
            >
              <div>
                <h3 className='text-xl font-medium'>{program.name}</h3>
                <p className='text-sm text-neutral-300'>
                  {program.startTime} - {program.endTime}
                </p>
              </div>
              {currentProgram === program.name && (
                <span className='text-xs flex gap-2 items-center'>
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
      <Link href='/programacion'>
        <span className='text-xs hover:underline text-neutral-200'>
          Ver toda la programación
        </span>
      </Link>
    </section>
  );
};

export default TodayPrograms;
