import AudioPlayer from "./components/AudioPlayer";

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-100 flex-col gap-10 relative">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-100 animate-blob mix-blend-multiply filter blur-2xl"></div>
      <div className="z-10 flex gap-10 flex-col">
        <div>
          <h1 className="font-semibold uppercase text-6xl text-neutral-800 text-center">
            ¡Nos estamos renovando!
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
