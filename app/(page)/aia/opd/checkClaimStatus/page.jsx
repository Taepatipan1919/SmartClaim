"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import ChackData from "../../../../components/aia/opd/checkeilgible/chackData";
import SelectPatient from "../../../../components/aia/opd/chackpatient/selectPatient";

export default function Home() {
  const DataTran  = useSelector((state) => ({ ...state }));
console.log(DataTran)


  return (
    <>
    {DataTran.Patient.value === "มีรายชื่อ" ? (
    <>
    <ChackData />
    value : {DataTran.DataTran.value}
      <hr />
      VN : {DataTran.DataTran.Data.VN}
      <br />
      RefId : {DataTran.DataTran.Data.RefId}
      <br />
      TransactionNo : {DataTran.DataTran.Data.TransactionNo}
      <br />
    </>) : 
    (
    <>
    <SelectPatient />
    </>)
    }

    

    </>
  );
}
