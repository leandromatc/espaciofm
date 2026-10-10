import { fetchChannelVideos } from "@/lib/videos";
import { Videos } from "@/components/home/Videos";

/** Trae los videos en el servidor (con caché de 30 min). Sin videos, no hay sección. */
export async function VideosFeed() {
  const videos = await fetchChannelVideos(5);
  if (videos.length === 0) return null;
  return <Videos videos={videos} />;
}
