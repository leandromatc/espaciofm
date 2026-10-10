"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/admin/ui/calendar";
import { Input } from "@/components/admin/ui/input";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/components/admin/ui/popover";

// Texto "dd/mm/aaaa" <-> ISO "aaaa-mm-dd" (lo que guardan las acciones del servidor).
const isoToText = (iso?: string) => {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : "";
};

function textToIso(text: string): string | null {
  const m = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [, d, mo, y] = m;
  const date = new Date(Date.UTC(+y, +mo - 1, +d, 12));
  const ok =
    date.getUTCFullYear() === +y &&
    date.getUTCMonth() === +mo - 1 &&
    date.getUTCDate() === +d;
  return ok ? `${y}-${mo}-${d}` : null;
}

const isoToDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};

const dateToIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/**
 * Fecha en español: se escribe (dd/mm/aaaa, con las barras solas) o se elige en un
 * calendario con el estilo del admin. Envía "aaaa-mm-dd" en un campo oculto.
 * Va dentro de un <Field> para que la etiqueta quede asociada.
 */
export function DateField({
  name,
  defaultValue,
  required,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [iso, setIso] = useState(defaultValue ?? "");
  const [text, setText] = useState(isoToText(defaultValue));
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const valid = text === "" || textToIso(text) !== null;
  useEffect(() => {
    ref.current?.setCustomValidity(
      valid ? "" : "Poné una fecha válida, por ejemplo 12/10/2026.",
    );
  }, [valid, text]);

  const onType = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    const t =
      digits.length > 4
        ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
        : digits.length > 2
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits;
    setText(t);
    setIso(textToIso(t) ?? "");
  };

  return (
    <div className="relative">
      <input type="hidden" name={name} value={iso} />
      <Input
        ref={ref}
        inputMode="numeric"
        autoComplete="off"
        placeholder="dd/mm/aaaa"
        required={required}
        maxLength={10}
        value={text}
        onChange={(e) => onType(e.target.value)}
        className="pr-12 tabular-nums"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-label="Elegir la fecha en el calendario"
          className="absolute right-0 top-0 grid size-11 place-items-center rounded-lg text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:size-9"
        >
          <CalendarDays aria-hidden className="size-4" />
        </PopoverTrigger>
        <PopoverPopup align="end">
          <Calendar
            mode="single"
            selected={iso ? isoToDate(iso) : undefined}
            defaultMonth={iso ? isoToDate(iso) : undefined}
            onSelect={(d) => {
              if (!d) return;
              const next = dateToIso(d);
              setIso(next);
              setText(isoToText(next));
              setOpen(false);
            }}
          />
        </PopoverPopup>
      </Popover>
    </div>
  );
}
