---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home y sitio público: La planilla

Scope: portada y páginas públicas (/, /programacion, /noticias). Modo: Persuade. El admin (/admin) no se toca.

## Audiencia y acción
Hincha desde el celular, con un partido por empezar. Acción: darle play al vivo en un toque. Después: ver qué está al aire y qué sigue, ir a CV10, leer noticias. Comercios: contacto discreto.

## Contenido real y restricciones
Stream y su lógica, tablas programming / special_events / news y rutas existentes: intactos. Logo (public/logo.png, rojo #DC1717 sobre transparente) intacto. Teléfono, email y WhatsApp aún no existen: no se inventan; la UI solo muestra los datos cargados en lib/contact.ts.

## Direction contract

THESIS: La web es la mesa de control de un partido de barrio: planilla, tablero, entrada y cinta. Rechaza el arreglo por defecto de radio online (hero con foto, tarjetas iguales con ícono, franja de estadísticas).

OWN-WORLD: Rojo del logo, blanco tiza y negro de tablero apagado, y nada más. Fondo negro; líneas de cal en blanco al 18 % (marcas de cancha: círculo central, córner, área); cinta blanca con texto negro para la marquesina; entradas blancas perforadas y una entrada roja para CV10; franja roja plena para publicidad. Tipografía: Big Shoulders Display en mayúsculas para titulares y nombres de programa, Chivo Mono para horas y marcador, Archivo para texto. Sin sombras de bloque ni gradientes. Reconocible con todo el contenido quitado: negro, cal, cinta blanca y rojo.

STORY: El visitante entiende en un segundo que está en la radio y que está al aire, escucha con un toque, ve el programa actual y el siguiente en la planilla, sabe que el partido se ve en CV10 y baja a leer noticias si quiere.

FIRST VIEWPORT: Arriba la cinta blanca de marquesina con AHORA y SIGUE. Debajo el tablero: borde de cal con arcos de córner, estado AL AIRE con punto rojo pulsante, nombre del programa en display de hasta 6rem, minuto de programa (MIN 42 DE 60) con marcas, y un play circular gigante (blanco, ícono negro; rojo al sonar con ecualizador). En celular el play ocupa el centro del primer pantallazo; la barra fija inferior aparece al bajar.

FORM: Planilla de partido y tablero de cancha, con entradas y cinta; dirección fijada por el brief del usuario (no se tiró el dado). Seed key: f47a1e50 (roll no usado: brief pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisiones
Contacto: sin datos todavía. Noticias duplicadas: son filas duplicadas en la base; el usuario las borra; la portada deduplica por título e imagen.
