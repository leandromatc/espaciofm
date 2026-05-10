"use client";

import { useEffect, useState } from "react";
import { getTodayPrograms } from "@/utils/getTodayPrograms";
import { getCurrentProgram } from "@/utils/getCurrentProgram";
import Link from "next/link";
import Ping from "./Ping";
import { ArrowRight, CalendarClock } from "lucide-react";

interface Program {
  name: string;
  start_time: string;
  end_time: string;
  description: string;
  isSpecial?: boolean;
}

export default function TodayPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [todayPrograms, current] = await Promise.all([
        getTodayPrograms(),
        getCurrentProgram(),
      ]);
      setPrograms(todayPrograms);
      setCurrentName(current?.name ?? null);
      setLoading(false);
    }
    load();
    const interval = setInterval(async () => {
      const current = await getCurrentProgram();
      setCurrentName(current?.name ?? null);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold uppercase">Programación de hoy</h2>
        <span className="mt-1 block h-[2px] w-[50px] bg-red-600" />
      </div>

      {loading && (
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-neutral-800" />
          ))}
        </div>
      )}

      {!loading && programs.length === 0 && (
        <p className="py-6 text-center text-sm text-neutral-500">
          Sin programación para hoy.
        </p>
      )}

      {!loading && programs.length > 0 && (
        <div className="flex flex-col divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          {programs.map((program, i) => {
            const isLive = currentName === program.name;
            return (
              <div
                key={i}
                className={`flex items-center justify-between gap-3 px-4 py-3 transition-colors ${
                  isLive ? "bg-neutral-800/70" : "hover:bg-neutral-800/40"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium leading-tight">
                      {program.name}
                    </p>
                    {program.isSpecial && (
                      <span className="shrink-0 rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
                        Especial
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {program.start_time} – {program.end_time}
                  </p>
                </div>
                {isLive ? (
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-red-400">
                    <Ping />
                    En vivo
                  </span>
                ) : (
                  <CalendarClock className="h-3.5 w-3.5 shrink-0 text-neutral-600" />
                )}
              </div>
            );
          })}
        </div>
      )}

      <Link
        href="/programacion"
        className="mt-4 flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
      >
        Ver toda la programación
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
