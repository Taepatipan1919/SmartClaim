"use client";
import { useState, useEffect, useRef } from "react";
import useEffectOnce from "/hooks/use-effect-once";
import axios from "axios";
import { Box, TextField , Autocomplete  } from "@mui/material";
import { ImBin } from "react-icons/im";
import { IoIosDocument } from "react-icons/io";
import { useRouter } from "next/navigation";
import { MdCancel } from "react-icons/md";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaEdit } from "react-icons/fa";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from "@mui/material/InputAdornment";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { save } from "../../../store/counterSlice";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export default function Page({ data }) {
  // console.log(data)
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
  const [currentDatavitalsign, setCurrentDatavitalsign] = useState("");
  const [currentPagevitalsign, setCurrentPagevitalsign] = useState(1);
  const [countvitalsign, setCountvitalsign] = useState(0);
  const [currentDatainvestigation, setCurrentDatainvestigation] = useState("");
  const [currentPageinvestigation, setCurrentPageinvestigation] = useState(1);
  const [countinvestigation, setCountinvestigation] = useState(0);
  const [currentDataorderItemz, setCurrentDataorderItemz] = useState("");
  const [currentPageorderItemz, setCurrentPageorderItemz] = useState(1);
  const [countorderItemz, setCountorderItemz] = useState(0);
  
  const [checkedFinalDischarge, setCheckedFinalDischarge] = useState("");
  const [summitEditConcurrentNote, setSummitEditConcurrentNote] = useState("false");
  const dispatch = useDispatch("");
  const InsuranceCode = 13;
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [patientInfoByPID, setPatientInfoByPID] = useState("");
  const [visit, setVisit] = useState("");
  const [combinedString, setCombinedString] = useState("");
  const [accidentDetail, setAccidentDetail] = useState("");
  const [accidentPlaceValue, setAccidentPlaceValue] = useState("");
  const [dataaccidentPlace, setDataaccidentPlace] = useState("");
  const [datainjurySide, setDatainjurySide] = useState("");
  const [injurySide, setInjurySide] = useState("");
  const [DataWoundType, setDataWoundType] = useState("");
  const [woundType, setWoundType] = useState("");
  const [vitalsign, setVitalsign] = useState("");
  const itemsPerPage = 20;
  const [accidentDate, setAccidentDate] = useState(null);
  const [doctor, setDoctor] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [injuryWoundType, setInjuryWoundType] = useState("");
  const [injurySideType, setInjurySideType] = useState("");
  const [investigation, setInvestigation] = useState("");
  
  const [billingTotalBillAmount, setBillingTotalBillAmount] = useState("");
  const [billing, setBilling] = useState("");
  const [orderItemz, setOrderItemz] = useState("");
  const [showModal, setShowModal] = useState(false);

  
  const [anesthesiaListValue, setAnesthesiaListValue] = useState("");
  const [anesthesiaListCode, setAnesthesiaListCode] = useState("");


  const [admissionValue, setAdmissionValue] = useState("");
  const [indicationForAdmissionCode, setIndicationForAdmissionCode] = useState("");
  
  const [showArrow, setShowArrow] = useState(false);
  const router = useRouter("");
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [massDocError, setMassDocError] = useState("");
  const [showDocError, setShowDocError] = useState("");
  const [fileList, setFileList] = useState("");
  const [base64, setBase64] = useState("");
  const [massSummitError, setMassSummitError] = useState("");
  const [showSummitError, setShowSummitError] = useState("");
  const [massSummitSucc, setMassSummitSucc] = useState("");
  const [showSummitSucc, setShowSummitSucc] = useState("");
  const [massSummit, setMassSummit] = useState("");
  const [admitDateTime, setAdmitDateTime] = useState(null);
  const [dscDateTime, setDscDateTime] = useState(null);
  const [an, setAn] = useState("");
  const [expectedLos, setExpectedLos] = useState("");
  const [otherInsurer, setOtherInsurer] = useState(false);

  const [procedure, setProcedure] = useState("");
  const [causeOfInjuryDetails, setCauseOfInjuryDetails] = useState("");
  const [injuryDetails, setInjuryDetails] = useState("");

  const [randomNumber, setRandomNumber] = useState('');
  const [isIPDDischargeValue, setIsIPDDischargeValue] = useState();



  const [optionsPro, setOptionsPro] = useState([]);
  const [isLoadingPro, setIsLoadingPro] = useState(false);
  const [selectedOptionPro, setSelectedOptionPro] = useState(null);
  const [rowsPro, setRowsPro] = useState([]);
  const [procedureDate, setProcedureDate] = useState("");






  const [newCauseOfInjuryDetail, setNewCauseOfInjuryDetail] = useState({
    CauseOfInjury: "",
    CommentOfInjury: "",
  });
  const [newInjuryDetail, setNewInjuryDetail] = useState({
    InjuryArea: "",
    InjurySide: "",
    WoundType: "",
  });
  const [rows2, setRows2] = useState("");
  const [newRow2, setNewRow2] = useState({
    ConcurrentDatetime: dayjs(),
    ConcurrentDetail: "",
  });



  const [summitEditProcedure, setSummitEditProcedure] = useState("false");
  const [summitEditAcc, setSummitEditAcc] = useState("false");
  const [comaScore, setComaScore] = useState("");
  const [expectedDayOfRecovery, setExpectedDayOfRecovery] = useState("");
  const [signSymptomsDate, setSignSymptomsDate] = useState(null);
  const [privateCase, setPrivateCase] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [alcoholRelated, setAlcoholRelated] = useState(false);
  const [previousTreatment, setPreviousTreatment] = useState(false);
  const [previousTreatmentDetail, setPreviousTreatmentDetail] = useState("");
  const [previousTreatmentDate, setPreviousTreatmentDate] = useState(null);



  const AccidentPlace = (event) => {
    setAccidentPlaceValue(event.target.value);
  };
  const InjurySide = (event) => {
    setInjurySide(event.target.value);
  };
  const WoundType = (event) => {
    setWoundType(event.target.value);
  };

  
  const PatientInfoData = {
    PatientInfo: {
      InsurerCode: data.DataTran.Data.InsurerCode,
      RefId: data.DataTran.Data.RefId,
      TransactionNo: data.DataTran.Data.TransactionNo,
      PID: data.Patient.Data.PID,
      HN: data.Patient.Data.HN,
      GivenNameTH: data.Patient.Data.GivenNameTH,
      SurnameTH: data.Patient.Data.SurnameTH,
      DateOfBirth: data.Patient.Data.DateOfBirth,
      PassportNumber: data.Patient.Data.PassportNumber,
        IdType: data.Patient.Data.IdType,
      VN: data.DataTran.Data.VN,
        VisitDateTime: data.DataTran.Data.VisitDateTime,
      ChiefComplaint: "",
      PresentIllness: "",
        AccidentDate: data.DataTran.Data.AccidentDate,
      AccidentPlaceCode: "",
      WoundDetails: "",
      IsIPDDischarge: data.DataTran.Data.IsIPDDischarge,
      AccidentInjurySideCode: "",
      AccidentInjuryWoundtypeCode: "",
        PolicyTypeCode: data.DataTran.Data.PolicyTypeCode,
        ServiceSettingCode: data.DataTran.Data.ServiceSettingCode,
        IllnessTypeCode: data.DataTran.Data.IllnessTypeCode,
        SurgeryTypeCode: data.DataTran.Data.SurgeryTypeCode,
        PreauthReferClaimNo: data.DataTran.Data.PreauthReferClaimNo,
        PreauthReferOcc: data.DataTran.Data.PreauthReferOcc,   
        AdmitDateTime: "",
        An : "",
        DscDateTime : "",
        ExpectedLos : "",
    },
  };
  // console.log(PatientInfoData.PatientInfo)
  useEffectOnce(() => {
    setRandomNumber();

    const generateRandomFiveDigitNumber = () => {
      return String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    };
    setFileList("")
    const newRandomNumber = generateRandomFiveDigitNumber();
    setRandomNumber(newRandomNumber);

  });

  useEffectOnce(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setProgress({ started: false, pc: 0 });
    setMsg(null);
    setFileList("");
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getlistDocumentName,
        {
          "PatientInfo":{
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          DocumenttypeCode : "002",
        }
        }
      )
      .then((response) => {
        setFileList(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
  //      console.log(error);
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


            axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIndicationsForAdmission +
           InsuranceCode
      )
      .then((response) => {
        setIndicationForAdmissionCode(response.data);

      })
      .catch((error) => {
        console.log(error);
      });


      axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getAnesthesiaList +
           InsuranceCode
      )
      .then((response) => {
        setAnesthesiaListCode(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
  });

  useEffectOnce(() => {
    const PatientInfo = {
      InsurerCode: InsuranceCode,
      IdType: "HOSPITAL_ID",
      PID: "",
      HN: PatientInfoData.PatientInfo.HN,
      PassportNumber: "",
    }
    //console.log(PatientInfo)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
        process.env.NEXT_PUBLIC_URL_PatientSearch,
      {
        PatientInfo
      }
    )
      .then((response) => {
        setPatientInfoByPID(response.data.Result.PatientInfo[0]);
        //console.log(response.data.Result.PatientInfo[0])
      })
      .catch((error) => {
    //    console.log(error);
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
  });

  useEffectOnce(() => {

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeVisit,
      PatientInfoData 
      )
      .then((response) => {
      //    console.log(response.data)
       setCombinedString(response ? `${response.data.Result.VisitInfo.Weight} / ${response.data.Result.VisitInfo.Height}` : "");

        setVisit(response.data);
        if(PatientInfoData.PatientInfo.IsIPDDischarge === null || PatientInfoData.PatientInfo.IsIPDDischarge === false){
         setIsIPDDischargeValue(false)
        }else{
          setIsIPDDischargeValue(true)
        }
        // console.log(response.data.Result.VisitInfo.IsIPDDischarge)
        
        if(response.data.Result.VisitInfo.OtherInsurer === true){
          setOtherInsurer(true);
        }

        if(response.data.Result.VisitInfo.AlcoholRelated === true){
          setAlcoholRelated(true);
        }
        if(response.data.Result.VisitInfo.Pregnant === true){
          setPregnant(true);
        }
        if(response.data.Result.VisitInfo.PrivateCase  === true){
          setPrivateCase(true);
        }
        if((response.data.Result.VisitInfo.PreviousTreatmentDate)&&(response.data.Result.VisitInfo.PreviousTreatmentDetail)){
          setPreviousTreatment(true);
          const TreatmentDate = dayjs(response.data.Result.VisitInfo.PreviousTreatmentDate);
          setPreviousTreatmentDate(TreatmentDate);
          setPreviousTreatmentDetail(response.data.Result.VisitInfo.PreviousTreatmentDetail);
        }


        setExpectedDayOfRecovery(response.data.Result.VisitInfo.ExpectedDayOfRecovery)
        if(response.data.Result.VisitInfo.SignSymptomsDate){
          const dateValueSignSymptomsDate = dayjs(response.data.Result.VisitInfo.SignSymptomsDate);
          setSignSymptomsDate(dateValueSignSymptomsDate);
        }
        if(response.data.Result.VisitInfo.AdmitDateTime){
        const dateValueAdmitDateTime = dayjs(response.data.Result.VisitInfo.AdmitDateTime);
        setAdmitDateTime(dateValueAdmitDateTime);
        }
        if(response.data.Result.VisitInfo.DscDateTime){
        const dateValueDscDateTime = dayjs(response.data.Result.VisitInfo.DscDateTime);
        setDscDateTime(dateValueDscDateTime);
        }
        if(response.data.Result.VisitInfo.IndicationForAdmission){
        setAdmissionValue(response.data.Result.VisitInfo.IndicationForAdmission)
        }
        if(response.data.Result.VisitInfo.ComaScore){
          setComaScore(response.data.Result.VisitInfo.ComaScore)
        }
      })
      .catch((error) => {
        console.log(error);
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");

      });
    
   });

  useEffectOnce(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeAccident,

       PatientInfoData
      )
      .then((response) => {
       //  console.log(response.data)
         setAccidentDetail(response.data);

         if(response.data.Result.AccidentDetailInfo.AccidentDate){
          console.log("มีAccDate")
        const  AccidentDatex = dayjs(response.data.Result.AccidentDetailInfo.AccidentDate)
          setAccidentDate(AccidentDatex);
        }else{
          console.log("ไม่มีAccDate")
        }


          setCauseOfInjuryDetails(response.data.Result.AccidentDetailInfo.CauseOfInjuryDetail);
          setInjuryDetails(response.data.Result.AccidentDetailInfo.InjuryDetail);
          setAccidentPlaceValue(response.data.Result.AccidentDetailInfo.AccidentPlace)


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
  });

  useEffectOnce(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_accidentPlace +
          InsuranceCode,
        PatientInfoData
      )
      .then((response) => {
       // console.log(response.data)
        setDataaccidentPlace(response.data);
      })
      .catch((error) => {
    //    console.log(error);
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
  });
  useEffectOnce(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_InjurySide +
          InsuranceCode,
        PatientInfoData
      )
      .then((response) => {
      //  console.log(response.data)
        setDatainjurySide(response.data);
      })
      .catch((error) => {
    //    console.log(error);
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
  });

  useEffectOnce(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_InjuryWoundtype +
          InsuranceCode,
        PatientInfoData
      )
      .then((response) => {
    //    console.log(response.data)
        setDataWoundType(response.data);
      })
      .catch((error) => {
    //    console.log(error);
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
  });
 
  useEffectOnce(() => {
    
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDVitalSign,
        PatientInfoData
      )
      .then((response) => {
        //  console.log(response.data)
        setVitalsign(response.data);
        setCurrentDatavitalsign(response.data.Result.VitalSignInfo);
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
  });

  useEffectOnce(() => {
    
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeConcurNote,
        PatientInfoData
      )
      .then((response) => {
          //  console.log(response.data)
           if(response.data.Result.ConcurNoteList[0].ConcurrentDatetime){
            setRows2(response.data.Result.ConcurNoteList);
           }
       
      
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
  });

  const handleDateChange = (newDate) => {
     const formattedDate = dayjs(newDate).format("YYYY-MM-DD HH:mm");
      setNewRow2((prevState) => ({
         ...prevState, ConcurrentDatetime: formattedDate,
         })); };



  const handleChangeEditDateRow2 = (index2, even) => {
    const formattedDate = dayjs(even).format("YYYY-MM-DD HH:mm");
    const neweditrow2 = rows2.map((Pre, index) => {
      if (index === index2) {
        return {
          ...Pre,
          ConcurrentDatetime: formattedDate,
        };
      }
      return Pre;
    });
    setRows2(neweditrow2);
  };
  const handleChangeEditDetailRow2 = (index2, even) => {
    const neweditrow2 = rows2.map((Pre, index) => {
      if (index === index2) {
        return {
          ...Pre,
          ConcurrentDetail: even.target.value,
        };
      }
      return Pre;
    });
    setRows2(neweditrow2);
  };


  const handleAddRow2 = () => {
    setRows2([...rows2, newRow2]);
    setNewRow2({ ConcurrentDatetime: dayjs(), ConcurrentDetail: "" });
  };
  const handleDeleteRow2 = (index) => {
    const newRows2 = rows2.filter((_, i) => i !== index);
    setRows2(newRows2);
  };


  useEffectOnce(() => {

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeDoctor,
      //  Data
      PatientInfoData
      )
      .then((response) => {

     //  console.log(response.data)
       if(response.data.Result.DoctorInfo[0].DoctorLicense === ""){
         response.data.Result.DoctorInfo.map((Doc) => Doc.DoctorLicense && 
      setDoctor(response.data)
      )
       }else{
        setDoctor(response.data)
      }
      })

      .catch((error) => {
    //    console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");
        } catch (error) {
          setMassError("error");
          setShowFormError("Error");
        }
      });
  });

  useEffectOnce(() => {

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getIPDDischargeDiagnosis,
       // Data
        PatientInfoData
      )
      .then((response) => {
      //   console.log(response.data)
        setDiagnosis(response.data);
      })
      .catch((error) => {
    //    console.log(error);
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
  });
  useEffectOnce(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeProcedure,
        PatientInfoData
      )
      .then((response) => {
       //   console.log(response.data.Result)


      if (response.data.Result.ProcedureInfo[0].Icd9) {
        const formattedOptions = response.data.Result.ProcedureInfo.map((item) => item.Icd9 && ({
          Icd9: item.Icd9,
          ProcedureDate: item.ProcedureDate,
          ProcedureName: item.ProcedureName,
          label: item.Icd9 + ' - ' + item.ProcedureName, // กำหนดค่า label ที่ต้องการ
        }));
        setRowsPro(formattedOptions);
      } 
      })
      .catch((error) => {
      //  console.log(error);
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
  });



  const handleAddRowPro = () => {
    // console.log(selectedOptionPro)
    // console.log(procedureDate)
    // console.log(rowsPro)
    const Data = {
      ...selectedOptionPro,
      ProcedureDate: procedureDate,
    };
    // console.log(Data)
    // setRowsPro([...rows, newRow]);
    setRowsPro([...rowsPro, Data]);
    setProcedureDate("");
  };
  ////////////////////////////////
  const handleDeleteRowPro = (index) => {
    const newRows = rowsPro.filter((_, i) => i !== index);
    setRowsPro(newRows);
  };
  const ICD9CodeValuePro = async  (event, value) => {
    

    if (value.length >= 3) {
      setIsLoadingPro(true);
      try {
         axios
         .get(process.env.NEXT_PUBLIC_URL_SV +process.env.NEXT_PUBLIC_URL_getICD9+value)
  .then((response) => {
    // console.log(response.data.Result.ICD9Info)


       // แปลงผลลัพธ์เป็นรูปแบบที่สามารถใช้กับ react-select
        const formattedOptions = response.data.Result.ICD9Info.map((item) => item.ICD9Code && ({
           Icd9: item.ICD9Code,
           ProcedureDate: "",
           ProcedureName: item.ICD9Desc,
           label: item.ICD9Code + ' - ' + item.ICD9Desc, // กำหนดค่า label ที่ต้องการ
        }));
        setOptionsPro(formattedOptions);

        })
      .catch((error) => {
        console.log(error);
        setMassSummitError("Error");
        setShowSummitError("Error");
      });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingPro(false);
      }
    } else {
      setOptionsPro([]);
    }
  };
  const handleChangeICD9 = (event, newValue) => {
    setSelectedOptionPro(newValue);
  };

  ////////////////////////////////
  const handleAddCauseOfInjuryDetail = () => {
    setCauseOfInjuryDetails([...causeOfInjuryDetails, newCauseOfInjuryDetail]);
    setNewCauseOfInjuryDetail({ CauseOfInjury: "", CommentOfInjury: "" });
  };
  ////////////////////////////////
  ////////////////////////////////
  const handleChangeA1 = (index2, event) => {
    const newcauses = causeOfInjuryDetails.map((cause, index) => {
      if (index === index2) {
        return {
          ...cause,
          CauseOfInjury: event.target.value,
        };
      }
      return cause;
    });
    setCauseOfInjuryDetails(newcauses);
  };
  const handleChangeA2 = (index2, event) => {
    const newcauses = causeOfInjuryDetails.map((cause, index) => {
      if (index === index2) {
        return {
          ...cause,
          CommentOfInjury: event.target.value,
        };
      }
      return cause;
    });
    setCauseOfInjuryDetails(newcauses);
  };
  const handleChangeB1 = (index2, event) => {
    const newinjury = injuryDetails.map((injury, index) => {
      if (index === index2) {
        return {
          ...injury,
          InjuryArea: event.target.value,
        };
      }
      return injury;
    });
    setInjuryDetails(newinjury);
  };
  const handleChangeB2 = (index2, event) => {
    const newinjury = injuryDetails.map((injury, index) => {
      if (index === index2) {
        return {
          ...injury,
          InjurySide: event.target.value,
        };
      }
      return injury;
    });
    setInjuryDetails(newinjury);
  };
  const handleChangeB3 = (index2, event) => {
    const newinjury = injuryDetails.map((injury, index) => {
      if (index === index2) {
        return {
          ...injury,
          WoundType: event.target.value,
        };
      }
      return injury;
    });
    setInjuryDetails(newinjury);
  };

  useEffectOnce(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_InjurySide +
          PatientInfoData.PatientInfo.InsurerCode
      )
      .then((response) => {
       // console.log(response.data)
        setInjurySideType(response.data);
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
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_InjuryWoundtype +
          PatientInfoData.PatientInfo.InsurerCode
      )
      .then((response) => {
        setInjuryWoundType(response.data);
      })
      .catch((error) => {
     //   console.log(error);
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
  });
  ////////////////////////////////

  const handleDeleteCauseOfInjuryDetail = (index) => {
    const newCauseOfInjuryDetails = causeOfInjuryDetails.filter(
      (_, i) => i !== index
    );
    setCauseOfInjuryDetails(newCauseOfInjuryDetails);
  };
  const handleDeleteInjuryDetail = (index) => {
    const newInjuryDetails = injuryDetails.filter(
      (_, i) => i !== index
    );
    setInjuryDetails(newInjuryDetails);
  };

  const handleAddInjuryDetail = () => {
    setInjuryDetails([...injuryDetails, newInjuryDetail]);
    setNewInjuryDetail({ InjuryArea: "", InjurySide: "", WoundType: "" });
  };

  // const Editfurtherclaimvn = () => {
  //   setShowSummitError();
  //   setShowSummitSucc();
  //   document.getElementById("Editfurtherclaimvn").showModal();
  // };

  

    async function Submitfurtherclaimvn(e) {
  //    console.log(e)
  setShowSummitError();
  setShowSummitSucc();
  try {
  let response = await axios.post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_UpdateFurtherClaimVN,
          {
            "PatientInfo": {
            
                "RefId": PatientInfoData.PatientInfo.RefId,
                "TransactionNo": PatientInfoData.PatientInfo.TransactionNo,
                "HN": PatientInfoData.PatientInfo.HN,
                "VN": PatientInfoData.PatientInfo.VN,
                "FurtherClaimVN": e.VN,
                }
              }
      )

     // console.log(response.data)

      if(response.data.HTTPStatus.statusCode === 200){

        try {
        setShowSummitSucc("Succ");
        setMassSummitSucc(response.data.HTTPStatus.message);
     dispatch(
      save({
        value: "มีข้อมูล",
        Data: {
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          VN: PatientInfoData.PatientInfo.VN,
          InsurerCode: InsuranceCode,
          ServiceSettingCode: PatientInfoData.PatientInfo.ServiceSettingCode,
          IllnessTypeCode: PatientInfoData.PatientInfo.IllnessTypeCode,
          SurgeryTypeCode: PatientInfoData.PatientInfo.SurgeryTypeCode,
          PolicyTypeCode: PatientInfoData.PatientInfo.PolicyTypeCode,
          AccidentDate: PatientInfoData.PatientInfo.AccidentDate,
          VisitDateTime: PatientInfoData.PatientInfo.VisitDateTime,
          FurtherClaimVN: e.VN,
        },
      })
    );


      await stepOne();
      await stepTwo();
    } catch (error) {
    //  console.log(error);
    };

    function stepOne() {
      setTimeout(() => {
            router.push("/aia/checkClaimStatus");
      }, 1000);
 
    };
    function stepTwo() {
      setTimeout(() => {
             router.push("/aia/eligible");
}, 1000);

    };
    }else{

            setMassSummitError(response.data.HTTPStatus.message);
            setShowSummitError("Error");
          }
        } catch (error){
      setMassSummitError(error.message);
      setShowSummitError("Error");
    }
    
  
      }


  const SummitEditProce = () => {
    if (summitEditProcedure === "false") {
      setSummitEditProcedure("true");
    } else {
      setSummitEditProcedure("false");
    }
  };


  const SummitEditCon = () => {
    if (summitEditConcurrentNote === "false") {
      setSummitEditConcurrentNote("true");
    } else {
      setSummitEditConcurrentNote("false");
    }
  };


  
  const SummitEditAcc = () => {
    if (summitEditAcc === "false") {
      setSummitEditAcc("true");
    } else {
      setSummitEditAcc("false");
    }
  };

  useEffectOnce(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeInvestigation,
        PatientInfoData
      )
      .then((response) => {
       // console.log(response.data)
        setInvestigation(response.data);
        setCurrentDatainvestigation(response.data.Result.InvestigationInfo);

      })
      .catch((error) => {
     //   console.log(error);
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
  });
  useEffectOnce(() => {

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getPreAuthProcedure,
      //  Data
      PatientInfoData
      )
      .then((response) => {
      //    console.log(response.data.Result.ProcedureInfo)


         if (response.data.Result.ProcedureInfo[0].Icd9) {
          const formattedOptions = response.data.Result.ProcedureInfo.map((item) => item.Icd9 && ({
            Icd9: item.Icd9,
            ProcedureDate: item.ProcedureDate,
            ProcedureName: item.ProcedureName,
            label: item.Icd9 + ' - ' + item.ProcedureName, // กำหนดค่า label ที่ต้องการ
          }));
          setRowsPro(formattedOptions);
        } 
        
     
      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
          setShowFormError("Error");
        } catch (error) {
          setMassError(error);
          setShowFormError("Error");
        }
      });
  });
  useEffectOnce(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeOrderItem,
        PatientInfoData
      )
      .then((response) => {
        // console.log(response.data)
        setOrderItemz(response.data);
        setCurrentDataorderItemz(response.data.Result.OrderItemInfo);
      })
      .catch((error) => {
     //   console.log(error);
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
  });




  useEffectOnce(() => {
    setBilling("");
    setBillingTotalBillAmount("");

    console.log(PatientInfoData)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getIPDDischargeBilling,
        PatientInfoData
      )
      .then((response) => {
        setBilling("");
        setBillingTotalBillAmount("");

         console.log(response.data)

      setBilling(response.data);
      setBillingTotalBillAmount(response.data.Result.TotalBillAmount);

       
      })
      .catch((error) => {
     //   console.log(error);
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
  });

  const DocumentBase64 = (data) => {
    setMsg();
    setProgress({ started: false, pc: 0 });
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getDocumentByDocname,
        {
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          DocumentName: data,
        }
      )
      .then((response) => {
        setBase64(response.data);

        const base64ToBlob = (base64, type = "application/pdf") => {
          const byteCharacters = atob(base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          return new Blob([byteArray], { type });
        };
        const blob = base64ToBlob(response.data.base64);
        const url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error) => {
    //    console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassDocError(
            error.code + " - " + error.message + " - " + ErrorMass2
          );
          setShowDocError("Error");
        } catch (error) {
          setMassDocError("Error ในการเปิดไฟล์");
          setShowDocError("Error");
        }
      });
  };
  const CancleDoc = (data) => {
    const isConfirmed = window.confirm("แน่ใจแล้วที่จะลบเอกสารใช่ไหม");
    if (isConfirmed) {
      setFileList();
    setMsg();
    setShowDocError();
    setProgress({ started: false, pc: 0 });
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_DeleteDocumentByDocName,
        {
          "PatientInfo": {
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          // HN: PatientInfoData.PatientInfo.HN,
          // VN: PatientInfoData.PatientInfo.VN,
          DocumentName: data,
          }
        }
      )
      .then((response) => {
       // setBase64(response.data);

       setMsg(
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
          Cancel Successful
        </div>
      );

      axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getlistDocumentName,
        {
          "PatientInfo":{
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          DocumenttypeCode : "002",
          }
        }
      )
      .then((response) => {
        setFileList(response.data);
        console.log(response.data)
      })
      .catch((error) => {
       // console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassDocError(
            error.code + " - " + error.message + " - " + ErrorMass2
          );
          setShowDocError("Error");
        } catch (error) {
          setMassDocError(error.response.data.HTTPStatus.message);
          setShowDocError("Error");
        }
      });




      })
      .catch((error) => {
     //   console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassDocError(
            error.code + " - " + error.message + " - " + ErrorMass2
          );
          setShowDocError("Error");
        } catch (error) {
          setMassDocError("Error ในการลบไฟล์");
          setShowDocError("Error");
        }
      });
    };
  };

  //    //    //  //กดปุ่มส่งเคลม
  async function DataClaim(event) {
    
    event.preventDefault();
    
    let Datevalue="";




    if (admitDateTime === null){
      alert("กรุณากรอก ExpectedAdmitDate");
    }else if(dscDateTime === null){
      alert("กรุณากรอก DscDateTime");
    }else if(dscDateTime){
      const dscDateTimevalue = dayjs(dscDateTime.$d).format("YYYY-MM-DD");

   
    // console.log(dscDateTimevalue);
    setShowSummitError("");
    setMassSummitError();
    setMassSummit();
    document.getElementById("my_modal_3").showModal();
    if(accidentDate){
    Datevalue = dayjs(accidentDate.$d).format("YYYY-MM-DD");
    }
    let PreviousDate;
    let PreviousDetail;
    let Suc;
    let signDate ="";

    if (
      previousTreatment === true &&
      previousTreatmentDate &&
      previousTreatmentDetail
    ){

      PreviousDate = dayjs(previousTreatmentDate.$d).format("YYYY-MM-DD");
      PreviousDetail = previousTreatmentDetail;
      Suc = "S";
    } else if (previousTreatment === false) {
      Suc = "S";
      PreviousDate = "";
      PreviousDetail = "";
    } else {
      setMassSummitError(
        "กรุณากรอก ** เคยเข้ารับการรักษาก่อนการรักษาครั้งนี้ ให้ครบ **"
      );
      setShowSummitError("Error");
      Suc = "E";
    }

    let admitDateTimex;
    let DscDateTimex;
    try{
      DscDateTimex = dayjs(dscDateTime.$d).format("YYYY-MM-DD HH:MM");
       } catch(error){
        DscDateTimex = "";
       }
       

       
       try{
        admitDateTimex = dayjs(admitDateTime.$d).format("YYYY-MM-DD HH:MM");
         } catch(error){
          admitDateTimex = "";
         }
    try{
   signDate = dayjs(signSymptomsDate.$d).format("YYYY-MM-DD");
    } catch(error){
    signDate = "";
    }
    // }else{
    //    const signDate = "";
    //  }
    //   console.log(dayjs(signSymptomsDate))

    let HavecauseOfInjuryDetailsCount;
    let HaveinjuryDetailsCount;
    let HaveProcedureCount;
    let injuryDetailsCount;
    let causeOfInjuryDetailsCount;
    let ProcedureInfoCount;
    let HaveConcurNoteCount;
    let ConcurNoteCount;

//console.log(injuryDetails)
//console.log(causeOfInjuryDetails)
// console.log(rows2)

if(injuryDetails.length > 0){
  const obj = injuryDetails[0];
  if (obj.InjuryArea !== "" || obj.InjurySide !== "" || obj.WoundType !== "") {
    injuryDetailsCount = injuryDetails.length;
    console.log('Array has values:', injuryDetails);
  }
}
if(causeOfInjuryDetails.length > 0){
  const obj = causeOfInjuryDetails[0];
  if (obj.CauseOfInjury !== "" || obj.CommentOfInjury !== "") {
    causeOfInjuryDetailsCount = causeOfInjuryDetails.length;
    console.log('Array has values:', causeOfInjuryDetailsCount);
  }
} 
if(rowsPro){
  ProcedureInfoCount = rowsPro.length;
}   
if(rows2){
  HaveConcurNoteCount = rows2.length;
}   

    if (causeOfInjuryDetailsCount >= 1) {
      HavecauseOfInjuryDetailsCount = true;
    } else {
      HavecauseOfInjuryDetailsCount = false;
    }
    if (injuryDetailsCount >= 1) {
      HaveinjuryDetailsCount = true;
    } else {
      HaveinjuryDetailsCount = false;
    }
    if (ProcedureInfoCount >= 1) {
      HaveProcedureCount = true;
    } else {
      HaveProcedureCount = false;
    }

    if (HaveConcurNoteCount >= 1) {
      ConcurNoteCount = true;
    } else {
      ConcurNoteCount = false;
    }


    if (Suc === "S") {

      try {
       
         await stepOne();                  //SubmitAccidentIPD
         await stepTwo();                  //SubmitProcedureIPD
         await stepThree();                //SubmitIPDVisit
         await stepFour();                 //SubmitConcurNote
         await stepFive();                 //getcheckclaimstatus
        console.log("All steps completed");
      } catch (error) {
        console.log(error);
         setMassSummitError("Error");
        setShowSummitError("Error");
      }
    }else{
      console.log("Error")
    }

    function stepOne() {
      console.log("Step 1 SubmitAccidentIPD");
      // console.log(accidentPlaceValue)
            // if(accidentPlaceValue){
            return new Promise((resolve, reject) => {
              const PatientInfo = {
                RefId: PatientInfoData.PatientInfo.RefId,
                TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
                InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
                HN: PatientInfoData.PatientInfo.HN,
                VN: PatientInfoData.PatientInfo.VN,
                HaveAccidentCauseOfInjuryDetail: HavecauseOfInjuryDetailsCount,
                HaveAccidentInjuryDetail: HaveinjuryDetailsCount,
                AccidentDetailInfo: {
                  AccidentDate: Datevalue,
                  AccidentPlace: accidentPlaceValue,
                  CauseOfInjuryDetail: causeOfInjuryDetails,
                  InjuryDetail: injuryDetails,
                },
              };
              console.log(PatientInfo)
              axios
                .post(
                  process.env.NEXT_PUBLIC_URL_SV +
                    process.env.NEXT_PUBLIC_URL_SubmitAccidentIPD,
                  { PatientInfo }
                )
                .then((response) => {
                  console.log("1 Succ SubmitAccidentIPD");
      
                  resolve("Step 1 completed");
                })
                .catch((error) => {
                  console.log("1 Error");
                  try {
                    const ErrorMass = error.config.url;
                    const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
                    setMassSummitError(
                      error.code + " - " + error.message + " - " + ErrorMass2
                    );
                    setShowSummitError("Error");
                  } catch (error) {
                    setMassSummitError(error.response.data.HTTPStatus.message);
                    setShowSummitError("Error");
                  }
                });
      
              // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 1'));
            });
        // }else{
        //   console.log("1 Succ (ไม่อุบัติเหตุ)");
        //   // resolve("Step 1 completed");
        // }
          }
      
          function stepTwo() {
            console.log("Step 2 SubmitProcedureIPD");
            return new Promise((resolve, reject) => {
              const PatientInfo = {
                RefId: PatientInfoData.PatientInfo.RefId,
                TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
                InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
                HN: PatientInfoData.PatientInfo.HN,
                VN: PatientInfoData.PatientInfo.VN,
                HaveProcedure: HaveProcedureCount,
                ProcedureInfo: rowsPro,
              };
              console.log(PatientInfo)
              axios
                .post(
                  process.env.NEXT_PUBLIC_URL_SV +
                    process.env.NEXT_PUBLIC_URL_SubmitProcedureIPD,
                  { PatientInfo }
                )
                .then((response) => {
                  console.log("2 Succ SubmitProcedureIPD");
                  resolve("Step 2 completed");
                })
                .catch((error) => {
                  console.log("2 Error");
                  try {
                    const ErrorMass = error.config.url;
                    const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
                    setMassSummitError(
                      error.code + " - " + error.message + " - " + ErrorMass2
                    );
                    setShowSummitError("Error");
                  } catch (error) {
                    setMassSummitError(error.response.data.HTTPStatus.message);
                    setShowSummitError("Error");
                  }
                });
      
              // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 2'));
            });
          }
      
          function stepThree() {
            console.log("Step 3 SubmitIPDVisit");
            return new Promise((resolve, reject) => {
              let comaScoreP="";
              let expectedDayOfRecoveryP="";
              if (comaScore) {
                comaScoreP = comaScore;
              }
              if (expectedDayOfRecovery) {
                expectedDayOfRecoveryP = expectedDayOfRecovery;
              }
              const PatientInfo = {
                OtherInsurer : otherInsurer,
                RefId: PatientInfoData.PatientInfo.RefId,
                TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
                InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
                HN: PatientInfoData.PatientInfo.HN,
                VN: PatientInfoData.PatientInfo.VN,
                IsIPDDischarge : isIPDDischargeValue,
                VisitDateTime: PatientInfoData.PatientInfo.VisitDateTime,
                DxFreeText: event.target.DxFreeTextText.value,
                PresentIllness: event.target.PresentIllness.value,
                ChiefComplaint: event.target.ChiefComplaint.value,
                AccidentCauseOver45Days: "",
                UnderlyingCondition: event.target.UnderlyingCondition.value,
                PhysicalExam: event.target.PhysicalExam.value,
                PlanOfTreatment: event.target.PlanOfTreatment.value,
                ProcedureFreeText: event.target.ProcedureFreeText.value,
                AdditionalNote: event.target.AdditionalNote.value,
                SignSymptomsDate: signDate,
                ExpectedDayOfRecovery: expectedDayOfRecoveryP,
                HaveConcurNote: ConcurNoteCount,
                HaveProcedure: HaveProcedureCount,
                HaveAccidentCauseOfInjuryDetail: HavecauseOfInjuryDetailsCount,
                HaveAccidentInjuryDetail: HaveinjuryDetailsCount,
                AlcoholRelated: alcoholRelated,
                Pregnant: pregnant,
                PrivateCase: privateCase,
                AdmitDateTime: admitDateTimex,
                ComaScore: comaScoreP,
                IndicationForAdmission: admissionValue,
                PreauthReferClaimNo : PatientInfoData.PatientInfo.PreauthReferClaimNo,
                PreauthReferOcc: PatientInfoData.PatientInfo.PreauthReferOcc,
                PreviousTreatment: previousTreatment,
                PreviousTreatmentDate: PreviousDate,
                PreviousTreatmentDetail: PreviousDetail,
                DscDateTime: DscDateTimex,
                IsPackage: "",
                TotalEstimatedCost: "",
                AnesthesiaList: anesthesiaListValue,
              };
               console.log(PatientInfo);
              axios
                .post(
                  process.env.NEXT_PUBLIC_URL_SV +
                    process.env.NEXT_PUBLIC_URL_SubmitIPDVisit,
                  { PatientInfo }
                )
                .then((response) => {
                  console.log("3 Succ SubmitIPDVisit");
                  resolve("Step 3 completed");
                })
                .catch((error) => {
                  console.log("3 Error");
                  try {
                    const ErrorMass = error.config.url;
                    const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
                    setMassSummitError(
                      error.code + " - " + error.message + " - " + ErrorMass2
                    );
                    setShowSummitError("Error");
                  } catch (error) {
                    // setMassSummitError(error.response.data.HTTPStatus.message);
                    // setShowSummitError("Error");
                  }
                });
      
              //     // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 3'));
            });
      
          }
          function stepFour() {
            console.log("Step 4 SubmitConcurNote");

            return new Promise((resolve, reject) => {
              const PatientInfo = {
                RefId: PatientInfoData.PatientInfo.RefId,
                TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
                InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
                HN: PatientInfoData.PatientInfo.HN,
                VN: PatientInfoData.PatientInfo.VN,
                HaveConcurNote: ConcurNoteCount,
                ConcurNoteInfo : rows2
              };
              console.log(PatientInfo)
              axios
                .post(
                  process.env.NEXT_PUBLIC_URL_SV +
                    process.env.NEXT_PUBLIC_URL_SubmitConcurNote,
                  { PatientInfo }
                )
                .then((response) => {
              console.log(response.data)
                  if (response.data.HTTPStatus.statusCode === 200) {
                    axios
                    .post(
                      process.env.NEXT_PUBLIC_URL_SV +
                        process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
                      { PatientInfo }
                    )
                    .then((response) => {
                    //  console.log(response.data);
                    })
                    .catch((error) => {
                   //   console.log(error);
                    });

                    console.log("4 Succ SubmitConcurNote");
 
                    resolve("Step 4 completed");
                 
                  } else {
                    setMassSummitError(response.data.HTTPStatus.message);
                    setShowSummitError("Error");
                  }
                })
                .catch((error) => {
                //  console.log(error);
                  try {
                    const ErrorMass = error.config.url;
                    const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
                    setMassSummitError(
                      error.code + " - " + error.message + " - " + ErrorMass2
                    );
                    setShowSummitError("Error");
                  } catch (error) {
                    setMassSummitError(error.response.data.HTTPStatus.message);
                    setShowSummitError("Error");
                  }
                });
            });
          }

          function stepFive() {
            console.log("Step 5 SubmitIPDDischargeToAIA");
            let comaScoreP="";
            let expectedDayOfRecoveryP="";
            if (comaScore) {
              comaScoreP = comaScore;
            }
            if (expectedDayOfRecovery) {
              expectedDayOfRecoveryP = expectedDayOfRecovery;
            }
            return new Promise((resolve, reject) => {
              const PatientInfo = {
                IsIPDDischarge : isIPDDischargeValue,
                RefId: PatientInfoData.PatientInfo.RefId,
                TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
                InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
                HN: PatientInfoData.PatientInfo.HN,
                VN: PatientInfoData.PatientInfo.VN,
      
                VisitDateTime: PatientInfoData.PatientInfo.VisitDateTime,
                DxFreeText: event.target.DxFreeTextText.value,
                PresentIllness: event.target.PresentIllness.value,
                ChiefComplaint: event.target.ChiefComplaint.value,
                AccidentCauseOver45Days: "",
                UnderlyingCondition: event.target.UnderlyingCondition.value,
                PhysicalExam: event.target.PhysicalExam.value,
                PlanOfTreatment: event.target.PlanOfTreatment.value,
                ProcedureFreeText: event.target.ProcedureFreeText.value,
                AdditionalNote: event.target.AdditionalNote.value,
                SignSymptomsDate: signDate,
                ExpectedDayOfRecovery: expectedDayOfRecoveryP,
                ComaScore: comaScoreP,
                HaveProcedure: HaveProcedureCount,
                HaveAccidentCauseOfInjuryDetail: HavecauseOfInjuryDetailsCount,
                HaveAccidentInjuryDetail: HaveinjuryDetailsCount,
                AlcoholRelated: alcoholRelated,
                Pregnant: pregnant,
                PrivateCase: privateCase,
                AdmitDateTime: admitDateTimex,

                IndicationForAdmission: admissionValue,
                PreauthReferClaimNo : PatientInfoData.PatientInfo.PreauthReferClaimNo,
                PreauthOcc: PatientInfoData.PatientInfo.PreauthReferOcc,
                PreviousTreatment: previousTreatment,
                PreviousTreatmentDate: PreviousDate,
                PreviousTreatmentDetail: PreviousDetail,
                DscDateTime: DscDateTimex,
                IsPackage: "",
                TotalEstimatedCost: "",
                AnesthesiaList: anesthesiaListValue,
              };
              console.log(PatientInfo)
              axios
                .post(
                  process.env.NEXT_PUBLIC_URL_SV +
                    process.env.NEXT_PUBLIC_URL_SubmitIPDDischargeToAIA,
                  { PatientInfo }
                )
                .then((response) => {
              console.log(response.data)
                  if (response.data.HTTPStatus.statusCode === 200) {
                    axios
                    .post(
                      process.env.NEXT_PUBLIC_URL_SV +
                        process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
                      { PatientInfo }
                    )
                    .then((response) => {
                    //  console.log(response.data);
                    })
                    .catch((error) => {
                   //   console.log(error);
                    });
                    document.getElementById("my_modal_3").close();
                    console.log("5 Succ SubmitIPDDischargeToAIA");
                    // console.log(response.data);
                    setShowModal(true);
      
                    resolve("Step 5 completed");
                    setTimeout(() => {
                      setShowModal(false);
                      router.push("/aia/checkClaimStatus");
                    }, 5000);
                  } else {
                    setMassSummitError(response.data.HTTPStatus.message);
                    setShowSummitError("Error");
                  }
                })
                .catch((error) => {
                //  console.log(error);
                  try {
                    const ErrorMass = error.config.url;
                    const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
                    setMassSummitError(
                      error.code + " - " + error.message + " - " + ErrorMass2
                    );
                    setShowSummitError("Error");
                  } catch (error) {
                    setMassSummitError(error.response.data.HTTPStatus.message);
                    setShowSummitError("Error");
                  }
                });
      
              //     // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 3'));
            });
          }
    }
  }
  const IndicationForAdmission = (event) => {
    setAdmissionValue(event.target.value);
  };
  const AnesthesiaList = (event) => {
    setAnesthesiaListValue(event.target.value);
  };

  const Cancel = () => {
    setShowFormError();
    // console.log("-Cancel-")
    const isConfirmed = window.confirm("แน่ใจแล้วที่จะยกเลิกการเคลมใช่ไหม");
    if (isConfirmed) {
      // setPost();
      // const [RefId, TransactionNo, PID, PassportNumber, HN, VN] =
      //   data.split(" | ");
      const PatientInfo = {
        InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
        RefId: PatientInfoData.PatientInfo.RefId,
        TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
        PID: PatientInfoData.PatientInfo.PID,
        PassportNumber: PatientInfoData.PatientInfo.PassportNumber,
        HN: PatientInfoData.PatientInfo.HN,
        VN: PatientInfoData.PatientInfo.VN,
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_getclaimcancel,
          { PatientInfo }
        )
        .then((response) => {
       //   console.log(response.data);
          router.push("/aia/checkClaimStatus");
          // if (response.data.HTTPStatus.statusCode === 200) {
          // //  console.log("Cancel Succ")
          //  setMassCancel(response.data.HTTPStatus.message);
          //  setShowFormCancel("Cancel");
          // } else {

          //   setShowFormError("Error");
          //   setMassError(response.data.HTTPStatus.error);
          // }

       
        })
        .catch((error) => {
          // console.error("Error", err)
         // console.log(error);
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
    }
  };
  const handleUpload = async () => {
    if (!file) {
      setMsg(
        <div role="alert" className="alert alert-error text-base-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current "
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
          กรุณา เลือก Upload File
        </div>
      );
      return;
    }
    setMsg();
    setShowDocError();
    setProgress({ started: false, pc: 0 });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("RefId", PatientInfoData.PatientInfo.RefId);
    formData.append("TransactionNo", PatientInfoData.PatientInfo.TransactionNo);
    formData.append("HN", PatientInfoData.PatientInfo.HN);
    formData.append("VN", PatientInfoData.PatientInfo.VN);
    formData.append("insurerid", 13);
    formData.append("DocumenttypeCode", "002");
    formData.append("UploadedBy", "");
    formData.append("Runningdocument", randomNumber);
    setMsg(
      <CircularProgress size="30px" className="text-error text-lg" />
    );
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_uploadDocuments,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            setProgress((prevState) => {
              return { ...prevState, pc: progressEvent.progress * 100 };
            });
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProgress({ started: false, pc: 0 });
      setMsg(
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
          Upload Successful
        </div>
      );
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_getlistDocumentName,
          {
            "PatientInfo":{
            RefId: PatientInfoData.PatientInfo.RefId,
            TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
            HN: PatientInfoData.PatientInfo.HN,
            VN: PatientInfoData.PatientInfo.VN,
            DocumenttypeCode : "002",
            }
          }
        )
        .then((response) => {
          setFileList(response.data);
          //console.log(response.data)
        })
        .catch((error) => {
         // console.log(error);
          try {
            const ErrorMass = error.config.url;
            const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
            setMassDocError(
              error.code + " - " + error.message + " - " + ErrorMass2
            );
            setShowDocError("Error");
          } catch (error) {
            setMassDocError(error.response.data.HTTPStatus.message);
            setShowDocError("Error");
          }
        });
    } catch (error) {
      setProgress({ started: false, pc: 0 });
      console.log(error);
      setMsg(
        <div role="alert" className="alert alert-error text-base-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current "
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
          {error.message}
        </div>
      );
    }
  };
    ////////////////////////// ตัวเลื่อน ตารางซ้าย - ขวา ///////////////////////////////////////////
    const ITEMS_PER_PAGE = 10;

    const handleNextPagevitalsign = () => {
      setCurrentPagevitalsign(currentPagevitalsign + 1);
    };
  
    const handlePreviousPagevitalsign = () => {
      setCurrentPagevitalsign(currentPagevitalsign - 1);
    };
  
    const startIndexvitalsign = (currentPagevitalsign - 1) * ITEMS_PER_PAGE;
  
    const endIndexvitalsign = startIndexvitalsign + ITEMS_PER_PAGE;

    const datavitalsign = currentDatavitalsign.slice(startIndexvitalsign, endIndexvitalsign);
    useEffectOnce(() => {
      setCountvitalsign(datavitalsign.length);
    }, [datavitalsign]);
    /////////////////////////////////////////////////////////////////////
    ////////////////////////// ตัวเลื่อน ตารางซ้าย - ขวา ///////////////////////////////////////////
    const handleNextPageinvestigation = () => {
      setCurrentPageinvestigation(currentPageinvestigation + 1);
    };
  
    const handlePreviousPageinvestigation = () => {
      setCurrentPageinvestigation(currentPageinvestigation - 1);
    };
  
    const startIndexinvestigation = (currentPageinvestigation - 1) * ITEMS_PER_PAGE;
  
    const endIndexinvestigation = startIndexinvestigation + ITEMS_PER_PAGE;

    const datainvestigation = currentDatainvestigation.slice(startIndexinvestigation, endIndexinvestigation);
    useEffectOnce(() => {
      setCountinvestigation(datainvestigation.length);
    }, [datainvestigation]);
    /////////////////////////////////////////////////////////////////////
    ////////////////////////// ตัวเลื่อน ตารางซ้าย - ขวา ///////////////////////////////////////////
    const handleNextPageorderItemz = () => {
      setCurrentPageorderItemz(currentPageorderItemz + 1);
    };
  
    const handlePreviousPageorderItemz = () => {
      setCurrentPageorderItemz(currentPageorderItemz - 1);
    };
  
    const startIndexorderItemz = (currentPageorderItemz - 1) * ITEMS_PER_PAGE;
  
    const endIndexorderItemz = startIndexorderItemz + ITEMS_PER_PAGE;

    const dataorderItemz = currentDataorderItemz.slice(startIndexorderItemz, endIndexorderItemz);
    useEffectOnce(() => {
      setCountorderItemz(dataorderItemz.length);
    }, [dataorderItemz]);

    /////////////////////////////////////////////////////////////////////


     const IsIPDDischargeBox = (even) => {
    //  console.log(even.target.checked)
      setCheckedFinalDischarge(even.target.checked)
      document.getElementById("ConfrimFinal").showModal();
    }



      const CancleFinalDischarge = async () => {

      setCheckedFinalDischarge(false)
      setIsIPDDischargeValue(false)

    
      dispatch(
        save({
          value: "มีข้อมูล",
          Data: {
            RefId: data.DataTran.Data.RefId,
            TransactionNo: data.DataTran.Data.TransactionNo,
            VN: data.DataTran.Data.VN,
            InsurerCode: InsuranceCode,
            ServiceSettingCode: data.DataTran.Data.ServiceSettingCode,
            IllnessTypeCode: data.DataTran.Data.IllnessTypeCode,
            SurgeryTypeCode: data.DataTran.Data.SurgeryTypeCode,
            PolicyTypeCode: data.DataTran.Data.PolicyTypeCode,
            AccidentDate: data.DataTran.Data.AccidentDate,
            VisitDateTime: data.DataTran.Data.VisitDateTime,
            IsIPDDischarge: false,
            PreauthReferClaimNo: data.DataTran.Data.PreauthReferClaimNo,
            PreauthReferOcc: data.DataTran.Data.PreauthReferOcc,   
            FurtherClaimVN: data.DataTran.Data.FurtherClaimVN,
            ReferenceVN: data.DataTran.Data.ReferenceVN,
            Visitlocation: data.DataTran.Data.Visitlocation,
          },
        })
      );

      await stepOne();
      await stepTwo();
  
      function stepOne() {
        setTimeout(() => {
              router.push("/aia/checkClaimStatus");
        }, 1000);
   
      };
      function stepTwo() {
        setTimeout(() => {
               router.push("/aia/eligible");
  }, 1000);
      }

      // document.getElementById("ConfrimFinal").close();
    }


      const ConfrimFinalDischarge = async () => {

    if(checkedFinalDischarge === true){
      // const isConfirmed = window.confirm("แน่ใจแล้วที่จะ FinalDischarge");
      // if (isConfirmed) {
      setIsIPDDischargeValue(true)
      

      dispatch(
        save({
          value: "มีข้อมูล",
          Data: {
            RefId: data.DataTran.Data.RefId,
            TransactionNo: data.DataTran.Data.TransactionNo,
            VN: data.DataTran.Data.VN,
            InsurerCode: InsuranceCode,
            ServiceSettingCode: data.DataTran.Data.ServiceSettingCode,
            IllnessTypeCode: data.DataTran.Data.IllnessTypeCode,
            SurgeryTypeCode: data.DataTran.Data.SurgeryTypeCode,
            PolicyTypeCode: data.DataTran.Data.PolicyTypeCode,
            AccidentDate: data.DataTran.Data.AccidentDate,
            VisitDateTime: data.DataTran.Data.VisitDateTime,
            IsIPDDischarge: true,
            PreauthReferClaimNo: data.DataTran.Data.PreauthReferClaimNo,
            PreauthReferOcc: data.DataTran.Data.PreauthReferOcc,   
            FurtherClaimVN: data.DataTran.Data.FurtherClaimVN,
            ReferenceVN: data.DataTran.Data.ReferenceVN,
            Visitlocation: data.DataTran.Data.Visitlocation,
          },
        })
      );
    
      await stepOne();
      await stepTwo();
  
      function stepOne() {
        setTimeout(() => {
              router.push("/aia/checkClaimStatus");
        }, 1000);
   
      };
      function stepTwo() {
        setTimeout(() => {
               router.push("/aia/eligible");
  }, 1000);
      }
    
    
    
    //   }
     }
   
  }

  const  handleOtherInsurer = (e) => {
    setOtherInsurer(e.target.value);
  };
  const handleAlcoholRelated = () => {
    if(alcoholRelated === false){
      setAlcoholRelated(true);
    }else{
      setAlcoholRelated(false);
    }
  };
  const handlePregnant = () => {

    if(pregnant === false){
      setPregnant(true);
    }else{
      setPregnant(false);
    }
  };
  const handlePrivateCase = () => {

    if(privateCase === false){
      setPrivateCase(true);
    }else{
      setPrivateCase(false);
    }
  };
  const handlePreviousTreatment = () => {


    if(previousTreatment === false){
      setPreviousTreatment(true);
    }else{
      setPreviousTreatment(false);
      setPreviousTreatmentDetail("");
      setPreviousTreatmentDate(null);
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
      {patientInfoByPID ? (
        <>
          <form onSubmit={DataClaim}>
            {patientInfoByPID ? (
              <div className="justify-center border-solid w-4/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
                     <div className="grid gap-2 sm:grid-cols-2 w-full mt-2">
                      
              <div className="rounded-md">
                <h1 className="font-black text-accent text-3xl ">
                  Patient Info
                </h1>
                </div>
                <div className="rounded-md text-right">
                                    <h1
                                      className="btn btn-error text-base-100 text-xl "
                                      onClick={Cancel}
                                    >
                                      <MdCancel /> ยกเลิกการเคลม
                                    </h1>
                                    </div>
              </div>         
                <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
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
                        label="TitleName"
                        defaultValue={patientInfoByPID.TitleTHc}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300 cursor-not-allowed"
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
                        label="FirstName (TH)"
                        defaultValue={patientInfoByPID.GivenNameTH}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300 cursor-not-allowed"
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
                        label="LastName (TH)"
                        defaultValue={patientInfoByPID.SurnameTH}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
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
                        label="PID"
                        defaultValue={patientInfoByPID.PID}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                  </div>
                  {patientInfoByPID.PassportNumber ? (
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
                          label="Passport"
                          defaultValue={
                            patientInfoByPID.PassportNumber
                          }
                          className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                          InputProps={{ readOnly: true }}
                        />
                      </Box>
                    </div>
                  ) : (
                    ""
                  )}
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
                        label="Date of Birth (YYYY-MM-DD)"
                        defaultValue={patientInfoByPID.DateOfBirth}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
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
                        label="HN"
                        defaultValue={PatientInfoData.PatientInfo.HN}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
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
                        label="Gender"
                        defaultValue={patientInfoByPID.Gender}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
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
                        label="SurgeryType"
                        defaultValue={PatientInfoData.PatientInfo.SurgeryTypeCode === "N" ? "ไม่มีผ่าตัด" : "มีผ่านตัด"}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
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
                        label="Accident"
                        defaultValue={accidentDetail ? "มีอุบัติเหตุ" : "ไม่มีอุบัติเหตุ"}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {visit ? (
              <div className="container mx-auto justify-center border-solid w-4/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
                <h1 className="font-black text-accent text-3xl ">Visit</h1>



                <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
                  <div className="rounded-md">
                    <div className="flex items-center ">
                      {PatientInfoData.PatientInfo.PreauthReferClaimNo ? (
                        <>
                          <input
                            type="radio"
                            id="OtherInsurer"
                            name="OtherInsurer"
                            className="checkbox "
                            disabled
                          />
                          <p className="text-left ml-2">จองสิทธิ์ครั้งแรก</p>
                          <input
                            type="radio"
                            id="OtherInsurer"
                            name="OtherInsurer"
                            className="checkbox ml-2"
                            defaultChecked
                            disabled
                          />
                          <p className="text-left ml-2">เคยจองสิทธิ์มาก่อน</p>
                        </>
                      ) : (
                        <>
                          <input
                            type="radio"
                            id="OtherInsurer"
                            name="OtherInsurer"
                            className="checkbox"
                            defaultChecked
                            disabled
                          />
                          <p className="text-left ml-2">จองสิทธิ์ครั้งแรก</p>
                          <input
                            type="radio"
                            id="OtherInsurer"
                            name="OtherInsurer"
                            className="checkbox  ml-2"
                            disabled
                          />
                          <p className="text-left ml-2">เคยจองสิทธิ์มาก่อน</p>
                        </>
                      )}
                    </div>

                </div>
                <div className="rounded-md">
                     <div className="flex items-center ">
                      <input
                        type="checkbox"
                        id="OtherInsurer"
                        name="OtherInsurer"
                        defaultValue={otherInsurer}
                        className="checkbox checkbox-info"
                        onChange={handleOtherInsurer}
                      />
                      <p className="text-left">
                        &nbsp;ค่าส่วนเกินจากประกันอื่นๆ 
                      </p>
                    </div> 
                  </div>
                  <div className="rounded-md">

                    <div className="flex items-center ">
                     
                      {(PatientInfoData.PatientInfo.IsIPDDischarge === false || PatientInfoData.PatientInfo.IsIPDDischarge === null) ?
                                         <>
                      <input
                        type="checkbox"
                        id="OtherInsurer"
                        name="OtherInsurer"
                        value={isIPDDischargeValue}
                        className="checkbox checkbox-error"
                        onChange={(e) => IsIPDDischargeBox(e)}
                      /> 
                      </>
                      :
                      <>
                      <input
                      type="checkbox"
                      id="OtherInsurer"
                      name="OtherInsurer"
                      value={isIPDDischargeValue}
                      className="checkbox checkbox-error"
                      defaultChecked
                      onChange={(e) => IsIPDDischargeBox(e)}
                    /> 
                    </>
                    }
                      <p className="text-left">
                        &nbsp;FinalDischarge
                      </p>
                    </div>  
                  </div>
      
                  <div className="rounded-md"> </div>
                  <div className="rounded-md mt-2">
                    <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        label="VN"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        defaultValue={PatientInfoData.PatientInfo.VN}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                  </div>
                  <div className="rounded-md mt-2">
                    <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        label="VisitDateTime"
                        defaultValue={PatientInfoData.PatientInfo.VisitDateTime}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                  </div>
                  <div className="rounded-md mt-2">
                    <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        label="Weight / Height"
                        defaultValue={combinedString}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                  </div>
                  <div className="rounded-md text-black mt-2">
                    </div>
                  {PatientInfoData.PatientInfo.PreauthReferClaimNo ? (
                    <>
                  <div className="rounded-md text-black mt-2">
                    <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                      <CustomTextField
                        id="disabledInput"
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        label="PreauthReferOcc"
                        defaultValue={PatientInfoData.PatientInfo.PreauthReferOcc}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                  </div>
                    <div className="rounded-md text-black mt-2">
                  <Box
                      sx={{
                        backgroundColor: "#e5e7eb",
                        padding: 0,
                        borderRadius: 0,
                      }}
                    >
                        <CustomTextField
                          id="disabledInput"
                          className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                          label="PreauthReferClaimNo"
                          defaultValue={
                            PatientInfoData.PatientInfo.PreauthReferClaimNo
                          }
                          InputProps={{ readOnly: true }}
                        />
                      </Box>
                    </div>
                    </>
                  ) : (
                    ""
                  )}
   
                </div>
                <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
                      <div className="rounded-md mt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem>
                            <DateTimePicker
                            label="ExpectedAdmitDate"
                            slotProps={{
                              openPickerButton: { color: "error" },
                              textField: { focused: true, color: "error" },
                            }}
                            defaultValue={admitDateTime}
                              onChange={(newAdmitDateTime) =>
                                setAdmitDateTime(newAdmitDateTime)
                              }
                              required
                              format="YYYY-MM-DD HH:MM"
                            />
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="rounded-md mt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem>
                            <DateTimePicker
                            label="DscDateTime"
                            slotProps={{
                              openPickerButton: { color: "error" },
                              textField: { focused: true, color: "error" },
                            }}
                            defaultValue={dscDateTime}
                              onChange={(newDscDateTime) =>
                                setDscDateTime(newDscDateTime)
                              }
                              required
                              format="YYYY-MM-DD HH:MM"
                            />
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                  {/* <div className="rounded-md mt-2">
                    <TextField
                      type="number"
                      className="w-full"
                      label="ประมาณการจำนวนวันที่นอนโรงพยาบาล"
                      id="outlined-start-adornment"
                      // sx={{ m: 1 }}
                      defaultValue={expectedLos}
                      onChange={(newExpectedLos) =>
                        setExpectedLos(newExpectedLos)
                      }
                      inputProps={{ min: 0 }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              Days
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div> */}
                  <div className="rounded-md mt-2">
                  <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
              IndicationForAdmission
              </InputLabel>
         
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={admissionValue}
                label="IndicationForAdmission"
                onChange={IndicationForAdmission}
              >
                <MenuItem key="" value=""></MenuItem>
                {indicationForAdmissionCode
                  ? indicationForAdmissionCode.Result.map((code, index) => (
                      <MenuItem key={index} value={code.ifacode}>
                        {code.ifaname}
                      </MenuItem>
                    ))
                  :    <MenuItem>
                  
                </MenuItem>
                }
              </Select>
              </FormControl>


                  </div>

                  </div>
                {/* <div className="rounded-md mt-2 text-3xl text-error  flex "> 
            <div
                        className="btn btn-secondary text-base-100 text-xl"
                        onClick={Editfurtherclaimvn}
                      >
                        <FaEdit className="text-base-100" />
                      </div>
                  <div className="mt-2 ml-2">Claim form จาก VN : {PatientInfoData.PatientInfo.FurtherClaimVN ? (PatientInfoData.PatientInfo.FurtherClaimVN === PatientInfoData.PatientInfo.VN ? PatientInfoData.PatientInfo.VN+" ( ปัจจุบัน )" : PatientInfoData.PatientInfo.FurtherClaimVN+" ( เก่า )") : PatientInfoData.PatientInfo.VN+" ( ปัจจุบัน )" }</div>                    

                </div> */}
                <div className="grid gap-2 sm:grid-cols-2 w-full mt-4">
                  <div className="rounded-md mt-2">
                    <TextField
                      //    error
                      className="w-full"
                      id="outlined-multiline-static"
                      label="Cheif Complaint and duration"
                      name="ChiefComplaint"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.ChiefComplaint}
                      inputProps={{ maxLength: 200 }}
                      //   required
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      //   error
                      className="w-full"
                      id="outlined-multiline-static"
                      label="Chronic disease"
                      name="UnderlyingCondition"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.UnderlyingCondition}
                      inputProps={{ maxLength: 500 }}
                      //    required
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      error
                      className="w-full"
                      id="outlined-multiline-static"
                      label="Provisnal Diagnosis"
                      name="DxFreeTextText"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.DxFreeText}
                      inputProps={{ maxLength: 200 }}
                      required
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      //     error
                      className="w-full"
                      name="PresentIllness"
                      id="outlined-multiline-static"
                      label="Present illness or Cause of Injury"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.PresentIllness}
                      inputProps={{ maxLength: 500 }}
                      //   required
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      //   error
                      className="w-full"
                      name="PhysicalExam"
                      id="outlined-multiline-static"
                      label="Physical exam"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.PhysicalExam}
                      //   required
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      // error
                      className="w-full"
                      name="PlanOfTreatment"
                      id="outlined-multiline-static"
                      label="Treatment"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.PlanOfTreatment}
                      inputProps={{ maxLength: 500 }}
                      //   required
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      //  error
                      className="w-full"
                      name="ProcedureFreeText"
                      id="outlined-multiline-static"
                      label="ProcedureFreeText"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.ProcedureFreeText}
                      inputProps={{ maxLength: 500 }}
                      //   required
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      //  error
                      className="w-full"
                      name="AdditionalNote"
                      id="outlined-multiline-static"
                      label="AdditionalNote"
                      multiline
                      rows={4}
                      defaultValue={visit.Result.VisitInfo.AdditionalNote}
                      inputProps={{ maxLength: 500 }}
                      //   required
                    />
                  </div>
                </div>

                <div className="flex  w-full mt-4">
                  <div className="w-1/5">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem>
                        <DesktopDatePicker
                          label="วันที่เริ่มมีอาการ"
                          value={signSymptomsDate}
                          onChange={(newSignSymptomsDate) =>
                            setSignSymptomsDate(newSignSymptomsDate)
                          }
                          format="YYYY-MM-DD"
                        />
                      </DemoItem>
                    </LocalizationProvider>
                  </div>
                  <div className="w-1/4 ml-2">
                    <TextField
                      label="ระดับความรู้สึกตัว (Score 3-15)"

                      defaultValue={comaScore}
                      onChange={(newComaScore) => setComaScore(newComaScore.target.value)}
                      // inputProps={{ min: 3, max: 15 }}
                      variant="outlined"
                      fullWidth
                    />
                  </div>

                  <div className="w-1/4 ml-2">
                    <TextField
                      type="number"
                      label="จำนวนวันพักฟื้นหลังการผ่าตัด"
                      id="outlined-start-adornment"
                      // sx={{ m: 1 }}
                      defaultValue={expectedDayOfRecovery}
                      onChange={(newExpectedDayOfRecovery) =>
                        setExpectedDayOfRecovery(newExpectedDayOfRecovery.target.value)
                      }
                      inputProps={{ min: 0 }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              Days
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="border-solid border-2 mt-2">
                  <h1 className="mt-2 ml-2 text-accent text-lg">
                    การเจ็บป่วยนี่เกี่ยวข้องกับสิ่งแวดล้อมอื่นๆ (
                    กรณีไม่ได้เลือก ไม่เกี่ยวข้องกับปัจจัยแวดล้อมอื่นๆ
                    สามารถเลือกได้มากกว่า 1 ข้อ )
                  </h1>
                  <div className="flex items-center mt-2 ml-2">
                    {visit ? (
                      visit.Result.VisitInfo.AlcoholRelated === true ? (
                        <input
                          type="checkbox"
                          id="alcoholRelated"
                          name="alcoholRelated"
                          value={alcoholRelated}
                          className="checkbox"
                          onChange={handleAlcoholRelated}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          id="alcoholRelated"
                          name="alcoholRelated"
                          value={alcoholRelated}
                          className="checkbox"
                          onChange={handleAlcoholRelated}
                        />
                      )
                    ) : (
                      ""
                    )}

                    <p className="text-left ml-2">
                      การเจ็บป่วยครั้งนี้เกี่ยวข้องกับแอลกอฮอล์ หรือ ยาเสพติด
                    </p>
                  </div>
                
                  <div className="flex items-center mt-2 ml-2">
                  {visit ? (
                      visit.Result.VisitInfo.Pregnant  === true ? (
                    <input
                      type="checkbox"
                      id="pregnant"
                      name="pregnant"
                      value={pregnant}
                      className="checkbox"
                      onChange={handlePregnant}
                      defaultChecked
                    />
                     ) : (
                      <input
                      type="checkbox"
                      id="pregnant"
                      name="pregnant"
                      value={pregnant}
                      className="checkbox"
                      onChange={handlePregnant}
                    />
                      )
                    ) : (
                      ""
                    )}
                    <p className="text-left ml-2">ตั้งครรภ์</p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                  {visit ? (
                      visit.Result.VisitInfo.PrivateCase  === true ? (
                    <input
                      type="checkbox"
                      id="privateCase"
                      name="privateCase"
                      value={privateCase}
                      className="checkbox "
                      onChange={handlePrivateCase}
                      defaultChecked
                    />
                  ) : (
                    <input
                    type="checkbox"
                    id="privateCase"
                    name="privateCase"
                    value={privateCase}
                    className="checkbox "
                    onChange={handlePrivateCase}
                  />
                    )
                  ) : (
                    ""
                  )}
                    <p className="text-left ml-2">เป็นเคสพิเศษ</p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                  {visit ? (
                      previousTreatment === true ? (
                    <input
                      type="checkbox"
                      id="previousTreatment"
                      name="previousTreatment"
                      //value={previousTreatment}
                      className="checkbox "
                      onChange={handlePreviousTreatment}
                      defaultChecked
                      />
                    ) : (
                      <input
                      type="checkbox"
                      id="previousTreatment"
                      name="previousTreatment"
                      //value={previousTreatment}
                      className="checkbox "
                      onChange={handlePreviousTreatment}
                      
                      />
                      )
                    ) : (
                      ""
                    )}
                    <p className="text-left ml-2 pb-2">
                      เคยเข้ารับการรักษาก่อนการรักษาครั้งนี้
                    </p>
                  </div>
                  {previousTreatment === true && (
                    <>
                      <div className="flex  w-full mt-2">
                        <div className="w-1/4">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                              <DesktopDatePicker
                                slotProps={{
                                  openPickerButton: { color: "error" },
                                  textField: { focused: true, color: "error" },
                                }}
                                label="วันที่เข้ารับการรักษาก่อนการรักษาครั้งนี้"
                                defaultValue={previousTreatmentDate ? dayjs(previousTreatmentDate) : ""}
                                onChange={(newPreviousTreatmentDate) =>
                                  setPreviousTreatmentDate(
                                    newPreviousTreatmentDate
                                  )
                                }
                                format="YYYY-MM-DD"
                              />
                            </DemoItem>
                          </LocalizationProvider>
                        </div>
                        <div className="w-2/5 ml-2">
                          <TextField
                            error
                            id="disabledInput"
                            label="ชื่อโรงพยาบาลที่เข้ารับการรักษาก่อนการรักษาครั้งนี้ (ไม่เกิน 20 ตัวอักษร)"
                            inputProps={{ maxLength: 20 }}
                            className="w-full"
                            defaultValue={previousTreatmentDetail}
                            onChange={(newPreviousTreatmentDetail) =>
                              setPreviousTreatmentDetail(
                                newPreviousTreatmentDetail.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
        ) : (
              ""
            )}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {PatientInfoData.PatientInfo.IllnessTypeCode === "ACC" ||
            PatientInfoData.PatientInfo.IllnessTypeCode === "ER" ? (
              // accidentDetail ? (
              //   <>
                  // <div className="justify-center border-solid w-5/5 m-auto border-2 border-error rounded-lg p-4 mt-2">
                    <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-error rounded-lg p-4 mt-2">
                    <h1 className="font-black text-error text-3xl ">
                      AccidentDetail
                      <div
                        className="btn btn-secondary text-base-100 text-xl ml-2"
                        onClick={SummitEditAcc}
                      >
                        <FaEdit />
                      </div>
                    </h1>
                    <div className="flex  w-full mt-2">
                      <div className="w-1/5 ">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem>
                            <DesktopDatePicker
                              defaultValue={accidentDate}
                              onChange={(newAccidentDate) =>
                                setAccidentDate(newAccidentDate)
                              }
                              required
                              format="YYYY-MM-DD"
                            />
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="w-2/5">
                        <FormControl fullWidth>
                          <InputLabel id="demo-error-select-label">
                            สถานที่เกิดอุบัติเหตุ
                          </InputLabel>
                          <Select
                            error
                            className="mx-2"
                            labelId="demo-error-select-label"
                            id="demo-error-select"
                            //name="accidentPlaceText"
                            value={accidentPlaceValue}
                            label="สถานที่เกิดอุบัติเหตุ"
                            onChange={AccidentPlace}
                            required
                          >
                            <MenuItem
                                    key=""
                                    value=""
                                  >
                                  </MenuItem>
                            {dataaccidentPlace
                              ? dataaccidentPlace.Result.map((acc, index) => (
                                  <MenuItem
                                    key={index}
                                    value={acc.accidentplacecode}
                                  >
                                    {acc.accidentplacename}
                                  </MenuItem>
                                ))
                              : ""}
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                                สาเหตุของการเกิดอุบัติเหตุ (ICD10 code)
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                                คำอธิบายอวัยวะที่ได้รับจากการเกิดอุบัติเหตุว่ามีลักษณะบาดแผลอย่างไร
                              </h1>
                            </TableCell>
                            {summitEditAcc === "true" ? (
                              <TableCell></TableCell>
                            ) : (
                              ""
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                 
                          {causeOfInjuryDetails
                            ? causeOfInjuryDetails.map(
                                (cause, index) =>
                                  cause.CauseOfInjury  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <input
                                              type="text"
                                              className="rounded-full px-3 py-2 border-2 bg-base-100 break-all w-full"
                                              value={cause.CauseOfInjury}
                                              required
                                              onChange={(e) =>
                                                handleChangeA1(index, e)
                                              }
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {cause.CauseOfInjury ? (
                                                cause.CauseOfInjury
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <TextField
                                              type="text"
                                              className="bg-base-100 w-full m-2"
                                              value={cause.CommentOfInjury}
                                              onChange={(e) =>
                                                handleChangeA2(index, e)
                                              }
                                              required
                                              inputProps={{ maxLength: 200 }}
                                              placeholder="CommentOfInjury"
                                              multiline
                                              rows={4}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {cause.CommentOfInjury ? (
                                                cause.CommentOfInjury
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      {summitEditAcc === "true" ? (
                                        <TableCell>
                                          <div
                                            onClick={() =>
                                              handleDeleteCauseOfInjuryDetail(
                                                index
                                              )
                                            }
                                            className="btn btn-error text-base-100 text-xl"
                                          >
                                            <FaCircleMinus />
                                          </div>
                                        </TableCell>
                                      ) : (
                                        ""
                                      )}
                                    </TableRow>
                                  )
                              )
                            : ""}
                          {summitEditAcc === "true" ? (
                            <>
                              <TableRow>
                                <TableCell>
                                  <FaCirclePlus className="text-xl" />
                                </TableCell>

                                <TableCell>
                                  <TextField
                                    className="bg-base-100 w-full"
                                    value={newCauseOfInjuryDetail.CauseOfInjury}
                                    onChange={(e) =>
                                      setNewCauseOfInjuryDetail({
                                        ...newCauseOfInjuryDetail,
                                        CauseOfInjury: e.target.value,
                                      })
                                    }
                                    placeholder="CauseOfInjury"
                                   //   required
                                  />
                                </TableCell>
                                {/* <TableCell> */}
                                <div className="m-2">
                                  <TextField
                                    type="text"
                                    className="bg-base-100 w-full "
                                    value={
                                      newCauseOfInjuryDetail.CommentOfInjury
                                    }
                                    onChange={(e) =>
                                      setNewCauseOfInjuryDetail({
                                        ...newCauseOfInjuryDetail,
                                        CommentOfInjury: e.target.value,
                                      })
                                    }
                                    inputProps={{ maxLength: 200 }}
                                    placeholder="CommentOfInjury"
                                    multiline
                                    rows={4}
                                  //     required
                                  />
                                </div>
                                {/* </TableCell> */}
                                {newCauseOfInjuryDetail.CauseOfInjury &&
                                newCauseOfInjuryDetail.CommentOfInjury ? (
                                  <>
                                    <TableCell>
                                      <div
                                        onClick={handleAddCauseOfInjuryDetail}
                                        className="btn btn-success text-base-100 text-xl"
                                      >
                                        <FaCirclePlus />
                                      </div>
                                    </TableCell>
                                  </>
                                ) : (
                                  ""
                                )}
                              </TableRow>
                            </>
                          ) : (
                            ""
                          )}
                        </TableBody>
                      </Table>
                      <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                        <div className="rounded-md"></div>
                        <div className="rounded-md"></div>
                        <div className="rounded-md "></div>
                        <div className="rounded-md ">&nbsp;</div>
                      </div>
                    </TableContainer>

                    <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-1/7 text-center">
                                อวัยวะที่ได้บาดเจ็บจากการเกิดอุบัติเหตุ (ICD10
                                code)
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-3/7 text-center">
                                ข้างของอวัยวะที่ได้รับบาดเจ็บจากการเกิดอุบัติเหตุ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-3/7 text-center">
                                ลักษณะบาดแผลที่ได้รับจากการเกิดอุบัติเหตุ
                              </h1>
                            </TableCell>
                            {summitEditAcc === "true" ? (
                              <TableCell></TableCell>
                            ) : (
                              ""
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {injuryDetails
                            ? injuryDetails.map(
                                (injury, index) =>
                                  injury.InjuryArea  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>

                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <input
                                              type="text"
                                              className="rounded-full px-3 py-2 border-2 bg-base-100 break-all w-full"
                                              value={injury.InjuryArea}
                                              onChange={(e) =>
                                                handleChangeB1(index, e)
                                              }
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.InjuryArea ? (
                                                injury.InjuryArea
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <FormControl fullWidth>
                                              <Select
                                                className="bg-base-100 w-full m-2"
                                                labelId="policyTypeValue"
                                                id="demo-simple-select"
                                                value={injury.InjurySide}
                                                label=""
                                                onChange={(e) =>
                                                  handleChangeB2(index, e)
                                                }
                                                required
                                              >
                                                {injurySideType
                                                  ? injurySideType.Result.map(
                                                      (injury, index) => (
                                                        <MenuItem
                                                          key={index}
                                                          value={
                                                            injury.injurysidecode
                                                          }
                                                        >
                                                          {
                                                            injury.injurysidecode
                                                          }{" "}
                                                          -{" "}
                                                          {
                                                            injury.injurysidename
                                                          }
                                                        </MenuItem>
                                                      )
                                                    )
                                                  : ""}
                                              </Select>
                                            </FormControl>
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.InjurySide ? (
                                                injury.InjurySide
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <FormControl fullWidth>
                                              <Select
                                                className="bg-base-100 w-full m-2"
                                                labelId="policyTypeValue"
                                                id="demo-simple-select"
                                                value={injury.WoundType}
                                                label=""
                                                onChange={(e) =>
                                                  handleChangeB3(index, e)
                                                }
                                                required
                                              >
                                                {injuryWoundType
                                                  ? injuryWoundType.Result.map(
                                                      (Wound, index) => (
                                                        <MenuItem
                                                          key={index}
                                                          value={
                                                            Wound.woundtypecode
                                                          }
                                                        >
                                                          {Wound.woundtypecode}{" "}
                                                          -{" "}
                                                          {Wound.woundtypename}
                                                        </MenuItem>
                                                      )
                                                    )
                                                  : ""}
                                              </Select>
                                            </FormControl>
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.WoundType ? (
                                                injury.WoundType
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      {summitEditAcc === "true" ? (
                                        
                                        <TableCell>
                                          <div
                                            onClick={() =>
                                              handleDeleteInjuryDetail(index)
                                            }
                                            className="btn btn-error text-base-100 text-xl"
                                          >
                                            <FaCircleMinus />
                                          </div>
                                        </TableCell>
                                        
                                      ) : (
                                        ""
                                      )}
                                    </TableRow>
                                  )
                              )
                            : ""}
                          {summitEditAcc === "true" ? (
                            <>
                              <TableRow>
                                <TableCell>
                                  <FaCirclePlus className="text-xl" />
                                </TableCell>

                                <TableCell>
                                  <TextField
                                    className="bg-base-100 w-full"
                                    value={newInjuryDetail.InjuryArea}
                                    onChange={(e) =>
                                      setNewInjuryDetail({
                                        ...newInjuryDetail,
                                        InjuryArea: e.target.value,
                                      })
                                    }
                                    placeholder="InjuryArea"
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormControl fullWidth>
                                    <Select
                                      className="bg-base-100 w-full m-2"
                                      labelId="policyTypeValue"
                                      id="demo-simple-select"
                                      value={newInjuryDetail.InjurySide}
                                      label=""
                                      onChange={(e) =>
                                        setNewInjuryDetail({
                                          ...newInjuryDetail,
                                          InjurySide: e.target.value,
                                        })
                                      }
                                    >
                                      {injurySideType
                                        ? injurySideType.Result.map(
                                            (injury, index) => (
                                              <MenuItem
                                                key={index}
                                                value={injury.injurysidecode}
                                              >
                                                {injury.injurysidecode} -{" "}
                                                {injury.injurysidename}
                                              </MenuItem>
                                            )
                                          )
                                        : ""}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <FormControl fullWidth>
                                    <Select
                                      className="bg-base-100 w-full m-2"
                                      labelId="policyTypeValue"
                                      id="demo-simple-select"
                                      value={newInjuryDetail.WoundType}
                                      label=""
                                      onChange={(e) =>
                                        setNewInjuryDetail({
                                          ...newInjuryDetail,
                                          WoundType: e.target.value,
                                        })
                                      }
                                    >
                                      {injuryWoundType
                                        ? injuryWoundType.Result.map(
                                            (Wound, index) => (
                                              <MenuItem
                                                key={index}
                                                value={Wound.woundtypecode}
                                              >
                                                {Wound.woundtypecode} -{" "}
                                                {Wound.woundtypename}
                                              </MenuItem>
                                            )
                                          )
                                        : ""}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                {newInjuryDetail.InjuryArea &&
                                newInjuryDetail.InjurySide &&
                                newInjuryDetail.WoundType ? (
                                  <>
                                    <TableCell>
                                      <div
                                        onClick={handleAddInjuryDetail}
                                        className="btn btn-success text-base-100 text-xl"
                                      >
                                        <FaCirclePlus />
                                      </div>
                                    </TableCell>
                                  </>
                                ) : (
                                  ""
                                )}
                              </TableRow>
                            </>
                          ) : (
                            ""
                          )}
                        </TableBody>
                      </Table>
                      <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                        <div className="rounded-md"></div>
                        <div className="rounded-md"></div>
                        <div className="rounded-md "></div>
                        <div className="rounded-md ">&nbsp;</div>
                      </div>
                    </TableContainer>
                  </div>
              //   </>

              // ) : (
              //   ""
              // )
            ) : (
              <>
                  <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
                    <h1 className="font-black text-accent text-3xl ">
                      AccidentDetail
                      <div
                        className="btn btn-secondary text-base-100 text-xl ml-2"
                        onClick={SummitEditAcc}
                      >
                        <FaEdit />
                      </div>
                    </h1>

                    <div className="flex  w-full mt-2">
                      <div className="w-1/5 ">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem>
                            <DesktopDatePicker
                              defaultValue={accidentDate}
                              onChange={(newAccidentDate) =>
                                setAccidentDate(newAccidentDate)
                              }
                            //  required
                              format="YYYY-MM-DD"
                            />
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="w-2/5">
                        <FormControl fullWidth>
                          <InputLabel id="demo-error-select-label">
                            สถานที่เกิดอุบัติเหตุ
                          </InputLabel>
                          <Select
                            className="mx-2"
                            labelId="demo-error-select-label"
                            id="demo-error-select"
                            //name="accidentPlaceText"
                            value={accidentPlaceValue}
                            label="สถานที่เกิดอุบัติเหตุ"
                            onChange={AccidentPlace}
                           // required
                          >
                            {dataaccidentPlace
                              ? dataaccidentPlace.Result.map((acc, index) => (
                                  <MenuItem
                                    key={index}
                                    value={acc.accidentplacecode}
                                  >
                                    {acc.accidentplacename}
                                  </MenuItem>
                                ))
                              : ""}
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                                สาเหตุของการเกิดอุบัติเหตุ (ICD10 code)
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                                คำอธิบายอวัยวะที่ได้รับจากการเกิดอุบัติเหตุว่ามีลักษณะบาดแผลอย่างไร
                              </h1>
                            </TableCell>
                            {summitEditAcc === "true" ? (
                              <TableCell></TableCell>
                            ) : (
                              ""
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                 
                          {causeOfInjuryDetails
                            ? causeOfInjuryDetails.map(
                                (cause, index) =>
                                  cause.CauseOfInjury  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <input
                                              type="text"
                                              className="rounded-full px-3 py-2 border-2 bg-base-100 break-all w-full"
                                              value={cause.CauseOfInjury}
                                              onChange={(e) =>
                                                handleChangeA1(index, e)
                                              }
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {cause.CauseOfInjury ? (
                                                cause.CauseOfInjury
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <TextField
                                              type="text"
                                              className="bg-base-100 w-full m-2"
                                              value={cause.CommentOfInjury}
                                              onChange={(e) =>
                                                handleChangeA2(index, e)
                                              }
                                              inputProps={{ maxLength: 200 }}
                                              placeholder="CommentOfInjury"
                                              multiline
                                              rows={4}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {cause.CommentOfInjury ? (
                                                cause.CommentOfInjury
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      {summitEditAcc === "true" ? (
                                        <TableCell>
                                          <div
                                            onClick={() =>
                                              handleDeleteCauseOfInjuryDetail(
                                                index
                                              )
                                            }
                                            className="btn btn-error text-base-100 text-xl"
                                          >
                                            <FaCircleMinus />
                                          </div>
                                        </TableCell>
                                      ) : (
                                        ""
                                      )}
                                    </TableRow>
                                  )
                              )
                            : ""}
                          {summitEditAcc === "true" ? (
                            <>
                              <TableRow>
                                <TableCell>
                                  <FaCirclePlus className="text-xl" />
                                </TableCell>

                                <TableCell>
                                  <TextField
                                    className="bg-base-100 w-full"
                                    value={newCauseOfInjuryDetail.CauseOfInjury}
                                    onChange={(e) =>
                                      setNewCauseOfInjuryDetail({
                                        ...newCauseOfInjuryDetail,
                                        CauseOfInjury: e.target.value,
                                      })
                                    }
                                    placeholder="CauseOfInjury"
                                 //     required
                                  />
                                </TableCell>
                                {/* <TableCell> */}
                                <div className="m-2">
                                  <TextField
                                    type="text"
                                    className="bg-base-100 w-full "
                                    value={
                                      newCauseOfInjuryDetail.CommentOfInjury
                                    }
                                    onChange={(e) =>
                                      setNewCauseOfInjuryDetail({
                                        ...newCauseOfInjuryDetail,
                                        CommentOfInjury: e.target.value,
                                      })
                                    }
                                    inputProps={{ maxLength: 200 }}
                                    placeholder="CommentOfInjury"
                                    multiline
                                    rows={4}
                                  //     required
                                  />
                                </div>
                                {/* </TableCell> */}
                                {newCauseOfInjuryDetail.CauseOfInjury &&
                                newCauseOfInjuryDetail.CommentOfInjury ? (
                                  <>
                                    <TableCell>
                                      <div
                                        onClick={handleAddCauseOfInjuryDetail}
                                        className="btn btn-success text-base-100 text-xl"
                                      >
                                        <FaCirclePlus />
                                      </div>
                                    </TableCell>
                                  </>
                                ) : (
                                  ""
                                )}
                              </TableRow>
                            </>
                          ) : (
                            ""
                          )}
                        </TableBody>
                      </Table>
                      <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                        <div className="rounded-md"></div>
                        <div className="rounded-md"></div>
                        <div className="rounded-md "></div>
                        <div className="rounded-md ">&nbsp;</div>
                      </div>
                    </TableContainer>

                    <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-1/7 text-center">
                                อวัยวะที่ได้บาดเจ็บจากการเกิดอุบัติเหตุ (ICD10
                                code)
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-3/7 text-center">
                                ข้างของอวัยวะที่ได้รับบาดเจ็บจากการเกิดอุบัติเหตุ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-3/7 text-center">
                                ลักษณะบาดแผลที่ได้รับจากการเกิดอุบัติเหตุ
                              </h1>
                            </TableCell>
                            {summitEditAcc === "true" ? (
                              <TableCell></TableCell>
                            ) : (
                              ""
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {injuryDetails
                            ? injuryDetails.map(
                                (injury, index) =>
                                  injury.InjuryArea  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>

                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <input
                                              type="text"
                                              className="rounded-full px-3 py-2 border-2 bg-base-100 break-all w-full"
                                              value={injury.InjuryArea}
                                              onChange={(e) =>
                                                handleChangeB1(index, e)
                                              }
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.InjuryArea ? (
                                                injury.InjuryArea
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <FormControl fullWidth>
                                              <Select
                                                className="bg-base-100 w-full m-2"
                                                labelId="policyTypeValue"
                                                id="demo-simple-select"
                                                value={injury.InjurySide}
                                                label=""
                                                onChange={(e) =>
                                                  handleChangeB2(index, e)
                                                }
                                                required
                                              >
                                                {injurySideType
                                                  ? injurySideType.Result.map(
                                                      (injury, index) => (
                                                        <MenuItem
                                                          key={index}
                                                          value={
                                                            injury.injurysidecode
                                                          }
                                                        >
                                                          {
                                                            injury.injurysidecode
                                                          }{" "}
                                                          -{" "}
                                                          {
                                                            injury.injurysidename
                                                          }
                                                        </MenuItem>
                                                      )
                                                    )
                                                  : ""}
                                              </Select>
                                            </FormControl>
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.InjurySide ? (
                                                injury.InjurySide
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {summitEditAcc === "true" ? (
                                          <>
                                            <FormControl fullWidth>
                                              <Select
                                                className="bg-base-100 w-full m-2"
                                                labelId="policyTypeValue"
                                                id="demo-simple-select"
                                                value={injury.WoundType}
                                                label=""
                                                onChange={(e) =>
                                                  handleChangeB3(index, e)
                                                }
                                              //  required
                                              >
                                                {injuryWoundType
                                                  ? injuryWoundType.Result.map(
                                                      (Wound, index) => (
                                                        <MenuItem
                                                          key={index}
                                                          value={
                                                            Wound.woundtypecode
                                                          }
                                                        >
                                                          {Wound.woundtypecode}{" "}
                                                          -{" "}
                                                          {Wound.woundtypename}
                                                        </MenuItem>
                                                      )
                                                    )
                                                  : ""}
                                              </Select>
                                            </FormControl>
                                          </>
                                        ) : (
                                          <>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.WoundType ? (
                                                injury.WoundType
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </TableCell>
                                      {summitEditAcc === "true" ? (
                                        
                                        <TableCell>
                                          <div
                                            onClick={() =>
                                              handleDeleteInjuryDetail(index)
                                            }
                                            className="btn btn-error text-base-100 text-xl"
                                          >
                                            <FaCircleMinus />
                                          </div>
                                        </TableCell>
                                        
                                      ) : (
                                        ""
                                      )}
                                    </TableRow>
                                  )
                              )
                            : ""}
                          {summitEditAcc === "true" ? (
                            <>
                              <TableRow>
                                <TableCell>
                                  <FaCirclePlus className="text-xl" />
                                </TableCell>

                                <TableCell>
                                  <TextField
                                    className="bg-base-100 w-full"
                                    value={newInjuryDetail.InjuryArea}
                                    onChange={(e) =>
                                      setNewInjuryDetail({
                                        ...newInjuryDetail,
                                        InjuryArea: e.target.value,
                                      })
                                    }
                                    placeholder="InjuryArea"
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormControl fullWidth>
                                    <Select
                                      className="bg-base-100 w-full m-2"
                                      labelId="policyTypeValue"
                                      id="demo-simple-select"
                                      value={newInjuryDetail.InjurySide}
                                      label=""
                                      onChange={(e) =>
                                        setNewInjuryDetail({
                                          ...newInjuryDetail,
                                          InjurySide: e.target.value,
                                        })
                                      }
                                    >
                                      {injurySideType
                                        ? injurySideType.Result.map(
                                            (injury, index) => (
                                              <MenuItem
                                                key={index}
                                                value={injury.injurysidecode}
                                              >
                                                {injury.injurysidecode} -{" "}
                                                {injury.injurysidename}
                                              </MenuItem>
                                            )
                                          )
                                        : ""}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <FormControl fullWidth>
                                    <Select
                                      className="bg-base-100 w-full m-2"
                                      labelId="policyTypeValue"
                                      id="demo-simple-select"
                                      value={newInjuryDetail.WoundType}
                                      label=""
                                      onChange={(e) =>
                                        setNewInjuryDetail({
                                          ...newInjuryDetail,
                                          WoundType: e.target.value,
                                        })
                                      }
                                    >
                                      {injuryWoundType
                                        ? injuryWoundType.Result.map(
                                            (Wound, index) => (
                                              <MenuItem
                                                key={index}
                                                value={Wound.woundtypecode}
                                              >
                                                {Wound.woundtypecode} -{" "}
                                                {Wound.woundtypename}
                                              </MenuItem>
                                            )
                                          )
                                        : ""}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                {newInjuryDetail.InjuryArea &&
                                newInjuryDetail.InjurySide &&
                                newInjuryDetail.WoundType ? (
                                  <>
                                    <TableCell>
                                      <div
                                        onClick={handleAddInjuryDetail}
                                        className="btn btn-success text-base-100 text-xl"
                                      >
                                        <FaCirclePlus />
                                      </div>
                                    </TableCell>
                                  </>
                                ) : (
                                  ""
                                )}
                              </TableRow>
                            </>
                          ) : (
                            ""
                          )}
                        </TableBody>
                      </Table>
                      <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                        <div className="rounded-md"></div>
                        <div className="rounded-md"></div>
                        <div className="rounded-md "></div>
                        <div className="rounded-md ">&nbsp;</div>
                      </div>
                    </TableContainer>
                  </div>
                </>

            )}

            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">VitalSign</h1>
              <div className="overflow-x-auto">
                <table className="table mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th className="">วันเวลาที่วัดสัญญาณชีพ</th>
                      <th>การเต้นของชีพจร</th>
                      <th>ความเข้มข้นของออกซิเจนในเลือด</th>
                      <th>คะแนนระดับของความเจ็บปวด</th>
                      <th>อัตราการหายใจ</th>
                      <th>ค่าความดันโลหิต</th>
                      <th>อุณหภูมิร่างกาย</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datavitalsign  ? (
                    //  vitalsign.Result.VitalSignInfo.map(
                         datavitalsign.map(
                        (vts, index) =>
                          vts.VitalSignEntryDateTime && (
                            <tr key={index} className=" bg-neutral text-sm">
                              <td>
                                {startIndexvitalsign+ index + 1}
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {vts.VitalSignEntryDateTime}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {vts.HeartRate === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    vts.HeartRate + " bpm"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {vts.OxygenSaturation === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    vts.OxygenSaturation + " %"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {vts.PainScore === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    vts.PainScore
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {vts.RespiratoryRate === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    vts.RespiratoryRate + " bt/min"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {vts.SystolicBp === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    vts.SystolicBp
                                  )}{" "}
                                  /{" "}
                                  {vts.DiastolicBp === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    vts.DiastolicBp
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {vts.Temperature === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    vts.Temperature + " °C"
                                  )}
                                </div>
                              </td>
                            </tr>
                            // )
                      ))
                    ) : (
                     ""
                    )}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">&nbsp;</div>
              </div>

              {vitalsign ? (
            <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
              <div className="flex justify-between text-right">
                <div className="text-right">
                  <h1 className="text-lg">
                    Showing {startIndexvitalsign + 1} to {endIndexvitalsign} of{" "}
                    {vitalsign ? vitalsign.Result.VitalSignInfo.length : ""}{" "}
                    entries.
                  </h1>
                </div>
              </div>
              <div className="text-right text-base-100 ">
                {/* <div className="text-left text-base-100"> */}

                {currentPagevitalsign > 1 && (
                  <div
                    onClick={handlePreviousPagevitalsign}
                    className="btn btn-primary "
                  >
                    <BiFirstPage className="text-base-100 text-xl text-right" />
                  </div>
                )}
                {endIndexvitalsign < currentDatavitalsign.length && (
                  <div
                    onClick={handleNextPagevitalsign}
                    className="btn btn-primary ml-2"
                  >
                    <BiLastPage className="text-base-100 text-xl" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
            </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Doctor</h1>
              <div className="overflow-x-auto">
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th className="">
                        เลขใบประกอบวิชาชีพแพทย์ผู้ให้การรักษา
                      </th>
                      <th>ชื่อ - นามสกุล แพทย์ผู้ให้การรักษา</th>
                      <th>สถานะของแพทย์ผู้ให้การรักษา</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctor ? (
                      doctor.Result.DoctorInfo.map(
                        (dc, index) =>
                          dc.DoctorLicense  && (
                            <tr key={index} className=" bg-neutral text-sm">
                              <td>{dc.DoctorLicense ? index + 1 : ""}</td>
                              <td>
                                {" "}
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {dc.DoctorLicense}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {dc.DoctorFirstName}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {" "}
                                  {dc.DoctorRole}
                                </div>
                              </td>
                            </tr>
                          )
                      )
                    ) : ""}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">&nbsp;</div>
              </div>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Diagnosis
                    </h1>
              <div className="overflow-x-auto">
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th>รหัส</th>
                      <th className="">ชื่อของการวินิจฉัยโรค</th>
                      <th>ชนิดของการวินิจฉัยโรค</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnosis ? (
                      diagnosis.Result.DiagnosisInfo.map(
                        (dns, index) =>
                          dns.DxCode  && (
                            <tr key={index} className=" bg-neutral text-sm">
                              <td>{dns.DxCode ? index + 1 : ""}</td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {dns.DxCode}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {dns.DxName}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {dns.Dxtypenameinsurance}
                                </div>
                              </td>
                            </tr>
                          )
                      )
                    ) : ""}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">&nbsp;</div>
              </div>
            </div>
             {/* //////////////////////////////////////////////////////////////////////////// */}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
                  <h1 className="font-black text-accent text-3xl ">
                    Procedure
                    <div
                      className="btn btn-secondary text-base-100 text-xl ml-2"
                      onClick={SummitEditProce}
                    >
                      <FaEdit />
                    </div>
                  </h1>
                  <div className="grid gap-4 sm:grid-cols-4 w-full mt-4">
                  <FormControl className="w-full">
                <InputLabel id="demo-simple-select-label">
                Anesthesia
                </InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={anesthesiaListValue}
                label="Anesthesia"
                onChange={AnesthesiaList}
                >
                  <MenuItem key="" value=""></MenuItem>
                {anesthesiaListCode
                ? anesthesiaListCode.Result.map((code, index) => (
                    <MenuItem key={index} value={code.aneslistcode}>
                      {code.aneslistname}
                    </MenuItem>
                  ))
                :    <MenuItem>
                Loading...
                </MenuItem>
                }
                </Select>
                </FormControl>
                  </div>
                  <TableContainer component={Paper} className="mt-2">
                    <Table className="table">
                      <TableHead>
                        <TableRow className="bg-primary">
                          <TableCell className="w-2"></TableCell>
                          <TableCell>
                            <h1 className="text-base-100  text-sm w-1/5 text-center">
                              Icd9 - ชื่อของหัตถการหรือการผ่าตัด
                            </h1>
                          </TableCell>
                          <TableCell>
                            <h1 className="text-base-100  text-sm w-1/5 text-center">
                              วันที่ทำหัตถการหรือทำการผ่าตัด
                            </h1>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {console.log(rowsPro)} */}
                        {rowsPro
                          ? rowsPro.map(
                              (proce, index) =>
                                proce  && (
                                  <TableRow
                                    key={index}
                                    className=" bg-neutral text-sm"
                                  >
                                    <TableCell>{proce.Icd9 ? index + 1 : ""}</TableCell>
                                    <TableCell>
  
                                      <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                        {proce.Icd9 === "" ? (
                                          <>&nbsp;</>
                                        ) : 
                                        <>
                                          {proce.Icd9} - {proce.ProcedureName}
                                        </>
                                        }
                                      </div> 
                                    </TableCell>
                                    <TableCell>
                                      <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                        {
                                        proce.ProcedureDate === "" ? (
                                          <>&nbsp;</>
                                        ) : (
                                          proce.ProcedureDate
                                        )
                                        }
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {summitEditProcedure === "true" ? (
                                        <div
                                          onClick={() => handleDeleteRowPro(index)}
                                          className="btn btn-error text-base-100 text-xl"
                                        >
                                          <FaCircleMinus />
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </TableCell>
                                  </TableRow>
                                )
                            )
                          : ""}
                        {summitEditProcedure === "true" ? (
                          <>
                            <TableRow>
                              <TableCell>
                                <FaCirclePlus className="text-xl" />
                              </TableCell>

                              <TableCell>
             <Autocomplete
                options={optionsPro}
                loading={isLoadingPro}
                onInputChange={ICD9CodeValuePro}
                onChange={handleChangeICD9}
                getOptionLabel={(option) => option.label || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="พิมพ์เพื่อค้นหา..."
                    variant="outlined"
                  />
                )}
                noOptionsText="ไม่มีผลลัพธ์ที่ค้นหา"
               />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  className="bg-base-100 w-full"
                                  type="date"
                                  value={procedureDate}
                                  onChange={(e) =>
                                    setProcedureDate(e.target.value)
                                  }
                                  placeholder="ProcedureDate"
                                  //  required
                                />
                              </TableCell>
                              {selectedOptionPro &&
                              procedureDate ? (
                                <>
                                  <TableCell>
                                    <div
                                      onClick={handleAddRowPro}
                                      className="btn btn-success text-base-100 text-xl"
                                    >
                                      <FaCirclePlus />
                                    </div>
                                  </TableCell>
                                </>
                              ) : (
                                ""
                              )}
                            </TableRow>
                          </>
                        ) : (
                          ""
                        )}
                      </TableBody>
                    </Table>
                    <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                      <div className="rounded-md"></div>
                      <div className="rounded-md"></div>
                      <div className="rounded-md "></div>
                      <div className="rounded-md ">&nbsp;</div>
                    </div>
                  </TableContainer>
                </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">
                Investigation
              </h1>
              <div className="overflow-x-auto">
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th>รหัสอ้างอิง</th>
                      <th>ชื่อกลุ่มของการตรวจทางห้องปฏิบัติการ</th>
                      <th>ชื่อของการตรวจทางห้องปฏิบัติการ</th>
                      <th>ผลของการตรวจทางห้องปฏิบัติการ</th>
                      <th>วันเวลาที่แสดงผลของการตรวจทางห้องปฏิบัติการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datainvestigation ? (
                      datainvestigation.map(
                        (inv, index) =>
                          (inv.InvestigationCode) && (
                            <tr key={index} className=" bg-neutral text-sm">
                              <td>
                              {startIndexvitalsign+ index + 1}
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {inv.InvestigationCode === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    inv.InvestigationCode
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {inv.InvestigationGroup === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    inv.InvestigationGroup
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {inv.InvestigationName === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    inv.InvestigationName
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {inv.InvestigationResult === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    inv.InvestigationResult
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                  {inv.ResultDateTime === "" ? (
                                    <>&nbsp;</>
                                  ) : (
                                    inv.ResultDateTime
                                  )}
                                </div>
                              </td>
                            </tr>
                                       )
                                    )
                                  ) : (
                                   ""
                                  )}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">&nbsp;</div>
              </div>
              {investigation ? (
            <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
              <div className="flex justify-between text-right">
                <div className="text-right">
                  <h1 className="text-lg">
                    Showing {startIndexinvestigation + 1} to {endIndexinvestigation} of{" "}
                    {investigation ? investigation.Result.InvestigationInfo.length : ""}{" "}
                    entries.
                  </h1>
                </div>
              </div>
              <div className="text-right text-base-100 ">
                {/* <div className="text-left text-base-100"> */}

                {currentPageinvestigation > 1 && (
                  <div
                    onClick={handlePreviousPageinvestigation}
                    className="btn btn-primary "
                  >
                    <BiFirstPage className="text-base-100 text-xl text-right" />
                  </div>
                )}
                {endIndexinvestigation < currentDatainvestigation.length && (
                  <div
                    onClick={handleNextPageinvestigation}
                    className="btn btn-primary ml-2"
                  >
                    <BiLastPage className="text-base-100 text-xl" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
            </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">OrderItem</h1>
              <div className="overflow-x-auto">
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th>รหัสของรายการ</th>
                      <th>ItemName</th>
                      <th>Code ของรายการ</th>
                      <th>LocalBillingName</th>
                      <th>จำนวนปริมาณของรายการ</th>
                      <th>จำนวนเงินตั้งต้นของรายการ</th>
                      <th>จำนวนส่วนลดของรายการ</th>
                      <th>จำนวนเงินหลังหักส่วนลดของรายการ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    
                    {dataorderItemz ? (
                      dataorderItemz.map(
                        (order, index) => 
                          order.ItemId && (
                        <tr key={index} className=" bg-neutral text-sm">
                          <td className="px-6 py-4 whitespace-nowrap">
                          {startIndexorderItemz+ index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.ItemId ? order.ItemId : <>&nbsp;</>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.ItemName ? order.ItemName : <>&nbsp;</>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.LocalBillingCode ? (
                                order.LocalBillingCode
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.LocalBillingName ? (
                                order.LocalBillingName
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.ItemAmount ? (
                                order.ItemAmount
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.Initial ? order.Initial : <>&nbsp;</>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.Discount ? order.Discount : <>&nbsp;</>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {order.NetAmount ? order.NetAmount : <>&nbsp;</>}
                            </div>
                          </td>
                        </tr>
                                                       
                                    // )
                                    )
                                  )) : (
                                   ""
                                  )}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">&nbsp;</div>
              </div>
              {orderItemz ? (
            <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
              <div className="flex justify-between text-right">
                <div className="text-right">
                  <h1 className="text-lg">
                    Showing {startIndexorderItemz + 1} to {endIndexorderItemz} of{" "}
                    {orderItemz ? orderItemz.Result.OrderItemInfo.length : ""}{" "}
                    entries.
                  </h1>
                </div>
              </div>
              <div className="text-right text-base-100 ">
                {/* <div className="text-left text-base-100"> */}

                {currentPageorderItemz > 1 && (
                  <div
                    onClick={handlePreviousPageorderItemz}
                    className="btn btn-primary "
                  >
                    <BiFirstPage className="text-base-100 text-xl text-right" />
                  </div>
                )}
                {endIndexorderItemz < currentDataorderItemz.length && (
                  <div
                    onClick={handleNextPageorderItemz}
                    className="btn btn-primary ml-2"
                  >
                    <BiLastPage className="text-base-100 text-xl" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
            </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">
                Billing
              </h1>
              <div className="overflow-x-auto">
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th>SIMB</th>
                      <th>รายละเอียดค่ารักษาพยาบาล</th>
                      <th>จำนวนเงิน (ก่อนหักส่วนลด)</th>
                      <th>ส่วนลด</th>
                      <th>จำนวนเงิน (หลังหักส่วนลด)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {billing ? (
                      billing.Result.BillingInfo.map((bill, index) => (
                        (bill.SimbBillingCode) && (
                        <tr key={index} className=" bg-neutral text-sm">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {bill.SimbBillingCode ? index + 1 : ""}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.SimbBillingCode ? (
                                bill.SimbBillingCode
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.LocalBillingName ? (
                                bill.LocalBillingName
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.BillingInitial ? (
                                bill.BillingInitial
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.BillingDiscount ? (
                                bill.BillingDiscount
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.BillingNetAmount ? (
                                bill.BillingNetAmount
                              ) : (
                                <>&nbsp;</>
                              )}
                            </div>
                          </td>
                        </tr>
                      )))
                    ) : "" }
                  </tbody>
                </table>
              </div>
              <div className="grid gap-2 sm:grid-cols-6  bg-primary w-full whitespace-normal text-center text-lg">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md px-3 py-2 border-2 bg-base-100 break-all m-1">สรุปค่ารักษาพยาบาล</div>
                <div className="rounded-md px-3 py-2 border-2 bg-base-100 break-all m-1">
                  { billingTotalBillAmount ? billingTotalBillAmount : "" } 
                </div>
              </div>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
                                    {/* //////////////////////////////////////////////////////////////////////////// */}
                                    <div className="container mx-auto justify-center border-solid w-full m-auto border-2 border-warning rounded-lg p-4 mt-2">
                  <h1 className="font-black text-accent text-3xl ">
                  Note
                    <div
                      className="btn btn-secondary text-base-100 text-xl ml-2"
                      onClick={SummitEditCon}
                    >
                      <FaEdit />
                    </div>
                  </h1>

                  <TableContainer component={Paper} className="mt-2">
                    <Table className="table">
                      <TableHead>
                        <TableRow className="bg-primary">
                          <TableCell className="w-1/12"></TableCell>
                          <TableCell className="w-3/12">
                            <h1 className="text-base-100  text-sm">
                            วันเวลา
                            </h1>
                          </TableCell>
                          <TableCell className="w-7/12">
                            <h1 className="text-base-100  text-sm">
                            รายละเอียด
                            </h1>
                          </TableCell>
                          <TableCell className="w-1/12"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows2
                          ? rows2.map(
                              (con, index) =>
                                  <TableRow
                                    key={index}
                                    className=" bg-neutral text-sm"
                                  >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DemoItem>
                       {summitEditConcurrentNote === "true" ? 
                        <DateTimePicker
                        className="bg-base-100 w-full" 
                        format="YYYY-MM-DD HH:MM"
                        value={con.ConcurrentDatetime ? dayjs(con.ConcurrentDatetime) : ""}
                        // value=""
                        onChange={(e) => 
                        handleChangeEditDateRow2(index, e)
                        }    
                        placeholder="ConcurrentDatetime"
                        />


                                    : 
                        <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                      {con.ConcurrentDatetime ? (
                                          dayjs(con.ConcurrentDatetime.$d).format("YYYY-MM-DD")
                                      ) : (
                                        <>&nbsp;</>
                                      )}
                                    </div>
                                }


                                  </DemoItem> 
                                   </LocalizationProvider>
                                    </TableCell>
                                    <TableCell>
                                    {summitEditConcurrentNote === "true" ? 
                                       <TextField
                                  className="bg-base-100 w-full"
                                  value={con.ConcurrentDetail}
                                  onChange={(e) =>
                                    handleChangeEditDetailRow2(index, e)
                                  }
                             
                                  inputProps={{ maxLength: 200 }}
                                  multiline
                                  rows={4}
                                  placeholder="ConcurrentDetail"
                                />

: 
<div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
              {con.ConcurrentDetail ? (
                con.ConcurrentDetail
              ) : (
                <>&nbsp;</>
              )}
            </div>
                                }
                                    </TableCell>
                                    <TableCell>
                                      {summitEditConcurrentNote === "true" ? (
                                        <div
                                          onClick={() => handleDeleteRow2(index)}
                                          className="btn btn-error text-base-100 text-xl"
                                        >
                                          <FaCircleMinus />
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </TableCell>
                                  </TableRow>
                               
                            )
                          : ""}
                
                        {summitEditConcurrentNote === "true" ? (
                          <>
                            <TableRow>
                              <TableCell>
                                <FaCirclePlus className="text-xl " />
                              </TableCell>

                              <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                              <DateTimePicker
                                  className="bg-base-100 w-full"
                                 value={newRow2.ConcurrentDatetime ? dayjs(newRow2.ConcurrentDatetime) : ""}
                                 onChange ={handleDateChange}
                                  placeholder="ConcurrentDatetime"
                                  format="YYYY-MM-DD HH:MM"
                                  //  required
                                />
                                </DemoItem>
                                  </LocalizationProvider>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  className="bg-base-100 w-full"
                                  value={newRow2.ConcurrentDetail}
                                  onChange={(e) =>
                                    setNewRow2({
                                      ...newRow2,
                                      ConcurrentDetail: e.target.value,
                                    })
                                  }
                                  inputProps={{ maxLength: 200 }}
                                  multiline
                                  rows={4}
                                  placeholder="ConcurrentDetail"
                                  //   required
                                />
                              </TableCell>
                              {
                              newRow2.ConcurrentDatetime &&
                              newRow2.ConcurrentDetail ? (
                                <>
                                  <TableCell>
                                    <div
                                      onClick={handleAddRow2}
                                      className="btn btn-success text-base-100 text-xl"
                                    >
                                      <FaCirclePlus />
                                    </div>
                                  </TableCell>
                                </>
                              ) : (
                                ""
                              )}
                            </TableRow>
                          </>
                        ) : (
                          ""
                        )}
                      </TableBody>
                    </Table>
                    <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                      <div className="rounded-md"></div>
                      <div className="rounded-md"></div>
                      <div className="rounded-md "></div>
                      <div className="rounded-md ">&nbsp;</div>
                    </div>
                  </TableContainer>
                </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Upload File</h1>
              <div className="overflow-x-auto mt-6">
                <div className="flex items-center ">
                  <input
                    type="file"
                    accept=".pdf"
                    className="file-input file-input-bordered file-input-info w-5/6"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    ref={inputRef}
                  />
                  <div
                    className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 w-1/6 ml-2"
                    onClick={handleUpload}
                  >
                    {/* <FaCloudUploadAlt className="size-6" /> */} Upload File
                  </div>
                </div>
                <div className="label">
                  <span className="label-text-alt text-error text-sm">
                    ** Upload เฉพาะไฟล์ .PDF เท่านั้น สามารถส่งได้มากกว่า 1
                    ไฟล์( แต่ละไฟล์ไม่เกิน 20 MB )**
                  </span>
                </div>
                {progress.started && (
                  <progress
                    max="100"
                    value={progress.pc}
                    className="progress progress-info mt-2 w-full"
                  ></progress>
                )}
                <br />
                <h1 className="text-center">{msg}</h1>
                {showDocError === "Error" ? (
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
                    <span>{massDocError}</span>
                  </div>
                ) : (
                  ""
                )}
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th className="w-2/5">ชื่อไฟล์</th>
                      <th className="w-1/5"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fileList ? (
                      fileList.map((list, index) => (
                        <tr key={index} className=" bg-neutral text-sm">
                          <td className="px-6 py-4 whitespace-nowrap">
                          {list.filename}
                          <br/>{list.originalname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          
                              <div
                                className="btn btn-primary  mr-2 text-base-100 hover:text-primary hover:bg-base-100"
                                type="submit"
                                onClick={() => DocumentBase64(list.filename)}
                              >
                                Document
                              </div>
                           
                            
                              <div className="btn btn-error text-base-100 hover:text-error hover:bg-base-100" type="submit"
                              onClick={() => CancleDoc(list.filename)}
                              >
                              Cancel
                              </div>
                        
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                  <div className="rounded-md"></div>
                  <div className="rounded-md"></div>
                  <div className="rounded-md "></div>
                  <div className="rounded-md ">&nbsp;</div>
                </div>
                  <div className="py-2">
                    <div className="text-center">
                      <button
                        className="btn btn-error text-base-100 hover:bg-base-100 hover:text-error w-64 text-4xl"
                        type="submit"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="pt-6 ">
          <div className="justify-center border-solid w-1/5 m-auto p-8 ">
            <center>
              <CircularProgress size="30px" className="text-error text-lg" />
            </center>
            <div className="justify-center text-4xl">Loading....</div>
          </div>
        </div>
      )}


<dialog id="ConfrimFinal" className="modal text-xl	">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {showSummitError === "Error" ? (
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
                <span>{massSummitError}</span>
              </div>
            ) : (
              <>
                {massSummit ? (
                  massSummit
                ) : (
                  <center>
                    <h1 className="text-4xl text-error">
                      ยืนยันที่จะกด FinalDischarge ใช่หรือไม่...
                    </h1>
                    <div className="btn btn-success text-base-100 text-xl ml-2 w-64 mt-2"onClick={ConfrimFinalDischarge}>
                        ยืนยันการกด
                      </div>
                      <div className="btn btn-error text-base-100 text-xl ml-2 w-64 mt-2" onClick={CancleFinalDischarge}>
                        ยกเลิกการกด
                      </div>
                  </center>
                )}
              </>
            )}
          </form>
        </div>
      </dialog>


      <dialog id="my_modal_3" className="modal text-xl	">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            {showSummitError === "Error" ? (
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
                <span>{massSummitError}</span>
              </div>
            ) : (
              <>
                {massSummit ? (
                  massSummit
                ) : (
                  <center>
                    <h1 className="text-4xl text-error">
                      ทางบริษัทประกัน กำลังตรวจสอบ...
                    </h1>
                    <CircularProgress size="30px" className="text-error text-lg" />
                  </center>
                )}
              </>
            )}
          </form>
        </div>
      </dialog>

      {showModal ? (
        <>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-4xl font-bold mb-4 text-primary">
              ลงทะเบียนใช้สิทธิ์สำเร็จ
              </h2>

            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
