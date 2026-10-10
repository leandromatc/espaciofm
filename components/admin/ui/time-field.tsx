"use client";

import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/admin/ui/input";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/components/admin/ui/popover";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, "0"),
);

/** "930" -> "9:30"; "1630" -> "16:30" */
function mask(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, d.length - 2)}:${d.slice(-2)}` : d;
}

/**
 * "9:30" -> "09:30"; "16" -> "16:00" (solo la hora = en punto); null si no es una
 * hora de 24 h válida. Nunca hay AM/PM: 0 a 23.
 */
function normalize(text: string): string | null {
  const m = text.match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2] ?? "00");
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

/**
 * Hora de 24 h (como en la grilla de la radio): se escribe con teclado numérico o se
 * elige en dos columnas, hora y minutos. Envía "HH:MM" en un campo oculto.
 * Va dentro de un <Field> para que la etiqueta quede asociada.
 */
export function TimeField({
  name,
  defaultValue,
  required,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [text, setText] = useState(defaultValue?.slice(0, 5) ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const value = normalize(text);
  const valid = text === "" || value !== null;
  useEffect(() => {
    ref.current?.setCustomValidity(
      valid ? "" : "Poné una hora de 24 horas, por ejemplo 16:30.",
    );
  }, [valid, text]);

  const [hh, mm] = (value ?? "").split(":");

  const pick = (h: string, m: string) => {
    setText(`${h}:${m}`);
  };

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value ?? ""} />
      <Input
        ref={ref}
        inputMode="numeric"
        autoComplete="off"
        placeholder="hh:mm"
        required={required}
        maxLength={5}
        value={text}
        onChange={(e) => setText(mask(e.target.value))}
        onBlur={() => {
          const v = normalize(text);
          if (v) setText(v);
        }}
        className="pr-12 tabular-nums"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-label="Elegir la hora"
          className="absolute right-0 top-0 grid size-11 place-items-center rounded-lg text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:size-9"
        >
          <Clock aria-hidden className="size-4" />
        </PopoverTrigger>
        <PopoverPopup align="end" className="p-0">
          <div className="flex">
            <Columna
              titulo="Hora"
              items={HOURS}
              actual={hh}
              onPick={(h) => pick(h, mm ?? "00")}
            />
            <div aria-hidden className="w-px bg-border" />
            <Columna
              titulo="Min"
              items={MINUTES}
              actual={mm}
              onPick={(m) => {
                pick(hh ?? "00", m);
                setOpen(false);
              }}
            />
          </div>
          <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
            Otros minutos: escribilos en el campo.
          </p>
        </PopoverPopup>
      </Popover>
    </div>
  );
}

function Columna({
  titulo,
  items,
  actual,
  onPick,
}: {
  titulo: string;
  items: string[];
  actual?: string;
  onPick: (v: string) => void;
}) {
  const lista = useRef<HTMLUListElement>(null);
  // Al abrirse, la lista queda centrada en el valor actual (si no, el 18 queda fuera de vista)
  useEffect(() => {
    // El popup se posiciona después de montarse: se centra cuando ya tiene medidas
    const centrar = () => {
      const ul = lista.current;
      const sel = ul?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (ul && sel && ul.clientHeight > 0) {
        ul.scrollTop = sel.offsetTop - ul.clientHeight / 2 + sel.clientHeight / 2;
      }
    };
    const raf = requestAnimationFrame(centrar);
    const t1 = setTimeout(centrar, 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
    };
  }, []);

  return (
    <div className="flex w-20 flex-col">
      <p className="px-3 pt-2 text-xs font-medium text-muted-foreground">
        {titulo}
      </p>
      <ul
        ref={lista}
        role="listbox"
        aria-label={titulo}
        className="relative max-h-56 overflow-y-auto p-1"
      >
        {items.map((v) => (
          <li key={v} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={v === actual}
              onClick={() => onPick(v)}
              className={cn(
                "tnum flex h-10 w-full items-center justify-center rounded-lg font-mono text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:h-8",
                v === actual
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent",
              )}
            >
              {v}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
