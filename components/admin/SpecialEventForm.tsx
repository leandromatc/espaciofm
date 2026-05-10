"use client";

import Link from "next/link";

type SpecialEvent = {
  id?: number;
  name?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  description?: string;
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
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link href="/admin/programacion" className="text-sm text-neutral-400 hover:text-white">
          ← Volver
        </Link>
      </div>

      <form action={action} className="flex max-w-lg flex-col gap-5">
        <Field label="Nombre del evento *">
          <input
            name="name"
            required
            defaultValue={initialData?.name}
            className={inputClass}
            placeholder="Ej: Final del Torneo Clausura"
          />
        </Field>

        <Field label="Fecha *">
          <input
            name="date"
            type="date"
            required
            defaultValue={initialData?.date}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Hora inicio *">
            <input
              name="start_time"
              type="time"
              required
              defaultValue={initialData?.start_time?.slice(0, 5)}
              className={inputClass}
            />
          </Field>
          <Field label="Hora fin *">
            <input
              name="end_time"
              type="time"
              required
              defaultValue={initialData?.end_time?.slice(0, 5)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Descripción">
          <textarea
            name="description"
            rows={3}
            defaultValue={initialData?.description}
            className={inputClass}
            placeholder="Detalles del evento..."
          />
        </Field>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-500"
          >
            Guardar
          </button>
          <Link
            href="/admin/programacion"
            className="rounded-lg bg-neutral-800 px-6 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-700"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg bg-neutral-800 px-3 py-2.5 text-sm outline-none ring-1 ring-inset ring-neutral-700 focus:ring-red-600 placeholder:text-neutral-600 resize-none";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
