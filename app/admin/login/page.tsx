"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import Image from "next/image";

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
      setError("Credenciales incorrectas. Verificá email y contraseña.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            width={200}
            height={100}
            alt="Logo Espacio Sport"
            className="max-w-[160px]"
          />
        </div>

        <div className="rounded-xl bg-neutral-900 p-8 ring-1 ring-inset ring-neutral-800">
          <h1 className="mb-6 text-center text-xl font-semibold">
            Panel de administración
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-400" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg bg-neutral-800 px-3 py-2.5 text-sm outline-none ring-1 ring-inset ring-neutral-700 focus:ring-red-600"
                placeholder="admin@espaciofm.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-400" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg bg-neutral-800 px-3 py-2.5 text-sm outline-none ring-1 ring-inset ring-neutral-700 focus:ring-red-600"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-600/10 px-3 py-2 text-sm text-red-400 ring-1 ring-inset ring-red-600/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
