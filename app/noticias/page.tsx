import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FeaturedNewsCard, NewsCard } from "@/components/NewsCard";
import {
  dedupeNews,
  fetchPublishedNewsPaginated,
} from "@/utils/fetchNews";
import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const PAGE_SIZE = 12;

function buildUrl(page: number) {
  return page === 1 ? "/noticias" : `/noticias?page=${page}`;
}

function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  // Páginas visibles: primera, última, la actual ±2, con puntos suspensivos
  const pages: (number | "...")[] = [];
  const delta = 2;
  const range: number[] = [];

  for (
    let i = Math.max(2, page - delta);
    i <= Math.min(totalPages - 1, page + delta);
    i++
  ) {
    range.push(i);
  }

  if (range[0] > 2) pages.push(1, "...");
  else pages.push(1);

  pages.push(...range);

  if (range[range.length - 1] < totalPages - 1) pages.push("...", totalPages);
  else if (totalPages > 1) pages.push(totalPages);

  const edge = (disabled: boolean) =>
    `press grid h-11 w-11 place-items-center text-sm ${
      disabled
        ? "pointer-events-none text-chalk/25"
        : "text-chalk-dim hover:bg-chalk hover:text-ink"
    }`;

  return (
    <nav aria-label="Páginas de noticias" className="flex items-center justify-center gap-1">
      <Link
        href={buildUrl(page - 1)}
        aria-label="Página anterior"
        aria-disabled={page === 1}
        className={edge(page === 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-chalk/40">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildUrl(p)}
            aria-current={p === page ? "page" : undefined}
            className={`press grid h-11 min-w-11 place-items-center px-2 font-sans font-semibold text-sm font-bold ${
              p === page
                ? "bg-brand text-white"
                : "text-chalk-dim hover:bg-chalk hover:text-ink"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      <Link
        href={buildUrl(page + 1)}
        aria-label="Página siguiente"
        aria-disabled={page === totalPages}
        className={edge(page === totalPages)}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { data: rawNews, total } = await fetchPublishedNewsPaginated(
    page,
    PAGE_SIZE,
  );
  // Si el panel guardó una nota dos veces, acá se muestra una sola
  const newsList = dedupeNews(rawNews);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const isFirstPage = page === 1;
  const [featured, ...rest] = newsList;

  return (
    <>
      <Navbar />
      <main className="px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-chalk/30 pb-4">
            <h1
              className="font-display font-black uppercase leading-[0.88]"
              style={{ fontSize: "clamp(3.25rem, 11.5vw, 6rem)" }}
            >
              Noticias
            </h1>
            {total > 0 && (
              <p className="shrink-0 font-mono text-sm uppercase tracking-wider text-chalk-dim">
                {total} {total === 1 ? "nota" : "notas"}
              </p>
            )}
          </div>

          {newsList.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-24 text-chalk-dim">
              <Newspaper className="h-10 w-10" />
              <p className="text-sm">No hay noticias publicadas todavía.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {isFirstPage && featured && (
                <FeaturedNewsCard news={featured} />
              )}

              {(isFirstPage ? rest : newsList).length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {(isFirstPage ? rest : newsList).map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination page={page} totalPages={totalPages} />
              <p className="mt-3 text-center font-mono text-xs uppercase tracking-wider text-chalk-dim">
                Página {page} de {totalPages}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
