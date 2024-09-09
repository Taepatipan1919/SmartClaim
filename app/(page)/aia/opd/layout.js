// import { Kanit } from "next/font/google";
// import "./globals.css";
import { Providers } from "../../../store/provider";

// import MenuTabopd from "../../../components/aia/opd/MenuTabopd";
import Drawer from "../../../components/aia/layout/drawer";
import Navbar from "../../../components/aia/layout/navbar";

// import Navbar from "./components/Navbar";

export default function layout({ children }) {
  return (
    <div>
      <div className="flex flex-row sticky">
        <Providers>
          <div className="sticky">
            <Drawer />
          </div>
          <div className="p-4 ">
            <div className="sticky top-0 shadow-md ">
              <Navbar />
            </div>
            {/* <MenuTabopd /> */}
            <div className="p-2">{children}</div>
          </div>
        </Providers>
      </div>
    </div>
  );
}
