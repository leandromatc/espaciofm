"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarClock, MapPin, Plus, Radio } from "lucide-react";
import { deleteProgram, deleteSpecialEvent } from "@/app/actions/programs";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { Badge, type badgeVariants } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/admin/ui/empty";
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/components/admin/ui/tabs";
import type { VariantProps } from "class-variance-authority";

export type ProgramaItem = {
  id: number;
  name: string;
  start: string;
  end: string;
  days: string[];
};

export type EventoItem = {
  id: number;
  name: string;
  dateLabel: string;
  start: string;
  end: string;
  lugar: string | null;
  medioLabel: string;
  medioVariant: NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
  past: boolean;
};

const DIAS = [
  ["lunes", "L"],
  ["martes", "M"],
  ["miércoles", "X"],
  ["jueves", "J"],
  ["viernes", "V"],
  ["sábado", "S"],
  ["domingo", "D"],
] as const;

export function ProgramacionPanel({
  programs,
  events,
  initialTab,
}: {
  programs: ProgramaItem[];
  events: EventoItem[];
  initialTab: "programas" | "eventos";
}) {
  const [tab, setTab] = useState<"programas" | "eventos">(initialTab);
  const proximos = events.filter((e) => !e.past);
  const pasados = events.filter((e) => e.past);

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
      <TabsList aria-label="Qué querés ver">
        <TabsTab value="programas">Programas ({programs.length})</TabsTab>
        <TabsTab value="eventos">Eventos ({events.length})</TabsTab>
      </TabsList>

      {/* ── Grilla semanal ── */}
      <TabsPanel value="programas" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            La grilla que se repite cada semana.
          </p>
          <Button size="sm" render={<Link href="/admin/programacion/nuevo" />}>
            <Plus aria-hidden />
            Nuevo
          </Button>
        </div>

        {programs.length === 0 ? (
          <Empty>
            <EmptyMedia>
              <Radio aria-hidden />
            </EmptyMedia>
            <div className="flex flex-col items-center gap-1">
              <EmptyTitle>No hay programas cargados</EmptyTitle>
              <EmptyDescription>
                Cargá los programas de la semana para que la portada muestre qué
                está al aire.
              </EmptyDescription>
            </div>
          </Empty>
        ) : (
          <Card className="overflow-hidden">
            <ul className="divide-y divide-border">
              {programs.map((p) => (
                <li key={p.id} className="flex items-center gap-1 pr-1">
                  <Link
                    href={`/admin/programacion/${p.id}`}
                    className="flex min-w-0 flex-1 flex-col gap-2 p-3 outline-none transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="tnum shrink-0 font-mono text-sm text-muted-foreground">
                        {p.start}–{p.end}
                      </span>
                      <span className="truncate text-sm font-medium">{p.name}</span>
                    </span>
                    <span
                      className="flex gap-1"
                      role="img"
                      aria-label={`Días: ${p.days.join(", ") || "ninguno"}`}
                    >
                      {DIAS.map(([dia, letra]) => (
                        <span
                          key={dia}
                          aria-hidden
                          className={
                            p.days.includes(dia)
                              ? "grid size-6 place-items-center rounded-md bg-secondary text-xs font-semibold text-foreground"
                              : "grid size-6 place-items-center rounded-md border border-border text-xs text-muted-foreground/80"
                          }
                        >
                          {letra}
                        </span>
                      ))}
                    </span>
                  </Link>
                  <ConfirmDelete
                    label="programa"
                    genero="m"
                    name={p.name}
                    doneMessage="Programa borrado"
                    onConfirm={() => deleteProgram(p.id)}
                  />
                </li>
              ))}
            </ul>
          </Card>
        )}
      </TabsPanel>

      {/* ── Eventos especiales ── */}
      <TabsPanel value="eventos" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Partidos y transmisiones especiales.
          </p>
          <Button
            size="sm"
            render={<Link href="/admin/programacion/eventos/nuevo" />}
          >
            <Plus aria-hidden />
            Nuevo
          </Button>
        </div>

        {events.length === 0 ? (
          <Empty>
            <EmptyMedia>
              <CalendarClock aria-hidden />
            </EmptyMedia>
            <div className="flex flex-col items-center gap-1">
              <EmptyTitle>No hay eventos cargados</EmptyTitle>
              <EmptyDescription>
                Cargá el próximo partido: lugar, horario y si va por CV10.
              </EmptyDescription>
            </div>
          </Empty>
        ) : (
          <>
            <EventosGrupo items={proximos} />
            {pasados.length > 0 && (
              <section className="flex flex-col gap-2">
                <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ya pasaron
                </h2>
                <EventosGrupo items={pasados} />
              </section>
            )}
          </>
        )}
      </TabsPanel>
    </Tabs>
  );
}

function EventosGrupo({ items }: { items: EventoItem[] }) {
  if (items.length === 0) return null;
  return (
    <Card className="overflow-hidden">
      <ul className="divide-y divide-border">
        {items.map((e) => (
          <li key={e.id} className="flex items-center gap-1 pr-1">
            <Link
              href={`/admin/programacion/eventos/${e.id}`}
              className={`flex min-w-0 flex-1 flex-col gap-1.5 p-3 outline-none transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`}
            >
              <span className="truncate text-sm font-medium">{e.name}</span>
              <span className="tnum flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="font-mono">
                  {e.dateLabel} · {e.start}–{e.end}
                </span>
                {e.lugar && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin aria-hidden className="size-3.5" />
                    {e.lugar}
                  </span>
                )}
              </span>
              <Badge variant={e.medioVariant} className="w-fit">
                {e.medioLabel}
              </Badge>
            </Link>
            <ConfirmDelete
              label="evento"
              genero="m"
              name={e.name}
              doneMessage="Evento borrado"
              onConfirm={() => deleteSpecialEvent(e.id)}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}
