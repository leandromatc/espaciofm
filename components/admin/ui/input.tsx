"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";
import { cn } from "@/lib/utils";

// 16px en celular (iOS no hace zoom al enfocar), 14px desde `sm`.
export const controlClassName =
  "w-full min-w-0 rounded-lg border border-input bg-background px-3 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/85 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive data-[invalid]:border-destructive sm:text-sm";

export function Input({
  className,
  ...props
}: InputPrimitive.Props & React.RefAttributes<HTMLInputElement>): React.ReactElement {
  return (
    <InputPrimitive
      className={cn(controlClassName, "h-11 sm:h-9", className)}
      data-slot="input"
      {...props}
    />
  );
}
