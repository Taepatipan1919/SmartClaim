"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import TextField from '@mui/material/TextField';
// import { useDispatch } from "react-redux";
// import { save } from "../../../../store/counterSlice";
// import { useSelector } from "react-redux";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function chackData() {
  const InsuranceCode = 13;
  const DatefromValue = "";
  const DateToValue = "";
  const [post, setPost] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("NATIONAL_ID");
  const [pidValue, setPidValue] = useState("");
  const [vnValue, setVNValue] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");

  const handleOptionChange = (e) => {
    setSelectedIdType(e.target.value);
  };


  
  const handleSubmit = (event) => {
    event.preventDefault();
    setPost();



    if (event.target.T1.value || event.target.T2.value){

    //  const DatefromValue = dayjs(event.target.T1.value.$d).format('YYYY-MM-DD');
    //  const DateToValue = dayjs(event.target.T2.value.$d).format('YYYY-MM-DD');
    try {
      const DateFromValue = event.target.T1.value;
      const DateToValue = event.target.T2.value;
      if (!DateFromValue || !DateToValue) {
        setShowFormError("Error")
        setMassError("กรุณา กรอก ช่อง DateFrom หรือ DateTo ให้ครบ")
      }else{
        setShowFormError("");

        axios
      .post(process.env.NEXT_PUBLIC_URL + "v1/aia-submitbilling/selectbilling",{
              //ส่งเป็น statisCode
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: pidValue,
        VN: vnValue,
        Invoice: invoiceValue,
        DateFrom: DateFromValue,
        DateTo: DateToValue,
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
       // console.error("Error", err)
        console.log(error)
        //  if (err.response.request.status === 500) {
                setShowFormError("Error");
                // setMassError(error.response.data.HTTPStatus.message);
            //  }  
  });
  }
  } catch (error){
    setShowFormError("Error");
    setMassError(error.message);
  }
  console.log(post)

  }else {

    axios
    .post(process.env.NEXT_PUBLIC_URL + "v1/aia-submitbilling/selectbilling",{
      //ส่งเป็น statisCode
      Insurerid: InsuranceCode,
      Status: "Received",
      IdType: selectedIdType,
      PID: pidValue,
      VN: vnValue,
      Invoice: invoiceValue,
      DateFrom: "",
      DateTo: "",
    })
    .then((response) => {
      setPost(response.data);
    })
    .catch((error) => {
     // console.error("Error", err)
      console.log(error)
      //  if (err.response.request.status === 500) {
              setShowFormError("Error");
              // setMassError(error.response.data.HTTPStatus.message);
          //  }  
});
  }
   };
   const handleSubmit2 = (event) => {
    event.preventDefault();

    const DatefromValue = dayjs(fromValue.$d).format('YYYY-MM-DD');
    const DateToValue = dayjs(toValue.$d).format('YYYY-MM-DD');
    const search = {
      PID: selectedIdType,
      VN: selectedIdType2,
      pidValue: pidValue,
      vnValue: vnValue,
      fromValue: DatefromValue,
      toValue: DateToValue,

      // datefrom: event.target.datefrom.value,
      // dateto: event.target.dateto.value,
      //  PID: event.target.PID.value,
      // HN: event.target.HN.value,
      // VN: event.target.VN.value,
      // invoice: event.target.invoice.value,
    };
    //console.log(search)
    axios
      .post(process.env.NEXT_PUBLIC_URL + "v1/aia-submitBilling/selectbilling",{
        search
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
        //  if (err.response.request.status === 500) {
                setShowFormError("Error");
                setMassError(err.response.data.HTTPStatus.message);
            //  }  
  });
   };


   const handleButtonClick = (data) => {

    //ส่ง Tran + RefID + VN ให้พี่โดม
    // axios
    //   .post(process.env.NEXT_PUBLIC_URL + "v1/aia-submitBilling/selectbilling",{
    //     search
    //   })
    //   .then((response) => {
    //     setPost(response.data);
    //   })
    //   .catch((err) => {
    //    // console.error("Error", err)
    //     console.log(err)
    //     //  if (err.response.request.status === 500) {
    //             setShowFormError("Error");
    //             setMassError(err.response.data.HTTPStatus.message);
    //         //  }  

document.getElementById("my_modal_3").showModal()

   }



   

  return (
    <>
    <div role="tablist" className="tabs tabs-lifted">
      <input type="radio" name="my_tabs_2" role="tab" className="tab text-error" aria-label="รายการที่ยังไม่วางบิล" defaultChecked/>
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    
    <form onSubmit={handleSubmit}>
    <div className="grid gap-1 sm:grid-cols-3 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                        type="radio"
                        id="NATIONAL_ID"
                        name="identity_type"
                        value="NATIONAL_ID"
                        className="checkbox checkbox-info"
                        defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="PASSPORT_NO"
                        name="identity_type"
                        value="PASSPORT_NO"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'PASSPORT_NO'}
                        onChange={handleOptionChange}
                
              />
              <p className="text-left">&nbsp;Passport &nbsp;</p>
              <input
                        type="radio"
                        id="HOSPITAL_ID"
                        name="identity_type"
                        value="HOSPITAL_ID"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'HOSPITAL_ID'}
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN &nbsp;</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="Personal ID / Passport / HN"
          multiline
          maxRows={4}
          variant="standard"
          className="w-full"
          name="PID"
          type="text"
                      value={pidValue}
                      onChange={(e) => setPidValue(e.target.value)}
        />
        </div>
        
        <div className="px-2  rounded-md mt-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Date From"
            name="T1"
            //value={fromValue}
            //onChange={(newDate) => setFromValue(newDate)}
            format="YYYY-MM-DD"
          />
      
      </LocalizationProvider> 
      &nbsp;&nbsp;
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Date To"
            name="T2"
            //value={toValue}
            //onChange={(newDate) => setToValue(newDate)}
            format="YYYY-MM-DD"
          />
    </LocalizationProvider>
                    
        </div>
        <div className="px-2 rounded-md mt-6">

        </div>
      <div className="px-2 rounded-md mt-2">
      <TextField
          id="standard-multiline-flexible"
          label="VN"
          multiline
          maxRows={4}
          variant="standard"
          className="w-full"
          name="VN"
          type="text"
                      value={vnValue}
                      onChange={(e) => setVNValue(e.target.value)}
        />

    
       </div>
       <div className="px-2  rounded-md mt-2">
       <TextField
          id="standard-multiline-flexible"
          label="Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-full"
          name="Invoice"
          type="text"
                      value={invoiceValue}
                      onChange={(e) => setInvoiceValue(e.target.value)}
        />
       </div>
       <div className="rounded-md mt-2"> 
              <div className="grid gap-1 sm:grid-cols-2 w-full">
                <div className="rounded-md">
                <button className="btn btn-error text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-error" type="submit">
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
    className="tab text-success"
    aria-label="รายการที่วางบิลแล้ว"
     />
