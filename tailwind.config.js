import defaultTheme from "tailwindcss/defaultTheme";
import { addDynamicIconSelectors } from "@iconify/tailwind";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
};
