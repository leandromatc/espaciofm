import { fetchAllNews } from "@/utils/fetchNews";
import { togglePublished } from "@/app/actions/news";
import { DeleteButton } from "@/components/admin/DeleteButton";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";

export default async function AdminNoticiasPage() {
  const news = await fetchAllNews();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Noticias</h1>
        <Link
          href="/admin/noticias/nueva"
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          <Plus className="h-4 w-4" />
          Nueva noticia
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="py-16 text-center text-neutral-500">
          <p className="mb-4 text-sm">No hay noticias todavía.</p>
          <Link
            href="/admin/noticias/nueva"
            className="text-sm text-red-400 underline"
          >
            Crear la primera noticia
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {news.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-lg bg-neutral-900 px-4 py-3 ring-1 ring-inset ring-neutral-800"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(item.created_at).toLocaleDateString("es-UY")}
                  {item.audio_url && (
                    <span className="ml-2 text-red-400">• Tiene audio</span>
                  )}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    item.published
                      ? "bg-green-600/10 text-green-400 ring-1 ring-green-600/20"
                      : "bg-yellow-600/10 text-yellow-400 ring-1 ring-yellow-600/20"
                  }`}
                >
                  {item.published ? "Publicada" : "Borrador"}
                </span>

                <form
                  action={async () => {
                    "use server";
                    await togglePublished(item.id, !item.published);
                  }}
                >
                  <button
                    type="submit"
                    className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    title={item.published ? "Despublicar" : "Publicar"}
                  >
                    {item.published ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </form>

                <Link
                  href={`/admin/noticias/${item.id}`}
                  className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  title="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </Link>

                <DeleteButton id={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
