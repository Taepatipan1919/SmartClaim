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
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
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
    // {
    //   id: "1",
    //   label: " OPD",
    //   // icon: <TbUserSearch />,
    //   //href: "/aia",
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
      //icon: <GoBrowser />,
      href: "/aia/checkeilgible",
      spacing: true,
      submenu: false,
    },
    {
      id: "4",
      label: "สถานะการเคลม",
      //icon: <GoBrowser />,
      href: "/aia/checkClaimStatus",
      spacing: false,
      submenu: false,
    },
    {
      id: "5",
      label: "วางบิล",
      //icon: <GoBrowser />,
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
              // หัวข้อ
              <li key={menuitem.id}>
                {/* เมนูตอน พับ */}
                <button
                  onClick={() => toggleMenu(menuitem.id)}
                  className={`text-base-100 text-3xl  flex gap-x-1 self-center  hover:bg-base-100 hover:text-accent rounded-md mt-4 ${
                    open && "hidden"
                  }`}
                >
                  
                <AiFillHome />
                </button>

                {/* เมนูตอน เปิด */}
                <button
                  onClick={() => toggleMenu(menuitem.id)}
                  className={`text-base-100 text-xl  flex gap-x-1 cursor-point p-4 px-5 hover:bg-base-100 hover:text-accent w-full  rounded-md mt-4 " ${
                    !open && "hidden"
                  }`}
                >
             

                  {menuitem.label}
                  {/* {" "}
                  <div className="text-right">
                    {menuitem.submenu ? (
                      openMenu ? (
                        
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )
                    ) : (
                      ""
                    )}
                  </div> */}
                </button>
                
              {/* เมนู ย่อยตอนปิด */}
                {!open && openMenu === menuitem.id && menuitem.submenu && (
                  <ul className="bg-base-100 rounded-lg border-2  w-full">
                    {menuitem.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link href={subItem.href}>
                          <h1 className="block text-primary rounded-lg mt-1 w-full hover:text-base-100 hover:bg-secondary">
                            <div className="flex items-center">
                            <div
                                    className="tooltip tooltip-right relative md:z-50 z-0"
                                    data-tip={subItem.label}
                                  >
                                    <h1
                                      className="text-2xl mt-2 p-2"
                                    >
                              <IoDocumentText />
                                    </h1>
                                  </div>
                             
                            </div>
                          </h1>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                       {/* เมนู ย่อยตอนเปิด */}
                {open && openMenu === menuitem.id && menuitem.submenu && (
                  <ul className="bg-base-100 rounded-lg border-2">
                    {menuitem.submenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link href={subItem.href}>
                   
                          <h1 className="block text-primary rounded-lg m-0.5 mt-1 px-3 hover:text-base-100 hover:bg-secondary">
                            <div className="flex items-center ">
                              
                              <IoArrowForwardCircleSharp />
                              &nbsp;{subItem.label}
                            </div>
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
