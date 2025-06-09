import { useState, useEffect } from "react";
import useEffectOnce from "/hooks/use-effect-once";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";
import { RiFileUserFill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/navigation";

import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from "react-redux";
import { save2 } from "../../../store/patientSlice";
import { useSelector } from "react-redux";

export default function SelectPatient() {
  const error = {
    response: {
      data: {
        HTTPStatus: {
          statusCode: "",
          message: "",
          error: "",
        },
      },
    },
  };
  const InsurerCode = 13;
  // const [claimStatus, setClaimStatus] = useState();
  const [post, setPost] = useState("");
  const [create, setCreate] = useState("");
  const [showFormCreate, setShowFormCreate] = useState("");
  const [showMassCreate, setShowMassCreate] = useState("");
  const [input, setInput] = useState("");
  const [patientFindforUpdate, setPatientFindforUpdate] = useState("");
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("NATIONAL_ID");
  const [pidValue, setPidValue] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [showSuccUpdate, setShowSuccUpdate] = useState("");
  const [patientupdate, setPatientUpdate] = useState({});

  ////////////////Create Redux Patient /////////////////////////
  const { Patient } = useSelector((state) => ({ ...state }));
  // console.log(Patient)
  const dispatch = useDispatch();
  const status = (event) => {
    setStatusValue(event.target.value);
  };
  const PatientA = (patient) => {
    // console.log(patient)
    dispatch(
      save2({
        value: "มีรายชื่อ",
        Data: {
          //IdType: selectedOption,
          InsurerCode: InsurerCode,
          DateOfBirth: patient.DateOfBirth,
          Gender: patient.Gender,
          GivenNameEN: patient.GivenNameEN,
          GivenNameTH: patient.GivenNameTH,
          HN: patient.HN,
          MobilePhone: patient.MobilePhone,
          PID: patient.PID,
          PassportNumber: patient.PassportNumber,
          SurnameEN: patient.SurnameEN,
          SurnameTH: patient.SurnameTH,
          TitleEN: patient.TitleEN,
          TitleTH: patient.TitleTH,
        },
      })
    );

    router.push("/aia/checkeligible");
  };

  const createPatientInfo = (event) => {
    setShowFormCreate();
    setCreate();
    event.preventDefault();

    if (event.target.exampleRadios.value === "NATIONAL_ID") {
      const PatientInfo = {
        InsurerCode: InsurerCode,
        IdType: event.target.exampleRadios.value,
        PID: event.target.PID.value,
        HN: "",
        PassportNumber: "",
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_FindPatientTrakcare,
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          setCreate(response.data);
        })
        .catch(function (error) {
          console.log(error);
          setShowFormCreate("Error");
          setShowMassCreate(error.message);
        });
    } else if (event.target.exampleRadios.value === "HOSPITAL_ID") {
      const PatientInfo = {
        InsurerCode: InsurerCode,
        IdType: event.target.exampleRadios.value,
        PID: "",
        HN: event.target.PID.value,
        PassportNumber: "",
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_FindPatientTrakcare,
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          setCreate(response.data);
          //console.log(response.data);
        })
        .catch(function (error) {
          //console.log(error);
          setShowFormCreate("Error");
          setShowMassCreate(error.message);
        });
    } else if (event.target.exampleRadios.value === "PASSPORT_NO") {
      //console.log("PASSPORT_NO");
      const PatientInfo = {
        InsurerCode: InsurerCode,
        IdType: event.target.exampleRadios.value,
        PID: "",
        HN: "",
        PassportNumber: event.target.PID.value,
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_FindPatientTrakcare,
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          setCreate(response.data);
          //console.log(response.data);
        })
        .catch(function (error) {
          //console.log(error);
          setShowFormCreate("Error");
          setShowMassCreate(error.message);
        });
    }
  };
  function saveCreate() {
    setShowFormCreate();
    setShowMassCreate();
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_CreatePatient,
        {
          PatientInfo: {
            InsurerCode: InsurerCode, // ควรเป็น integer ไม่ใช่ string
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
        //console.log(response.data);
        setShowFormCreate("Succ");
      })
      .catch(function (error) {
        console.log(error);
        if (error.status !== 500) {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setShowMassCreate(
            error.code + " - " + error.message + " - " + ErrorMass2
          );
          setShowFormCreate("Error");
        } else {
          setShowFormCreate("Again");
          setShowMassCreate(error.response.data.HTTPStatus.message);
        }

        // console.log(error.response.data.HTTPStatus.statusCode)
        // console.log(error.response.data.HTTPStatus.message);
        // console.log(error.response)
        // if (error.response.request.status === 500) {
        //   setShowFormCreate("Error");
        //   setShowMassCreate(error.response.data.HTTPStatus.message)
        // } else {

        //   setShowFormCreate("Again");
        // }
      });

    //console.log(dataCreate);
  }

  const PatientB = (patient) => {
    setPatientUpdate({
      PID: patient.PID,
      HN: patient.HN,
      PassportNumber: patient.PassportNumber,
    });

    setShowSuccUpdate();
    //console.log(patient)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_PatientFindforUpdate,
        {
          PatientInfo: {
            InsurerCode: InsurerCode,
            RefID: "",
            TransactionNo: "",
            PID: patient.PID,
            HN: patient.HN,
            PassportNumber: patient.PassportNumber,
            IdType: "HOSPITAL_ID",
            VN: "",
            StatusClaimCode: "01",
            VisitDatefrom: "",
            VisitDateto: "",
          },
        }
      )
      .then(function (response) {
         console.log(response.data);
        setPatientFindforUpdate(response.data);
        document.getElementById("my_modal_1").showModal();
      })
      .catch(function (error) {
        // console.log(error.response.request.status);
        setMassError(response.data.HTTPStatus.message);
        setShowFormError("Error");
      });
  };
  function saveUpdate() {
    setPatientFindforUpdate();
    axios
      .patch(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_PatientUpdate,
        {
          PatientInfo: {
            InsurerCode: 13,
            PatientID:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare.PatientID,
            PID: patientFindforUpdate.Result.PatientInfo.PatientTrakcare.PID,
            PassportNumber:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                .PassportNumber,
            HN: patientFindforUpdate.Result.PatientInfo.PatientTrakcare.HN,
            TitleTH:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare.TitleTH,
            GivenNameTH:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                .GivenNameTH,
            SurnameTH:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare.SurnameTH,
            TitleEN:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare.TitleEN,
            GivenNameEN:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                .GivenNameEN,
            SurnameEN:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare.SurnameEN,
            DateOfBirth:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                .DateOfBirth,
            Gender:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare.Gender,
            MobilePhone:
              patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                .MobilePhone,
          },
        }
      )
      .then(function (response) {
        //  console.log(response.data);
        setShowSuccUpdate("Succ");

        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_PatientFindforUpdate,
            {
              PatientInfo: {
                InsurerCode: InsurerCode,
                RefID: "",
                TransactionNo: "",
                PID: patientupdate.PID,
                HN: patientupdate.HN,
                PassportNumber: patientupdate.PassportNumber,
                IdType: "HOSPITAL_ID",
                VN: "",
                StatusClaimCode: "01",
                VisitDatefrom: "",
                VisitDateto: "",
              },
            }
          )
          .then(function (response) {
            // console.log(response.data);
            setPatientFindforUpdate(response.data);
          })
          .catch(function (error) {
            console.log(error.response.request.status);
          });
      })
      .catch(function (error) {
        console.log(error.response.request.status);
      });
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const Status = (event) => {
    setStatusValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('ค้นหาด้วย:', selectedOption, 'ค่า:', pidValue);

    if (selectedOption === "NATIONAL_ID") {
      // console.log("PID")
      const PatientInfo = {
        InsurerCode: InsurerCode,
        IdType: selectedOption,
        PID: pidValue.trim(),
        HN: "",
        PassportNumber: "",
        // datefrom: "",
        // dateto: "",
        // ClaimStatusCode: statusValue,
      };

      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_PatientSearch,
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          console.log(response.data);
          if (response.data.HTTPStatus.statusCode === 200) {
            setShowFormError("");
            setPost(response.data);
          } else {
            setMassError(response.data.HTTPStatus.message);
            setShowFormError("Error");
          }
        })
        .catch(function (error) {
          console.log(error);
          try {
            const ErrorMass = error.config.url;
            const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
            setMassError(
              error.code + " - " + error.message + " - " + ErrorMass2
            );
            setShowFormError("Error");
          } catch (error) {
            setShowFormError("Error");
            setMassError(error.response.data.HTTPStatus.message);
          }
        });
    } else if (selectedOption === "HOSPITAL_ID") {
      //console.log("HN")
      const PatientInfo = {
        InsurerCode: InsurerCode,
        IdType: selectedOption,
        PID: "",
        HN: pidValue.trim(),
        PassportNumber: "",
        // datefrom: "",
        // dateto: "",
        // ClaimStatusCode: statusValue,
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_PatientSearch,
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          //  console.log(response.data);
          if (response.data.HTTPStatus.statusCode === 200) {
            setShowFormError("");
            setPost(response.data);
          } else {
            setMassError(response.data.HTTPStatus.message);
            setShowFormError("Error");
          }
        })
        .catch(function (error) {
          console.log(error);
          try {
            const ErrorMass = error.config.url;
            const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
            setMassError(
              error.code + " - " + error.message + " - " + ErrorMass2
            );
            setShowFormError("Error");
          } catch (error) {
            setShowFormError("Error");
            setMassError(error.response.data.HTTPStatus.message);
          }
        });
    } else if (selectedOption === "PASSPORT_NO") {
      //console.log("PASSPORT_NO");
      const PatientInfo = {
        InsurerCode: InsurerCode,
        IdType: selectedOption,
        PID: "",
        HN: "",
        PassportNumber: pidValue.trim(),
        // datefrom: "",
        // dateto: "",
        // ClaimStatusCode: statusValue,
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_PatientSearch,
          {
            PatientInfo,
          }
        )
        .then(function (response) {
          //   console.log(response.data);
          if (response.data.HTTPStatus.statusCode === 200) {
            setShowFormError("");
            setPost(response.data);
          } else {
            setMassError(response.data.HTTPStatus.message);
            setShowFormError("Error");
          }
        })
        .catch(function (error) {
          console.log(error);
          try {
            const ErrorMass = error.config.url;
            const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
            setMassError(
              error.code + " - " + error.message + " - " + ErrorMass2
            );
            setShowFormError("Error");
          } catch (error) {
            setShowFormError("Error");
            setMassError(error.response.data.HTTPStatus.message);
          }
        });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // if (/^[a-zA-Z0-9]*$/.test(value)) {
    setInput(value);
    // }
  };
  const createpatient = (e) => {
    //    setShowFormCreate();
    setShowMassCreate();
    setCreate();
    setShowFormCreate();
    e.preventDefault();
    document.getElementById("my_modal_3").showModal();
  };
  //console.log(post)
  return (
    <>
      {/* <div className="justify-center border-solid w-screen m-auto border-4 rounded-lg p-4"> */}

      <form onSubmit={handleSubmit}>
        {/* <div className="grid gap-1 sm:grid-cols-5 w-full mt-2"> */}
        <div className="flex items-center  w-full mt-2">
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
                checked={selectedOption === "PASSPORT_NO"}
                onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Passport &nbsp;</p>
              <input
                type="radio"
                id="HOSPITAL_ID"
                name="identity_type"
                value="HOSPITAL_ID"
                className="checkbox checkbox-info"
                checked={selectedOption === "HOSPITAL_ID"}
                onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN &nbsp;</p>
            </div>
            <TextField
              id="standard-multiline-flexible"
              label="กรอกข้อความ"
              //multiline
            //  maxRows={1}
              variant="standard"
              className="w-full"
              name="PID"
              type="text"
              value={pidValue}
              onChange={(e) => setPidValue(e.target.value)}
              focused 
            />
          </div>
          <div className="rounded-md pt-6">
            <div className="w-full">
              <div className="rounded-md">
                <button
                  className="btn btn-primary text-base-100 hover:bg-base-100 hover:text-primary text-lg rounded-full px-3 py-2"
                  type="submit"
                >
                  <FaSearch /> Search
                </button>
                <button
                  className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 text-lg rounded-full px-3 py-2 ml-2"
                  onClick={createpatient}
                >
                  <FaUserPlus /> Create Patient
                </button>
              </div>
              <div className="rounded-md"></div>
            </div>
          </div>
          <div className="px-2 rounded-md"></div>
        </div>
      </form>
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
      ) : (
        ""
      )}
        <div className="justify-center border-solid w-full m-auto border-2 border-warning rounded-lg p-4 mt-6">
          <div className="overflow-x-auto mt-2">
            <table className="table">
              <thead className="bg-info text-base-100 text-center text-lg">
                <tr>
                  <th></th>
                  <th>Personal ID</th>
                  <th>Passport</th>
                  <th>HN</th>
                  <th>Fullname</th>
                  <th>Date of Birth (Y-M-D)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {post ? (
                  post.HTTPStatus.statusCode < 400 ? (
                    post.Result.PatientInfo.map((patient, index) => 
                      patient.HN && (
                      (
                      <tr className="hover" key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{patient.PID}</td>
                        <td>{patient.PassportNumber}</td>
                        <td className="text-center">{patient.HN}</td>
                        <td>
                          {patient.TitleTH}
                          {patient.GivenNameTH} {patient.SurnameTH}
                        </td>
                        <td className="text-center">{patient.DateOfBirth}</td>
                        <td>
                          <div className="grid gap-1 sm:grid-cols-2 w-full text-accent ">
                            {/* <Link href={`/aia/checkeligible`}> */}
                            <button
                              className="btn bg-white text-primary w-full hover:text-base-100 hover:bg-primary"
                              onClick={() => PatientA(patient)}
                            >
                              Check eligible
                            </button>
                            {/* </Link> */}
                            <button
                              className="btn bg-white text-error w-full hover:text-base-100 hover:bg-primary"
                              onClick={() => PatientB(patient)}
                            >
                              Verify
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                      )
                  )
                  ) : (
                    <>
                    </>
                  )
                ) : (
                  <>
                  </>
                )}
              </tbody>
            </table>
            <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-info w-full whitespace-normal text-center">
              <div className="rounded-md"></div>
              <div className="rounded-md"></div>
              <div className="rounded-md "></div>
              <div className="rounded-md ">&nbsp;</div>
            </div>
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
              <div role="alert" className="alert alert-success text-base-100">
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
            {showFormCreate === "Error" ? (
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
                <span>{showMassCreate}</span>
              </div>
            ) : (
              ""
            )}
            {showFormCreate === "Again" ? (
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{showMassCreate}</span>
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
                      className="checkbox checkbox-info size-5"
                    />
                    <p className="text-left">&nbsp;Personal ID</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exampleRadios"
                      id="HOSPITAL_ID"
                      value="HOSPITAL_ID"
                      className="checkbox checkbox-info size-5"
                    />
                    <p className="text-left">&nbsp;HN</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exampleRadios"
                      id="PASSPORT_NO"
                      value="PASSPORT_NO"
                      className="checkbox checkbox-info size-5"
                    />
                    <p className="text-left">&nbsp;Passport Number</p>
                  </div>
                </div>
                <div className="rounded-md ">
                  <div className="relative">
                    <input
                      type="text"
                      name="PID"
                      className="input input-bordered w-full pr-16"
                      onChange={handleChange}
                      value={input}
                      required
                    />
                    <button className="btn btn-primary hover:bg-base-100 hover:text-primary text-base-100 absolute top-0 right-0 rounded-l-none">
                      <FaSearch />
                    </button>
                  </div>
                </div>
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
      <div className="rounded-md ">
 
         </div> 
                <div className="rounded-md ">
                  {create ? (
                    create.HTTPStatus.statusCode === 200 ? (
                      <>
                        <button
                          type="submit"
                          className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 text-lg rounded-full px-3 py-2 center"
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
        <div className="modal-box max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="justify-center border-solid ">
            <h1 className="font-black text-accent text-3xl">Update Data</h1>
            {showSuccUpdate === "Succ" ? (
              <div role="alert" className="alert alert-success text-base-100">
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
                <span>Update Successfully</span>
              </div>
            ) : (
              ""
            )}
            <div className="grid gap-2 sm:grid-cols-3 w-full">
              <div className="rounded-md "></div>
              <div className="rounded-md text-center">SmartClaim</div>
              <div className="rounded-md text-center">Trakcere</div>
              <div className="rounded-md ">
                <p className="text-left">Personal ID</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.PID
                  : ""}
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.PID
                  : ""}
              </div>
              <div className="rounded-md ">
                <p className="text-left">Passport</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .PassportNumber
                  : ""}
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .PassportNumber
                  : ""}
              </div>
              



              <div className="rounded-md ">
                <p className="text-left">หมายเลขประจำตัวสมาชิก</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .MembershipId
                  : ""}
              </div>
              <div className="rounded-md text-center">
              </div>
              <div className="rounded-md ">
                <p className="text-left">หมายเลขกรมธรรม์</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .PolicyNumber
                  : ""}
              </div>
              <div className="rounded-md text-center">
              </div>
              <div className="rounded-md ">
                <p className="text-left">รหัสลูกค้า</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .CustomerId
                  : ""}
              </div>
              <div className="rounded-md text-center">
              </div>





              <div className="rounded-md ">
                <p className="text-left">HN</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase.HN
                  : ""}
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare.HN
                  : ""}
              </div>
              <div className="rounded-md ">
                <p className="text-left">Fullname (TH)</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .TitleTH
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .GivenNameTH
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .SurnameTH
                  : ""}
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .TitleTH
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .GivenNameTH
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .SurnameTH
                  : ""}
              </div>
              <div className="rounded-md ">
                <p className="text-left">Fullname (EN)</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .TitleEN
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .GivenNameEN
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .SurnameEN
                  : ""}
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .TitleEN
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .GivenNameEN
                  : ""}{" "}
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .SurnameEN
                  : ""}
              </div>
              <div className="rounded-md ">
                <p className="text-left">Date of Birth</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .DateOfBirth
                  : ""}
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .DateOfBirth
                  : ""}
              </div>
              <div className="rounded-md ">
                <p className="text-left">Mobile Phone</p>
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientDatabase
                      .MobilePhone
                  : ""}
              </div>
              <div className="rounded-md text-center">
                {patientFindforUpdate
                  ? patientFindforUpdate.Result.PatientInfo.PatientTrakcare
                      .MobilePhone
                  : ""}
              </div>
              <div className="rounded-md "></div>
              <div className="rounded-md "></div>
              <div className="rounded-md ">
                <button
                  type="submit"
                  className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 text-lg w-full rounded-full px-3 py-2"
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
