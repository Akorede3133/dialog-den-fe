/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#fff',
        'bg-dark': '#262e35',
        'text-primary': '#343a40',
        'primary-blue': '#7269ef',
        'sidebar-light': '#F5F7FB',
        'sidebar-dark': '#303841',
        'sender-bg-dark': '#262e35',
        'message-count-cirle': '#523b49',
        'message-count-text': '#ef4669',
        'message-bg-blue': '#7269ef',
        'bg-silver': '#e6ebf5',
        'text-gray': '#878a92',
        'icon-active-bg': '#f7f7ff'
      }
    },
  },
  plugins: [],
}