"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineContactPhone } from "react-icons/md";
import { TbUserSearch } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { GoBrowser } from "react-icons/go";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { MdKeyboardArrowDown , MdKeyboardArrowUp } from "react-icons/md";


export default function Drawer() {
  const [open, setOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };
  // interface MenuItem {
  //     id: string;
  //     icon?: React.ReactNode;
  //     label: string;
  //     href: string;
  //     spacing: boolean;
  //     submenu: boolean;
  //   }

  const menuItems = [
    {
      id: "1",
      label: " OPD",
      // icon: <TbUserSearch />,
      // href: "/aia/opd",
      href: "",
      spacing: false,
      submenu: [
        { id: "1-1", label: "ข้อมูลผู้ป่วย", href: "/aia/opd/chackpatient" },
        { id: "1-2", label: "ตรวจสอบสิทธิ์", href: "/aia/opd/checkeilgible" },
        { id: "1-3", label: "ส่งยอดเคลม", href: "/aia/opd/eilgible" },
        { id: "1-4", label: "วางบิล", href: "/aia/opd/submitBilling" },
        { id: "1-5", label: "สถานะการเคลม", href: "/aia/opd/checkClaimStatus" },
      ],
    },
    // {
    //   id: "2",
    //   label: " IPD",
    //   // icon: <GoBrowser />,
    //   href: "/aia/ipd",
    //   spacing: false,
    //   submenu: "",
    // },
    // {
    //   id: "3",
    //   label: " Pre",
    //   // icon: <GoBrowser />,
    //   href: "/aia/Pre-Author",
    //   spacing: false,
    //   submenu: "",
    // },
  ];

  return (
    <div className="sticky top-0 h-screen  ">
      <div
        className={`bg-primary h-screen  p-5 ${
          open ? "w-[200px]" : "w-20"
        } duration-300 relative`}
      >
        <div className="flex justify-center">
          {/* <Image
              className={`bg-neutral text-4xl rounded cursor-pointer block float-center mr-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
              src="/assets/img/logo.png"
              alt="HCH"
              width={70}
              height={37}
              priority
            /> */}
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
        {open &&
        <h1
          className="font-black text-base-100 text-1xl text-center kanit bg-primary"
          data-theme="mytheme"
        >
          Smart Claim
        </h1>
      }
        <div className="">
          <div
            className={`divider divider-warning origin-left font-medium text-2xl duration-300  ${
              !open && "scale-0"
            } `}
          ></div>

         <ul>
         {/* {menuItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => toggleMenu(item.id)}
            className="w-full text-left px-4 py-2 hover:bg-gray-300"
          >
            {item.label}
          </button>
          {openMenu === item.id && item.submenu && (
            <ul className="pl-4 space-y-1">
              {item.submenu.map((subItem) => (
                <li key={subItem.id}>
                  <Link href={subItem.href}>
                    <h1 className="block px-4 py-2 hover:bg-gray-300">
                      {subItem.label}
                    </h1>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))} */}
         {menuItems.map((menuitem) => (
              <li key={menuitem.id}>
               {/* เมนูตอน พับ */}
                <button
                  onClick={() => toggleMenu(menuitem.id)}
                  className={`text-base-100 text-3xl  flex gap-x-1 self-center  hover:bg-base-100 hover:text-accent rounded-md mt-4 ${
                    open && "hidden"
                  }`}
                >
                  {menuitem.icon ? menuitem.icon : <AiFillHome />}
                </button>

      {/* เมนูตอน เปิด */}
                <button
                  onClick={() => toggleMenu(menuitem.id)}
                  className={`text-base-100 text-xl  flex gap-x-1 cursor-point p-4 px-5 hover:bg-base-100 hover:text-accent w-full  rounded-md mt-4 " ${
                    !open && "hidden"
                  }`}
                >
                  {menuitem.icon ? menuitem.icon : <AiFillHome />}
                  {menuitem.label} <div className="text-right">{menuitem.submenu ? (openMenu ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />) : ""}</div>
                  
                </button>
                {open && openMenu === menuitem.id && menuitem.submenu && (
            <ul className="bg-base-100 rounded-lg border-2">
              {menuitem.submenu.map((subItem) => (
                <li key={subItem.id}>
                  <Link href={subItem.href}>
                    {/* เมนู ย่อย */}
                    <h1 className="block text-primary rounded-lg m-0.5 mt-1 px-3 hover:text-base-100 hover:bg-secondary">
                    <div className="flex items-center "><IoArrowForwardCircleSharp />&nbsp;{subItem.label}</div>
                    </h1>
                  </Link>
                </li>
              ))}
            </ul>
          )}
              </li>
            ))} 
          </ul> 
        </div>
      </div>
    </div>
  );
}
