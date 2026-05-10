import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Streaming = () => {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-screen-xl">
        <Link
          href="https://cv10.plag.tv"
          target="_blank"
          aria-label="Streaming de CV10"
        >
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/50 via-red-950/30 to-neutral-900 p-8 ring-1 ring-inset ring-red-800/20 transition-all hover:ring-red-700/40 md:p-12">
            {/* Decorative circle */}
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-red-600/5" />
            <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-red-600/5" />

            <div className="relative max-w-xl">
              <span className="mb-4 inline-block rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-600/20">
                Streaming
              </span>
              <h3 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
                Mirá el básquetbol y fútbol local por CV10
              </h3>
              <p className="mb-6 text-neutral-400">
                Disponible para todo el mundo. Transmisiones en vivo del deporte
                de Soriano.
              </p>
              <div className="flex items-center gap-2 font-medium text-red-400 transition-colors group-hover:text-red-300">
                Ir a cv10.plag.tv
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Streaming;
