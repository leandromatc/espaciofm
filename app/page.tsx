import { AudioPlayer } from "@/components/AudioPlayer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <section className='flex flex-col w-full min-h-screen'>
        <Navbar />
        <AudioPlayer />
      </section>
      <main>
      </main>
    </div>
  );
}
