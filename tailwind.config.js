import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'arial-black': ['"Arial Black"', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui], // Add DaisyUI plugin
};
