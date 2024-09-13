"use client";
import axios from "axios";
import { React, useState, useEffect, createContext } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { save } from "../../../../store/counterSlice";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function chackData() {
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
  const [statusValue, setStatusValue] = useState("");
  const [policyTypeValue, setPolicyTypeValue] = useState("");
  const [surgeryTypeValue, setSurgeryTypeValue] = useState("");
  const [illnessTypeValue, setIllnessTypeValue] = useState("");
  const router = useRouter();

  const { Patient } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  
  // const router = useRouter();
  const confirmButton = () => {
    dispatch(
      save({
        value: "มีข้อมูล",
        Data: {
          RefId: result.TransactionQuery.RefID,
          TransactionNo: result.TransactionQuery.TransactionNo,
          VN: detailVN,
          InsurerCode: InsurerCode,
        },
      })
    );
    router.push('/aia/opd/eilgible');
  };
  const Status = (event) => {
    setStatusValue(event.target.value);
  }
  
  const policy = (event) => {
    setPolicyTypeValue(event.target.value);
  }
  const Illness = (event) => {
    setIllnessTypeValue(event.target.value);
  }
  const surgery = (event) => {
    setSurgeryTypeValue(event.target.value);
  }
  // const policy = (event) => {
  //   setPolicyTypeValue(event.target.value);
  // }
  useEffect(() => {
    const getSurgery = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_SV + "v1/utils/IllnessSurgery/" + InsurerCode
      );
      const data = await response.json();
      setSurgeryType(data);
    };
    getSurgery();
  }, []);
    //console.log(surgeryType)
  useEffect(() => {
    const getIllnessType = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_SV + "v1/utils/IllnessType/" + InsurerCode
      );
      const data = await response.json();
      setIllnessType(data);
    };
    getIllnessType();
  }, []);
  useEffect(() => {
    const getPolicyType = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_SV + "v1/utils/policyType/" + InsurerCode
      );
      const data = await response.json();
      setPolicyType(data);
    };
    getPolicyType();
  }, []);
  useEffect(() => {
    const getServiceSetting = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_SV + "v1/utils/serviceSetting/" + InsurerCode
      );
      const data = await response.json();
      setServiceSetting(data);
    };
    getServiceSetting();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
          const DatefromValue = dayjs(fromValue.$d).format('YYYY-MM-DD');
   
    const PatientInfo = {
      PID: Patient.Data.PID,
      PassportNumber: Patient.Data.PassportNumber,
      IdType: Patient.Data.IdType,
      ServiceSettingCode: statusValue,
      Insurerid: InsurerCode,
      HN: Patient.Data.HN,
      VisitDatefrom: DatefromValue,
      VisitDateto: "",
    };

    axios
      .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-checkeligible/getEpisodeByHN/",{
        PatientInfo
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
  });
  };

  const check = (event) => {
    event.preventDefault();
    
    //console.log(event.target.selectVN.value);

    const [VNselectVN, VisitDateselectVN, AccidentDateselectVN] = event.target.selectVN.value.split(' | ');
    const [DayVN, MonthVN, YearVN] = VisitDateselectVN.split('/');
     setDetailVN(VNselectVN);

    axios
      .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-checkeligible/checkeligible/", {
    PatientInfo : {
          InsurerCode: InsurerCode, // ควรเป็น integer ไม่ใช่ string
          PID: Patient.Data.PID,
          HN: Patient.Data.HN,
          GivenNameTH: Patient.Data.GivenNameTH,
          SurnameTH: Patient.Data.SurnameTH,
          DateOfBirth: Patient.Data.DateOfBirth,
          PassportNumber: Patient.Data.PassportNumber,
          IdType: Patient.Data.IdType,
          VN: VNselectVN,
          VisitDateTime: YearVN+"-"+MonthVN+"-"+DayVN,
          AccidentDate: AccidentDateselectVN,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: statusValue, 
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode:  surgeryTypeValue,
        }
      })
      .then(function (response) {
        
        setResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setShowForm(!showForm);
    console.log(result)
      document.getElementById("my_modal_3").showModal();
  };


  return (
    <>

                {/* <form> */}
          <div className="justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4">
                  <h1 className="font-black text-accent text-3xl ">
                    Patient Details
                  </h1>
                <div className="grid grid-cols-4 gap-2 ">
                  <div ></div>
                  <div >FullName (TH)</div>
                  <div >{Patient.Data.TitleTH} {Patient.Data.GivenNameTH} {Patient.Data.SurnameTH}</div>
                  <div ></div>
                  <div></div>
                  <div >FullName (EN)</div>
                  <div>{Patient.Data.TitleEN} {Patient.Data.GivenNameEN} {Patient.Data.SurnameEN}</div>
                  <div></div>
                  <div ></div>
                  <div>Date Of Birth</div>
                    <div>{Patient.Data.DateOfBirth}</div>
                    <div ></div>
                    <div ></div >
                    <div >Gender</div>
                    <div >{Patient.Data.Gender}</div>
                    <div ></div >
                    <div ></div >
                    <div>HN</div>
                    <div>{Patient.Data.HN}</div>
                    <div ></div >
                </div >


               
                   
       
           
              
                  <h1 className="font-black text-accent text-3xl ">
                    Visit Details
                  </h1>
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
            required
          />
      
    </LocalizationProvider>
            </div>
          </div>
          <div className="px-2">
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
        >
          {serviceSetting
                ? serviceSetting.map((Service, index) => (
                    <MenuItem key={index} value={Service.ServiceSettingCode}>{Service.ServiceSettingCode} - {Service.ServiceSettingDesc}</MenuItem>
                  ))
                : ""}

        </Select>
      </FormControl>
            </div>
          </div>
          <div className="">
            <div className="">
            <button className="btn btn-primary text-base-100 text-lg rounded-full px-3 py-2"
type="submit"
>
  <FaSearch /> Search
</button>
            </div>
          </div>
        </div>
      </form>
                  {post ? post.HTTPStatus.statusCode === 200 ? (  
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
                        {post.Result.EpisodeInfo.map((ep, index) => (
                          <tr key={index} className="hover">
                            <td>
                              <input
                                type="radio"
                                name="selectVN"
                                value={`${ep.VN} | ${ep.VisitDate} | ${ep.AccidentDate}`}
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mt-4">
<div></div>
<div>
  <FormControl fullWidth>
  <InputLabel id="policyTypeValue">ประเภทกรมธรรม์</InputLabel>
  <Select
    labelId="policyTypeValue"
    id="demo-simple-select"
    value={policyTypeValue}
    label="policy"
    onChange={policy}
    className=""
    required
  >
{policyType ? policyType.map((policy, index) => (
    <MenuItem key={index} value={policy.PolicyTypeCode}>{policy.PolicyTypeDesc}</MenuItem>
    ))
    : ""}
    </Select>
</FormControl>
</div>
<div>
<FormControl fullWidth>
  <InputLabel id="illnessTypeValue">ประเภทของการรักษา</InputLabel>
  <Select
    labelId="illnessTypeValue"
    id="demo-simple-select"
    value={illnessTypeValue}
    label="illnessType"
    onChange={Illness}
    className=""
    required
  >
{illnessType ? illnessType.map((ill, index) => (
    <MenuItem key={index} value={ill.IllnessTypeCode}>{ill.IllnessTypeDesc}</MenuItem>
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
    label="surgery"
    onChange={surgery}
    className=""
    required
  >
{surgeryType ? surgeryType.map((surgery, index) => (
    <MenuItem key={index} value={surgery.ISCode}>{surgery.ISDescription}</MenuItem>
    ))
    : ""}
    </Select>
</FormControl>
</div>
<div><button
                    className="btn btn-primary text-base-100 hover:text-white text-xl"
                    type="submit"
                    // onClick={() =>

                    // }
                    //onClick={axiosFetch}
                  >
                    Check Eligible
                  </button></div>
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
                <span className="text-base-100">ไม่พบข้อมูล กรุณาลองใหม่อีกครั้ง</span>
        </div>
            </>
          ) : ""}
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

            <h1 className="text-accent text-3xl ">รายการสิทธิ์ประกัน</h1>
            <hr />
            {/* {result
              ? result.Result.InsuranceData.CoverageList.map((e, index) => (
                  <div key={index}>
                    <ul>
                      <li>
                        {e.Status === true ? (
                          <>Insurer : {result.Result.InsuranceData.InsurerCode}</>
                        ) : (
                          <>
                          Insurer :  ไม่มี
                          </>
                        )}
                        <ul>
                          <li>
                            {e.Status === true ? <>TypeTh : {e.Type}</> : <>TypeTh : ไม่มี</>}{" "}
                          </li>
                          <li>
                            {e.Status === true ? (
                              <>
                                {e.MessageList.map((ee, index) => (
                                  <div key={index}>- {ee.PlanName}</div>
                                ))}
                              </>
                            ) : (
                              ""
                            )}
                            <hr />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ))
              : ""} */}


            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>PolicyNo</th>
                  <th>PlanName</th>
                  <th>MessageTh</th>
                </tr>
              </thead>
              <tbody>
                {result ? (result.Result.InsuranceData.CoverageList.map((coverage, index) => (
                             coverage.Status === true ? (
                  coverage.MessageList.map((message, msgIndex) => (
                    <tr key={`${index}-${msgIndex}`}>
           
                      <td>{coverage.Type}</td>
                      <td>{message.PolicyNo}</td>
                      <td>{message.PlanName}</td>
                      <td>{message.MessageTh}</td>
                  
                    </tr>
                  ))
                ) : ""
                ))) : ""}
              </tbody>
            </table>
      



            <div className="modal-action">
              <button
                className="btn btn-primary text-base-100"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                ยืนยันการเคลม
              </button>
            </div>
          </form>
        </div>
        </dialog>

      <dialog id="my_modal_2" className="modal text-xl">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <h3 className="font-bold text-lg">ข้อมูลการส่งเคลม</h3>
            <hr />
            <div className="flex pt-3 text-xl">
              <input type="radio" name="exampleRadios" defaultChecked />
              <p className="text-left">&nbsp;เข้ารักษาครั้งแรก</p>
            </div>
            <div className="flex text-xl">
              <input type="radio" name="exampleRadios" />
              <p className="text-left">&nbsp;เข้ารักษาแบบต่อเนื่อง</p>
            </div>
            <div className="flex text-xl">
              <select className="select select-bordered w-64 max-w-xs">
                <option></option>
              </select>
            </div>

            <div className="modal-action">
              {/* <Link
                                    href={`/aia/opd/opdDischarge`}
                                  >  */}
              <button
                className="btn btn-primary text-base-100"
                onClick={confirmButton}
              >
                ยืนยัน
              </button>
              {/* </Link>  */}
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
