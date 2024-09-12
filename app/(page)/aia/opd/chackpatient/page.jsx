"use client";
import React, { useContext, useEffect } from "react";
import SelectPatient from "../../../../components/aia/opd/chackpatient/selectPatient";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { save } from "../../../../store/counterSlice";
import { save2 } from "../../../../store/patientSlice";
import Navbar from "../../../../components/aia/layout/navbar";
export default function Home() {
  // const transaction = useContext(DataContext);
  // console.log(transaction);
  //const { DataTran } = useSelector((state) => ({ ...state }));
  //const { patient } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const initialState = {
    value: "ไม่มีข้อมูล",
    Data: {},
  };
  const initialState2 = {
    value: "ไม่มีรายชื่อ",
    Data: {},
  };
  // const PatientB = () => {
  //   dispatch(save2({
  //     value: "มีรายชื่อ",
  //     Data: 
  //   {
  //     "InsurerCode": 13,
  //     "datefrom": "",
  //     "dateto": "",
  //     "IdType": "PASSPORT_NO",
  //     "PID": "1103900068701",
  //     "HN": "66-021995",
  //     "ClaimStatusCode": ""
  //   },
  // }));
  // };

  useEffect(() => {
     dispatch(save(initialState));
     dispatch(save2(initialState2));
  });
  //console.log(DataTran);
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <SelectPatient />
        {/* <button onClick={PatientB}>Click</button> */}
      </div>
    </>
  );
}
