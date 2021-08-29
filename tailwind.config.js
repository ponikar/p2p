module.exports = {
  purge: ["./src/**/*.tsx", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "1rem",
      },
    },
    colors: {
      primary: "#57837B",
      black: "#000",
      white: "#fff",
      back: "#222831",
      secondryBack: "#393E46",
      highlight: "#EEEEEE",
      filter: "#737373",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
