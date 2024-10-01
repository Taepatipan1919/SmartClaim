"use client";
import { useState, useEffect , useRef } from "react";
import axios from "axios";
import { Box , TextField } from '@mui/material';
import { ImBin } from "react-icons/im";
import { IoIosDocument } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { MdCancel } from "react-icons/md";
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaEdit } from "react-icons/fa";
import { FaCirclePlus , FaCircleMinus  } from "react-icons/fa6";
 import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
 import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
 import { DatePicker } from '@mui/x-date-pickers/DatePicker';
 import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Page({data}) {
  const error = {
    response : {
      data : {
          "HTTPStatus": {
                "statusCode": "",
                "message": "",
                "error": ""
     },
      },
    },
  }  
  const InsuranceCode = 13;
  const [showFormError, setShowFormError] = useState("");
  const [patien, setPatien] = useState();
  const [visit, setVisit] = useState();
  const [accidentDetail, setAccidentDetail] = useState();
  const [accidentPlaceValue, setAccidentPlaceValue] = useState("");
  const [over45Days, setOver45Days] = useState("");
  const [over45, setOver45] = useState("");
  const [dataaccidentPlace, setDataaccidentPlace] = useState("");
  const [datainjurySide, setDatainjurySide] = useState("");
  const [injurySide, setInjurySide] = useState("");
  const [DataWoundType, setDataWoundType] = useState("");
  const [woundType, setWoundType] = useState("");
  const [vitalsign, setVitalsign] = useState();
  const [value, setValue] = useState(null);
  const [doctor, setDoctor] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [procedure, setProcedure] = useState();
  const [investigation, setInvestigation] = useState();
 const [billing, setBilling] = useState();
  const [orderItemz, setOrderItemz] = useState();
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [bmi, setBmi] = useState("");
  const inputRef = useRef(null);
  const [ file , setFile ] = useState(null);
  const [ progress , setProgress ] = useState({ started: false, pc: 0 });
  const [ msg , setMsg ] = useState(null);
  const [massDocError, setMassDocError] = useState("");
  const [showDocError, setShowDocError] = useState("");
  const [billList, setBillList] = useState("");
  const [base64 , setBase64] = useState("");
  const [massSummitError, setMassSummitError] = useState("");
  const [showSummitError, setShowSummitError] = useState("");
  const [massSummit, setMassSummit] = useState("");
  const [otherInsurer, setOtherInsurer] = useState("false");
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({ Icd9: '', ProcedureName: '', ProcedureDate: '' });

  const [freetext , setFreeText] = useState();
  const AccidentPlace = (event) => {
    setAccidentPlaceValue(event.target.value);
  }
  const InjurySide = (event) => {
    setInjurySide(event.target.value);
  }
  const WoundType = (event) => {
    setWoundType(event.target.value);
  }
  const Over45 = (event) => {
    setOver45(event.target.value);
  }
const PatientInfo = {
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
    ChiefComplaint:"",
    PresentIllness:"",
    AccidentDate: data.DataTran.Data.AccidentDate,
    AccidentPlaceCode: "",
    WoundDetails: "",
    AccidentInjurySideCode: "",
    AccidentInjuryWoundtypeCode: "",
    PolicyTypeCode: data.DataTran.Data.PolicyTypeCode,
    ServiceSettingCode: data.DataTran.Data.ServiceSettingCode, 
    IllnessTypeCode: data.DataTran.Data.IllnessTypeCode,
    SurgeryTypeCode:  data.DataTran.Data.SurgeryTypeCode,
    FurtherClaimNo : data.DataTran.Data.FurtherClaimNo,
    FurtherClaimId : data.DataTran.Data.FurtherClaimId,
  }
  useEffect(() => {
  if (inputRef.current) {
    inputRef.current.value = '';
  }
  setProgress({ started: false, pc: 0 });
  setMsg(null)
  setBillList("");
  axios
    .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/utils/getlistDocumentName",{
      RefId : PatientInfo.RefId,
      TransactionNo : PatientInfo.TransactionNo,
      HN : PatientInfo.HN,
      VN : PatientInfo.VN,
    })
    .then((response) => {
      setBillList(response.data);
    })
    .catch((error) => {
              console.log(error)
              try{
                const ErrorMass = error.config.url
                const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
                setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
                setShowFormError("Error")
              }
              catch (error) {
                 setMassError(error.response.data.HTTPStatus.message);
                 setShowFormError("Error");
             }
           })  
}, []);
  useEffect(() => {
        axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/getOPDDischargePatient",{
        PatientInfo
      })
      .then((response) => {
        setPatien(response.data);
      })
      .catch((error) => {
        console.log(error)
        try{
          const ErrorMass = error.config.url
          const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
          setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
          setShowFormError("Error")
        }
        catch (error) {
           setMassError(error.response.data.HTTPStatus.message);
           setShowFormError("Error");
       }
  });
  }, []);

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_PD2 + "v1/utils/AccidentCauseOver45Day/" + InsuranceCode,{
      PatientInfo
    })
    .then((response) => {
      setOver45Days(response.data);

    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });
  }, []);

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/getOPDDischargeVisit",{
      PatientInfo
    })
    .then((response) => {
      setVisit(response.data);

    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });

  }, []);
  const combinedString = visit?.Result?.VisitInfo
    ? `${visit.Result.VisitInfo.Weight} / ${visit.Result.VisitInfo.Height}`
    : '';

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-opddischarge/getOPDDischargeAccident",{
      PatientInfo
    })
    .then((response) => {
      //  console.log(response.data.Result.AccidentDetail.AccidentDate)
      setAccidentDetail(response.data);
      const dateValue = dayjs(PatientInfo.AccidentDate);

      setValue(dateValue);

    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });

  }, []);

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_PD + "v1/utils/accidentPlace/" + InsuranceCode,{
      PatientInfo
    })
    .then((response) => {
      setDataaccidentPlace(response.data);

    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });

  }, []);
  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_PD + "v1/utils/InjurySide/" + InsuranceCode,{
      PatientInfo
    })
    .then((response) => {
      setDatainjurySide(response.data);

    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });

  }, []);

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_PD + "v1/utils/InjuryWoundtype/" + InsuranceCode,{
      PatientInfo
    })
    .then((response) => {
      setDataWoundType(response.data);


    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });

  }, []);

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-opddischarge/getOPDDischargeVitalSign",{
      PatientInfo
    })
    .then((response) => {
      setVitalsign(response.data);

    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });
  }, []);

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-opddischarge/getOPDDischargeDoctor",{
      PatientInfo
    })
    .then((response) => {
      setDoctor(response.data);

    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
    });
  }, []);


  useEffect(() => {
    axios
     .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-opddischarge/getOPDDischargeDiagnosis",{
        PatientInfo
      })
      .then((response) => {
        setDiagnosis(response.data);
      })
      .catch((error) => {
        console.log(error)
        try{
          const ErrorMass = error.config.url
          const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
          setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
          setShowFormError("Error")
        }
        catch (error) {
           setMassError(error.response.data.HTTPStatus.message);
           setShowFormError("Error");
       }
  });
}, []);
  useEffect(() => {
    axios
      .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-opddischarge/getOPDDischargeProcedure",{
        PatientInfo
      })
      .then((response) => {
        setProcedure(response.data);
      })
      .catch((error) => {
        console.log(error)
        try{
          const ErrorMass = error.config.url
          const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
          setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
          setShowFormError("Error")
        }
        catch (error) {
           setMassError(error.response.data.HTTPStatus.message);
           setShowFormError("Error");
       }
  });
}, []);
const handleAddRow = () => {
  setRows([...rows, newRow]);
  setNewRow({ Icd9: '', ProcedureName: '', ProcedureDate: '' });
};

