/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'college': "url('/src/assets/dummy_500x500_000000_5cc4c2.png')",
        'house': "url('/src/assets/dummy_500x500_000000_b1f49c.png')",
        'retirement': "url('/src/assets/dummy_500x500_000000_efaad9.png')",
      },
      colors: {
        customSlate: '#53728e',
        customYellow: '#f0d891',
      }
    },
  },
  plugins: [],
}
