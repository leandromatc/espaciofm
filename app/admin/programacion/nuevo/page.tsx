import { createProgram } from "@/app/actions/programs";
import { ProgramForm } from "@/components/admin/ProgramForm";

export default function NuevoProgramaPage() {
  return <ProgramForm title="Nuevo programa" action={createProgram} />;
}
