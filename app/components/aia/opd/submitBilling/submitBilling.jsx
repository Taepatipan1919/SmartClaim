"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import { save } from "../../../../store/counterSlice";
// import { useSelector } from "react-redux";

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
    console.log(search)
  //   axios
  //     .get(process.env.NEXT_PUBLIC_URL_chackpatient)
  //     .then((response) => {
  //       setPost(response.data);
  //     })
  //     .catch((err) => console.error("Error", err));
   };
   const handleSubmit2 = (event) => {
    event.preventDefault();
    const search = {
      datefrom: event.target.datefrom.value,
      dateto: event.target.dateto.value,
      PID: event.target.PID.value,
      HN: event.target.HN.value,
      VN: event.target.VN.value,
      invoice: event.target.invoice.value,
    };
    console.log(search)
  //   axios
  //     .get(process.env.NEXT_PUBLIC_URL_chackpatient)
  //     .then((response) => {
  //       setPost(response.data);
  //     })
  //     .catch((err) => console.error("Error", err));
   };


  return (
    <>
    <div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab text-secondary" aria-label="รายการที่ยังไม่วางบิล" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    
  <form onSubmit={handleSubmit}>
          <div className="grid gap-1 sm:grid-cols-4 w-full">
            <div className="px-2 rounded-md">
              <p className="text-left">DateFrom</p>
              <input
                type="date"
                name="datefrom"
                id="datefrom"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">DateTo</p>
              <input
                type="date"
                name="dateto"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">บัตรประชาชน / พาสปอร์ต</p>
              <input
                type="text"
                name="PID"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">HN</p>
              <input
                type="text"
                name="HN"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">VN</p>
              <input
                type="text"
                name="VN"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">เลขที่ใบแจ้งหนี้</p>
              <input
                type="text"
                name="invoice"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
            </div>
            <div className="rounded-md pt-6"> 
              <div className="grid gap-1 sm:grid-cols-2 w-full">
                <div className="rounded-md">
                  <button className="btn btn-secondary text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-secondary">
                    <FaSearch /> ค้นหา
                  </button>
                </div>
                <div className="rounded-md"></div>
              </div>
            </div>
          </div>
        </form>
  </div>

  <input
    type="radio"
    name="my_tabs_2"
    role="tab"
    className="tab text-green-600"
    aria-label="รายการที่วางบิลแล้ว"
    defaultChecked />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    
  <form onSubmit={handleSubmit2}>
          <div className="grid gap-1 sm:grid-cols-4 w-full">
            <div className="px-2 rounded-md">
              <p className="text-left">DateFrom</p>
              <input
                type="date"
                name="datefrom"
                id="datefrom"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">DateTo</p>
              <input
                type="date"
                name="dateto"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">บัตรประชาชน / พาสปอร์ต</p>
              <input
                type="text"
                name="PID"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">HN</p>
              <input
                type="text"
                name="HN"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">VN</p>
              <input
                type="text"
                name="VN"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">เลขที่ใบแจ้งหนี้</p>
              <input
                type="text"
                name="invoice"
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
            </div>
            <div className="rounded-md pt-6"> 
              <div className="grid gap-1 sm:grid-cols-2 w-full">
                <div className="rounded-md">
                <button className="btn btn-success text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-success">
                    <FaSearch /> ค้นหา
                  </button>
                </div>
                <div className="rounded-md"></div>
              </div>
            </div>
          </div>
        </form>
  </div>

</div>



        <div className="justify-center border-solid m-auto border-4 rounded-lg p-4 mt-6">
        <div className="overflow-x-auto">
          <table className="table">
    <thead className="bg-info text-base-100 text-center text-lg">
      <tr>
        <th></th>
        <th>ชื่อ-นามสกุล</th>
        <th>HN</th>
        <th>เลขที่การเคลม</th>
        <th>เลขที่ใบแจ้งหนี้</th>
        <th>ประเภทการเคลม</th>
        <th>ประเภทการเคลม</th>
        <th>รายการสถานะการเคลม</th>
        <th>สถานะ</th>
        <th>ยอดเงิน</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover text-center">
      <th>1</th>
      <td>ปฏิภาณ ไขไพรวัน</td>
      <td>035567-65</td>
      <td>C50042420</td>
      <td>C051275-66</td>
      <td>อุบัติเหตุ</td>
    <td><button className="btn bg-base-100 border-base-100 text-info"><LuRefreshCw /></button><button className="btn bg-base-100 border-base-100 text-info ml-2"><IoDocumentText /></button></td>
        <td><div className="bg-success text-base-100 rounded-full px-3 py-2">จ่ายเงินสินไหมทดแทนแล้ว</div></td>
        <th>2,299.00</th>
        <td><button className="btn btn-primary bg-base-100 text-info hover:text-base-100">วางบิล</button></td>
       
      </tr>
    </tbody>
  </table>
  
</div>
</div>
    </>
  );
}
