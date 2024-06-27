/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        shadowsIntoLight: ["Shadows Into Light", "cursive"],
      },
      animation: {
        blob: "blob 15s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(0.6)",
          },
          "20%": {
            transform: "translate(250%, 10%) scale(1.2)",
          },
          "40%": {
            transform: "translate(120%, 100%) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(0.6)",
          },
        },
      },
    },
  },
  plugins: [],
};
