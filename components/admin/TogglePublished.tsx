"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { togglePublished } from "@/app/actions/news";
import { Button } from "@/components/admin/ui/button";
import { toastManager } from "@/components/admin/ui/toast";

/** Publicar o pasar a borrador con un toque, sin abrir el formulario. */
export function TogglePublished({
  id,
  title,
  published,
}: {
  id: string;
  title: string;
  published: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const toggle = () => {
    startTransition(async () => {
      try {
        await togglePublished(id, !published);
        toastManager.add({
          title: published ? "Pasó a borrador" : "Noticia publicada",
          type: "success",
        });
        router.refresh();
      } catch {
        toastManager.add({
          title: "No se pudo cambiar el estado",
          description: "Probá de nuevo en un momento.",
          type: "error",
        });
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      loading={pending}
      onClick={toggle}
      aria-label={`${published ? "Pasar a borrador" : "Publicar"}: ${title}`}
      className="text-muted-foreground hover:text-foreground"
    >
      {published ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
    </Button>
  );
}
