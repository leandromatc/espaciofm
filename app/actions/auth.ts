"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
