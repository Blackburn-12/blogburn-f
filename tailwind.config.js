/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        logo: "#1F1F20",
        buttonBeforeHover: "#673DE5",
        buttonAfterHover: "#5025D1",
        navLinksBeforeHover: "#8e8e8e",
        navLinksAfterHover: "#757474",
        icons: "#02B08F",
        loginbox: "#F4F5FF",
        boxtext: "#2F1C6A"
      },
      fontFamily: {
        Oswald: ["Oswald"],
        Palanquin:["Palanquin"]
      },
    },
  },
  plugins: [],
};
