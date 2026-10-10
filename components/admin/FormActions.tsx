"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/admin/ui/button";

/**
 * Barra de guardar. En celular queda fija abajo (con zona segura) para que Guardar
 * siempre esté al alcance del pulgar; en escritorio va a continuación del formulario.
 * Va DENTRO del <form>. El botón se bloquea mientras guarda: evita el doble envío.
 */
export function FormActions({
  cancelHref,
  submitLabel = "Guardar",
}: {
  cancelHref: string;
  submitLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-2 flex gap-2 border-t border-border bg-background px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-3 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
      <Button
        variant="outline"
        className="flex-1 sm:flex-none"
        disabled={pending}
        render={<Link href={cancelHref} />}
      >
        Cancelar
      </Button>
      <Button type="submit" loading={pending} className="flex-[2] sm:flex-none sm:min-w-28">
        {submitLabel}
      </Button>
    </div>
  );
}
