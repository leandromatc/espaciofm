import { fetchNewsById } from "@/utils/fetchNews";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Calendar, ArrowLeft, Headphones } from "lucide-react";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await fetchNewsById(id);
  if (!news) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />
      <article className="mx-auto max-w-3xl px-5 py-10">
        <Link
          href="/"
          className="mb-8 flex items-center gap-1 text-sm text-neutral-500 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        <div className="mb-4 flex items-center gap-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(news.created_at)}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
          {news.title}
        </h1>

        {news.excerpt && (
          <p className="mb-8 text-lg font-light leading-relaxed text-neutral-400 border-l-2 border-red-600 pl-4">
            {news.excerpt}
          </p>
        )}

        {news.audio_url && (
          <div className="mb-8 flex flex-col gap-3 rounded-xl bg-neutral-900 p-5 ring-1 ring-inset ring-neutral-800">
            <div className="flex items-center gap-2 text-sm font-medium text-red-400">
              <Headphones className="h-4 w-4" />
              {news.audio_label ?? "Escuchar nota"}
            </div>
            <a
              href={news.audio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600/10 px-4 py-2.5 text-sm font-medium text-red-400 ring-1 ring-inset ring-red-600/20 hover:bg-red-600/20 transition-colors w-fit"
            >
              Escuchar en RadioCut →
            </a>
          </div>
        )}

        <MarkdownRenderer content={news.content} />
      </article>
      <Footer />
    </main>
  );
}