<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-5/12">
{/*     
  <form onSubmit={handleSubmit2}>
  <div className="grid gap-1 sm:grid-cols-2 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                        type="radio"
                        id="NATIONAL_ID"
                        name="identity_type"
                        value="NATIONAL_ID"
                        className="checkbox checkbox-info"
                        defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="PASSPORT_NO"
                        name="identity_type"
                        value="PASSPORT_NO"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'PASSPORT_NO'}
                        onChange={handleOptionChange}
                
              />
              <p className="text-left">&nbsp;Passport &nbsp;</p>
              <input
                        type="radio"
                        id="HOSPITAL_ID"
                        name="identity_type"
                        value="HOSPITAL_ID"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'HOSPITAL_ID'}
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN &nbsp;</p>
            </div>
                    <TextField
          id="standard-multiline-flexible"
          label="Personal ID / Passport / HN"
          multiline
          maxRows={4}
          variant="standard"
          className="w-full"
          name="PID"
          type="text"
                      value={pidValue}
                      onChange={(e) => setPidValue(e.target.value)}
        />
        </div>
        
        <div className="px-2 rounded-md">
            <div className="flex items-center ">
            <input
                        type="radio"
                        id="VN"
                        name="identity_type2"
                        value="VN"
                        className="checkbox checkbox-info"
                        defaultChecked
                        onChange={handleOptionChange2}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="Invoice"
                        name="identity_type2"
                        value="Invoice"
                        className="checkbox checkbox-info"
                        checked={selectedIdType2 === 'Invoice'}
                        onChange={handleOptionChange2}
                
              />
              <p className="text-left">&nbsp;Invoice &nbsp;</p>
            </div>
                    <TextField
          id="standard-multiline-flexible"
          label="Episode No / Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-full"
          name="VN"
          type="text"
                      value={vnValue}
                      onChange={(e) => setVNValue(e.target.value)}
        />
        </div>
      <div className="px-2 rounded-md w-full">
      <div className="flex items-center ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Date From"
            value={fromValue}
            onChange={(newDate) => setFromValue(newDate)}
            format="YYYY-MM-DD"
          />
      
      </LocalizationProvider>
      <h1 className="mt-5">&nbsp;-&nbsp;</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Date To"
            value={toValue}
            onChange={(newDate) => setToValue(newDate)}
            format="YYYY-MM-DD"
          />
    </LocalizationProvider>
      </div>
       </div>
       <div className="rounded-md pt-6"> 
              <div className="grid gap-1 sm:grid-cols-2 w-full">
                <div className="rounded-md">
                <button className="btn btn-error text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-error" type="submit">
                    <FaSearch /> ค้นหา
                  </button>
                </div>
                <div className="rounded-md"></div>
              </div>
        </div>

  </div> 
  </form> */}
  </div>
  </div>




        <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4 mt-6">
        <div className="overflow-x-auto">
        {showFormError === "Error" ? (
            <div role="alert" className="alert alert-error mt-2 text-base-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{massError}</span>
            </div>
            ) : ""
            }

          
 <table className="table mt-2">
    <thead className="bg-info text-base-100 text-center text-lg ">
      <tr>
        <th></th>
        <th>ชื่อ-นามสกุล</th>
        <th>HN</th>
        <th>เลขที่การเคลม</th>
        <th>เลขที่ใบแจ้งหนี้</th>
        <th>ประเภทการเคลม</th>
        <th>รายการ</th>
        <th>สถานะ</th>
        <th>ยอดเงิน</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {post ? post.HTTPStatus.statusCode === 200 ? 
    (post.Result.map((bill, index) => (
<tr className="hover text-center" key={index}>
   <th>{index+1}</th>
      <td>{bill.TitleTH}</td>
      <td>{bill.HN}</td>
      <td>{bill.Invoice}</td>
      <td>{bill.Invoice}</td>
      <td>{bill.IllnessType}</td>
    <td><button className="btn bg-base-100 border-base-100 text-secondary border-none hover:text-base-100 hover:bg-primary"><LuRefreshCw /></button><button className="btn bg-base-100 border-base-100 text-secondary hover:text-base-100 hover:bg-primary ml-2"><IoDocumentText /></button></td>
        <td><div className="bg-success text-base-100 rounded-full px-3 py-2">{
        
        bill.status
        }</div></td>
        <th>{bill.TotalAmount}</th>
        <td><button className="btn btn-primary bg-base-100 text-info hover:text-base-100"
        onClick={() => handleButtonClick("1")}
        >วางบิล</button></td> 
       
      </tr>

   ) 
  )): (
      <>
      <tr>
      <th></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <th></th>
      <td></td>
      </tr>
      </>
    ): ""}
    </tbody>
  </table>
  <dialog id="my_modal_3" className="modal text-xl	">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>

                                <h3 className="font-bold text-lg">
                                  ส่งเอกสาร วางบิล
                                </h3>
                                <hr />
                                <div className="flex items-center mt-3">
                                <TextField
                                className="w-full"
                                color="primary"
          id="outlined-multiline-static"
          label="หมายเหตุ"
          multiline
          rows={6}
        />
                              </div>
                      
                              <input type="file" className="file-input file-input-bordered file-input-info w-full mt-2" />
                      
                                <div className="modal-action">
                                  {/* <Link
                                    href={`./ipd/eligible/${post.PatientInfo.HN}`}
                                  > */}
                                    <button className="btn btn-primary text-base-100">
                                      วางบิล
                                    </button>
                                  {/* </Link> */}
                                </div>
                              </form>
                            </div>
                          </dialog>
</div>
</div>
    </>
  );
}
