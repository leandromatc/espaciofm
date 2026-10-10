// Videos de los programas, del canal público de YouTube de José Benavidez.
// Se leen del RSS público del canal: no necesita API key ni cuenta.
export const YOUTUBE_CHANNEL = {
  id: "UCrObCFP5l6lIADqdEGAEQBw",
  name: "Jose Benavidez",
  url: "https://www.youtube.com/@josebenavidez1177",
} as const;

export type Video = {
  id: string;
  title: string;
  /** ISO, tal cual lo publica YouTube */
  published: string;
  /** "08 oct", ya formateado en hora de Montevideo para que servidor y cliente coincidan */
  dateLabel: string;
  watchUrl: string;
  /** 16:9 (mqdefault), para las filas */
  thumb: string;
  /** hqdefault es 4:3 con barras negras: con object-cover en un marco 16:9 queda el cuadro real */
  thumbLarge: string;
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Últimos videos del canal (el feed trae hasta 15). Si YouTube no responde o el
 * formato cambia devuelve [] y la portada simplemente no muestra la sección.
 */
export async function fetchChannelVideos(limit = 5): Promise<Video[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL.id}`,
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) return [];
    const xml = await res.text();

    const videos: Video[] = [];
    for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const entry = m[1];
      const id = entry.match(/<yt:videoId>([\w-]{6,})<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1];
      if (!id || !title || !published) continue;

      videos.push({
        id,
        title: decode(title),
        published,
        dateLabel: new Date(published)
          .toLocaleDateString("es-UY", {
            day: "2-digit",
            month: "short",
            timeZone: "America/Montevideo",
          })
          .replace(".", ""),
        watchUrl: `https://www.youtube.com/watch?v=${id}`,
        thumb: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
        thumbLarge: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      });
      if (videos.length >= limit) break;
    }
    return videos;
  } catch {
    return [];
  }
}
