"use client";
import { useState, createContext } from "react";
// import { useSelector } from "react-redux";
import Eilgible from "../../../../components/aia/opd/eilgible/eilgible";
export default function Home() {
  // const { DataTran } = useSelector((state) => ({ ...state }));

  // const handlebutton = () => {
  //   dispatch(save(initialState));
  //   //console.log("sad")
  // };

  return (
    <>
    <Eilgible />
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
