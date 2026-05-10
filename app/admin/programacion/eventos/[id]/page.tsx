import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { updateSpecialEvent } from "@/app/actions/programs";
import { SpecialEventForm } from "@/components/admin/SpecialEventForm";

async function fetchEvent(id: number) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data, error } = await supabase
    .from("special_events")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export default async function EditarEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEvent(Number(id));
  if (!event) notFound();

  const updateWithId = updateSpecialEvent.bind(null, event.id);

  return (
    <SpecialEventForm
      title="Editar evento especial"
      action={updateWithId}
      initialData={event}
    />
  );
}
