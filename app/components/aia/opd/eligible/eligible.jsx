"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";

import Link from "next/link";
import { FaSearch } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { save } from "../../../../store/counterSlice";
// import { useSelector } from "react-redux";


import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';


export default function chackData() {
  const InsuranceCode = 13;
  const [post, setPost] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = {
      datefrom: event.target.datefrom.value,
      dateto: event.target.dateto.value,
      PID: event.target.PID.value,
      HN: event.target.HN.value,
      VN: event.target.VN.value,
      invoice: event.target.invoice.value,
    };
    console.log(search);
    //   axios
    //     .get(process.env.NEXT_PUBLIC_URL_chackpatient)
    //     .then((response) => {
    //       setPost(response.data);
    //     })
    //     .catch((err) => console.error("Error", err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-1 sm:grid-cols-4 w-full mt-2">
       <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="วันที่เข้ารับการรักษา"
            format="YYYY-MM-DD"
            className="input-info"
            required
          />
        </LocalizationProvider> 

          <div className="px-2 rounded-md">
          <TextField
          id="standard-multiline-flexible"
          label="VN"
          multiline
          maxRows={4}
          variant="standard"
          className="w-full"
          name="PID"
          type="text"
        />
          </div>
          <div className="px-2 rounded-md">
          <TextField
          id="standard-multiline-flexible"
          label="Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-full"
          name="PID"
          type="text"
        />
          </div>
          <div className="px-2 rounded-md">
            <button className="btn btn-primary text-base-100 text-lg rounded-full px-3 py-2" type="submit">
            <FaSearch /> Search
            </button>
          </div>
      </div>
    </form>

      <div className="justify-center border-solid m-auto border-4 rounded-lg p-4 mt-6">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-info text-base-100 text-center text-lg">
              <tr>
                <th></th>
                <th>HN</th>
                <th>เลขกรมธรรม์</th>
                <th>หมายเลขธุรกรรม</th>
                <th>ชื่อ-นามสกุล</th>
                <th>ประเภทการเคลม</th>
                <th>ประเภทประกัน</th>
                <th>วันที่เข้ารับรักษา</th>
                <th>เลขที่ใบแจ้งหนี้</th>
                <th>สถานะ</th>
                <th>ส่งยอดเคลม</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover text-center">
                <th>1</th>
                <td>035567-65</td>
                <td>P330014290</td>
                <td>3fa899e7c10d2wewq4r8eqw2</td>
                <td>ปฏิภาณ ไขไพรวัน</td>
                <td>เจ็บป่วย</td>
                <td>รายบุคคล</td>
                <td>14/12/2024 09:36</td>
                <td>C051275-66</td>
                <td>
                  <div className="bg-success text-base-100 rounded-full px-3 py-2">
                    ได้รับเอกสารแล้ว
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-primary bg-base-100 text-info hover:text-base-100"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    ส่งยอดเคลม
                  </button>
                  <dialog id="my_modal_3" className="modal text-xl	">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>

                                <h3 className="font-bold text-lg">
                                  ข้อมูลการส่งเคลม
                                </h3>
                                <hr />
                                <div className="flex pt-3 text-xl">
                                  <input
                                    type="radio"
                                    name="exampleRadios"
                                    defaultChecked
                                  />
                                  <p className="text-left">
                                    &nbsp;เข้ารักษาครั้งแรก
                                  </p>
                                </div>
                                <div className="flex text-xl">
                                  <input type="radio" name="exampleRadios" />
                                  <p className="text-left">
                                    &nbsp;เข้ารักษาแบบต่อเนื่อง
                                  </p>
                                </div>
                                <div className="flex text-xl">
                                  <select className="select select-bordered w-64 max-w-xs">
                                    <option></option>
                                  </select>
                                </div>

                                <div className="modal-action">
                                  {/* <Link
                                    href={`./ipd/eligible/${post.PatientInfo.HN}`}
                                  > */}
                                    <button className="btn btn-neutral text-base-100">
                                      ยืนยัน
                                    </button>
                                  {/* </Link> */}
                                </div>
                              </form>
                            </div>
                          </dialog>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