const handleDeleteRow = (index) => {
  const newRows = rows.filter((_, i) => i !== index);
  setRows(newRows);
};

//console.log(procedure)
useEffect(() => {
  axios
    .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-opddischarge/getOPDDischargeInvestigation",{
      PatientInfo
    })
    .then((response) => {
      setInvestigation(response.data);
    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
});
}, []);

useEffect(() => {
  axios
    .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/getOPDDischargeOrderItem",{
      PatientInfo
    })
    .then((response) => {
      setOrderItemz(response.data);
    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
});
}, []);

useEffect(() => {
  axios
    .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/getOPDDischargeBilling",{
      PatientInfo
    })
    .then((response) => {
      setBilling(response.data);
    })
    .catch((error) => {
      console.log(error)
      try{
        const ErrorMass = error.config.url
        const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        setMassError(error.code +" - "+error.message +" - "+ErrorMass2);
        setShowFormError("Error")
      }
      catch (error) {
         setMassError(error.response.data.HTTPStatus.message);
         setShowFormError("Error");
     }
});
}, []);

const DocumentBase64 = (data) => {

  setMsg();
  setProgress({ started: false, pc: 0 });


  // console.log(PatientInfo.RefId)
  // console.log(PatientInfo.TransactionNo)
  // console.log(PatientInfo.HN)
  // console.log(PatientInfo.VN)

  axios
    .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/utils/getDocumentByDocname"
       ,{
      RefId : PatientInfo.RefId,
      TransactionNo : PatientInfo.TransactionNo,
      HN : PatientInfo.HN,
      VN : PatientInfo.VN,
      DocumentName : data,
     }
  )
    .then((response) => {
     setBase64(response.data);
     
 

     const base64ToBlob = (base64, type = 'application/pdf') => {
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
        console.log(error)
        try{
          const ErrorMass = error.config.url
          const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
          setMassDocError(error.code +" - "+error.message +" - "+ErrorMass2);
          setShowDocError("Error")
        }
        catch (error) {
          setMassDocError("Error ในการเปิดไฟล์");
           setShowDocError("Error");
       }

           })  
}


