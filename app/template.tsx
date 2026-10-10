// Transición entre páginas: a diferencia del layout, el template se vuelve a montar en cada
// navegación, así que la página nueva entra con un fundido corto (ver .page-in en globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
