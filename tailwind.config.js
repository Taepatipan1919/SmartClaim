/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a2d2ff", //ฟ้าอ่อนๆ  //side
          accent: "#6C5D4E", //ฟ้าเข้ม
          neutral: "#A2D2FF", //ฟ้าอ่อน
          secondary: "#FF0000", //แดง
          "base-100": "#ffffff",
          info: "#BDE0FE", //ฟ้าเข็ม
          "info-content": "#FFAFCC",
          success: "#3dccc7", /** BDE0FE*/
          warning: "#ffc8dd",
          error: "#ff003f",
        },
      },
    ],
  },
};
