import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Streaming from "@/components/Streaming";
import TodayPrograms from "@/components/TodayPrograms";

export default function Home() {
  return (
    <main>
      <Hero />
      <TodayPrograms />
      <Services />
      <Streaming />
      <About />
      <Footer />
    </main>
  );
}
