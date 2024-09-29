"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import ChackData from "../../../../components/aia/opd/checkeilgible/chackData";
import CheckClaimStatus from "../../../../components/aia/opd/checkClaimStatus/checkClaimStatus";
import SubmitClaimStatus from "../../../../components/aia/opd/checkClaimStatus/submitClaimStatus";
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
        สถานะการเคลม
      </h1>
    
      <div className="breadcrumbs text-xl">
  <ul>
    <li>ข้อมูลผู้ป่วย</li>
    <li><a className="text-error underline ">สถานะการเคลม</a></li>
  </ul>
</div>
<CheckClaimStatus />
    {/* value : {DataTran.DataTran.value}
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
                  <h1 className="font-black text-accent text-3xl " data-theme="mytheme">สถานะการเคลม</h1>

<div className="breadcrumbs text-xl">
<ul>
<li><a className="text-error underline ">สถานะการเคลม</a></li>
</ul>
</div>
<SubmitClaimStatus />
    </>)
    }

    

    </>
  );
}
