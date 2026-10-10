"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Tiempo que tarda en irse la página actual antes de navegar (ver html[data-leaving] en globals.css)
const SALIDA_MS = 220;

/**
 * Salida de página: al tocar un enlace interno, el contenido se desvanece y recién entonces se
 * navega; la página nueva entra con sus bloques escalonados (.page-in). El menú, la franja y
 * el player no se mueven. Atrás/adelante del navegador, enlaces externos, nueva pestaña, teclas
 * modificadoras, anclas de la misma página y el panel de administración navegan como siempre.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();

  // La página nueva ya montó: se quita la marca de salida
  useEffect(() => {
    document.documentElement.removeAttribute("data-leaving");
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let salir: ReturnType<typeof setTimeout> | undefined;
    let seguro: ReturnType<typeof setTimeout> | undefined;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      if (url.pathname.startsWith("/admin") || location.pathname.startsWith("/admin")) return;

      e.preventDefault();
      e.stopPropagation();
      const html = document.documentElement;
      html.setAttribute("data-leaving", "");
      clearTimeout(salir);
      clearTimeout(seguro);
      salir = setTimeout(
        () => router.push(url.pathname + url.search + url.hash),
        SALIDA_MS,
      );
      // Red de seguridad: si la navegación no llega a montar, el contenido vuelve
      seguro = setTimeout(() => html.removeAttribute("data-leaving"), 4000);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(salir);
      clearTimeout(seguro);
    };
  }, [router]);

  return null;
}
