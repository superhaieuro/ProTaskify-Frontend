/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        enter: "fadeInDown 500ms ease-out",
        leave: "fadeOutDown 500ms ease-in forwards"
      },
      keyframes: {
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-2rem)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        fadeOutDown: {
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

