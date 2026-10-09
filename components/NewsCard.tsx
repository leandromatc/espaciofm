import { News } from "@/types/supabase";
import { Headphones, ArrowRight } from "lucide-react";
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

function shortDate(dateStr: string) {
  return new Date(dateStr)
    .toLocaleDateString("es-UY", { day: "2-digit", month: "short" })
    .replace(".", "");
}

function excerptOf(news: News, max: number) {
  const raw = stripMarkdown(news.excerpt || news.content);
  return raw.length > max ? raw.slice(0, max).trimEnd() + "…" : raw;
}

function AudioTag({ news }: { news: News }) {
  if (!news.audio_url) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-brand-hot">
      <Headphones aria-hidden className="h-3.5 w-3.5" />
      {news.audio_label ?? "Audio"}
    </span>
  );
}

/** Fila compacta para la portada: fecha, titular y miniatura. */
export function NewsRow({ news }: { news: News }) {
  return (
    <li>
      <Link
        href={`/noticias/${news.id}`}
        className="fila press group grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-4 px-3 py-4 sm:grid-cols-[5rem_1fr_auto] sm:gap-x-6 sm:px-5"
      >
        <p className="font-mono text-sm font-bold uppercase leading-tight tracking-wider text-chalk-dim">
          {shortDate(news.created_at)}
        </p>
        <div className="min-w-0">
          <p className="line-clamp-3 font-display text-2xl font-extrabold uppercase leading-[1.02] sm:line-clamp-2 sm:text-3xl">
            {news.title}
          </p>
          <p className="mt-1.5 hidden line-clamp-1 text-sm text-chalk-dim sm:block">
            {excerptOf(news, 140)}
          </p>
          <div className="mt-1.5 empty:hidden">
            <AudioTag news={news} />
          </div>
        </div>
        {news.image_url ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-ink-3 sm:h-20 sm:w-28">
            <Image
              src={news.image_url}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        ) : (
          <span aria-hidden className="h-16 w-16 sm:h-20 sm:w-28" />
        )}
      </Link>
    </li>
  );
}

/** Última noticia, grande (página /noticias). */
export function FeaturedNewsCard({ news }: { news: News }) {
  return (
    <Link href={`/noticias/${news.id}`} className="press group block">
      <article className="grid border border-chalk/30 sm:grid-cols-[1.3fr_1fr]">
        {news.image_url && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-3 sm:aspect-auto sm:min-h-[320px]">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              sizes="(min-width: 640px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col justify-between gap-6 p-5 sm:p-8">
          <div>
            <p className="font-mono text-sm uppercase tracking-wider text-brand-hot">
              Última · {shortDate(news.created_at)}
            </p>
            <h2 className="tiza-link mt-3 inline font-display text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
              {news.title}
            </h2>
            <p className="mt-4 line-clamp-3 text-chalk-dim">
              {excerptOf(news, 220)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <AudioTag news={news} />
            <span className="ml-auto flex items-center gap-2 font-sans font-semibold text-sm uppercase tracking-wider">
              Leer
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function NewsCard({ news }: { news: News }) {
  return (
    <Link href={`/noticias/${news.id}`} className="press group block h-full">
      <article className="flex h-full flex-col border border-chalk/25">
        {news.image_url && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-3">
            <Image
              src={news.image_url}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-chalk-dim">
            {shortDate(news.created_at)}
          </p>
          <h2 className="tiza-link self-start font-display text-3xl font-extrabold uppercase leading-[0.98]">
            {news.title}
          </h2>
          <p className="line-clamp-2 flex-1 text-sm text-chalk-dim">
            {excerptOf(news, 110)}
          </p>
          <AudioTag news={news} />
        </div>
      </article>
    </Link>
  );
}
