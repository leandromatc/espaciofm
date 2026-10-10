"use client";

import { DayPicker } from "@daypicker/react";
import { es } from "@daypicker/react/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const navButton =
  "relative flex size-[var(--cell-size)] items-center justify-center rounded-lg text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * coss ui Calendar (react-day-picker) en v3: en español, la semana empieza el lunes,
 * celdas de 44px en celular y de 36px desde `sm`.
 */
export function Calendar({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>): React.ReactElement {
  const base = {
    months: "relative flex flex-col gap-2",
    month: "w-full",
    nav: "absolute top-0 z-10 flex w-full items-center justify-between",
    button_previous: navButton,
    button_next: navButton,
    month_caption:
      "relative mx-[var(--cell-size)] mb-1 flex h-[var(--cell-size)] items-center justify-center",
    caption_label: "text-sm font-semibold",
    weekdays: "flex",
    weekday:
      "flex size-[var(--cell-size)] items-center justify-center text-xs font-medium uppercase text-muted-foreground",
    week: "flex",
    day: "group size-[var(--cell-size)] p-px text-sm",
    day_button:
      "relative flex size-full items-center justify-center rounded-lg text-sm text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring group-data-[selected]:bg-primary group-data-[selected]:text-primary-foreground group-data-[selected]:hover:bg-primary/90 group-data-[outside]:text-muted-foreground/70 group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-40",
    today: "[&>button]:font-semibold [&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-input",
    outside: "",
    hidden: "invisible",
  };
  const merged = Object.fromEntries(
    Object.entries(base).map(([k, v]) => [
      k,
      cn(v, classNames?.[k as keyof typeof classNames] as string | undefined),
    ]),
  );

  return (
    <DayPicker
      className={cn(
        "w-fit [--cell-size:2.75rem] sm:[--cell-size:2.25rem]",
        className,
      )}
      classNames={merged}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft aria-hidden className="size-4" />
          ) : (
            <ChevronRight aria-hidden className="size-4" />
          ),
      }}
      data-slot="calendar"
      formatters={{
        formatCaption: (date) =>
          cap(
            new Intl.DateTimeFormat("es-UY", {
              month: "long",
              year: "numeric",
            }).format(date),
          ),
        formatWeekdayName: (date) =>
          new Intl.DateTimeFormat("es-UY", { weekday: "short" })
            .format(date)
            .replace(".", ""),
      }}
      locale={es}
      showOutsideDays
      weekStartsOn={1}
      {...props}
    />
  );
}
