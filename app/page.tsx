import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NewsFeed } from "@/components/NewsFeed";
import { Tablero } from "@/components/home/Tablero";
import { Planilla } from "@/components/home/Planilla";
import { Entradas } from "@/components/home/Entradas";
import Pauta from "@/components/home/Pauta";

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
          <div aria-hidden className="mx-auto h-72 max-w-screen-xl px-5" />
        }
      >
        <NewsFeed />
      </Suspense>
      <Pauta />
      <Footer />
    </main>
  );
}
