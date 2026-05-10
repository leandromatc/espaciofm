import { News } from "@/types/supabase";
import { Headphones, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\n/g, " ")
    .trim();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function FeaturedNewsCard({ news }: { news: News }) {
  const rawExcerpt = news.excerpt || news.content;
  const excerpt = stripMarkdown(rawExcerpt).slice(0, 220) + (rawExcerpt.length > 220 ? "..." : "");

  return (
    <Link href={`/noticias/${news.id}`}>
      <article className="group relative overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-inset ring-neutral-800 transition-all hover:ring-red-600/60">
        {news.image_url ? (
          <>
            <div className="relative h-72 w-full overflow-hidden sm:h-80">
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <span className="mb-3 inline-block rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                Última noticia
              </span>
              <h2 className="text-xl font-bold leading-snug text-white group-hover:text-red-400 sm:text-2xl">
                {news.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-300">{excerpt}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(news.created_at)}
                </span>
                {news.audio_url && (
                  <span className="flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-red-400 ring-1 ring-inset ring-red-600/20">
                    <Headphones className="h-3 w-3" />
                    {news.audio_label ?? "Audio"}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="p-5 sm:p-7">
            <span className="mb-3 inline-block rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              Última noticia
            </span>
            <h2 className="text-xl font-bold leading-snug group-hover:text-red-400 sm:text-2xl">
              {news.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{excerpt}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(news.created_at)}
                </span>
                {news.audio_url && (
                  <span className="flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-red-400 ring-1 ring-inset ring-red-600/20">
                    <Headphones className="h-3 w-3" />
                    {news.audio_label ?? "Audio"}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-xs text-red-500 group-hover:gap-2 transition-all">
                Leer más <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        )}
      </article>
    </Link>
  );
}

export function NewsCard({ news }: { news: News }) {
  const rawExcerpt = news.excerpt || news.content;
  const excerpt =
    rawExcerpt.length > 110
      ? stripMarkdown(rawExcerpt).slice(0, 110) + "..."
      : stripMarkdown(rawExcerpt);

  return (
    <Link href={`/noticias/${news.id}`}>
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-inset ring-neutral-800 transition-all hover:ring-red-600/50">
        {news.image_url && (
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h2 className="text-sm font-semibold leading-snug group-hover:text-red-400 sm:text-base">
            {news.title}
          </h2>
          <p className="flex-1 text-xs text-neutral-400 sm:text-sm">{excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(news.created_at)}
            </span>
            {news.audio_url && (
              <span className="flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-red-400 ring-1 ring-inset ring-red-600/20">
                <Headphones className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
