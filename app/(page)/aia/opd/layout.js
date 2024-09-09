"use client"
// import { Kanit } from "next/font/google";
// import "./globals.css";
import { Providers } from "../../../store/provider";

// import MenuTabopd from "../../../components/aia/opd/MenuTabopd";
import Drawer from "../../../components/aia/layout/drawer";
import Navbar from "../../../components/aia/layout/navbar";
import Link from "next/link";
import { useState } from "react";


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
          {/* <Navbar /> */}
          <div className="flex flex-1">
            <Drawer />
            <main className="bg-white flex-1 p-4">{children}</main>
          </div>
        </div>
      </Providers>




    </div>

  );
}
