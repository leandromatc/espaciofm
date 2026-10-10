"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/admin/ui/alert-dialog";
import { Button } from "@/components/admin/ui/button";
import { toastManager } from "@/components/admin/ui/toast";

/**
 * Botón de borrar con confirmación. Nunca se borra con un toque suelto:
 * primero se abre una hoja que dice qué se va a borrar.
 */
export function ConfirmDelete({
  label,
  genero = "f",
  name,
  onConfirm,
  doneMessage,
}: {
  /** "noticia", "programa", "evento" */
  label: string;
  /** género gramatical del nombre, para "esta noticia" / "este evento" */
  genero?: "f" | "m";
  /** nombre del elemento, para que se vea qué se borra */
  name: string;
  onConfirm: () => Promise<void>;
  doneMessage: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const este = genero === "f" ? "esta" : "este";
  const el = genero === "f" ? "la" : "el";

  const confirm = () => {
    startTransition(async () => {
      try {
        await onConfirm();
        setOpen(false);
        toastManager.add({ title: doneMessage, type: "success" });
        router.refresh();
      } catch {
        toastManager.add({
          title: `No se pudo borrar ${el} ${label}`,
          description: "Probá de nuevo en un momento.",
          type: "error",
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Borrar ${label}: ${name}`}
            className="text-muted-foreground hover:text-destructive-foreground"
          />
        }
      >
        <Trash2 aria-hidden />
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Borrar {este} {label}?</AlertDialogTitle>
          <AlertDialogDescription>
            Se va a borrar <strong className="text-foreground">{name}</strong>.
            No se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="outline" disabled={pending} />}>
            Cancelar
          </AlertDialogClose>
          <Button variant="destructive" loading={pending} onClick={confirm}>
            Borrar
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
