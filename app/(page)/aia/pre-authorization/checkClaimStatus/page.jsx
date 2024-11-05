"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import CheckData from "../../../../components/aia/pre-authorization/checkeilgible/checkData";
import SubmitClaimStatus from "../../../../components/aia/pre-authorization/checkClaimStatus/submitClaimStatus";
import SelectPatient from "../../../../components/aia/pre-authorization/checkpatient/selectPatient";
export default function Home() {
  const DataTran  = useSelector((state) => ({ ...state }));
//console.log(DataTran)


  return (
    <>
    {/* {DataTran.Patient.value === "มีรายชื่อ" ? (
    <> */}
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
{/* <CheckClaimStatus />
    </>) : 
    (
    <>
                  <h1 className="font-black text-accent text-3xl " data-theme="mytheme">สถานะการเคลม</h1>

<div className="breadcrumbs text-xl">
<ul>
<li><a className="text-error underline ">สถานะการเคลม</a></li>
</ul>
</div> */}
<SubmitClaimStatus />
{/* <SelectPatient /> */}
    {/* </>)
    } */}

    

    </>
  );
}
