"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNews(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const image_url = (formData.get("image_url") as string) || null;
  const audio_url = (formData.get("audio_url") as string) || null;
  const audio_label = (formData.get("audio_label") as string) || null;
  const published = formData.get("published") === "true";

  const { error } = await supabase.from("news").insert({
    title,
    excerpt,
    content,
    image_url,
    audio_url,
    audio_label,
    published,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/noticias");
  redirect("/admin/noticias");
}

export async function updateNews(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const image_url = (formData.get("image_url") as string) || null;
  const audio_url = (formData.get("audio_url") as string) || null;
  const audio_label = (formData.get("audio_label") as string) || null;
  const published = formData.get("published") === "true";

  const { error } = await supabase
    .from("news")
    .update({
      title,
      excerpt,
      content,
      image_url,
      audio_url,
      audio_label,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/noticias");
  revalidatePath(`/noticias/${id}`);
  redirect("/admin/noticias");
}

export async function deleteNews(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/noticias");
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("news")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/noticias");
}
