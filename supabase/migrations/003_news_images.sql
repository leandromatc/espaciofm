-- Bucket público para imágenes de noticias
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Cualquiera puede ver las imágenes (bucket público)
CREATE POLICY "Public read news images" ON storage.objects
  FOR SELECT USING (bucket_id = 'news-images');

-- Usuarios autenticados pueden subir
CREATE POLICY "Auth users upload news images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'news-images' AND auth.role() = 'authenticated'
  );

-- Usuarios autenticados pueden reemplazar
CREATE POLICY "Auth users update news images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'news-images' AND auth.role() = 'authenticated'
  );

-- Usuarios autenticados pueden eliminar
CREATE POLICY "Auth users delete news images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'news-images' AND auth.role() = 'authenticated'
  );
