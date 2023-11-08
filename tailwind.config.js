/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sunny': 'url("/src/assets/images/clear-sky.jpg")',
        'rainy': 'url("/src/assets/images/rainy.jpg")',
        'cloudy': 'url("/src/assets/images/cloudy.jpg")',
        'snowy': 'url("/src/assets/images/snowy.jpg")',
      },
     boxShadow: {
      'blue': '0 8px 32px #1f26875e',
     }
    },
  },
  plugins: [],
}