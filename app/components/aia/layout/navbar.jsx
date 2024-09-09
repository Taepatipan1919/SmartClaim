import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

export default function navbar() {
  return (
   
     <div className="navbar">
     {/* <div className="navbar bg-base-100 sticky flex justify-between items-center top-1 shadow-md"> */}
      <div className="flex-1">
        <h1
          className="font-black text-accent text-5xl px-3 kanit"
          data-theme="mytheme"
        >
          Smart <span className="text-neutral kanit">Claim</span>
        </h1>
        <Link
          href={`/aia/opd/chackpatient`}
          className="btn bg-white text-accent ml-2 hover:bg-neutral hover:text-base-100"
        >
          ข้อมูลผู้ป่วย
        </Link>
        <Link
          href={`/aia/opd/checkeilgible`}
          className="btn bg-white text-accent ml-2 hover:bg-neutral hover:text-base-100"
        >
          ตรวจสอบสิทธิ์
        </Link>
        <Link
          href={`/aia/opd/eilgible`}
          className="btn bg-white text-accent ml-2 hover:bg-neutral hover:text-base-100"
        >
          ส่งยอดเคลม
        </Link>
        <Link
          href={`/aia/opd/submitBilling`}
          className="btn bg-white text-accent ml-2 hover:bg-neutral hover:text-base-100"
        >
          วางบิล
        </Link>
        <Link
          href={`/aia/opd/checkClaimStatus`}
          className="btn bg-white text-accent ml-2 hover:bg-neutral hover:text-base-100"
        >
          สถานะการเคลม
        </Link>
      </div>
      {/* <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-3xl btn-circle avatar"
          >
            <IoMdSettings />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>New linkweb</a>
            </li>
            <li>
              <a>Edit linkweb</a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}
