"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { controlClassName } from "@/components/admin/ui/input";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">): React.ReactElement {
  return (
    <FieldPrimitive.Control
      render={
        <textarea
          className={cn(
            controlClassName,
            "min-h-24 resize-y py-2.5 leading-6",
            className,
          )}
          data-slot="textarea"
          {...props}
        />
      }
    />
  );
}
