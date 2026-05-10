import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Streaming from "@/components/Streaming";
import About from "@/components/About";
import TodayPrograms from "@/components/TodayPrograms";
import { NewsFeed } from "@/components/NewsFeed";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Main content: news + today's programs */}
      <section id="noticias" className="mx-auto max-w-screen-xl px-5 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
          {/* News feed */}
          <div>
            <div className="mb-6 w-max">
              <h2 className="font-medium uppercase md:text-3xl">Noticias</h2>
              <span className="block h-[2px] w-[60px] bg-red-600" />
            </div>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-64 animate-pulse rounded-lg bg-neutral-800"
                    />
                  ))}
                </div>
              }
            >
              <NewsFeed />
            </Suspense>
          </div>

          {/* Sidebar: today's programs */}
          <aside className="mt-10 lg:mt-0">
            <TodayPrograms />
          </aside>
        </div>
      </section>

      <Services />
      <Streaming />
      <About />
      <Footer />
    </main>
  );
}
