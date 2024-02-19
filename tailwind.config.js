import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          darkest: colors.purple[900],
          dark: colors.purple[700],
          DEFAULT: colors.purple[700],
          light: colors.purple[300],
          lightest: colors.purple[100],
        },
        image: {
          darkest: colors.red[900],
          dark: colors.red[700],
          DEFAULT: colors.red[700],
          light: colors.red[300],
          lightest: colors.red[100],
        },
        audio: {
          darkest: colors.amber[700],
          dark: colors.amber[500],
          DEFAULT: colors.amber[500],
          light: colors.amber[300],
          lightest: colors.amber[100],
        },
      },
    },
  },
  plugins: [],
};
