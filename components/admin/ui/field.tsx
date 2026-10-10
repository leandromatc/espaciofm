"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import type * as React from "react";
import { cn } from "@/lib/utils";

export function Field({
  className,
  ...props
}: FieldPrimitive.Root.Props): React.ReactElement {
  return (
    <FieldPrimitive.Root
      className={cn("flex flex-col items-stretch gap-2", className)}
      data-slot="field"
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: FieldPrimitive.Label.Props): React.ReactElement {
  return (
    <FieldPrimitive.Label
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-foreground data-[disabled]:opacity-50",
        className,
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props): React.ReactElement {
  return (
    <FieldPrimitive.Description
      className={cn("text-xs text-muted-foreground", className)}
      data-slot="field-description"
      {...props}
    />
  );
}

export function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props): React.ReactElement {
  return (
    <FieldPrimitive.Error
      className={cn("text-xs text-destructive-foreground", className)}
      data-slot="field-error"
      {...props}
    />
  );
}

export { FieldPrimitive };
