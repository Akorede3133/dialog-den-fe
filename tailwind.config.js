/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg--light': '#fff',
        'bg--dark': '#262e35',
        'sidebar--light': '#F5F7FB',
        'sidebar--dark': '#303841',
        'sender--bg--dark': '#262e35',
        'message--cirle': '#523b49',
        'message--text': '#ef4669',
        'message--bg--blue': '#7269ef',
        'bg--silver': '#e6ebf5'
      }
    },
  },
  plugins: [],
}