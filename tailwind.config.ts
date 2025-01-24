import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: {
          default: "var(--secondary)",
          300: "var(--secondary-300)",
          600: "var(--secondary-600)",
          900: "var(--secondary-900)",
        },
      },
      fontFamily: {
        primary: "var(--font-montserrat-alternates)",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
