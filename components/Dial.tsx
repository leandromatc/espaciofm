// Dial de sintonía: la espera de la web. Una aguja roja barre la escala 88–108 y se clava
// en 91.5, la frecuencia de la radio. Es solo SVG + CSS (sin JS): sirve en pantallas de
// carga del servidor. Con "reducir movimiento" la aguja queda fija en 91.5.
// Decorativo (aria-hidden): quien lo usa pone el texto de estado.

const MIN = 88;
const MAX = 108;
const ticks = Array.from({ length: 41 }, (_, i) => i); // cada 0,5 MHz

export function Dial({
  compact = false,
  className = "",
}: {
  /** true: solo la regla, sin números (para espacios chicos y el botón de play) */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`w-full ${className}`}>
      <svg
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        className={`block w-full overflow-visible text-chalk ${compact ? "h-5" : "h-9"}`}
      >
        {ticks.map((i) => {
          const len = i % 4 === 0 ? 15 : i % 2 === 0 ? 10 : 6;
          return (
            <line
              key={i}
              x1={i * 5}
              x2={i * 5}
              y1={0}
              y2={len}
              stroke="currentColor"
              strokeOpacity={i % 4 === 0 ? 0.6 : 0.3}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        <line
          className="dial-aguja"
          x1={0}
          x2={0}
          y1={-2}
          y2={24}
          stroke="#dc1717"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {!compact && (
        <div className="relative mt-1.5 h-4 font-mono text-[11px] leading-none text-chalk-dim">
          {[90, 95, 100, 105].map((f) => (
            <span
              key={f}
              className="tnum absolute -translate-x-1/2"
              style={{ left: `${((f - MIN) / (MAX - MIN)) * 100}%` }}
            >
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
