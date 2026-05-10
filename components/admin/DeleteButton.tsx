"use client";

import { Trash2 } from "lucide-react";
import { deleteNews } from "@/app/actions/news";

export function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que querés eliminar esta noticia?")) return;
    await deleteNews(id);
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
