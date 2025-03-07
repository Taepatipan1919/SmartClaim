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
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { save } from "../../../store/counterSlice";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AiOutlineDelete } from "react-icons/ai";
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
//  console.log(data)
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
  const dispatch = useDispatch();
  const InsuranceCode = 13;
  const [dataListPackage, setDataListPackage] = useState("");
  const [listPackageBundle, setListPackageBundle] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [massError, setMassError] = useState("");
  const [mass, setMass] = useState();
  const [reload, setReload] = useState(false);
  const [patientInfoByPID, setPatientInfoByPID] = useState();
  const [visit, setVisit] = useState();
  const [combinedString, setCombinedString] = useState();
  const [accidentDetail, setAccidentDetail] = useState();
  const [accidentPlaceValue, setAccidentPlaceValue] = useState("");
  const [dataaccidentPlace, setDataaccidentPlace] = useState("");
  const [datainjurySide, setDatainjurySide] = useState("");
  const [injurySide, setInjurySide] = useState("");
  const [DataWoundType, setDataWoundType] = useState("");
  const [illnessType, setIllnessType] = useState();
  const [woundType, setWoundType] = useState("");
  const [accidentDate, setAccidentDate] = useState(null);
  const [injuryWoundType, setInjuryWoundType] = useState();
  
  const [typeBillingList, setTypeBillingList] = useState("");
  const [selectTypeBillingList, setSelectTypeBillingList] = useState("");
  const [typeBilling, setTypeBilling] = useState("");
  const [typeBillingSucc, setTypeBillingSucc] = useState("");
  const [expectedDayOfRecovery, setExpectedDayOfRecovery] = useState("");
  const [injurySideType, setInjurySideType] = useState();
  const [billing, setBilling] = useState();
  const [dataToAIA, setDataToAIA] = useState("");
  

  const [billingz, setBillingz] = useState("");
  const [currentDatabillingz, setCurrentDatabillingz] = useState("");
  const [currentPagebillingz, setCurrentPagebillingz] = useState(1);
  const [countbillingz, setCountbillingz] = useState(0);



  const [orderItemz, setOrderItemz] = useState("");
  const [currentDataorderItemz, setCurrentDataorderItemz] = useState("");
  const [currentPageorderItemz, setCurrentPageorderItemz] = useState(1);
  const [countorderItemz, setCountorderItemz] = useState(0);

  const [datadscDateTimevalue, setDatadscDateTimevalue] = useState(null);
  const [dataexpectedAdmitDatevalue, setDataexpectedAdmitDatevalue] = useState(null);
  const [numberBilling, setNumberBilling] = useState(false);
  const [listClaimForm, setListClaimForm] = useState();
  const [textPresentIllness, setTextPresentIllness] = useState(''); 
  const [charCountPresentIllness, setCharCountPresentIllness] = useState(0);
  const handleTextChangePresentIllness = (event) => { 
    const valuePresentIllness = event.target.value; 
    setTextPresentIllness(valuePresentIllness);
    setCharCountPresentIllness(valuePresentIllness.length);
  };

  const [texthandleTextChiefComplaint, setTexthandleTextChiefComplaint] = useState(''); 
  const handleTextChiefComplaint = (event) => { 
    setTexthandleTextChiefComplaint(event.target.value);
  };

  const [texthandleTextPhysicalExam, setTexthandleTextPhysicalExam] = useState(''); 
  const handleTextPhysicalExam = (event) => { 
    setTexthandleTextPhysicalExam(event.target.value);
  };

  const [texthandleTextDxFreeText, setTexthandleTextDxFreeText] = useState(''); 
  const handleTextDxFreeText = (event) => { 
    setTexthandleTextDxFreeText(event.target.value);
  };
  
  const [summitEditBill, setSummitEditBill] = useState("false");
  const [itemBillingDetails, setItemBillingDetails] = useState("");
  const [listBilling, setListBilling] = useState();
  const [totalEstimatedCostx, setTotalEstimatedCostx] = useState(null);
  const [totalEstimatedCost, setTotalEstimatedCost] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalApprovedAmount, setTotalApprovedAmount  ] = useState("");
  const [totalExcessAmount, setTotalExcessAmount ] = useState("");
  const [totalSum, setTotalSum] = useState("");

  const [selectTypeBillingValue, setSelectTypeBillingValue] = useState("");

  const [showModalPro, setShowModalPro] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showArrowVN, setShowArrowVN] = useState();
  
  const [anesthesiaListValue, setAnesthesiaListValue] = useState("");
  const [anesthesiaListCode, setAnesthesiaListCode] = useState();

  
  const [admissionValue, setAdmissionValue] = useState("");
  const [indicationForAdmissionCode, setIndicationForAdmissionCode] = useState("");
  
  const [showArrow, setShowArrow] = useState(false);
  const router = useRouter();
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
  const [expectedAdmitDate, setExpectedAdmitDate] = useState(null);
  const [dscDateTime, setDscDateTime] = useState(null);
  const [otherInsurer, setOtherInsurer] = useState("false");
  const [claimStatusCodeProcessing, setClaimStatusCodeProcessing] = useState(false);
  const [claimStatusCodeProcessingValue, setClaimStatusCodeProcessingValue] = useState("");
  const [claimStatusCodeProcessingValueClaimNo, setClaimStatusCodeProcessingValueClaimNo] = useState("");
  const [claimStatusCodeProcessingValueOccurrenceNo, setClaimStatusCodeProcessingValueOccurrenceNo] = useState("");

  const [procedure, setProcedure] = useState("");
  const [causeOfInjuryDetails, setCauseOfInjuryDetails] = useState("");
  const [injuryDetails, setInjuryDetails] = useState("");

  const [randomNumber, setRandomNumber] = useState('');

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rowsDia, setRowsDia] = useState([]);
  const [newRowDia, setNewRowDia] = useState({
    ICDD10: "",
    ICDDxCode: "",
    ICDDxId: "",
    label: "",
  });

  const [optionsPro, setOptionsPro] = useState([]);
  const [isLoadingPro, setIsLoadingPro] = useState(false);
  const [selectedOptionPro, setSelectedOptionPro] = useState(null);
  const [rowsPro, setRowsPro] = useState([]);
  const [procedureDate, setProcedureDate] = useState("");

  const [rows2, setRows2] = useState([]);
  const [newRow2, setNewRow2] = useState({
    PreAuthDateTime: dayjs(),
    PreAuthDetail: "",
  });



  const [optionsBill, setOptionsBill] = useState([]);
  const [isLoadingBill, setIsLoadingBill] = useState(false);
  const [selectedOptionBill, setSelectedOptionBill] = useState(null);






  const [newCauseOfInjuryDetail, setNewCauseOfInjuryDetail] = useState({
    CauseOfInjury: "",
    CommentOfInjury: "",
  });
  const [newInjuryDetail, setNewInjuryDetail] = useState({
    InjuryArea: "",
    InjurySide: "",
    WoundType: "",
  });
  // const [previewPreBilling, setPreviewPreBilling] = useState();
  const [doctor, setDoctor] = useState();
  const [summitEditPreAuthNote, setSummitEditPreAuthNote] = useState("false");
  const [summitEditDia, setSummitEditDia] = useState("false");
  const [summitEditProcedure, setSummitEditProcedure] = useState("false");
  const [summitEditAcc, setSummitEditAcc] = useState("false");
  const [comaScore, setComaScore] = useState("");
  const [signSymptomsDate, setSignSymptomsDate] = useState(null);

  const [isPackage, setIsPackage] = useState(false);
  const [privateCase, setPrivateCase] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [alcoholRelated, setAlcoholRelated] = useState(false);
  const [previousTreatment, setPreviousTreatment] = useState(false);

  const [previousTreatmentDetail, setPreviousTreatmentDetail] = useState("");
  const [previousTreatmentDate, setPreviousTreatmentDate] = useState(null);

  // console.log(previousTreatmentDetail.target.value)
  // const [editProcedure, setEditProcedure] = useState("false");


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
      AccidentInjurySideCode: "",
      AccidentInjuryWoundtypeCode: "",
        PolicyTypeCode: data.DataTran.Data.PolicyTypeCode,
        ServiceSettingCode: data.DataTran.Data.ServiceSettingCode,
        IllnessTypeCode: data.DataTran.Data.IllnessTypeCode,
        SurgeryTypeCode: data.DataTran.Data.SurgeryTypeCode,
        PreauthReferClaimNo: data.DataTran.Data.PreauthReferClaimNo,
        PreauthReferOcc: data.DataTran.Data.PreauthReferOcc,   
        ReferenceVN : data.DataTran.Data.ReferenceVN,
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
    setFileList()
    const newRandomNumber = generateRandomFiveDigitNumber();
    setRandomNumber(newRandomNumber);
    // console.log(newRandomNumber);


  });
  useEffectOnce(() => {

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_getPreAuthNote,
      //  Data
      PatientInfoData
      )
      .then((response) => {
        //  console.log(response.data)
        if (response.data.HTTPStatus.statusCode === 200) { 
          const results = response.data.Result.ConcurNoteList.map(result => ({ 
              PreAuthDateTime: dayjs(result.PreAuthDateTime),
               PreAuthDetail: result.PreAuthDetail,
               })); 
               if(response.data.Result.ConcurNoteList[0].PreAuthDetail !== ""){
                setRows2(results);
               }
               
          // const results = response.data.Result.ConcurNoteList.map(result => (
          //   {
          //      ...result,
          //       PreAuthDateTime:  dayjs(result.PreAuthDateTime), 
          //       PreAuthDetail: result.PreAuthDetail,
          //   })); 
          //   setRows2(results); 
          } else {
             throw new Error('Unexpected response status'); 
            }



        // if (response.data.HTTPStatus.statusCode === 200) { 
        //   const result = response.data.Result.ConcurNoteList; 
        //   setRows2(results.map(result => ({ ...result, PreAuthDateTime: dayjs(result.PreAuthDateTime),PreAuthDetail: result.PreAuthDetail, })));
    
        // }
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
        process.env.NEXT_PUBLIC_URL_PD +
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
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_getPreAuthDiagnosis,
      //  Data
      PatientInfoData
      )
      .then((response) => {
          // console.log(response.data)
          if (response.data.Result.DiagnosisInfo[0].DxCode) {
        const formattedOptions = response.data.Result.DiagnosisInfo.map((item) => item.DxCode && ({
          DxCode: item.DxCode,
          DxName: item.DxName,
           label: item.DxCode + ' - ' + item.DxName, // กำหนดค่า label ที่ต้องการ
        }));
        setRowsDia(formattedOptions);
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
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_getPreAuthDoctor,
      //  Data
      PatientInfoData
      )
      .then((response) => {
         console.log(response.data)
        if (response.data.Result.DoctorInfo[0].DoctorLicense) {
        setDoctor(response.data);
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
  .get(
     '/api/v1/utils/typebilling/'+PatientInfoData.PatientInfo.InsurerCode
    // process.env.NEXT_PUBLIC_URL_PD +
    //   process.env.NEXT_PUBLIC_URL_getretrievepreauthlist,
    //   {
    //     PatientInfo
    //   }
  )
  .then((response) => {
    //  console.log(response.data)
    setSelectTypeBillingList(response.data)
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
  })
});
  useEffectOnce(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setProgress({ started: false, pc: 0 });
    setMsg(null);
    setFileList("");
    const PatientInfox = {
      "PatientInfo":{
        RefId: PatientInfoData.PatientInfo.RefId,
        TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
        HN: PatientInfoData.PatientInfo.HN,
        VN: PatientInfoData.PatientInfo.VN,
        DocumenttypeCode : "009",
        Runnindocument : "00",
      }
    }
     console.log(PatientInfox)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_getlistDocumentName,
        
          PatientInfox
        
      )
      .then((response) => {
        setFileList(response.data);
        console.log(response.data)
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
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_IllnessType +
          InsuranceCode
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
          setMassError(error);
          setShowFormError("Error");
        }
      });
  }, []);
  useEffectOnce(() => {
    const PatientInfo = {
      InsurerCode: InsuranceCode,
      IdType: "HOSPITAL_ID",
      PID: "",
      HN: PatientInfoData.PatientInfo.HN,
      PassportNumber: "",
    }
    console.log(PatientInfo)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
        process.env.NEXT_PUBLIC_URL_PatientSearch,
      {
        PatientInfo
      }
    )
      .then((response) => {
        console.log(response.data.Result.PatientInfo[0])
        setPatientInfoByPID(response.data.Result.PatientInfo[0]);
      
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

 

    if(itemBillingDetails === ""){
      setItemBillingDetails("");
      setTotal(0);
    const PatientInfox = {
      "PatientInfo" : {
      RefId: PatientInfoData.PatientInfo.RefId,
      TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
      InsurerCode: InsuranceCode,
      VN: PatientInfoData.PatientInfo.VN,
      HN: PatientInfoData.PatientInfo.HN,
      }
    }
   // console.log(PatientInfox)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
        process.env.NEXT_PUBLIC_URL_previewPreBilling,
      
        PatientInfox
  
    )
      .then((response) => {
        console.log(response.data)
        // setPreviewPreBilling(response.data.Result);
        let combinedArray;
          combinedArray = [...response.data.Result.BillingInfo, ...itemBillingDetails];

          
        
      setItemBillingDetails(combinedArray);
      let sum = 0; 
      combinedArray.forEach((bill) => { 
          sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
        });
       
        const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง
       
        if(formattedSum !== "NaN"){
          // console.log(formattedSum)
          setTotal(formattedSum);
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
    }
});

  useEffectOnce(() => {
//  console.log(PatientInfoData)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getPreAuthVisit,
      //  Data 
      PatientInfoData 
      )
      .then((response) => {

          console.log(response.data.Result.VisitInfo)
        setVisit(response.data);
        setAnesthesiaListValue(response.data.Result.VisitInfo.AnesthesiaList)
        setTotalEstimatedCostx(response.data.Result.VisitInfo.TotalEstimatedCost)
        setTotalEstimatedCost(response.data.Result.VisitInfo.TotalEstimatedCost)
        setTextPresentIllness(response.data.Result.VisitInfo.PresentIllness); 
        setCharCountPresentIllness(response.data.Result.VisitInfo.PresentIllness.length); 
        setExpectedDayOfRecovery(response.data.Result.VisitInfo.ExpectedDayOfRecovery);
        setAdmissionValue(response.data.Result.VisitInfo.IndicationForAdmission);
        setTexthandleTextChiefComplaint(response.data.Result.VisitInfo.ChiefComplaint);
        setTexthandleTextPhysicalExam(response.data.Result.VisitInfo.PhysicalExam);
        setTexthandleTextDxFreeText(response.data.Result.VisitInfo.DxFreeText);
        if(PatientInfoData.PatientInfo.VisitDateTime) { 
          setExpectedAdmitDate(dayjs(PatientInfoData.PatientInfo.VisitDateTime)); 
          setProcedureDate(PatientInfoData.PatientInfo.VisitDateTime.substring(0, PatientInfoData.PatientInfo.VisitDateTime.indexOf(' ')));
        }
        if(response.data.Result.VisitInfo.SignSymptomsDate) { setSignSymptomsDate(dayjs(response.data.Result.VisitInfo.SignSymptomsDate)); }
        if(response.data.Result.VisitInfo.AlcoholRelated === true){ setAlcoholRelated(true) }else{ setAlcoholRelated(false)}
        if(response.data.Result.VisitInfo.IsPackage === true){ setIsPackage(true) }else{ setIsPackage(false)}
        if(response.data.Result.VisitInfo.Pregnant === true){ setPregnant(true) }else{ setPregnant(false)}
        if(response.data.Result.VisitInfo.PrivateCase === true){ setPrivateCase(true) }else{ setPrivateCase(false)}
        if(response.data.Result.VisitInfo.PreviousTreatmentDate !== ""){ 
          setPreviousTreatment(true)
          setPreviousTreatmentDate(dayjs(response.data.Result.VisitInfo.PreviousTreatmentDate)) 
          setPreviousTreatmentDetail(response.data.Result.VisitInfo.PreviousTreatmentDetail)
        }
        

        //const dateValue = dayjs(response.data.Result.VisitInfo.SignSymptomsDate);
        //console.log(response.data.Result.VisitInfo.SignSymptomsDate)
        // setSignSymptomsDate(dateValue);
        setComaScore(response.data.Result.VisitInfo.ComaScore);

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

      if(PatientInfoData.PatientInfo.AccidentDate){
        const dateValue = dayjs(PatientInfoData.PatientInfo.AccidentDate);
        setAccidentDate(dateValue);
      }else{

        //console.log(Data)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD + process.env.NEXT_PUBLIC_URL_getPreAuthAccident,
       // Data
       PatientInfoData
      )
      .then((response) => {
         setAccidentDetail(response.data);
        //  console.log(response.data)
         const dateValue = dayjs(response.data.Result.AccidentDetailInfo.AccidentDate);
         setAccidentDate(dateValue);
         if(response.data.Result.AccidentDetailInfo.CauseOfInjuryDetail[0].CauseOfInjury  !== ""){
          setCauseOfInjuryDetails(response.data.Result.AccidentDetailInfo.CauseOfInjuryDetail);
          setInjuryDetails(response.data.Result.AccidentDetailInfo.InjuryDetail);
          setAccidentPlaceValue(response.data.Result.AccidentDetailInfo.AccidentPlace)

         }


        // if (response.data.Result.AccidentDetailInfo.CauseOfInjuryDetail.CauseOfInjury){
        //   setCauseOfInjuryDetails(response.data.Result.AccidentDetailInfo.CauseOfInjuryDetail[0]);
        // }
        // if (response.data.Result.AccidentDetailInfo.InjuryDetail.InjuryArea){
        //   setInjuryDetails(response.data.Result.AccidentDetailInfo.InjuryDetail[0]);
        // }
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
    }
  });

  useEffectOnce(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_accidentPlace +
          InsuranceCode,
        PatientInfoData
      )
      .then((response) => {
       // console.log(response.data)
        setDataaccidentPlace(response.data);
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
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_InjurySide +
          InsuranceCode,
        PatientInfoData
      )
      .then((response) => {
      //  console.log(response.data)
        setDatainjurySide(response.data);
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
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_InjuryWoundtype +
          InsuranceCode,
        PatientInfoData
      )
      .then((response) => {
    //    console.log(response.data)
        setDataWoundType(response.data);
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
 
  const Editfurtherclaimvn = () => {
    setShowSummitError();
    setShowSummitSucc();
    document.getElementById("Editfurtherclaimvn").showModal();
  };

  const handleChangeEditDateRow2 = (index2, even) => {
    const neweditrow2 = rows2.map((Pre, index) => {
      if (index === index2) {
        return {
          ...Pre,
          PreAuthDateTime: dayjs(even),
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
          PreAuthDetail: even.target.value,
        };
      }
      return Pre;
    });
    setRows2(neweditrow2);
  };

  const handleAddRowPro = () => {
    // console.log(selectedOptionPro)
    // console.log(procedureDate)
    // console.log(rowsPro)
    const Data = {
      ...selectedOptionPro,
      ProcedureDate: procedureDate,
    };
    // console.log(Data)
    setRowsPro([...rowsPro, Data]);
    setProcedureDate(PatientInfoData.PatientInfo.VisitDateTime.substring(0, PatientInfoData.PatientInfo.VisitDateTime.indexOf(' ')));
  };
  const handleAddRow2 = () => {
    setRows2([...rows2, newRow2]);
    setNewRow2({ PreAuthDateTime: dayjs(), PreAuthDetail: "" });
  };
/////////////////////////////////
const handleAddRowDia = () => {
//  console.log(selectedOption);
 // console.log(rowsDia)
  setRowsDia([...rowsDia, selectedOption]);
  setNewRowDia({ 
    ICDD10: "",
    ICDDxCode: "",
    ICDDxId: "",
    label: "",
  });
};
const handleDeleteRowDia = (index) => {
  const newRowsDia = rowsDia.filter((_, i) => i !== index);
  setRowsDia(newRowsDia);
};
  ////////////////////////////////
  const handleDeleteRowPro = (index) => {
    const newRows = rowsPro.filter((_, i) => i !== index);
    setRowsPro(newRows);
  };

  const handleDeleteRow2 = (index) => {
    const newRows2 = rows2.filter((_, i) => i !== index);
    setRows2(newRows2);
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
        process.env.NEXT_PUBLIC_URL_PD +
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
          setMassError(error);
          setShowFormError("Error");
        }
      });
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_InjuryWoundtype +
          PatientInfoData.PatientInfo.InsurerCode
      )
      .then((response) => {
        setInjuryWoundType(response.data);
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



  const SummitEditProce = () => {
    if (summitEditProcedure === "false") {
      setSummitEditProcedure("true");
    } else {
      setSummitEditProcedure("false");
    }
  };
  
  const SummitEditDia = () => {
    if (summitEditDia === "false") {
      setSummitEditDia("true");
    } else {
      setSummitEditDia("false");
    }
  };


  const SummitEditPre = () => {
    if (summitEditPreAuthNote === "false") {
      setSummitEditPreAuthNote("true");
    } else {
      setSummitEditPreAuthNote("false");
    }
  };
  
  const SummitEditAcc = () => {
    
    if (summitEditAcc === "false") {
      setSummitEditAcc("true");
    } else {
      setSummitEditAcc("false");
    }
  };
  const SummitEditBillz = () => {
    if (summitEditBill === "false") {
      setSummitEditBill("true");
    } else {
      setSummitEditBill("false");
    }
  };
  const SummitSelectTypeDelect = () => {
    setItemBillingDetails("");
    setTotal(0);
    const isConfirmed = confirm("ลบ Billing ทั้งหมดนี่ใช่หรือไม่");
    if(isConfirmed){
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_deletePreBillingByRefId,
        PatientInfoData
      )
      
      .then((response) => {
      //   console.log(response.data)
         
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
    }

  
  }
  const SummitSelectType = () => {
    setReload(false)
    setTypeBilling("");
    setTypeBillingList("");
    setBillingz("");
    setCurrentDatabillingz("");
    setShowFormError("");
    setMassError("");

    if(selectTypeBillingValue === "1"){



document.getElementById("TypeBilling").showModal();
    }else if(selectTypeBillingValue === "2"){

      axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_ListPackageBundle
      )
      .then((response) => {
       // console.log(response.data)
        setListPackageBundle(response.data);
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





      document.getElementById("TypeBilling").showModal();
    }else{
     alert("กรุณาเลือก Type Billing");
    }

  };


      const SummitSelectTypeSucc = () => {
// console.log(typeBillingList.Result.PackageBundleList)
// console.log(itemBillingDetails)

const isConfirmed = confirm("เลือก Billing List ทั้งหมดนี่ใช่หรือไม่");
if(isConfirmed){




  let combinedArray;
  if(selectTypeBillingValue === "1"){
    combinedArray = [...typeBillingList.Result.BillingInfo, ...itemBillingDetails];
  }else{
    combinedArray = [...typeBillingList.Result.PackageBundleList, ...itemBillingDetails];
  }
    
  
 
let sum = 0; 
combinedArray.forEach((bill) => { 
    sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
  });
  const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง

  const PatientInfo = {
    "RefId": PatientInfoData.PatientInfo.RefId,
    "TransactionNo": PatientInfoData.PatientInfo.TransactionNo,
    "InsurerCode": InsuranceCode, 
   "HN": PatientInfoData.PatientInfo.HN,
   "VN": PatientInfoData.PatientInfo.VN,
    "PreBillingInfo": combinedArray,
  }
  console.log(PatientInfo)
  axios
  .post(
    process.env.NEXT_PUBLIC_URL_PD +
      process.env.NEXT_PUBLIC_URL_InsertPreBilling,
      {
        PatientInfo
      }
  )
  .then((response) => {
        console.log(response.data);
     setItemBillingDetails("");

     const PatientInfox = {
      "PatientInfo" : {
      RefId: PatientInfoData.PatientInfo.RefId,
      TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
      InsurerCode: InsuranceCode,
      VN: PatientInfoData.PatientInfo.VN,
      HN: PatientInfoData.PatientInfo.HN,
      }
    }
    console.log(PatientInfox)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
        process.env.NEXT_PUBLIC_URL_previewPreBilling,
      
        PatientInfox
  
    )
      .then((response) => {
        console.log(response.data.Result)
        // setPreviewPreBilling(response.data.Result);
        let combinedArray;

          combinedArray = [...response.data.Result.BillingInfo, ...itemBillingDetails];

          
        
      setItemBillingDetails(combinedArray);
      let sum = 0; 
      combinedArray.forEach((bill) => { 
          sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
        });
        const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง
 
        setTotal(formattedSum);
        document.getElementById("TypeBilling").close();
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
  })






  }
}


const handleChangeListPackage = (event) => {

      if(event.target.value !== ""){
    setTypeBillingSucc(typeBilling)
    setReload(true)
    setShowFormError("");
    setTypeBillingList("");
    setBillingz("");
    setCurrentDatabillingz("");

                    let packagedesc;

          if (event.target.value) {
            const listPackage = listPackageBundle.Result.find(
              (pkg) => pkg.packagecode === event.target.value
            );
            if (listPackage) {
              packagedesc = listPackage.packagedesc;
            }
          }
          
          const PackageInfo =
          {
            "PackageCode": event.target.value,
            "PackageDesc": packagedesc
          }

          axios
          .post(
            process.env.NEXT_PUBLIC_URL_PD +
              process.env.NEXT_PUBLIC_URL_getPackageBundle,
              {
                PackageInfo
              }
          )
          .then((response) => {
            //   console.log(response.data);
            setTypeBillingList(response.data)
            setBillingz(response.data.Result.PackageBundleList)
            setCurrentDatabillingz(response.data.Result.PackageBundleList);
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
          })
        

    }else{
      setTypeBillingSucc("")
      setReload(false)
      setShowFormError("");
      setTypeBillingList("");
      setBillingz("");
      setCurrentDatabillingz("");
    }
    
}

  const handleChangeTypeBilling = (event) => {
    const value = event.target.value;
    setShowFormError("");
    setMassError("");
    setTypeBillingList("");
            setBillingz("");
            setCurrentDatabillingz("");
    if (value.startsWith('I') || value.startsWith('O') || value.startsWith('E')) {
      // ตรวจสอบตัวอักษรตั้งแต่ตัวที่ 2 ถึงตัวที่ 6 ให้อนุญาตเฉพาะตัวเลข
      const part1 = value.slice(1, 7);
      if (/^[0-9]{0,6}$/.test(part1)) {
        // ตรวจสอบว่าตัวอักษรที่ 7 เป็นเครื่องหมายขีดกลาง
        if (value[7] === '-') {
          setTypeBilling(value); 
            setTypeBilling(value); // ตั้งค่าค่าที่ป้อน
         //   console.log(`Value: ${value} ถูกต้อง`);
        } else if (value.length <= 8) {
          setTypeBilling(value); // ตั้งค่าค่าที่ป้อนที่มีความยาวไม่เกิน 7 ตัวอักษร
        } else {
          setTypeBilling(''); // เคลียร์ค่าในกรณีที่ตัวอักษรที่ 7 ไม่ใช่เครื่องหมายขีดกลาง
          setShowFormError("Error")
        setMassError("Value ไม่ถูกต้อง (ตัวอักษรที่ 7 ต้องเป็นเครื่องหมาย - )");
        }
      } else {
        setTypeBilling(''); // เคลียร์ค่าในกรณีที่ตัวอักษรตั้งแต่ตัวที่ 2 ถึงตัวที่ 6 ไม่ใช่ตัวเลข
        setShowFormError("Error")
        setMassError("Value ไม่ถูกต้อง (ตัวอักษรตั้งแต่ตัวที่ 2 ถึงตัวที่ 6 ต้องเป็นตัวเลข)");
      }
    } else {
      setTypeBilling(''); // เคลียร์ค่าในกรณีที่ตัวอักษรแรกไม่ใช่ I, O, หรือ E
      setShowFormError("Error")
      setMassError("Value ไม่ถูกต้อง (ตัวอักษรแรกต้องเป็น I, O, หรือ E)");
    }


  //  console.log(value)
      if(value.length === 10){
        const PatientInfox = {
          "PatientInfo" : {
              "RefId": PatientInfoData.PatientInfo.RefId,
              "TransactionNo": PatientInfoData.PatientInfo.TransactionNo,
              "InsurerCode": InsuranceCode, 
              "HN": PatientInfoData.PatientInfo.HN,
              "VN": value,
          }
        }
       //  console.log(PatientInfox)
          axios
          .post(process.env.NEXT_PUBLIC_URL_PD + process.env.NEXT_PUBLIC_URL_getPreBilling,PatientInfox)
          .then((response) => {
           //   console.log(response.data)
              if(response.data.Result.BillingInfo[0].LocalBillingCode  !== ""){
            setTypeBillingList(response.data)
            setBillingz(response.data.Result.BillingInfo)
            setCurrentDatabillingz(response.data.Result.BillingInfo);
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
          })

        }
  }




  useEffectOnce(() => {


    axios
.get(
  process.env.NEXT_PUBLIC_URL_PD +
    process.env.NEXT_PUBLIC_URL_getListBilling +
     PatientInfoData.PatientInfo.HN
)
.then((response) => {
  // console.log(response.data)
  setListBilling(response.data.Result);
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
          process.env.NEXT_PUBLIC_URL_getListPreVisitClaimAIA,
        PatientInfoData
      )
      .then((response) => {
      //  console.log(response.data)
      setListClaimForm(response.data);
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


  const ITEMS_PER_PAGE = 10;
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

    ////////////////////////// ตัวเลื่อน ตารางซ้าย - ขวา ///////////////////////////////////////////
    const handleNextPagebillingz = () => {
      setCurrentPagebillingz(currentPagebillingz + 1);
    };
  
    const handlePreviousPagebillingz = () => {
      setCurrentPagebillingz(currentPagebillingz - 1);
    };
  
    const startIndexbillingz = (currentPagebillingz - 1) * ITEMS_PER_PAGE;
  
    const endIndexbillingz = startIndexbillingz + ITEMS_PER_PAGE;

    const databillingz = currentDatabillingz.slice(startIndexbillingz, endIndexbillingz);
    useEffectOnce(() => {
      setCountbillingz(databillingz.length);
    }, [databillingz]);
    /////////////////////////////////////////////////////////////////////
  const DocumentBase64 = (data) => {
    setMsg();
    setProgress({ started: false, pc: 0 });
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
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

        //         const base64String = response.data.base64;
        // console.log(base64String)
        //       const linkSource = `data:application/pdf;base64,${base64String}`;
        //         const pdfWindow = window.open();
        //         pdfWindow.document.write(
        //             `<iframe width='100%' height='99%' src='${linkSource}'></iframe>`
        //        );
      })
      .catch((error) => {
      console.log(error);
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
        process.env.NEXT_PUBLIC_URL_PD2 +
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
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_getlistDocumentName,
        {
          "PatientInfo":{
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          DocumenttypeCode : "009",
          }
        }
      )
      .then((response) => {
        setFileList(response.data);
        //console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        try {
          const ErrorMass = error.config.url;
          const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
          setMassDocError(
            error.code + " - " + error.message + " - " + ErrorMass2
          );
          setShowDocError("Error");
        } catch (error) {
          setMassDocError(error);
          setShowDocError("Error");
        }
      });




      })
      .catch((error) => {
        console.log(error);
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

//   const handleChangeBill = (index2, event) => {
//     const selectedType = JSON.parse(event.target.value); 
//   //   setNewItemBillingCheckBalance({ ...newItemBillingCheckBalance, 
//   //     LocalBillingCode: selectedType.LocalBillingCode, 
//   //     LocalBillingName: selectedType.LocalBillingName, 
//   //   }); 

//   const newcauses = itemBillingDetails.map((cause, index) => {
//     if (index === index2) {
//       return {
//         ...cause,
//         LocalBillingCode: selectedType.LocalBillingCode,
//         LocalBillingName: selectedType.LocalBillingName,
//       };
//     }
//     return cause;
//   });
//   setItemBillingDetails(newcauses);
// };




const handleChangeBillA2 = (index2, event) => {
  // console.log(itemBillingDetails)
  const newcauses = itemBillingDetails.map((cause, index) => {

   // console.log(cause.BillingInitial+event.target.value)
    if (index === index2) {
      return {
        ...cause,
        BillingInitial: event.target.value,
      };
    }
    return cause;
  });


  const updatedData = newcauses.map((item) => ({
    ...item,
    BillingNetAmount: item.BillingInitial, // ตั้ง BillingNetAmount ให้เท่ากับ BillingInitial
  }));

  console.log(updatedData)

  setItemBillingDetails(updatedData);





};

//////////////////////////////////
const handleDeleteBillingDetail = (index) => {
    // console.log(index)
  // const newItemBillingCheckBalances = itemBillingDetails.filter(
  //   (_, i) => i !== index
  // );
  const PatientInfo = {
    "RefId": PatientInfoData.PatientInfo.RefId,
    "TransactionNo": PatientInfoData.PatientInfo.TransactionNo,
    "InsurerCode": InsuranceCode,
    "VN": PatientInfoData.PatientInfo.VN,
    "HN": PatientInfoData.PatientInfo.HN,
     "BillingID": index.BillingID,
    } 


  axios
  .post(
    process.env.NEXT_PUBLIC_URL_PD +
      process.env.NEXT_PUBLIC_URL_deletePreBillingById,
      {
        PatientInfo
      }
  )
  .then((response) => {
      //  console.log(response.data);
  axios
  .post(
    process.env.NEXT_PUBLIC_URL_PD2 +
    process.env.NEXT_PUBLIC_URL_previewPreBilling,
  {
    PatientInfo
  }
)
  .then((response) => {
    setItemBillingDetails("");
setTotal(0);
    // setPreviewPreBilling(response.data.Result);
    // console.log(response.data.Result.BillingInfo)
    let combinedArray;

      combinedArray = [...response.data.Result.BillingInfo];

      
    
  setItemBillingDetails(combinedArray);
  let sum = 0; 
  combinedArray.forEach((bill) => { 
      sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
    });
    const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง

    setTotal(formattedSum);
    setSelectedOptionBill(null);
    // setNewItemBillingCheckBalance({ 
    //   LocalBillingCode: "",
    //   LocalBillingName: "",
    //   SimbBillingCode: "",
    //   BillingInitial: "",
    // });
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










};

/////////////////////////////////////////////////////
// const [newItemBillingCheckBalance, setNewItemBillingCheckBalance] = useState({
//   LocalBillingCode: "",
//   LocalBillingName: "",
//   SimbBillingCode: "",
//   BillingInitial: "",
// });

////////////////////////////////////////////////////////
const handleAddItemBillingDetail = () => {
 // console.log(itemBillingDetails)

    if(itemBillingDetails){
      console.log("มี")

      const DataBillnew = {
        "BillingDiscount": "0",
        "BillingID": "",
        "BillingNetAmount": selectedOptionBill.BillingInitial,
        "BillingInitial": selectedOptionBill.BillingInitial,
        "LocalBillingCode": selectedOptionBill.LocalBillingCode,
        "LocalBillingName": selectedOptionBill.LocalBillingName,
        "PayorBillingCode": selectedOptionBill.PayorBillingCode,
        "SimbBillingCode": selectedOptionBill.SimbBillingCode,
      }


    //   // setItemBillingDetails("");
    //   // setTotal(0);
    //   //console.log(DataBillnew)
    //  const DataBillSum = ([
    //   ...updatedData , DataBillnew
    //  ])
    
    //   console.log(DataBillSum)



 
  const PatientInfo = {
    "RefId": PatientInfoData.PatientInfo.RefId,
    "TransactionNo": PatientInfoData.PatientInfo.TransactionNo,
    "InsurerCode": InsuranceCode, 
   "HN": PatientInfoData.PatientInfo.HN,
   "VN": PatientInfoData.PatientInfo.VN,
    "PreBillingInfo": [ DataBillnew ],
  }
    }else{
      console.log("ไม่มี")

      const DataBillnew = {
        "BillingDiscount": "0",
        "BillingID": "",
        "BillingNetAmount": selectedOptionBill.BillingInitial,
        "BillingInitial": selectedOptionBill.BillingInitial,
        "LocalBillingCode": selectedOptionBill.LocalBillingCode,
        "LocalBillingName": selectedOptionBill.LocalBillingName,
        "PayorBillingCode": selectedOptionBill.PayorBillingCode,
        "SimbBillingCode": selectedOptionBill.SimbBillingCode,
      }

 
  const PatientInfo = {
    "RefId": PatientInfoData.PatientInfo.RefId,
    "TransactionNo": PatientInfoData.PatientInfo.TransactionNo,
    "InsurerCode": InsuranceCode, 
   "HN": PatientInfoData.PatientInfo.HN,
   "VN": PatientInfoData.PatientInfo.VN,
    "PreBillingInfo": [ DataBillnew ],
  }



    }

      // const updatedData = itemBillingDetails.map((item) => ({
      //   ...item,
      //   BillingNetAmount: item.BillingInitial, // ตั้ง BillingNetAmount ให้เท่ากับ BillingInitial
      // }));
    
    

  //console.log(PatientInfo)

//   axios
//   .post(
//     process.env.NEXT_PUBLIC_URL_PD +
//       process.env.NEXT_PUBLIC_URL_InsertPreBilling,
//       {
//         PatientInfo
//       }
//   )
//   .then((response) => {
//       // console.log(response.data);

      
//  setItemBillingDetails("");
//  setTotal(0);
//  const PatientInfox = {
//   "PatientInfo" : {
//   RefId: PatientInfoData.PatientInfo.RefId,
//   TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
//   InsurerCode: InsuranceCode,
//   VN: PatientInfoData.PatientInfo.VN,
//   HN: PatientInfoData.PatientInfo.HN,
//   }
// }

// axios
//   .post(
//     process.env.NEXT_PUBLIC_URL_PD2 +
//     process.env.NEXT_PUBLIC_URL_previewPreBilling,
  
//     PatientInfox

// )
//   .then((response) => {
//     setItemBillingDetails("");
//     setTotal(0);
//     // setPreviewPreBilling(response.data.Result);
//     // console.log(response.data.Result.BillingInfo)
//     let combinedArray;

//       combinedArray = [...response.data.Result.BillingInfo];

      
    
//   setItemBillingDetails(combinedArray);
//   let sum = 0; 
//   combinedArray.forEach((bill) => { 
//       sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
//     });
//     const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง

//     setTotal(formattedSum);
//     setSelectedOptionBill(null);
//   //   setNewItemBillingCheckBalance({ 
//   //     LocalBillingCode: "",
//   //     LocalBillingName: "",
//   //     SimbBillingCode: "",
//   //     BillingInitial: "",
//   //   });
//   })
//   .catch((error) => {
//     console.log(error);
//     try {
//       const ErrorMass = error.config.url;
//       const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
//       setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
//       setShowFormError("Error");
//     } catch (error) {
//       setMassError(error);
//       setShowFormError("Error");
//     }
//   });

//   })
//   .catch((error) => {
//     console.log(error);
//     try {
//       const ErrorMass = error.config.url;
//       const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
//       setMassError(error.code + " - " + error.message + " - " + ErrorMass2);
//       setShowFormError("Error");
//     } catch (error) {
//       setMassError(error.response.data.HTTPStatus.message);
//       setShowFormError("Error");
//     }
//   })
};
////////////////////////////////////////////////////////
const SubmitSumBilling = () => {
  //console.log(itemBillingDetails)

if (itemBillingDetails){
  let sum = 0; 
  itemBillingDetails.forEach((bill) => { 
    sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
  });
  const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง
  setTotal(formattedSum);
  
}else{
  console.log("Error")
}


}



////////////////////////////////////////////////////////
  //    //    //  //กดปุ่มส่งเคลม
  async function DataClaim(event) 
{

    event.preventDefault();
    if (dscDateTime === null) { 
      alert("กรุณากรอก DscDateTime");
    }else if(expectedAdmitDate === null){
      alert("กรุณากรอก ExpectedAdmitDate");
    }else if(totalEstimatedCost === null){
      alert("กรุณากรอก TotalEstimatedCost");
    }else if(!fileList){
      alert("กรุณา Upload file");
    }else if((!itemBillingDetails)&&(!total)){
      alert("กรุณากรอก Billing");
    }else {
      
    console.log("Succ");
   const dscDateTimevalue = dayjs(dscDateTime.$d).format("YYYY-MM-DD HH:MM");
      let Datevalue;
    const expectedAdmitDatevalue = dayjs(expectedAdmitDate.$d).format("YYYY-MM-DD");
    setDatadscDateTimevalue(dscDateTimevalue)
    setDataexpectedAdmitDatevalue(expectedAdmitDatevalue)
    // console.log(dscDateTimevalue);
    // console.log(expectedAdmitDatevalue);
    setShowSummitError();
    setMassSummitError();
    setMassSummit();
    document.getElementById("my_modal_3").showModal();
    if (accidentDate){
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
      if(visit.Result.VisitInfo.PreviousTreatmentDetail){
        PreviousDetail =   previousTreatmentDetail;
      }else{
      PreviousDetail = previousTreatmentDetail.target.value 
      }

      Suc = "S";
    } else if (previousTreatment === false) {
      Suc = "S";
      PreviousDate = "";
      PreviousDetail = "";
    } else {
      setMassSummitError(
        "กรุณากรอก ' เคยเข้ารับการรักษาก่อนการรักษาครั้งนี้ ให้ครบ '"
      );
      setShowSummitError("Error");
      Suc = "E";
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

    let causeOfInjuryDetailsCount;
    let HavecauseOfInjuryDetailsCount;

    let TotalEstimatedCostCount;

    let DiagnosisCount;
    let HaveDiagnosisCount;
 
    let injuryDetailsCount;
    let HaveinjuryDetailsCount;

    let ProcedureInfoCount;
    let HaveProcedureCount;

    let BillingCount; 
    let HaveBillingCount;

    let PreAuthNoteCount;
    let HavePreAuthNoteCount;

    // console.log(injuryDetails)
    // console.log(causeOfInjuryDetails)


if(injuryDetails.length > 0){
  const obj = injuryDetails[0];
  if (obj.InjuryArea !== "" || obj.InjurySide !== "" || obj.WoundType !== "") {
    injuryDetailsCount = injuryDetails.length;
    // console.log('Array has values:', injuryDetails);
  }
}
if(causeOfInjuryDetails.length > 0){
  const obj = causeOfInjuryDetails[0];
  if (obj.CauseOfInjury !== "" || obj.CommentOfInjury !== "") {
    causeOfInjuryDetailsCount = causeOfInjuryDetails.length;
    // console.log('Array has values:', causeOfInjuryDetailsCount);
  }
} 
if(rowsPro){
  ProcedureInfoCount = rowsPro.length;
}   
if(rowsDia){
  DiagnosisCount = rowsDia.length;
} 
if(itemBillingDetails){
  BillingCount = itemBillingDetails.length;
}
if(rows2){
  PreAuthNoteCount = rows2.length;
}
if(totalEstimatedCostx){
  TotalEstimatedCostCount = totalEstimatedCost;
}else{
  // console.log(totalEstimatedCost)
  TotalEstimatedCostCount = totalEstimatedCost.target.value;
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
    if (DiagnosisCount >= 1) {
      HaveDiagnosisCount = true;
    } else {
      HaveDiagnosisCount = false;
    }
    if (BillingCount >= 1) {
      HaveBillingCount = true;
    } else {
      HaveBillingCount = false;
    }
    if (PreAuthNoteCount >= 1) {
      HavePreAuthNoteCount = true;
    } else {
      HavePreAuthNoteCount = false;
    }



    //console.log(Suc)
    if (Suc === "S") {
      try {
        await stepOne(); //Accident
         await stepTwo(); //Procedure
         await stepThree(); //PreAuthVisit
          await stepFour(); //Diagnosis
          await stepFive(); //Billing
          await stepSix(); //PreAuthNote
          await stepSeven(); //SubmitPreSubmissionToAIA


      } catch (error) {
        console.log(error);
        setMassSummitError(error);
        setShowSummitError("Error");
      }
    }

    function stepOne() {
console.log("Start Step 1 Accident")
// console.log(accidentPlaceValue)
      if(accidentPlaceValue){

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
      return new Promise((resolve, reject) => {

        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_PRESubmitAccident,
            { PatientInfo }
          )
          .then((response) => {
            console.log("Step 1 Accident Succ");

            resolve("Step 1 completed");
          })
          .catch((error) => {
            console.log(error);
            try {
              const ErrorMass = error.config.url;
              const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
              setMassSummitError(
                error.code + " - " + error.message + " - " + ErrorMass2
              );
              setShowSummitError("Error");
            } catch (error) {
              setMassSummitError(error);
              setShowSummitError("Error");
            }
          });

      });
    }else{
      console.log("ไม่ใช่ Acc")
    }
    }

    function stepTwo() {
      console.log("Start Step 2 Procedure")
      console.log(rowsPro)
      if(rowsPro[0]){
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
              process.env.NEXT_PUBLIC_URL_PRESubmitProcedure,
            { PatientInfo }
          )
          .then((response) => {
            console.log("Step 2 Procedure - Succ");
            resolve("Step 2 completed");
          })
          .catch((error) => {
            console.log(error);
            try {
              const ErrorMass = error.config.url;
              const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
              setMassSummitError(
                error.code + " - " + error.message + " - " + ErrorMass2
              );
              setShowSummitError("Error");
            } catch (error) {
              setMassSummitError(error);
              setShowSummitError("Error");
            }
          });

        // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 2'));
      });
    }else{
      console.log("ไม่ใช่ Pro")
    }
    }

    function stepThree() {
     
      console.log("Start Step 3 PreAuthVisit")
      return new Promise((resolve, reject) => {
        let comaScoreP = "";
        if (comaScore) {
          comaScoreP = comaScore;
        } else {
          comaScoreP = "";
        }

        const PatientInfo = {
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          VisitDateTime: PatientInfoData.PatientInfo.VisitDateTime,

          ChiefComplaint: texthandleTextChiefComplaint,
          PhysicalExam: texthandleTextPhysicalExam,
          DxFreeText: texthandleTextDxFreeText,
          ExpectedDayOfRecovery: expectedDayOfRecovery,
          PresentIllness: textPresentIllness,
          ComaScore: comaScoreP,
          SignSymptomsDate: signDate,
          HaveProcedure: HaveProcedureCount,

          HaveAccidentCauseOfInjuryDetail: HavecauseOfInjuryDetailsCount,
          HaveAccidentInjuryDetail: HaveinjuryDetailsCount,

          AlcoholRelated: alcoholRelated,
          Pregnant: pregnant,
          PrivateCase: privateCase,
          PreauthReferClaimNo: PatientInfoData.PatientInfo.PreauthReferClaimNo,
          PreauthReferOcc: PatientInfoData.PatientInfo.PreauthReferOcc,
          ExpectedAdmitDate:  expectedAdmitDatevalue,
          IsPackage: isPackage,
          PreviousTreatment: previousTreatment,
          PreviousTreatmentDate: PreviousDate,
          PreviousTreatmentDetail: PreviousDetail,
          DscDateTime : dscDateTimevalue,
          AnesthesiaList : anesthesiaListValue,
          TotalEstimatedCost: TotalEstimatedCostCount,
          IndicationForAdmission: admissionValue,
         HaveDiagnosis: HaveDiagnosisCount, 

        
        HavepreBilling: HaveBillingCount,
         HavePreAuthNote: HavePreAuthNoteCount,
   
          
        };
        console.log(PatientInfo);
        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_PRESubmitPreAuthVisit,
            { PatientInfo }
          )
          .then((response) => {
            console.log("Step 3 PreAuthVisit - Succ");
            resolve("Step 3 completed");
          })
          .catch((error) => {
            console.log(error);
            try {
              const ErrorMass = error.config.url;
              const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
              setMassSummitError(
                error.code + " - " + error.message + " - " + ErrorMass2
              );
              setShowSummitError("Error");
            } catch (error) {
              // setMassSummitError(error);
              // setShowSummitError("Error");
            }
          });

        //     // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 3'));
      });

    }
    function stepFour() {
      console.log("Start Step 4 Diagnosis")
      return new Promise((resolve, reject) => {


        const PatientInfo = {
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          HaveDiagnosis: HaveDiagnosisCount, 
          DiagnosisInfo : rowsDia ,          
        };
        console.log(PatientInfo);
        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SubmitDiagnosis,
            { PatientInfo }
          )
          .then((response) => {
            console.log("Step 4 Diagnosis - Succ");
            resolve("Step 4 completed");
          })
          .catch((error) => {
            console.log(error);
            try {
              const ErrorMass = error.config.url;
              const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
              setMassSummitError(
                error.code + " - " + error.message + " - " + ErrorMass2
              );
              setShowSummitError("Error");
            } catch (error) {
              // setMassSummitError(error);
              // setShowSummitError("Error");
            }
          });

        //     // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 3'));
      });
  }
  function stepFive() {
    console.log("Start Step 5 Billing")
    

  let sum = 0; 
  itemBillingDetails.forEach((bill) => { 
    sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
  });
  const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง

  let num = 0;
  const result = itemBillingDetails.reduce((acc, item) => {
    // ตรวจสอบว่า acc.PreBillingInfo เป็น array หรือไม่
    if (!acc.PreBillingInfo) {
      acc.PreBillingInfo = [];
    }
  
    acc.PreBillingInfo.push({
      LocalBillingCode: item.LocalBillingCode,
      LocalBillingName: item.LocalBillingName,
      SimbBillingCode: item.SimbBillingCode,
      PayorBillingCode: item.SimbBillingCode,
      BillingInitial: item.BillingInitial,
      BillingDiscount: "0",
      BillingNetAmount: item.BillingInitial,
      TotalBillAmount : total,
    });
    
    return acc;
  }, {}); // กำหนดค่าเริ่มต้นของ reduce เป็น object เปล่า {}
    return new Promise((resolve, reject) => {  


      const PatientInfo = {
        RefId: PatientInfoData.PatientInfo.RefId,
        TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
        InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
        HN: PatientInfoData.PatientInfo.HN,
        VN: PatientInfoData.PatientInfo.VN,
        HavePreBilling: HaveBillingCount, 
        PreBillingInfo : result.PreBillingInfo,          
      };
       console.log(PatientInfo);
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_SubmitPreBilling,
          { PatientInfo }
        )
        .then((response) => {
          console.log("Step 5 Billing - Succ");
          resolve("Step 5 completed");
        })
        .catch((error) => {
          console.log(error);
          try {
            const ErrorMass = error.config.url;
            const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
            setMassSummitError(
              error.code + " - " + error.message + " - " + ErrorMass2
            );
            setShowSummitError("Error");
          } catch (error) {
            // setMassSummitError(error);
            // setShowSummitError("Error");
          }
        });

      //     // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 3'));
    });
}
    function stepSix() {
      console.log("Start Step 6 PreAuthNote")
      return new Promise((resolve, reject) => {


        const PatientInfo = {
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          HavePreAuthNote: HavePreAuthNoteCount, 
          PreAuthNoteInfo : rows2,          
        };
        console.log(PatientInfo);
        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SubmitPreAuthNote,
            { PatientInfo }
          )
          .then((response) => {
            console.log("Step 6 PreAuthNote - Succ");
            resolve("Step 6 completed");
          })
          .catch((error) => {
            console.log(error);
            try {
              const ErrorMass = error.config.url;
              const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
              setMassSummitError(
                error.code + " - " + error.message + " - " + ErrorMass2
              );
              setShowSummitError("Error");
            } catch (error) {
              // setMassSummitError(error);
              // setShowSummitError("Error");
            }
          });

        //     // ถ้ามีข้อผิดพลาดให้ใช้ reject(new Error('Error in Step 3'));
      });
  }



    function stepSeven() {
      
      console.log("Start Step 7 SubmitPreSubmissionToAIA")
      const [VisitDatex,VisitDateTimex] = PatientInfoData.PatientInfo.VisitDateTime.split(" ");


      return new Promise((resolve, reject) => {
        let comaScoreP = "";
        if (comaScore) {
          comaScoreP = comaScore;
        } else {
          comaScoreP = "";
        }
      

        const PatientInfo = {
          RefId: PatientInfoData.PatientInfo.RefId,
          TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
          InsurerCode: PatientInfoData.PatientInfo.InsurerCode,
          HN: PatientInfoData.PatientInfo.HN,
          VN: PatientInfoData.PatientInfo.VN,
          VisitDate : VisitDatex,
          VisitDateTime: PatientInfoData.PatientInfo.VisitDateTime,
          DxFreeText: texthandleTextDxFreeText,
          PresentIllness: textPresentIllness,
          ChiefComplaint: texthandleTextChiefComplaint,
          AccidentCauseOver45Days: "",
          UnderlyingCondition: "",
          PhysicalExam: texthandleTextPhysicalExam,
          PlanOfTreatment: "",
          ProcedureFreeText: "",
          AdditionalNote: "",
          SignSymptomsDate: signDate,
          ExpectedDayOfRecovery: expectedDayOfRecovery,
          ComaScore: comaScoreP,
          HaveProcedure: HaveProcedureCount,
          HaveAccidentCauseOfInjuryDetail: HavecauseOfInjuryDetailsCount,
          HaveAccidentInjuryDetail: HaveinjuryDetailsCount,
          AlcoholRelated: alcoholRelated,
          Pregnant: pregnant,
          PrivateCase: privateCase,
          AdmitDateTime: "",

          IndicationForAdmission: admissionValue,
          PreauthReferClaimNo: PatientInfoData.PatientInfo.PreauthReferClaimNo,
          PreauthReferOcc: PatientInfoData.PatientInfo.PreauthReferOcc,
          PreviousTreatment: previousTreatment,
          PreviousTreatmentDate: PreviousDate,
          PreviousTreatmentDetail: PreviousDetail,
          DscDateTime: dscDateTimevalue,
          IsPackage: isPackage,
          TotalEstimatedCost: TotalEstimatedCostCount,
          AnesthesiaList: anesthesiaListValue,
        };
        setDataToAIA(PatientInfo)

         axios
  .post(
    process.env.NEXT_PUBLIC_URL_SV +
      process.env.NEXT_PUBLIC_URL_SubmitPreSubmissionToAIA,
      {
        PatientInfo
      }
  )
  .then((response) => {
    console.log(response.data)

      
    
    if (response.data.HTTPStatus.statusCode === 200) {
      setClaimStatusCodeProcessingValue(response.data.Result.InsuranceData.MessageTh)
      setClaimStatusCodeProcessingValueClaimNo(response.data.Result.InsuranceData.ClaimNo)
      setClaimStatusCodeProcessingValueOccurrenceNo(response.data.Result.InsuranceData.OccurrenceNo)
      
      console.log("SubmitPreSubmissionToAIA Succ")
      axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
         PatientInfoData 
      )
      .then((response) => {
         console.log(response.data);
        if (response.data.HTTPStatus.statusCode === 200) {
  //           console.log("Step 7 getcheckclaimstatus Succ");
  if(response.data.Result.InsuranceData.ClaimStatusCode === "03"){
    setClaimStatusCodeProcessing(true)
  }


          document.getElementById("my_modal_3").close();
          document.getElementById("my_modal_4").showModal();
           resolve("Step 7 completed");

        }else{
                setMassSummitError("Error");
                setShowSummitError("Error");
        }
      })
      .catch((error) => {
        console.log(error);
        setMassSummitError("Error getcheckclaimstatus");
        setShowSummitError("Error");
      });
      
      
    }else{
      setMassSummitError(response.data.HTTPStatus.message);
      setShowSummitError("Error");
    }
  })
    .catch((error) => {
        console.log(error);
        setMassSummitError("Error SubmitPreSubmissionToAIA");
        setShowSummitError("Error");
      });
  }) 
  }
  }
}

  async function SubmitPreSubmissionToAIAByUR() {

  const dataToAIAx = {
    ...dataToAIA,
    IsAdmission: false,
  };
  axios
  .post(
    process.env.NEXT_PUBLIC_URL_SV +
      process.env.NEXT_PUBLIC_URL_UpdateIsAdmission,
      {
        "PatientInfo" : 
          dataToAIAx
      }
  )
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error);
    setMassSummitError("Error");
    setShowSummitError("Error");
  });


  document.getElementById("my_modal_4").close();
  try {
    await stepOne();
    await stepTwo();
  } catch (error) {
    console.log(error);
  };

  function stepOne() {
    setShowModal(true)
  };
  function stepTwo() {
    setTimeout(() => {
      router.push("/aia/checkClaimStatus");
    }   , 1000);
  }   
}



  async function SubmitPreSubmissionToAIAByAdmission() {
    const dataToAIAx = {
      ...dataToAIA,
      IsAdmission: true,
    };
    console.log(dataToAIAx)
    axios
    .post(
      process.env.NEXT_PUBLIC_URL_SV +
        process.env.NEXT_PUBLIC_URL_UpdateIsAdmission,
        {
          "PatientInfo" : 
            dataToAIAx
        }
    )
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
      setMassSummitError("Error");
      setShowSummitError("Error");
    });
  document.getElementById("my_modal_4").close();
 if(claimStatusCodeProcessing === true){
  try {
    await stepOne();
    await stepTwo();
  } catch (error) {
    console.log(error);
  };

  function stepOne() {
    setShowModal(true)
  };
  function stepTwo() {
    setTimeout(() => {
      router.push("/aia/checkClaimStatus");
    }   , 1000);
  }    
 }else{
 document.getElementById("my_modal_5").showModal();
     console.log(dataToAIA)


  axios
  .post(
    process.env.NEXT_PUBLIC_URL_SV +
      process.env.NEXT_PUBLIC_URL_SubmitPreSubmissionToAIA,
      {
        "PatientInfo" : 
          dataToAIA
      }
  )
  .then((response) => {
    console.log(response.data)
          if (response.data.HTTPStatus.statusCode === 200) {
            document.getElementById("my_modal_5").close();

            setShowModal(true);
            setTimeout(() => {
      
              setShowModal(false);
              router.push("/aia/checkClaimStatus");
            }, 5000);
          }else{
                setMassSummitError("Error");
                setShowSummitError("Error");
          }
        })
      .catch((error) => {
        console.log(error);
        setMassSummitError("Error");
        setShowSummitError("Error");
      });
  }
}



const SubmitSelectTypeBilling = (event) => {
  setSelectTypeBillingValue(event.target.value);
};

  const IndicationForAdmission = (event) => {
    setAdmissionValue(event.target.value);
  };
  const AnesthesiaList = (event) => {
    setAnesthesiaListValue(event.target.value);
  };
  const ICD10CodeValue = async  (event, value) => {
    

    if (value.length >= 3) {
      setIsLoading(true);
      try {
         axios
         .get(process.env.NEXT_PUBLIC_URL_SV +process.env.NEXT_PUBLIC_URL_getICDDx+value)
  .then((response) => {
  // console.log(response.data)


        // แปลงผลลัพธ์เป็นรูปแบบที่สามารถใช้กับ react-select
        const formattedOptions = response.data.Result.ICDDxInfo.map((item) => item.ICDDxCode && ({
          DxCode: item.ICDDxCode,
          DxName: item.ICDDx,
           label: item.ICDDxCode + ' - ' + item.ICDDx,
        }));
        setOptions(formattedOptions);

        })
      .catch((error) => {
        console.log(error);
        setMassSummitError("Error");
        setShowSummitError("Error");
      });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setOptions([]);
    }
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



  const CodeValueBill = async  (event, value) => {
    

    if (value.length >= 3) {
   
      setIsLoadingBill(true);
      try {
         axios
         .get(process.env.NEXT_PUBLIC_URL_SV +process.env.NEXT_PUBLIC_URL_getBillingSubgroup+value)
  .then((response) => {
    // console.log(response.data.Result.BillingSubInfo)


       //แปลงผลลัพธ์เป็นรูปแบบที่สามารถใช้กับ react-select

        const formattedOptions = response.data.Result.BillingSubInfo.map((item) => item.LocalBillingCode && ({
          LocalBillingId: item.LocalBillingId,
           LocalBillingCode: item.LocalBillingCode,
           LocalBillingName: item.LocalBillingName,
           SimbBillingCode: item.SimbBillingCode,
           PayorBillingCode: item.PayorBillingCode,
           label: item.LocalBillingName, // กำหนดค่า label ที่ต้องการ
        }));
        setOptionsBill(formattedOptions);

        })
      .catch((error) => {
        console.log(error);
        setMassSummitError("Error");
        setShowSummitError("Error");
      });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingBill(false);
      }
    } else {
      setOptionsBill([]);
    }
  };




  const handleChangeICD10 = (event, newValue) => {
    setSelectedOption(newValue);
   // console.log('Selected option:', newValue);
  };
  const handleChangeICD9 = (event, newValue) => {
    setSelectedOptionPro(newValue);
  };
  const handleChangeBillx = (event, newValue) => {
    setSelectedOptionBill(newValue);
    
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
          process.env.NEXT_PUBLIC_URL_PD +
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
    formData.append("DocumenttypeCode", "009");
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
        process.env.NEXT_PUBLIC_URL_PD2 +
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
          process.env.NEXT_PUBLIC_URL_PD2 +
            process.env.NEXT_PUBLIC_URL_getlistDocumentName,
          {
            "PatientInfo":{
            RefId: PatientInfoData.PatientInfo.RefId,
            TransactionNo: PatientInfoData.PatientInfo.TransactionNo,
            HN: PatientInfoData.PatientInfo.HN,
            VN: PatientInfoData.PatientInfo.VN,
            DocumenttypeCode : "009",
            }
          }
        )
        .then((response) => {
          setFileList(response.data);
          //console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
          try {
            const ErrorMass = error.config.url;
            const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
            setMassDocError(
              error.code + " - " + error.message + " - " + ErrorMass2
            );
            setShowDocError("Error");
          } catch (error) {
            setMassDocError(error);
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
  async function Submitfurtherclaimvn(e) {
        // console.log(e)
    setShowSummitError();
    setShowSummitSucc();
    let PatientInfo;
    try {
      PatientInfo = {
          "RefId": PatientInfoData.PatientInfo.RefId,
          "TransactionNo": PatientInfoData.PatientInfo.TransactionNo,
          "HN": PatientInfoData.PatientInfo.HN,
          "VN": PatientInfoData.PatientInfo.VN,
          "ReferenceVN": e.VN,
      }
   //   console.log(PatientInfo)
    let response = await axios.post(


          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_UpdateReferenceVN,
            {
              PatientInfo
            }
        )
  
     //   console.log(response.data)
  
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
            ReferenceVN: e.VN,
            FurtherClaimNo: PatientInfoData.PatientInfo.FurtherClaimNo,
          },
        })
      );
  
  
        await stepOne();
        await stepTwo();
      } catch (error) {
        console.log(error);
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

  const ArrowOpen = (e) =>{
  //  console.log(e)
    // console.log(showArrow)
    setShowArrowVN(e.VN)
    if(showArrow === false){
      setShowArrow(true)
    }else{
      setShowArrow(false)
    }
 
  }
  const handleOtherInsurer = (e) => {
    setOtherInsurer(e.target.value);
  };
  const handleAlcoholRelated = () => {
    if(alcoholRelated === true){
      setAlcoholRelated(false);
    }else{
      setAlcoholRelated(true);
    }
  };


  const handleIsPackage = () => {
    if(isPackage === true){
      setIsPackage(false);
    }else{
      setIsPackage(true);
    }
  };

  const handlePregnant = () => {
    if(pregnant === true){
      setPregnant(false);
    }else{
      setPregnant(true);
    }
  };
  const handlePrivateCase = () => {
    if(privateCase === true){
      setPrivateCase(false);
    }else{
    setPrivateCase(true);
    }
  };
  const handlePreviousTreatment = () => {
    if(previousTreatment === true){
      setPreviousTreatment(false);
    }else{
    setPreviousTreatmentDetail("");
    setPreviousTreatmentDate(null);
    setPreviousTreatment(true);
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
              <div className="justify-center border-solid w-4/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
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
                                      <MdCancel /> Cancel Claim
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
                        label="Title"
                        defaultValue={patientInfoByPID ? patientInfoByPID.TitleTHc : ""}
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
                        defaultValue={patientInfoByPID ? patientInfoByPID.GivenNameTH : ""}
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
                        defaultValue={patientInfoByPID ? patientInfoByPID.SurnameTH : ""}
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
                        defaultValue={patientInfoByPID ? patientInfoByPID.PID : ""}
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
                        defaultValue={patientInfoByPID ? patientInfoByPID.DateOfBirth : ""}
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
                        defaultValue={patientInfoByPID ? patientInfoByPID.Gender : ""}
                        className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                  </div>
                  <div className="rounded-md">
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
                        label="IllnessType"
                        defaultValue={
                          illnessType ?
                            illnessType.Result
                              .filter(ill => ill.illnesstypecode === PatientInfoData.PatientInfo.IllnessTypeCode)
                              .map(ill => ill.illnesstypedesc)
                              .join('') 
                            : ""
                        }
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
              <div className="container mx-auto justify-center border-solid w-4/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
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
                            value={otherInsurer}
                            className="checkbox "
                            onChange={handleOtherInsurer}
                            disabled
                          />
                          <p className="text-left ml-2">จองสิทธิ์ครั้งแรก</p>
                          <input
                            type="radio"
                            id="OtherInsurer"
                            name="OtherInsurer"
                            value={otherInsurer}
                            className="checkbox ml-2"
                            onChange={handleOtherInsurer}
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
                            value={otherInsurer}
                            className="checkbox"
                            onChange={handleOtherInsurer}
                            defaultChecked
                            disabled
                          />
                          <p className="text-left ml-2">จองสิทธิ์ครั้งแรก</p>
                          <input
                            type="radio"
                            id="OtherInsurer"
                            name="OtherInsurer"
                            value={otherInsurer}
                            className="checkbox  ml-2"
                            onChange={handleOtherInsurer}
                            disabled
                          />
                          <p className="text-left ml-2">เคยจองสิทธิ์มาก่อน</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="rounded-md">
                    {/* <div className="flex items-center ">
                      <input
                        type="checkbox"
                        id="OtherInsurer"
                        name="OtherInsurer"
                        value={otherInsurer}
                        className="checkbox checkbox-info"
                        onChange={handleOtherInsurer}
                      />
                      <p className="text-left">
                        &nbsp;ค่าส่วนเกินจากประกันอื่นๆ
                      </p>
                    </div> */}
                                      <div className="rounded-md"></div>
                  </div>
                  <div className="rounded-md"> </div>
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
                            <DesktopDatePicker
                            label="ExpectedAdmitDate"
                            slotProps={{
                              openPickerButton: { color: "error" },
                              textField: { focused: true, color: "error" },
                            }}
                              value={expectedAdmitDate}
                              onChange={(newExpectedAdmitDate) =>
                                setExpectedAdmitDate(newExpectedAdmitDate)
                              }
                              required
                              format="YYYY-MM-DD"
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
                              value={dscDateTime}
                              onChange={(newDscDateTime) =>
                                setDscDateTime(newDscDateTime)
                              }
                              required
                              format="YYYY-MM-DD HH:MM"
                            />
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="rounded-md mt-2">
                      <TextField
                          error
                          type="number"
                      className="w-full"
                     // id="outlined-multiline-static"
                      label="TotalEstimatedCost"
                      name="totalEstimatedCost"
                      defaultValue={totalEstimatedCost}
                      onChange={(newTotalEstimatedCost) =>
                        setTotalEstimatedCost(newTotalEstimatedCost)
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              $
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                      </div>
                      <div className="rounded-md mt-2">
                      <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
              IndicationForAdmission
              </InputLabel>
         
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={admissionValue}
                label="IndicationForAdmission"
                onChange={IndicationForAdmission}
              >
                <MenuItem key="0" value="">-</MenuItem>
                {indicationForAdmissionCode
                  ? indicationForAdmissionCode.Result.map((code, index) => (
                    <MenuItem key={index+1} value={code.ifacode}>
                    {code.ifaname}
                  </MenuItem>
                    ))
                  :    <MenuItem>
                  Loading...
                </MenuItem>
                }
              </Select>
            </FormControl>
                  </div>
                    <div className="rounded-md mt-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem>
                        <DesktopDatePicker
                          label="SignSymptomsDate"
                          value={signSymptomsDate}
                          onChange={(newSignSymptomsDate) =>
                            setSignSymptomsDate(newSignSymptomsDate)
                          }
                          format="YYYY-MM-DD"
                        />
                      </DemoItem>
                    </LocalizationProvider>
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      type="number"
                      label="ExpectedDayOfRecovery"
                       id="outlined-start-adornment"
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
                      fullWidth
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField
                      label="ระดับความรู้สึกตัว (Score 3-15)"

                      defaultValue={comaScore}
                      onChange={(newComaScore) => setComaScore(newComaScore.target.value)}
                      // inputProps={{ min: 3, max: 15 }}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                </div>
                <div className="rounded-md mt-2 text-3xl text-error  flex ">
                <div
                        className="btn btn-secondary text-base-100 text-xl"
                        onClick={Editfurtherclaimvn}
                      >
                        <FaEdit className="text-base-100" />
                  </div>
                  <div className="mt-2 ml-2">Claim form จาก VN : {" "}
                    {PatientInfoData.PatientInfo.ReferenceVN ? ((PatientInfoData.PatientInfo.ReferenceVN === PatientInfoData.PatientInfo.VN) ? 
                      (PatientInfoData.PatientInfo.VN+" ( ปัจจุบัน )") : (PatientInfoData.PatientInfo.ReferenceVN+" ( เก่า )")) 
                      : (PatientInfoData.PatientInfo.VN+" ( ปัจจุบัน )") }</div>

                </div>
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
                      defaultValue={texthandleTextChiefComplaint}
                      onChange={handleTextChiefComplaint}
                      inputProps={{ maxLength: 200 }}
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
                      defaultValue={texthandleTextPhysicalExam}
                      onChange={handleTextPhysicalExam}
                      //   required
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
                      rows={10}
                      defaultValue={texthandleTextDxFreeText}
                      onChange={handleTextDxFreeText}
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
                      rows={10}
                      defaultValue={textPresentIllness} 
                      onChange={handleTextChangePresentIllness}
                      inputProps={{ maxLength: 500 }}
                    />
                    <p>{charCountPresentIllness}/500 ตัวอักษร</p>
                  </div>
                  <div className="rounded-md mt-2">
                  </div>
                </div>
                <div className="border-solid border-2 mt-2">
                  <h1 className="mt-2 ml-2 text-accent text-lg">
                    การเจ็บป่วยนี่เกี่ยวข้องกับสิ่งแวดล้อมอื่นๆ (
                    กรณีไม่ได้เลือก ไม่เกี่ยวข้องกับปัจจัยแวดล้อมอื่นๆ
                    สามารถเลือกได้มากกว่า 1 ข้อ )
                  </h1>
                  <div className="flex items-center mt-2 ml-2">
                    {/* {visit ? (
                      visit.Result.VisitInfo.AlcoholRelated === "true" ? ( */}
                        {/* <input
                          type="checkbox"
                          id="alcoholRelated"
                          name="alcoholRelated"
                          value={alcoholRelated}
                          className="checkbox"
                          onChange={handleAlcoholRelated}
                          defaultChecked 
                        />
                      ) : ( */}
                        <input
                          type="checkbox"
                          id="alcoholRelated"
                          name="alcoholRelated"
                          checked={alcoholRelated}
                          className="checkbox"
                          onChange={handleAlcoholRelated}
                        />
                      {/* )
                    ) : (
                      ""
                    )}  */}

                    <p className="text-left ml-2">
                      การเจ็บป่วยครั้งนี้เกี่ยวข้องกับแอลกอฮอล์ หรือ ยาเสพติด
                    </p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                      <input
                        type="checkbox"
                        id="IsPackage"
                        name="IsPackage"
                        checked={isPackage}
                        className="checkbox"
                        onChange={handleIsPackage}
                      />
                      <p className="text-left">
                        &nbsp;Package
                      </p>
                    </div>
                  <div className="flex items-center mt-2 ml-2">
                    <input
                      type="checkbox"
                      id="pregnant"
                      name="pregnant"
                      checked={pregnant}
                      className="checkbox "
                      onChange={handlePregnant}
                    />
                    <p className="text-left ml-2">ตั้งครรภ์</p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                    <input
                      type="checkbox"
                      id="privateCase"
                      name="privateCase"
                      checked={privateCase}
                      className="checkbox "
                      onChange={handlePrivateCase}
                    />
                    <p className="text-left ml-2">เป็นเคสพิเศษ</p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                    <input
                      type="checkbox"
                      id="previousTreatment"
                      name="previousTreatment"
                      checked={previousTreatment}
                      className="checkbox "
                      onChange={handlePreviousTreatment}
                    />
                    <p className="text-left ml-2 pb-2">
                      เคยเข้ารับการรักษาก่อนการรักษาครั้งนี้
                    </p>
                  </div>
                  {previousTreatment && (
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
                                value={previousTreatmentDate}
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
                                newPreviousTreatmentDetail
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
                          {/* //////////////////////////////////////////////////////////////////////////// */}
                          {/* //////////////////////////////////////////////////////////////////////////// */}
                                      {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
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
                                  {dc.DoctorRole}
                                </div>
                              </td>
                            </tr>
                          )
                      )
                    ) : (
                      <tr>
                        <td></td>
                      </tr>
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
            </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
                          {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
                  <h1 className="font-black text-accent text-3xl ">
                  Diagnosis
                    <div
                      className="btn btn-secondary text-base-100 text-xl ml-2"
                      onClick={SummitEditDia}
                    >
                      <FaEdit />
                    </div>
                  </h1>
                  <div className="grid gap-4 sm:grid-cols-4 w-full mt-4">
                  </div>
                  <TableContainer component={Paper} className="mt-2">
                    <Table className="table">
                      <TableHead>
                        <TableRow className="bg-primary">
                          <TableCell className="w-2"></TableCell>
                          <TableCell>
                            <h1 className="text-base-100  text-sm w-1/5 text-center">
                           ICD10 - ชื่อของการวินิจฉัยโรค
                            </h1>
                          </TableCell>
                          <TableCell>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {console.log(rowsDia)} */}
                        {rowsDia
                          ? rowsDia.map(
                              (dia, index) =>
                                dia  && (
                                  <TableRow
                                    key={index}
                                    className=" bg-neutral text-sm"
                                  >
                                    <TableCell>{dia.DxCode ? index + 1 : ""}</TableCell>
                                    <TableCell>
                                      <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                        {dia.DxCode === "" ? (
                                          <>&nbsp;</>
                                        ) : <>
                                          {dia.DxCode} - {dia.DxName}
                                        </>}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {summitEditDia === "true" ? (
                                        <div
                                          onClick={() => handleDeleteRowDia(index)}
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
                        {summitEditDia === "true" ? (
                          <>
                            <TableRow>
                              <TableCell>
                                <FaCirclePlus className="text-xl" />
                              </TableCell>
                              <TableCell>
                <Autocomplete
                options={options}
                loading={isLoading}
                onInputChange={ICD10CodeValue}
                onChange={handleChangeICD10}
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
                              {selectedOption  ? (
                                <>
                                  <TableCell>
                                    <div
                                      onClick={handleAddRowDia}
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
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {/* {accidentDetail ? (
                <> */}
                    <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
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
                            className="bg-base-100 w-full" 
                              value={accidentDate}
                              onChange={(newAccidentDate) =>
                                setAccidentDate(newAccidentDate)
                              }
                              format="YYYY-MM-DD"
                            />
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="w-2/5">
                        <FormControl fullWidth>
                          <InputLabel id="demo-error-select-label">สถานที่เกิดอุบัติเหตุ</InputLabel>
                          <Select
                            className="mx-2"
                            labelId="demo-error-select-label"
                            id="demo-error-select"
                            //name="accidentPlaceText"
                            value={accidentPlaceValue}
                            label="สถานที่เกิดอุบัติเหตุ"
                            onChange={AccidentPlace}
                          >
                            <MenuItem key="" value="" ></MenuItem>
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
                                    //  required
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
                                    //   required
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
                                อวัยวะที่ได้บาดเจ็บจากการเกิดอุบัติเหตุ (ICD10code)
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
                {/* </>
              ) : (
                ""
              )
           } */}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
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
                          order.ItemId  && (
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
            {/* //////////////////////////////////////////////////////////////////////////// */}
             {/* //////////////////////////////////////////////////////////////////////////// */}
             <div className="container mx-auto justify-center border-solid w-full m-auto border-4 border-warning rounded-lg p-4 mt-2">
             <h1 className="font-black text-accent text-3xl ">
                Billing
              
              <div className="btn btn-secondary text-base-100 text-xl ml-2"
                        onClick={SummitEditBillz}
                      >
                        <FaEdit />
              </div>
              </h1>
              
                  <FormControl className="mt-2">
              <InputLabel id="demo-simple-select-label">
                TypeBilling
                </InputLabel>
                                    <Select
                                      className="break-all w-64"
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Anesthesia"
                                      value={selectTypeBillingValue}
                                      onChange={SubmitSelectTypeBilling}
                                    >
                                      <MenuItem key="" value=""></MenuItem>
                                      {selectTypeBillingList
                                        ? selectTypeBillingList.Result.map(
                                            (type, index) => (
                                              <MenuItem
                                                key={index}
                                                value={type.Code}
                                              >
                                                {type.Selecttype}
                                              </MenuItem>
                                            )
                                          )
                                        : ""}
                                    </Select>
                                  </FormControl> 

                    <div className="btn btn-secondary text-base-100 text-xl ml-2 mt-2"
                        onClick={SummitSelectType}
                      >
                        <AiOutlineArrowRight />
                </div>
                <div className="btn btn-error text-base-100 text-xl ml-2 mt-2"
                        onClick={SummitSelectTypeDelect}
                      >
                <AiOutlineDelete /> ลบทั้งหมด
                </div>
                      
              <div className="overflow-x-auto">
            <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                              Billing Sub-Group
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                              Price
                              </h1>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {console.log(itemBillingDetails)}
                          {itemBillingDetails
                            ? itemBillingDetails.map(
                                (cause, index) =>
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                      <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                        {cause.LocalBillingCode === "" ? (
                                          <>&nbsp;</>
                                        ) : (
                                          listBilling
                                            ? listBilling.ItemBillingCheckBalance.map((type, index) => 
                                              type.LocalBillingCode  ===   cause.LocalBillingCode ?(
                                                        <p
                                                          key={index}
                                                          >
                                                         {type.LocalBillingName}
                                                        </p>
                                                      ) : ""
                                                    )
                                                  : ""
                                          
                                        )}
                                      </div> 
                                      </TableCell>
                                      <TableCell>
                                      {summitEditBill === "true" ? 
                                            <TextField
                                              type="number"
                                              className="bg-base-100 w-full m-2"
                                              value={cause.BillingInitial}
                                              onChange={(e) =>
                                                handleChangeBillA2(index, e)
                                              }

                                            />
                                            :  <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                        {cause.BillingInitial === "" ? (
                                          <>&nbsp;</>
                                        ) : cause.BillingInitial !== "" ?
                                          
                                          parseFloat(cause.BillingInitial).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2})
                                      : "0.00"}
                                      </div>
                          }
                                      </TableCell>
                                        <TableCell>
                                        {summitEditBill === "true" ?
                                          <div
                                            onClick={() =>
                                              handleDeleteBillingDetail(
                                                cause
                                              )
                                            }
                                            // onClick={() =>
                                            //   confirmButton(
                                            //     `${selectData.RefId} | ${selectData.TransactionNo} | ${listClaimForm.ClaimNo} | ${listClaimForm.OccerrenceNo}`
                                            //   )
                                            // }
                                            className="btn btn-error text-base-100 text-xl"
                                          >
                                            <FaCircleMinus />
                                          </div> : ""}
                                        </TableCell>
                                    </TableRow>
                              )
                            : ""}
{summitEditBill === "true" ? (
                                          <>
                              <TableRow>
                                <TableCell>
                                  <FaCirclePlus className="text-xl" />
                                </TableCell>
                                <TableCell className="w-4/6">   
                                  
                    {/* <select  className="select select-bordered w-full mt-2"                
onChange={(e) => { const selectedType = JSON.parse(e.target.value); 
  setNewItemBillingCheckBalance({ ...newItemBillingCheckBalance, 
    LocalBillingCode: selectedType.LocalBillingCode, 
    LocalBillingName: selectedType.LocalBillingName, 
    SimbBillingCode: selectedType.SimbBillingCode,
  }); }}

                                     required>
                      <option key="" value="">- กรุณาเลือก -</option>
                      {listBilling
                  ? listBilling.ItemBillingCheckBalance.map((type, index) => (
                              <option
                                key={index}
                                value={JSON.stringify(type)}>
                                      {type.LocalBillingCode} - {type.LocalBillingName}
                              </option>
                            )
                          )
                        : ""}
                    </select> */}
                                 <Autocomplete
                options={optionsBill}
                loading={isLoadingBill}
                onInputChange={CodeValueBill}
                onChange={handleChangeBillx}
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
                                <div className="m-2">
                                  <TextField
                                    type="number"
                                    className="bg-base-100 w-full"
                                    value={selectedOptionBill ?
                                      selectedOptionBill.BillingInitial : ""
                                    }
                                    onChange={(e) =>
                                      
                                      setSelectedOptionBill({
                                        ...selectedOptionBill,
                                        BillingInitial: e.target.value,
                                      })
                                    }
                                    placeholder=""
                                  />
                                </div>
                                </TableCell>
                                {selectedOptionBill ? (
                                  <>
                                    <TableCell>
                                      <div
                                        onClick={handleAddItemBillingDetail}
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
                              </>) : ("")}
                        </TableBody>
                      </Table>
              <div className="grid gap-2 sm:grid-cols-6  bg-primary w-full whitespace-normal text-center text-lg">
                <div className=""></div>
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="px-3 py-2 m-1 w-full btn btn-success text-base-100 hover:text-success hover:bg-base-100" type="submit" onClick={SubmitSumBilling}>รวมยอดเงิน</div> 
                <div className="rounded-md px-3 py-2 border-2 bg-base-100 break-all m-1">{total !== "NaN" ? parseFloat(total).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2}) : "0.00"}</div>
                <div className="rounded-md"></div>
              </div>

                    </TableContainer>
                    </div>
         </div>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {/* //////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////// */}
                        <div className="container mx-auto justify-center border-solid w-full m-auto border-4 border-warning rounded-lg p-4 mt-2">
                  <h1 className="font-black text-accent text-3xl ">
                  Note
                    <div
                      className="btn btn-secondary text-base-100 text-xl ml-2"
                      onClick={SummitEditPre}
                    >
                      <FaEdit />
                    </div>
                  </h1>

                  <TableContainer component={Paper} className="mt-2">
                    <Table className="table">
                      <TableHead>
                        <TableRow className="bg-primary">
                          <TableCell className="w-1/12"></TableCell>
                          <TableCell className="w-2/12">
                            <h1 className="text-base-100  text-sm">
                            วันเวลา
                            </h1>
                          </TableCell>
                          <TableCell className="w-8/12">
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
                              (Pre, index) => Pre.PreAuthDateTime ?
                                  <TableRow
                                    key={index}
                                    className=" bg-neutral text-sm"
                                  >
                                    <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                {summitEditPreAuthNote === "true" ? 
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                        
                            <DemoItem>
                              <DesktopDatePicker
                                  className="bg-base-100 w-full" 
                               format="YYYY-MM-DD"
                                 value={Pre.PreAuthDateTime}
                                  onChange={(e) => 
                                 handleChangeEditDateRow2(index, e)
                                 }    
                                   placeholder="ProcedureDate"
                                 />
                                 </DemoItem>
                                   </LocalizationProvider> 
                                   :
                                      <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                        {Pre.PreAuthDateTime === "" ? (
                                          <>&nbsp;</>
                                        ) : (
                                          dayjs(Pre.PreAuthDateTime.$d).format("YYYY-MM-DD")
                                        )}
                                      </div> }
                                    </TableCell>
                                    <TableCell>
                                    {summitEditPreAuthNote === "true" ? 
                                       <TextField
                                  className="bg-base-100 w-full"
                                  value={Pre.PreAuthDetail}
                                  onChange={(e) =>
                                    handleChangeEditDetailRow2(index, e)
                                  }
                             
                                  inputProps={{ maxLength: 200 }}
                                  multiline
                                  rows={4}
                                  placeholder="PreAuthDetail"
                                /> : 
                                <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                        {Pre.PreAuthDetail === "" ? (
                                          <>&nbsp;</>
                                        ) : (
                                          Pre.PreAuthDetail
                                        )}
                                      </div>
                                }
                                    </TableCell>
                                    <TableCell>
                                      {summitEditPreAuthNote === "true" ? (
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
                               : ""
                            )
                          : ""}
                 
                        {summitEditPreAuthNote === "true" ? (
                          <>
                            <TableRow>
                              <TableCell>
                                <FaCirclePlus className="text-xl " />
                              </TableCell>

                              <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                              <DesktopDatePicker
                                  className="bg-base-100 w-full"
                               format="YYYY-MM-DD"
                                 value={newRow2.PreAuthDateTime}
                                 onChange={(e) =>
                           
                                  setNewRow2({
                                    ...newRow2,
                                    PreAuthDateTime: e,
                                  })
                                 }
                                  placeholder="ProcedureDate"
                                  //  required
                                />
                                </DemoItem>
                                  </LocalizationProvider>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  className="bg-base-100 w-full"
                                  value={newRow2.PreAuthDetail}
                                  onChange={(e) =>
                                    setNewRow2({
                                      ...newRow2,
                                      PreAuthDetail: e.target.value,
                                    })
                                  }
                                  inputProps={{ maxLength: 200 }}
                                  multiline
                                  rows={4}
                                  placeholder="PreAuthDetail"
                                  //   required
                                />
                              </TableCell>
                              {
                              newRow2.PreAuthDateTime &&
                              newRow2.PreAuthDetail ? (
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
            {/* //////////////////////////////////////////////////////////////////////////// */}
            <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-4 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Upload File</h1>
              <div className="overflow-x-auto mt-6">
                <div className="flex items-center ">
                  <input
                    type="file"
                    accept=".pdf"
                    className="file-input file-input-bordered file-input-info w-5/6 "
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

<dialog id="Editfurtherclaimvn" className="modal text-xl	">
        <div className="modal-box w-11/12 max-w-full">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg">ตาราง Claim form</h3>
            <hr />
            {showSummitError === "Error" ? (
              <div
                role="alert"
                className="alert alert-error mt-2 text-base-100"
              >
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
                <span>{massSummitError}</span>
              </div>
            ) : ("")}
           {showSummitSucc === "Succ" ? (
      <div role="alert" className="alert alert-success text-base-100 mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
                <span>{massSummitSucc}</span>
              </div>
            ) : ("")}

                {massSummit ? (
                  massSummit
                ) : (
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center break-all">
                      <th className="">VisiDate <br/> Episode Number</th>
                      <th className="">Doctor <br/> Location</th>
                      <th className="">PresentIllness</th>
                      <th className="">Diagnosis</th>
                      <th className="">InsuranceNote</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listClaimForm ? (
                      listClaimForm.Result.ClaimFormListInfo.map((FormList, index) => (
                  
                        <tr key={index} className=" bg-neutral text-sm">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all text-center ">
                              {FormList.VisiDate ? (
                                FormList.VisiDate
                              ) : (
                                ""
                              )}
                              <br/>
                              {FormList.VN ? FormList.VN : ""}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all text-center">
                            {FormList.DoctorFirstName ? (
                                FormList.DoctorFirstName
                              ) : (
                               ""
                              )} 
                               <br/>
                               {FormList.LocationDesc ? FormList.LocationDesc : ""}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          {FormList.PresentIllness ? 
                          <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all text-center text-balance">
                         {FormList.PresentIllness}
                            </div>  : ""}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          <div className="border-2 bg-base-100 break-all text-center">
                            <table className="table">
                          <thead>
                             <tr>
                                 <th>Code</th>
                                <th>Name</th>
                        </tr>
                       </thead>
                        <tbody>
                             {FormList.DiagnosisInfo ? (
                            
                            FormList.DiagnosisInfo.map((Diag, index) => (
                              <tr  key={index}>
                            <th>{Diag.DxCode}</th>
                            <th>{Diag.DxName}</th>
                            </tr>
                            )
                          )
                              ) : (
                              <tr>
                                <th></th>
                                <td></td>
                              </tr>
                              )} 
                          </tbody>
                      </table>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap ">
                          {FormList.InsuranceNote ?
                          <h1 className="rounded-full px-3 py-2 border-2 bg-base-100 break-all text-center text-balance">
                           {FormList.InsuranceNote}
                            </h1>
                            : ""}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          <div
                    className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 ml-2"
                    onClick={() => Submitfurtherclaimvn(FormList)}
                  >
                               <IoIosSave  className="size-6" />
                             </div>
                          </td>
                </tr>
                      ) )
                    ) : (
                      <tr>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>

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
                      กำลังบันทึกข้อมูล...
                    </h1>
                    <CircularProgress size="30px" className="text-error text-lg" />
                  </center>
                )}
              </>
            )}
          </form>
        </div>
      </dialog>
      <dialog id="my_modal_4" className="modal text-xl	">
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
                    <h1 className="text-primary text-xl">
                    {claimStatusCodeProcessingValue}
                    </h1>
                    <br/>
                    <h1 className="text-error">
                    {patientInfoByPID ? patientInfoByPID.GivenNameTH : ""} {patientInfoByPID ? patientInfoByPID.SurnameTH : ""}
                    <br/>   รหัสอ้างอิง : {claimStatusCodeProcessingValueClaimNo}/{claimStatusCodeProcessingValueOccurrenceNo}
                    </h1>
                   
                    <div className="btn btn-error text-base-100 hover:bg-base-100 hover:text-error text-xl ml-2 mt-2 break-all"onClick={SubmitPreSubmissionToAIAByAdmission}>
                    เข้ารับการรักษาเป็นผู้ป่วยใน
                      </div>
                      <div className="btn btn-accent text-base-100 hover:bg-base-100 hover:text-accent text-xl ml-2 mt-2 break-all" onClick={SubmitPreSubmissionToAIAByUR}>
                    รอเข้ารับการรักษาภายหลัง 
                      </div>
                  </center>
                )}
              </>
            )}
          </form>
        </div>
      </dialog>

      <dialog id="my_modal_5" className="modal text-xl	">
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
      <dialog id="TypeBilling" className="modal text-xl	">
            <div className="modal-box max-w-7xl">
              <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
                <h3 className="font-bold text-lg text-accent">Type Billing : {selectTypeBillingList ?selectTypeBillingList.Result.filter(type => type.Code === selectTypeBillingValue).map(type => type.Selecttype).join('') : ""}</h3>
                <hr />

                {((showFormError === "Error")||(totalApprovedAmount === 0)) ? (
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
          ) : ("")}
                                  <div className="grid grid-cols-2 gap-2 mt-4">
                                    <div className="w-full">
                                      {selectTypeBillingValue === "1" ? 
                                            (
                                              <TextField
                                              error
                                              type="text"
                                              className="bg-base-100 m-2 w-9/12"
                                              value={typeBilling}
                                              onChange={(e) =>
                                                handleChangeTypeBilling(e)
                                              }
                                              inputProps={{ maxLength: 10 }}
                                            />
                                          ) : (
                                              <select  className="select border-2 border-error bg-base-100 m-2 w-9/12"    
                                              onChange={(e) =>
                                                handleChangeListPackage(e)
                                             }          
                                            >
                                  <option value="">- กรุณาเลือก -</option>
                             {listPackageBundle
                         ? listPackageBundle.Result.map((listPackage, index) => (
                                     <option
                                       key={index}
                                       value={listPackage.packagecode}>
                                             {listPackage.packagedesc}
                                     </option>
                                   )
                                 )
                               : ""}
                           </select>
                                            )
                                            }
                                            {(databillingz) ? <div className="btn btn-info hover:text-info hover:bg-base-100 text-base-100 text-xl ml-2 mt-2"  onClick={SummitSelectTypeSucc}>Submit</div> : "" }
                                    </div>
                                    <div> </div>
                                  </div>
                                <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
                                {selectTypeBillingValue === "1" ? 
                                <>
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
                                              label="PackagePrice"
                                              defaultValue={typeBillingList ? parseFloat(typeBillingList.Result.TotalBillAmount).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2})+" บาท" : ""}
                                              className="w-full text-black rounded disabled:text-black disabled:bg-gray-300 cursor-not-allowed"
                                              InputProps={{ readOnly: true }}
                                            />
                                          </Box>
                                        </div>
                                        </> :
                                         <>
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
                                              label="PackagePrice"
                                              defaultValue={typeBillingList ? parseFloat(typeBillingList.Result.PackagePrice).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2})+" บาท" : ""}
                                              className="w-full text-black rounded disabled:text-black disabled:bg-gray-300 cursor-not-allowed"
                                              InputProps={{ readOnly: true }}
                                            />
                                          </Box>
                                        </div>
                                        </>
                                  }
                                  </div>  
           <h1 className="font-black text-accent text-3xl ">Billing List</h1>
              <div className="overflow-x-auto">
                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th>Billing Code</th>
                      <th>Billing Sub-Group</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {databillingz ? (
                      databillingz.map(
                        (bill, index) => 
                        <tr key={index} className=" bg-neutral text-sm">
                          <td className="px-6 py-4 whitespace-nowrap">
                          {startIndexbillingz+ index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.LocalBillingCode ? bill.LocalBillingCode : <>&nbsp;</>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.LocalBillingName ? bill.LocalBillingName : <>&nbsp;</>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                              {bill.BillingInitial ? bill.BillingInitial : <>&nbsp;</>}
                            </div>
                          </td>
                        </tr>
                                    ) 
                                  ) : (
                                    <tr className=" bg-neutral text-sm">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    { reload === true ? <CircularProgress size="30px" className="text-error text-lg" /> : ""}
                                    </td>
                                  </tr>
                                  
                                  )}
                  </tbody>
                </table>
                {billingz ? (
            <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
              <div className="flex justify-between text-right">
                <div className="text-right">
                  <h1 className="text-lg">
                    Showing {startIndexbillingz + 1} to {endIndexbillingz} of{" "}
                    {billingz ? billingz.length : ""} entries.
                  </h1>
                </div>
              </div>
              <div className="text-right text-base-100 ">
                {/* <div className="text-left text-base-100"> */}

                {currentPagebillingz > 1 && (
                  <div
                    onClick={handlePreviousPagebillingz}
                    className="btn btn-primary "
                  >
                    <BiFirstPage className="text-base-100 text-xl text-right" />
                  </div>
                )}
                {endIndexbillingz < currentDatabillingz.length && (
                  <div
                    onClick={handleNextPagebillingz}
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


      {/* {showModalPro ? (
        <>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-3xl font-bold mb-4 text-error">
              ลงทะเบียนช้สิทธิ์สำเร็จ
              </h2>

            </div>
          </div>
        </>
      ) : (
        ""
      )} */}
    </>
  );
}
