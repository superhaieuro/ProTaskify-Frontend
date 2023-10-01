/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        enter: "fadeInRight 500ms ease-out",
        leave: "fadeOutLeft 500ms ease-in forwards"
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translate(2rem)"
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)"
          }
        },
        fadeOutLeft: {
          "0%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          },
        },
      },
    },
  },
  plugins: [],
}

