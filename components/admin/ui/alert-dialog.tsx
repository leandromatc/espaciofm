"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type * as React from "react";
import { cn } from "@/lib/utils";

// coss ui AlertDialog en v3. En celular sube desde abajo, pegado al borde (como una hoja);
// desde `sm` queda centrado. Borrar siempre pasa por acá.
export const AlertDialog: typeof AlertDialogPrimitive.Root =
  AlertDialogPrimitive.Root;

export function AlertDialogTrigger(
  props: AlertDialogPrimitive.Trigger.Props,
): React.ReactElement {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export function AlertDialogPopup({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop
        className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none"
        data-slot="alert-dialog-backdrop"
      />
      <AlertDialogPrimitive.Viewport
        className="fixed inset-0 z-50 grid grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4"
        data-slot="alert-dialog-viewport"
      >
        <AlertDialogPrimitive.Popup
          className={cn(
            "relative row-start-2 flex max-h-full w-full max-w-none flex-col rounded-t-2xl border border-b-0 border-border bg-popover pb-[env(safe-area-inset-bottom,0px)] text-popover-foreground outline-none transition-[opacity,transform] duration-200 data-[ending-style]:translate-y-4 data-[starting-style]:translate-y-4 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none sm:max-w-md sm:rounded-2xl sm:border-b sm:pb-0 sm:data-[ending-style]:translate-y-0 sm:data-[starting-style]:translate-y-0 sm:data-[ending-style]:scale-95 sm:data-[starting-style]:scale-95",
            className,
          )}
          data-slot="alert-dialog-popup"
          {...props}
        />
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-col gap-2 p-5 pb-4", className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 p-5 pt-2 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Title
      className={cn("text-lg font-semibold leading-6", className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

export function AlertDialogClose(
  props: AlertDialogPrimitive.Close.Props,
): React.ReactElement {
  return (
    <AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />
  );
}

export { AlertDialogPrimitive };
