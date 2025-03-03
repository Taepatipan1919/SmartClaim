import { Kanit } from "next/font/google";
import "./globals.css";
// import { Providers } from "./store/provider";
// import MenuTabOpd from "@/app/components/aia/Opd/MenuTabOpd";
// import Navbar from "./components/Navbar";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "300", "700"],
  variable: "--font-kanit",
});

export const metadata = {
  title: "Smart Claim",
  description: "HCH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <body className={kanit.variable}>
        {/* <Navbar /> */}
        {/* <Providers> */}
          {/* <MenuTabOpd /> */}
          <div className="kanit">{children}</div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
