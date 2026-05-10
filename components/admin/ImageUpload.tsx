"use client";

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
      if (!res.ok) throw new Error(json.error ?? "Error desconocido");
      setUrl(json.url);
      setCropSrc("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir imagen");
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

      {/* Preview */}
      {url && !cropSrc && (
        <div className="flex flex-col gap-1.5">
          <div className="group relative overflow-hidden rounded-lg">
            <Image
              src={url}
              alt="Vista previa"
              width={1280}
              height={720}
              className="h-52 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-start justify-end gap-2 bg-neutral-950/0 p-2 transition-colors group-hover:bg-neutral-950/50">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-neutral-900/90 px-3 py-1.5 text-xs text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
              >
                Cambiar
              </button>
              <button
                type="button"
                onClick={() => setUrl("")}
                className="rounded-full bg-neutral-900/90 p-1.5 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-right text-[10px] text-neutral-600">
            1280×720 · WebP/AVIF
          </p>
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
          className={`flex h-44 w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed transition-colors ${
            dragOver
              ? "border-red-600 bg-red-600/5 text-white"
              : "border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300"
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
            <p className="mt-0.5 text-xs text-neutral-600">
              Elegís el área a recortar · convierte a WebP/AVIF
            </p>
          </div>
        </button>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4">
          <div className="flex w-full max-w-3xl flex-col gap-4 rounded-xl bg-neutral-900 p-5 shadow-2xl ring-1 ring-neutral-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Recortar imagen</h3>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Arrastrá el recuadro para elegir qué parte mostrar (proporción
                  16:9)
                </p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="overflow-auto rounded-lg bg-neutral-950"
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
              <p className="text-xs text-neutral-600">
                El resultado será 1280×720 px
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg bg-neutral-800 px-5 py-2.5 text-sm text-neutral-300 hover:bg-neutral-700"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={uploading || !completedCrop}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
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
