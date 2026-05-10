import { fetchPublishedNews } from "@/utils/fetchNews";
import { NewsCard } from "@/components/NewsCard";
import { Newspaper } from "lucide-react";

export async function NewsFeed() {
  const newsList = await fetchPublishedNews();

  if (newsList.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-neutral-500">
        <Newspaper className="h-10 w-10" />
        <p className="text-sm">No hay noticias publicadas aún.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {newsList.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
}
