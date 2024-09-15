"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import SelectPatient from "../../../../components/aia/opd/chackpatient/selectPatient";
import Eilgible from "../../../../components/aia/opd/eilgible/eilgible";
import OpdDischarge from "../../../../components/aia/opd/eilgible/opdDischarge";

export default function Home() {
   const  DataTran  = useSelector((state) => ({ ...state }));
   //console.log(DataTran)

  return (
    <> 
    {DataTran.Patient.value === "มีรายชื่อ" ? (
    <>
                             <h1
        className="font-black text-secondary text-5xl"
        data-theme="mytheme"
      >
        ส่งยอดเคลม
      </h1>
    
      <div className="breadcrumbs text-xl">
  <ul>
  <li>ข้อมูลผู้ป่วย</li>
    <li>ตรวจสอบสิทธิ์</li>
    <li><a className="text-error underline ">ส่งยอดเคลม</a></li>
  </ul>
</div>
{DataTran.Patient.value === "มีรายชื่อ" ? (
    <>
    <Eilgible />
    </>
    ) : (
         <>
            <OpdDischarge />
            value : {DataTran.DataTran.value}
          <hr />
          VN : {DataTran.DataTran.Data.VN}
          <br />
          RefId : {DataTran.DataTran.Data.RefId}
          <br />
          </>
    )}
                     {/* <h1
        className="font-black text-secondary text-5xl"
        data-theme="mytheme"
      >
        ตรวจสอบสิทธิ์
      </h1>
    
      <div className="breadcrumbs text-xl">
  <ul>
    <li>ข้อมูลผู้ป่วย</li>
    <li>ตรวจสอบสิทธิ์</li>
    <li><a className="text-error underline ">ส่งยอดเคลม</a></li>
  </ul>
</div>
   
    value : {DataTran.DataTran.value}
      <hr />
      VN : {DataTran.DataTran.Data.VN}
      <br />
      RefId : {DataTran.DataTran.Data.RefId}
      <br />
      TransactionNo : {DataTran.DataTran.Data.TransactionNo}
      <br /> */}
    </>) : 
    (
    <>
                  <h1 className="font-black text-secondary text-5xl" data-theme="mytheme">ข้อมูลผู้ป่วย</h1>

<div className="breadcrumbs text-xl">
<ul>
<li><a className="text-error underline ">ข้อมูลผู้ป่วย</a></li>
</ul>
</div>
<SelectPatient />
    </>)
    }

    

    </>

  );
}
