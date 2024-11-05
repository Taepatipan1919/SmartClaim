"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import SubmitBilling from "../../../../components/aia/ipd/submitBilling/submitBilling";
import SelectPatient from "../../../../components/aia/ipd/checkpatient/selectPatient";

export default function Home() {
   const DataTran  = useSelector((state) => ({ ...state }));

  // const handlebutton = () => {
  //   dispatch(save(initialState));
  //   //console.log("sad")
  // };

  return (
    <>
        {/* {DataTran.Patient.value === "มีรายชื่อ" ? (
    <> */}
                                 <h1
        className="font-black text-accent text-3xl "
        data-theme="mytheme"
      >
        IPD - วางบิล
      </h1>
    
      <div className="breadcrumbs text-xl">
  <ul>
  <li>ข้อมูลผู้ป่วย</li>
    <li>ตรวจสอบสิทธิ์</li>
    <li>ส่งยอดเคลม</li>
    <li><a className="text-error underline ">วางบิล</a></li>
  </ul>
</div>
  {/* <Billing />
    </>
    ) : (
      <>
      <h1 className="font-black text-accent text-3xl " data-theme="mytheme">วางบิล</h1>

<div className="breadcrumbs text-xl">
<ul>
<li><a className="text-error underline ">วางบิล</a></li>
</ul>
</div> */}
<SubmitBilling />
{/* <SelectPatient /> */}
{/* </>
)} */}

</>
  );
}
