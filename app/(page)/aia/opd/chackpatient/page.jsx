"use client";
import React, { useContext, useEffect } from "react";
import SelectPatient from "../../../../components/aia/opd/chackpatient/selectPatient";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { save } from "../../../../store/counterSlice";
export default function Home() {
  // const transaction = useContext(DataContext);
  // console.log(transaction);
  const { DataTran } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const initialState = {
    value: "",
    Data: "",
  };
  useEffect(() => {
    dispatch(save(initialState));
  });
  //console.log(DataTran);
  return (
    <>
      <div>
        <SelectPatient />
      </div>
    </>
  );
}
