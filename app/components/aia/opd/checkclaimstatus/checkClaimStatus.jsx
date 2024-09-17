import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
// import Link from "next/link";
import axios from "axios";

import { useRouter } from 'next/navigation';



import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch } from "react-redux";
import { save2 } from "../../../../store/patientSlice";
import { useSelector } from "react-redux";


export default function SelectPatient() {
  const InsurerCode = 13;
  const [claimStatus, setClaimStatus] = useState();
  const [post, setPost] = useState("");
  const router = useRouter();
  const [selectedIdType, setSelectedIdType] = useState("NATIONAL_ID");
  const [pidValue, setPidValue] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  
////////////////Create Redux Patient /////////////////////////
const { Patient } = useSelector((state) => ({ ...state }));
 //console.log(Patient)
const dispatch = useDispatch();

const PatientA = (patient) => {
  dispatch(save2({
    value: "มีรายชื่อ",
    Data: 
  {
    "IdType": selectedIdType,
    "InsurerCode": InsurerCode,
    "DateOfBirth": patient.DateOfBirth,
    "Gender": patient.Gender,
    "GivenNameEN": patient.GivenNameEN,
    "GivenNameTH": patient.GivenNameTH,
    "HN": patient.HN,
    "MobilePhone": patient.MobilePhone,
    "PID": patient.PID,
    "PassportNumber": patient.PassportNumber,
    "SurnameEN": patient.SurnameEN,
    "SurnameTH": patient.SurnameTH,
    "TitleEN": patient.TitleEN,
    "TitleTH": patient.TitleTH,
  },
}));

router.push('/aia/opd/checkeilgible');
};
/////////////////////////////////////////



  useEffect(() => {
    const getClaimStatus = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "v1/utils/claimStatus/"
      );

      const data = await response.json();
      setClaimStatus(data);
    };
    getClaimStatus();
  }, []);


  const handleOptionChange = (e) => {
    setSelectedIdType(e.target.value);
  };

  const Status = (event) => {
    setStatusValue(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

      if (selectedIdType === "NATIONAL_ID") {
        // console.log("PID")
              const PatientInfo = {
                InsurerCode: InsurerCode,
                IdType: selectedIdType,
                PID: pidValue,
                HN: "",
                PassportNumber: "",
                datefrom: "",
                dateto: "",
                ClaimStatusCode: statusValue,
              };
        
              axios
              .post(
                process.env.NEXT_PUBLIC_URL_SV + "v1/aia-patient-info/PatientSearch",
                {
                  PatientInfo,
                }
              )
              .then(function (response) {
              //    console.log(response.data);
                if (response.data.HTTPStatus.statusCode === 200){
                  setShowFormError("")
                  setPost(response.data);
                }else{
                setMassError(response.data.HTTPStatus.message);
                setShowFormError("Err")
                }
                
            
              })
              .catch(function (error) {
                console.log(error.data);
                //console.log("5555555555555555555555555555555555555555");
              });
            } else if (selectedIdType === "HOSPITAL_ID") {
              //console.log("HN")
              const PatientInfo = {
                InsurerCode: InsurerCode,
                IdType: selectedIdType,
                PID: "",
                HN: pidValue,
                PassportNumber: "",
                datefrom: "",
                dateto: "",
                ClaimStatusCode: statusValue,
              };
              axios
              .post(
                process.env.NEXT_PUBLIC_URL_SV + "v1/aia-patient-info/PatientSearch",
                {
                  PatientInfo,
                }
              )
              .then(function (response) {
              //  console.log(response.data);
                 if (response.data.HTTPStatus.statusCode === 200){
                  setShowFormError("")
                  setPost(response.data);
                }else{
                setMassError(response.data.HTTPStatus.message);
                setShowFormError("Err")
                }
               })
              .catch(function (error) {
                setMassError(error.message);
                setShowFormError("Err")
                //console.log("5555555555555555555555555555555555555555");
              });
            } else if (selectedIdType === "PASSPORT_NO") {
              //console.log("PASSPORT_NO");
              const PatientInfo = {
                InsurerCode: InsurerCode,
                IdType: selectedIdType,
                PID: "",
                HN: "",
                PassportNumber: pidValue,
                datefrom: "",
                dateto: "",
                ClaimStatusCode: statusValue,
              };
              axios
              .post(
                process.env.NEXT_PUBLIC_URL_SV + "v1/aia-patient-info/PatientSearch",
                {
                  PatientInfo,
                }
              )
              .then(function (response) {
             //   console.log(response.data);
                if (response.data.HTTPStatus.statusCode === 200){
                  setShowFormError("")
                  setPost(response.data);
                }else{
                setMassError(response.data.HTTPStatus.message);
                setShowFormError("Err")
                }
              })
              .catch(function (error) {
                console.log(error.data);
                setShowFormError("Err");
              });
          };

};


//console.log(post)
  return (
    <>
      {/* <div className="justify-center border-solid w-screen m-auto border-4 rounded-lg p-4"> */}

    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 sm:grid-cols-3 w-full mt-2">
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
        <div className="rounded-md pt-6">
            <div className="w-full">
              <div className="rounded-md">
                <button className="btn btn-primary text-base-100 text-lg rounded-full px-3 py-2"

                type="submit"
                >
                  <FaSearch /> Search
                </button>
              </div>
              <div className="rounded-md"></div>
            </div>
          </div>
          <div className="px-2 rounded-md"></div>
        </div>
     <details className="collapse ">
          <summary className="collapse-title font-medium -mt-3">More</summary>
          <div className="collapse-content"> 

          <div className="grid gap-1 sm:grid-cols-3 w-full">

          <div className="rounded-md">
        <div className="grid gap-1 sm:grid-cols-2 w-full">
          <div className="px-2 rounded-md">


<LocalizationProvider dateAdapter={AdapterDayjs}>

<DatePicker
            label="Date From"
            value={fromValue}
            onChange={(newDate) => setFromValue(newDate)}
            format="YYYY-MM-DD"
          />
      
    </LocalizationProvider>

            </div>
            <div className="px-2 rounded-md">
           <LocalizationProvider dateAdapter={AdapterDayjs}>

<DatePicker
            label="Date To"
            value={toValue}
            format="YYYY-MM-DD"
            onChange={(newDate) => setToValue(newDate)}
           
          />
      
    </LocalizationProvider> 
             </div>
            </div>


            
          </div>
          <div className="grid gap-1 sm:grid-cols-2 w-full">
          <div className="px-2 rounded-md">
     <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Claim Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusValue}
          label=""
          onChange={Status}
        >
          {claimStatus
                ? claimStatus.map((status, index) => (
                    <MenuItem key={index} value={status.statusCode}>{status.StatusDescTH}</MenuItem>
                  ))
                : ""}

        </Select>
      </FormControl>
          </div>
        </div>
          </div>


          </div>
        </details> 
      
    </form>
   
      {showFormError === "Err" ? (
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
            ) : (
              ""
            )}
            {showFormError === "" ? (
      <div className="justify-center border-solid w-full m-auto border-2 border-warning rounded-lg p-4 mt-6">
      {/* {massError === "Error" ? (
        <>
        <div role="alert" className="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>กรุณากรอกวันที่ให้ครบ!!</span>
</div>
        </>
      ) : ""}  */}
        <div className="overflow-x-auto mt-2">
          <table className="table">
            <thead className="bg-info text-base-100 text-center text-lg">
              <tr>
                <th>No.</th>
                <th>Personal ID</th>
                <th>Passport</th>
                <th>HN</th>
                <th>Fullname</th>
                <th>Date of Birth (Y-M-D)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {post
                ? post.HTTPStatus.statusCode < 400
                  ? (post.Result.PatientInfo.map((patient , index) => (

                        <tr className="hover" key={index} >
                          <td className="text-center">{index+1}</td>
                          <td>{patient.PID}</td>
                          <td>{patient.PassportNumber}</td>
                          <td className="text-center">{patient.HN}</td>
                          <td>
                            {patient.TitleTH}
                            {patient.GivenNameTH} {patient.SurnameTH}
                          </td>
                          <td className="text-center">
                            {patient.DateOfBirth}
                          </td>
                          <td>
                            <div className="grid gap-1 sm:grid-cols-2 w-full text-accent ">
                              {/* <Link href={`/aia/opd/checkeilgible`}> */}
                                <button className="btn bg-white text-primary w-full hover:text-base-100 hover:bg-primary"
                                onClick={() => PatientA(patient)}
                                >
                                  Chack Eilgible
                                </button>
                              {/* </Link> */}
                            </div>
                          </td>
                        </tr>

                    )
                ))
                : (
                  <>
                  <tr>
                    <td></td>
                  </tr>
                  </>
                ): (
                  <>
                  <tr>
                    <td></td>
                  </tr>
                  </>
                )}
            </tbody>
          </table>
        </div>
      </div>
            ) : "" }


    </>
  )
}
