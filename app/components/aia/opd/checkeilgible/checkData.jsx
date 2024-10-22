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
  const [idType, setIdType] = useState();
  const [illnessType, setIllnessType] = useState();
  const [surgeryType, setSurgeryType] = useState();
  const [showForm, setShowForm] = useState(false);
  const [load, setLoad] = useState();
  const [numberValue, setNumberValue] = useState("");
  const [vNValue, setVNValue] = useState("");
  const [mass, setMass] = useState();
  const [hS, setHS ] = useState();
  const [hB, setHB ] = useState();
  const [aI, setAI ] = useState();
  const [randomNumber, setRandomNumber] = useState('');
  const [result, setResult] = useState();
  const [detailVN, setDetailVN] = useState();
  const [fromValue, setFromValue] = useState(null);
  const [accValue, setAccValue] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [policyTypeValue, setPolicyTypeValue] = useState("");
  const [idTypeValue, setIdTypeValue] = useState("");
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
  const [succFurtherClaim2, setSuccFurtherClaim2] = useState(false);
  const [accidentDate, setAccidentDate] = useState("");
  const [visitDateTime, setVisitDateTime] = useState("");
  const [showbutton, setShowbutton] = useState("");
  const ReDux = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [furtherClaim, setFurtherClaim] = useState("");
  const [furtherClaimNo, setFurtherClaimNo] = useState("");
  const [furtherVN, setFurtherVN] = useState("");
  const [furtherClaimId, setFurtherClaimId] = useState("");
  const [visitDateTimeL, setVisitDateTimeL] = useState("");
  const [claimNoL, setClaimNoL] = useState("");
  const [patientDB, setPatientDB] = useState("");
  

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


  const PatientInfo = {
    InsurerCode: InsurerCode,
    IdType: "HOSPITAL_ID",
    PID: ReDux.Patient.Data.PID,
    HN: ReDux.Patient.Data.HN,
    PassportNumber: "",
  };

  axios
    .post(
      process.env.NEXT_PUBLIC_URL_PD +
        process.env.NEXT_PUBLIC_URL_PatientSearch,
      {
        PatientInfo,
      }
    )
    .then(function (response) {
      console.log(response.data);
      if (response.data.HTTPStatus.statusCode === 200) {
        setShowFormError("");
        setPatientDB(response.data.Result.PatientInfo[0]);
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




  
  }, []);
  const handleSelectChange = (event) => {


    setSelectedValue(event.target.value);

  //console.log(event.target.value)
    const [ClaimNo, FurtherClaimId , VisitDateTime , VN] = event.target.value.split(" | ");

    setFurtherClaimId(FurtherClaimId)
    setFurtherClaimNo(ClaimNo)
    setVisitDateTimeL(VisitDateTime) 
    setFurtherVN(VN) 
    setVNValue(VN)
  };
  const handleButtonVNClick = (data) => {
setSuccFurtherClaim2(true)
  }

  const handleButtonBlackVNClick = (data) => {
    setSuccFurtherClaim2(false)
      }
  const handleButtonClick = (data) => {
    //บันทึก Create
    let PatientInfo;

    const [RefId, TransactionNo] = data.split(" | ");

if(idTypeValue === "NATIONAL_ID"){
  PatientInfo = {
    InsurerCode: InsurerCode, 
    RefId: RefId,
    TransactionNo: TransactionNo,
    HN: patientDB.HN,
    GivenNameTH: patientDB.GivenNameTH,
    SurnameTH: patientDB.SurnameTH,
    DateOfBirth: patientDB.DateOfBirth,
    VN: detailVN,
    VisitDateTime: visitDateTime,
    AccidentDate: accidentDate,
    PolicyTypeCode: policyTypeValue,
    ServiceSettingCode: statusValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: numberValue,
    PassportNumber: "",
    MembershipId:"",  
    CustomerId : "",
    PolicyNumber:"",
    FurtherClaimVN: vNValue,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
 }
}else if(idTypeValue === "PASSPORT"){
  PatientInfo = {
    InsurerCode: InsurerCode, 
    RefId: RefId,
    TransactionNo: TransactionNo,
    HN: patientDB.HN,
    GivenNameTH: patientDB.GivenNameTH,
    SurnameTH: patientDB.SurnameTH,
    DateOfBirth: patientDB.DateOfBirth,
    VN: detailVN,
    VisitDateTime: visitDateTime,
    AccidentDate: accidentDate,
    PolicyTypeCode: policyTypeValue,
    ServiceSettingCode: statusValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: numberValue,
    MembershipId:"",  
    CustomerId : "",
    PolicyNumber:"",
    FurtherClaimVN: vNValue,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
 }
}else if(idTypeValue === "MEMBERSHIP_ID"){
  PatientInfo = {
    InsurerCode: InsurerCode, 
    RefId: RefId,
    TransactionNo: TransactionNo,
    HN: patientDB.HN,
    GivenNameTH: patientDB.GivenNameTH,
    SurnameTH: patientDB.SurnameTH,
    DateOfBirth: patientDB.DateOfBirth,
    VN: detailVN,
    VisitDateTime: visitDateTime,
    AccidentDate: accidentDate,
    PolicyTypeCode: policyTypeValue,
    ServiceSettingCode: statusValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: "",
    MembershipId: numberValue,  
    CustomerId : "",
    PolicyNumber:"",
    FurtherClaimVN: vNValue,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
 }
}else if(idTypeValue === "POLICY_NUMBER"){
  PatientInfo = {
    InsurerCode: InsurerCode, 
    RefId: RefId,
    TransactionNo: TransactionNo,
    HN: patientDB.HN,
    GivenNameTH: patientDB.GivenNameTH,
    SurnameTH: patientDB.SurnameTH,
    DateOfBirth: patientDB.DateOfBirth,
    VN: detailVN,
    VisitDateTime: visitDateTime,
    AccidentDate: accidentDate,
    PolicyTypeCode: policyTypeValue,
    ServiceSettingCode: statusValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: "",
    MembershipId: "",  
    CustomerId : "",
    PolicyNumber: numberValue,
    FurtherClaimVN: vNValue,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
 }
}else if(idTypeValue === "CUSTOMER_ID"){
  PatientInfo = {
    InsurerCode: InsurerCode, 
    RefId: RefId,
    TransactionNo: TransactionNo,
    HN: patientDB.HN,
    GivenNameTH: patientDB.GivenNameTH,
    SurnameTH: patientDB.SurnameTH,
    DateOfBirth: patientDB.DateOfBirth,
    VN: detailVN,
    VisitDateTime: visitDateTime,
    AccidentDate: accidentDate,
    PolicyTypeCode: policyTypeValue,
    ServiceSettingCode: statusValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: "",
    MembershipId: "",  
    CustomerId : numberValue,
    PolicyNumber: "",
    FurtherClaimVN: vNValue,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
 }
}
    
    console.log(PatientInfo)
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
      PID: patientDB.PID,
      HN: patientDB.HN,
      GivenNameTH: patientDB.GivenNameTH,
      SurnameTH: patientDB.SurnameTH,
      DateOfBirth: patientDB.DateOfBirth,
      PassportNumber: patientDB.PassportNumber,
      IdType: numberValue,
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
          console.log(response.data);
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

    setSuccFurtherClaim(true)
    setFurtherClaim();


    //  router.push("/aia/opd/eligible");
  };
  const idtype = (event) => {
    console.log(event.target.value)
    setIdTypeValue(event.target.value);
    if(event.target.value === "NATIONAL_ID"){
      setNumberValue(patientDB.PID)
      if(!patientDB.PID){
        setNumberValue("");
      }
    }else if(event.target.value === "PASSPORT"){
      setNumberValue(patientDB.PassportNumber)
      if(!patientDB.PassportNumber){
        setNumberValue("");
      }
    }else if(event.target.value === "MEMBERSHIP_ID"){
      setNumberValue(patientDB.MembershipId)
      if(!patientDB.MembershipId){
        setNumberValue("");
      }
    }else if(event.target.value === "POLICY_NUMBER"){
      setNumberValue(patientDB.PolicyNumber)
      if(!patientDB.PolicyNumber){
        setNumberValue("");
      }
    }else if(event.target.value === "CUSTOMER_ID"){
      setNumberValue(patientDB.CustomerId)
      if(!patientDB.CustomerId){
        setNumberValue("");
      }
    }
   
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
          process.env.NEXT_PUBLIC_URL_idtype +
         InsurerCode
      )
      .then((response) => {
        setIdType(response.data);
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
        PID: patientDB.PID,
        PassportNumber: patientDB.PassportNumber,
        IdType: numberValue,
        ServiceSettingCode: statusValue,
        HN: patientDB.HN,
        VisitDatefrom: DatefromValue,
        VisitDateto: "",
      };
       console.log(PatientInfo)
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

    // console.log(numberValue)
    event.preventDefault();
    setFurtherClaim();
    setMass();
    setResult();
    setShowbutton();
    setSuccFurtherClaim2(false);
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
    let PatientInfo;
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

    if(idTypeValue === "NATIONAL_ID"){
      PatientInfo = {
        InsurerCode: InsurerCode, 
        RefID: "",
        TransactionNo: "",
        HN: patientDB.HN,
        GivenNameTH: patientDB.GivenNameTH,
        SurnameTH: patientDB.SurnameTH,
        DateOfBirth: patientDB.DateOfBirth,
        VN: VNselectVN,
        VisitDateTime: VisitDateselectVN,
        AccidentDate: DateAccValue,
        PolicyTypeCode: policyTypeValue,
        ServiceSettingCode: TypeValue,
        IllnessTypeCode: illnessTypeValue,
        SurgeryTypeCode: surgeryTypeValue,
  
        IdType: idTypeValue,
        // PID: numberValue,
        PID: "0480000004185",
        PassportNumber: "",
        MembershipId:"",  
        CustomerId : "",
        PolicyNumber:"",
        FurtherClaimVN:"",
        FurtherClaimNo: "",
        FurtherClaimId: ""
      };
    }else if(idTypeValue === "PASSPORT"){
      PatientInfo = {
        InsurerCode: InsurerCode, 
        RefID: "",
        TransactionNo: "",
        HN: patientDB.HN,
        GivenNameTH: patientDB.GivenNameTH,
        SurnameTH: patientDB.SurnameTH,
        DateOfBirth: patientDB.DateOfBirth,
        VN: VNselectVN,
        VisitDateTime: VisitDateselectVN,
        AccidentDate: DateAccValue,
        PolicyTypeCode: policyTypeValue,
        ServiceSettingCode: TypeValue,
        IllnessTypeCode: illnessTypeValue,
        SurgeryTypeCode: surgeryTypeValue,
  
        IdType: idTypeValue,
        PID: "",
        PassportNumber: numberValue,
        MembershipId:"",  
        CustomerId : "",
        PolicyNumber:"",
        FurtherClaimVN:"",
        FurtherClaimNo: "",
        FurtherClaimId: ""
      };
    }else if(idTypeValue === "MEMBERSHIP_ID"){
      PatientInfo = {
        InsurerCode: InsurerCode, 
        RefID: "",
        TransactionNo: "",
        HN: patientDB.HN,
        GivenNameTH: patientDB.GivenNameTH,
        SurnameTH: patientDB.SurnameTH,
        DateOfBirth: patientDB.DateOfBirth,
        VN: VNselectVN,
        VisitDateTime: VisitDateselectVN,
        AccidentDate: DateAccValue,
        PolicyTypeCode: policyTypeValue,
        ServiceSettingCode: TypeValue,
        IllnessTypeCode: illnessTypeValue,
        SurgeryTypeCode: surgeryTypeValue,
  
        IdType: idTypeValue,
        PID: "",
        PassportNumber: "",
        MembershipId: numberValue,  
        CustomerId : "",
        PolicyNumber:"",
        FurtherClaimVN:"",
        FurtherClaimNo: "",
        FurtherClaimId: ""
      };
    }else if(idTypeValue === "POLICY_NUMBER"){
      PatientInfo = {
        InsurerCode: InsurerCode, 
        RefID: "",
        TransactionNo: "",
        HN: patientDB.HN,
        GivenNameTH: patientDB.GivenNameTH,
        SurnameTH: patientDB.SurnameTH,
        DateOfBirth: patientDB.DateOfBirth,
        VN: VNselectVN,
        VisitDateTime: VisitDateselectVN,
        AccidentDate: DateAccValue,
        PolicyTypeCode: policyTypeValue,
        ServiceSettingCode: TypeValue,
        IllnessTypeCode: illnessTypeValue,
        SurgeryTypeCode: surgeryTypeValue,
  
        IdType: idTypeValue,
        PID: "",
        PassportNumber: "",
        MembershipId: "",  
        CustomerId : "",
        PolicyNumber: numberValue,
        FurtherClaimVN: "",
        FurtherClaimNo: "",
        FurtherClaimId: ""
      };
    }else if(idTypeValue === "CUSTOMER_ID"){
      PatientInfo = {
        InsurerCode: InsurerCode, 
        RefID: "",
        TransactionNo: "",
        HN: patientDB.HN,
        GivenNameTH: patientDB.GivenNameTH,
        SurnameTH: patientDB.SurnameTH,
        DateOfBirth: patientDB.DateOfBirth,
        VN: VNselectVN,
        VisitDateTime: VisitDateselectVN,
        AccidentDate: DateAccValue,
        PolicyTypeCode: policyTypeValue,
        ServiceSettingCode: TypeValue,
        IllnessTypeCode: illnessTypeValue,
        SurgeryTypeCode: surgeryTypeValue,
  
        IdType: idTypeValue,
        PID: "",
        PassportNumber: "",
        MembershipId: "",  
        CustomerId : numberValue,
        PolicyNumber: "",
        FurtherClaimVN: "",
        FurtherClaimNo: "",
        FurtherClaimId: ""
      };
    }





   console.log(PatientInfo);
    setPatientInfo(PatientInfo)
     try {
      document.getElementById("my_modal_3").showModal();

      const response = await axios.post(
   // `http://localhost:3000/api/v1/check-eligible/checkeligible/`,
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
          <div>FullName (TH)</div>
          <div>
            {patientDB.TitleTH} {patientDB.GivenNameTH}{" "}
            {patientDB.SurnameTH}
          </div>
          <div>หมายเลขบัตรประจำตัวประชาชน</div>
          <div>{patientDB.PID}</div>
          <div>FullName (EN)</div>
          <div>
            {patientDB.TitleEN} {patientDB.GivenNameEN}{" "}
            {patientDB.SurnameEN}
          </div>
          <div>หมายเลข Passport</div>
          <div>{patientDB.PassportNumber}</div>
          <div>Date Of Birth</div>
          <div>{patientDB.DateOfBirth}</div>
          <div>หมายเลขประจำตัวสมาชิก</div>
          <div>{patientDB.MembershipId}</div>
          <div>Gender</div>
          <div>{patientDB.Gender}</div>
          <div>หมายเลขกรมธรรม์</div>
          <div>{patientDB.PolicyNumber}</div>
          <div>HN</div>
          <div>{patientDB.HN}</div>
          <div>รหัสลูกค้า</div>
          <div>{patientDB.CustomerId}</div>

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
                <div className="grid grid-cols-8 gap-2 mt-4">
                  <div></div>
                  <div>
                  <FormControl fullWidth>
                      <InputLabel id="policyTypeValue">
                        Select Type
                      </InputLabel>
                      <Select
                      error
                        labelId="policyTypeValue"
                        id="demo-simple-select"
                        value={idTypeValue}
                        label="Select Type"
                        onChange={idtype}
                        className=""
                        required
                      >
                        {idType
                          ? idType.Result.map((id, index) => (
                              <MenuItem
                                key={index}
                                value={id.idtypecode}
                              >
                                {id.idtypedesc_th}
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                  <TextField
                  error
              id="outlined-basic"
              label="กรอกข้อความ"
              // multiline
              // maxRows={4}
              variant="outlined"
              className="w-full"
              name="number"
              type="text"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
            />

                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="policyTypeValue">
                        ประเภทกรมธรรม์
                      </InputLabel>
                      <Select
                      error
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
                      error
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
          <p className="">VN: {patientInfo.VN}</p>
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
                    <br/>- เลขกรมธรรม์: {furtherClaimNo} 
                    <br/>- วันที่เข้ารักษา: {visitDateTimeL} 
                    <br/>- VN: {furtherVN}
                                    
                                    </div> : ""}

                    

        <div className="flex justify-center mt-4">   

          {mass ? (mass === true ? (



 
  (patientInfo.IllnessTypeCode === "ER" || patientInfo.IllnessTypeCode === "ACC") ? (
 succFurtherClaim === true ? 

 (succFurtherClaim2 === false ? 
 <div className="rounded-md">
                    <TextField
                  error
              id="outlined-basic"
              label="เคลมต่อเนื่อง (VN First Claim form)"
              // multiline
              // maxRows={4}
              variant="outlined"
              className="w-full"
              name="VN"
              type="text"
              value={vNValue}
              onChange={(e) => setVNValue(e.target.value)}
            />
 <div
   className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2 mt-2"
   onClick={() =>handleButtonVNClick(
     `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
   )}
 >
   ยืนยันเลือก
 </div>
 </div> 
 :

  <div className="rounded-md">
      <div
    className="btn btn-error text-base-100 hover:text-error hover:bg-base-100 ml-2"
    onClick={() =>handleButtonBlackVNClick(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )}
  >
    ย้อนกลับ
  </div>
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
                      {console.log(furtherClaim)}
               {furtherClaim
                        ? furtherClaim.Result.InsuranceData.FurtherClaimList.map(
                            (ftc, index) => (
                              <option
                                key={index}
                                value={`${ftc.ClaimNo} | ${ftc.FurtherClaimId} | ${ftc.VisitDateTime} | ${ftc.VN}`}
                              >
                                เลขกรมธรรม์: {ftc.ClaimNo}, วันที่เข้ารักษา:{" "}
                                {ftc.VisitDateTime.split("T")[0]} VN: {ftc.VN}
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
  </div>) : ( 
    //furtherClaim===""s
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


            (succFurtherClaim2 === false ? 
              (
                <div className="flex  w-full mt-4">
              <h1 className="text-lg">VN : </h1>

                                    <TextField
                  error
              id="outlined-basic"
              label="เคลมต่อเนื่อง (VN First Claim form)"
              // multiline
              // maxRows={4}
              variant="outlined"
              className="w-full"
              name="vn"
              type="text"
              value={vNValue}
              onChange={(e) => setVNValue(e.target.value)}
            />
              <div
                className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2 mt-2 "
                onClick={() =>handleButtonVNClick(
                  `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
                )}
              >
                ยืนยันเลือก
              </div>
              </div> 
              )
              :
             
               <div className="rounded-md">
                      <div
    className="btn btn-error text-base-100 hover:text-error hover:bg-base-100 ml-2"
    onClick={() =>handleButtonBlackVNClick(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )}
  >
    ย้อนกลับ
  </div>
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
