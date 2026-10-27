export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        noite: "#13040f",
        ameixa: "#2b0f3d",
        roxo: "#4a1560",
        vinho: "#8f1b33",
        papel: "#f7f2e9",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        hand: ["Caveat", "cursive"],
      },
      keyframes: {
        subir: {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "100%": { transform: "translateY(-120vh) rotate(20deg)" },
        },
        pulsar: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(143,27,51,0.55)" },
          "50%": { transform: "scale(1.04)", boxShadow: "0 0 0 14px rgba(143,27,51,0)" },
        },
        respirar: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.035)" },
        },
        deriva: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(8vw, -6vh) scale(1.12)" },
          "100%": { transform: "translate(-6vw, 7vh) scale(0.95)" },
        },
      },
      animation: {
        subir: "subir linear infinite",
        pulsar: "pulsar 2.4s ease-in-out infinite",
        respirar: "respirar 2.8s ease-in-out infinite",
        deriva: "deriva 30s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};