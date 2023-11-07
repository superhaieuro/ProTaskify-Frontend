/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          400: "#BDBDBD",
          600: "#757575",
        },

        blue: {
          50: "#E3F2FD",
          200: "#90CAF9",
          600: "#1E88E5",
          700: "#1976D2",
          800: "#1565C0",
        },

        red: {
          50: "#FFEBEE",
          100: "#FFCDD2",
          200: "#EF9A9A",
          600: "#E53935",
          700: "#D32F2F",
          800: "#C62828",
        },

        yellow: {
          50: "#FFFDE7",
          200: "#FFF59D",
          600: "#FDD835",
        },

        green: {
          50: "#E8F5E9",
          200: "#A5D6A7",
          600: "#43A047",
        },
      },

      animation: {
        enter: "fadeInDown 500ms ease-out",
        leave: "fadeOutDown 500ms ease-in forwards",
        modalenter: "fadeInZoomIn 200ms ease-out",
        modalenterleft: "fadeInLeft 200ms ease-out",
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
          },
        },
        fadeOutDown: {
          "0%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          },
        },
        fadeInZoomIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.5)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(2rem)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
      },
    },
  },
  plugins: [],
}

