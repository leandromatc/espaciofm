import { CONTACT, MAPS_URL } from "@/lib/contact";

// Servicios: mismo contenido de siempre, pero como lista de carteles y no como grilla de tarjetas.
const services = [
  {
    title: "Publicidad radial",
    description:
      "Llegá a toda la audiencia de Mercedes y Soriano con espacios publicitarios en nuestra programación.",
  },
  {
    title: "Transmisiones deportivas",
    description:
      "Cobertura en vivo de los principales eventos deportivos locales: básquetbol, fútbol y más.",
  },
  {
    title: "Avisos y comunicados",
    description:
      "Difundí tu mensaje, evento o comunicado importante a toda la comunidad de Soriano.",
  },
  {
    title: "Streaming CV10",
    description:
      "Video en vivo de eventos deportivos locales a través de la señal de streaming CV10.",
  },
];

function Contacto() {
  const btn =
    "press inline-flex min-h-12 items-center bg-ink px-6 font-sans text-sm font-bold uppercase tracking-wider text-chalk hover:bg-chalk hover:text-ink";

  if (CONTACT.whatsapp) {
    return (
      <a
        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hola, quiero pautar en Espacio Sport 91.5")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        Escribinos por WhatsApp
      </a>
    );
  }
  if (CONTACT.phone) {
    return (
      <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className={btn}>
        Llamanos al {CONTACT.phone}
      </a>
    );
  }
  if (CONTACT.email) {
    return (
      <a href={`mailto:${CONTACT.email}`} className={btn}>
        Escribinos a {CONTACT.email}
      </a>
    );
  }
  // Sin teléfono ni mail cargados: la dirección real
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="tiza-link press inline-flex min-h-12 items-center font-sans text-sm font-bold uppercase tracking-wider"
    >
      Pasá por {CONTACT.address}
    </a>
  );
}

export default function Pauta() {
  return (
    <section
      id="pautar"
      className="relative overflow-hidden bg-brand px-5 py-14 text-white sm:py-20"
    >
      <div className="relative mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2
            className="font-display font-black uppercase leading-[0.88] text-balance"
            style={{ fontSize: "clamp(3.25rem, 10vw, 6rem)" }}
          >
            Que tu comercio suene en la cancha
          </h2>
          <div className="mt-8">
            <Contacto />
          </div>
        </div>

        <dl className="divide-y divide-white/40 border-y border-white/40">
          {services.map(({ title, description }) => (
            <div key={title} className="py-4 sm:py-5">
              <dt className="font-display text-3xl font-extrabold uppercase leading-none">
                {title}
              </dt>
              <dd className="mt-2 max-w-md text-base text-white">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
