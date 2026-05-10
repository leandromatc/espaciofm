import { createClient } from "@supabase/supabase-js";
import { News } from "@/types/supabase";

function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function fetchPublishedNews(): Promise<News[]> {
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return (data as News[]) ?? [];
}

export async function fetchPublishedNewsPaginated(
  page: number,
  pageSize: number,
): Promise<{ data: News[]; total: number }> {
  const supabase = getServerSupabase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("news")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return { data: [], total: 0 };
  return { data: (data as News[]) ?? [], total: count ?? 0 };
}

export async function fetchNewsById(id: string): Promise<News | null> {
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error) return null;
  return data as News;
}

export async function fetchAllNews(): Promise<News[]> {
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data as News[]) ?? [];
}
