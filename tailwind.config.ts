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
        // Panel de administración: tokens de coss ui (valores en globals.css)
        background: "rgb(var(--a-background) / <alpha-value>)",
        foreground: "rgb(var(--a-foreground) / <alpha-value>)",
        card: "rgb(var(--a-card) / <alpha-value>)",
        "card-foreground": "rgb(var(--a-card-foreground) / <alpha-value>)",
        popover: "rgb(var(--a-popover) / <alpha-value>)",
        "popover-foreground": "rgb(var(--a-popover-foreground) / <alpha-value>)",
        primary: "rgb(var(--a-primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--a-primary-foreground) / <alpha-value>)",
        secondary: "rgb(var(--a-secondary) / <alpha-value>)",
        "secondary-foreground": "rgb(var(--a-secondary-foreground) / <alpha-value>)",
        muted: "rgb(var(--a-muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--a-muted-foreground) / <alpha-value>)",
        accent: "rgb(var(--a-accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--a-accent-foreground) / <alpha-value>)",
        destructive: "rgb(var(--a-destructive) / <alpha-value>)",
        "destructive-foreground": "rgb(var(--a-destructive-foreground) / <alpha-value>)",
        border: "rgb(var(--a-border) / <alpha-value>)",
        input: "rgb(var(--a-input) / <alpha-value>)",
        ring: "rgb(var(--a-ring) / <alpha-value>)",
        success: "rgb(var(--a-success) / <alpha-value>)",
        "success-foreground": "rgb(var(--a-success-foreground) / <alpha-value>)",
        warning: "rgb(var(--a-warning) / <alpha-value>)",
        "warning-foreground": "rgb(var(--a-warning-foreground) / <alpha-value>)",
        info: "rgb(var(--a-info) / <alpha-value>)",
        "info-foreground": "rgb(var(--a-info-foreground) / <alpha-value>)",
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
