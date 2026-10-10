---
version: 1
slug: "app-admin-layout-tsx"
primary_target: "app/admin/layout.tsx"
related_targets: []
---

# Panel de administración (/admin)

Scope: todo el admin (login, inicio, noticias, programación, formularios, cuenta). Modo: Operate. La portada pública y su mundo "La planilla" no se tocan.

## Audiencia y tarea
Una o dos personas del equipo de la radio, casi siempre desde el celular, con prisa y a menudo entre emisiones. Tres trabajos: publicar una noticia, cargar o corregir la grilla de programas, y cargar un evento especial (partido, lugar, si va por CV10). Éxito: cada trabajo en menos de un minuto con una mano, sin errores ni borrados accidentales.

## Contenido real y restricciones
Datos de Supabase (news, programming, special_events); acciones de servidor y rutas existentes sin cambio de URL. Componentes tomados de coss ui (Base UI) y portados a Tailwind v3 dentro de components/admin/ui. Logo intacto. Sin datos inventados.

## Direction contract

THESIS: El admin es una herramienta de bolsillo, no un escritorio encogido: una pantalla por trabajo, objetivos de 44 px, acción principal siempre a mano del pulgar. Rechaza el arreglo por defecto del admin genérico: barra lateral que en el celular se esconde en una hamburguesa, filas llenas de íconos diminutos y formularios largos sin barra de guardar.

OWN-WORLD: Negro neutro de trabajo (no el negro de tablero de la portada), tarjetas con borde fino, esquinas de 8 px, tipografía de interfaz Archivo con Chivo Mono solo para horas y fechas. El rojo del logo (#dc1717) se reserva para la acción principal y el estado activo; los estados usan los semánticos de coss (verde publicada, ámbar borrador, azul informativo, rojo de error). Sin sombras decorativas ni gradientes; profundidad por borde y contraste de valor. Reconocible sin contenido: tarjetas oscuras de borde fino, botón rojo, barra de pestañas inferior.

STORY: Al entrar, la persona ve qué está al aire y qué sigue, y tiene tres botones grandes para crear. Cualquier lista se abre con un toque para editar. Borrar siempre pide confirmación. Guardar confirma con un aviso y vuelve a la lista.

FIRST VIEWPORT: Celular: barra superior con logo y "Ver sitio"; tarjeta "Ahora" (al aire y siguiente); tres acciones de crear (la noticia en rojo); tres contadores táctiles; barra de pestañas inferior de 4 destinos (Inicio, Noticias, Programación, Cuenta) con zona segura. Escritorio: barra lateral fija con los mismos 4 destinos y contenido en columna de hasta 56rem.

FORM: Operate sobre componentes coss (Base UI) portados; dirección fijada por el usuario (neutro tipo coss + rojo del logo), sin tirada de dirección. Seed key: n/a (brief pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisiones
Formularios: barra inferior fija de Guardar/Cancelar en celular y la barra de pestañas se oculta en pantallas de formulario. Avisos de guardado por ?ok= en la redirección y toast. Eventos: sin columna extra; "solo CV10" se deduce por superposición horaria (lib/medio.ts).