// กดปุ่มส่งเคลม
  const Claim = (event) => {
    event.preventDefault();
    if (rows.length > 0) {
      const firstRow = rows;
      console.log(firstRow);
    } else {
      console.log('No rows to save');
    }

//     const Datevalue = dayjs(value.$d).format('YYYY-MM-DD');

// if(PatientInfo.IllnessTypeCode === "ACC" || PatientInfo.IllnessTypeCode === "ER"){
//  // console.log(PatientInfo)

//  document.getElementById("my_modal_3").showModal();

//   const Data = {
//     "PatientInfo" : {
//       InsurerCode: PatientInfo.InsurerCode,
//       RefId: PatientInfo.RefId,
//       TransactionNo : PatientInfo.TransactionNo,
//       PID : PatientInfo.PID,
//       HN : PatientInfo.HN,
//       GivenNameTH : PatientInfo.GivenNameTH,
//       SurnameTH: PatientInfo.SurnameTH,
//       DateOfBirth: PatientInfo.DateOfBirth,
//       PassportNumber: PatientInfo.PassportNumber,
//       IdType: PatientInfo.IdType,
//       VN:  PatientInfo.VN,
//       VisitDateTime: PatientInfo.VisitDateTime,
//       AccidentDate: Datevalue,
//       AccidentPlaceCode:  accidentPlaceValue,
//       AccidentInjuryWoundtypeCode:  woundType,
//       AccidentInjurySideCode: injurySide,
//       WoundDetails: event.target.commentOfInjuryText.value,
//       PolicyTypeCode: PatientInfo.PolicyTypeCode,
//       ServiceSettingCode: PatientInfo.ServiceSettingCode, 
//       IllnessTypeCode: PatientInfo.IllnessTypeCode,
//       SurgeryTypeCode:  PatientInfo.SurgeryTypeCode,
//       ChiefComplaint: visit.Result.VisitInfo.ChiefComplaint,
//       PresentIllness: event.target.PresentIllnessText.value,
//       AccidentCauseOver45Days : over45,
//       DxFreeText : event.target.DxFreeTextText.value,
//       FurtherClaimId : PatientInfo.FurtherClaimId,
//       FurtherClaimNo : PatientInfo.FurtherClaimNo,
//       OtherInsurer : otherInsurer
//     },
//   };

//   console.log(Data.PatientInfo)
//   axios
//     .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-opddischarge/sentOPDDischarge",
//       Data
  
//     )
//     .then((response) => {
//       //setOrderItemz(response.data);
//       console.log(response.data.Message)
//       setMassSummit(response.data.Message)

//     })
//     .catch((err) => {
//      // console.error("Error", err)
//       console.log(err)

//       setshowSummitError("Error")
//       setMassSummitError("Error")
// });


// }else{

//   document.getElementById("my_modal_3").showModal();

//   const Data = {
//     "PatientInfo" : {
//       InsurerCode: PatientInfo.InsurerCode,
//       RefId: PatientInfo.RefId,
//       TransactionNo : PatientInfo.TransactionNo,
//       PID : PatientInfo.PID,
//       HN : PatientInfo.HN,
//       GivenNameTH : PatientInfo.GivenNameTH,
//       SurnameTH: PatientInfo.SurnameTH,
//       DateOfBirth: PatientInfo.DateOfBirth,
//       PassportNumber: PatientInfo.PassportNumber,
//       IdType: PatientInfo.IdType,
//       VN:  PatientInfo.VN,
//       VisitDateTime: PatientInfo.VisitDateTime,
//       AccidentDate: Datevalue,
//       AccidentPlaceCode:  accidentPlaceValue,
//       AccidentInjuryWoundtypeCode:  woundType,
//       AccidentInjurySideCode: injurySide,
//       WoundDetails: "",
//       PolicyTypeCode: PatientInfo.PolicyTypeCode,
//       ServiceSettingCode: PatientInfo.ServiceSettingCode, 
//       IllnessTypeCode: PatientInfo.IllnessTypeCode,
//       SurgeryTypeCode:  PatientInfo.SurgeryTypeCode,
//       ChiefComplaint: visit.Result.VisitInfo.ChiefComplaint,
//       PresentIllness: event.target.PresentIllnessText.value,
//       AccidentCauseOver45Days : over45,
//       DxFreeText : event.target.DxFreeTextText.value,
//       FurtherClaimId : PatientInfo.FurtherClaimId,
//       FurtherClaimNo : PatientInfo.FurtherClaimNo,
//       OtherInsurer : otherInsurer
//     },
//   };

//   console.log(Data.PatientInfo)

//   axios
//     .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-opddischarge/sentOPDDischarge",
//       Data
  
//     )
//     .then((response) => {
//       //setOrderItemz(response.data);



//       console.log(response.data.Message)
//       setMassSummit(response.data.Message)



//     })
//     .catch((err) => {
//      // console.error("Error", err)
//       console.log(err)

//       setshowSummitError("Error")
//       setMassSummitError("Error")
// });


// }
 

    // setShowModal(true)


    // setTimeout(() => {
    //   setShowModal(false)
    //   router.push('/aia/opd/checkClaimStatus');
    // }, 5000);

  };


  const handleUpload = async () => {
    if (!file){
      setMsg(<div role="alert" className="alert alert-error text-base-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current "
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>กรุณา เลือก Upload File</div>);
      return;
    }
    setMsg();
    setShowDocError();
    setProgress({ started: false, pc: 0 });
    const formData = new FormData();
    formData.append('file', file);
     formData.append('RefId', PatientInfo.RefId);
     formData.append('TransactionNo', PatientInfo.TransactionNo);
     formData.append('HN', PatientInfo.HN);
     formData.append('VN', PatientInfo.VN); 
     formData.append('DocumenttypeCode', "001");  
     setMsg(<span className="loading loading-spinner text-info loading-lg"></span>);
     setProgress(prevState => {
       return { ...prevState, started: true }
     })
     try{
     const response = await axios.post(process.env.NEXT_PUBLIC_URL_PD2 +  "v1/utils/uploadDocuments", formData, {
           onUploadProgress: (progressEvent) => {  setProgress(prevState => {
             return { ...prevState, pc: progressEvent.progress*100 }
           })},
           headers: {
             "Content-Type": "multipart/form-data",
           }
         })
         setProgress({ started: false, pc: 0 });
         setMsg(<div role="alert" className="alert alert-success text-base-100">
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
           Upload Successful
           </div>)
   axios
   .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/utils/getlistDocumentName",{
     RefId : PatientInfo.RefId,
     TransactionNo : PatientInfo.TransactionNo,
     HN : PatientInfo.HN,
     VN : PatientInfo.VN,
   })
   .then((response) => {
     setBillList(response.data);
     //console.log(response.data)
   })
   .catch((error) => {
    console.log(error)
    try{
      const ErrorMass = error.config.url
      const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
      setMassDocError(error.code +" - "+error.message +" - "+ErrorMass2);
      setShowDocError("Error")
    }
    catch (error) {
       setMassDocError(error.response.data.HTTPStatus.message);
       setShowDocError("Error");
   }
          })  
     
     } catch (error){
       setProgress({ started: false, pc: 0 });
       console.log(error)
       setMsg(<div role="alert" className="alert alert-error text-base-100">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6 shrink-0 stroke-current "
           fill="none"
           viewBox="0 0 24 24">
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         {error.message}
         </div>)
     }





  }
  const handleOtherInsurer = (e) => {
    setOtherInsurer(e.target.value);
  };


  const CustomTextField = styled(TextField)({
    '& .MuiInputBase-input.Mui-disabled': {
      color: 'black', // เปลี่ยนสีข้อความเป็นสีดำ
      cursor: 'default', // เปลี่ยนเคอร์เซอร์เป็นแบบปกติ
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
            ) : ""
            }
      {patien ? (
        <>
          <form onSubmit={Claim}>
            {patien ? (
            <div className="justify-center border-solid w-4/5 m-auto border-2 border-warning rounded-lg p-4">
              <h1 className="font-black text-accent text-3xl ">
                Patient Info
              </h1>
              <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
                <div className="rounded-md">
          <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0}}>
                  <CustomTextField  id="disabledInput" label="FirstName (TH)" defaultValue={patien.Result.PatientInfo.FirstName} className="w-full text-black rounded disabled:text-black disabled:bg-gray-300 cursor-not-allowed"  InputProps={{readOnly: true,}}/>
        </Box>
                </div>
                <div className="rounded-md">
         <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                  <CustomTextField  id="disabledInput" label="LastName (TH)" defaultValue={patien.Result.PatientInfo.LastName} className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"  InputProps={{readOnly: true,}}/>
        </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                <CustomTextField  id="disabledInput" label="PID" defaultValue={PatientInfo.PID} className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" InputProps={{readOnly: true,}}/>
        </Box>
                </div>
              {PatientInfo.PassportNumber ? (
                  <div className="rounded-md">
               <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                    <CustomTextField  id="disabledInput" label="Passport" defaultValue={PatientInfo.PassportNumber} className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" InputProps={{readOnly: true,}}/>
        </Box>
                  </div>
                ) : ""} 
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                <CustomTextField  id="disabledInput" label="Date of Birth (YYYY-MM-DD)" defaultValue={patien.Result.PatientInfo.DOB} className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"  InputProps={{readOnly: true,}}/>
        </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                <CustomTextField  id="disabledInput" label="HN" defaultValue={PatientInfo.HN} className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"  InputProps={{readOnly: true,}}/>
           </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                <CustomTextField  id="disabledInput" label="Sex" defaultValue={patien.Result.PatientInfo.Gender} className="w-full text-black rounded disabled:text-black disabled:bg-gray-300"  InputProps={{readOnly: true,}}/>
           </Box>
                </div>
              </div>
            </div>
            ) : ""}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {visit ? (
             <div className="container mx-auto justify-center border-solid w-4/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">
              Visit
              </h1>
              <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
              <div className="rounded-md"> 
               <div className="flex items-center ">
              {PatientInfo.FurtherClaimNo ? <>  
                                      <input
                                      type="radio"
                                      id="OtherInsurer"
                                      name="OtherInsurer"
                                      value={otherInsurer}
                                      className="checkbox "
                                      onChange={handleOtherInsurer}
                                      disabled 
                               />
                            <p className="text-left ml-2">รักษาครั้งแรก</p>
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
                            <p className="text-left ml-2">รักษาแบบต่อเนื่อง</p>
                         
                        </> : <>
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
                <p className="text-left ml-2">รักษาครั้งแรก</p>
                <input
                          type="radio"
                          id="OtherInsurer"
                          name="OtherInsurer"
                          value={otherInsurer}
                          className="checkbox  ml-2"
                          onChange={handleOtherInsurer}
                          disabled 
                   />
                <p className="text-left ml-2">รักษาแบบต่อเนื่อง</p>
                        </>}
                   </div> 
              </div>
              <div className="rounded-md">
                <div className="flex items-center ">
                 <input
                        type="checkbox"
                        id="OtherInsurer"
                        name="OtherInsurer"
                        value={otherInsurer}
                        className="checkbox checkbox-info"
                        onChange={handleOtherInsurer}
                 />
              <p className="text-left">&nbsp;ค่าส่วนเกินจากประกันอื่นๆ</p>
                </div>
              </div>
              <div className="rounded-md"> </div>
              <div className="rounded-md"> </div>
                <div className="rounded-md">
              <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="VN" variant="standard" value={visit.Result.VisitInfo.VN} /> */}
                <CustomTextField  id="disabledInput" label="VN"  className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" defaultValue={visit.Result.VisitInfo.VN} InputProps={{readOnly: true,}}/>
           </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="VisitDateTime" variant="standard" value={visit.Result.VisitInfo.VisitDateTime} /> */}
                <CustomTextField  id="disabledInput"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="VisitDateTime" defaultValue={visit.Result.VisitInfo.VisitDateTime} InputProps={{readOnly: true,}}/>
                </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="อาการสำคัญที่มาโรงพยาบาล" variant="standard" value={visit.Result.VisitInfo.ChiefComplaint} /> */}
                <CustomTextField  id="disabledInput"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="อาการสำคัญที่มาโรงพยาบาล" defaultValue={visit.Result.VisitInfo.ChiefComplaint} InputProps={{readOnly: true,}}/>
                </Box>
                </div>
                <div className="rounded-md text-black">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black w-1/2" label="ส่วนสูง" variant="standard" value={visit.Result.VisitInfo.Height} />
                <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black w-1/2" label="น้ำหนัก" variant="standard" value={visit.Result.VisitInfo.Weight} /> */}
                <CustomTextField  id="disabledInput"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="น้ำหนัก / ส่วนสูง" defaultValue={combinedString} InputProps={{readOnly: true,}}/>
                </Box>
                </div>
                {PatientInfo.FurtherClaimNo ? (
                <div className="rounded-md text-black">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                <CustomTextField  id="disabledInput"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="ประวัติการรักษาครั้งก่อนหน้า เลขที่อ้างอิง" defaultValue={PatientInfo.FurtherClaimNo} InputProps={{readOnly: true,}}/>
                </Box>
                </div>
                ) : ""}
                </div>
                <div className="rounded-md w-full border-2 mt-3">
                
                {/* <TextField id="standard-basic" className="w-full" label="ข้อวินิจฉัยโรค" variant="standard" value={visit.Result.Visit.DxFreeText} /> */}
                <TextField
                error
                className="w-full"
          id="outlined-multiline-static"
          label="ข้อวินิจฉัยโรค"
          name="DxFreeTextText"
          multiline
          rows={4}
          defaultValue={visit.Result.VisitInfo.DxFreeText}
          inputProps={{ maxLength: 200 }}
          required
        />
                </div>
                <div className="rounded-md mt-3">
                <TextField
                error
                className="w-full"
                name="PresentIllnessText"
          id="outlined-multiline-static"
          label="ประวัติเจ็บป่วยปัจจุบัน รายละเอียดอาการ และประวัติที่เกี่ยวข้อง"
          multiline
          rows={4}
          defaultValue={visit.Result.VisitInfo.PresentIllness}
          inputProps={{ maxLength: 500 }}
          required
        />
                </div>
            
            </div> 
            ) : ""}
              {/* //////////////////////////////////////////////////////////////////////////// */}
              {PatientInfo.IllnessTypeCode === "ACC" || PatientInfo.IllnessTypeCode === "ER" ? (accidentDetail ? (
              <div className="justify-center border-solid w-4/5 m-auto border-2 border-error rounded-lg p-4 mt-2">
              <h1 className="font-black text-error text-3xl ">
              AccidentDetail
              </h1>
              <div className="flex  w-full ">
                <div className="w-1/5 ">
                <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoItem  >
        <DesktopDatePicker   value={value} onChange={(newValue) => setValue(newValue)} format="YYYY-MM-DD"/>
      </DemoItem>
    </LocalizationProvider>
    
                </div>
                <div className="w-2/5">
                <FormControl fullWidth>
        <InputLabel id="demo-error-select-label">สถานที่เกิดอุบัติเหตุ</InputLabel>
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
          {dataaccidentPlace
                ? dataaccidentPlace.map((acc, index) => (
                    <MenuItem key={index} value={acc.accidentplacecode}>{acc.accidentplacename}</MenuItem>
                  ))
                : ""}
        </Select>
      </FormControl>
                </div>
              <div className="w-2/5">
          <TextField
          error
          className="w-full mx-2"
          id="outlined-error"
          label="เกิดอุบัติเหตุว่ามีลักษณะบาดแผลอย่างไร"
          name="commentOfInjuryText"
          defaultValue=""
          inputProps={{ maxLength: 200 }}
          required
        />
                </div> 
              </div>
              <div className="flex  w-full mt-4">
                <div className="w-1/5">
                <FormControl fullWidth>
        <InputLabel id="demo-error-select-label">ข้างที่ได้รับบาดเจ็บ</InputLabel>
        <Select
        error
          labelId="demo-error-select-label"
          id="demo-error-select"
          value={injurySide}
          label="ข้างที่ได้รับบาดเจ็บ"
          onChange={InjurySide}
          //name="injurySideText"
          required
        >
          {datainjurySide
                ? datainjurySide.map((inj, index) => (
                    <MenuItem key={index} value={inj.injurysidecode}>{inj.injurysidename} - {inj.injurysidecode}</MenuItem>
                  ))
                : ""}
        </Select>
      </FormControl>
                </div>
                <div className="w-2/5">
                <FormControl fullWidth>
        <InputLabel id="demo-error-select-label">ลักษณะบาดแผลที่ได้รับจากการเกิดอุบัติเหตุ</InputLabel>
        <Select
        error
        className="mx-2"
          labelId="demo-error-select-label"
          id="demo-error-select"
          //name="woundTypeText"
          value={woundType}
          label="ลักษณะบาดแผลที่ได้รับจากการเกิดอุบัติเหตุ"
          onChange={WoundType}
          required
        >
          {DataWoundType
                ? DataWoundType.map((wound, index) => (
                    <MenuItem key={index} value={wound.woundtypecode}>{wound.woundtypename}</MenuItem>
                  ))
                : ""}
        </Select>
      </FormControl>
                </div>
                <div className="w-2/5">
              <FormControl fullWidth>
        <InputLabel id="demo-error-select-label">สาเหตุของการมารับการรักษาเกิน 45 วัน จากการเกิดอุบัติเหตุ</InputLabel>
        <Select
        error
        className="w-full mx-2"
          labelId="demo-error-select-label"
          id="demo-error-select"
          //name="woundTypeText"
          value={over45}
          label="สาเหตุของการมารับการรักษาเกิน 45 วัน จากการเกิดอุบัติเหตุ"
          onChange={Over45}
          required
        >
          {over45Days
                ? over45Days.map((over, index) => (
                    <MenuItem key={index} value={over.CauseOverCode}>{over.CauseOverDesc}</MenuItem>
                  ))
                : ""}
        </Select>
      </FormControl> 
                </div>
              </div>
            </div> 
            ) : ""  ) : ""}
              {/* //////////////////////////////////////////////////////////////////////////// */}
              <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
                <h1 className="font-black text-accent text-3xl ">VitalSign</h1>
                <div className="overflow-x-auto">
  <table className="table table-zebra mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th className="">วันเวลาที่วัดสัญญาณชีพ</th>
                      <th>ค่าความดันโลหิตตัวล่าง</th>
                      <th>การเต้นของชีพจร</th>
                      <th>ความเข้มข้นของออกซิเจนในเลือด</th>
                      <th>คะแนนระดับของความเจ็บปวด</th>
                      <th>อัตราการหายใจ</th>
                      <th>ค่าความดันโลหิตตัวบน</th>
                      <th>อุณหภูมิร่างกาย</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitalsign
                        ? vitalsign.Result.VitalSignInfo.map((vts, index) => (
                            <tr
                              key={index}
                              className=" bg-neutral text-sm"
                            >
                              <td>{vts.VitalSignEntryDateTime ? index + 1 : ""}</td>
                              <td>{vts.VitalSignEntryDateTime}</td>
                              <td>
                                {vts.DiastolicBp +
                                  " " +
                                  (vts.DiastolicBp === "" ? "" : "mmHg")}
                              </td>
                              <td>
                                {vts.HeartRate +
                                  " " +
                                  (vts.HeartRate === "" ? "" : "bpm")}
                              </td>
                              <td>
                                {vts.OxygenSaturation +
                                  " " +
                                  (vts.OxygenSaturation === "" ? "" : "%")}
                              </td>
                              <td>
                                {vts.PainScore +
                                  " " +
                                  (vts.PainScore === "" ? "" : "")}
                              </td>
                              <td>
                                {vts.RespiratoryRate +
                                  " " +
                                  (vts.RespiratoryRate === "" ? "" : "bt/min")}
                              </td>
                              <td>
                                {vts.SystolicBp +
                                  " " +
                                  (vts.SystolicBp === "" ? "" : "mmHg")}
                              </td>
                              <td>
                                {vts.Temperature +
                                  " " +
                                  (vts.Temperature === "" ? "" : "℃")}
                              </td>
                            </tr>
                          ))
                        : <tr><td></td></tr>
                      }
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
                <h1 className="font-black text-accent text-3xl ">Doctor</h1>
                <div className="overflow-x-auto">
  <table className="table table-zebra mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th className="">เลขใบประกอบวิชาชีพแพทย์ผู้ให้การรักษา</th>
                      <th>ชื่อ - นามสกุล แพทย์ผู้ให้การรักษา</th>
                      <th>สถานะของแพทย์ผู้ให้การรักษา</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctor
                        ? doctor.Result.DoctorInfo.map((dc, index) => (
                            <tr
                              key={index}
                              className=" bg-neutral text-sm"
                            >
                              <td>{dc.DoctorLicense ? index + 1 : ""}</td>
                              <td>{dc.DoctorLicense}</td>
                              <td>
                                {dc.DoctorFirstName}
                              </td>
                              <td>
                                {dc.DoctorRole}
                              </td>
                              
                            </tr>
                          ))
                        : <tr><td></td></tr>
                      }
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
                <h1 className="font-black text-accent text-3xl ">Diagnosis</h1>
                <div className="overflow-x-auto">
  <table className="table table-zebra mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th></th>
                      <th>รหัส</th>
                      <th className="">ชื่อของการวินิจฉัยโรค</th>
                      <th>ชนิดของการวินิจฉัยโรค</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {diagnosis
                  ? diagnosis.Result.DiagnosisInfo.map((dns, index) => (
                            <tr
                              key={index}
                              className=" bg-neutral text-sm"
                            >
                              <td>{dns.DxCode ? index + 1 : ""}</td>
                              <td>
                                {dns.DxCode}
                              </td>
                              <td>{dns.DxName}</td>
                              <td>
                                {dns.Dxtypenameinsurance}
                              </td>
                       
                            </tr>
                          ))
                        : (
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                        )
                      }
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
             {procedure ? (PatientInfo.SurgeryTypeCode === "Y" ? (
               <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Procedure <Button className="btn btn-secondary text-base-100 text-xl"><FaEdit /></Button></h1>
              
                <TableContainer component={Paper} className="mt-2">
      <Table className="table">
        <TableHead>
          <TableRow className="bg-primary">
          <TableCell className="w-2"></TableCell>
            <TableCell className="text-base-100  text-sm w-1/5 text-center">Icd 9 Code ของหัตถการหรือการผ่าตัด</TableCell>
            <TableCell className="text-base-100  text-sm w-3/5 text-center">ชื่อของหัตถการหรือการผ่าตัด</TableCell>
            <TableCell className="text-base-100  text-sm w-1/5 text-center">วันที่ทำหัตถการหรือทำการผ่าตัด</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell ><div className="rounded-full px-3 py-2 border-2 bg-neutral break-all ">{row.Icd9}</div></TableCell>
              <TableCell><div className="rounded-full px-3 py-2 border-2 bg-neutral break-all">{row.ProcedureName}</div></TableCell>
              <TableCell><div className="rounded-full px-3 py-2 border-2 bg-neutral break-all">{row.ProcedureDate}</div></TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteRow(index)} className="btn btn-error text-base-100 text-xl"><FaCircleMinus /></Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell >
            </TableCell>
            <TableCell>
              <TextField
                className="bg-base-100 w-full"
                value={newRow.Icd9}
                onChange={(e) => setNewRow({ ...newRow, Icd9: e.target.value })}
                placeholder="Icd9"
               // required
              />
            </TableCell>
            <TableCell>
              <TextField
              className="bg-base-100 w-full"
               type="number"
                value={newRow.ProcedureName}
                onChange={(e) => setNewRow({ ...newRow, ProcedureName: e.target.value })}
                placeholder="ProcedureName"
             //   required
              />
            </TableCell>
            <TableCell>
              <TextField
              className="bg-base-100 w-full"
                type="date"
                value={newRow.ProcedureDate}
                onChange={(e) => setNewRow({ ...newRow, ProcedureDate: e.target.value })}
                placeholder="ProcedureDate"
             //   required
              />
            </TableCell>
            <TableCell>
              <Button onClick={handleAddRow} className="btn btn-success text-base-100 text-xl"><FaCirclePlus /></Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </TableContainer>
           </div>
            ) : "") : ""}
                    {/* //////////////////////////////////////////////////////////////////////////// */}
                     <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Investigation</h1>
              <div className="overflow-x-auto">
              <table className="table table-zebra mt-2">
                <thead>
                  <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                    <th></th>
                    <th>รหัสอ้างอิง</th>
                    <th>ชื่อกลุ่มของการตรวจทางห้องปฏิบัติการ</th>
                    <th>ชื่อของการตรวจทางห้องปฏิบัติการ</th>
                    <th>ผลของการตรวจทางห้องปฏิบัติการล</th>
                    <th>วันเวลาที่แสดงผลของการตรวจทางห้องปฏิบัติการ</th>
                  </tr>
                </thead>
                <tbody>
                          <tr>
                            <td>{investigation.Result.InvestigationInfo.InvestigationCode ? "1" : ""}</td>
                            <td>{investigation.Result.InvestigationInfo.InvestigationCode}</td>
                            <td>
                              {investigation.Result.InvestigationInfo.InvestigationGroup}
                            </td>
                            <td>
                              {investigation.Result.InvestigationInfo.InvestigationName}
                            </td>
                            <td>
                              {investigation.Result.InvestigationInfo.InvestigationResult}
                            </td>
                            <td>
                              {investigation.Result.InvestigationInfo.ResultDateTime}
                            </td>
                            
                          </tr>
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
              <h1 className="font-black text-accent text-3xl ">OrderItem</h1>
              <div className="overflow-x-auto">
              <table className="table table-zebra mt-2">
                <thead >
                  <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                    <th ></th>
                    <th >รหัสของรายการค่าใช้จ่าย</th>
                    <th >ชื่อรายการค่าใช้จ่าย</th>
                    <th >Code ของรายการค่าใช้จ่าย</th>
                    <th >ชื่อของรายการค่าใช้จ่าย</th>
                    <th >จำนวนปริมาณของรายการค่าใช้จ่าย</th>
                    <th >จำนวนเงินตั้งต้นของรายการค่าใช้จ่าย</th>
                    <th >จำนวนส่วนลดของรายการค่าใช้จ่าย</th>
                    <th >จำนวนเงินหลังหักส่วนลดของรายการค่าใช้จ่าย</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderItemz
                      ? orderItemz.Result.OrderItemInfo.map((order, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">{order.ItemId ? index + 1 : ""}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.ItemId}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.ItemName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.LocalBillingCode}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.LocalBillingName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.ItemAmount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.Initial}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.Discount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.NetAmount}
                            </td>
                          </tr>
                        ))
                      : <tr><td></td></tr>
                    }
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
              <h1 className="font-black text-accent text-3xl ">รายละเอียดค่ารักษาพยาบาล</h1>
              <div className="overflow-x-auto">
              <table className="table table-zebra mt-2">
                <thead >
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
                    {billing
                      ? billing.Result.BillingInfo.map((bill, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode ? index + 1 : ""}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.LocalBillingName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.BillingInitial}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.BillingDiscount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.BillingNetAmount}</td>
                          </tr>
                        ))
                      : <tr><td></td></tr>}
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
              <h1 className="font-black text-accent text-3xl ">รายละเอียดค่ารักษาพยาบาล</h1>
              <div className="overflow-x-auto">
              <table className="table table-zebra mt-2">
                <thead >
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
                    {billing
                      ? billing.Result.BillingInfo.map((bill, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode ? index + 1 : ""}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.LocalBillingName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.BillingInitial}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.BillingDiscount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bill.BillingNetAmount}</td>
                          </tr>
                        ))
                      : <tr><td></td></tr>}
                  </tbody>
                </table>
              </div> 
              <div className="grid gap-2 sm:grid-cols-4  bg-primary w-full whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md ">สรุปค่ารักษาพยาบาล</div>
                <div className="rounded-md ">฿ {billing ? billing.Result.TotalBillAmount : ""}</div> 
            </div> 
            </div> 
                  {/* //////////////////////////////////////////////////////////////////////////// */}
        <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Upload File</h1>
          <div className="overflow-x-auto mt-6">
                <div className="flex items-center ">
                            <input type="file" accept=".pdf" className="file-input file-input-bordered file-input-info w-5/6" onChange={ (e) => { setFile(e.target.files[0]) } } ref={inputRef}/> 
                            <div className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 w-1/6 ml-2" onClick={ handleUpload }>
                                <FaCloudUploadAlt className="size-6"/>
                            </div>
              </div>
              <div className="label">
    <span className="label-text-alt text-error text-sm">** Upload เฉพาะไฟล์ .PDF เท่านั้น ( ไม่เกิน 20 MB )**</span>
  </div>
              { progress.started && <progress max="100" value={progress.pc} className="progress progress-info mt-2 w-full"></progress> }
