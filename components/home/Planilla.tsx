"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LiveDot } from "@/components/player/LiveDot";
import { useSchedule } from "@/components/schedule/ScheduleProvider";
import { toMinutes } from "@/utils/montevideo";
import { MEDIO_LABEL, medioOf } from "@/lib/medio";

export function Planilla() {
  const { ready, today, onAir, next, nowLabel, nowMinutes: nowMin } = useSchedule();

  const dateLabel = ready
    ? new Date(`${nowLabel.date}T12:00:00`).toLocaleDateString("es-UY", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      })
    : "";

  return (
    <section id="planilla" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-chalk/30 pb-3">
          <h2 className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl">
            La planilla de hoy
          </h2>
          <p className="shrink-0 font-mono text-sm uppercase tracking-wider text-chalk-dim">
            {ready ? dateLabel.replace(".", "") : " "}
          </p>
        </div>

        {!ready && (
          <ol aria-hidden className="divide-y divide-chalk/15">
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                className="h-[84px] animate-pulse bg-chalk/[0.04] motion-reduce:animate-none"
              />
            ))}
          </ol>
        )}

        {ready && today.length === 0 && (
          <div className="py-10">
            <p className="font-display text-3xl font-extrabold uppercase">
              Hoy no hay programa fijo
            </p>
            {next && (
              <p className="mt-2 font-mono text-sm uppercase tracking-wider text-chalk-dim">
                Vuelve {next.when === "hoy" ? "" : `${next.when} `}
                {next.start} · {next.name}
              </p>
            )}
          </div>
        )}

        {ready && today.length > 0 && (
          <ol className="divide-y divide-chalk/15 border-b border-chalk/15">
            {today.map((slot) => {
              const live = onAir?.key === slot.key;
              const isNext = !live && next?.key === slot.key && next.when === "hoy";
              const past = !live && toMinutes(slot.end) <= nowMin;

              return (
                <li
                  key={slot.key}
                  aria-current={live ? "true" : undefined}
                  className={`grid grid-cols-[4.75rem_1fr_auto] items-center gap-x-4 px-3 py-4 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-6 sm:px-5 ${
                    live ? "bg-chalk text-ink" : past ? "text-chalk/60" : ""
                  }`}
                >
                  <div className="font-mono">
                    <p className="text-lg font-bold leading-none sm:text-2xl">
                      {slot.start}
                    </p>
                    <p
                      className={`mt-1 text-xs ${live ? "text-ink/70" : "text-chalk-dim"} ${past ? "!text-chalk/60" : ""}`}
                    >
                      a {slot.end}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`font-display text-3xl font-extrabold uppercase leading-[0.95] text-balance sm:text-4xl ${
                        past ? "line-through decoration-chalk/50 decoration-2" : ""
                      }`}
                    >
                      {slot.name}
                    </p>
                    {slot.description && (
                      <p
                        className={`mt-1.5 line-clamp-1 text-sm ${
                          live ? "text-ink/75" : past ? "text-chalk/60" : "text-chalk-dim"
                        }`}
                      >
                        {slot.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
                    {live && (
                      <span className="flex items-center gap-2 text-brand">
                        <LiveDot className="[--dot:9px] text-brand" />
                        Al aire
                      </span>
                    )}
                    {isNext && (
                      <span className="border border-chalk px-2 py-1 text-chalk">
                        Sigue
                      </span>
                    )}
                    {slot.isSpecial && !past && (
                      <span
                        className={
                          slot.enCv10
                            ? live
                              ? "text-brand"
                              : "text-brand-hot"
                            : live
                              ? "text-ink"
                              : "text-chalk-dim"
                        }
                      >
                        {MEDIO_LABEL[medioOf(slot.enRadio, slot.enCv10)]}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        <Link
          href="/programacion"
          className="tiza-link press mt-4 inline-flex min-h-11 items-center gap-2 font-sans font-semibold text-sm uppercase tracking-wider"
        >
          Ver la grilla de la semana
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
