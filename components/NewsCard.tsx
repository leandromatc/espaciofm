import { News } from "@/types/supabase";
import { Headphones, Calendar } from "lucide-react";
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

export function NewsCard({ news }: { news: News }) {
  const rawExcerpt = news.excerpt || news.content;
  const excerpt =
    rawExcerpt.length > 140
      ? stripMarkdown(rawExcerpt).slice(0, 140) + "..."
      : stripMarkdown(rawExcerpt);

  return (
    <Link href={`/noticias/${news.id}`}>
      <article className="group flex cursor-pointer flex-col overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-inset ring-neutral-800 transition-all hover:ring-red-600/50">
        {news.image_url && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <h2 className="text-lg font-semibold leading-snug group-hover:text-red-400">
            {news.title}
          </h2>
          <p className="flex-1 text-sm text-neutral-400">{excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(news.created_at)}
            </span>
            {news.audio_url && (
              <span className="flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-red-400 ring-1 ring-inset ring-red-600/20">
                <Headphones className="h-3 w-3" />
                {news.audio_label ?? "Tiene audio"}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
