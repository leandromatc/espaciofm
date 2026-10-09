/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // La planilla: negro de tablero apagado, tiza y el rojo del logo.
        ink: { DEFAULT: "#0a0a0a", 2: "#141414", 3: "#1d1d1d" },
        chalk: { DEFAULT: "#f5f5f2", dim: "#b4b4ae" },
        // #dc1717 es el rojo del logo; "hot" es para texto chico sobre negro (contraste >= 4.5).
        brand: { DEFAULT: "#dc1717", hot: "#ff5252", deep: "#b01010" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
