import { createSpecialEvent } from "@/app/actions/programs";
import { SpecialEventForm } from "@/components/admin/SpecialEventForm";

export default function NuevoEventoPage() {
  return <SpecialEventForm title="Nuevo evento especial" action={createSpecialEvent} />;
}
