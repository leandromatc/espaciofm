-- Eventos especiales: lugar y transmisión por CV10
-- Ejecutar en el SQL Editor de Supabase ANTES de publicar la versión del sitio que usa estas columnas.
-- Es segura de correr más de una vez (IF NOT EXISTS) y no toca las filas existentes:
-- los eventos viejos quedan con lugar = NULL y en_cv10 = false.

ALTER TABLE special_events
  ADD COLUMN IF NOT EXISTS lugar text,
  ADD COLUMN IF NOT EXISTS en_cv10 boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN special_events.lugar IS 'Cancha o lugar del evento (opcional). Ej: Estadio Koster';
COMMENT ON COLUMN special_events.en_cv10 IS 'true si el evento se transmite en video por CV10';

-- Las políticas RLS de 002_programming_rls.sql ya cubren columnas nuevas:
-- lectura pública y escritura solo para usuarios autenticados.

-- Para deshacerlo:
-- ALTER TABLE special_events DROP COLUMN IF EXISTS lugar, DROP COLUMN IF EXISTS en_cv10;
