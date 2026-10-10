import type * as React from "react";
import { cn } from "@/lib/utils";

// coss ui Card: contenedor con borde fino. Sin sombra: la profundidad es el borde.
export function Card({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
      data-slot="card"
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-col gap-1 px-4 pt-4 sm:px-5 sm:pt-5", className)}
      data-slot="card-header"
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h2">): React.ReactElement {
  return (
    <h2
      className={cn("text-base font-semibold leading-6", className)}
      data-slot="card-title"
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

export function CardPanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("p-4 sm:p-5", className)}
      data-slot="card-panel"
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t border-border px-4 py-3 sm:px-5",
        className,
      )}
      data-slot="card-footer"
      {...props}
    />
  );
}
