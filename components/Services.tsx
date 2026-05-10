import { Radio, Mic2, Megaphone, Tv2 } from "lucide-react";

const services = [
  {
    icon: Radio,
    title: "Publicidad radial",
    description:
      "Llegá a toda la audiencia de Mercedes y Soriano con espacios publicitarios en nuestra programación.",
  },
  {
    icon: Mic2,
    title: "Transmisiones deportivas",
    description:
      "Cobertura en vivo de los principales eventos deportivos locales: básquetbol, fútbol y más.",
  },
  {
    icon: Megaphone,
    title: "Avisos y comunicados",
    description:
      "Difundí tu mensaje, evento o comunicado importante a toda la comunidad de Soriano.",
  },
  {
    icon: Tv2,
    title: "Streaming CV10",
    description:
      "Video en vivo de eventos deportivos locales a través de la señal de streaming CV10.",
  },
];

const Services = () => {
  return (
    <section
      className="border-t border-neutral-800/60 px-5 py-16"
      id="servicios"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-10">
          <h2 className="text-2xl font-bold uppercase">Servicios</h2>
          <span className="mt-1 block h-[2px] w-[50px] bg-red-600" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-xl bg-neutral-900 p-6 ring-1 ring-inset ring-neutral-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10 ring-1 ring-inset ring-red-600/20">
                <Icon className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
