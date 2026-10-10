"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type * as React from "react";
import { cn } from "@/lib/utils";

// coss ui Switch en v3: 44px de alto táctil en celular (el riel es de 28x48), más chico desde `sm`.
export function Switch({
  className,
  ...props
}: SwitchPrimitive.Root.Props): React.ReactElement {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[checked]:bg-primary data-[unchecked]:bg-muted-foreground/60 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 sm:h-6 sm:w-10",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="pointer-events-none block size-6 rounded-full bg-white shadow-sm transition-transform duration-200 data-[checked]:translate-x-5 sm:size-5 sm:data-[checked]:translate-x-4 motion-reduce:transition-none"
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };
