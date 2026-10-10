import { Suspense } from "react";
import { Dial } from "@/components/Dial";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NewsFeed } from "@/components/NewsFeed";
import { Tablero } from "@/components/home/Tablero";
import { Planilla } from "@/components/home/Planilla";
import { Entradas } from "@/components/home/Entradas";
import Pauta from "@/components/home/Pauta";
import { VideosFeed } from "@/components/home/VideosFeed";
import { AudiosFeed } from "@/components/home/AudiosFeed";

// La portada es estática (ISR): solo las noticias vienen del servidor y se regeneran
// al guardar en el admin (revalidatePath("/")) o, como red de seguridad, cada 5 minutos.
// Todo lo que depende de la hora se calcula en el cliente (ScheduleProvider).
export const revalidate = 300;

export default function Home() {
  return (
    <main>
      <Navbar />
      <Tablero />
      <Planilla />
      <Entradas />
      <Suspense
        fallback={
          <div className="mx-auto grid h-72 max-w-screen-xl place-items-center px-5">
            <Dial compact className="max-w-xs" />
          </div>
        }
      >
        <VideosFeed />
      </Suspense>
      <Suspense fallback={null}>
        <AudiosFeed />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto grid h-72 max-w-screen-xl place-items-center px-5">
            <Dial compact className="max-w-xs" />
          </div>
        }
      >
        <NewsFeed />
      </Suspense>
      <Pauta />
      <Footer />
    </main>
  );
}
