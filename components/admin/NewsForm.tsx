"use client";

import { useState } from "react";
import { News } from "@/types/supabase";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import Link from "next/link";

interface NewsFormProps {
  initialData?: News;
  action: (formData: FormData) => Promise<void>;
  title: string;
}

export function NewsForm({ initialData, action, title }: NewsFormProps) {
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [content, setContent] = useState(initialData?.content ?? "");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link href="/admin/noticias" className="text-sm text-neutral-400 hover:text-white">
          ← Volver
        </Link>
      </div>

      <form action={action} className="flex max-w-3xl flex-col gap-6">
        {/* Valores controlados por estado */}
        <input type="hidden" name="published" value={String(published)} />
        <input type="hidden" name="image_url" value="" />
        <input type="hidden" name="content" value={content} />

        <Field label="Título *">
          <input
            name="title"
            required
            defaultValue={initialData?.title}
            className={inputClass}
            placeholder="Título de la noticia"
          />
        </Field>

        <Field label="Resumen" hint="Texto corto para la tarjeta (máx 200 caracteres)">
          <textarea
            name="excerpt"
            rows={2}
            maxLength={200}
            defaultValue={initialData?.excerpt ?? ""}
            className={inputClass}
            placeholder="Descripción breve en texto plano..."
          />
        </Field>

        <Field label="Contenido *" hint="Soporta Markdown">
          <MarkdownEditor value={content} onChange={setContent} />
        </Field>

        <Field label="Link de audio" hint="URL de RadioCut u otro servicio">
          <input
            name="audio_url"
            type="url"
            defaultValue={initialData?.audio_url ?? ""}
            className={inputClass}
            placeholder="https://radiocut.fm/audiocut/..."
          />
        </Field>

        <Field label="Etiqueta del audio">
          <input
            name="audio_label"
            defaultValue={initialData?.audio_label ?? "Escuchar nota"}
            className={inputClass}
            placeholder="Escuchar nota"
          />
        </Field>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPublished((p) => !p)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              published ? "bg-red-600" : "bg-neutral-700"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                published ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm">
            {published ? "Publicada" : "Borrador"}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-500"
          >
            Guardar
          </button>
          <Link
            href="/admin/noticias"
            className="rounded-lg bg-neutral-800 px-6 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-700"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg bg-neutral-800 px-3 py-2.5 text-sm outline-none ring-1 ring-inset ring-neutral-700 focus:ring-red-600 placeholder:text-neutral-600 resize-none";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">
        {label}
        {hint && (
          <span className="ml-2 font-normal text-neutral-500">{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}
