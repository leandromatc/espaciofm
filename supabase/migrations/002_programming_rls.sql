-- RLS policies para programming y special_events
-- Ejecutar en el SQL Editor de Supabase

-- ─── programming ──────────────────────────────────────────────

ALTER TABLE programming ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read programming" ON programming
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users full access programming" ON programming
  FOR ALL USING (auth.role() = 'authenticated');

-- ─── special_events ───────────────────────────────────────────

ALTER TABLE special_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read special_events" ON special_events
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users full access special_events" ON special_events
  FOR ALL USING (auth.role() = 'authenticated');
