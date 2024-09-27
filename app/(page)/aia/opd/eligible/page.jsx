"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import SelectPatient from "../../../../components/aia/opd/chackpatient/selectPatient";
import eligible from "../../../../components/aia/opd/eligible/eligible";
import OpdDischarge from "../../../../components/aia/opd/eligible/opdDischarge";
import ChackData from "../../../../components/aia/opd/checkeilgible/chackData";

export default function Home() {
   const  DataTran  = useSelector((state) => ({ ...state }));
   //console.log(DataTran)

  return (
    <> 
    {DataTran.Patient.value === "มีรายชื่อ" ? (
    <>

{DataTran.DataTran.value === "มีข้อมูล" ? (
    <>
                                 <h1
        className="font-black text-accent text-3xl "
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
               <OpdDischarge data={DataTran}/>
            {/* value : {DataTran.DataTran.value}
          <hr />
          VN : {DataTran.DataTran.Data.VN}
          <br />
          RefId : {DataTran.DataTran.Data.RefId}
          <br /> */}
    </>
    ) : (
         <>
          {/* <eligible /> */}
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
<ChackData />
    {/* value : {DataTran.DataTran.value}
      <hr />
      VN : {DataTran.DataTran.Data.VN}
      <br />
      RefId : {DataTran.DataTran.Data.RefId}
      <br />
      TransactionNo : {DataTran.DataTran.Data.TransactionNo}
      <br />  */}
          </>
    )}

    </>) : 
    (
    <>
                  <h1 className="font-black text-accent text-3xl " data-theme="mytheme">ข้อมูลผู้ป่วย</h1>

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
