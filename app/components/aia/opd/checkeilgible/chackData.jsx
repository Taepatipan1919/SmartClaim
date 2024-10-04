"use client";
import axios from "axios";
import { React, useState, useEffect, createContext } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { save } from "../../../../store/counterSlice";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";

import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function chackData() {
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
  const [post, setPost] = useState("");
  const [serviceSetting, setServiceSetting] = useState();
  const [policyType, setPolicyType] = useState();
  const [illnessType, setIllnessType] = useState();
  const [surgeryType, setSurgeryType] = useState();
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState();
  const [detailVN, setDetailVN] = useState();
  const [fromValue, setFromValue] = useState(null);
  const [statusValue, setStatusValue] = useState("OPD");
  const [policyTypeValue, setPolicyTypeValue] = useState("");
  const [surgeryTypeValue, setSurgeryTypeValue] = useState("");
  const [illnessTypeValue, setIllnessTypeValue] = useState("");
  const router = useRouter();
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [showFormCheckEligibleError, setShowFormCheckEligibleError] =
    useState("");

  const [accidentDate, setAccidentDate] = useState("");
  const [visitDateTime, setVisitDateTime] = useState("");
  const [showbutton, setShowbutton] = useState("");
  const [furtherClaim, setFurtherClaim] = useState("");
  const ReDux = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // const router = useRouter();
  const confirmButton = () => {
    // console.log(ReDux)
    const PatientInfo = {
      InsurerCode: InsurerCode,
      RefId: ReDux.DataTran.Data.RefId,
      TransactionNo: ReDux.DataTran.Data.TransactionNo,
      PID: ReDux.Patient.Data.PID,
      HN: ReDux.Patient.Data.HN,
      GivenNameTH: ReDux.Patient.Data.GivenNameTH,
      SurnameTH: ReDux.Patient.Data.SurnameTH,
      DateOfBirth: ReDux.Patient.Data.DateOfBirth,
      PassportNumber: ReDux.Patient.Data.PassportNumber,
      IdType: ReDux.Patient.Data.IdType,
      VN: ReDux.DataTran.Data.VN,
      VisitDateTime: ReDux.DataTran.Data.VisitDateTime,
      AccidentDate: ReDux.DataTran.Data.AccidentDate,
    };
    console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_getRetrieveFurtherclaim,
        {
          //  PatientInfo
          PatientInfo,
        }
      )
      .then((response) => {
        setFurtherClaim(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");
        } catch (error) {
          setMassError(error.response.data.HTTPStatus.message);
          setShowFormError("Error");
        }
      });
    document.getElementById("my_modal_2").showModal();
  };
  const gourl = () => {
    if (selectedValue) {
      const [FurtherClaimNo, FurtherClaimId] = selectedValue.split(" | ");
      dispatch(
        save({
          value: "มีข้อมูล",
          Data: {
            RefId: result.Result.InsuranceData.RefId,
            TransactionNo: result.Result.InsuranceData.TransactionNo,
            VN: detailVN,
            InsurerCode: InsurerCode,
            ServiceSettingCode: statusValue,
            IllnessTypeCode: illnessTypeValue,
            SurgeryTypeCode: surgeryTypeValue,
            PolicyTypeCode: policyTypeValue,
            AccidentDate: accidentDate,
            VisitDateTime: visitDateTime,
            FurtherClaimNo: FurtherClaimNo,
            FurtherClaimId: FurtherClaimId,
          },
        })
      );
    } else {
      dispatch(
        save({
          value: "มีข้อมูล",
          Data: {
            RefId: result.Result.InsuranceData.RefId,
            TransactionNo: result.Result.InsuranceData.TransactionNo,
            VN: detailVN,
            InsurerCode: InsurerCode,
            ServiceSettingCode: statusValue,
            IllnessTypeCode: illnessTypeValue,
            SurgeryTypeCode: surgeryTypeValue,
            PolicyTypeCode: policyTypeValue,
            AccidentDate: accidentDate,
            VisitDateTime: visitDateTime,
            FurtherClaimNo: "",
            FurtherClaimId: "",
          },
        })
      );
    }

    router.push("/aia/opd/eligible");
  };

  const policy = (event) => {
    setPolicyTypeValue(event.target.value);
  };
  const Illness = (event) => {
    setIllnessTypeValue(event.target.value);
  };
  const surgery = (event) => {
    setSurgeryTypeValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_IllnessSurgery +
          InsurerCode
      )
      .then((response) => {
        // console.log(response.data)
        setSurgeryType(response.data);
      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");
        } catch (error) {
          setMassError(error.response.data.HTTPStatus.message);
          setShowFormError("Error");
        }
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_IllnessType +
          InsurerCode
      )
      .then((response) => {
        setIllnessType(response.data);
      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");
        } catch (error) {
          setMassError(error.response.data.HTTPStatus.message);
          setShowFormError("Error");
        }
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_PolicyType +
          InsurerCode
      )
      .then((response) => {
        setPolicyType(response.data);
      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");
        } catch (error) {
          setMassError(error.response.data.HTTPStatus.message);
          setShowFormError("Error");
        }
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_ServiceSetting +
          InsurerCode
      )
      .then((response) => {
        setServiceSetting(response.data);
      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");
        } catch (error) {
          setMassError(error.response.data.HTTPStatus.message);
          setShowFormError("Error");
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (fromValue) {
      const DatefromValue = dayjs(fromValue.$d).format("YYYY-MM-DD");
      setShowFormError();
      const PatientInfo = {
        Insurerid: InsurerCode,
        PID: ReDux.Patient.Data.PID,
        PassportNumber: ReDux.Patient.Data.PassportNumber,
        IdType: ReDux.Patient.Data.IdType,
        ServiceSettingCode: statusValue,
        HN: ReDux.Patient.Data.HN,
        VisitDatefrom: DatefromValue,
        VisitDateto: "",
      };
      // console.log(PatientInfo)
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD +
            process.env.NEXT_PUBLIC_URL_getEpisodeByHN,
          {
            PatientInfo,
          }
        )
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          // console.error("Error", err)
          console.log(error);
          //  if (err.response.request.status === 500) {
          setShowFormError("Error");
          setMassError(error.response.data.HTTPStatus.message);
          //  }
        });
    } else {
      setShowFormError("Error");
      setMassError("กรุณากรอกวันที่!!");
    }
  };

  const check = async (event) => {
    event.preventDefault();

    setResult();
    setShowbutton();
    setShowFormCheckEligibleError();
    setSelectedValue();
    // console.log(event.target.selectVN.value);

    const [VNselectVN, VisitDateselectVN, AccidentDateselectVN] =
      event.target.selectVN.value.split(" | ");
    //const [YearVN, MonthVN, DayVN] = VisitDateselectVN.split('-');
    const Acc = VisitDateselectVN.split(" ");
    // setVisitDate(VisitDateTime)
    setAccidentDate(Acc[0]);
    setVisitDateTime(VisitDateselectVN);
    setDetailVN(VNselectVN);

    const PatientInfo = {
      InsurerCode: InsurerCode, // ควรเป็น integer ไม่ใช่ string
      RefID: "",
      TransactionNo: "",
      PID: ReDux.Patient.Data.PID,
      HN: ReDux.Patient.Data.HN,
      GivenNameTH: ReDux.Patient.Data.GivenNameTH,
      SurnameTH: ReDux.Patient.Data.SurnameTH,
      DateOfBirth: ReDux.Patient.Data.DateOfBirth,
      PassportNumber: ReDux.Patient.Data.PassportNumber,
      IdType: ReDux.Patient.Data.IdType,
      VN: VNselectVN,
      VisitDateTime: VisitDateselectVN,
      //VisitDateTime : "2024-10-01 00:00",
      AccidentDate: Acc[0],
      PolicyTypeCode: policyTypeValue,
      ServiceSettingCode: statusValue,
      IllnessTypeCode: illnessTypeValue,
      SurgeryTypeCode: surgeryTypeValue,
    };
    // console.log(PatientInfo)
    try {
      document.getElementById("my_modal_3").showModal();
      // try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_checkeligible,
        {
          PatientInfo,
        }
      );

      if (response.data.HTTPStatus.statusCode < 400) {
        setResult(response.data);
        //  console.log(response.data)
        setShowFormCheckEligibleError();
      } else {
        setShowFormCheckEligibleError("Error");
        setMassError(response.data.HTTPStatus.message);
      }
    } catch (error) {
      console.log(error);
      if (error.status !== 500) {
        const ErrorMass = error.config.url;
        const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
        setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
        setShowFormCheckEligibleError("Error");
      } else {
        setShowFormCheckEligibleError("Error");
        setMassError(error.response.data.HTTPStatus.message);
      }

      // console.log(error)
      //  setShowFormError("Error");
      //  setMassError(error.response.data.HTTPStatus.message);
    }
  };

  return (
    <>
      {/* <form> */}
      <div className="justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4">
        <h1 className="font-black text-accent text-3xl ">Patient Details</h1>
        <div className="grid grid-cols-4 gap-2 ">
          <div></div>
          <div>FullName (TH)</div>
          <div>
            {ReDux.Patient.Data.TitleTH} {ReDux.Patient.Data.GivenNameTH}{" "}
            {ReDux.Patient.Data.SurnameTH}
          </div>
          <div></div>
          <div></div>
          <div>FullName (EN)</div>
          <div>
            {ReDux.Patient.Data.TitleEN} {ReDux.Patient.Data.GivenNameEN}{" "}
            {ReDux.Patient.Data.SurnameEN}
          </div>
          <div></div>
          <div></div>
          <div>Date Of Birth</div>
          <div>{ReDux.Patient.Data.DateOfBirth}</div>
          <div></div>
          <div></div>
          <div>Gender</div>
          <div>{ReDux.Patient.Data.Gender}</div>
          <div></div>
          <div></div>
          <div>HN</div>
          <div>{ReDux.Patient.Data.HN}</div>
          <div></div>
        </div>

        <h1 className="font-black text-accent text-3xl ">Visit Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-center w-1/2 m-auto ">
            <div className="px-2">
              {" "}
              <div className="">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="วันที่เข้ารับการรักษา"
                    value={fromValue}
                    onChange={(newDate) => setFromValue(newDate)}
                    format="YYYY-MM-DD"
                    className="input-info"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="input-info"
                        error={error}
                        helperText={error ? "กรุณาเลือกวันที่" : ""}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            {/* <div className="px-2">
            <div className="">
                   <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">ประเภทการเข้ารักษา</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusValue}
          label="Type"
          onChange={Status}
          className="w-52 max-w-xs"
          required
        >
          {serviceSetting
                ? serviceSetting.map((Service, index) => (
                    <MenuItem key={index} value={Service.ServiceSettingCode}>{Service.ServiceSettingCode} - {Service.ServiceSettingDesc}</MenuItem>
                  ))
                : ""}

        </Select>
      </FormControl>
            </div>
          </div> */}
            <div className="">
              <div className="">
                <button
                  className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 text-lg rounded-full px-3 py-2"
                  type="submit"
                >
                  <FaSearch /> Search
                </button>
              </div>
            </div>
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

        {post ? (
          post.HTTPStatus.statusCode === 200 ? (
            <>
              <form onSubmit={check}>
                <div className="overflow-x-auto mt-2">
                  <table className="table">
                    <thead className="bg-info text-base-100 text-center text-lg">
                      <tr>
                        <th></th>
                        <th>VN</th>
                        <th>VisitDate</th>
                        <th>AccidentDate</th>
                        <th>LocationDesc</th>
                        <th>WardDesc</th>
                        <th>DoctorLicense</th>
                        <th>MainCareproviderDecs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {post ? (
                        post.Result.EpisodeInfo.map((ep, index) => (
                          <tr key={index} className="hover">
                            <td>
                              <input
                                type="radio"
                                name="selectVN"
                                value={`${ep.VN} | ${ep.VisitDateTime} | ${ep.AccidentDate}`}
                                className="radio checked:bg-blue-500"
                                defaultChecked
                              />
                            </td>
                            <td>{ep.VN}</td>
                            <td>{ep.VisitDateTime}</td>
                            <td>{ep.AccidentDate}</td>
                            <td>{ep.LocationDesc}</td>
                            <td>{ep.WardDesc}</td>
                            <td>{ep.DoctorLicense}</td>
                            <td>{ep.MainCareproviderDesc}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
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
                <div className="grid grid-cols-6 gap-2 mt-4">
                  <div></div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="policyTypeValue">
                        ประเภทกรมธรรม์
                      </InputLabel>
                      <Select
                        labelId="policyTypeValue"
                        id="demo-simple-select"
                        value={policyTypeValue}
                        label="ประเภทกรมธรรม์"
                        onChange={policy}
                        className=""
                        required
                      >
                        {policyType
                          ? policyType.Result.map((policy, index) => (
                              <MenuItem
                                key={index}
                                value={policy.policytypecode}
                              >
                                {policy.policytypedesc}
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="illnessTypeValue">
                        ประเภทของการรักษา
                      </InputLabel>
                      <Select
                        labelId="illnessTypeValue"
                        id="demo-simple-select"
                        value={illnessTypeValue}
                        label="ประเภทของการรักษา"
                        onChange={Illness}
                        className=""
                        required
                      >
                        {illnessType
                          ? illnessType.Result.map((ill, index) => (
                              <MenuItem key={index} value={ill.illnesstypecode}>
                                {ill.illnesstypedesc}
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="surgeryTypeValue">การผ่าตัด</InputLabel>
                      <Select
                        labelId="surgeryTypeValue"
                        id="demo-simple-select"
                        value={surgeryTypeValue}
                        label="การผ่าตัด"
                        onChange={surgery}
                        className=""
                        required
                      >
                        {surgeryType
                          ? surgeryType.Result.map((surgery, index) => (
                              <MenuItem key={index} value={surgery.iscode}>
                                {surgery.isdesc}
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 text-xl"
                      type="submit"
                      // onClick={() =>

                      // }
                      //onClick={axiosFetch}
                    >
                      Check Eligible
                    </button>
                  </div>
                  <div></div>
                </div>
              </form>
            </>
          ) : (
            <>
              <div
                role="alert"
                className="alert alert-error justify-center flex flex-row w-1/2 m-auto mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current text-base-100"
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
                <span className="text-base-100">
                  ไม่พบข้อมูล กรุณาลองใหม่อีกครั้ง
                </span>
              </div>
            </>
          )
        ) : (
          ""
        )}
      </div>

      {/* </>
      ) : (
        <></>
      )}  */}

      {/* {showForm && ( */}

      <dialog id="my_modal_3" className="modal text-xl	">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            {showFormCheckEligibleError === "Error" ? (
              <div
                role="alert"
                className="alert alert-error mt-2 text-base-100"
              >
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
              <>
                <h1 className="text-accent text-3xl ">รายการสิทธิ์ประกัน</h1>
                <hr />
                <table className="table">
                  <thead className="bg-info text-base-100">
                    <tr>
                      <th>Type</th>
                      <th>PolicyNo</th>
                      <th>PlanName</th>
                      <th>MessageTh</th>
                      <th>Chack eligible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result ? (
                      result.Result.InsuranceData.CoverageList.map(
                        (coverage, index) =>
                          //  coverage.Status === true ? (

                          coverage.MessageList.map((message, msgIndex) => (
                            // <tr key={`${index}`}>
                            <tr key={`${index}-${msgIndex}`}>
                              <td>{coverage.Type}</td>
                              <td>{message.PolicyNo}</td>
                              <td>{message.PlanName}</td>
                              <td>{message.MessageTh}</td>
                              {coverage.Status === true ? (
                                <>
                                  <td className="text-success text-2xl">
                                    <IoMdCheckmarkCircle />
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="text-error text-2xl">
                                    <FaCircleXmark />
                                  </td>
                                </>
                              )}
                            </tr>
                          ))

                          // ) : (
                          //   coverage.MessageList.map((message, msgIndex) => (
                          //     <tr key={`${index}-${msgIndex}`}>

                          //       <td>{coverage.Type}</td>
                          //       <td>{message.PolicyNo}</td>
                          //       <td>{message.PlanName}</td>
                          //       <td>{message.MessageTh}</td>

                          //     </tr>
                          //   ))
                          // )
                      )
                    ) : (
                      <tr>
                        <td></td>
                        <td>
                          <span className="loading loading-spinner text-error size-10 "></span>
                        </td>
                        <td>
                          <div className="justify-center text-4xl">
                            Loading....
                          </div>
                        </td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-info w-full whitespace-normal text-center">
                  <div className="rounded-md"></div>
                  <div className="rounded-md"></div>
                  <div className="rounded-md "></div>
                  <div className="rounded-md ">&nbsp;</div>
                </div>
                {result ? (
                  result.Result.InsuranceData.CoverageClaimStatus === true ? (
                    <div className="modal-action">
                      <button
                        className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100"
                        onClick={confirmButton}
                        // onClick={() =>
                        //   document.getElementById("my_modal_2").showModal()
                        // }
                      >
                        ยืนยันการเคลม
                      </button>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            )}
          </form>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal text-xl">
        <div className="modal-box">
          <form method="dialog" onSubmit={gourl}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <h3 className="font-bold text-2xl text-accent">ข้อมูลการส่งเคลม</h3>
            <hr />
            <div className="flex pt-3 text-xl">
              <div role="tablist" className="tabs-bordered">
                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab text-xl"
                  aria-label="เข้ารักษาครั้งแรก"
                  defaultChecked
                />

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab text-xl"
                  aria-label="เข้ารักษาแบบต่อเนื่อง"
                />
                <div role="tabpanel" className="tab-content mt-4">
                  <label className="form-control w-full">
                    <select
                      className="select select-bordered"
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      {furtherClaim
                        ? furtherClaim.Result.InsuranceData.FurtherClaimList.map(
                            (ftc, index) => (
                              // <option key={index} value={ftc.ClaimNo}>เลขกรมธรรม์: {ftc.ClaimNo}, วันที่เข้ารักษา: {ftc.VisitDateTime.split('T')[0]}</option>
                              <option
                                key={index}
                                value={`${ftc.ClaimNo} | ${ftc.FurtherClaimId}`}
                              >
                                เลขกรมธรรม์: {ftc.ClaimNo}, วันที่เข้ารักษา:{" "}
                                {ftc.VisitDateTime.split("T")[0]}
                              </option>
                            )
                          )
                        : ""}
                      <></>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-action">
              {/* <Link
                                    href={`/aia/opd/opdDischarge`}
                                  >  */}
              <button
                className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100"
                //  onClick={gourl}
              >
                ยืนยัน
              </button>
              {/* </Link>  */}
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
