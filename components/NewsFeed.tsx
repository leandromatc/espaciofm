import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dedupeNews, fetchPublishedNews } from "@/utils/fetchNews";
import { NewsRow } from "@/components/NewsCard";

const HOME_COUNT = 5;

/** Noticias de la portada: lista chica y pareja, sin protagonismo. */
export async function NewsFeed() {
  // Se piden de más porque dedupeNews puede sacar repetidas
  const newsList = dedupeNews(await fetchPublishedNews(12)).slice(0, HOME_COUNT);

  return (
    <section id="noticias" className="px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-chalk/30 pb-3">
          <h2 className="font-display text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
            Noticias
          </h2>
          <Link
            href="/noticias"
            className="tiza-link press inline-flex min-h-11 shrink-0 items-center gap-2 font-sans font-semibold text-sm uppercase tracking-wider"
          >
            Todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {newsList.length === 0 ? (
          <p className="py-10 text-chalk-dim">No hay noticias publicadas todavía.</p>
        ) : (
          <ul className="divide-y divide-chalk/15">
            {newsList.map((news) => (
              <NewsRow key={news.id} news={news} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
