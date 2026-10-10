"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toastManager } from "@/components/admin/ui/toast";

const MENSAJES: Record<string, string> = {
  guardado: "Cambios guardados",
  creado: "Creado y guardado",
};

/**
 * Las acciones de servidor redirigen con ?ok=guardado. Acá se muestra el aviso y
 * se limpia la URL para que no reaparezca al recargar.
 */
export function AvisoToast() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const ok = params.get("ok");

  useEffect(() => {
    if (!ok) return;
    toastManager.add({
      title: MENSAJES[ok] ?? "Listo",
      type: "success",
    });
    const rest = new URLSearchParams(params.toString());
    rest.delete("ok");
    const qs = rest.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [ok, params, pathname, router]);

  return null;
}
