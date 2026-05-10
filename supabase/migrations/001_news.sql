-- Tabla de noticias para EspacioFM
-- Ejecutar en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS news (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  excerpt     TEXT,
  content     TEXT NOT NULL,
  image_url   TEXT,
  audio_url   TEXT,
  audio_label TEXT DEFAULT 'Escuchar nota',
  published   BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Cualquier persona puede leer noticias publicadas
CREATE POLICY "Public read published news" ON news
  FOR SELECT USING (published = true);

-- Usuarios autenticados tienen acceso completo
CREATE POLICY "Authenticated users full access" ON news
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket para audios
-- Ejecutar también en el SQL Editor o crear el bucket manualmente en Storage

INSERT INTO storage.buckets (id, name, public)
VALUES ('news-audio', 'news-audio', true)
ON CONFLICT (id) DO NOTHING;

-- Política: cualquiera puede leer audios (bucket público)
CREATE POLICY "Public read audio files" ON storage.objects
  FOR SELECT USING (bucket_id = 'news-audio');

-- Política: usuarios autenticados pueden subir audios
CREATE POLICY "Auth users upload audio" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'news-audio' AND auth.role() = 'authenticated'
  );

-- Política: usuarios autenticados pueden eliminar sus audios
CREATE POLICY "Auth users delete audio" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'news-audio' AND auth.role() = 'authenticated'
  );
