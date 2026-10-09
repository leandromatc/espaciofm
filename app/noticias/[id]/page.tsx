import {
  dedupeNews,
  fetchNewsById,
  fetchPublishedNewsPaginated,
} from "@/utils/fetchNews";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { NewsCard } from "@/components/NewsCard";
import { ArrowLeft, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(content: string): number {
  const words = content
    .replace(/[#*`[\]()>_~]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [news, { data: moreNews }] = await Promise.all([
    fetchNewsById(id),
    fetchPublishedNewsPaginated(1, 8),
  ]);

  if (!news) notFound();

  const related = dedupeNews(moreNews)
    .filter((n) => n.id !== news.id && n.title !== news.title)
    .slice(0, 3);
  const minutes = readingTime(news.content);

  return (
    <>
      <Navbar />

      <main>
        {news.image_url && (
          <div className="relative mx-auto aspect-[16/9] w-full max-w-screen-xl overflow-hidden bg-ink-3 sm:aspect-[21/9]">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-5 pt-8">
          <Link
            href="/noticias"
            className="tiza-link press mb-8 inline-flex w-fit items-center gap-2 py-2 font-sans font-semibold text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Todas las noticias
          </Link>

          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-chalk-dim">
            {formatDate(news.created_at)} · {minutes} min de lectura
          </p>

          <h1
            className="mb-5 font-display font-black uppercase leading-[0.92] text-balance"
            style={{ fontSize: "clamp(2.75rem, 9vw, 5rem)" }}
          >
            {news.title}
          </h1>

          {news.excerpt && (
            <p className="mb-8 max-w-prose text-xl leading-relaxed text-chalk">
              {news.excerpt}
            </p>
          )}

          <div className="cal-rule mb-8" />

          {news.audio_url && (
            <div className="mb-8 flex items-center justify-between gap-4 border border-chalk/30 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Headphones aria-hidden className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold uppercase leading-none">
                    {news.audio_label ?? "Escuchar nota"}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-chalk-dim">
                    Audio disponible
                  </p>
                </div>
              </div>
              <a
                href={news.audio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex min-h-11 shrink-0 items-center bg-chalk px-5 font-sans font-semibold text-sm font-bold uppercase tracking-wider text-ink hover:bg-brand hover:text-white"
              >
                Escuchar
              </a>
            </div>
          )}

          <MarkdownRenderer content={news.content} />

          <div className="mt-12 border-t border-chalk/20 pb-16 pt-6">
            <Link
              href="/noticias"
              className="tiza-link press inline-flex w-fit items-center gap-2 py-2 font-sans font-semibold text-sm uppercase tracking-wider"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a todas las noticias
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-chalk/20 px-5 py-12">
            <div className="mx-auto max-w-screen-xl">
              <h2 className="mb-6 border-b border-chalk/30 pb-3 font-display text-4xl font-black uppercase leading-[0.9]">
                Más noticias
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((n) => (
                  <NewsCard key={n.id} news={n} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
