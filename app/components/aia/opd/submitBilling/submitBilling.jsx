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
import { ImBin } from "react-icons/im";
import { IoIosDocument } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button, Menu, MenuItem } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function chackData() {
  const InsuranceCode = 13;
  const DatefromValue = "";
  const DateToValue = "";
  const [post, setPost] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");



  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Refresh = () => {
    console.log("Refresh")
  };
  const Delect = () => {
    console.log("Delect")
  };

  const handleOptionChange = (e) => {
    setSelectedIdType(e.target.value);
  };


  
  const handleSubmit = (event) => {
    //ยังไม่วางบิล
    event.preventDefault();
    setPost();

    if(selectedIdType === "NATIONAL_ID"){
      const TransactionQuery = {
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: pidValue,
        PassportNumber: "",
        HN: "",
        VN: "",
        Invoice: "",
        DateFrom: "",
        DateTo: "",
      }
    
      axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
        //ส่งเป็น statisCode
        TransactionQuery
      )
      .then((response) => {
        setPost(response.data);
        console.log(response.data)
        setShowFormError("");
      })
      .catch((error) => {
       // console.error("Error", err)
        console.log(error)
        //  if (err.response.request.status === 500) {
                setShowFormError("Error");
                // setMassError(error.response.data.HTTPStatus.message);
            //  }  
    });
    
     }else if(selectedIdType === "PASSPORT_NO"){
      const TransactionQuery = {
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: "",
        PassportNumber: pidValue,
        HN: "",
        VN: "",
        Invoice: "",
        DateFrom: "",
        DateTo: "",
      }
    
    
      axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
        //ส่งเป็น statisCode
        TransactionQuery
      )
      .then((response) => {
        setPost(response.data);
        console.log(response.data)
        setShowFormError("");
      })
      .catch((error) => {
       // console.error("Error", err)
        console.log(error)
        //  if (err.response.request.status === 500) {
                setShowFormError("Error");
                // setMassError(error.response.data.HTTPStatus.message);
            //  }  
    });
    }else if(selectedIdType === "HN"){
      const TransactionQuery = {
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: "",
        PassportNumber: "",
        HN: pidValue,
        VN: "",
        Invoice: "",
        DateFrom: "",
        DateTo: "",
      }
    
      axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
        //ส่งเป็น statisCode
        TransactionQuery
      )
      .then((response) => {
        setPost(response.data);
        console.log(response.data)
        setShowFormError("");
      })
      .catch((error) => {
       // console.error("Error", err)
        console.log(error)
        //  if (err.response.request.status === 500) {
                setShowFormError("Error");
                // setMassError(error.response.data.HTTPStatus.message);
            //  }  
    });
     }else if(selectedIdType === "VN"){
      const TransactionQuery = {
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: "",
        PassportNumber: "",
        HN: "",
        VN: pidValue,
        Invoice: "",
        DateFrom: "",
        DateTo: "",
      }
    
      axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
        //ส่งเป็น statisCode
        TransactionQuery
      )
      .then((response) => {
        setPost(response.data);
        console.log(response.data)
        setShowFormError("");
      })
      .catch((error) => {
       // console.error("Error", err)
        console.log(error)
        //  if (err.response.request.status === 500) {
                setShowFormError("Error");
                // setMassError(error.response.data.HTTPStatus.message);
            //  }  
    });
     }else if(selectedIdType === "Invoice"){
      const TransactionQuery = {
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: "",
        PassportNumber: "",
        HN: "",
        VN: "",
        Invoice: pidValue,
        DateFrom: "",
        DateTo: "",
      }
    
      axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
        //ส่งเป็น statisCode
        TransactionQuery
      )
      .then((response) => {
        setPost(response.data);
        console.log(response.data)
        setShowFormError("");
      })
      .catch((error) => {
       // console.error("Error", err)
        console.log(error)
        //  if (err.response.request.status === 500) {
                setShowFormError("Error");
                // setMassError(error.response.data.HTTPStatus.message);
            //  }  
    });
     }else{
                      setShowFormError("Error");
                    setMassError("กรุณาเลือกค้นหา อย่างน้อย 1 อย่าง");
      //console.log("ไม่ได้เลือกไรเลย")
     }

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
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",{
              //ส่งเป็น statisCode
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: pidValue,
        // VN: vnValue,
        //Invoice: invoiceValue,
        DateFrom: DateFromValue,
        DateTo: DateToValue,
      })
      .then((response) => {
        setPost(response.data);
        console.log(response.data)
        setShowFormError("");
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
    console.log("Error")
    setShowFormError("Error");
    setMassError(error.message);
  }
  console.log(post)

  }
  // else {

  // }
   };


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   const handleSubmit2 = (event) => {
       //วางบิลแล้ว
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
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",{
              //ส่งเป็น statisCode
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        PID: pidValue,
        // VN: vnValue,
        //Invoice: invoiceValue,
        DateFrom: DateFromValue,
        DateTo: DateToValue,
      })
      .then((response) => {
        setPost(response.data);
        setShowFormError("");
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
 if(selectedIdType === "NATIONAL_ID"){
  const TransactionQuery = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    PID: pidValue,
    PassportNumber: "",
    HN: "",
    VN: "",
    Invoice: "",
    DateFrom: "",
    DateTo: "",
  }

  axios
  .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
    //ส่งเป็น statisCode
    TransactionQuery
  )
  .then((response) => {
    setPost(response.data);
    console.log(response.data)
    setShowFormError("");
  })
  .catch((error) => {
   // console.error("Error", err)
    console.log(error)
    //  if (err.response.request.status === 500) {
            setShowFormError("Error");
            // setMassError(error.response.data.HTTPStatus.message);
        //  }  
});

 }else if(selectedIdType === "PASSPORT_NO"){
  const TransactionQuery = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    PID: "",
    PassportNumber: pidValue,
    HN: "",
    VN: "",
    Invoice: "",
    DateFrom: "",
    DateTo: "",
  }


  axios
  .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
    //ส่งเป็น statisCode
    TransactionQuery
  )
  .then((response) => {
    setPost(response.data);
    console.log(response.data)
    setShowFormError("");
  })
  .catch((error) => {
   // console.error("Error", err)
    console.log(error)
    //  if (err.response.request.status === 500) {
            setShowFormError("Error");
            // setMassError(error.response.data.HTTPStatus.message);
        //  }  
});
}else if(selectedIdType === "HN"){
  const TransactionQuery = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    PID: "",
    PassportNumber: "",
    HN: pidValue,
    VN: "",
    Invoice: "",
    DateFrom: "",
    DateTo: "",
  }

  axios
  .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
    //ส่งเป็น statisCode
    TransactionQuery
  )
  .then((response) => {
    setPost(response.data);
    console.log(response.data)
    setShowFormError("");
  })
  .catch((error) => {
   // console.error("Error", err)
    console.log(error)
    //  if (err.response.request.status === 500) {
            setShowFormError("Error");
            // setMassError(error.response.data.HTTPStatus.message);
        //  }  
});
 }else if(selectedIdType === "VN"){
  const TransactionQuery = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    PID: "",
    PassportNumber: "",
    HN: "",
    VN: pidValue,
    Invoice: "",
    DateFrom: "",
    DateTo: "",
  }

  axios
  .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
    //ส่งเป็น statisCode
    TransactionQuery
  )
  .then((response) => {
    setPost(response.data);
    console.log(response.data)
    setShowFormError("");
  })
  .catch((error) => {
   // console.error("Error", err)
    console.log(error)
    //  if (err.response.request.status === 500) {
            setShowFormError("Error");
            // setMassError(error.response.data.HTTPStatus.message);
        //  }  
});
 }else if(selectedIdType === "Invoice"){
  const TransactionQuery = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    PID: "",
    PassportNumber: "",
    HN: "",
    VN: "",
    Invoice: pidValue,
    DateFrom: "",
    DateTo: "",
  }

  axios
  .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
    //ส่งเป็น statisCode
    TransactionQuery
  )
  .then((response) => {
    setPost(response.data);
    console.log(response.data)
    setShowFormError("");
  })
  .catch((error) => {
   // console.error("Error", err)
    console.log(error)
    //  if (err.response.request.status === 500) {
            setShowFormError("Error");
            // setMassError(error.response.data.HTTPStatus.message);
        //  }  
});
 }else{
  setShowFormError("Error");
setMassError("กรุณาเลือกค้นหา อย่างน้อย 1 อย่าง");
//console.log("ไม่ได้เลือกไรเลย")
}
  }
   };


   const handleButtonClick = () => {
console.log("data")
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
    <div className="grid gap-1 sm:grid-cols-1 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                        type="radio"
                        id="NATIONAL_ID"
                        name="identity_type"
                        value="NATIONAL_ID"
                        className="checkbox checkbox-info"
                        // defaultChecked
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
              <input
                        type="radio"
                        id="VN"
                        name="identity_type"
                        value="VN"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'VN'}
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;VN &nbsp;</p>
              <input
                        type="radio"
                        id="Invoice"
                        name="identity_type"
                        value="Invoice"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'Invoice'}
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Invoice &nbsp;</p>
              <p className="ml-2">Visit Date</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="Personal ID / Passport / HN / VN / Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-96"
          name="PID"
          type="text"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
        />

      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="w-40 ml-10"
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
        className="w-40"
            label="Date To"
            name="T2"
            //value={toValue}
            //onChange={(newDate) => setToValue(newDate)}
            format="YYYY-MM-DD"
          />
    </LocalizationProvider>
                <button className="btn btn-error text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-error ml-2" type="submit">
                    <FaSearch /> ค้นหา
                  </button>
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
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    
    <form onSubmit={handleSubmit2}>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                        type="radio"
                        id="NATIONAL_ID"
                        name="identity_2"
                        value="NATIONAL_ID"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="PASSPORT_NO"
                        name="identity_2"
                        value="PASSPORT_NO"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'PASSPORT_NO'}
                        onChange={handleOptionChange}
                
              />
              <p className="text-left">&nbsp;Passport &nbsp;</p>
              <input
                        type="radio"
                        id="HOSPITAL_ID"
                        name="identity_2"
                        value="HOSPITAL_ID"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'HOSPITAL_ID'}
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN &nbsp;</p>
              <input
                        type="radio"
                        id="VN"
                        name="identity_2"
                        value="VN"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'VN'}
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;VN &nbsp;</p>
              <input
                        type="radio"
                        id="Invoice"
                        name="identity_2"
                        value="Invoice"
                        className="checkbox checkbox-info"
                        checked={selectedIdType === 'Invoice'}
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Invoice &nbsp;</p>
              <p className="ml-2">Visit Date</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="Personal ID / Passport / HN / VN / Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-96"
          name="PID"
          type="text"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
        />

      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="w-40 ml-10"
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
        className="w-40"
            label="Date To"
            name="T2"
            //value={toValue}
            //onChange={(newDate) => setToValue(newDate)}
            format="YYYY-MM-DD"
          />
    </LocalizationProvider>
                <button className="btn btn-success text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-success ml-2" type="submit">
                    <FaSearch /> ค้นหา
                  </button>
                  </div>



  </div> 
  </form>
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
        <th>วันที่เข้ารับการรักษา</th>
        <th>ชื่อ-นามสกุล</th>
        <th>HN</th>
        <th>เลขที่การเคลม</th>
        <th>เลขที่ใบแจ้งหนี้</th>
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
   <td>{bill.VisitDatefrom}</td>
      <td>{bill.TitleTH}</td>
      <td>{bill.HN}</td>
      <td>{bill.Invoice}</td>
      <td>{bill.Invoice}</td>
      <td>{bill.IllnessType}</td>
        {/* <td><div className="bg-success text-base-100 rounded-full px-3 py-2">{bill.status}</div></td> */}
        <td ><a className="bg-success text-base-100 rounded-full px-3 py-2">{bill.status}</a></td>
        <th>{bill.TotalAmount}</th>
        <td><button className="btn btn-primary text-base-100 hover:text-info hover:bg-base-100"
        onClick={handleButtonClick}
        >วางบิล</button>
        <Button variant="outlined" className="border-none"   onClick={handleClick}>

        <AiOutlineUnorderedList />
      </Button></td>
       
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
  <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={Refresh}><LuRefreshCw />&nbsp;Refresh</MenuItem>
        <MenuItem ><IoDocumentText />&nbsp;Document</MenuItem>
        <MenuItem onClick={Delect}><ImBin />&nbsp;Cancel</MenuItem>
        
      </Menu>
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
                                    <button className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100">
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
