import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className='flex flex-col w-full min-h-screen'>
        <Navbar />
      </section>
      <main></main>
    </div>
  );
}
