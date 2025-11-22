// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class", // IMPORTANT: we control dark mode via `.dark` on <html>
  theme: {
    extend: {
      colors: {
        mood: {
          primary: "#3691E0",
          secondary: "#4A84B6",
          muted: "#50708B",
          border: "#485561",
          surface: "#313436",
          bg: "#252C33",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
