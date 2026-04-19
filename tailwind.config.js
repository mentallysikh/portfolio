/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        cyan: { 400: '#00f5ff', 500: '#00c8d4' },
        green: { 400: '#00ff88', 500: '#00cc6a' },
      },
    },
  },
  plugins: [],
}
