import Ping from "./Ping";

const Hero = () => {
  return (
    <div className="border-b border-neutral-800/60 bg-gradient-to-r from-red-950/30 via-neutral-950 to-neutral-950">
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-5 py-5">
        <span className="flex shrink-0 items-center gap-2 rounded-full bg-red-600/10 px-3 py-1.5 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-600/20">
          <Ping />
          En vivo
        </span>
        <div>
          <h1 className="text-sm font-semibold tracking-wide">
            <span className="text-red-500">ESPACIO SPORT</span>{" "}
            <span className="text-neutral-200">91.5 FM</span>
          </h1>
          <p className="text-xs text-neutral-500">
            Deporte, música y actualidad · Mercedes, Soriano
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
