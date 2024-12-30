import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang='es' className='dark'>
      <head>
        <link rel='icon' href='/favicon.svg' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/images/android-chrome-192x192.png'
        />

        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/images/android-chrome-512x512.png'
        />
        <meta name='theme-color' content='#ffffff' />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
