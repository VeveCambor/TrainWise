/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trainwise: {
          coral: "#F97394",
          sage: "#A7C4A0",
          lavender: "#BFA2DB",
          lightpink: "#FFF0F5",
          darktext: "#44403C",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 