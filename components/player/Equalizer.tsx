export function Equalizer({
  playing,
  className = "",
}: {
  playing: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      data-playing={playing}
      className={`eq ${className}`}
    >
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
