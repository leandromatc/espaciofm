import AudioPlayer from "./components/AudioPlayer";
import logo from "./assets/logo.webp";

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-10 relative p-10 overflow-hidden">
      <div className="absolute md:block hidden w-[500px] h-[500px] rounded-full top-0 left-0 bg-red-100 animate-blob mix-blend-multiply filter blur-2xl"></div>
      <picture className="max-w-[540px]">
        <img src={logo} alt="Logo de Espacio Sport 91.5" />
      </picture>
      <div className="z-10 flex gap-10 flex-col">
        <div>
          <h1 className="font-bold uppercase md:text-6xl text-neutral-800 text-center text-4xl tracking-tight font-inter">
            ¡Nos estamos{" "}
            <span className="font-shadowsIntoLight text-red-600">
              renovando
            </span>
            !
          </h1>
          <p className="text-neutral-800 text-center mt-4">
            Mientras tanto, podes escucharnos desde aquí.
          </p>
        </div>
        <AudioPlayer />
      </div>
    </div>
  );
}

export default App;
