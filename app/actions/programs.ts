"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─── Programación semanal ──────────────────────────────────────

export async function createProgram(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const days = formData.getAll("days") as string[];

  const { error } = await supabase.from("programming").insert({
    name: formData.get("name") as string,
    days,
    start_time: formData.get("start_time") as string,
    end_time: formData.get("end_time") as string,
    description: (formData.get("description") as string) || "",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/programacion");
  revalidatePath("/admin/programacion");
  redirect("/admin/programacion");
}

export async function updateProgram(id: number, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const days = formData.getAll("days") as string[];

  const { error } = await supabase
    .from("programming")
    .update({
      name: formData.get("name") as string,
      days,
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      description: (formData.get("description") as string) || "",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/programacion");
  revalidatePath("/admin/programacion");
  redirect("/admin/programacion");
}

export async function deleteProgram(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("programming").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/programacion");
  revalidatePath("/admin/programacion");
}

// ─── Eventos especiales ────────────────────────────────────────

export async function createSpecialEvent(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("special_events").insert({
    name: formData.get("name") as string,
    date: formData.get("date") as string,
    start_time: formData.get("start_time") as string,
    end_time: formData.get("end_time") as string,
    description: (formData.get("description") as string) || "",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/programacion");
  revalidatePath("/admin/programacion");
  redirect("/admin/programacion");
}

export async function updateSpecialEvent(id: number, formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("special_events")
    .update({
      name: formData.get("name") as string,
      date: formData.get("date") as string,
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      description: (formData.get("description") as string) || "",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/programacion");
  revalidatePath("/admin/programacion");
  redirect("/admin/programacion");
}

export async function deleteSpecialEvent(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("special_events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/programacion");
  revalidatePath("/admin/programacion");
}
