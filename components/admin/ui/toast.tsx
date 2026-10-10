"use client";

import { Toast } from "@base-ui/react/toast";
import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const ICONS = {
  error: CircleAlert,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
} as const;

const ICON_COLOR = {
  error: "text-destructive-foreground",
  info: "text-info-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground",
} as const;

// Se puede llamar desde cualquier componente de cliente:
//   toastManager.add({ title: "Guardado", type: "success" })
export const toastManager: ReturnType<typeof Toast.createToastManager> =
  Toast.createToastManager();

function Toasts(): React.ReactElement {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal data-slot="toast-portal">
      {/* En celular queda sobre la barra de pestañas inferior; en escritorio, abajo a la derecha */}
      <Toast.Viewport
        className="fixed inset-x-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-[70] mx-auto flex max-w-sm flex-col gap-2 outline-none lg:inset-x-auto lg:bottom-6 lg:right-6 lg:mx-0"
        data-slot="toast-viewport"
      >
        {toasts.map((toast) => {
          const type = (toast.type ?? "info") as keyof typeof ICONS;
          const Icon = ICONS[type] ?? Info;
          return (
            <Toast.Root
              key={toast.id}
              className={cn(
                "flex items-start gap-3 rounded-xl border border-border bg-popover px-4 py-3 text-sm text-popover-foreground shadow-lg shadow-black/40 transition-[opacity,transform] duration-200 data-[ending-style]:translate-y-2 data-[starting-style]:translate-y-3 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none",
              )}
              toast={toast}
            >
              <Icon
                aria-hidden
                className={cn("mt-0.5 size-4 shrink-0", ICON_COLOR[type])}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <Toast.Title className="font-medium" data-slot="toast-title" />
                <Toast.Description
                  className="text-muted-foreground"
                  data-slot="toast-description"
                />
              </div>
              <Toast.Close
                aria-label="Cerrar aviso"
                className="-m-2 grid size-11 shrink-0 place-items-center rounded-lg text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X aria-hidden className="size-4" />
              </Toast.Close>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function ToastProvider({
  children,
  ...props
}: Toast.Provider.Props): React.ReactElement {
  return (
    <Toast.Provider timeout={4500} toastManager={toastManager} {...props}>
      {children}
      <Toasts />
    </Toast.Provider>
  );
}
