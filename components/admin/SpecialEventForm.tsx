"use client";

import { FormActions } from "@/components/admin/FormActions";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardPanel } from "@/components/admin/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/admin/ui/field";
import { Input } from "@/components/admin/ui/input";
import { TimeField } from "@/components/admin/ui/time-field";
import { DateField } from "@/components/admin/ui/date-field";
import { Switch } from "@/components/admin/ui/switch";
import { Textarea } from "@/components/admin/ui/textarea";

type SpecialEvent = {
  id?: number;
  name?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  description?: string;
  lugar?: string | null;
  en_cv10?: boolean;
};

interface SpecialEventFormProps {
  initialData?: SpecialEvent;
  action: (formData: FormData) => Promise<void>;
  title: string;
}

export function SpecialEventForm({
  initialData,
  action,
  title,
}: SpecialEventFormProps) {
  return (
    <>
      <PageHeader title={title} backHref="/admin/programacion?tab=eventos" backLabel="Eventos" />

      <form action={action} className="flex flex-col gap-4">
        <Card>
          <CardPanel className="flex flex-col gap-5">
            <Field>
              <FieldLabel>Nombre del evento</FieldLabel>
              <Input
                name="name"
                required
                defaultValue={initialData?.name}
                placeholder="Ej: Bristol vs Independiente"
              />
              <FieldDescription>
                Si es un partido, poné los equipos: es lo que se ve en grande en
                la portada.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Fecha</FieldLabel>
              <DateField name="date" required defaultValue={initialData?.date} />
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

            <Field>
              <FieldLabel>Lugar</FieldLabel>
              <Input
                name="lugar"
                defaultValue={initialData?.lugar ?? ""}
                placeholder="Ej: Estadio Köster"
              />
              <FieldDescription>Opcional.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Descripción</FieldLabel>
              <Textarea
                name="description"
                rows={3}
                defaultValue={initialData?.description}
                placeholder="Detalles del evento…"
              />
            </Field>
          </CardPanel>
        </Card>

        <Card>
          <CardPanel className="flex flex-col gap-3">
            <Field>
              <FieldLabel className="flex w-full items-center justify-between gap-4">
                <span className="flex flex-col gap-0.5">
                  <span>Se transmite por CV10</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Aparece en &ldquo;Partidos por CV10&rdquo; con el acceso al video.
                  </span>
                </span>
                <Switch name="en_cv10" defaultChecked={initialData?.en_cv10 ?? false} />
              </FieldLabel>
            </Field>
            <p className="border-t border-border pt-3 text-xs text-muted-foreground">
              La radio transmite un partido a la vez. Si este coincide en horario
              con otro que no tiene CV10, el sitio entiende que este va solo por
              CV10 y no lo muestra en la grilla de la radio.
            </p>
          </CardPanel>
        </Card>

        <FormActions cancelHref="/admin/programacion?tab=eventos" />
      </form>
    </>
  );
}
