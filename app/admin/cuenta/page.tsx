"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

export default function CuentaPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    if (newPassword.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      setStatus("error");
      return;
    }

    if (newPassword !== confirm) {
      setErrorMsg("Las contraseñas no coinciden.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("success");
      setNewPassword("");
      setConfirm("");
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Mi cuenta</h1>
      <p className="mb-8 text-sm text-neutral-500">Cambiá tu contraseña de acceso al panel.</p>

      <form
        onSubmit={handleSubmit}
        className="flex max-w-sm flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="new-password">
            Nueva contraseña
          </label>
          <input
            id="new-password"
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="confirm-password">
            Confirmar contraseña
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputClass}
            placeholder="Repetí la contraseña"
          />
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 rounded-lg bg-green-600/10 px-4 py-3 text-sm text-green-400 ring-1 ring-inset ring-green-600/20">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Contraseña actualizada correctamente.
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-lg bg-red-600/10 px-4 py-3 text-sm text-red-400 ring-1 ring-inset ring-red-600/20">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
        >
          <KeyRound className="h-4 w-4" />
          {status === "loading" ? "Guardando..." : "Cambiar contraseña"}
        </button>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg bg-neutral-800 px-3 py-2.5 text-sm outline-none ring-1 ring-inset ring-neutral-700 focus:ring-red-600 placeholder:text-neutral-600";
