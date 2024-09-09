"use client";
import { useState, createContext } from "react";
// import { useSelector } from "react-redux";
import SubmitBilling from "../../../../components/aia/opd/submitBilling/submitBilling";
export default function Home() {
  // const { DataTran } = useSelector((state) => ({ ...state }));

  // const handlebutton = () => {
  //   dispatch(save(initialState));
  //   //console.log("sad")
  // };

  return (
    <>
  <SubmitBilling />
      {/* value : {DataTran.value}
      <hr />
      VN : {DataTran.Data.VN}
      <br />
      RefId : {DataTran.Data.RefId}
      <br />
      TransactionNo : {DataTran.Data.TransactionNo}
      <br /> */}
    </>
  );
}
