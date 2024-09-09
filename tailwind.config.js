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
          primary: "#98E4FF", //ฟ้าอ่อนๆ
          accent: "#687EFF", //ฟ้าเข้ม
          neutral: "#25c1ff", //ฟ้าอ่อน
          secondary: "#FF0000", //แดง
          "base-100": "#ffffff",
          info: "#0184ff", //ฟ้าเข็ม
          "info-content": "#f1fdfd",
          success: "#1ad1a5",
          warning: "#ff9900",
          error: "#ff003f",
        },
      },
    ],
  },
};
