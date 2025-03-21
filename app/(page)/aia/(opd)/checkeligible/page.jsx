"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import CheckData from "../../../../components/aia/checkeilgible/checkData";
import SelectPatient from "../../../../components/aia/checkpatient/selectPatient";

export default function Home() {
  const DataTran  = useSelector((state) => ({ ...state }));
//console.log(DataTran)


  return (
    <>

    {DataTran.Patient.value === "มีรายชื่อ" ? (
    <>
                 <h1
        className="font-black text-accent text-3xl "
        data-theme="mytheme"
      >
        ตรวจสอบสิทธิ์
      </h1>
    
      <div className="breadcrumbs text-xl">
  <ul>
    <li>ข้อมูลผู้ป่วย</li>
    <li><a className="text-error underline ">ตรวจสอบสิทธิ์</a></li>
  </ul>
</div>
    <CheckData />
    </>
    ) : 
    (
    <>
              <h1 className="font-black text-accent text-3xl " data-theme="mytheme">ข้อมูลผู้ป่วย</h1>

      <div className="breadcrumbs text-xl">
  <ul>
    <li><a className="text-error underline ">ข้อมูลผู้ป่วย</a></li>
  </ul>
</div>
    <SelectPatient />
    </>
    )
    }

    

    </>
  );
}
