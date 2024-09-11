"use client";
import React, { useContext, useEffect } from "react";
import SelectPatient from "../../../../components/aia/opd/chackpatient/selectPatient";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { save } from "../../../../store/counterSlice";
import { save2 } from "../../../../store/patientSlice";
export default function Home() {
  // const transaction = useContext(DataContext);
  // console.log(transaction);
  const { DataTran } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const initialState = {
    value: "",
    Data: "",
  };

  const PatientB = () => {
    dispatch(save2({
      value: "มีรายชื่อ",
      Data: 
    {
      "InsurerCode": 13,
      "datefrom": "",
      "dateto": "",
      "IdType": "PASSPORT_NO",
      "PID": "1103900068701",
      "HN": "66-021995",
      "ClaimStatusCode": ""
    },
  }));
  };

  useEffect(() => {
     dispatch(save(initialState));
    
  });
  //console.log(DataTran);
  return (
    <>
      <div>
        <SelectPatient />
        <button onClick={PatientB}>Click</button>
      </div>
    </>
  );
}
