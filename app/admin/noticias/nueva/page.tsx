import { createNews } from "@/app/actions/news";
import { NewsForm } from "@/components/admin/NewsForm";

export default function NuevaNoticiaPage() {
  return <NewsForm title="Nueva noticia" action={createNews} />;
}
