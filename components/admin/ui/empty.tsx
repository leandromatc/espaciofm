import type * as React from "react";
import { cn } from "@/lib/utils";

// coss ui Empty: estado vacío con ícono, título, explicación y una acción.
export function Empty({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className,
      )}
      data-slot="empty"
      {...props}
    />
  );
}

export function EmptyMedia({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "grid size-10 place-items-center rounded-lg border border-border bg-card text-muted-foreground [&_svg]:size-5",
        className,
      )}
      data-slot="empty-media"
      {...props}
    />
  );
}

export function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("text-base font-semibold", className)}
      data-slot="empty-title"
      {...props}
    />
  );
}

export function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("max-w-xs text-sm text-muted-foreground", className)}
      data-slot="empty-description"
      {...props}
    />
  );
}
