"use client";
import axios from "axios";
import { React, useState, useEffect, createContext } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { save } from "../../../store/counterSlice";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
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
  const [load, setLoad] = useState(false);
  const [numberValue, setNumberValue] = useState("");
  const [vNValue, setVNValue] = useState("");
  const [mass, setMass] = useState();
  const [formPRE, setFormPRE] = useState(false);
  const [succPRE, setSuccPRE] = useState(false);
  const [hS, setHS ] = useState();
  const [hB, setHB ] = useState();
  const [aI, setAI ] = useState();
  const [randomNumber, setRandomNumber] = useState('');
  const [result, setResult] = useState();
  const [detailVN, setDetailVN] = useState();
  const [visitlocation, setVisitlocation] = useState();
  const [locationCode, setLocationCode] = useState();
  const [listClaimForm, setListClaimForm] = useState();
  
  const [fromValue, setFromValue] = useState(null);
  const [accValue, setAccValue] = useState(null);
  const [serviceValue, setServiceValue] = useState("OPD");
  const [serviceCode, setServiceCode] = useState("");
  const [policyTypeValue, setPolicyTypeValue] = useState("");
  const [idTypeValue, setIdTypeValue] = useState("NATIONAL_ID");
  const [surgeryTypeValue, setSurgeryTypeValue] = useState("N");
  const [illnessTypeValue, setIllnessTypeValue] = useState("");
  const [selectPRETypeValue, setSelectPRETypeValue] = useState("");
  const router = useRouter();
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [showFormCheckEligibleError, setShowFormCheckEligibleError] =useState("");
  const [massFurtherError, setMassFurtherError] = useState("");
  const [showFormFurtherError, setShowFormFurtherError] =useState("");
  const [massCreateError, setMassCreateError] = useState("");
  const [showFormCreateError, setShowFormCreateError] =useState("");
  const [transactionNoL, setTransactionNoL] =useState("");
  const [refIdL, setRefIdL] =useState("");
  const [testMe, setTestMe] = useState(false);
  const [patientInfo, setPatientInfo] =useState("");
  const [succFurtherClaim, setSuccFurtherClaim] = useState(false);
  const [succFurtherClaim2, setSuccFurtherClaim2] = useState(false);
  const [accidentDate, setAccidentDate] = useState("");
  const [visitDateTime, setVisitDateTime] = useState(null);
  const [showbutton, setShowbutton] = useState("");
  const ReDux = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [preAuthTransactionList, setPreAuthTransactionList] = useState("");
  const [furtherClaim, setFurtherClaim] = useState("");
  const [furtherClaimNo, setFurtherClaimNo] = useState("");
  const [furtherVN, setFurtherVN] = useState("");
  const [furtherClaimId, setFurtherClaimId] = useState("");
  const [visitDateTimeL, setVisitDateTimeL] = useState("");
  const [claimNoL, setClaimNoL] = useState("");
  
  const [patientDB, setPatientDB] = useState("");
  

  useEffect(() => {
    setLoad(false)
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
        setNumberValue(response.data.Result.PatientInfo[0].PID)
        console.log(response.data.Result.PatientInfo[0])
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
   // console.log(vNValue)
   if(patientInfo.VN !== vNValue){
    setFurtherVN(vNValue)
   }
   
setSuccFurtherClaim2(true)
  }

  const handleButtonBlackVNClick = (data) => {
    setShowFormCreateError();
    setSuccFurtherClaim2(false)
    setSuccPRE(false);
      }
  const handleButtonFurtherBlackVNClick = (data) => {
    setShowFormCreateError();
        setSuccFurtherClaim2(true)
        setSuccFurtherClaim(false)
       }
       const type = (event) => {
        setServiceValue(event.target.value);
      };
  const gourl = () => {
        //event.preventDefault();
        // console.log(event.target.value);
        setFormPRE(false);
        setSuccPRE(true);
        setSuccFurtherClaim(true)
        setSuccFurtherClaim2(false)
        //setFurtherClaim();
  
      };
  const handleButtonClick = (data) => {
    //บันทึก Create
    setShowFormCreateError();
    let PatientInfo;

    const [RefId, TransactionNo] = data.split(" | ");
    if((serviceValue === "OPD")||(serviceValue === "IPD")){
if(idTypeValue === "NATIONAL_ID"){
  PatientInfo = {
    InsurerCode: InsurerCode, 
    RefId: RefId,
    TransactionNo: TransactionNo,
    HN: patientDB.HN,
    GivenNameTH: patientDB.GivenNameTH,
    SurnameTH: patientDB.SurnameTH,
    DateOfBirth: patientDB.DateOfBirth,
    // VN: detailVN,
    VN: "",
    VisitDateTime: visitDateTime,
    AccidentDate: accidentDate,
    PolicyTypeCode: policyTypeValue,
    ServiceSettingCode: serviceValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: numberValue,
    PassportNumber: "",
    MembershipId:"",  
    CustomerId : "",
    PolicyNumber:"",
    FurtherClaimVN: furtherVN,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
    Visitlocation: visitlocation,
    VisitlocationCode: locationCode,
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
    ServiceSettingCode: serviceValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: numberValue,
    MembershipId:"",  
    CustomerId : "",
    PolicyNumber:"",
    FurtherClaimVN: furtherVN,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
    Visitlocation: visitlocation,
    VisitlocationCode: locationCode,
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
    ServiceSettingCode: serviceValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: "",
    MembershipId: numberValue,  
    CustomerId : "",
    PolicyNumber:"",
    FurtherClaimVN: furtherVN,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
    Visitlocation: visitlocation,
    VisitlocationCode: locationCode,
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
    ServiceSettingCode: serviceValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: "",
    MembershipId: "",  
    CustomerId : "",
    PolicyNumber: numberValue,
    FurtherClaimVN: furtherVN,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
    Visitlocation: visitlocation,
    VisitlocationCode: locationCode,
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
    ServiceSettingCode: serviceValue,
    IllnessTypeCode: illnessTypeValue,
    SurgeryTypeCode:  surgeryTypeValue,
    Runningdocument: randomNumber,

    IdType: idTypeValue,
    PID: "",
    PassportNumber: "",
    MembershipId: "",  
    CustomerId : numberValue,
    PolicyNumber: "",
    FurtherClaimVN: furtherVN,
    FurtherClaimNo: furtherClaimNo,
    FurtherClaimId: furtherClaimId,
    Visitlocation: visitlocation,
    VisitlocationCode: locationCode,
 }
}
    }else{
      let visitDateTimePreIPD;
      if(visitDateTime){
        visitDateTimePreIPD = dayjs(visitDateTime.$d).format("YYYY-MM-DD HH:MM");
      }else{
        visitDateTimePreIPD=""
      }
      if(idTypeValue === "NATIONAL_ID"){
        PatientInfo = {
          InsurerCode: InsurerCode, 
          RefId: RefId,
          TransactionNo: TransactionNo,
          HN: patientDB.HN,
          GivenNameTH: patientDB.GivenNameTH,
          SurnameTH: patientDB.SurnameTH,
          DateOfBirth: patientDB.DateOfBirth,
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: accidentDate,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode:  surgeryTypeValue,
          Runningdocument: randomNumber,
      
          IdType: idTypeValue,
          PID: numberValue,
          PassportNumber: "",
          MembershipId:"",  
          CustomerId : "",
          PolicyNumber:"",
          FurtherClaimVN: furtherVN,
          FurtherClaimNo: furtherClaimNo,
          FurtherClaimId: furtherClaimId,
          Visitlocation: visitlocation,
          VisitlocationCode: locationCode,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: accidentDate,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode:  surgeryTypeValue,
          Runningdocument: randomNumber,
      
          IdType: idTypeValue,
          PID: "",
          PassportNumber: numberValue,
          MembershipId:"",  
          CustomerId : "",
          PolicyNumber:"",
          FurtherClaimVN: furtherVN,
          FurtherClaimNo: furtherClaimNo,
          FurtherClaimId: furtherClaimId,
          Visitlocation: visitlocation,
          VisitlocationCode: locationCode,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: accidentDate,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode:  surgeryTypeValue,
          Runningdocument: randomNumber,
      
          IdType: idTypeValue,
          PID: "",
          PassportNumber: "",
          MembershipId: numberValue,  
          CustomerId : "",
          PolicyNumber:"",
          FurtherClaimVN: furtherVN,
          FurtherClaimNo: furtherClaimNo,
          FurtherClaimId: furtherClaimId,
          Visitlocation: visitlocation,
          VisitlocationCode: locationCode,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: accidentDate,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode:  surgeryTypeValue,
          Runningdocument: randomNumber,
      
          IdType: idTypeValue,
          PID: "",
          PassportNumber: "",
          MembershipId: "",  
          CustomerId : "",
          PolicyNumber: numberValue,
          FurtherClaimVN: furtherVN,
          FurtherClaimNo: furtherClaimNo,
          FurtherClaimId: furtherClaimId,
          Visitlocation: visitlocation,
          VisitlocationCode: locationCode,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: accidentDate,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode:  surgeryTypeValue,
          Runningdocument: randomNumber,
      
          IdType: idTypeValue,
          PID: "",
          PassportNumber: "",
          MembershipId: "",  
          CustomerId : numberValue,
          PolicyNumber: "",
          FurtherClaimVN: furtherVN,
          FurtherClaimNo: furtherClaimNo,
          FurtherClaimId: furtherClaimId,
          Visitlocation: visitlocation,
          VisitlocationCode: locationCode,
       }
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


      if(response.data.HTTPStatus.statusCode === 200){
              window.print();
      }else{
        setShowFormCreateError("Error");
        setMassCreateError(response.data.HTTPStatus.message);
      }

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



  };
  
  const PrintButton = () => {
    window.print();
  };
  const confirmButton = (data) => {
    
    setFurtherClaim();
    setShowFormFurtherError();
    setMassFurtherError();

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
      ServiceSettingCode: serviceValue,
      IllnessTypeCode: illnessTypeValue,
      SurgeryTypeCode: surgeryTypeValue,
      PolicyTypeCode: policyTypeValue,
      FurtherClaimNo: furtherClaimNo,
      FurtherClaimId: furtherClaimId,
    };
     console.log(PatientInfo);

  setLoad(false)
     
    // console.log(serviceValue)
     if(serviceValue === "OPD"){
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
      setLoad(true)
        setFurtherClaim(response.data);
        console.log(response.data);
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
    }else if((serviceValue === "PRE")||(serviceValue === "IPD")){

    axios
    .post(
      '/api/v1/aia-checkeligible/preauthSubmission',{PatientInfo} 
      // process.env.NEXT_PUBLIC_URL_PD +
      //   process.env.NEXT_PUBLIC_URL_getRetrieveFurtherclaim,
      // {
      //     PatientInfo
      // }
    )
    .then((response) => {
 
      console.log(response.data)
      setLoad(true)
      setPreAuthTransactionList(response.data);
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


    }
 
  
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
      setAccValue(null);
    }



  };
  const surgery = (event) => {
    setSurgeryTypeValue(event.target.value);
  };
  const NotSelectPRE = (event) => {

      setSelectPRETypeValue("");
      setFormPRE(false);
  };
  const SelectPRE = (event) => {

    if(event.target.value){
    const Datavalue = JSON.parse(event.target.value);
    console.log(Datavalue)
      setListClaimForm(Datavalue);
      setSelectPRETypeValue(Datavalue.ClaimNo);
      setClaimNoL(Datavalue.ClaimNo);
      setVisitDateTimeL(Datavalue.VisitDateTime)
      setFormPRE(true);
    }else{
      setSelectPRETypeValue("");
      setFormPRE(false);
    }

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
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_ServiceSetting +
          InsurerCode
      )
      .then((response) => {
        setServiceCode(response.data);

      })
      .catch((error) => {
        console.log(error);
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
        ServiceSettingCode: serviceValue,
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
    setSelectPRETypeValue("");
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
    setSuccFurtherClaim(false);
    setSuccPRE(false);

    
    //const [YearVN, MonthVN, DayVN] = VisitDateselectVN.split('-');
    // const Acc = accValue.split(" ");
    // setVisitDate(VisitDateTime)
    let DateAccValue;


    let PatientInfo;
    if(accValue){
    DateAccValue = dayjs(accValue.$d).format("YYYY-MM-DD");
    }else{
      DateAccValue="";
    }

    setAccidentDate(DateAccValue);
    if(serviceValue === "OPD" || serviceValue === "IPD" ) {
      // console.log("OPD & IPD")
      const [VNselectVN, VisitDateselectVN , LocationDesc , LocationCode] = event.target.selectVN.value.split(" | ");
      setVisitDateTime(VisitDateselectVN);
      setDetailVN(VNselectVN);
      setVisitlocation(LocationDesc)
      setLocationCode(LocationCode)

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
          ServiceSettingCode: serviceValue,
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode: surgeryTypeValue,
    
          IdType: idTypeValue,
           PID: numberValue,
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
          ServiceSettingCode: serviceValue,
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
          ServiceSettingCode: serviceValue,
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
          ServiceSettingCode: serviceValue,
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
          ServiceSettingCode: serviceValue,
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

    }else{
      // console.log("PRE")
      let visitDateTimePreIPD;
      if(visitDateTime){
        visitDateTimePreIPD = dayjs(visitDateTime.$d).format("YYYY-MM-DD HH:MM");
      }else{
        visitDateTimePreIPD=""
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: DateAccValue,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
          IllnessTypeCode: illnessTypeValue,
          SurgeryTypeCode: surgeryTypeValue,
    
          IdType: idTypeValue,
           PID: numberValue,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: DateAccValue,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: DateAccValue,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: DateAccValue,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
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
          VN: "",
          VisitDateTime: visitDateTimePreIPD,
          AccidentDate: DateAccValue,
          PolicyTypeCode: policyTypeValue,
          ServiceSettingCode: serviceValue,
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
    }
 




    
    console.log(PatientInfo);
    setPatientInfo(PatientInfo)
     try {
      if(serviceValue === "OPD"){
        document.getElementById("OPD").showModal();
      }else if(serviceValue === "PRE"){
        document.getElementById("PRE").showModal();
      }else if(serviceValue === "IPD"){
        document.getElementById("IPD").showModal();
      }
 

      const response = await axios.post(
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
                console.log("True")
              setMass(true);
            }else{
              console.log("False")
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

          }else{
            console.log("Error")
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



  const CustomTextField = styled(TextField)({
    "& .MuiInputBase-input.Mui-disabled": {
      color: "black", // เปลี่ยนสีข้อความเป็นสีดำ
      cursor: "default", // เปลี่ยนเคอร์เซอร์เป็นแบบปกติ
    },
  });




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
        <form onSubmit={handleSubmit}>
        <h1 className="font-black text-accent text-3xl ">Visit Details</h1>
        <div className="grid grid-cols-4 gap-2 ">
          <div></div>
          <div>
          <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
              ประเภทการรักษา
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={serviceValue}
                label="ํประเภทการรักษา"
                onChange={type}
              >
                {serviceCode
                  ? serviceCode.Result.map((type, index) => (
                      <MenuItem key={index} value={type.servicesettingcode}>
                        {type.servicesettingcode} -{" "}
                        {type.servicesettingdesc}
                      </MenuItem>
                    ))
                  : (
                    <MenuItem value="OPD">
                      OPD - ผู้ป่วยนอก
                  </MenuItem>
                  )}
              </Select>
            </FormControl>
          </div>
          {((serviceValue === "OPD")||(serviceValue === "IPD")) ? (
          <div>
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
                <button
                  className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 text-lg rounded-full px-3 py-2"
                  type="submit"
                >
                  <FaSearch /> Search
                </button>
          </div> 
        )   : ""}
          {/*  <div>    */}
 
          {/* </div> */}
          <div></div>
                     
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
        {((serviceValue !== "OPD")&&(serviceValue !== "IPD")) ? (
              <>
                 <form onSubmit={check}> 
                  <div className="grid grid-cols-8 gap-2 mt-4">

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
                label="หมายเลขบัตร"
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
                            ? illnessType.Result.map((ill, index) => 
  
                              
                                serviceValue ===  "OPD"  ? (
                                ((ill.illnesstypecode === "ILL")||(ill.illnesstypecode === "ACC")||(ill.illnesstypecode === "ER")||(ill.illnesstypecode === "DEN")
                              ||(ill.illnesstypecode === "MET")||(ill.illnesstypecode === "HD")||(ill.illnesstypecode === "CMT")||(ill.illnesstypecode === "CHK")||(ill.illnesstypecode === "VAC")||(ill.illnesstypecode === "FU")
                            )  ? (
                                 <MenuItem key={index} value={ill.illnesstypecode}>
                                  {ill.illnesstypedesc}
                                </MenuItem>
                                ) : ""
                              
                              )
                                : 
                                  serviceValue ===  "PRE"  ? (
                                    (ill.illnesstypecode === "ILL")||(ill.illnesstypecode === "ACC")||(ill.illnesstypecode === "DAY")
                              ? (
                                 <MenuItem key={index} value={ill.illnesstypecode}>
                                  {ill.illnesstypedesc}
                                </MenuItem>
                                )
                                :"" 
                                ) 
                                : 
                                serviceValue ===  "IPD"  ? (
                                  (ill.illnesstypecode === "ILL")||(ill.illnesstypecode === "ACC")||(ill.illnesstypecode === "DAY")||(ill.illnesstypecode === "MAT")
                            ? (
                               <MenuItem key={index} value={ill.illnesstypecode}>
                                {ill.illnesstypedesc}
                              </MenuItem>
                              )
                              :"" 
                              ) 
                              : ""
                           ): ""}
                        </Select>
                      </FormControl>
                    </div>
                    
                    {((serviceValue !== "OPD")&&(serviceValue !== "IPD")) ? (
                    <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="วันที่จองสิทธิ์"
                    value={visitDateTime}
                    onChange={(newDate) => setVisitDateTime(newDate)}
                    // format="YYYY-MM-DD "
                    required
                    slotProps={{
                      openPickerButton: { color: "error" },
                      textField: { focused: true, color: "error" },
                    }}
                  />
                </LocalizationProvider> 
                  </>
                ) : ""}
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
                          {/* {console.log(surgeryTypeValue)} */}
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
        ) : 
        (post ? (
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
                        {/* <th>AccidentDate</th> */}
                        <th>LocationDesc</th>
                        <th>WardDesc</th>
                        <th>DoctorLicense</th>
                        <th>MainCareproviderDecs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {console.log(post)} */}
                      {post ? (
                        post.Result.EpisodeInfo.map((ep, index) => (
                          <tr key={index} className="hover">
                            <td>
                              <input
                                type="radio"
                                name="selectVN"
                                value={`${ep.VN} | ${ep.VisitDateTime} | ${ep.LocationDesc} | ${ep.LocationCode}`}
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
              label="หมายเลขบัตร"
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
                          ? illnessType.Result.map((ill, index) => 

                            
                              serviceValue ===  "OPD"  ? (
                              ((ill.illnesstypecode === "ILL")||(ill.illnesstypecode === "ACC")||(ill.illnesstypecode === "ER")||(ill.illnesstypecode === "DEN")
                            ||(ill.illnesstypecode === "MET")||(ill.illnesstypecode === "HD")||(ill.illnesstypecode === "CMT")||(ill.illnesstypecode === "CHK")||(ill.illnesstypecode === "VAC")||(ill.illnesstypecode === "FU")
                          )  ? (
                               <MenuItem key={index} value={ill.illnesstypecode}>
                                {ill.illnesstypedesc}
                              </MenuItem>
                              ) : ""
                            
                            )
                              : 
                                serviceValue ===  "PRE"  ? (
                                  (ill.illnesstypecode === "ILL")||(ill.illnesstypecode === "ACC")||(ill.illnesstypecode === "DAY")
                            ? (
                               <MenuItem key={index} value={ill.illnesstypecode}>
                                {ill.illnesstypedesc}
                              </MenuItem>
                              )
                              :"" 
                              ) 
                              : 
                              serviceValue ===  "IPD"  ? (
                                (ill.illnesstypecode === "ILL")||(ill.illnesstypecode === "ACC")||(ill.illnesstypecode === "DAY")||(ill.illnesstypecode === "MAT")
                          ? (
                             <MenuItem key={index} value={ill.illnesstypecode}>
                              {ill.illnesstypedesc}
                            </MenuItem>
                            )
                            :"" 
                            ) 
                            : ""
                         ): ""}
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
                        {/* {console.log(surgeryTypeValue)} */}
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
        ): ("")) }
      </div>

      {/* </>
      ) : (
        <></>
      )}  */}

      {/* {showForm && ( */}

      <dialog id="OPD" className="modal text-xl ">
        <div className="modal-box w-full h-full max-w-7xl ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
                <h1 className="text-accent text-3xl text-center">ผลการตรวจสอบสิทธิ์ - OPD</h1>

                <div className="flex  w-full mt-4">
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-center">ข้อมูลส่วนตัว</h2>
          <p className="">รหัสประจำตัวประชาชน: {patientInfo.PID}</p>
          <p className="">HN: {patientInfo.HN}</p>
          <p className="">ชื่อ: {patientInfo.GivenNameTH} {patientInfo.SurnameTH}</p>
          <p className="">วันเกิด: {patientInfo.DateOfBirth}</p>
          <p className="">VN: {patientInfo.VN}</p>
          <p className="">Location: {visitlocation}</p>
          <p className="">ประเภทในการรักษา: {serviceValue}</p>
        </div>
        
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md ml-2">
          <h2 className="text-xl font-semibold mb-2 text-center">จากการตรวจสอบเบื้องต้น</h2>
          <p className="text-xl text-center">
            <b className=""> 
           {mass === true ? <p className="underline">** มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : mass === false ? <p className="text-error underline">** ไม่มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : <CircularProgress size="30px" className="text-error" />}
          
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

                                    
                                    {showFormCreateError === "Error" ? (
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
                <span>{massCreateError}</span>
              </div>
            ) : ""}
        <div className="flex justify-center mt-4">   
        
          {mass ? (mass === true ? (



 
  (patientInfo.IllnessTypeCode === "ER" || patientInfo.IllnessTypeCode === "ACC" || patientInfo.IllnessTypeCode === "FU" || patientInfo.IllnessTypeCode === "CMT") ? (
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
    className="btn btn-error text-base-100 hover:text-error hover:bg-base-100 ml-2"
    onClick={() =>handleButtonFurtherBlackVNClick(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )}
  >
    ย้อนกลับ
  </div>
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
                      {/* {console.log(furtherClaim)} */}
               {furtherClaim
                        ? furtherClaim.Result.InsuranceData.FurtherClaimList.map(
                            (ftc, index) => (
                              <option
                                key={index}
                                value={`${ftc.ClaimNo} | ${ftc.FurtherClaimId} | ${ftc.VisitDateTime} | ${ftc.FurtherClaimVN}`}
                              >
                                เลขกรมธรรม์: {ftc.ClaimNo}, วันที่เข้ารักษา:{" "}
                                {ftc.VisitDateTime.split("T")[0]} VN: {ftc.FurtherClaimVN}
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
  </div>
  ) : ( 
    //furtherClaim===""
!selectedValue ? load === true ? <CircularProgress size="30px" className="text-error" /> :
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

</div>) : ("Loading...")

  ) )

          ) : (


            (succFurtherClaim2 === false ? 
              (
                <>
                <div className="flex  w-full">

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
              </div> 

              <div
                className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
                onClick={() =>handleButtonVNClick(
                  `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
                )}
              >
                ยืนยันเลือก
              </div>
            </>
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
                              <CircularProgress size="30px" className="text-error text-lg" />
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
                            <CircularProgress size="30px" className="text-error text-lg" />
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


      <dialog id="PRE" className="modal text-xl ">
        <div className="modal-box w-full h-full max-w-7xl ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
                <h1 className="text-accent text-3xl text-center">ผลการตรวจสอบสิทธิ์ - PRE</h1>

                <div className="flex  w-full mt-4">
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-center">ข้อมูลส่วนตัว</h2>
          <p className="">รหัสประจำตัวประชาชน: {patientInfo.PID}</p>
          <p className="">HN: {patientInfo.HN}</p>
          <p className="">ชื่อ: {patientInfo.GivenNameTH} {patientInfo.SurnameTH}</p>
          <p className="">วันเกิด: {patientInfo.DateOfBirth}</p>
          <p className="">ประเภทในการรักษา: {serviceValue}</p>
        </div>
        
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md ml-2">
          <h2 className="text-xl font-semibold mb-2 text-center">จากการตรวจสอบเบื้องต้น</h2>
          <p className="text-xl text-center">
            <b className=""> 
           {mass === true ? <p className="underline">** มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : mass === false ? <p className="text-error underline">** ไม่มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : <CircularProgress size="30px" className="text-error" />}
          
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
                    {/* {selectPRETypeValue ?
                    (
                    <div className="rounded-md">
                    เคยการจองสิทธิ์ : 
                    <br/>- เลขกรมธรรม์: {claimNoL} 
                    <br/>- วันที่มารับการรักษาครั้งก่อน : {visitDateTimeL}
                                    
                                    </div>
                                   ) : ""}  */}

                                    
                                    {showFormCreateError === "Error" ? (
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
                <span>{massCreateError}</span>
              </div>
            ) : ""}

        <div className="flex justify-center mt-4">   
        

  {mass === true ? 
  ( load === false ?
   ( 
   <div className="rounded-md">
   <div
     className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
     onClick={() =>
       confirmButton(
         `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
       )
     }
   >
      ลงทะเบียนใช้สิทธิ์
   </div>
   
   </div>
  )
   :  ( 
    // succPRE === false ?
    //     (
    //       <div className="rounded-md w-full">
    //          <div role="tablist" className="tabs-bordered">
    //             <input
    //               type="radio"
    //               name="my_tabs_1"
    //               role="tab"
    //               className="tab text-xl"
    //               aria-label="ไม่เคยจองสิทธิ์"
    //               onChange={NotSelectPRE}
    //               defaultChecked
    //             />

    //             <input
    //               type="radio"
    //               name="my_tabs_1"
    //               role="tab"
    //               className="tab text-xl"
    //               aria-label="เคยจองสิทธิ์"
    //             />
    //             <div role="tabpanel" className="tab-content mt-4">
    //               <label className="form-control w-full">
    //                 <select
    //                   className="select select-bordered"
    //                   value={selectPRETypeValue}
    //                   onChange={SelectPRE}
    //                 >
    //                   <option></option>
    //            {preAuthTransactionList
    //                     ? preAuthTransactionList.Data.PreAuthTransactionList.map(
    //                         (ftc, index) => (
    //                           <option
    //                             key={index}
    //                             value={JSON.stringify(ftc)}
    //                           >
    //                             เลขกรมธรรม์: {ftc.ClaimNo}, วันที่เข้ารักษา:{" "}
    //                             {ftc.VisitDateTime.split("T")[0]} 
    //                           </option>
    //                         )
    //                       )
    //                     : ""} 
    //                   <></>
    //                 </select>
    //               </label>
    //             </div>
    //           </div> 
    //         <div className="flex justify-end p-4">
    //           <div
    //             className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 "
    //               onClick={gourl}
    //           >
    //             ยืนยัน
    //           </div>
    //         </div>
    //       </div>

   

    //      ) : (
          <div className="rounded-md">
                      {/* <div
    className="btn btn-error text-base-100 hover:text-error hover:bg-base-100 ml-2"
    onClick={() =>handleButtonBlackVNClick(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )}
  >
    ย้อนกลับ
  </div> */}
               <div
                 className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
                 onClick={() =>handleButtonClick(
                   `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
                 )}
               >
                 Print
               </div>
               </div> 
        //  ) 
           ) )  : ("")} 
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



                  {formPRE && (
                    <>
                    <div className="p-4 border-2  rounded-md bg-white w-full mt-4 shadow-md">  
                        <div className="grid gap-2 sm:grid-cols-5 w-full mt-2">
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="รหัสอนุมัติการเรียกร้อง (Claim ID)"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.ClaimNo}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="จำนวนครั้งของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.OccerrenceNo}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="วันที่มารับการรักษาที่โรงพยาบาลของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.VisitDateTime}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="สถานะของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.ClaimStatusDesc}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="วันที่คาดว่าจะเข้ารับการผ่าตัดที่โรงพยาบาลของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.ExpectedAdmitDate}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                        </div>
                        <div className="overflow-x-auto mt-2">
                          <h1>Diagnosis</h1>
  <table className="table">
    <thead>
      <tr className="bg-info text-base-100">
        <th>Icd10</th>
        <th>DxName</th>
      </tr>
    </thead>
    <tbody>
      {listClaimForm    ? listClaimForm.Diagnosis.map(
                              (Diagnosis, index) => (
      <tr className="bg-base-200" key={index}>
        <td>{Diagnosis.Icd10}</td>
        <td>{Diagnosis.DxName}</td>
      </tr>
                              ) 
                  ): ""}

</tbody>
  </table>
                        </div>
                        <div className="overflow-x-auto mt-2">
                        <h1>Procedure</h1>
  <table className="table">
    <thead>
      <tr className="bg-info text-base-100">
        <th>Icd9</th>
        <th>ProcedureName</th>
        <th>ProcedureDate</th>
      </tr>
    </thead>
    <tbody>
      {listClaimForm    ? listClaimForm.Procedure.map(
                              (Procedure, index) => (
      <tr className="bg-base-200" key={index}>
        <td>{Procedure.Icd9}</td>
        <td>{Procedure.ProcedureName}</td>
        <td>{Procedure.ProcedureDate}</td>
      </tr>
                              ) 
                  ): ""}

</tbody>
  </table>
                        </div>
                    </div>
     

                    </>
                  )}  


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
                              <CircularProgress size="30px" className="text-error text-lg" />
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
                            <CircularProgress size="30px" className="text-error text-lg" />
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


      <dialog id="IPD" className="modal text-xl ">
        <div className="modal-box w-full h-full max-w-7xl ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
                <h1 className="text-accent text-3xl text-center">ผลการตรวจสอบสิทธิ์ - IPD</h1>

                <div className="flex  w-full mt-4">
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-center">ข้อมูลส่วนตัว</h2>
          <p className="">รหัสประจำตัวประชาชน: {patientInfo.PID}</p>
          <p className="">HN: {patientInfo.HN}</p>
          <p className="">ชื่อ: {patientInfo.GivenNameTH} {patientInfo.SurnameTH}</p>
          <p className="">วันเกิด: {patientInfo.DateOfBirth}</p>
          <p className="">VN: {patientInfo.VN}</p>
          <p className="">Location: {visitlocation}</p>
          <p className="">ประเภทในการรักษา: {serviceValue}</p>
        </div>
        
        <div className="p-4 border-2  rounded-md bg-white w-3/6 shadow-md ml-2">
          <h2 className="text-xl font-semibold mb-2 text-center">จากการตรวจสอบเบื้องต้น</h2>
          <p className="text-xl text-center">
            <b className=""> 
           {mass === true ? <p className="underline">** มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : mass === false ? <p className="text-error underline">** ไม่มีสิทธิ์ใช้บริการเรียกร้องสินไหม **</p> : <CircularProgress size="30px" className="text-error" />}
          
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
                    {/* {console.log(claimNoL)} */}
                    {/* {selectPRETypeValue ?
                    (
                    <div className="rounded-md">
                    เคยการจองสิทธิ์ : 
                    <br/>- เลขกรมธรรม์: {claimNoL} 
                    <br/>- วันที่มารับการรักษาครั้งก่อน : {visitDateTimeL}
                                    
                                    </div>
                                   ) : ""}  */}

                                    
                                    {showFormCreateError === "Error" ? (
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
                <span>{massCreateError}</span>
              </div>
            ) : ""}
        <div className="flex justify-center mt-4">   
        

   {mass === true ? 
   load === false ?
   (
   <div className="rounded-md">
   <div
     className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
     onClick={() =>
       confirmButton(
         `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
       )
     }
   >
      ลงทะเบียนใช้สิทธิ์
   </div>
   
   </div>
   )
   :  ( 
    // succPRE === false ?
    //     (
    //       <div className="rounded-md w-full">
    //          <div role="tablist" className="tabs-bordered">
    //             <input
    //               type="radio"
    //               name="my_tabs_1"
    //               role="tab"
    //               className="tab text-xl"
    //               aria-label="ไม่เคยจองสิทธิ์"
    //               onChange={NotSelectPRE}
    //               defaultChecked
    //             />

    //             <input
    //               type="radio"
    //               name="my_tabs_1"
    //               role="tab"
    //               className="tab text-xl"
    //               aria-label="เคยจองสิทธิ์"
    //             />
    //             <div role="tabpanel" className="tab-content mt-4">
    //               <label className="form-control w-full">
    //                 <select
    //                   className="select select-bordered"
    //                   value={selectPRETypeValue}
    //                   onChange={SelectPRE}
    //                 >
    //                   <option></option>
    //            {preAuthTransactionList
    //                     ? preAuthTransactionList.Data.PreAuthTransactionList.map(
    //                         (ftc, index) => (
    //                           <option
    //                             key={index}
    //                             value={JSON.stringify(ftc)}
    //                           >
    //                             เลขกรมธรรม์: {ftc.ClaimNo}, วันที่เข้ารักษา:{" "}
    //                             {ftc.VisitDateTime.split("T")[0]} 
    //                           </option>
    //                         )
    //                       )
    //                     : ""} 
    //                   <></>
    //                 </select>
    //               </label>
    //             </div>
    //           </div>
    //         <div className="flex justify-end p-4">
    //           <div
    //             className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 "
    //               onClick={gourl}
    //           >
    //             ยืนยัน
    //           </div>
    //         </div>
    //       </div>

   

    //      ) : (
          <div className="rounded-md">
                      {/* <div
    className="btn btn-error text-base-100 hover:text-error hover:bg-base-100 ml-2"
    onClick={() =>handleButtonBlackVNClick(
      `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
    )}
  >
    ย้อนกลับ
  </div> */}
               <div
                 className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 ml-2"
                 onClick={() =>handleButtonClick(
                   `${result.Result.InsuranceData.RefId} | ${result.Result.InsuranceData.TransactionNo}`
                 )}
               >
                 Print
               </div>
               </div> 
        //  ) 
           )   : ("")}
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



                  {formPRE && (
                    <>
                    <div className="p-4 border-2  rounded-md bg-white w-full mt-4 shadow-md">  
                        <div className="grid gap-2 sm:grid-cols-5 w-full mt-2">
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="รหัสอนุมัติการเรียกร้อง (Claim ID)"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.ClaimNo}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="จำนวนครั้งของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.OccerrenceNo}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="วันที่มารับการรักษาที่โรงพยาบาลของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.VisitDateTime}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="สถานะของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.ClaimStatusDesc}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                          <div className="rounded-md">
                          <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="วันที่คาดว่าจะเข้ารับการผ่าตัดที่โรงพยาบาลของการพิจารณาครั้งก่อน"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={listClaimForm.ExpectedAdmitDate}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                          </div>
                        </div>
                        <div className="overflow-x-auto mt-2">
                          <h1>Diagnosis</h1>
  <table className="table">
    <thead>
      <tr className="bg-info text-base-100">
        <th>Icd10</th>
        <th>DxName</th>
      </tr>
    </thead>
    <tbody>
      {listClaimForm    ? listClaimForm.Diagnosis.map(
                              (Diagnosis, index) => (
      <tr className="bg-base-200" key={index}>
        <td>{Diagnosis.Icd10}</td>
        <td>{Diagnosis.DxName}</td>
      </tr>
                              ) 
                  ): ""}

</tbody>
  </table>
                        </div>
                        <div className="overflow-x-auto mt-2">
                        <h1>Procedure</h1>
  <table className="table">
    <thead>
      <tr className="bg-info text-base-100">
        <th>Icd9</th>
        <th>ProcedureName</th>
        <th>ProcedureDate</th>
      </tr>
    </thead>
    <tbody>
      {listClaimForm    ? listClaimForm.Procedure.map(
                              (Procedure, index) => (
      <tr className="bg-base-200" key={index}>
        <td>{Procedure.Icd9}</td>
        <td>{Procedure.ProcedureName}</td>
        <td>{Procedure.ProcedureDate}</td>
      </tr>
                              ) 
                  ): ""}

</tbody>
  </table>
                        </div>
                    </div>
     

                    </>
                  )}  


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
                              <CircularProgress size="30px" className="text-error text-lg" />
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
                            <CircularProgress size="30px" className="text-error text-lg" />
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
  )}
