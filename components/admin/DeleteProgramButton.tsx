"use client";

import { Trash2 } from "lucide-react";
import { deleteProgram, deleteSpecialEvent } from "@/app/actions/programs";

export function DeleteProgramButton({
  id,
  type,
}: {
  id: number;
  type: "program" | "event";
}) {
  const handleDelete = async () => {
    const label = type === "program" ? "programa" : "evento";
    if (!confirm(`¿Eliminás este ${label}?`)) return;
    if (type === "program") await deleteProgram(id);
    else await deleteSpecialEvent(id);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-red-400"
      title="Eliminar"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
