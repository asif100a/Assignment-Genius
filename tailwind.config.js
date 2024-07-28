/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-serif': '"Noto Serif", serif',
        'pt-serif': '"PT Serif", serif'
      }
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["light", "night"],
  },
}

