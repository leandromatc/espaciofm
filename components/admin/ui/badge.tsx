import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

// coss ui Badge: estados con los colores semánticos del admin. Texto de 12px como mínimo.
export const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-transparent px-2 py-0.5 text-xs font-medium leading-4 [&_svg]:size-3 [&_svg]:shrink-0",
  {
    defaultVariants: { variant: "secondary" },
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border-input bg-transparent text-foreground",
        success: "bg-success/10 text-success-foreground",
        warning: "bg-warning/10 text-warning-foreground",
        info: "bg-info/10 text-info-foreground",
        error: "bg-destructive/10 text-destructive-foreground",
        live: "bg-primary/15 text-destructive-foreground",
      },
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>): React.ReactElement {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}
