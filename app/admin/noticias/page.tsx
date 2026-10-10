import Link from "next/link";
import { Plus } from "lucide-react";
import { fetchAllNews } from "@/utils/fetchNews";
import { formatNewsDate } from "@/lib/adminFormat";
import { PageHeader } from "@/components/admin/PageHeader";
import { NoticiasList } from "@/components/admin/NoticiasList";
import { Button } from "@/components/admin/ui/button";

export default async function AdminNoticiasPage() {
  const news = await fetchAllNews();

  return (
    <>
      <PageHeader
        title="Noticias"
        description="Tocá una noticia para editarla."
        action={
          <Button render={<Link href="/admin/noticias/nueva" />}>
            <Plus aria-hidden />
            Nueva
          </Button>
        }
      />
      <NoticiasList
        news={news.map((n) => ({
          id: n.id,
          title: n.title,
          image_url: n.image_url,
          dateLabel: formatNewsDate(n.created_at),
          published: n.published,
          hasAudio: Boolean(n.audio_url),
        }))}
      />
    </>
  );
}
