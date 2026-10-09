export function LiveDot({ className = "text-brand" }: { className?: string }) {
  return <span aria-hidden className={`live-dot ${className}`} />;
}
