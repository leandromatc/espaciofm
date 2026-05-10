import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Streaming from "@/components/Streaming";
import About from "@/components/About";
import TodayPrograms from "@/components/TodayPrograms";
import { NewsFeed } from "@/components/NewsFeed";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <section id="noticias" className="px-5 py-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_320px]">
            {/* News feed */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold uppercase">Noticias</h2>
                <span className="mt-1 block h-[2px] w-[50px] bg-red-600" />
              </div>
              <Suspense
                fallback={
                  <div className="flex flex-col gap-4">
                    <div className="h-72 animate-pulse rounded-xl bg-neutral-800" />
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-48 animate-pulse rounded-lg bg-neutral-800" />
                      ))}
                    </div>
                  </div>
                }
              >
                <NewsFeed />
              </Suspense>
              <Link
                href="/noticias"
                className="mt-5 flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                Ver todas las noticias
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Sidebar: today's programs */}
            <aside className="mt-10 lg:mt-0">
              <TodayPrograms />
            </aside>
          </div>
        </div>
      </section>

      <Services />
      <Streaming />
      <About />
      <Footer />
    </main>
  );
}
