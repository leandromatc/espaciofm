"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSchedule, type Slot } from "@/components/schedule/ScheduleProvider";
import { CV10_URL } from "@/lib/contact";
import { MEDIO_LABEL, medioOf } from "@/lib/medio";

const STUB = "6.5rem";

function Entrada({ slot, tilt }: { slot: Slot; tilt: string }) {
  const d = new Date(`${slot.date}T12:00:00`);
  const weekday = d
    .toLocaleDateString("es-UY", { weekday: "short" })
    .replace(".", "");
  const month = d
    .toLocaleDateString("es-UY", { month: "short" })
    .replace(".", "");

  return (
    <li
      className={`entrada grid bg-chalk text-ink ${tilt}`}
      style={{
        gridTemplateColumns: `1fr 2px ${STUB}`,
        ["--stub-x" as string]: `calc(100% - ${STUB} - 1px)`,
      }}
    >
      <div className="min-w-0 px-5 py-5">
        <p className="font-display text-4xl font-black uppercase leading-[0.95]">
          {slot.name}
        </p>
        <p className="mt-2 font-mono text-sm uppercase tracking-wider text-ink/70">
          {slot.start} a {slot.end}
        </p>
        {slot.lugar && (
          <p className="mt-1 font-sans text-sm font-semibold uppercase tracking-wide">
            {slot.lugar}
          </p>
        )}
        <p className="mt-3">
          <span className="inline-block bg-brand px-2 py-1 font-sans text-xs font-bold uppercase tracking-wider text-white">
            {MEDIO_LABEL[medioOf(slot.enRadio, slot.enCv10)]}
          </span>
        </p>
        {slot.description && (
          <p className="mt-2 line-clamp-2 text-sm text-ink/75">
            {slot.description}
          </p>
        )}
      </div>
      <span aria-hidden className="entrada-perf my-3" />
      <div className="flex flex-col items-center justify-center px-2 py-5 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-wider">
          {weekday}
        </p>
        <p className="font-display text-6xl font-black leading-none">
          {d.getDate()}
        </p>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
          {month}
        </p>
      </div>
    </li>
  );
}

export function Entradas() {
  const { ready, upcoming } = useSchedule();
  // Esta sección es solo para lo que se ve en video; los partidos solo de radio están en la planilla
  const cv10 = upcoming.filter((s) => s.enCv10).slice(0, 4);

  return (
    <section id="transmisiones" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl">
        <h2 className="mb-8 border-b border-chalk/30 pb-3 font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl">
          Partidos por CV10
        </h2>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* CV10: la entrada grande, roja, como la de la tribuna */}
          <a
            href={CV10_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver el partido en video por CV10 (se abre en otra pestaña)"
            className="entrada group grid -rotate-1 bg-brand text-white transition-transform duration-200 ease-out-expo hover:rotate-0 active:scale-[0.98] lg:col-span-7"
            style={{
              gridTemplateColumns: `1fr 2px ${STUB}`,
              ["--stub-x" as string]: `calc(100% - ${STUB} - 1px)`,
            }}
          >
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <p
                className="font-display font-black uppercase leading-[0.85]"
                style={{ fontSize: "clamp(4rem, 14vw, 6rem)" }}
              >
                CV10
              </p>
              <p className="mt-3 font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">
                El partido, también en video
              </p>
              <p className="mt-4 max-w-md text-base text-white">
                Estos partidos se ven en video. Los que dicen Radio + CV10 también suenan por la radio.
              </p>
            </div>
            <span aria-hidden className="entrada-perf my-4" />
            <div className="flex flex-col items-center justify-center gap-2 px-2 text-center">
              <ArrowUpRight
                aria-hidden
                className="h-10 w-10 transition-transform duration-200 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1"
              />
              <span className="font-sans text-sm font-bold uppercase tracking-wider">
                Ver
              </span>
            </div>
          </a>

          {/* Eventos especiales cargados en el panel */}
          <div className="lg:col-span-5">
            {ready && cv10.length > 0 ? (
              <ul className="flex flex-col gap-5">
                {cv10.map((slot, i) => (
                  <Entrada
                    key={slot.key}
                    slot={slot}
                    tilt={i % 2 === 0 ? "rotate-1" : "-rotate-[0.5deg]"}
                  />
                ))}
              </ul>
            ) : (
              ready && (
                <p className="text-chalk-dim lg:pt-4">
                  Sin partidos por CV10 anunciados por ahora. Mirá la planilla de hoy
                  y la{" "}
                  <Link href="/programacion" className="tiza-link text-chalk">
                    grilla de la semana
                  </Link>
                  .
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
