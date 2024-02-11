import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        message: {
          darkest: colors.purple[900],
          dark: colors.purple[700],
          DEFAULT: colors.purple[700],
          light: colors.purple[300],
          lightest: colors.purple[100],
        },
      },
    },
  },
  plugins: [],
};
