"use client";
import React, { useContext, useEffect } from "react";
import SelectPatient from "../../../../components/aia/checkpatient/selectPatient";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { save } from "../../../../store/counterSlice";
import { save2 } from "../../../../store/patientSlice";
// import Navbar from "../../../../components/aia/layout/navbar";
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


  useEffect(() => {
     dispatch(save(initialState));
     dispatch(save2(initialState2));
  });
  //console.log(DataTran);
  return (
    <>
          <h1
        className="font-black text-accent text-3xl "
        data-theme="mytheme"
      >
        ข้อมูลผู้ป่วย
      </h1>
      <div>
      <div className="breadcrumbs text-xl">
  <ul>
    <li><a className="text-error underline ">ข้อมูลผู้ป่วย</a></li>
  </ul>
</div>
        {/* <Navbar /> */}
        <SelectPatient />
        {/* <button onClick={PatientB}>Click</button> */}
      </div>
    </>
  );
}
