import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type * as React from "react";

/**
 * Encabezado de cada pantalla del panel. En pantallas de formulario lleva el
 * "Volver" arriba (el celular no tiene barra de pestañas ahí).
 */
export function PageHeader({
  title,
  description,
  action,
  backHref,
  backLabel = "Volver",
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="mb-6">
      {backHref && (
        <Link
          href={backHref}
          className="-ml-2 mb-1 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {backLabel}
        </Link>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
