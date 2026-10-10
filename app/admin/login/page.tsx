"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { Button } from "@/components/admin/ui/button";
import { Card, CardPanel } from "@/components/admin/ui/card";
import { Field, FieldLabel } from "@/components/admin/ui/field";
import { Input } from "@/components/admin/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email o contraseña incorrectos. Revisalos y probá de nuevo.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <Image
            src="/logo.png"
            width={200}
            height={100}
            alt="Espacio Sport 91.5 FM"
            priority
            className="h-auto w-40"
          />
          <p className="text-sm text-muted-foreground">Panel de administración</p>
        </div>

        <Card>
          <CardPanel>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                />
              </Field>

              <Field>
                <FieldLabel>Contraseña</FieldLabel>
                <Input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground"
                >
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" loading={loading}>
                Ingresar
              </Button>
            </form>
          </CardPanel>
        </Card>
      </div>
    </div>
  );
}
