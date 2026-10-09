# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hinchas de Mercedes y de Soriano, casi siempre desde el celular. Un caso típico: alguien que entra con un partido por empezar y quiere escuchar ya, sin buscar nada. También entran para saber qué se transmite ahora y qué viene después.

Audiencia secundaria: comercios locales que evalúan pautar publicidad. La web no está pensada para ellos; tienen que poder encontrar cómo contactar a la radio, sin que eso compita con la escucha.

## Product Purpose

Sitio de 91.5 Espacio Sport FM, radio deportiva local de Mercedes, Soriano (Uruguay), al aire desde 1999. Existe para que escuchar en vivo sea lo primero y lo más fácil, y para que se vea qué está al aire ahora y qué sigue. Las noticias son contenido secundario.

Éxito: alguien que llega con un partido por empezar está escuchando en pocos segundos, sin buscar el reproductor.

## Positioning

Es la radio que transmite el básquet y el fútbol local de Mercedes y Soriano en vivo, por radio y con video vía CV10 (cv10.plag.tv). Ese deporte local en vivo es el diferencial; los 25+ años de trayectoria lo respaldan pero no son el centro.

## Operating Context

- La programación y las noticias se cargan desde un panel de administración propio (`/admin`) respaldado por Supabase; la programación semanal y los eventos especiales son datos editables, no texto fijo.
- Los partidos se transmiten en vivo en horarios variables; la grilla fija convive con eventos especiales.
- Estudio en 18 de Julio y Aldunate, Mercedes, Soriano.

## Capabilities and Constraints

- Stack existente: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Supabase, componentes tipo shadcn/ui.
- Stream de audio en vivo: `https://medios.ciudaddigital.com.uy:18098/EspacioFM`, con reproductor persistente en la parte inferior del layout (`AudioPlayerBar`).
- Video en vivo por CV10 (enlace externo a cv10.plag.tv).
- Rutas públicas: inicio, `/programacion`, `/noticias`, `/noticias/[id]`. Admin protegido por middleware.
- Las noticias pueden llevar imagen y un clip de audio.
- Pendiente de definir: teléfono y email de contacto (hoy son marcadores vacíos en el footer); canales sociales.

## Brand Commitments

- Nombre: 91.5 Espacio Sport FM (también "Espacio Sport 91.5 FM").
- Voz: cercana, de cancha y de pueblo, en español rioplatense con voseo. Nada corporativo ni de plantilla.
- Logo oficial existente en `public/logo.png`.

## Evidence on Hand

- Logo oficial (`public/logo.png`, más favicons e íconos de app).
- No hay fotos propias, auspiciantes confirmados ni datos de audiencia disponibles. No inventar testimonios, cifras de oyentes ni auspiciantes.
- La franja de estadísticas actual (1999 / 91.5 / 24/7 / Soriano) es decoración de plantilla, no evidencia; el año de fundación (1999) sí es un dato real.

## Product Principles

1. Escuchar primero: el camino a darle play es el más corto de la web, en cualquier pantalla y desde cualquier página.
2. Ahora y después: qué está al aire y qué viene tiene más peso que cualquier otro contenido.
3. Deporte local antes que contenido genérico: básquet y fútbol de Mercedes y Soriano son el centro.
4. Hablar como en la cancha: voseo, lenguaje del pueblo, sin tono corporativo.
5. Pensado para el celular, en un momento apurado: se usa con una mano y con poco tiempo antes del pitazo.

## Accessibility & Inclusion

No hay un estándar formal definido. Uso mayoritario en celular y con conexión móvil variable; el audio debe poder controlarse sin depender de gestos finos.
