-- Limpieza automática de eventos especiales viejos
-- Ejecutar una vez en el SQL Editor de Supabase. Corre solo, dentro de la base de datos:
-- no hace falta tocar el sitio ni desplegar nada.
--
-- Cada noche borra los eventos de special_events cuya fecha ya pasó hace más de 7 días
-- (la fecha se mide en hora de Montevideo). El sitio solo muestra eventos de hoy en
-- adelante, así que borrar los viejos no cambia nada de lo que ve el público.

-- 1) Activar pg_cron (si ya está activo no hace nada).
--    También se puede activar desde el panel: Database > Extensions > pg_cron.
create extension if not exists pg_cron with schema pg_catalog;

-- 2) Programar la tarea. 03:00 UTC = medianoche en Uruguay.
--    Si ya existía una tarea con este nombre, esta línea la reemplaza.
select cron.schedule(
  'limpiar-eventos-especiales',
  '0 3 * * *',
  $$
    delete from public.special_events
    where date < ((now() at time zone 'America/Montevideo')::date - 7)
  $$
);

-- Para cambiar cuántos días se guardan: cambiá el 7 y volvé a ejecutar el bloque 2.
-- Para ver que quedó programada:   select jobname, schedule, active from cron.job;
-- Para ver si corrió bien:         select status, start_time, return_message
--                                  from cron.job_run_details order by start_time desc limit 5;
-- Para desactivarla:               select cron.unschedule('limpiar-eventos-especiales');

-- Opcional: limpiar los viejos AHORA, sin esperar a la noche (borra datos; revisá antes):
-- select id, name, date from public.special_events
--   where date < ((now() at time zone 'America/Montevideo')::date - 7) order by date;
-- delete from public.special_events
--   where date < ((now() at time zone 'America/Montevideo')::date - 7);
