"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import type * as React from "react";
import { cn } from "@/lib/utils";

// coss ui Tabs (control segmentado) en v3. Los toques miden 44px en celular.
export function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-4", className)}
      data-slot="tabs"
      {...props}
    />
  );
}

export function TabsList({
  className,
  children,
  ...props
}: TabsPrimitive.List.Props): React.ReactElement {
  return (
    <TabsPrimitive.List
      className={cn(
        "relative z-0 flex w-full items-center gap-0.5 rounded-lg bg-muted p-0.5 sm:w-fit",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        className="absolute bottom-0 left-0 -z-10 h-[var(--active-tab-height)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-md bg-accent shadow-sm shadow-black/20 transition-[width,transform] duration-200 ease-out motion-reduce:transition-none"
        data-slot="tabs-indicator"
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({
  className,
  ...props
}: TabsPrimitive.Tab.Props): React.ReactElement {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "relative flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active]:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 sm:h-8 sm:flex-none",
        className,
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn("outline-none", className)}
      data-slot="tabs-panel"
      {...props}
    />
  );
}

export { TabsPrimitive };
