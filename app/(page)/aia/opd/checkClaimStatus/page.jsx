"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
export default function Home() {
  const { DataTran } = useSelector((state) => ({ ...state }));

  const handlebutton = () => {
    dispatch(save(initialState));
    //console.log("sad")
  };

  return (
    <>
      value : {DataTran.value}
      <hr />
      VN : {DataTran.Data.VN}
      <br />
      RefId : {DataTran.Data.RefId}
      <br />
      TransactionNo : {DataTran.Data.TransactionNo}
      <br />
    </>
  );
}
