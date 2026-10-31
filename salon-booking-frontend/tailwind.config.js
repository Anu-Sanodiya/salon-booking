/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171717',
        sand: '#f6f2eb',
        gold: '#c99a4a',
      },
      boxShadow: {
        soft: '0 16px 50px rgba(23, 23, 23, 0.08)',
      },
    },
  },
  plugins: [],
}
