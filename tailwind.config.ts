import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0F172A', // Beispiel: dunkles Blau
        secondary: '#E2E8F0', // Beispiel: helles Grau
      },
    },
  },
  plugins: [],
}
export default config