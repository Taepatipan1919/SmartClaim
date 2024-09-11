import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";
import { RiFileUserFill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import TextField from '@mui/material/TextField';


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';





export default function SelectPatient() {
  const InsuranceCode = 13;
  const [claimStatus, setClaimStatus] = useState();
  const [post, setPost] = useState("");
  const [create, setCreate] = useState("");
  const [showFormCreate, setShowFormCreate] = useState("");
  const [input, setInput] = useState("");
  const [ patientFindforUpdate , setPatientFindforUpdate ]= useState("");

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

  const createPatientInfo = (event) => {
    event.preventDefault();

    if (event.target.exampleRadios.value === "NATIONAL_ID") {
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: event.target.exampleRadios.value,
        PID: event.target.PID.value,
        HN: "",
        PassportNumber: "",
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/FindPatient/",
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          setCreate(response.data);
          setShowFormCreate("");
        })
        .catch(function (error) {
          console.log(error);
          setShowFormCreate("Err");
        });
    } else if (event.target.exampleRadios.value === "HOSPITAL_ID") {
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: event.target.exampleRadios.value,
        PID: "",
        HN: event.target.PID.value,
        PassportNumber: "",
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/FindPatient/",
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          setCreate(response.data);
          setShowFormCreate("");
          //console.log(response.data);
        })
        .catch(function (error) {
          //console.log(error);
          setShowFormCreate("Err");
        });
    } else if (event.target.exampleRadios.value === "PASSPORT_NO") {
      //console.log("PASSPORT_NO");
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: event.target.exampleRadios.value,
        PID: "",
        HN: "",
        PassportNumber: event.target.PID.value,
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/FindPatient/",
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          setCreate(response.data);
          setShowFormCreate("");
          //console.log(response.data);
        })
        .catch(function (error) {
          //console.log(error);
          setShowFormCreate("Err");
        });
    }
  };
  function saveCreate() {
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/CreatePatient",
        {
          PatientInfo: {
            InsurerCode: InsuranceCode, // ควรเป็น integer ไม่ใช่ string
            PatientID: create.Result.PatientInfo.PatientID, // ควรเป็น integer ไม่ใช่ string
            PID: create.Result.PatientInfo.PID,
            PassportNumber: create.Result.PatientInfo.PassportNumber,
            HN: create.Result.PatientInfo.HN,
            TitleTH: create.Result.PatientInfo.TitleTH,
            GivenNameTH: create.Result.PatientInfo.GivenNameTH,
            SurnameTH: create.Result.PatientInfo.SurnameTH,
            TitleEN: create.Result.PatientInfo.TitleEN,
            GivenNameEN: create.Result.PatientInfo.GivenNameEN,
            SurnameEN: create.Result.PatientInfo.SurnameEN,
            DateOfBirth: create.Result.PatientInfo.DateOfBirth,
            Gender: create.Result.PatientInfo.Gender,
            MobilePhone: create.Result.PatientInfo.MobilePhone,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setShowFormCreate("Succ");
      })
      .catch(function (error) {
        console.log(error.response.request.status);
        if (error.response.request.status === 500) {
          setShowFormCreate("Again");
        } else {
          setShowFormCreate("Err");
        }
      });

    //console.log(dataCreate);
  }

  function Verify() {
    axios
      .post(
        process.env.NEXT_PUBLIC_URL + "v1/aia-patient-info/PatientFindforUpdate",
        {
          PatientInfo: {
            "Insurerid": 13, 
            "RefID":"O61-028993-ppp-ooo-o1",
            "TransactionNo":"XXXXX",
            "PID": "1160100078831",
            "HN": "61-022781",
            "PassportNumber":"ABC12345",
            "IdType":"PASSPORT_NO",
            "VN":"O61-028993",
            "StatusClaimCode": "01", 
            "VisitDatefrom": "2024-08-15",
             "VisitDateto":  "2024-08-06"
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setPatientFindforUpdate(response.data)
         document.getElementById("my_modal_1").showModal()
      })
      .catch(function (error) {
        console.log(error.response.request.status);
      });
  }
  function saveUpdate() {
    axios
      .patch(
        process.env.NEXT_PUBLIC_URL + "v1/aia-patient-info/PatientUpdate",
        {
          "PatientInfo": {
            "InsurerCode": 13, // ควรเป็น integer ไม่ใช่ string
            "PatientID": "183090", // ควรเป็น integer ไม่ใช่ string
            "PID": "7161710129213",
            "PassportNumber": "ABC12345",
            "HN": "61-028993",
            "TitleTH": "นาย",
            "GivenNameTH": "กฤษณ์",
            "SurnameTH": "จันทรวงศ์",
            "TitleEN": "MR.",
            "GivenNameEN": "KRIT",
            "SurnameEN": "CHANTARAWONG",
            "DateOfBirth": "1985-07-15",
            "Gender": "ชาย",
            "MobilePhone": "0989923557"
          }
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.request.status);
      });

    //console.log(dataCreate);
  }


  const [selectedOption, setSelectedOption] = useState("NATIONAL_ID");
  const [pidValue, setPidValue] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [statusValue, setStatusValue] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('ค้นหาด้วย:', selectedOption, 'ค่า:', pidValue);
    
    // if (!fromValue){
    //   console.log("!")
    // }else{
    //   setFromValue(fromValue.format('YYYY/MM/DD'))
    // }
    // const result = strValue.substring(11, 0)
