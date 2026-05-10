const stats = [
  { value: "1999", label: "Año de inicio" },
  { value: "91.5", label: "Frecuencia FM" },
  { value: "24/7", label: "Transmisión" },
  { value: "Soriano", label: "Departamento" },
];

const About = () => {
  return (
    <section className="border-t border-neutral-800/60 bg-neutral-900/30 px-5 py-16" id="sobre-nosotros">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 w-max">
              <h2 className="text-3xl font-bold">Sobre nosotros</h2>
              <span className="mt-1 block h-[2px] w-[50px] bg-red-600" />
            </div>
            <p className="leading-relaxed text-neutral-400">
              Estación que inició su actividad en 1999, llegando a convertirse
              en uno de los principales medios de comunicación de Mercedes,
              Uruguay. Ofrecemos noticias al día, segmentos deportivos, música y
              mucho más para toda la comunidad de Soriano.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-xl bg-neutral-900 p-6 ring-1 ring-inset ring-neutral-800"
              >
                <span className="text-3xl font-bold text-red-500">{value}</span>
                <span className="text-sm text-neutral-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
