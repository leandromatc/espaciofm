import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { updateProgram } from "@/app/actions/programs";
import { ProgramForm } from "@/components/admin/ProgramForm";

async function fetchProgram(id: number) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data, error } = await supabase
    .from("programming")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export default async function EditarProgramaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await fetchProgram(Number(id));
  if (!program) notFound();

  const updateWithId = updateProgram.bind(null, program.id);

  return (
    <ProgramForm
      title="Editar programa"
      action={updateWithId}
      initialData={program}
    />
  );
}
