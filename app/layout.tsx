import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders_Display, Chivo_Mono } from "next/font/google";
import "./globals.css";
import { Intro } from "@/components/Intro";
import { PageTransitions } from "@/components/PageTransitions";
import { ConditionalPlayer } from "@/components/ConditionalPlayer";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { ScheduleProvider } from "@/components/schedule/ScheduleProvider";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
});
const body = Archivo({ subsets: ["latin"], variable: "--font-body" });
const mono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title:
    "91.5FM Espacio Sport - La radio del deporte local en la ciudad de Soriano",
  description:
    "La radio del deporte local en la ciudad de Soriano. Escuchá la mejor programación deportiva en vivo y en directo.",
  keywords: [
    "91.5FM",
    "Espacio Sport",
    "radio",
    "deporte",
    "local",
    "Soriano",
    "Uruguay",
    "Mercedes",
  ],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-sans antialiased`}
      >
        <Intro />
        <PageTransitions />
        <PlayerProvider>
          <ScheduleProvider>
            {children}
            <ConditionalPlayer />
          </ScheduleProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