// console.log(event.target.exampleRadios.value)
//     if (event.target.exampleRadios.value === "NATIONAL_ID") {
// console.log("PID")
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: selectedOption,
        PID: "",
        HN: pidValue,
        PassportNumber: "",
        datefrom: "",
        dateto: toValue,
        ClaimStatusCode: statusValue,
      };
      axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/PatientSearch",
        {
          PatientInfo,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setPost(response.data);
      })
      .catch(function (error) {
        console.log(error.data);
      });
//     } else if (event.target.exampleRadios.value === "HOSPITAL_ID") {
//       console.log("HN")
//       const PatientInfo = {
//         InsurerCode: InsuranceCode,
//         IdType: event.target.exampleRadios.value,
//         PID: "",
//         HN: event.target.PID.value,
//         PassportNumber: "",
//         datefrom: event.target.DateFrom.value,
//         dateto: event.target.DateTo.value,
//         ClaimStatusCode: event.target.ClaimStatusCode.value,
//       };
//       axios
//       .post(
//         process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/PatientSearch",
//         {
//           PatientInfo,
//         }
//       )
//       .then(function (response) {
//         console.log(response.data);
//         setPost(response.data);
//       })
//       .catch(function (error) {
//         console.log(error.data);
//       });
//     } else if (event.target.exampleRadios.value === "PASSPORT_NO") {
//       console.log("PASSPORT_NO");
//       const PatientInfo = {
//         InsurerCode: InsuranceCode,
//         IdType: event.target.exampleRadios.value,
//         PID: "",
//         HN: "",
//         PassportNumber: event.target.PID.value,
//         datefrom: event.target.DateFrom.value,
//         dateto: event.target.DateTo.value,
//         ClaimStatusCode: event.target.ClaimStatusCode.value,
//       };
//       axios
//       .post(
//         process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/PatientSearch",
//         {
//           PatientInfo,
//         }
//       )
//       .then(function (response) {
//         console.log(response.data);
//         setPost(response.data);
//       })
//       .catch(function (error) {
//         console.log(error.data);
//       });
//   };
};

  const handleChange = (e) => {
    const value = e.target.value;
    // ตรวจสอบว่าค่าที่ใส่เป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInput(value);
    }
  };
  const createpatient = (e) => {
    e.preventDefault();
      document.getElementById("my_modal_3").showModal()
}

  return (
    <>
      {/* <div className="justify-center border-solid w-screen m-auto border-4 rounded-lg p-4"> */}

    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 sm:grid-cols-3 w-full">
        <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                        type="radio"
                        id="NATIONAL_ID"
                        name="identity_type"
                        value="NATIONAL_ID"
                        defaultChecked
                        onChange={handleOptionChange}
                // type="radio"
                // name="exampleRadios"
                // id="NATIONAL_ID"
                // value="NATIONAL_ID"
                //defaultChecked
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="PASSPORT_NO"
                        name="identity_type"
                        value="PASSPORT_NO"
                        checked={selectedOption === 'PASSPORT_NO'}
                        onChange={handleOptionChange}
                // type="radio"
                // name="exampleRadios"
                // id="PASSPORT_NO"
                // value="PASSPORT_NO"
                
              />
              <p className="text-left">&nbsp;Passport &nbsp;</p>
              <input
                        type="radio"
                        id="HOSPITAL_ID"
                        name="identity_type"
                        value="HOSPITAL_ID"
                        checked={selectedOption === 'HOSPITAL_ID'}
                        onChange={handleOptionChange}
                // type="radio"
                // name="exampleRadios"
                // id="HOSPITAL_ID"
                // value="HOSPITAL_ID"
              />
              <p className="text-left">&nbsp;HN &nbsp;</p>
            </div>
            {/* <input
                      type="text"
                      value={pidValue}
                      onChange={(e) => setPidValue(e.target.value)}
              // type="text"
               name="PID"
              // id="PID"
             className="input input-accent w-full rounded-full px-3 py-2"
             
            /> */}
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
                <button className="btn btn-neutral text-base-100 text-lg rounded-full px-3 py-2"

                type="submit"
                >
                  <FaSearch /> Search
                </button>
                <button
                  className="btn btn-success text-base-100 text-lg rounded-full px-3 py-2 ml-2"
                  onClick={createpatient}

                  
                >
                  <FaUserPlus /> Create Patient
                </button>
                {/* <button
                className="btn btn-success text-base-100 text-lg rounded-full px-3 py-2 ml-2"
                onClick={showsearch}
         
                ><FaSearch /> เพิ่มเติม</button> */}
              </div>
              <div className="rounded-md"></div>
            </div>
          </div>
          <div className="px-2 rounded-md"></div>
        </div>
        <details className="collapse -mt-3">
          <summary className="collapse-title font-medium">เพิ่มเติม</summary>
          <div className="collapse-content"> 

          <div className="grid gap-1 sm:grid-cols-3 w-full">

          <div className="rounded-md">
        <div className="grid gap-1 sm:grid-cols-2 w-full">
          <div className="px-2 rounded-md">
            {/* <input
               type="date"
              // name="DateFrom"
              // id="DateFrom"
               className="input input-accent w-full rounded-full px-3 py-2"

              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
            /> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>

<DatePicker
            label="Date From"
            value={fromValue}
            onChange={(newDate) => setFromValue(newDate)}
           
          />
      
    </LocalizationProvider>

            </div>
            <div className="px-2 rounded-md">
            {/* <input
              type="date"
              name="DateTo"
              id="DateTo"
              className="input input-accent w-full rounded-full px-3 py-2"

              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
       
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>

<DatePicker
            label="Date To"
            value={toValue}
            onChange={(newDate) => setToValue(newDate)}
           
          />
      
    </LocalizationProvider>
             </div>
            </div>


            
          </div>
          <div className="grid gap-1 sm:grid-cols-2 w-full">
          <div className="px-2 rounded-md">
          <p className="text-left">Claim Status</p>
            <select
              className="select input-accent w-full rounded-full px-3 py-2"
              name="ClaimStatusCode"
              id="ClaimStatusCode"
              
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
            >
              <option></option>
              {claimStatus
                ? claimStatus.map((status, index) => (
                    <option key={index}>{status.StatusDescTH}</option>
                  ))
                : ""}
            </select>
          </div>
          <div className="px-2 rounded-md">
          </div>
        </div>
          </div>


          </div>
        </details>
       
        {/* <div className="grid gap-1 sm:grid-cols-3 w-full"> */}

          <div className="px-2 rounded-md">

            
      {/* </div> */}


       

      </div>
    </form>
      {/* </div> */}
      <div className="justify-center border-solid w-full m-auto border-4 rounded-lg p-4 mt-6">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-info text-base-100 text-center text-lg">
              <tr>
                <th>ลำดับ</th>
                <th>Personal ID</th>
                <th>Passport</th>
                <th>HN</th>
                <th>Fullname</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {post
                ? post.HTTPStatus.statusCode < 400
                  ? (post.Result.PatientInfo.map((patientinfo, index) => (
                      <>
                        <tr className="hover" key={index}>
                          <td className="text-center">{index+1}</td>
                          <td>{patientinfo.PID}</td>
                          <td>{patientinfo.PassportNumber}</td>
                          <td className="text-center">{patientinfo.HN}</td>
                          <td>
                            {patientinfo.TitleTH}
                            {patientinfo.GivenNameTH} {patientinfo.SurnameTH}
                          </td>
                          <td className="text-center">
                            {patientinfo.DateOfBirth}
                          </td>
                          <td>
                            <div className="grid gap-1 sm:grid-cols-2 w-full text-accent ">
                              <Link href={`/aia/opd/checkeilgible`}>
                                <button className="btn bg-white text-accent w-full hover:text-base-100 hover:bg-neutral">
                                  Chack Eilgible
                                </button>
                              </Link>
                              <button
                                className="btn bg-white text-accent w-full hover:text-base-100 hover:bg-neutral"
                                onClick={Verify}
                                 
                                
                              >
                                Verify
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
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

      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="justify-center border-solid ">
            <h1 className="font-black text-accent text-3xl ">Create Patient</h1>
            {showFormCreate === "Succ" ? (
              <div role="alert" className="alert alert-success">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Created Successfully</span>
              </div>
            ) : (
              ""
            )}
            {showFormCreate === "Err" ? (
              <div role="alert" className="alert alert-error">
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
                <span>Error!!</span>
              </div>
            ) : (
              ""
            )}
            {showFormCreate === "Again" ? (
              <div role="alert" className="alert alert-warning">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>รายชื่อนี้มีอยู่แล้ว!</span>
              </div>
            ) : (
              ""
            )}
            {create ? (
              create.HTTPStatus.statusCode === 404 ? (
                <div role="alert" className="alert alert-error text-base-100">
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
                  <span>ไม่พบข้อมูล!!</span>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <form onSubmit={createPatientInfo}>
              <div className="grid gap-2 sm:grid-cols-2 w-full mt-2">
                <div className="rounded-md ">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exampleRadios"
                      id="NATIONAL_ID"
                      value="NATIONAL_ID"
                      defaultChecked
                    />
                    <p className="text-left">&nbsp;Personal ID</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exampleRadios"
                      id="HOSPITAL_ID"
                      value="HOSPITAL_ID"
                    />
                    <p className="text-left">&nbsp;HN</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exampleRadios"
                      id="PASSPORT_NO"
                      value="PASSPORT_NO"
                    />
                    <p className="text-left">&nbsp;Passport Number</p>
                  </div>
                </div>
                <div className="rounded-md ">
                  <div className="relative">
                    {/* <input
                    type="text"
                    name="id"
                    //value="1103900068701"
                    className="input input-bordered input-info w-full rounded-full px-3 py-2"
                    required
                  /> */}
                    <input
                      type="text"
                      name="PID"
                      className="input input-bordered w-full pr-16"
                      onChange={handleChange}
                      value={input}
                      required
                    />
                    <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                      <FaSearch />
                    </button>
                  </div>
                </div>
                {/* <div className="rounded-md">
                <button
                  type="submit"
                  className="btn btn-accent text-base-100 text-lg w-full rounded-full px-3 py-2"
                >
                  <FaSearch /> ค้นหา
                </button>
              </div> */}
                <div className="rounded-md ">
                  <p className="text-left">PID</p>
                </div>
                <div className="rounded-md">
                  {create ? create.Result.PatientInfo.PID : ""}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">HN</p>
                </div>
                <div className="rounded-md ">
                  {create ? create.Result.PatientInfo.HN : ""}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">Passport Number</p>
                </div>
                <div className="rounded-md">
                  {create ? create.Result.PatientInfo.PassportNumber : ""}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">Date Of Birth</p>
                </div>
                <div className="rounded-md">
                  {create ? create.Result.PatientInfo.DateOfBirth : ""}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">Fullname (TH)</p>
                </div>
                <div className="rounded-md ">
                  {create ? (
                    <>
                      {create.Result.PatientInfo.TitleTH}{" "}
                      {create.Result.PatientInfo.GivenNameTH}{" "}
                      {create.Result.PatientInfo.SurnameTH}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">Fullname (EN)</p>
                </div>
                <div className="rounded-md ">
                  {create ? (
                    <>
                      {create.Result.PatientInfo.TitleEN}{" "}
                      {create.Result.PatientInfo.GivenNameEN}{" "}
                      {create.Result.PatientInfo.SurnameEN}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">Mobile Phone</p>
                </div>
                <div className="rounded-md ">
                  {create ? create.Result.PatientInfo.MobilePhone : ""}
                </div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">
                  {create ? (
                    create.HTTPStatus.statusCode === 200 ? (
                      <>
                        <button
                          type="submit"
                          className="btn btn-accent text-base-100 text-lg rounded-full px-3 py-2 center"
                          onClick={saveCreate}
                        >
                          <RiSave3Fill /> Save
                        </button>
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="justify-center border-solid ">
            <h1 className="font-black text-accent text-3xl ">Update Data</h1>

            <div className="grid gap-2 sm:grid-cols-3 w-full">
              <div className="rounded-md "></div>
              <div className="rounded-md text-center">DataBase</div>
              <div className="rounded-md text-center">Trakcere</div>
              <div className="rounded-md ">
                <p className="text-left">Personal ID</p>
              </div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.PID : ""}</div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.PID : ""}</div>
              <div className="rounded-md ">
                <p className="text-left">Passport</p>
              </div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.PassportNumber : ""}</div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.PassportNumber : ""}</div>
              <div className="rounded-md ">
                <p className="text-left">Date of Birth</p>
              </div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.DateOfBirth : ""}</div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.DateOfBirth : ""}</div>
              <div className="rounded-md ">
                <p className="text-left">HN</p>
              </div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.HN : ""}</div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.HN : ""}</div>
              <div className="rounded-md ">
                <p className="text-left">Fullname (TH)</p>
              </div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.TitleTH : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.GivenNameTH : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.SurnameTH : ""}</div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.TitleTH : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.GivenNameTH : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.SurnameTH : ""}</div>
              <div className="rounded-md ">
                <p className="text-left">Fullname (EN)</p>
              </div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.TitleEN : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.GivenNameEN : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.SurnameEN : ""}</div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.TitleEN : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.GivenNameEN : ""} {patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.SurnameEN : ""}</div>
              <div className="rounded-md ">
                <p className="text-left">Mobile Phone</p>
              </div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.MobilePhone : ""}</div>
              <div className="rounded-md text-center">{patientFindforUpdate ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.MobilePhone : ""}</div>
              <div className="rounded-md "></div>
              <div className="rounded-md "></div>
              <div className="rounded-md ">
                <button
                  type="submit"
                  className="btn btn-accent text-base-100 text-lg w-full rounded-full px-3 py-2"
                  onClick={saveUpdate}
                >
                  <RiSave3Fill /> Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
