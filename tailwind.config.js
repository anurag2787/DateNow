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
  plugins: [require("daisyui")], // Add DaisyUI plugin
};
