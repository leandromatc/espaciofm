import { Loader2 } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

/** Indicador de carga (coss ui, portado a Tailwind v3). */
export function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof Loader2>): React.ReactElement {
  return (
    <Loader2
      aria-label="Cargando"
      className={cn("size-4 animate-spin motion-reduce:animate-none", className)}
      role="status"
      {...props}
    />
  );
}
