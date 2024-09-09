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

export default function Drawer() {
  const [open, setOpen] = useState(true);

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
      //label: " Link Web",
      // icon: <TbUserSearch />,
      href: "/aia/opd",
      spacing: false,
      submenu: false,
    },
    {
      id: "2",
      label: " IPD",
      // icon: <GoBrowser />,
      href: "/aia/ipd",
      spacing: false,
      submenu: false,
    },
  ];

  return (
    <div className="">
      <div
        className={`bg-primary h-screen  p-5 pt-8 ${
          open ? "w-[220px]" : "w-20"
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
              className={`text-4xl rounded cursor-pointer block float-center mr-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
              src="/hch-logo.png"
            /> 
          <BsArrowLeftShort
            className={`bg-7u-300 text-black-200 text-3xl rounded-full absolute -right-3 top-9 border  bg-neutral  cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className="">
          <div
            className={`divider divider-warning origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            } `}
          ></div>

          <ul>
            {menuItems.map((menuitem) => (
              <li key={menuitem.id}>
                {/* shot */}
                <Link
                  href={menuitem.href}
                  className={`text-accent text-3xl  flex justify-center gap-x-1  hover:bg-neutral hover:text-base-100 rounded-md mt-4 ${
                    open && "hidden"
                  }`}
                >
                  {menuitem.icon ? menuitem.icon : <AiFillHome />}
                </Link>

                {/* full */}
                <Link
                  href={menuitem.href}
                  className={`text-accent text-2xl  flex gap-x-1 cursor-point p-4 px-5 hover:bg-neutral hover:text-base-100  rounded-md mt-4" ${
                    !open && "hidden"
                  }`}
                >
                  {menuitem.icon ? menuitem.icon : <AiFillHome />}
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
