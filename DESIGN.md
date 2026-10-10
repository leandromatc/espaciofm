---
name: 91.5 Espacio Sport FM - La planilla
description: La mesa de control de un partido de barrio, en negro de tablero, cal blanca y el rojo del logo.
colors:
  ink: "#0a0a0a"
  ink-raised: "#1d1d1d"
  chalk: "#f5f5f2"
  chalk-dim: "#b4b4ae"
  brand: "#dc1717"
  brand-hot: "#ff5252"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 11.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "3rem"
    fontWeight: 900
    lineHeight: 0.9
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 0.98
  body:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.05em"
  mono-label:
    fontFamily: "Chivo Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  focus: "2px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "48px"
  xl: "64px"
components:
  play-disc:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "256px"
  play-disc-playing:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
  status-badge-live:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
    typography: "{typography.mono-label}"
    padding: "6px 12px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    padding: "0 24px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
  marquee-tape:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
  marquee-pause:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
    size: "44px"
  today-banner:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    padding: "8px 16px"
    height: "44px"
  today-countdown:
    backgroundColor: "{colors.white}"
    textColor: "{colors.brand}"
    typography: "{typography.label}"
    padding: "2px 8px"
  hero-cv10-button:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    padding: "0 24px"
    height: "48px"
  hero-cv10-button-hover:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
  schedule-row-live:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
  ticket-white:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
  ticket-red:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
  ad-strip:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
  player-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    height: "72px"
---

# Design System: 91.5 Espacio Sport FM - La planilla

## Overview

**Creative North Star: "La planilla"**

The site is the control desk of a neighbourhood match: the team sheet, the scoreboard, the ticket stub and the ticker tape. Everything is drawn from that world's own materials: a switched-off black board, chalk lines, white paper, and the red of the logo. Nothing else enters the palette. Stripped of content it is still recognizable: black field, chalk rules, a white tape, a red block.

Density is confident and typographic. Giant condensed uppercase names carry the hierarchy; times and scores are set in mono like a scoreboard. Surfaces are flat. Depth comes from contrast between ink, chalk and red, never from shadow. Motion is small and physical (a press sinks, a chalk underline is drawn, a ticker runs) and is switched off under reduced motion.

The palette (red, white, black) is a user decision and the red is the unchanged logo red. The admin panel (/admin) is a separate Operate system with its own neutral look; see the Admin panel section at the end.

**Key Characteristics:**
- Black ground, chalk-white text, red used as a block or a status, not as decoration.
- Condensed uppercase display type for every headline and program name.
- Mono only for times, dates, the program-minute counter and status labels.
- Chalk-line geometry: 1px rules, corner arcs, a centre-circle on the footer rule.
- Tickets with punched notches and perforated stubs for events.
- State is said once, next to the control it belongs to: one status line under the play disc, one banner for what is coming today.
- No hard shadows, no gradients as decoration, no icon-card grids, no kicker above headings.

## Colors

A three-colour board: black, chalk, red, plus one lighter red for small text.

### Primary
- **Logo Red** (`{colors.brand}`): the red of the unchanged logo. Used as full blocks (live badge, playing play-disc, CV10 ticket, advertising strip, filled minute segments) with white text on top. Never as small text on ink: it fails contrast there (about 3:1).
- **Hot Red** (`{colors.brand-hot}`): the only red for small text and glyphs on ink (status text, "Sigue", equalizer, live dot in the bar). Contrast on ink is above 4.5:1.

### Neutral
- **Scoreboard Black** (`{colors.ink}`): page, nav, player bar, and text on chalk surfaces.
- **Raised Black** (`{colors.ink-raised}`): placeholder behind images only.
- **Chalk** (`{colors.chalk}`): text on ink, the marquee tape, the live schedule row, white tickets, the play button at rest. Chalk lines are chalk at 20% to 30% alpha.
- **Dim Chalk** (`{colors.chalk-dim}`): secondary copy and metadata on ink.
- **White** (`{colors.white}`): text on red only.

