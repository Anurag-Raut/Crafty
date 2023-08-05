/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        "base-100": "#F8F6F4", 
        "base-400":"#F5F5F5",
        "base-300":"#D4E2D4",
      },
      scale: {
        '90': '0.9',
        '85': '0.85',
        '80':'0.8'
      },
    },
  },

  plugins: [require("daisyui")],
}
