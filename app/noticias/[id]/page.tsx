import { fetchNewsById, fetchPublishedNewsPaginated } from "@/utils/fetchNews";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { NewsCard } from "@/components/NewsCard";
import { Calendar, ArrowLeft, Headphones, Clock } from "lucide-react";
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
    fetchPublishedNewsPaginated(1, 4),
  ]);

  if (!news) notFound();

  const related = moreNews.filter((n) => n.id !== news.id).slice(0, 3);
  const minutes = readingTime(news.content);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero image */}
        {news.image_url && (
          <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-[480px]">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          </div>
        )}

        {/* Article */}
        <div
          className={`mx-auto max-w-3xl px-5 ${news.image_url ? "-mt-24 relative" : "pt-10"}`}
        >
          {/* Back link */}
          <Link
            href="/noticias"
            className="mb-8 flex w-fit items-center gap-1.5 rounded-full bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-400 ring-1 ring-neutral-800 backdrop-blur-sm transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" />
            Todas las noticias
          </Link>

          {/* Metadata */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(news.created_at)}
            </span>
            <span className="text-neutral-700">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {minutes} min de lectura
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {news.title}
          </h1>

          {/* Excerpt */}
          {news.excerpt && (
            <p className="mb-8 border-l-2 border-red-600 pl-4 text-lg font-light leading-relaxed text-neutral-300">
              {news.excerpt}
            </p>
          )}

          {/* Divider */}
          <hr className="mb-8 border-neutral-800" />

          {/* Audio card */}
          {news.audio_url && (
            <div className="mb-8 flex items-center justify-between gap-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-inset ring-neutral-800 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/10 ring-1 ring-inset ring-red-600/20">
                  <Headphones className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {news.audio_label ?? "Escuchar nota"}
                  </p>
                  <p className="text-xs text-neutral-500">Audio disponible</p>
                </div>
              </div>
              <a
                href={news.audio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
              >
                Escuchar →
              </a>
            </div>
          )}

          {/* Content */}
          <MarkdownRenderer content={news.content} />

          {/* Bottom back link */}
          <div className="mt-12 border-t border-neutral-800 pb-16 pt-8">
            <Link
              href="/noticias"
              className="flex w-fit items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a todas las noticias
            </Link>
          </div>
        </div>

        {/* Related news */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-neutral-800 px-5 py-12">
            <div className="mx-auto max-w-screen-xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold uppercase">Más noticias</h2>
                <span className="mt-1 block h-[2px] w-[50px] bg-red-600" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
