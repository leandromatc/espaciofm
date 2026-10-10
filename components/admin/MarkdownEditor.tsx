"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function MarkdownEditor({ value, onChange }: Props) {
  // En celular no entran dos columnas: se escribe a pantalla completa y la vista
  // previa en vivo aparece desde `sm`.
  const [ancho, setAncho] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setAncho(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div
      data-color-mode="dark"
      className="overflow-hidden rounded-lg border border-input"
    >
      <MDEditor
        value={value}
        onChange={(val) => onChange(val ?? "")}
        height={360}
        preview={ancho ? "live" : "edit"}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
