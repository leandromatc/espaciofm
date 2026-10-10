---
version: 1
slug: "app-mas-que-deportes-page-tsx"
primary_target: "app/mas-que-deportes/page.tsx"
related_targets: []
---

# Más que deportes: audios (banda en la portada y /mas-que-deportes)

Scope: banda "Más que deportes, en audio" en la portada y la subpágina /mas-que-deportes. Modo: Persuade, dentro del mundo "La planilla" (no hay mundo visual nuevo).

## Audiencia y acción
Hincha que se perdió el programa en vivo (17 a 19 h) o quiere repasarlo, casi siempre desde el celular. Acción: darle play a un episodio con un toque, sin salir del sitio. Es contenido a pedido, secundario a la radio en vivo.

## Contenido real y restricciones
Audios: feed público de la cuenta espaciofm de Mixcloud (hoy con 0 episodios; la cuenta se creó el 10/10/2026). Horarios y conducción: tabla programming (programas "Más Que Deportes"). Sin tabla nueva, sin subida de archivos desde el panel. No tocar el reproductor de la radio ni su estado. Sin filtros por deporte.

## Direction contract

THESIS: Los programas ya emitidos son una planilla más, para escuchar cuando uno quiere: filas de episodio con fecha, título y un botón para escuchar, no tarjetas ni un reproductor gigante. Rechaza el arreglo por defecto del podcast (grilla de portadas cuadradas con botón de play redondo).

OWN-WORLD: La de la portada: negro de tablero, cal blanca, rojo del logo solo como bloque con texto blanco. Títulos en Big Shoulders en mayúsculas, fecha y duración en Chivo Mono, botones y links en Archivo semibold. Filas separadas por reglas de tiza al 15 %, sin tarjetas, sin sombras. El botón de escuchar es un bloque rojo rectangular (nunca un disco redondo, que es del play de la radio). El reproductor de Mixcloud se incrusta en modo mini, dentro de la fila.

STORY: El visitante entiende que acá están los programas grabados, toca Escuchar en el más nuevo y suena ahí mismo; si quiere más, entra a la subpágina y los ve todos con cuándo sale al aire y quién conduce.

FIRST VIEWPORT: Banda de la portada: título "Más que deportes" con "Ver todos" a la derecha y debajo cuatro filas (la primera es el último programa, con el botón rojo "Escuchar" a la derecha). Subpágina: h1 "Más que deportes" en display, dos líneas con cuándo sale (días y horas de la grilla) y quién conduce, y a continuación la lista de episodios de a 12 con "Ver más".

FORM: Lista de episodios con reproductor en línea, dentro de La planilla; dirección fijada por el brief del usuario (sin tirada). Seed key: n/a (brief pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisiones
Estados: 0 episodios oculta la banda y la subpágina muestra la info más "Los audios se publican en Mixcloud. Cuando haya, aparecen acá"; si Mixcloud falla, la banda se oculta y la subpágina dice "No pudimos cargar los audios ahora". Navegación: link en la banda y en el pie; la barra superior no cambia. Un episodio abierto a la vez; empezar uno pausa la radio.
