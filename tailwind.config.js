/** @type {import('tailwindcss').Config} */
const colours = {
  primary: "#501140",
  secondary: "#0665A5",
  dark: "#002B4C",
  light: "#F5B8CB",
  accent: "#96CAE7",
  white: "#FFFFFF",
  darkPurple: "#3F1E55",
  bright: "#AD3263",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colours,
      },
      fontFamily: {
        astro: ["Astro", "sans-serif"],
        zendots: ["ZenDots", "sans-serif"],
      },
    },
  },
  plugins: [],
};
