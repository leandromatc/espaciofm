"use client";

import { Button } from "@/components/admin/ui/button";
import { useRef, useState } from "react";
import Image from "next/image";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Upload, X, Loader2, ImageIcon, Check } from "lucide-react";

const ASPECT = 16 / 9;

function initCrop(width: number, height: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, ASPECT, width, height),
    width,
    height,
  );
}

function cropToBlob(img: HTMLImageElement, crop: PixelCrop): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const scaleX = img.naturalWidth / img.width;
  const scaleY = img.naturalHeight / img.height;
  canvas.width = Math.round(crop.width * scaleX);
  canvas.height = Math.round(crop.height * scaleY);
  ctx.drawImage(
    img,
    Math.round(crop.x * scaleX),
    Math.round(crop.y * scaleY),
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return new Promise((res, rej) =>
    canvas.toBlob(
      (b) => (b ? res(b) : rej(new Error("Canvas vacío"))),
      "image/jpeg",
      0.95,
    ),
  );
}

export function ImageUpload({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [cropSrc, setCropSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const openFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten imágenes.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
      setCrop(undefined);
      setCompletedCrop(undefined);
    };
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(initCrop(width, height));
  };

  const handleApply = async () => {
    if (!imgRef.current || !completedCrop) return;
    setUploading(true);
    setError("");
    try {
      const blob = await cropToBlob(imgRef.current, completedCrop);
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload-image", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error("upload");
      setUrl(json.url);
      setCropSrc("");
    } catch {
      setError("No se pudo subir la imagen. Probá de nuevo o con otra foto.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setCropSrc("");
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  return (
    <>
      <input type="hidden" name={name} value={url} />

      {/* Vista previa */}
      {url && !cropSrc && (
        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={url}
              alt="Vista previa"
              width={1280}
              height={720}
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload aria-hidden />
              Cambiar imagen
            </Button>
            <Button variant="ghost" onClick={() => setUrl("")}>
              <X aria-hidden />
              Quitar
            </Button>
            <p className="ml-auto text-xs text-muted-foreground">
              1280×720 · WebP/AVIF
            </p>
          </div>
        </div>
      )}

      {/* Upload zone */}
      {!url && !cropSrc && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) openFile(file);
          }}
          className={`flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
            dragOver
              ? "border-primary bg-primary/5 text-foreground"
              : "border-input text-muted-foreground hover:border-ring hover:text-foreground"
          }`}
        >
          {dragOver ? (
            <ImageIcon className="h-6 w-6" />
          ) : (
            <Upload className="h-6 w-6" />
          )}
          <div className="text-center">
            <p className="text-sm">
              {dragOver ? "Soltar aquí" : "Subir imagen"}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Elegís el área a recortar · convierte a WebP/AVIF
            </p>
          </div>
        </button>
      )}

      {error && <p className="text-xs text-destructive-foreground">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) openFile(file);
          e.target.value = "";
        }}
      />

      {/* Crop modal */}
      {cropSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="flex w-full max-w-3xl flex-col gap-4 rounded-xl bg-card p-5 shadow-2xl border border-border">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Recortar imagen</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Arrastrá el recuadro para elegir qué parte mostrar (proporción
                  16:9)
                </p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="overflow-auto rounded-lg bg-background"
              style={{ maxHeight: "60vh" }}
            >
              <ReactCrop
                crop={crop}
                onChange={(_, pct) => setCrop(pct)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ASPECT}
                minWidth={80}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={cropSrc}
                  alt="Recorte"
                  onLoad={onImageLoad}
                  style={{
                    maxHeight: "60vh",
                    maxWidth: "100%",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </ReactCrop>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                El resultado será 1280×720 px
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg bg-secondary px-5 py-2.5 text-sm text-foreground hover:bg-secondary/80"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={uploading || !completedCrop}
                  className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Procesando…
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Aplicar recorte
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
