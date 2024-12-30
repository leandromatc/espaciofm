import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TodayPrograms from "@/components/TodayPrograms";

export default function Home() {
  return (
    <main>
      <Hero />
      <TodayPrograms />
      <Services />
      <About />
      <Footer />
    </main>
  );
}
