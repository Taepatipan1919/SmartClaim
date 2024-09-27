import React, { useContext } from "react";
import { DataContext } from "./../../../(page)/aia/opd/page";
import Link from "next/link";

function MenuTabopd() {
  // const transaction = useContext(DataContext);
  // const data = transaction;
  //console.log(transaction);
  return (
    <>
      <ul className="menu menu-horizontal border-solid w-11/12 m-auto p-4">
        <li>
          <Link
            href={`/aia/opd/chackpatient`}
            className="btn bg-white text-accent w-full"
          >
            ข้อมูลผู้ป่วย
          </Link>
        </li>
        <li>
          <Link
            href={`/aia/opd/checkeligible`}
            className="btn bg-white text-accent w-full"
          >
            ตรวจสอบสิทธิ์
          </Link>
        </li>
        <li>
          <Link
            href={`/aia/opd/eligible`}
            className="btn bg-white text-accent w-full"
          >
            ส่งยอดเคลม
          </Link>
        </li>
        <li>
          <Link
            href={`/aia/opd/submitBilling`}
            className="btn bg-white text-accent w-full"
          >
            วางบิล
          </Link>
        </li>
        <li>
          <Link
            href={`/aia/opd/checkClaimStatus`}
            className="btn bg-white text-accent w-full"
          >
            สถานะการเคลม
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MenuTabopd;