### Named Rules
**The Three-Colour Rule.** Red, chalk, ink. No fourth hue, no tints beyond chalk alpha and dim chalk.
**The Red Is A Block Rule.** Logo red fills areas that carry white text; on ink, red text uses Hot Red.
**The Chalk Alpha Rule.** Rules and borders are chalk at 15% to 40% alpha (cal at 20%, section rules 30%, row dividers 15%), never grey.

## Typography

**Display Font:** Big Shoulders Display (Arial Narrow fallback), weights 700 to 900
**Body Font:** Archivo (Arial, Helvetica fallback)
**Label/Mono Font:** Chivo Mono (ui-monospace fallback)

**Character:** A stadium-signage condensed face over a neutral grotesque, with a scoreboard mono for numbers. Tabular numerals are on for the whole body.

### Hierarchy
- **Display** (900, clamp(3.25rem, 11.5vw, 6rem), 0.88): page h1 (the current program on home, "Programación", "Noticias"), the advertising strip heading, the CV10 ticket. Uppercase.
- **Headline** (900, 3rem to 3.75rem, 0.9): section h2 with a 30% chalk bottom rule. Uppercase.
- **Title** (800, 1.5rem to 2.25rem, about 0.95 to 1.02): program names in the schedule, news titles, ticket titles, bar program name (1.25rem). Uppercase.
- **Body** (400, 1rem, normal): Archivo for descriptions and article text; secondary at 0.875rem in Dim Chalk; long-form capped near 65ch.
- **Label** (600, 0.875rem, 0.05em, uppercase): navigation, links and buttons, always Archivo semibold.
- **Mono label** (Chivo Mono, 0.75rem to 0.875rem, 0.05em, uppercase; times at 1.125rem to 1.5rem bold): times, dates, "Min 42 de 60", and status words (Al aire, Sigue, Especial).

### Named Rules
**The Mono Is A Scoreboard Rule.** Mono is reserved for times, dates, the minute counter and status labels. Navigation, links and buttons never use it.
**The Condensed Caps Rule.** Display type is always uppercase, tight leading (0.85 to 1.02), balanced wrapping.

## Layout

Single column of full-width bands inside a max-width of 1280px (`max-w-screen-xl`) with 20px side padding (16px on the home tablero). Vertical rhythm between bands is 48px on mobile and 64px on larger screens; the red advertising strip gets 56px to 80px. Bands are separated by chalk rules or by a colour change, not by cards.

