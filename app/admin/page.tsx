import { fetchAllNews } from "@/utils/fetchNews";
import { fetchPrograms } from "@/utils/fetchPrograms";
import { Newspaper, Radio, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [news, programs] = await Promise.all([fetchAllNews(), fetchPrograms()]);
  const publishedCount = news.filter((n) => n.published).length;
  const draftCount = news.length - publishedCount;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<Newspaper className="h-5 w-5" />}
          label="Noticias"
          value={news.length}
          href="/admin/noticias"
        />
        <StatCard
          icon={<Eye className="h-5 w-5 text-green-400" />}
          label="Publicadas"
          value={publishedCount}
          href="/admin/noticias"
        />
        <StatCard
          icon={<EyeOff className="h-5 w-5 text-yellow-400" />}
          label="Borradores"
          value={draftCount}
          href="/admin/noticias"
        />
        <StatCard
          icon={<Radio className="h-5 w-5 text-red-400" />}
          label="Programas"
          value={programs.length}
          href="/admin/programacion"
        />
      </div>

      {/* Recent news */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Noticias recientes</h2>
          <Link
            href="/admin/noticias/nueva"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Nueva noticia
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {news.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              href={`/admin/noticias/${item.id}`}
              className="flex items-center justify-between rounded-lg bg-neutral-900 px-4 py-3 text-sm ring-1 ring-inset ring-neutral-800 hover:ring-neutral-700"
            >
              <span className="truncate">{item.title}</span>
              <span
                className={`ml-4 shrink-0 rounded-full px-2 py-0.5 text-xs ${
                  item.published
                    ? "bg-green-600/10 text-green-400 ring-1 ring-green-600/20"
                    : "bg-yellow-600/10 text-yellow-400 ring-1 ring-yellow-600/20"
                }`}
              >
                {item.published ? "Publicada" : "Borrador"}
              </span>
            </Link>
          ))}
          {news.length === 0 && (
            <p className="py-8 text-center text-sm text-neutral-500">
              No hay noticias todavía.{" "}
              <Link href="/admin/noticias/nueva" className="text-red-400 underline">
                Crear la primera
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-xl bg-neutral-900 p-5 ring-1 ring-inset ring-neutral-800 hover:ring-neutral-700"
    >
      <div className="text-neutral-400">{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-neutral-400">{label}</p>
      </div>
    </Link>
  );
}
