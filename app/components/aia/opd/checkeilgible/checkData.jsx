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
export default function checkData() {
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
  const [load, setLoad] = useState();
  const [mass, setMass] = useState();
  const [hS, setHS ] = useState();
  const [hB, setHB ] = useState();
  const [aI, setAI ] = useState();
  const [randomNumber, setRandomNumber] = useState('');
  const [result, setResult] = useState();
  const [detailVN, setDetailVN] = useState();
  const [fromValue, setFromValue] = useState(null);
  const [accValue, setAccValue] = useState(null);
  const [statusValue, setStatusValue] = useState("OPD");
  const [policyTypeValue, setPolicyTypeValue] = useState("");
  const [surgeryTypeValue, setSurgeryTypeValue] = useState("");
  const [illnessTypeValue, setIllnessTypeValue] = useState("");
  const router = useRouter();
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [showFormCheckEligibleError, setShowFormCheckEligibleError] =useState("");
  const [massFurtherError, setMassFurtherError] = useState("");
  const [showFormFurtherError, setShowFormFurtherError] =useState("");
  const [transactionNoL, setTransactionNoL] =useState("");
  const [refIdL, setRefIdL] =useState("");
  const [testMe, setTestMe] = useState(false);
  const [patientInfo, setPatientInfo] =useState("");
  const [succFurtherClaim, setSuccFurtherClaim] = useState(false);
  const [accidentDate, setAccidentDate] = useState("");
  const [visitDateTime, setVisitDateTime] = useState("");
  const [showbutton, setShowbutton] = useState("");
  const [furtherClaim, setFurtherClaim] = useState("");
  //console.log(furtherClaim)
  const ReDux = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [furtherClaimNo, setFurtherClaimNo] = useState("");
  const [furtherClaimId, setFurtherClaimId] = useState("");
  const [claimNoL, setClaimNoL] = useState("");
  const [visitDateTimeL, setVisitDateTimeL] = useState("");



  useEffect(() => {
    setRandomNumber();
    if(!ReDux.DataTran.Data.Runningdocument){
    const generateRandomFiveDigitNumber = () => {
      return String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    };
    const newRandomNumber = generateRandomFiveDigitNumber();
    setRandomNumber(newRandomNumber);
    console.log(newRandomNumber);
  }else{
    setRandomNumber(ReDux.DataTran.Data.Runningdocument)
  }

  }, []);
  const handleSelectChange = (event) => {


    setSelectedValue(event.target.value);


    const [RefId, TransactionNo , ClaimNo , VisitDateTime] = event.target.value.split(" | ");
    setRefIdL(RefId)
    setTransactionNoL(TransactionNo)
    setClaimNoL(ClaimNo)
    setVisitDateTimeL(VisitDateTime) 

    console.log(ClaimNo)
    console.log(VisitDateTime)
  };
  const handleButtonClick = (data) => {
    //บันทึก Create

console.log(refIdL)
console.log(transactionNoL)
    const PatientInfo = {
       InsurerCode: InsurerCode, 
       RefId: refIdL,
       TransactionNo: transactionNoL,
       PID: ReDux.Patient.Data.PID,
       HN: ReDux.Patient.Data.HN,
       GivenNameTH: ReDux.Patient.Data.GivenNameTH,
       SurnameTH: ReDux.Patient.Data.SurnameTH,
       DateOfBirth: ReDux.Patient.Data.DateOfBirth,
       PassportNumber: ReDux.Patient.Data.PassportNumber,
       IdType: ReDux.Patient.Data.IdType,
       VN: detailVN,
       VisitDateTime: visitDateTime,
       AccidentDate: accidentDate,
       PolicyTypeCode: policyTypeValue,
       ServiceSettingCode: statusValue,
       IllnessTypeCode: illnessTypeValue,
       SurgeryTypeCode:  surgeryTypeValue,
       Runningdocument: randomNumber,
    }
    axios
    .post(
      process.env.NEXT_PUBLIC_URL_PD +
        process.env.NEXT_PUBLIC_URL_crateTransaction,
      {
          PatientInfo
      }
    )
    .then((response) => {
console.log(response.data)

    })
    .catch((error) => {
      console.log(error);
      // try {
      //   const ErrorMass = error.config.url;
      //   const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
      //   setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
      //   setShowFormFurtherError("Error");
      // } catch (error) {
      //   setMassError(error.response.data.HTTPStatus.message);
      //   setShowFormFurtherError("Error");
      // }
    });


    window.print();

  };
  
  const PrintButton = () => {
    window.print();
  };
  const confirmButton = (data) => {
    setFurtherClaim();
    setShowFormFurtherError();
    setMassFurtherError();
   // console.log(ReDux)
    // console.log(data)
    const [RefId, TransactionNo] = data.split(" | ");
    setRefIdL(RefId)
    setTransactionNoL(TransactionNo)
    const PatientInfo = {
      InsurerCode: InsurerCode,
      RefId: RefId,
      TransactionNo: TransactionNo,
      PID: ReDux.Patient.Data.PID,
      HN: ReDux.Patient.Data.HN,
      GivenNameTH: ReDux.Patient.Data.GivenNameTH,
      SurnameTH: ReDux.Patient.Data.SurnameTH,
      DateOfBirth: ReDux.Patient.Data.DateOfBirth,
      PassportNumber: ReDux.Patient.Data.PassportNumber,
      IdType: ReDux.Patient.Data.IdType,
      VN: detailVN,
      VisitDateTime: visitDateTime,
      AccidentDate: accidentDate,
      ServiceSettingCode: statusValue,
      IllnessTypeCode: illnessTypeValue,
      SurgeryTypeCode: surgeryTypeValue,
      PolicyTypeCode: policyTypeValue,
      FurtherClaimNo: furtherClaimNo,
      FurtherClaimId: furtherClaimId,
    };
     console.log(PatientInfo);

  setLoad(true)
     
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_getRetrieveFurtherclaim,
        {
            PatientInfo
        }
      )
      .then((response) => {
        console.log(response.data)
        setLoad(false)
        // if(response.data.HTTPStatus.statusCode === 200){
          setFurtherClaim(response.data);
       //   console.log(response.data);
   
        // }else{
         // setMassFurtherError(response.data.HTTPStatus.message);
         // setShowFormFurtherError("Error");
        // }

      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassFurtherError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormCheckEligibleError("Error");
        } catch (error) {
          setMassFurtherError(error.response.data.HTTPStatus.message);
          setShowFormCheckEligibleError("Error");
        }
      });
  
  };



  const gourl = (event) => {
    event.preventDefault();
    if (selectedValue) {
      //เลือกแบบต่อเนื่อง
      const [FurtherClaimNo, FurtherClaimId] = selectedValue.split(" | ");
      setFurtherClaimNo(FurtherClaimNo)
      setFurtherClaimId(FurtherClaimId)
      // dispatch(
      //   save({
      //     value: "มีข้อมูล",
      //     Data: {
      //       // RefId: "x9v8T2G/i6pEuNughp+kX8bNr83caECQjC+vvuEaIKY=",
      //       // TransactionNo: "3ba72f56-c764-43ff-9000-920453ba3d5b",
      //       // VN: "O604374-65",
      //       // InsurerCode: 13,
      //       // ServiceSettingCode: "OPD",
      //       // IllnessTypeCode: "ACC",
      //       // SurgeryTypeCode: "N",
      //       // PolicyTypeCode: "IB",
      //       // AccidentDate: "2024-10-01",
      //       // VisitDateTime:"2024-10-01 08:22",
      //       // FurtherClaimNo: "",
      //       // FurtherClaimId: "",

      //       RefId: refIdL,
      //       TransactionNo: transactionNoL,
      //       VN: detailVN,
      //       InsurerCode: InsurerCode,
      //       ServiceSettingCode: statusValue,
      //       IllnessTypeCode: illnessTypeValue,
      //       SurgeryTypeCode: surgeryTypeValue,
      //       PolicyTypeCode: policyTypeValue,
      //       AccidentDate: accidentDate,
      //       VisitDateTime: visitDateTime,
      //       FurtherClaimNo: FurtherClaimNo,
      //       FurtherClaimId: FurtherClaimId,
      //       Runningdocument : "",
      //     },
      //   })
      // );
    } else {
      //รักษาครั้งแรก


      // dispatch(
      //   save({
      //     value: "มีข้อมูล",
      //     Data: {
      //       // RefId: "ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=",
      //       // TransactionNo: "5c5aabb3-b919-4ee8-ac42-848ae4d5f55a",
      //       // VN: "O477382-67",
      //       // InsurerCode: 13,
      //       // ServiceSettingCode: "OPD",
      //       // IllnessTypeCode: "ER",
      //       // SurgeryTypeCode: "N",
      //       // PolicyTypeCode: "IB",
      //       // AccidentDate: "2024-09-08",
      //       // VisitDateTime:"2024-09-08 08:22",
      //       // FurtherClaimNo: "",
      //       // FurtherClaimId: "",

      //       RefId: refIdL,
      //       TransactionNo: transactionNoL,
      //       VN: detailVN,
      //       InsurerCode: InsurerCode,
      //       ServiceSettingCode: statusValue,
      //       IllnessTypeCode: illnessTypeValue,
      //       SurgeryTypeCode: surgeryTypeValue,
      //       PolicyTypeCode: policyTypeValue,
      //       AccidentDate: accidentDate,
      //       VisitDateTime: visitDateTime,
      //       FurtherClaimNo: "",
      //       FurtherClaimId: "",
      //       Runningdocument: "",
      //     },
      //   })
      // );
    }
    setSuccFurtherClaim(true)
    setFurtherClaim();


    //  router.push("/aia/opd/eligible");
  };

  const policy = (event) => {
    setPolicyTypeValue(event.target.value);
  };
  const [selectedOption, setSelectedOption] = useState('');
  const [textInputVisible, setTextInputVisible] = useState(false);
  const Illness = (event) => {
    setIllnessTypeValue(event.target.value);


    setSelectedOption(event.target.value);
    if ((event.target.value === 'ACC')||(event.target.value === 'ER')) {
      setTextInputVisible(true);
    } else {
      setTextInputVisible(false);
    }



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
          // console.log(response.data)
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
    setFurtherClaim();
    setMass();
    setResult();
    setShowbutton();
    setShowFormCheckEligibleError();
    setSelectedValue();
    setHS();
    setHB();
    setAI();
    setSuccFurtherClaim(false)
    const [VNselectVN, VisitDateselectVN] = event.target.selectVN.value.split(" | ");
    //const [YearVN, MonthVN, DayVN] = VisitDateselectVN.split('-');
    // const Acc = accValue.split(" ");
    // setVisitDate(VisitDateTime)
    let DateAccValue;
    let TypeValue;

    if(accValue){
    DateAccValue = dayjs(accValue.$d).format("YYYY-MM-DD");
    }else{
      DateAccValue="";
    }

    setAccidentDate(DateAccValue);
    setVisitDateTime(VisitDateselectVN);
    setDetailVN(VNselectVN);

    

    if (illnessTypeValue === "DAY") {
      TypeValue = "IPD";
    } else {
      TypeValue = "OPD";
    }

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
      // AccidentDate: Acc[0],
      AccidentDate: DateAccValue,
      PolicyTypeCode: policyTypeValue,
      ServiceSettingCode: TypeValue,
      IllnessTypeCode: illnessTypeValue,
      SurgeryTypeCode: surgeryTypeValue,
    };
    console.log(PatientInfo);
    setPatientInfo(PatientInfo)
     try {
      document.getElementById("my_modal_3").showModal();

      const response = await axios.post(
    //  `http://localhost:3000/api/v1/check-eligible/checkeligible/`,
          process.env.NEXT_PUBLIC_URL_PD +
            process.env.NEXT_PUBLIC_URL_checkeligible,
        {
          PatientInfo,
        }
      );

      if (response.data.HTTPStatus.statusCode < 400) {
        setResult(response.data);
         console.log(response.data);


         
          if (response.data) {
            setMass();
            const hasTrueStatus = response.data.Result.InsuranceData.CoverageList.some(coverage => coverage.Status === true);
            const HS = response.data.Result.InsuranceData.CoverageList.some(coverage => coverage.Type === "ผลประโยชน์ค่ารักษาพยาบาล" && coverage.Status === true);
            const HB = response.data.Result.InsuranceData.CoverageList.some(coverage => coverage.Type === "ผลประโยชน์ค่าชดเชยนอนรพ" && coverage.Status === true);
            const AI = response.data.Result.InsuranceData.CoverageList.some(coverage => coverage.Type === "ผลประโยชน์ค่าชดเชย" && coverage.Status === true);
            // const HSBypass = response.data.Result.InsuranceData.CoverageList.some(coverage => coverage.Type === "ผลประโยชน์ค่ารักษาพยาบาลที่ต้องตรวจสอบความคุ้มครองโดยเจ้าหน้าที่ AIA" && coverage.Status === true);
            if (hasTrueStatus) {
              setMass(true);
            }else{
              setMass(false)
            }
            
            if(HS){
              setHS(true);
            
            }else{
              setHS(false);
            }
            if(HB){
              setHB(true);
            
            }else{
              setHB(false);
            }
            if(AI){
              setAI(true);
      
            }else{
              setAI(false);
            }
            // if(HSBypass){
            //   setHSBypass(true);
        
            // }else{
            //   setHSBypass(false);
            // }

          }


        setShowFormCheckEligibleError();
      } else {
        console.log(response.data);
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
         {/*     <form onSubmit={gourl}>*/}
               <form onSubmit={check}> 
                <div className="overflow-x-auto mt-2">
                  <table className="table">
                    <thead className="bg-info text-base-100 text-center text-lg">
                      <tr>
                        <th></th>
                        <th>VN</th>
                        <th>VisitDate</th>
                        {/* <th>AccidentDate</th> */}
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
                            {/* <td>{ep.AccidentDate}</td> */}
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
                <div className="grid grid-cols-7 gap-2 mt-4">
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
                  

                  {textInputVisible &&

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="วันที่เกิดอุบัติเหตุ"
                    value={accValue}
                    onChange={(newDate) => setAccValue(newDate)}
                    format="YYYY-MM-DD"
                    slotProps={{
                      openPickerButton: { color: "error" },
                      textField: { focused: true, color: "error" },
                    }}
        
                  />
                </LocalizationProvider>

 }
     
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

      <dialog id="my_modal_3" className="modal text-xl ">
        <div className="modal-box w-full h-full max-w-7xl ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
                <h1 className="text-accent text-3xl text-center">ผลการตรวจสอบสิทธิ์</h1>

                <div className="flex  w-full mt-4">
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-center">ข้อมูลส่วนตัว</h2>
          <p className="">รหัสประจำตัวประชาชน: {patientInfo.PID}</p>
          <p className="">HN: {patientInfo.HN}</p>
          <p className="">ชื่อ: {patientInfo.GivenNameTH} {patientInfo.SurnameTH}</p>
          <p className="">วันเกิด: {patientInfo.DateOfBirth}</p>
        </div>
        
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md ml-2">
          <h2 className="text-xl font-semibold mb-2 text-center">จากการตรวจสอบเบื้องต้น</h2>
          <p className="text-xl text-center">
            <b className=""> 
           {mass === true ? <p className="underline">** มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : mass === false ? <p className="text-error underline">** ไม่มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : <span className="loading loading-spinner text-error size-10 "></span>}
          
           </b>
          </p>
      
                    <div className="rounded-md">
                    ประเภทกรมธรรม์ : {policyTypeValue === "IB" ? "ประกันรายบุคคล" : "ประกันกลุ่ม"}
                    </div>
                    <div className="rounded-md">
                    ประเภทรักษา : {illnessType ?
            illnessType.Result.map((ill) => 
            ill.illnesstypecode  ===  patientInfo.IllnessTypeCode ? ( <>
             {ill.illnesstypedesc} </>
            ) : "") : ""}
                    </div>
                    <div className="rounded-md">
                    การผ่าตัด : {surgeryTypeValue === "N" ? "ไม่มีการผ่าตัด" : "มีการผ่าตัด"}
                    </div>
                    <div className="rounded-md">
                    วันที่เข้าการรักษา : {patientInfo.VisitDateTime}
                    </div>
                    {selectedValue ?
                    <div className="rounded-md">
                    รักษาแบบต่อเนื่อง : 
                    <br/>- เลขกรมธรรม์: {claimNoL} 
                    <br/>- วันที่เข้ารักษา: {visitDateTimeL} 
                                    
                                    </div> : ""}

                    

        <div className="flex justify-center mt-4">   

          {mass ? (mass === true ? (



 
  (patientInfo.IllnessTypeCode === "ER" || patientInfo.IllnessTypeCode === "ACC") ? (
 succFurtherClaim === true ? 
  <div className="rounded-md">
  <div
    className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
    onClick={() =>handleButtonClick(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )}
  >
    ลงทะเบียนใช้สิทธิ์
  </div>
  </div> 
  : (
  furtherClaim ? (<div className="rounded-md w-full">
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
                              <option
                                key={index}
                                value={`${ftc.ClaimNo} | ${ftc.FurtherClaimId} | ${ftc.ClaimNo} | ${ftc.VisitDateTime}`}
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
              <div className="flex justify-end p-4">
              <div
                className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 "
                  onClick={gourl}
              >
                ยืนยัน
              </div>
              </div>
  </div>) : ( //furtherClaim===""

!selectedValue ? load === true ? <span className="loading loading-spinner text-error size-10 "></span> :
(<div className="rounded-md">
<div
  className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
  onClick={() =>
    confirmButton(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )
  }
>
  {/* ต่อเนื่อง */}
   ลงทะเบียนใช้สิทธิ์(ต่อเนื่อง)
</div>

</div>) : ("รอ")

  ) )

          ) : (
  <div className="rounded-md">
  <div
    className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
    onClick={() =>handleButtonClick(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )}
  >
    ลงทะเบียนใช้สิทธิ์
  </div>
  </div> 
)

 
          ) : (
            <div className="rounded-md">
            <div
              className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
              onClick={PrintButton}
            >
              Print
            </div>
        </div>
          )
          ) : ""}

         </div>
        </div>
      </div>

      {((showFormCheckEligibleError)||(showFormFurtherError)) === "Error" ? (
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
                <span>{(massError)||(massFurtherError)}</span>
              </div>
            ) : (
              <>
              <h1 className="text-2xl mt-2 flex items-center">ผลการตรวจสอบสิทธิ์ ค่ารักษาพยาบาล (HS/ME) 
              {hS === true ? <b className="underline ml-2">มีสิทธิ์เรียกร้องสินไหม</b> :  hS === false ? <b className="text-error underline  ml-2">ไม่สามารถใช้สิทธิ์เรียกร้องสินไหม</b> : "" } 
              </h1>
                <table className="table mt-2">
                  <thead className="bg-info text-base-100">
                    <tr>
                    <th>เลขที่กรมธรรม์</th>
                    <th>สัญญาเพิ่มเติม</th>
                      <th>ผลการตรวจสอบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result ? (
                      result.Result.InsuranceData.CoverageList.map(
                        (coverage, index) =>
                            coverage.Type === "ผลประโยชน์ค่ารักษาพยาบาล" ? (

                          coverage.MessageList.map((message, msgIndex) => (
                            <tr key={`${index}-${msgIndex}`}>
                              <td>{message.PolicyNo}</td>
                              <td>{message.PlanName}</td>
                              <td>{message.MessageTh}</td>
                            </tr>
                          ))
                      ) : ""
                    )) : (
                      <tr>
                        <td></td>
                        <td>
                          <div className="justify-center text-4xl">
                              <span className="loading loading-bars loading-lg"></span>
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
                  <div className="rounded-md ">&nbsp;</div>
                </div>



                <h1 className="text-2xl mt-2 flex items-center">ผลการตรวจสอบสิทธิ์ ค่ารักษาพยาบาล (AI/HB) 
           {(aI||hB) === true ? <b className="underline ml-2">มีสิทธิ์เรียกร้องสินไหม</b> : (aI||hB) === false ? <b className="text-error underline ml-2">ไม่สามารถใช้สิทธิ์เรียกร้องสินไหม</b> : "" } 
           
                </h1>
                <table className="table mt-2">
                  <thead className="bg-info text-base-100">
                    <tr>
                    <th>เลขที่กรมธรรม์</th>
                    <th>สัญญาเพิ่มเติม</th>
                      <th>ผลการตรวจสอบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result ? (
                      result.Result.InsuranceData.CoverageList.map(
                        (coverage, index) =>
                            (coverage.Type === "ผลประโยชน์ค่าชดเชย"||coverage.Type === "ผลประโยชน์ค่าชดเชยนอนรพ") ? (

                          coverage.MessageList.map((message, msgIndex) => (
                            <tr key={`${index}-${msgIndex}`}>
                              <td>{message.PolicyNo}</td>
                              <td>{message.PlanName}</td>
                              <td>{message.MessageTh}</td>
                            </tr>
                          ))
                      ) : ""
                    )) : (
                      <tr>
                        <td></td>
                        <td>
                          <div className="justify-center text-4xl">
                            <span className="loading loading-bars loading-lg"></span>
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
                  <div className="rounded-md ">&nbsp;</div>
                </div>
              </>
            )}
          </form>
        </div>
      </dialog>

    </>
  );
}
