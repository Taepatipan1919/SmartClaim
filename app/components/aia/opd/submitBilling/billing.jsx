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
import { Button ,Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function chackData() {
  const InsuranceCode = 13;
  const [post, setPost] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("VN");
  const [numberValue, setNumberValue] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const Delect = () => {
    console.log("555555")
  };




  const handleOptionChange = (e) => {
    setSelectedIdType(e.target.value);
  };


  
  const handleSubmit = (event) => {
    event.preventDefault();
    setPost();


        axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",{
              //ส่งเป็น statisCode
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        Number: numberValue,
        // Invoice: invoiceValue,
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
                setMassError(error.message);
                // setMassError(error.response.data.HTTPStatus.message);
            //  }  
  });

}

const handleSubmit2 = (event) => {
  event.preventDefault();
  setPost();


      axios
    .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",{
            //ส่งเป็น statisCode
      Insurerid: InsuranceCode,
      Status: "03",
      IdType: selectedIdType,
      Number: numberValue,
      // Invoice: invoiceValue,
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
              setMassError(error.message);
              // setMassError(error.response.data.HTTPStatus.message);
          //  }  
});

}
//console.log(post)
   const submitbilling = (event) => {
    event.preventDefault();
    document.getElementById("my_modal_3").close()
    const File = {
      InsuranceCode: InsuranceCode,
    };
    console.log(File);
    setShowModal(true)


    setTimeout(() => {
      setShowModal(false)
      //router.push('/aia/opd/submitBilling');
    }, 5000);
  }
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
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-5/5">
    
    <form onSubmit={handleSubmit}>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                        type="radio"
                        id="VN"
                        name="identity_type"
                        value="VN"
                        className="checkbox checkbox-info"
                        defaultChecked
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
              <p className="ml-32">Visit Date</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="VN / Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-64"
          name="number"
          type="text"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
        />
      
     
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-2"
            label="Date From"
            value={fromValue}
            onChange={(newDate) => setFromValue(newDate)}
            format="YYYY-MM-DD"
          />
      
      </LocalizationProvider>
  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-2"
            label="Date To"
            value={toValue}
            onChange={(newDate) => setToValue(newDate)}
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
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-5/5">
<form onSubmit={handleSubmit2}>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                        type="radio"
                        id="VN"
                        name="identity_2"
                        value="VN"
                        className="checkbox checkbox-info"
                        defaultChecked
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
              <p className="ml-32">Visit Date</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="VN / Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-64"
          name="number"
          type="text"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
        />
      
     
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-2"
            label="Date From"
            value={fromValue}
            onChange={(newDate) => setFromValue(newDate)}
            format="YYYY-MM-DD"
          />
      
      </LocalizationProvider>
  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-2"
            label="Date To"
            value={toValue}
            onChange={(newDate) => setToValue(newDate)}
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
        <td><button className="btn btn-primary bg-base-100 text-info hover:text-base-100"
        onClick={() => handleButtonClick("1")}
        >วางบิล</button>
        <Button variant="outlined" className="border-none"   onClick={handleClick}>

        <AiOutlineUnorderedList />
      </Button></td>
       
      </tr>

   ) 
  )): (

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
  
    ): ""}
    </tbody>
  </table>
  <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem ><LuRefreshCw />&nbsp;Refresh</MenuItem>
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
                                {/* <div className="flex items-center mt-3">
                                <TextField
                                className="w-full"
                                color="primary"
          id="outlined-multiline-static"
          label="หมายเหตุ"
          name="textmass"
          multiline
          rows={6}
        />
              </div> */}
                              <input type="file" className="file-input file-input-bordered file-input-info w-full mt-2" />

                              <div className="flex items-center mt-3">
             <table className="table table-zebra mt-2">
                <thead >
                  <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th className="w-2/5">ชื่อไฟล์</th>
                      <th className="w-1/5"></th>
                    </tr>
                </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {/* {billing
                      ? billing.Result.Billing.map((bill, index) => ( */}
                          <tr
                            // key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td class="px-6 py-4 whitespace-nowrap">123456789ำกไดำๆ21กๆ.pdf</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                            <button className="btn btn-warning  mr-2" type="submit"><IoIosDocument /></button>
                            <button className="btn btn-error " type="submit"><ImBin /></button>
                            </td>
                          </tr>
                        {/* ))
                      : ""} */}
                  </tbody>
              </table>
                              </div>
                                <div className="modal-action">
                                  {/* <Link
                                    href={`./ipd/eligible/${post.PatientInfo.HN}`}
                                  > */}
                                    <button className="btn btn-primary text-base-100"
                                    onClick={submitbilling}
                                    >
                                      วางบิล
                                    </button>
                                  {/* </Link> */}
                                </div>
                              </form>
                            </div>
                          </dialog>
</div>
</div>






{showModal ? (
  <>
          {/* <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">ส่งเคลมเรียบร้อย</h2>
               
            </div>
        </div> */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-primary">วางบิลเรียบร้อยแล้ว</h2>
          </div>
        </div>
  </>
) : ""}
    </>
  );
}
