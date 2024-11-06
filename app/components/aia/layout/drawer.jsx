"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import { GoBrowser } from "react-icons/go";
import { GrTable } from "react-icons/gr";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
export default function Drawer() {
  const [open, setOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  // const toggleMenu = (id) => {
  //   setOpenMenu(openMenu === id ? null : id);
  // };
  // interface MenuItem {
  //     id: string;
  //     icon?: React.ReactNode;
  //     label: string;
  //     href: string;
  //     spacing: boolean;
  //     submenu: boolean;
  //   }

  const menuItems = [
    // {
    //   id: "1",
    //   label: " OPD",
    //   // icon: <TbUserSearch />,
    //   //href: "/aia/",
    //   href: "",
    //   spacing: false,
    //   submenu: [
    //     { id: "1-1", label: "ข้อมูลผู้ป่วย", href: "/aia/checkpatient" },
    //     { id: "1-2", label: "ตรวจสอบสิทธิ์", href: "/aia/checkeligible" },
    //     { id: "1-3", label: "ส่งยอดเคลม", href: "/aia/eligible" },
    //     { id: "1-4", label: "สถานะการเคลม", href: "/aia/checkClaimStatus" },
    //     { id: "1-5", label: "วางบิล", href: "/aia/submitBilling" },
    //   ],
    // },
    {
      id: "2",
      label: "ตรวจสอบสิทธิ์",
      icon: <TbUserSearch />,
      href: "/aia/checkeligible",
      spacing: true,
      submenu: false,
    },
    {
      id: "4",
      label: "สถานะการเคลม",
      icon: <GrTable  />,
      href: "/aia/checkClaimStatus",
      spacing: false,
      submenu: false,
    },
    {
      id: "5",
      label: "วางบิล",
      icon: <IoDocumentText />,
      href: "/aia/submitBilling",
      spacing: false,
      submenu: false,
    },
  ];

  return (
    <div className="sticky top-0 h-screen  ">
      <div
        className={`bg-primary h-screen  p-5 ${
          open ? "w-[200px]" : "w-20"
        } duration-300 relative`}
      >
        <div className="flex justify-center">
          <img
            className={`text-4xl rounded cursor-pointer block float-center self-center duration-500 ${
              open && "rotate-[360deg]"
            }`}
            src="/hch-logo.png"
          />
          <BsArrowLeftShort
            className={`bg-7u-300 mt-6 text-black-200 text-3xl rounded-full absolute -right-3 top-9 text-base-100  bg-info  cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && (
          <h1
            className="font-black text-base-100 text-1xl text-center kanit bg-primary"
            data-theme="mytheme"
          >
            Smart Claim
          </h1>
        )}
        <div className="">
          <div
            className={`divider divider-warning origin-left font-medium text-2xl duration-300  ${
              !open && "scale-0"
            } `}
          ></div>

          <ul>
          {menuItems.map((menuitem) => (
              <li  key={menuitem.id}>
              {/* shot */}
                <Link href={menuitem.href}  className={`text-neutral text-3xl  flex justify-center p-1  hover:bg-neutral hover:text-info rounded-md mt-4 ${ open && "hidden"}`}> 
                {menuitem.icon ? menuitem.icon : <AiFillHome />} 
                </Link>
                
                {/* full */}
                <Link href={menuitem.href} className={`text-neutral text-lg  flex gap-x-1 cursor-point p-2 px-5 hover:bg-neutral hover:text-info  rounded-md mt-4" ${ !open && "hidden"  }`} >
                   {menuitem.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
