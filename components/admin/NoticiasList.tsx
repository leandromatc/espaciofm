"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Headphones, Newspaper, Plus } from "lucide-react";
import { deleteNews } from "@/app/actions/news";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { TogglePublished } from "@/components/admin/TogglePublished";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/admin/ui/empty";
import { Tabs, TabsList, TabsTab } from "@/components/admin/ui/tabs";

export type NoticiaItem = {
  id: string;
  title: string;
  image_url: string | null;
  dateLabel: string;
  published: boolean;
  hasAudio: boolean;
};

type Filtro = "todas" | "publicadas" | "borradores";

export function NoticiasList({ news }: { news: NoticiaItem[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const publicadas = news.filter((n) => n.published).length;
  const visibles = news.filter((n) =>
    filtro === "todas" ? true : filtro === "publicadas" ? n.published : !n.published,
  );

  if (news.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <Newspaper aria-hidden />
        </EmptyMedia>
        <div className="flex flex-col items-center gap-1">
          <EmptyTitle>Todavía no hay noticias</EmptyTitle>
          <EmptyDescription>
            Creá la primera para que aparezca en la portada del sitio.
          </EmptyDescription>
        </div>
        <Button render={<Link href="/admin/noticias/nueva" />}>
          <Plus aria-hidden />
          Crear noticia
        </Button>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={filtro} onValueChange={(v) => setFiltro(v as Filtro)}>
        <TabsList aria-label="Filtrar noticias">
          <TabsTab value="todas">Todas ({news.length})</TabsTab>
          <TabsTab value="publicadas">Publicadas ({publicadas})</TabsTab>
          <TabsTab value="borradores">
            Borradores ({news.length - publicadas})
          </TabsTab>
        </TabsList>
      </Tabs>

      {visibles.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No hay noticias en este filtro.
        </p>
      ) : (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-border">
            {visibles.map((n) => (
              <li key={n.id} className="flex items-center gap-1 pr-1">
                <Link
                  href={`/admin/noticias/${n.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3 p-3 outline-none transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    {n.image_url && (
                      <Image
                        src={n.image_url}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-sm font-medium leading-5">
                      {n.title}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Badge variant={n.published ? "success" : "warning"}>
                        {n.published ? "Publicada" : "Borrador"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {n.dateLabel}
                      </span>
                      {n.hasAudio && (
                        <Headphones
                          aria-label="Tiene audio"
                          className="size-3.5 text-muted-foreground"
                        />
                      )}
                    </span>
                  </span>
                </Link>
                <div className="flex shrink-0 items-center">
                  <TogglePublished id={n.id} title={n.title} published={n.published} />
                  <ConfirmDelete
                    label="noticia"
                    name={n.title}
                    doneMessage="Noticia borrada"
                    onConfirm={() => deleteNews(n.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
