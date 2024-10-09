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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function chackData() {
  const InsuranceCode = 13;
  console.log(InsuranceCode)
  // const  ReDux  = useSelector((state) => ({ ...state }));
  //console.log(ReDux)
  /////////////////ปุ่ม ย่อย 3 อัน/////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ///////////////////////////////////////////
  const [post, setPost] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [dateFromValue, setDateFromValue] = useState("");
  const [dateToValue, setDateToValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [claimStatus, setClaimStatus] = useState();
  const router = useRouter();



  const Refresh = (data) => {
    console.log("-Refresh-")
    const [RefId, TransactionNo , HN] = data.split(' | ');
    console.log(RefId)
    console.log(TransactionNo)
    console.log(HN)
  };

  const Document = () => {
    console.log("-Document-")
  };

  // const Delect = () => {
  //   console.log("-Delect-")
  // };


  const handleOptionChange = (e) => {
    setSelectedIdType(e.target.value);
  };


  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_claimStatus + InsuranceCode)
    .then((response) => {
      setClaimStatus(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
      // try{
      //   const ErrorMass = error.config.url
      //   const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
      //   setMassSummitError(error.code +" - "+error.message +" - "+ErrorMass2);
      //   setShowSummitError("Error")
      // }
      // catch (error) {
      //   setMassSummitError(error.response.data.HTTPStatus.message);
      //   setShowSummitError("Error");
     });


  }, []);


  // const Status = (event) => {
  //   setStatusValue(event.target.value);
  // }

  const handleSubmit =  (event) => {
    //ยังไม่วางบิล
    event.preventDefault();
    setPost();
    let data = {};
    let  dateToValue  = "";
    let dateFromValue = "";

   //  console.log(statusValue)


  if(fromValue && toValue){
    dateFromValue = dayjs(fromValue.$d).format('YYYY-MM-DD');
    dateToValue = dayjs(toValue.$d).format('YYYY-MM-DD');

  }

  if(selectedIdType === "PID" && numberValue){
  
    data = {
        Insurerid: InsuranceCode,
        IdType: selectedIdType,
        Invoice: "",
        VN: "",
        PID : numberValue,
        Passport : "",
        HN : "",
        DateVisitFrom : dateFromValue,
        DateVisitTo : dateToValue,
        Claimstatuscode : statusValue,
      };
}else if (selectedIdType === "Passport" && numberValue){
  
    data = {
      Insurerid: InsuranceCode,
      IdType: selectedIdType,
      Invoice: "",
      VN: "",
      PID : "",
      Passport : numberValue,
      HN : "",
      DateVisitFrom : dateFromValue,
      DateVisitTo : dateToValue,
      Claimstatuscode : statusValue,
      };
}else if (selectedIdType === "HN" && numberValue){
  
      data = {
        Insurerid: InsuranceCode,
        IdType: selectedIdType,
        Invoice: "",
        VN: "",
        PID : "",
        Passport : "",
        HN : numberValue,
        DateVisitFrom : dateFromValue,
        DateVisitTo : dateToValue,
        Claimstatuscode : statusValue,
        };
  }else if (selectedIdType === "VN" && numberValue){
  
  data = {
    Insurerid: InsuranceCode,
    IdType: selectedIdType,
    Invoice: "",
    VN: numberValue,
    PID : "",
    Passport : "",
    HN : "",
    DateVisitFrom : dateFromValue,
    DateVisitTo : dateToValue,
    Claimstatuscode : statusValue,
    };
}else if (selectedIdType === "Invoice" && numberValue){
  data = {
    Insurerid: InsuranceCode,
    IdType: selectedIdType,
    Invoice: numberValue,
    VN: "",
    PID : "",
    Passport : "",
    HN : "",
    DateVisitFrom : dateFromValue,
    DateVisitTo : dateToValue,
    Claimstatuscode : statusValue,
    };
}else if (fromValue && toValue){
  data = {
    PID : "",
    HN : "",
      Insurerid: InsuranceCode,
      IdType: "",
      VN: "",
      Invoice: "",
      DateVisitFrom : dateFromValue,
      DateVisitTo : dateToValue,
      Claimstatuscode : statusValue,
    };

}else if (statusValue){
  data = {
    PID : "",
    HN : "",
      Insurerid: "",
      IdType: "",
      VN: "",
      Invoice: "",
      DateVisitFrom : dateFromValue,
      DateVisitTo : dateToValue,
      Claimstatuscode : statusValue,
    };
}
if(Object.keys(data).length === 0){
  setShowFormError("Error");
  setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
}else{
  setShowFormError()
  //    console.log(data)

// axios
// .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
//         //ส่งเป็น statisCode
//         data
// )
// .then((response) => {
//   setPost(response.data);
//   setShowFormError("");
// })
// .catch((error) => {
//  // console.error("Error", err)
//   console.log(error)

//           setShowFormError("Error");
//           setMassError(error.message);

// });

}




}

  //    console.log(post)

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
            <input
                        type="radio"
                        id="PID"
                        name="identity_type"
                        value="PID"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="Passport"
                        name="identity_type"
                        value="Passport"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Passport&nbsp;</p>
              <input
                        type="radio"
                        id="HN"
                        name="identity_type"
                        value="HN"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN&nbsp;</p>
              <input
                        type="radio"
                        id="VN"
                        name="identity_type"
                        value="VN"
                        className="checkbox checkbox-info"
                        // defaultChecked
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
              <p className="ml-6">Visit Date</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="VN / Invoice"
          multiline
          maxRows={4}
          variant="standard"
          className="w-96"
          name="number"
          type="text"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
        />
      
     
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-10 w-40"
            label="Date From"
            value={fromValue}
            onChange={(newDate) => setFromValue(newDate)}
            format="YYYY-MM-DD"
          />
      
      </LocalizationProvider>
  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-2 w-40"
            label="Date To"
            value={toValue}
            onChange={(newDate) => setToValue(newDate)}
            format="YYYY-MM-DD"
          />
    </LocalizationProvider>

      <FormControl className="ml-2 w-80">
        <InputLabel id="demo-simple-select-label">Claim Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusValue}
          label="Claim Status"
          onChange={Status}
        >
          {claimStatus
                ? claimStatus.Result.map((status, index) => (
                    <MenuItem key={index} value={status.claimstatuscode}>{status.claimstatusdesc_en} - {status.claimstatusdesc_th}</MenuItem>
                  ))
                : ""}

        </Select>
      </FormControl>

                <button className="btn btn-primary text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-primary ml-2" type="submit">
                    <FaSearch /> ค้นหา
                  </button>
      
   
       </div>

       </div>

  </form>




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
        <th>Visit Date</th>
        <th>Full Name</th>
        <th>VN</th>
        <th>ClaimNo</th>
        <th>Invoicenumber</th>
        {/* <th>Illness</th> */}
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {/* {post ? post.HTTPStatus.statusCode === 200 ? 
    (post.Result.Data.map((bill, index) => (
<tr className="hover text-center" key={index}>
   <th>{index+1}</th>
   <td>{bill.VisitDateTime}</td>
      <td>{bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}</td>
      <td>{bill.VN}</td>
      <td>{bill.ClaimNo}</td>
      <td>{bill.invoicenumber}</td>
        <td ><a className="bg-success text-base-100 rounded-full px-3 py-2">{bill.ClaimstatusName}</a></td>
        <td>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AiOutlineUnorderedList />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => Refresh(`${bill.RefId} | ${bill.TransactionNo} | ${bill.HN}`)}><LuRefreshCw />&nbsp;Refresh</MenuItem>
        <MenuItem onClick={Document}><IoDocumentText />&nbsp;Document</MenuItem>

      </Menu>
      </td>
       
      </tr>

   ) 
  )): ( */}

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
  
    {/* // ): (
    //   <tr>
    //   <th></th>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <th></th>
    //   <td></td>
    //   </tr>
    // )} */}
    </tbody>
  </table>
</div>
</div>







    </>
  );
}
