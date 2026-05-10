import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const BUCKET = "news-images";
const WIDTH = 1280;
const HEIGHT = 720;

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Image arrives pre-cropped (16:9) from the client cropper.
  // Just scale to target dimensions and convert format.
  let processed: Buffer;
  let contentType: string;
  let ext: string;

  try {
    processed = await sharp(buffer)
      .resize(WIDTH, HEIGHT, { fit: "fill" })
      .avif({ quality: 75 })
      .toBuffer();
    contentType = "image/avif";
    ext = "avif";
  } catch {
    processed = await sharp(buffer)
      .resize(WIDTH, HEIGHT, { fit: "fill" })
      .webp({ quality: 82 })
      .toBuffer();
    contentType = "image/webp";
    ext = "webp";
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, processed, { contentType, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
