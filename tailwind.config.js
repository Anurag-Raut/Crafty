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
        "base-100": "#F6F4EB", 
        "base-400":"#F5F5F5",
        "base-300":"#D4E2D4",
      },
    },
  },

  plugins: [require("daisyui")],
}
