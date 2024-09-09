// import { Kanit } from "next/font/google";
// import "./globals.css";
import { Providers } from "../../../store/provider";

// import MenuTabopd from "../../../components/aia/opd/MenuTabopd";
import Drawer from "../../../components/aia/layout/drawer";
import Navbar from "../../../components/aia/layout/navbar";
import Link from "next/link";
// import Navbar from "./components/Navbar";

export default function layout({ children }) {
  return (
    <div>
      {/* <div className=""> */}
      {/* <Providers> */}
      {/* <div className="bg-green-500">
            <Drawer />
          </div>
          <div className="p-4 bg-red-500"> */}
      {/* <div className="sticky top-0 shadow-md "> */}
      {/* <Navbar /> */}
      {/* </div> */}
      {/* <MenuTabopd /> */}
      {/* <div className="p-2">{children}</div> */}
      {/* </div> */}
      {/* </Providers> */}
      <Providers>
        <div className="flex flex-col h-screen">
          {/* Navigation Menu */}
          {/* <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav> */}
          <Navbar />
          <div className="flex flex-1">
            {/* Sidebar */}
            {/* <aside className="bg-gray-200 w-1/4 p-4">
              <h2 className="font-bold">News</h2>
              <ul>
                <li>
                  <a href="#">News Item 1</a>
                </li>
                <li>
                  <a href="#">News Item 2</a>
                </li>
                <li>
                  <a href="#">News Item 3</a>
                </li>
              </ul>
            </aside> */}
            <Drawer />
            {/* Main Content */}
            <main className="bg-white flex-1 p-4">{children}</main>
          </div>
        </div>
      </Providers>
      {/* <Drawer /> */}

      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
