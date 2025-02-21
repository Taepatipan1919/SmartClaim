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
          // primary: "#a2d2ff", //ฟ้าอ่อนๆ  //side
          // accent: "#6C5D4E", //ฟ้าเข้ม
          // neutral: "#A2D2FF", //ฟ้าอ่อน
          // secondary: "#FF0000", //แดง
          // "base-100": "#ffffff",
          // info: "#BDE0FE", //ฟ้าเข็ม
          // "info-content": "#BEBEBE",
          // success: "#3dccc7", /** BDE0FE*/
          // warning: "#ffc8dd",
          // error: "#ff003f",
          primary: "#34BFEA", // ฟ้าอ่อนพาสเทล   //พื้นหลังเมนู ปุ่ม search ยืนยัน
          secondary: "#5AB2FF", // น้ำเเงิน
          info: "#76D7EA", // ฟ้าสดใส
          accent: "#ff8900", // สีส้ม        //หัวข้อ ตัวหนังสือhoverเมนู
          neutral: "#F3F9FC", // ฟ้าขาว
          "base-100": "#FFFFFF", // พื้นหลังขาว

          success: "#72d572", // เขียวพาสเทล      //ปุ่ม create save
          warning: "#FCDE70", // เหลืองพาสเทล
          error: "#fe5858", // แดงพาสเทล
          "text-primary": "#333333", // ตัวหนังสือหลัก
          "text-accent": "#FFFFFF", // ตัวหนังสือบนปุ่มหรือพื้นหลังสีเข้ม
          // "base-200": "#778899", // เทาอ่อน
          // "base-300": "#D1D5DB", // เทากลาง
          // ปุ่ม
          "btn-search": "#69C2EE", // ฟ้าอ่อนพาสเทล
          "btn-create": "#FFFFFF", // เขียวพาสเทล
          "btn-update": "#1F9CD6", // ฟ้าเข้ม
          "btn-save": "#B3E5C2", // เขียวพาสเทล

          // ตาราง
          "table-header-bg": "#69C2EE", // สีพื้นหลังของหัวตาราง
          "table-row-bg": "#FFFFFF", // สีพื้นหลังของแถวในตาราง
          "table-row-hover-bg": "#E0F7FA", // สีพื้นหลังของแถวที่เลือก
          "table-border": "#D0D0D0", // สีเส้นขอบของตาราง
          "table-text": "#4A4A4A", // สีข้อความในตาราง
        },
      },
    ],
  },
};