<br /> 
<h1 className="text-center">{ msg }</h1>
{showDocError === "Error" ? (
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
              <span>{massDocError}</span>
            </div>
            ) : ""
            }
              <table className="table table-zebra mt-2">
                <thead >
                  <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th className="w-2/5">ชื่อไฟล์</th>
                      <th className="w-1/5"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {billList
                      ? billList.map((list, index) => (
                          <tr
                             key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {list.filename}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="tooltip" data-tip="Document">
                              <div className="btn btn-warning  mr-2" type="submit" onClick={() => DocumentBase64(list.filename)}><IoIosDocument /></div>
                              </div>
                              <div className="tooltip" data-tip="Cancel Claim">
                              <div className="btn btn-error " type="submit"><MdCancel /></div>
                              </div>
                            </td>
                          </tr>
                    ))
                      : (
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
                            {billList.length === 0
                      ? null :  (
            <div className="py-2">
              <div className="text-right">
                
             <button
                  className="btn btn-primary text-base-100 hover:bg-base-100 hover:text-primary"
                  type="submit"
                >
                  ส่งการเรียกร้องค่าสินไหม
                </button>
                </div>
              </div>
        ) } 
          </div>
        </div>
         

    </form>
        </>
      ) : (
        <div className="pt-6 ">
          <div className="justify-center border-solid w-1/5 m-auto p-8 ">
            <center>
              <span className="loading loading-spinner text-error size-5 "></span>
            </center>
            <div className="justify-center text-4xl">Loading....</div>
          </div>
        </div>
      )}


<dialog id="my_modal_3" className="modal text-xl	">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            {showSummitError === "Error" ? (
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
              <span>{massSummitError}</span>
            </div>
            ) : (
              <>
         {massSummit ? (massSummit) : <center><span className="loading loading-spinner text-error size-10 "></span></center>}


          </>
            )}
          </form>
        </div>
        </dialog>




{showModal ? (
  <>
          {/* <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">ส่งเคลมเรียบร้อย</h2>
               
            </div>
        </div> */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-4xl font-bold mb-4 text-primary">ส่งเคลมเรียบร้อยแล้ว</h2>
           {/* <div className="text-center"> <span className="loading loading-bars loading-lg "></span></div> */}
          </div>
        </div>
  </>
) : ""}

    </>
  );
}




