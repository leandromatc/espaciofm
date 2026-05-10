import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FeaturedNewsCard, NewsCard } from "@/components/NewsCard";
import { fetchPublishedNewsPaginated } from "@/utils/fetchNews";
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

  // Build visible page numbers: always show first, last, current ±2, with ellipsis
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

  return (
    <nav className="flex items-center justify-center gap-1">
      <Link
        href={buildUrl(page - 1)}
        aria-disabled={page === 1}
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${
          page === 1
            ? "pointer-events-none text-neutral-700"
            : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-neutral-600">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildUrl(p)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors ${
              p === page
                ? "bg-red-600 text-white"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      <Link
        href={buildUrl(page + 1)}
        aria-disabled={page === totalPages}
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${
          page === totalPages
            ? "pointer-events-none text-neutral-700"
            : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
        }`}
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

  const { data: newsList, total } = await fetchPublishedNewsPaginated(
    page,
    PAGE_SIZE,
  );
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const isFirstPage = page === 1;
  const [featured, ...rest] = newsList;

  return (
    <>
      <Navbar />
      <main className="px-5 py-12">
        <div className="mx-auto max-w-screen-xl">
          {/* Header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold uppercase">Noticias</h1>
              <span className="mt-1 block h-[2px] w-[50px] bg-red-600" />
            </div>
            {total > 0 && (
              <p className="text-sm text-neutral-500">
                {total} {total === 1 ? "noticia" : "noticias"}
              </p>
            )}
          </div>

          {newsList.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-24 text-neutral-500">
              <Newspaper className="h-10 w-10" />
              <p className="text-sm">No hay noticias publicadas aún.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Featured — only on page 1 */}
              {isFirstPage && featured && (
                <FeaturedNewsCard news={featured} />
              )}

              {/* Grid */}
              {(isFirstPage ? rest : newsList).length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(isFirstPage ? rest : newsList).map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination page={page} totalPages={totalPages} />
              <p className="mt-3 text-center text-xs text-neutral-600">
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
