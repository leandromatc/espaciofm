"use client";

import { useState } from "react";
import { News } from "@/types/supabase";
import { FormActions } from "@/components/admin/FormActions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardHeader, CardPanel, CardTitle } from "@/components/admin/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/admin/ui/field";
import { Input } from "@/components/admin/ui/input";
import { Switch } from "@/components/admin/ui/switch";
import { Textarea } from "@/components/admin/ui/textarea";

interface NewsFormProps {
  initialData?: News;
  action: (formData: FormData) => Promise<void>;
  title: string;
}

export function NewsForm({ initialData, action, title }: NewsFormProps) {
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [content, setContent] = useState(initialData?.content ?? "");

  return (
    <>
      <PageHeader title={title} backHref="/admin/noticias" backLabel="Noticias" />

      <form action={action} className="flex flex-col gap-4">
        {/* Valores controlados por estado */}
        <input type="hidden" name="published" value={String(published)} />
        <input type="hidden" name="content" value={content} />

        <Card>
          <CardPanel className="flex flex-col gap-5">
            <Field>
              <FieldLabel>Título</FieldLabel>
              <Input
                name="title"
                required
                defaultValue={initialData?.title}
                placeholder="Título de la noticia"
              />
            </Field>

            <Field>
              <FieldLabel>Resumen</FieldLabel>
              <Textarea
                name="excerpt"
                rows={3}
                maxLength={200}
                defaultValue={initialData?.excerpt ?? ""}
                placeholder="Una o dos líneas para la portada…"
              />
              <FieldDescription>
                Texto corto para la tarjeta. Máximo 200 caracteres.
              </FieldDescription>
            </Field>

            <div role="group" aria-labelledby="contenido-label" className="flex flex-col gap-2">
              <p id="contenido-label" className="text-sm font-medium">
                Contenido
              </p>
              <MarkdownEditor value={content} onChange={setContent} />
              <p className="text-xs text-muted-foreground">Soporta Markdown.</p>
            </div>
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagen</CardTitle>
          </CardHeader>
          <CardPanel>
            <ImageUpload name="image_url" defaultValue={initialData?.image_url} />
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audio (opcional)</CardTitle>
          </CardHeader>
          <CardPanel className="flex flex-col gap-5">
            <Field>
              <FieldLabel>Link del audio</FieldLabel>
              <Input
                name="audio_url"
                type="url"
                inputMode="url"
                defaultValue={initialData?.audio_url ?? ""}
                placeholder="https://radiocut.fm/audiocut/…"
              />
              <FieldDescription>De RadioCut u otro servicio.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Texto del botón</FieldLabel>
              <Input
                name="audio_label"
                defaultValue={initialData?.audio_label ?? "Escuchar nota"}
                placeholder="Escuchar nota"
              />
            </Field>
          </CardPanel>
        </Card>

        <Card>
          <CardPanel>
            <Field>
              <FieldLabel className="flex w-full items-center justify-between gap-4">
                <span className="flex flex-col gap-0.5">
                  <span>{published ? "Publicada" : "Borrador"}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {published
                      ? "Se ve en el sitio."
                      : "No se ve en el sitio hasta que la publiques."}
                  </span>
                </span>
                <Switch checked={published} onCheckedChange={setPublished} />
              </FieldLabel>
            </Field>
          </CardPanel>
        </Card>

        <FormActions cancelHref="/admin/noticias" />
      </form>
    </>
  );
}
