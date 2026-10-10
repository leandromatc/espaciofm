"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/admin/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/admin/ui/field";
import { Input } from "@/components/admin/ui/input";
import { toastManager } from "@/components/admin/ui/toast";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowserClient";

export default function CuentaPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirm) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      const m = error.message.toLowerCase();
      setErrorMsg(
        m.includes("same") || m.includes("different")
          ? "La contraseña nueva tiene que ser distinta de la actual."
          : m.includes("weak") || m.includes("short") || m.includes("least")
            ? "Esa contraseña es muy débil. Probá con una más larga."
            : "No pudimos cambiar la contraseña. Probá de nuevo en un momento.",
      );
      return;
    }
    setNewPassword("");
    setConfirm("");
    toastManager.add({ title: "Contraseña actualizada", type: "success" });
  };

  return (
    <>
      <PageHeader title="Cuenta" description="Tu acceso al panel." />

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Cambiar contraseña</CardTitle>
            <CardDescription>Usá una que no uses en otros lados.</CardDescription>
          </CardHeader>
          <CardPanel>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field>
                <FieldLabel>Nueva contraseña</FieldLabel>
                <Input
                  type="password"
                  name="new-password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <FieldDescription>Mínimo 6 caracteres.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Repetí la contraseña</FieldLabel>
                <Input
                  type="password"
                  name="confirm-password"
                  required
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </Field>

              {errorMsg && (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground"
                >
                  {errorMsg}
                </p>
              )}

              <Button type="submit" loading={loading} className="sm:w-fit">
                Cambiar contraseña
              </Button>
            </form>
          </CardPanel>
        </Card>

        <Card>
          <CardPanel>
            <form action={signOut}>
              <Button type="submit" variant="destructive-outline" className="w-full sm:w-fit">
                <LogOut aria-hidden />
                Cerrar sesión
              </Button>
            </form>
          </CardPanel>
        </Card>
      </div>
    </>
  );
}
