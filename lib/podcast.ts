// Audios de "Más que deportes": feed RSS público del podcast en Spotify for Creators.
// Ustedes suben el episodio allá y el sitio lo muestra solo (sin claves ni API).
// PODCAST_RSS_URL es opcional (solo para probar con otro feed).
export const PODCAST_RSS_URL =
  process.env.PODCAST_RSS_URL ?? "https://anchor.fm/s/1185bce08/podcast/rss";
export const SPOTIFY_SHOW_URL =
  "https://open.spotify.com/show/1D3KRSz1cBBfFA2P32wI6N";

export type Episode = {
  /** Identificador estable del episodio (guid del feed) */
  key: string;
  title: string;
  /** Página del episodio (para "Abrir en Spotify") */
  url: string;
  /** Archivo de audio que reproduce el navegador */
  audioUrl: string;
  /** "08 oct", ya en hora de Montevideo para que servidor y cliente coincidan */
  dateLabel: string;
  /** "58 min" o "1 h 02 min" */
  durationLabel: string;
};

export type EpisodesPage = {
  episodes: Episode[];
  hasMore: boolean;
  /** true si el feed no respondió: distinto de "todavía no hay audios" */
  error: boolean;
};

function durationLabel(seconds: number) {
  if (!seconds) return "";
  const min = Math.round(seconds / 60);
  if (min < 60) return `${Math.max(min, 1)} min`;
  return `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")} min`;
}

// "01:20:58", "20:58" o "4858" -> segundos
function parseDuration(raw: string | undefined) {
  if (!raw) return 0;
  const parts = raw.trim().split(":").map(Number);
  if (parts.some((n) => Number.isNaN(n))) return 0;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

function decode(s: string) {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isNaN(code) ? m : String.fromCodePoint(code);
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

// Contenido de <tag>…</tag> (con o sin CDATA)
function tag(xml: string, name: string) {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  if (!m) return undefined;
  const cdata = m[1].match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return (cdata ? cdata[1] : decode(m[1])).trim();
}

function parseItems(xml: string): Episode[] {
  const found: { time: number; episode: Episode }[] = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const item = m[1];
    const title = tag(item, "title")?.replace(/\s+/g, " ");
    const audioUrl = item.match(/<enclosure[^>]*\surl="([^"]+)"/i)?.[1];
    const pub = tag(item, "pubDate");
    const date = pub ? new Date(pub) : null;
    if (!title || !audioUrl || !date || Number.isNaN(date.getTime())) continue;
    found.push({
      time: date.getTime(),
      episode: {
        key: tag(item, "guid") ?? audioUrl,
        title,
        url: tag(item, "link") ?? SPOTIFY_SHOW_URL,
        audioUrl: decode(audioUrl),
        dateLabel: date
          .toLocaleDateString("es-UY", {
            day: "2-digit",
            month: "short",
            timeZone: "America/Montevideo",
          })
          .replace(".", ""),
        durationLabel: durationLabel(parseDuration(tag(item, "itunes:duration"))),
      },
    });
  }
  // del más nuevo al más viejo
  return found.sort((x, y) => y.time - x.time).map((f) => f.episode);
}

/**
 * Una página de episodios, del más nuevo al más viejo. Se guarda en caché 30 minutos.
 * Si el feed falla devuelve error: true (la portada se oculta, la subpágina avisa).
 */
export async function fetchEpisodes(
  limit = 12,
  offset = 0,
): Promise<EpisodesPage> {
  try {
    const res = await fetch(PODCAST_RSS_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return { episodes: [], hasMore: false, error: true };
    const all = parseItems(await res.text());
    return {
      episodes: all.slice(offset, offset + limit),
      hasMore: all.length > offset + limit,
      error: false,
    };
  } catch {
    return { episodes: [], hasMore: false, error: true };
  }
}
