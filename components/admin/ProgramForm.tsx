"use client";

import { useState } from "react";
import { FormActions } from "@/components/admin/FormActions";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardPanel } from "@/components/admin/ui/card";
import { Field, FieldLabel } from "@/components/admin/ui/field";
import { Input } from "@/components/admin/ui/input";
import { TimeField } from "@/components/admin/ui/time-field";
import { Textarea } from "@/components/admin/ui/textarea";
import { cn } from "@/lib/utils";

const ALL_DAYS = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

type Program = {
  id?: number;
  name?: string;
  days?: string[];
  start_time?: string;
  end_time?: string;
  description?: string;
};

interface ProgramFormProps {
  initialData?: Program;
  action: (formData: FormData) => Promise<void>;
  title: string;
}

export function ProgramForm({ initialData, action, title }: ProgramFormProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialData?.days ?? [],
  );

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  return (
    <>
      <PageHeader title={title} backHref="/admin/programacion" backLabel="Programación" />

      <form action={action} className="flex flex-col gap-4">
        {selectedDays.map((day) => (
          <input key={day} type="hidden" name="days" value={day} />
        ))}

        <Card>
          <CardPanel className="flex flex-col gap-5">
            <Field>
              <FieldLabel>Nombre del programa</FieldLabel>
              <Input
                name="name"
                required
                defaultValue={initialData?.name}
                placeholder="Ej: El Arranque"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Empieza</FieldLabel>
                <TimeField
                  name="start_time"
                  required
                  defaultValue={initialData?.start_time?.slice(0, 5)}
                />
              </Field>
              <Field>
                <FieldLabel>Termina</FieldLabel>
                <TimeField
                  name="end_time"
                  required
                  defaultValue={initialData?.end_time?.slice(0, 5)}
                />
              </Field>
            </div>
            <p className="-mt-3 text-xs text-muted-foreground">
              Hora de 24 horas, por ejemplo 16:30. Si ponés solo la hora (16), queda en punto.
            </p>

            <div role="group" aria-labelledby="dias-label" className="flex flex-col gap-2">
              <p id="dias-label" className="text-sm font-medium">
                Días
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_DAYS.map((day) => {
                  const on = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleDay(day)}
                      className={cn(
                        "h-11 rounded-lg border px-3.5 text-sm font-medium capitalize outline-none transition-[background-color,border-color,color,transform] duration-150 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] motion-reduce:active:scale-100 sm:h-9",
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field>
              <FieldLabel>Descripción</FieldLabel>
              <Textarea
                name="description"
                rows={3}
                defaultValue={initialData?.description}
                placeholder="Quién conduce y de qué trata…"
              />
            </Field>
          </CardPanel>
        </Card>

        <FormActions cancelHref="/admin/programacion" />
      </form>
    </>
  );
}
