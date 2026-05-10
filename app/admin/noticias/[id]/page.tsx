import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { updateNews } from "@/app/actions/news";
import { NewsForm } from "@/components/admin/NewsForm";
import { News } from "@/types/supabase";

async function fetchNewsForAdmin(id: string): Promise<News | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as News;
}

export default async function EditarNoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await fetchNewsForAdmin(id);
  if (!news) notFound();

  const updateWithId = updateNews.bind(null, id);

  return (
    <NewsForm title="Editar noticia" action={updateWithId} initialData={news} />
  );
}