Home order: today banner (only when an event is coming later today), marquee tape, sticky nav, tablero (what is on air, play, stream status, minute counter, what follows), planilla (today's schedule as ruled rows), tickets (CV10 and events, 7/5 column split on desktop), the video band, news rows, red advertising strip, footer. Mobile first: the play disc sits between title and "what follows"; on large screens it moves to a right column. Rows use a fixed time column (4.75rem, 7rem from the small breakpoint), a flexible name column and a right-aligned status column.

The body reserves 72px (plus the device safe area) at the bottom for the fixed player bar. Touch targets are at least 44px (logo, nav and footer links, bar buttons, the marquee pause and the stream-status button 44px; contact and CV10 buttons 48px). Inline text links inside a sentence are the only exception.

## Elevation & Depth

Flat. There are no shadows anywhere in the public site. Depth is conveyed by value contrast (white tape and white tickets on black, a red block on black), by 1px chalk borders, by the notched ticket silhouette, and by a small tilt on tickets (-1deg, 1deg, -0.5deg); only the red CV10 ticket straightens on hover. The player bar is separated by a 1px chalk border-top and a slide transition, not by a shadow.

### Named Rules
**The No Shadow Rule.** No box-shadow, no glow, no gradient as decoration. Gradient syntax appears only as drawing technique (the chalk underline, the ticket perforation, the notch masks).

## Shapes

Square by default: bands, rows, buttons, tickets, news cards and images have 0 radius. Circles are reserved for objects that are round in the world: the play disc and its chalk ring, the live dot, the marquee separators, the icon buttons in the bar, and the circle at the centre of the footer rule. Stadium geometry is drawn in 1px chalk: the tablero frame has quarter-circle corner arcs (28px) like a pitch corner. Tickets (CV10 red and white event tickets) have semicircular 9px notches cut by mask at the stub line and a dotted vertical perforation at 35% opacity. Focus is a 2px chalk outline offset 3px.

## Components

### Play disc
The signature control. Circle, chalk with ink icon at rest, logo red with white icon while playing; play and pause cross-fade and scale over 160ms. 256px on large home tablero, 208px on small, 160px on mobile, wrapped in a 1px chalk/30 ring; 56px (48px on sm) in the player bar. Presses to 0.97 scale. A second tap within 350ms is ignored so a double tap never switches the radio off.

### Live badge, live dot, equalizer
"Al aire" badge: logo red fill, white mono bold uppercase, with a pulsing dot (ring expands to 2.8x and fades over 1.8s); it reads "Al aire · En vivo" when a special event is on air. Inline "Al aire" in a live row uses red on chalk. The equalizer is five 3px bars at Hot Red that move only once audio is actually playing (the playing event), never while connecting. Dot and equalizer sizes are set with the --dot and --eq-h custom properties, not with font sizes.

### Minute counter
"Min 42 de 60" in mono Dim Chalk over 12 flat segments (12px high, 4px gap), filled in logo red, empty at chalk/20.

### Marquee tape
Chalk band with ink Big Shoulders text at 1.125rem, items separated by 8px red dots, running at constant speed (45s), paused until the schedule has loaded so it never jumps, and paused while a fine pointer is over the text. Carries what is on air, what follows, the upcoming broadcast, CV10 and the station line. A 44px chalk pause button with a 1px ink/20 divider is fixed at its right end so touch users can stop it (WCAG 2.2.2); it is hidden under reduced motion, where the tape is a static scrollable strip.

### Today banner
A full-width logo-red band above the marquee, shown only when a special event is later today. Archivo bold uppercase 0.875rem in white: "Hoy: [event] · [time] · [venue]". In the last hour a white pill with red text adds "Empieza en N min" (minute resolution, "Ya empieza" under a minute). The whole band is a link to the schedule (planilla), which lists every event of the day. It opens once with a 300ms height transition when the data arrives, and takes no space when there is no event.

### Stream status line
One centred Archivo semibold uppercase line under the play disc, announced politely: "Tocá para escuchar" (Dim Chalk) before the first play, "Conectando…" while connecting, the equalizer plus "Sonando" while audio plays, "Ir al vivo" (chalk underline, 44px) after a pause, and a Hot Red error with a retry hint when the stream fails. In the player bar the same statuses replace the "91.5 FM · Al aire" line.

### Hero CV10 button
When an event is on air and it is marked as broadcast on CV10, a 48px logo-red button with white Archivo bold uppercase text ("Verlo en video · CV10", arrow icon) sits under the stream status line; hover inverts it to chalk with ink text. The event venue is a chalk Archivo semibold uppercase line with a Hot Red map-pin icon above the description.

### Schedule row (planilla)
Time column in mono, name in Title display, status in mono. The live row inverts to chalk with ink text; past rows are dimmed to 60% and struck through; "Sigue" is a 1px chalk outlined tag; the schedule is the radio schedule, so it lists only what the radio transmits (the radio carries one match at a time, deduced without a database field: an event marked CV10 that overlaps in time with one not marked CV10 is video-only and stays out of the schedule); special events say how they are broadcast: "Radio + CV10" in Hot Red (brand red on the live chalk row) or "Radio" in Dim Chalk. The rows are not links, so they carry no hover or press motion; only link rows (news, menu) draw the 2px chalk underline from left to right in 220ms and sink on press.

### Tickets
White tickets (events) and one larger red ticket (CV10) with white text. Grid of body, perforation, stub; the stub of event tickets shows weekday, big day number and month, and the body adds the venue when the event has one and a logo-red block with the medium: "Radio + CV10" or "Solo en CV10". Tickets are only for events that go on video; radio-only events live in the schedule, so the section is titled "Partidos por CV10" and the red CV10 ticket says these matches are seen on video and that the ones labelled "Radio + CV10" are also heard on the radio. An event that is on air only on CV10 does not take over the tablero: the radio program stays and a logo-red "Ahora por CV10: [event]" button offers the video. The red ticket carries an arrow icon that nudges on hover.

### Buttons and links
No filled button family beyond one contact button: ink background, chalk text, 48px high, Archivo semibold uppercase, inverting to chalk with ink text on hover (sits on the red strip). When no phone, WhatsApp or email is set, the contact action is the studio address as a chalk-underline link to a map. Everything else is a chalk-underline text link (Archivo semibold uppercase, 2px underline drawn left to right on hover and focus, hover only on fine pointers). All tappables sink to 0.97 scale on press in 120ms (the tilted CV10 ticket sinks to 0.98 in 200ms and keeps its tilt).

### Navigation
Sticky ink bar under the marquee, logo left (120px to 140px) followed by a 1px chalk/30 divider and the line "La radio del deporte de Mercedes" in Archivo semibold Dim Chalk (0.75rem sentence case on mobile, 0.875rem uppercase from the small breakpoint), links right in Archivo semibold uppercase 0.875rem; inactive Dim Chalk, active chalk with the underline held open. On mobile a right-hand sheet at 88% width (max 24rem) lists Inicio and the links in 2.25rem display type separated by chalk rules; its close button is 44px with a chalk focus outline. It opens in 300ms; under reduced motion it only fades and does not slide.

### Player bar
Fixed bottom, 72px, ink with a 1px chalk border-top. Shows live dot, program name, status line in mono, equalizer, rewind, play disc, go-to-live, mute and volume slider (volume and skip hidden on mobile). It slides away and becomes inert while the tablero play disc is at least 60% in view, so two identical play buttons are never on screen.

### News rows and cards
Rows: mono date column, Title display headline (two lines max), one-line excerpt from the small breakpoint, 64px to 112px thumbnail, untreated. Cards: 1px chalk/25 border, 16:9 image, date in mono, title with chalk underline. The featured note uses a 1px chalk/30 frame and a two-column split.

### Video band
"Programas en video": a Headline h2 with a "Ver canal" text link at its right (its accessible name carries the channel owner) (it wraps under the heading on mobile). On desktop a 1.6/1 split: the selected video in a 16:9 frame with a 1px chalk/30 border, then date in mono and the title in Title display, and an "Abrir en YouTube" text link; on the right a ruled list of the latest five videos (date in mono, title in Title display up to three lines, 16:9 thumbnail 96px to 112px wide). On mobile the frame comes first and the list below. At rest the frame shows the video thumbnail with a logo-red block label "Ver el programa" at its bottom-left corner: a rectangular label, never a round play disc, so it cannot be mistaken for the radio play control. The YouTube player (privacy mode) loads only when a video or a row is tapped, and starting a video pauses the radio. The selected row carries a 1px chalk outlined "Viendo" tag. If the feed returns nothing the band is not rendered.

### Footer
Chalk rule with a centre circle, logo, a display tagline, link list, contact lines with small icons in Hot Red (the address links to a map), and a mono legal line.

## Do's and Don'ts

### Do:
- **Do** keep every surface to ink, chalk, logo red and Hot Red; red text on ink is always `#ff5252`.
- **Do** set times, dates, the minute counter and status words in Chivo Mono, and nothing else.
- **Do** set navigation, links and buttons in Archivo semibold uppercase with 0.05em tracking.
- **Do** set headlines and program names in Big Shoulders Display, uppercase, leading 0.85 to 1.02.
- **Do** separate sections with 1px chalk-alpha rules or a flat colour change.
- **Do** use the 120ms press sink on every tappable and the ease-out cubic-bezier(0.23, 1, 0.32, 1) for all motion.
- **Do** guard every animation (live pulse, equalizer, marquee, tablero entrance, press, scroll smoothing) with `prefers-reduced-motion`; the marquee becomes a scrollable strip.
- **Do** hide the fixed player bar while the tablero play disc is in view.
- **Do** give anything that moves on its own for more than five seconds a visible pause control.
- **Do** keep tappable targets at 44px or more, and let sizes of dots and equalizers come from custom properties instead of stray font sizes.
- **Do** state the stream status once, in a single line beside the control.
- **Do** keep /admin on its own system (see Admin panel): none of the public tokens, display type or chalk geometry carry into it.

### Don't:
- **Don't** add box-shadows, glows or decorative gradients.
- **Don't** build grids of equal cards with an icon on top; list services as ruled rows.
- **Don't** place a kicker or eyebrow above a heading.
- **Don't** use logo red as small text on ink.
- **Don't** introduce a fourth hue or recolour the logo.
- **Don't** round rectangles; round only things that are round in the world (disc, dots, rings).
- **Don't** use mono for buttons, links or navigation.
- **Don't** show two play controls at once.
- **Don't** animate the equalizer before audio is playing, or let a red disc stand for a stream that is not sounding.
- **Don't** put invented data in a venue, CV10 or contact slot: an empty field shows nothing.

## Admin panel (/admin)

A separate Operate surface for the radio team, built mobile first. It does not use the public site's world: neutral dark ground, thin-border cards, and the logo red only for the primary action and the active destination. Its components come from coss ui (built on Base UI), ported to Tailwind v3 inside `components/admin/ui/`; the public site is unaffected.

**Tokens.** coss-style semantic colors live as `--a-*` RGB channels in `:root` (they are on `:root` because dialogs and toasts mount in `<body>`) and are mapped in `tailwind.config.ts` as `rgb(var(--a-x) / <alpha-value>)`: background `#0b0b0b`, card `#141414`, popover `#181818`, border `#2a2a2a`, input `#343434`, foreground `#f5f5f5`, muted foreground `#a3a3a3`, primary `#dc1717` with white text, and success, warning, info and destructive semantics for status. Type is Archivo for the interface and Chivo Mono only for times and dates, with tabular numerals. Radius is 8px on controls, 12px on cards, 16px on the bottom sheet. No decorative shadows or gradients; depth is a thin border plus value contrast.

**Structure.** Mobile: a 56px top bar (logo, "Ver sitio") and a fixed 4-destination tab bar (Inicio, Noticias, Programación, Cuenta) with safe-area padding and a red 2px mark above the active item; the tab bar appears only on top-level screens. Form screens drop it and show a sticky Cancelar / Guardar bar instead, with a "Volver" link at the top. Desktop (lg): a fixed 16rem sidebar (card ground, full viewport height) with the logo and a divider, the destinations in three groups (Inicio; Contenido: Noticias, Programación; Ajustes: Cuenta) with small uppercase group labels, the active item with an accent fill, a 1px inset border and a red icon, and a footer with "Ver sitio" and a user card (initial, email, sign-out icon). The content sits in a column of up to 56rem. The public body padding reserved for the player bar is removed under the admin.

**Components in use.** Button (44px on mobile, 36px from sm, loading state, red default), Input and Textarea (16px text on mobile so iOS does not zoom), Field with label, description and error, Switch (publishing, CV10), Checkbox, Badge (status: Publicada, Borrador, Radio, Radio + CV10, Solo en CV10), Card, Tabs as a segmented control (news filter; programs and events), DateField and TimeField (typed with a mask or picked in a Popover: a Spanish calendar that starts on Monday, and a 24-hour hour/minute list; the browser's native pickers are not used), AlertDialog as a bottom sheet on mobile and centered from sm (every delete goes through it and names the item), Toast for saved and error notices (bottom, above the tab bar), Skeleton for loading and Empty for empty states.

**Patterns.** Lists are rows inside a card: the row is a link to edit, trailing icon buttons act (publish toggle, delete). Saving redirects with `?ok=guardado` and a toast confirms it. Dates and times are always Montevideo time. The Markdown editor is write-only on mobile (live preview from sm up), its toolbar is one scrollable row, and its theme is mapped to the admin tokens. Copy is rioplatense with voseo and says what to do next on errors.

**Admin rules.**
- **The One Red Rule.** Red marks the single primary action of a screen and the active destination; status uses the semantic colors.
- **The Thumb Rule.** Primary actions sit at the bottom on mobile; targets are 44px; nothing is hidden behind hover.
- **The Confirm Rule.** Nothing is deleted without a sheet that names what will be deleted.

