"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { save } from "../../../store/counterSlice";
import { save2 } from "../../../store/patientSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button, Menu, MenuItem } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";
// import { RefreshIcon, ClipboardIcon, TrashIcon } from '@heroicons/react/outline';
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BiFirstPage, BiLastPage  } from "react-icons/bi";
import DetailDischarge from "./detailDischarge";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { HiDocumentSearch } from "react-icons/hi";
import Select from "@mui/material/Select";
export default function checkData() {
  const InsuranceCode = 13;
  //const ReDux = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  //const [statusAllNew, setStatusAllNew] = useState();
  const [selectedIdType, setSelectedIdType] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [billList, setBillList] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [currentData, setCurrentData] = useState("");
  const [billtype, setBilltype] = useState("");
  const [claimStatus, setClaimStatus] = useState("");
  const [docType, setDocType] = useState("");
  const [patientInfoDetail, setPatientInfoDetail] = useState();
  const [statusNew, setStatusNew] = useState({});
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [refIdL, setRefIdL] = useState("");
  const [pIDL, setPIDL] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [billValue, setBillValue] = useState("ทั้งหมด")
  const [passportNumberL, setPassportNumberL] = useState("");
  const [randomNumber, setRandomNumber] = useState('');
  const [transactionNoL, setTransactionNoL] = useState("");
  const [hNL, setHNL] = useState("");
  const [vNL, setVNL] = useState("");
  const [invoiceNumberL, setInvoiceNumberL] = useState("");
  const [serviceValue, setServiceValue] = useState("OPD");
  const [serviceCode, setServiceCode] = useState("");
  const [detailData, setDetailData] = useState("");
  const [showDocError, setShowDocError] = useState("");
  const [massDocError, setMassDocError] = useState("");
  const [base64, setBase64] = useState("");




  useEffect(() => {

    axios
    .get(
      process.env.NEXT_PUBLIC_URL_PD2 +
        process.env.NEXT_PUBLIC_URL_documentType +
        InsuranceCode
    )
    .then((response) => {
      setDocType(response.data);
    })
    .catch((err) => {
      // console.error("Error", err)
      console.log(err);
      //  if (err.response.request.status === 500) {
      setShowFormError("Error");
      setMassError(err.response.data.HTTPStatus.message);
    });

    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_claimStatus +
          InsuranceCode
      )
      .then((response) => {
        setClaimStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_ServiceSetting +
          InsuranceCode
      )
      .then((response) => {
        setServiceCode(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
const Billtype = [
  {
    Desc: "ทั้งหมด"
  },
  {
    Desc: "ยังไม่วางบิล"
  },
  {
    Desc: "วางบิลแล้ว"
  },
]
setBilltype(Billtype)

  const today = dayjs().format('YYYY-MM-DD');
  const  PatientInfo = {
      InsurerCode: InsuranceCode,
       IdType: "",
      InvoiceNumber: "",
      VN: "",
      PID: "",
      PassportNumber: "",
      HN: "",
      VisitDatefrom: today,
      VisitDateto: today,
      // VisitDatefrom: "",
      // VisitDateto: "",
      StatusClaimCode: "",
      ServiceSettingCode: serviceValue,
    };
    console.log(PatientInfo)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_SearchTransection,
        { PatientInfo }
      )
      .then((response) => {
        setPost(response.data);
        setCurrentData(response.data.Result.TransactionClaimInfo)
       // console.log(response.data)
       // setShowFormError();
      })
      .catch((error) => {
        console.log(error);

        setShowFormError("Error");
        setMassError(error.message);
      });
    }, []);

    const status = (event) => {
      setStatusValue(event.target.value);
    };
    const type = (event) => {
      setServiceValue(event.target.value);
    };
    const bill = (event) => {
      setBillValue(event.target.value);
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
    setBillList();
    setMsg();
    setShowDocError();
    setProgress({ started: false, pc: 0 });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("RefId", refIdL);
    formData.append("TransactionNo", transactionNoL);
    formData.append("HN", hNL);
    formData.append("VN", vNL);
    formData.append("insurerid", 13);
    formData.append("DocumenttypeCode", "003");
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
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        RefId: refIdL,
        TransactionNo: transactionNoL,
        PID: pIDL,
        HN: hNL,
        PassportNumber: passportNumberL,
        VN: vNL,
        DocumenttypeCode: "",
        DocumentName : "",
        Runningdocument : "",
      }
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD2 +
            process.env.NEXT_PUBLIC_URL_getlistDocumentName,
          {
            PatientInfo
          }
        )
        .then((response) => {
          setBillList(response.data);
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
  const DocumentList = (data) => {
    setShowDocError();
    const [
      RefId,
      TransactionNo,
      PID,
      PassportNumber,
      HN,
      VN,
      InvoiceNumber,
    ] = data.split(" | ");
    setRefIdL(RefId);
    setTransactionNoL(TransactionNo);
    setHNL(HN);
    setVNL(VN);
    setInvoiceNumberL(InvoiceNumber);
    setMsg(null);
    setPIDL(PID);
    setPassportNumberL(PassportNumber);

    const PatientInfo = {
      InsurerCode: InsuranceCode,
      RefId: RefId,
      TransactionNo: TransactionNo,
      PID: PID,
      PassportNumber: PassportNumber,
      HN: HN,
      VN: VN,
      DocumenttypeCode : "",
      Runningdocument : "",
    };

    console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_getlistDocumentName,
        { PatientInfo }
      )
      .then((response) => {
        setBillList(response.data);
        document.getElementById("my_modal_4").showModal();
      })
      .catch((err) => {
        // console.error("Error", err)
        console.log(err);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
        setMassError(err.response.data.HTTPStatus.message);
      });


 
  };
  const DelectSearch = () => {
    setNumberValue();
    setFromValue(null);
    setToValue(null);
  const today = dayjs().format('YYYY-MM-DD');
 const PatientInfo = {
InsurerCode: InsuranceCode,
IdType: "",
InvoiceNumber: "",
VN: "",
PID: "",
PassportNumber: "",
HN: "",
VisitDatefrom: today,
VisitDateto: today,
StatusClaimCode: statusValue,
ServiceSettingCode: serviceValue,
}; 

axios
  .post(
    process.env.NEXT_PUBLIC_URL_SV +
      process.env.NEXT_PUBLIC_URL_SearchTransection,
    { PatientInfo }
  )
  .then((response) => {
    setPost(response.data);
    console.log(response.data);
    setCurrentData(response.data.Result.TransactionClaimInfo);
    setShowFormError();
  })
  .catch((error) => {
    console.log(error);

    setShowFormError("Error");
    setMassError(error.message);
  });
};
  const Refresh = (data) => {
    setStatusNew()
    //setStatusAllNew();
    setShowFormError();
  //  setPost();
   // console.log("-Refresh-");
    // console.log(data)
    const [RefId, TransactionNo, PID, PassportNumber, HN, VN, 
      InvoiceNumber,PolicyTypeCode, IdType, IllnessTypeCode, ServiceSettingCode, SurgeryTypeCode, FurtherClaimNo, FurtherClaimId, AccidentDate, VisitDateTime] = data.split(" | ");
    const PatientInfo = {
      InsurerCode: InsuranceCode,
      RefId: RefId,
      TransactionNo: TransactionNo,
      PID: PID,
      PassportNumber: PassportNumber,
      HN: HN,
      VN: VN,
    };
   // console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
        { PatientInfo }
      )
      .then((response) => {
        console.log(response);

        if (response.data.HTTPStatus.statusCode === 200) {
          setStatusNew((prevData) => ({
            ...prevData,
            InsurerCode: response.data.Result.InsuranceData.InsurerCode,
            BatchNumber: response.data.Result.InsuranceData.BatchNumber,
            ClaimStatus: response.data.Result.InsuranceData.ClaimStatus,
            ClaimStatusDesc: response.data.Result.InsuranceData.ClaimStatusDesc,
            TotalApproveAmount: response.data.Result.InsuranceData.TotalApproveAmount,
            PaymentDate: response.data.Result.InsuranceData.PaymentDate,
            InvoiceNumber: response.data.Result.InsuranceData.InvoiceNumber,
            // HN : response.data.Result.InsuranceData.HN,
            // VN : response.data.Result.InsuranceData.VN,
          }));
        } else {
          setShowFormError("Error");
          setMassError(response.data.HTTPStatus.error);
        }
      })
      // setShowModal(true)
      // setTimeout(() => {
      //   setShowModal(false)
      //   //router.push('/aia/submitBilling');
      // }, 5000);
      // })
      .catch((error) => {
        // console.error("Error", error)
        console.log(error);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
         setMassError(error.response.data.HTTPStatus.message);
      });


  };

  const Detail = (data) => {
  //  console.log(data)
    setShowFormError();
    const [RefId, TransactionNo, PID, PassportNumber, HN, VN, 
      InvoiceNumber,PolicyTypeCode, IdType, IllnessTypeCode, ServiceSettingCode, SurgeryTypeCode, FurtherClaimNo, FurtherClaimId, AccidentDate, VisitDateTime] = data.split(" | ");
    setDetailData({
      RefId: RefId,
      TransactionNo: TransactionNo,
      HN: HN,
      VN: VN,
      GivenNameEN: "",
      GivenNameTH: "",
      IllnessType: "",
      SurnameEN: "",
      SurnameTH: "",
      TitleEN: "",
      TitleTH: "",
      VisitDateTime: VisitDateTime,
      IdType : IdType,
      PID: PID,
      PassportNumber: PassportNumber,
      SurgeryTypeCode: "",
      FurtherClaimNo: "",
      FurtherClaimId: "",
      DateOfBirth: "",
    });

  };

  const Cancel = (data) => {
    // setPost();
    setShowFormError();
    // console.log("-Cancel-")
    const isConfirmed = window.confirm("แน่ใจแล้วที่จะยกเลิกการเคลมใช่ไหม");
    if (isConfirmed) {
      const [RefId, TransactionNo, PID, PassportNumber, HN, VN] =
        data.split(" | ");
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        RefId: RefId,
        TransactionNo: TransactionNo,
        PID: PID,
        PassportNumber: PassportNumber,
        HN: HN,
        VN: VN,
      };

      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD +
            process.env.NEXT_PUBLIC_URL_getclaimcancel,
          { PatientInfo }
        )
        .then((response) => {
          console.log(response.data);

          if (response.data.HTTPStatus.statusCode === 200) {
            setMassCancel(response.data.Result.InsuranceData.Status);
            setShowFormCancel("Cancel");
          } else {
            setShowFormError("Error");
            setMassError(response.data.HTTPStatus.error);
          }
        })
        // setShowModal(true)
        // setTimeout(() => {
        //   setShowModal(false)
        //   //router.push('/aia/submitBilling');
        // }, 5000);
        // })
        .catch((error) => {
          // console.error("Error", error)
          console.log(error);
          //  if (err.response.request.status === 500) {
          setShowFormError("Error");
          setMassError(error.response.data.HTTPStatus.message);
        });
    }
  };

  const handleOptionChange = (e) => {
    setSelectedIdType(e.target.value);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowFormError();
    //setStatusAllNew();
    setPost();
    setMassError();
    let data = {};
    let dateToValue = "";
    let dateFromValue = "";
    let PatientInfo ="";

    if (fromValue && toValue) {
      dateFromValue = dayjs(fromValue.$d).format("YYYY-MM-DD");
      dateToValue = dayjs(toValue.$d).format("YYYY-MM-DD");
    }

    if (selectedIdType === "NATIONAL_ID" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: selectedIdType,
        InvoiceNumber: "",
        VN: numberValue,
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "PASSPORT_NO" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: selectedIdType,
        InvoiceNumber: "",
        VN: "",
        PID: "",
        PassportNumber: numberValue,
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "HOSPITAL_ID" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: selectedIdType,
        InvoiceNumber: "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: numberValue,
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "PID" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: selectedIdType,
        InvoiceNumber: "",
        VN: "",
        PID: numberValue,
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "Invoice" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: selectedIdType,
        InvoiceNumber: numberValue,
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (fromValue && toValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: "",
        InvoiceNumber: "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    }else if (statusValue) {
      if(fromValue && toValue){

        PatientInfo = {
          InsurerCode: InsuranceCode,
           IdType: "",
          InvoiceNumber: "",
          VN: "",
          PID: "",
          PassportNumber: "",
          HN: "",
          VisitDatefrom: dateFromValue,
          VisitDateto: dateToValue,
          StatusClaimCode: statusValue,
          ServiceSettingCode: serviceValue,
        };
      }else{

        const today = dayjs().format('YYYY-MM-DD');
           PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: "",
        InvoiceNumber: "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: today,
        VisitDateto: today,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      }; 
      }
    }else {
      
      const today = dayjs().format('YYYY-MM-DD');
      PatientInfo = {
   InsurerCode: InsuranceCode,
    IdType: "",
   InvoiceNumber: "",
   VN: "",
   PID: "",
   PassportNumber: "",
   HN: "",
   VisitDatefrom: today,
   VisitDateto: today,
   StatusClaimCode: statusValue,
   ServiceSettingCode: serviceValue,
 }; 
    }
      
    // else{
    //   setPost();
    //   setShowFormError("Error");
    //   setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
    // }
console.log(PatientInfo)
  

    if(PatientInfo){
      setPatientInfoDetail(PatientInfo)

     axios
       .post(
         process.env.NEXT_PUBLIC_URL_SV +
           process.env.NEXT_PUBLIC_URL_SearchTransection,
         { PatientInfo }
       )
       .then((response) => {
         setPost(response.data);
       //  console.log(response.data);
         setCurrentData(response.data.Result.TransactionClaimInfo)
         setShowFormError();
       })
       .catch((error) => {
         // console.error("Error", error)
         console.log(error);

         setShowFormError("Error");
         setMassError(error.message);
       });


      }else {
        setShowFormError("Error");
        setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
      }

  };

  const submitbilling = (event) => {
    // // // //ส่งบิล
    setMsg();

    setShowDocError();
    event.preventDefault();
    //วนลูบ DocList
    let filenames = {};
    filenames = billList.map((Bll) => Bll.documenttypecode === "003" &&({ DocName: Bll.filename }));
    
  
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_getbillingsubmission,
        { 
          PatientInfo : {
          InsurerCode: InsuranceCode,
          RefId: refIdL,
          TransactionNo: transactionNoL,
          VN: vNL,
          InvoiceNumber: invoiceNumberL,
          DocumenttypeCode  : "003",
          Runningdocument: "",
          AttachDocList: filenames,
        }
      }
      )
      .then((response) => {
     
       console.log(response.data);
        if(response.data.HTTPStatus.statusCode === 200){
        document.getElementById("my_modal_3").close()
        setShowModal(true)
        setTimeout(() => {
          setShowModal(false)

      let PatientInfo;
if(!patientInfoDetail) {
  const today = dayjs().format('YYYY-MM-DD');
  
    PatientInfo = {
      InsurerCode: InsuranceCode,
       IdType: "",
      InvoiceNumber: "",
      VN: "",
      PID: "",
      PassportNumber: "",
      HN: "",
      VisitDatefrom: today,
      VisitDateto: today,
      StatusClaimCode: "",
    };

  }else{
  PatientInfo = patientInfoDetail;

      }
console.log(PatientInfo)
  // setPost();
  //         axios
  //         .post(
  //           process.env.NEXT_PUBLIC_URL_SV +
  //             process.env.NEXT_PUBLIC_URL_SearchTransection,
  //            {PatientInfo }
  //         )
  //         .then((response) => {
  //          setPost(response.data);
  //           console.log(response.data)
  //        setCurrentData(response.data.Result.TransactionClaimInfo)
  //          setShowFormError();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  
  //          setShowFormError("Error");
  //          setMassError(error.message);
  //         });

        }, 2000);

      }else{
         // console.log("Error")
          setShowDocError("Error")
          setMassDocError(response.data.HTTPStatus.message)
      }
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
          setMassDocError(error.response.data.HTTPStatus.message);
          setShowDocError("Error");
        }
      });
  };
  const DocumentBase64 = (data) => {
    setShowDocError();
    setBillList();
    setMsg();
    setProgress({ started: false, pc: 0 });
//Update Doc
const PatientInfo = {
  RefId: refIdL,
  TransactionNo: transactionNoL,
  VN: "",
  HN: "",
  DocumentName: data,
  DocumenttypeCode: "003",
};
axios
.post(
  process.env.NEXT_PUBLIC_URL_PD2 +
    process.env.NEXT_PUBLIC_URL_UpdateDocumentTypeCode,
  {
    PatientInfo
  }
)
.then((response) => {

  const PatientInfo = {
    InsurerCode: InsuranceCode,
    RefId: refIdL,
    TransactionNo: transactionNoL,
    PID: pIDL,
    HN: hNL,
    PassportNumber: passportNumberL,
    VN: vNL,
    DocumenttypeCode: "",
    DocumentName : "",
    Runningdocument : "",
  }
  //console.log(PatientInfo)
  axios
    .post(
      process.env.NEXT_PUBLIC_URL_PD2 +
        process.env.NEXT_PUBLIC_URL_getlistDocumentName,
      { PatientInfo }
    )
    .then((response) => {
      setBillList(response.data);
      console.log(response.data)
    })
    .catch((error) => {
      // console.error("Error", error)
      console.log(error);
      //  if (err.response.request.status === 500) {
      setShowFormError("Error");
      setMassError(error.response.data.HTTPStatus.message);
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
    setMassDocError(error.response.data.HTTPStatus.message);
    setShowDocError("Error");
  }
});








/////////////////////////////////////////////////////
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_getDocumentByDocname,
        {
          VN: vNL,
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

        // console.log(response.data)
        //   const base64String = response.data.base64;

        // const linkSource = `data:application/pdf;base64,${base64String}`;
        //   const pdfWindow = window.open();
        //   pdfWindow.document.write(
        //       `<iframe width='100%' height='99%' src='${linkSource}'></iframe>`
        // );
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
          setMassDocError(error.response.data.HTTPStatus.message);
          setShowDocError("Error");
        }
      });
  };
  const CancleDoc = (data) => {
    const isConfirmed = window.confirm("แน่ใจแล้วที่จะลบเอกสารใช่ไหม");
    if (isConfirmed) {
    setMsg();
    setShowDocError();
    setProgress({ started: false, pc: 0 });
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_DeleteDocumentByDocName,
        {
          "PatientInfo": {
          RefId: refIdL,
          TransactionNo: transactionNoL,
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
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        RefId: refIdL,
        TransactionNo: transactionNoL,
        PID: pIDL,
        HN: hNL,
        PassportNumber: passportNumberL,
        VN: vNL,
        DocumenttypeCode: "",
        DocumentName : "",
        Runningdocument : "",
        
      };
      console.log(PatientInfo)
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD2 +
            process.env.NEXT_PUBLIC_URL_getlistDocumentName,
          {
            PatientInfo
          }
        )
        .then((response) => {
          setBillList(response.data);
       //   console.log(response.data)
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
            setMassDocError(error.response.data.HTTPStatus.message);
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




  const handleButtonClick = (data) => {
    const generateRandomFiveDigitNumber = () => {
      return String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    };
    const newRandomNumber = generateRandomFiveDigitNumber();
    setRandomNumber(newRandomNumber);
    console.log(newRandomNumber);


    setBillList();
    setShowDocError();
    const [
      RefId,
      TransactionNo,
      PID,
      PassportNumber,
      HN,
      VN,
      InvoiceNumber,
    ] = data.split(" | ");

    setRefIdL(RefId);
    setTransactionNoL(TransactionNo);
    setHNL(HN);
    setVNL(VN);
    setPIDL(PID);
    setPassportNumberL(PassportNumber);
    setInvoiceNumberL(InvoiceNumber);
    setMsg(null);

    const PatientInfo = {
      InsurerCode: InsuranceCode,
      RefId: RefId,
      TransactionNo: TransactionNo,
      PID: PID,
      HN: HN,
      PassportNumber: PassportNumber,
      VN: VN,
      DocumenttypeCode: "",
      DocumentName : "",
      // Runningdocument : newRandomNumber,
      Runningdocument : "",
      
    };
    //console.log(PatientInfo)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_getlistDocumentName,
        { PatientInfo }
      )
      .then((response) => {
        setBillList(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        // console.error("Error", error)
        console.log(error);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
        setMassError(error.response.data.HTTPStatus.message);
      });

    document.getElementById("my_modal_3").showModal();
  };
  const formatNumber = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  
  ////////////////////////// ตัวเลื่อน ตารางซ้าย - ขวา ///////////////////////////////////////////
  const ITEMS_PER_PAGE = 10
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
 
    const endIndex = startIndex + ITEMS_PER_PAGE;
 //console.log(endIndex +"="+startIndex+"+"+ITEMS_PER_PAGE) 
   const data = currentData.slice(startIndex, endIndex);
  //console.log(data)

   //////////////////// Chack Status All///////////////////////////

   const RefreshAll = () => {
    setPost();
    //setStatusAllNew();
  // const extractedRefId = data.map(item => item.RefId);
  // const extractedTransactionNo = data.map(item => item.TransactionNo);

  const PatientInfo = data.map(item => ({
    RefId: item.RefId,
    TransactionNo: item.TransactionNo
  }));
  
  
      
    
    //console.log(PatientInfo)
     axios
       .post(
         process.env.NEXT_PUBLIC_URL_PD +
           process.env.NEXT_PUBLIC_URL_getcheckclaimstatusListAll,
         { "PatientInfo" :   PatientInfo  }
       )
       .then((response) => {
         console.log(response.data);

        //  const All = data.map(item => item.TransactionNo);
         const AllPatient = response.data.Result.InsuranceData.map(item => ({
          RefId: item.RefId,
          TransactionNo: item.TransactionNo,
            InsurerCode: item.StatusInfo.InsurerCode,
            BatchNumber:  item.StatusInfo.BatchNumber,
             ClaimStatus:  item.StatusInfo.ClaimStatus,
             ClaimStatusDesc:  item.StatusInfo.ClaimStatusDesc,
             TotalApproveAmount:  item.StatusInfo.TotalApproveAmount,
             PaymentDate:  item.StatusInfo.PaymentDate,
             InvoiceNumber:  item.StatusInfo.InvoiceNumber,
        }));
         console.log(AllPatient)
         //setStatusAllNew(AllPatient)

         axios
         .post(
           process.env.NEXT_PUBLIC_URL_SV +
             process.env.NEXT_PUBLIC_URL_SearchTransection,
           { PatientInfo }
         )
         .then((response) => {
           setPost(response.data);
         //  console.log(response.data);
           setCurrentData(response.data.Result.TransactionClaimInfo)
           setShowFormError();
         })
         .catch((error) => {
           // console.error("Error", error)
           console.log(error);
  
           setShowFormError("Error");
           setMassError(error.message);
         });
 
        })
       .catch((error) => {
         console.log(error);
         setShowFormError("Error");
         setMassError(error.message);
       });
   };

    ///////////////////////////////////////////////
  
   useEffect(() => {
    setCount(data.length);
  }, [data]);
/////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* <div role="tablist" className="tabs tabs-lifted">
      <input type="radio" name="my_tabs_2" 
       className="tab text-error" aria-label="รายการที่ยังไม่วางบิล" defaultChecked/> */}
      <div className="bg-base-100 border-base-300 rounded-box w-5/5 ">
        <form onSubmit={handleSubmit}>
          {/* <div className="grid gap-1 sm:grid-cols-1 w-full"> */}
          <div className="flex items-center  w-full">
            <div className="px-2 rounded-md">
              <div className="flex items-center ">
              <input
                type="radio"
                id="PID"
                name="identity_type"
                value="PID"
                className="checkbox checkbox-info"
                checked={selectedIdType === "PID"}
                onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                type="radio"
                id="PASSPORT_NO"
                name="identity_type"
                value="PASSPORT_NO"
                className="checkbox checkbox-info"
                checked={selectedIdType === "PASSPORT_NO"}
                onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Passport &nbsp;</p>
              <input
                type="radio"
                id="HOSPITAL_ID"
                name="identity_type"
                value="HOSPITAL_ID"
                className="checkbox checkbox-info"
                checked={selectedIdType === "HOSPITAL_ID"}
                onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN &nbsp;</p>
                <input
                  type="radio"
                  id="NATIONAL_ID"
                  name="identity_type"
                  value="NATIONAL_ID"
                  className="checkbox checkbox-info"
                  // defaultChecked
                  onChange={handleOptionChange}
                />
                <p className="text-left">&nbsp;VN &nbsp;</p>
                <input
                  type="radio"
                  id="InvoiceNumber"
                  name="identity_type"
                  value="InvoiceNumber"
                  className="checkbox checkbox-info"
                  checked={selectedIdType === "InvoiceNumber"}
                  onChange={handleOptionChange}
                />
                <p className="text-left">&nbsp;Invoice&nbsp;</p>
                <p className="ml-2">Visit Date</p>
              </div>
              <TextField
                id="standard-multiline-flexible"
                label="กรอกข้อความ"
                //multiline
               // maxRows={4}
                variant="standard"
                className="w-96"
                name="number"
                type="text"
                value={numberValue}
                onChange={(e) => setNumberValue(e.target.value)}
                focused
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="ml-10 w-40"
                  label=""
                  value={fromValue}
                  onChange={(newDate) => setFromValue(newDate)}
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="ml-2 w-40"
                  label=""
                  value={toValue}
                  onChange={(newDate) => setToValue(newDate)}
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>
              <FormControl className="ml-2">
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
                  ? serviceCode.Result.map((type, index) => type.servicesettingcode !== "PRE" ? (
                      <MenuItem key={index} value={type.servicesettingcode}>
                        {type.servicesettingcode} -{" "}
                        {type.servicesettingdesc}
                      </MenuItem>
                    ): "")
                  : (
                    <MenuItem value="OPD">
                      OPD - ผู้ป่วยนอก
                  </MenuItem>
                  )}
              </Select>
            </FormControl>
              <FormControl className="ml-2 w-80">
              <InputLabel id="demo-simple-select-label">
                Claim Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusValue}
                label="Claim Status"
                onChange={status}
              >
                {claimStatus
                  ? claimStatus.Result.map((status, index) => (
                      <MenuItem key={index} value={status.claimstatuscode}>
                        {status.claimstatusdesc_en} -{" "}
                        {status.claimstatusdesc_th}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
              <button
                className="btn btn-error text-base-100 text-lg rounded-full hover:bg-base-100 hover:text-error ml-2"
                type="submit"
              >
                <FaSearch />
              </button>
              <div
              className="btn btn-base-100 text-error text-xl rounded-full hover:text-base-100 ml-2"
              type="submit"
              onClick={DelectSearch}
            >
              <MdCancel />
            </div>
            </div>
          </div>
        </form>
      </div>

      <div role="tablist" className="tabs tabs-lifted ">
  <input type="radio" name="my_tabs_2" role="tab"  className="tab w-[500px] text-sm inline-flex space-x-2 whitespace-nowrap" aria-label="ทั้งหมด"     defaultChecked />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
   


  {/* <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4 mt-6"> */}
        <div className="overflow-x-auto">
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

          <table className="table mt-2">
          <thead className="bg-info text-base-100 text-center text-sm">
              <tr>
                <th></th>
                <th >Visit Date</th>
                <th>Full Name</th>
                <th>HN</th>
                <th>VN</th>
                <th>Location</th>
                <th>ClaimNo</th>
                <th>Invoicenumber</th>
                <td>BatchNumber</td>
                <th className="w-40">Status</th>
                <th >Total<br/>Billamount</th>
                <th >Approved<br/>Amount</th>
                <th >Excess<br/>Amount</th>
                <th >
                  <h1 className="text-base-100 text-2xl flex justify-center" onClick={RefreshAll}>
                    <LuRefreshCw />
                  </h1>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
               {/* {console.log(billValue)} */}
            {post ? (
    post.HTTPStatus.statusCode === 200 ? (
      data.map((bill, index) => 
      ((bill.VisitDate||bill.HN) !== "" && 
        ((billValue === "ทั้งหมด") ?(
                    <tr className="hover text-center" key={index}>
                      <th>{index + 1}</th>
                      <td>{bill.VisitDate}</td>
                      <td>
                        {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                      </td>
                      <td>{bill.HN}</td>
                      <td>{bill.VN}</td>
                      <td className="whitespace-nowrap">{bill.VisitLocation}</td>
                      <td>{bill.ClaimNo}</td>
                      <td>{bill.InvoiceNumber}</td>
                      <td>
  {(billValue === "ทั้งหมด") ? 
  //(statusAllNew ? (statusAllNew.map(ALLnew => ((ALLnew.TransactionNo === ((bill.TransactionNo)||(statusNew.TransactionNo))) ?  (ALLnew.BatchNumber) : ((bill.BatchNumber)||(statusNew.BatchNumber))))):
  (statusNew ? (bill.TransactionNo === statusNew.TransactionNo ? statusNew.BatchNumber : bill.BatchNumber): "Loading..."): ""}
                      </td>
                      <td>
                      <div className="grid gap-1 sm:grid-cols-1 w-full">
                        {
                        //statusAllNew ? statusAllNew.map(ALLnew => (ALLnew.TransactionNo === ((bill.TransactionNo)||(statusNew.TransactionNo)) ? ((((ALLnew.ClaimStatus !== "Cancelled")&&(ALLnew.ClaimStatus !== "Cancelled to AIA")&&(ALLnew.ClaimStatus !== "Reversed")) ? ((ALLnew.ClaimStatus === "Approved")||(ALLnew.ClaimStatus === "Settle")) ? <a className="bg-success text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a> : <a className="bg-warning text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a> : <a className="bg-error text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a>)) : ((((bill.ClaimStatusDesc_EN !== "Cancelled")&&(bill.ClaimStatusDesc_EN !== "Cancelled to AIA")&&(bill.ClaimStatusDesc_EN !== "Reversed")) ? ((bill.ClaimStatus === "Approved")||(bill.ClaimStatus === "Settle")) ? <a className="bg-success text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a> : <a className="bg-warning text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a> : <a className="bg-error text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>)))):
                        (statusNew ? bill.TransactionNo === statusNew.TransactionNo ? statusNew.ClaimStatusDesc ?  (((statusNew.ClaimStatus !== "Cancelled")&&(statusNew.ClaimStatus !== "Cancelled to AIA")&&(statusNew.ClaimStatus !== "Reversed")) ? ((statusNew.ClaimStatus === "Approved")||(statusNew.ClaimStatus === "Settle")) ? <a className="bg-info text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a> : 
                        ((statusNew.ClaimStatus === "Approve")||(statusNew.ClaimStatus === "Received")) ? (
                          <a className="bg-success text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>
                        ) : (
                        <a className="bg-warning rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>
                      )
                         : <a className="bg-error text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>): "" : bill.ClaimStatusDesc ? 
                        (((bill.ClaimStatusDesc_EN !== "Cancelled")&&(bill.ClaimStatusDesc_EN !== "Cancelled to AIA")&&(bill.ClaimStatusDesc_EN !== "Reversed")) ? ((bill.ClaimStatusDesc_EN === "Approved")||(bill.ClaimStatusDesc_EN === "Settle")) ? <a className="bg-info text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a> : 
                        ((bill.ClaimStatusDesc_EN === "Approve")||(bill.ClaimStatusDesc_EN === "Received")) ? (
                          <a className="bg-success text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>
                        ) : (
                      <a className="bg-warning rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>  
                      )
                       : <a className="bg-error text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>): "": "Loading...")}
                 


                        {((bill.FurtherClaimNo)||(bill.FurtherClaimId) ? <a className="rounded-full px-3 py-2">( แบบต่อเนื่อง )</a> : "")}
                        {((bill.AccidentDate)||((bill.IllnessTypeCode === "ACC")||(bill.IllnessTypeCode === "ER")) ? <a className="rounded-full px-3 py-2">( อุบัติเหตุ )</a> : "")}
                      </div>
                      </td>
                      <th>
                        {/* {console.log(bill)} 
                          {console.log(statusNew)} */}

{bill.TotalBillAmount
                              ? parseFloat(
                                    bill.TotalBillAmount
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""}
                          
                      </th>
                      <th>
                      {/* {bill.ApprovedAmount
                          ? parseFloat(bill.ApprovedAmount).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          : ""} */}
               
               {bill.TotalApprovedAmount
                              ?
                              //  parseFloat(
                                (statusNew
                                ? ((bill.TransactionNo ===statusNew.TransactionNo)
                                  ? (statusNew.TotalApproveAmount ? parseFloat(statusNew.TotalApproveAmount).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2,}) : parseFloat(bill.TotalApprovedAmount).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2,})  )
                                  :  parseFloat(bill.TotalApprovedAmount).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2,}))
                                  :  parseFloat(bill.TotalApprovedAmount).toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2,})
                                )
                           
                                 
                                // ).toLocaleString("en-US", {
                                //   minimumFractionDigits: 2,
                                //   maximumFractionDigits: 2,
                                // })
                              : ""}

                      </th>
                      <th>
                        {bill.TotalExcessAmount
                          ? parseFloat(bill.TotalExcessAmount).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2,})
                          : ""}
                      </th>
                      <td>
                      {bill.RefId ? (
                            (((bill.ClaimStatusDesc !== "Cancelled to AIA")&&(bill.ClaimStatusDesc !== "Cancelled")&&(bill.ClaimStatusDesc !== "Reversed"))&&(bill.ClaimNo)) ? (
                              <>
                        <div className="tooltip" data-tip="รีเฟรช">
                          <h1
                            className="text-success text-2xl"
                            onClick={() =>
                              Refresh(
                                `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate}`
                              )
                            }
                          >
                            <LuRefreshCw />
                          </h1>
                        </div>
                        </>) : ("")) : ("")}
                        {bill.RefId ? (
                            
                              ((bill.ClaimNo)||(bill.InvoiceNumber)
                             ? (
                              <>
                        <div className="tooltip ml-4" data-tip="ข้อมูลส่งเคลม">
                          <h1
                            className="text-primary text-2xl"
                            onClick={() =>
                              Detail(
                                 `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate} | ${bill.Runningdocument} | ${bill.futherclaimVN} | ${bill.Visitlocation}`
                              )
                            }
                          >
                            <IoDocumentText />
                          </h1>
                        </div>
                        {/* {bill.RefId ? 
                            (bill.ClaimStatusDesc !== "waitting for discharge" ? (
                              <>
                        <div
                                  className="tooltip ml-4"
                                  data-tip="ยกเลิกการเคลม"
                                >
                                  <h1
                                    className="text-error text-2xl"
                                    onClick={() =>
                                      Cancel(
                                        `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                                      )
                                    }
                                  >
                                    <MdCancel />
                                  </h1>
                                </div>
                                </>
                            ): ("")) : ("")} */}
                                                      </>
                                                    ) :  "" )) : ( "")}
        

                        <div
                                  className="tooltip ml-4"
                                  data-tip="ดู เอกสารทั้งหมด"
                                >
                                  <h1
                                    className="text-primary text-2xl"
                                    onClick={() =>
                                      DocumentList(
                                        `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                                      )
                                    }
                                  >
                                <HiDocumentSearch />
                                </h1>
                                </div>

                      </td>
                      <td>
                        {bill.RefId ? (
                            (bill.ClaimStatusDesc === "Approve" || bill.ClaimStatusDesc === "Received") ? bill.BatchNumber ? ("") : (
                              <>
                                <button
                                  className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 ml-4"
                                  onClick={() =>
                                    handleButtonClick(
                                      `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                                    )
                                  }
                                >
                                  ยืนยันวางบิล
                                </button>
                              </>
                            ) : (
                              ""
                            )
                          ) : (
                            "Loading..."
                          )
                      }
                        </td>
                    </tr>
                    ) : ""
        ))
        )
                  ): "")  : (
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                )
            }
            </tbody>
          </table> 

          {post ?
      <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
      <div className="flex justify-between text-right">
        <div className="text-right">
          <h1 className="text-lg">Showing {startIndex+1} to {endIndex} of {post ? post.Result.TransactionClaimInfo.length : ""} entries.</h1>
        </div>
      </div>
      <div className="text-right text-base-100 ">
        {/* <div className="text-left text-base-100"> */}
        
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="btn btn-primary ">
            <BiFirstPage className="text-base-100 text-xl text-right" />
          </button>
        )}
        {/* </div>
        <div className="text-center"> */}

        {/* {console.log(endIndex)}
        {console.log(startIndex)}
        {console.log(ITEMS_PER_PAGE)} */}


        {/* </div>
        <div className="text-right"> */}
        {endIndex < currentData.length && (
          <button onClick={handleNextPage} className="btn btn-primary ml-2">
           <BiLastPage className="text-base-100 text-xl" /> 
          </button>
        )}
      </div>
        </div>
        : ""}







         
        </div>
      {/* </div> */}


</div>



     <input type="radio" name="my_tabs_2" role="tab"  className="tab w-[500px] text-sm inline-flex space-x-2 whitespace-nowrap" aria-label="รอวางบิล"     />
     <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">


  {/* <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4 mt-6"> */}
        <div className="overflow-x-auto">
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

          <table className="table mt-2">
          <thead className="bg-info text-base-100 text-center text-sm">
              <tr>
                <th></th>
                <th >Visit Date</th>
                <th>Full Name</th>
                <th>HN</th>
                <th>VN</th>
                <th>Location</th>
                <th>ClaimNo</th>
                <th>Invoicenumber</th>
                <td>BatchNumber</td>
                <th className="w-40">Status</th>
                <th >Total<br/>Billamount</th>
                <th >Approved<br/>Amount</th>
                <th >Excess<br/>Amount</th>
                <th >
                  <h1 className="text-base-100 text-2xl flex justify-center" onClick={RefreshAll}>
                    <LuRefreshCw />
                  </h1>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(billValue)} */}
            {post ? (
    post.HTTPStatus.statusCode === 200 ? (
      data.map((bill, index) => 
      ((bill.VisitDate||bill.HN) !== "" && 
 (!bill.BatchNumber ? (
  //  console.log("ยังไม่วางบิล")
  <tr className="hover text-center" key={index}>
    <th>{index + 1}</th>
    <td>{bill.VisitDate}</td>
    <td>
      {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
    </td>
    <td>{bill.HN}</td>
    <td>{bill.VN}</td>
    <td className="whitespace-nowrap">{bill.VisitLocation}</td>
    <td>{bill.ClaimNo}</td>
    <td>{bill.InvoiceNumber}</td>
    <td>
  {
  //statusAllNew ? (statusAllNew.map(ALLnew => ((ALLnew.TransactionNo === ((bill.TransactionNo)||(statusNew.TransactionNo))) ?  (ALLnew.BatchNumber) : ((bill.BatchNumber)||(statusNew.BatchNumber))))):
  (statusNew ? (bill.TransactionNo === statusNew.TransactionNo ? statusNew.BatchNumber : bill.BatchNumber): "Loading...")}
    </td>
    <td>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
                        {
                        //statusAllNew ? statusAllNew.map(ALLnew => (ALLnew.TransactionNo === ((bill.TransactionNo)||(statusNew.TransactionNo)) ? ((((ALLnew.ClaimStatus !== "Cancelled")&&(ALLnew.ClaimStatus !== "Cancelled to AIA")&&(ALLnew.ClaimStatus !== "Reversed")) ? ((ALLnew.ClaimStatus === "Approved")||(ALLnew.ClaimStatus === "Settle")) ? <a className="bg-success text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a> : <a className="bg-warning text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a> : <a className="bg-error text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a>)) : ((((bill.ClaimStatusDesc_EN !== "Cancelled")&&(bill.ClaimStatusDesc_EN !== "Cancelled to AIA")&&(bill.ClaimStatusDesc_EN !== "Reversed")) ? ((bill.ClaimStatus === "Approved")||(bill.ClaimStatus === "Settle")) ? <a className="bg-success text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a> : <a className="bg-warning text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a> : <a className="bg-error text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>)))):
                        (statusNew ? bill.TransactionNo === statusNew.TransactionNo ? statusNew.ClaimStatusDesc ?  (((statusNew.ClaimStatus !== "Cancelled")&&(statusNew.ClaimStatus !== "Cancelled to AIA")&&(statusNew.ClaimStatus !== "Reversed")) ? ((statusNew.ClaimStatus === "Approved")||(statusNew.ClaimStatus === "Settle")) ? <a className="bg-info text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a> : 
                        ((statusNew.ClaimStatus === "Approve")||(statusNew.ClaimStatus === "Received")) ? (
                          <a className="bg-success text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>
                        ) : (
                        <a className="bg-warning rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>
                      )
                         : <a className="bg-error text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>): "" : bill.ClaimStatusDesc ? 
                        (((bill.ClaimStatusDesc_EN !== "Cancelled")&&(bill.ClaimStatusDesc_EN !== "Cancelled to AIA")&&(bill.ClaimStatusDesc_EN !== "Reversed")) ? ((bill.ClaimStatusDesc_EN === "Approved")||(bill.ClaimStatusDesc_EN === "Settle")) ? <a className="bg-info text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a> : 
                        ((bill.ClaimStatusDesc_EN === "Approve")||(bill.ClaimStatusDesc_EN === "Received")) ? (
                          <a className="bg-success text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>
                        ) : (
                      <a className="bg-warning rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>  
                      )
                       : <a className="bg-error text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>): "": "Loading...")}
                 


                        {((bill.FurtherClaimNo)||(bill.FurtherClaimId) ? <a className="rounded-full px-3 py-2">( แบบต่อเนื่อง )</a> : "")}
                        {((bill.AccidentDate)||((bill.IllnessTypeCode === "ACC")||(bill.IllnessTypeCode === "ER")) ? <a className="rounded-full px-3 py-2">( อุบัติเหตุ )</a> : "")}
                      </div>
    </td>
    <th>
    {bill.TotalApprovedAmount
        ? parseFloat(bill.TotalApprovedAmount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        : ""}
        
    </th>
    <th>
    {/* {bill.ApprovedAmount
        ? parseFloat(bill.ApprovedAmount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        : ""} */}

        {bill.TotalBillAmount
        ? parseFloat(
           //statusAllNew ? (statusAllNew.map(ALLnew => (ALLnew.TransactionNo === ((bill.TransactionNo)||(statusNew.TransactionNo)) ? (ALLnew.TotalBillAmount) : (bill.TotalBillAmount)))):
           (statusNew ? bill.TransactionNo === statusNew.TransactionNo ? statusNew.TotalBillAmount : (bill.TotalBillAmount ? (bill.TotalBillAmount): ("")): "Loading...")
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        : ""}

    </th>
    <th>
      {bill.TotalExcessAmount
        ? parseFloat(bill.TotalExcessAmount).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2,})
        : ""}
    </th>
    <td>
    {bill.RefId ? (
          (((bill.ClaimStatusDesc !== "Cancelled to AIA")&&(bill.ClaimStatusDesc !== "Cancelled")&&(bill.ClaimStatusDesc !== "Reversed"))&&(bill.ClaimNo)) ? (
            <>
      <div className="tooltip" data-tip="รีเฟรช">
        <h1
          className="text-success text-2xl"
          onClick={() =>
            Refresh(
              `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate}`
            )
          }
        >
          <LuRefreshCw />
        </h1>
      </div>
      </>) : ("")) : ("")}
      {bill.RefId ? (
          ((
            ((bill.ClaimStatusDesc === "Approve")||(bill.ClaimStatusDesc === "waitting for discharge"))
            &&(bill.ClaimStatusDesc !== "Cancelled to AIA")) || (((bill.ClaimStatusDesc === "Received")||(bill.ClaimStatusDesc === "waitting for discharge"))
            &&(bill.ClaimStatusDesc !== "Cancelled to AIA")) || (((bill.ClaimStatusDesc === "waitting discharge")||(bill.ClaimStatusDesc === "waitting for discharge"))
            &&(bill.ClaimStatusDesc !== "Cancelled to AIA"))) ? (
            <>
      <div className="tooltip ml-4" data-tip="ข้อมูลส่งเคลม">
        <h1
          className="text-primary text-2xl"
          onClick={() =>
            Detail(
               `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate} | ${bill.Runningdocument} | ${bill.futherclaimVN} | ${bill.Visitlocation}`
            )
          }
        >
          <IoDocumentText />
        </h1>
      </div>
      {/* {bill.RefId ? 
          (bill.ClaimStatusDesc !== "waitting for discharge" ? (
            <>
      <div
                className="tooltip ml-4"
                data-tip="ยกเลิกการเคลม"
              >
                <h1
                  className="text-error text-2xl"
                  onClick={() =>
                    Cancel(
                      `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                    )
                  }
                >
                  <MdCancel />
                </h1>
              </div>
              </>
          ): ("")) : ("")} */}
                                    </>
                                  ) : ( "")) : ( "")}


      <div
                className="tooltip ml-4"
                data-tip="ดู เอกสารทั้งหมด"
              >
                <h1
                  className="text-primary text-2xl"
                  onClick={() =>
                    DocumentList(
                      `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                    )
                  }
                >
              <HiDocumentSearch />
              </h1>
              </div>

    </td>
    <td>
      {bill.RefId ? (
          (bill.ClaimStatusDesc === "Approve" || bill.ClaimStatusDesc === "Received") ? bill.BatchNumber ? ("") : (
            <>
              <button
                className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 ml-4"
                onClick={() =>
                  handleButtonClick(
                    `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                  )
                }
              >
                วางบิล
              </button>
            </>
          ) : (
            ""
          )
        ) : (
          "Loading..."
        )
    }
      </td>
  </tr>
  ): "")
        ))
        ) : ""): (
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                )
            }
            </tbody>
          </table> 

          {post ?
      <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
      <div className="flex justify-between text-right">
        <div className="text-right">
          <h1 className="text-lg">Showing {startIndex+1} to {endIndex} of {post ? post.Result.TransactionClaimInfo.length : ""} entries.</h1>
        </div>
      </div>
      <div className="text-right text-base-100 ">
        {/* <div className="text-left text-base-100"> */}
        
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="btn btn-primary ">
            <BiFirstPage className="text-base-100 text-xl text-right" />
          </button>
        )}
        {/* </div>
        <div className="text-center"> */}

        {/* {console.log(endIndex)}
        {console.log(startIndex)}
        {console.log(ITEMS_PER_PAGE)} */}


        {/* </div>
        <div className="text-right"> */}
        {endIndex < currentData.length && (
          <button onClick={handleNextPage} className="btn btn-primary ml-2">
           <BiLastPage className="text-base-100 text-xl" /> 
          </button>
        )}
      </div>
        </div>
        : ""}


        </div>
      {/* </div> */}


   
  </div>

  {/* <input type="radio" name="my_tabs_2" role="tab" className="tab  w-[300px]" aria-label="วางบิลแล้ว" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6"> */}
  <input type="radio" name="my_tabs_2" role="tab"  className="tab w-[500px] text-sm inline-flex space-x-2 whitespace-nowrap" aria-label="วางบิล"     />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">




  {/* <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4 mt-6"> */}
        <div className="overflow-x-auto">
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

          <table className="table mt-2">
          <thead className="bg-info text-base-100 text-center text-sm">
              <tr>
                <th></th>
                <th >Visit Date</th>
                <th>Full Name</th>
                <th>HN</th>
                <th>VN</th>
                <th>Location</th>
                <th>ClaimNo</th>
                <th>Invoicenumber</th>
                <td>BatchNumber</td>
                <th className="w-40">Status</th>
                <th >Total<br/>Billamount</th>
                <th >Approved<br/>Amount</th>
                <th >Excess<br/>Amount</th>
                <th >
                  <h1 className="text-base-100 text-2xl flex justify-center" onClick={RefreshAll}>
                    <LuRefreshCw />
                  </h1>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(billValue)} */}
            {post ? (
    post.HTTPStatus.statusCode === 200 ? (
      data.map((bill, index) => 
      ((bill.VisitDate||bill.HN) !== "" && 
 (bill.BatchNumber ? (
  //  console.log("ยังไม่วางบิล")
  <tr className="hover text-center" key={index}>
    <th>{index + 1}</th>
    <td>{bill.VisitDate}</td>
    <td>
      {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
    </td>
    <td>{bill.HN}</td>
    <td>{bill.VN}</td>
    <td className="whitespace-nowrap">{bill.VisitLocation}</td>
    <td>{bill.ClaimNo}</td>
    <td>{bill.InvoiceNumber}</td>
    <td>
  {
  //statusAllNew ? (statusAllNew.map(ALLnew => ((ALLnew.TransactionNo === ((bill.TransactionNo)||(statusNew.TransactionNo))) ?  (ALLnew.BatchNumber) : ((bill.BatchNumber)||(statusNew.BatchNumber))))):
  (statusNew ? (bill.TransactionNo === statusNew.TransactionNo ? statusNew.BatchNumber : bill.BatchNumber): "Loading...")}
    </td>
    <td>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
                        {
                        //statusAllNew ? statusAllNew.map(ALLnew => (ALLnew.TransactionNo === ((bill.TransactionNo)||(statusNew.TransactionNo)) ? ((((ALLnew.ClaimStatus !== "Cancelled")&&(ALLnew.ClaimStatus !== "Cancelled to AIA")&&(ALLnew.ClaimStatus !== "Reversed")) ? ((ALLnew.ClaimStatus === "Approved")||(ALLnew.ClaimStatus === "Settle")) ? <a className="bg-success text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a> : <a className="bg-warning text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a> : <a className="bg-error text-base-100 rounded-full px-3 py-2">{ALLnew.ClaimStatus}</a>)) : ((((bill.ClaimStatusDesc_EN !== "Cancelled")&&(bill.ClaimStatusDesc_EN !== "Cancelled to AIA")&&(bill.ClaimStatusDesc_EN !== "Reversed")) ? ((bill.ClaimStatus === "Approved")||(bill.ClaimStatus === "Settle")) ? <a className="bg-success text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a> : <a className="bg-warning text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a> : <a className="bg-error text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>)))):
                        (statusNew ? bill.TransactionNo === statusNew.TransactionNo ? statusNew.ClaimStatusDesc ?  (((statusNew.ClaimStatus !== "Cancelled")&&(statusNew.ClaimStatus !== "Cancelled to AIA")&&(statusNew.ClaimStatus !== "Reversed")) ? ((statusNew.ClaimStatus === "Approved")||(statusNew.ClaimStatus === "Settle")) ? <a className="bg-info text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a> : 
                        ((statusNew.ClaimStatus === "Approve")||(statusNew.ClaimStatus === "Received")) ? (
                          <a className="bg-success text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>
                        ) : (
                        <a className="bg-warning rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>
                      )
                         : <a className="bg-error text-base-100 rounded-full px-3 py-2">{statusNew.ClaimStatus}</a>): "" : bill.ClaimStatusDesc ? 
                        (((bill.ClaimStatusDesc_EN !== "Cancelled")&&(bill.ClaimStatusDesc_EN !== "Cancelled to AIA")&&(bill.ClaimStatusDesc_EN !== "Reversed")) ? ((bill.ClaimStatusDesc_EN === "Approved")||(bill.ClaimStatusDesc_EN === "Settle")) ? <a className="bg-info text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a> : 
                        ((bill.ClaimStatusDesc_EN === "Approve")||(bill.ClaimStatusDesc_EN === "Received")) ? (
                          <a className="bg-success text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>
                        ) : (
                      <a className="bg-warning rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>  
                      )
                       : <a className="bg-error text-base-100 rounded-full px-3 py-2">{bill.ClaimStatusDesc_EN}</a>): "": "Loading...")}
                 


                        {((bill.FurtherClaimNo)||(bill.FurtherClaimId) ? <a className="rounded-full px-3 py-2">( แบบต่อเนื่อง )</a> : "")}
                        {((bill.AccidentDate)||((bill.IllnessTypeCode === "ACC")||(bill.IllnessTypeCode === "ER")) ? <a className="rounded-full px-3 py-2">( อุบัติเหตุ )</a> : "")}
                      </div>
    </td>
    <th>
    {bill.TotalBillAmount
        ? parseFloat(bill.TotalBillAmount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        : ""}
        
    </th>
    <th>
        {bill.TotalApprovedAmount
        ? parseFloat(
           (statusNew ? bill.TransactionNo === statusNew.TransactionNo ? statusNew.TotalBillAmount : (bill.TotalApprovedAmount ? (bill.TotalApprovedAmount): ("")): "Loading...")
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        : ""}

    </th>
    <th>
      {bill.TotalExcessAmount
        ? parseFloat(bill.TotalExcessAmount).toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2,})
        : ""}
    </th>
    <td>
    {bill.RefId ? (
          (((bill.ClaimStatusDesc !== "Cancelled to AIA")&&(bill.ClaimStatusDesc !== "Cancelled")&&(bill.ClaimStatusDesc !== "Reversed"))&&(bill.ClaimNo)) ? (
            <>
      <div className="tooltip" data-tip="รีเฟรช">
        <h1
          className="text-success text-2xl"
          onClick={() =>
            Refresh(
              `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate}`
            )
          }
        >
          <LuRefreshCw />
        </h1>
      </div>
      </>) : ("")) : ("")}
      {bill.RefId ? (
          ((
            ((bill.ClaimStatusDesc === "Approve")||(bill.ClaimStatusDesc === "waitting for discharge"))
            &&(bill.ClaimStatusDesc !== "Cancelled to AIA")) || (((bill.ClaimStatusDesc === "Received")||(bill.ClaimStatusDesc === "waitting for discharge"))
            &&(bill.ClaimStatusDesc !== "Cancelled to AIA")) || (((bill.ClaimStatusDesc === "waitting discharge")||(bill.ClaimStatusDesc === "waitting for discharge"))
            &&(bill.ClaimStatusDesc !== "Cancelled to AIA"))) ? (
            <>
      <div className="tooltip ml-4" data-tip="ข้อมูลส่งเคลม">
        <h1
          className="text-primary text-2xl"
          onClick={() =>
            Detail(
               `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate} | ${bill.Runningdocument} | ${bill.futherclaimVN} | ${bill.Visitlocation}`
            )
          }
        >
          <IoDocumentText />
        </h1>
      </div>
      {/* {bill.RefId ? 
          (bill.ClaimStatusDesc !== "waitting for discharge" ? (
            <>
      <div
                className="tooltip ml-4"
                data-tip="ยกเลิกการเคลม"
              >
                <h1
                  className="text-error text-2xl"
                  onClick={() =>
                    Cancel(
                      `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                    )
                  }
                >
                  <MdCancel />
                </h1>
              </div>
              </>
          ): ("")) : ("")} */}
                                    </>
                                  ) : ( "")) : ( "")}


      <div
                className="tooltip ml-4"
                data-tip="ดู เอกสารทั้งหมด"
              >
                <h1
                  className="text-primary text-2xl"
                  onClick={() =>
                    DocumentList(
                      `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                    )
                  }
                >
              <HiDocumentSearch />
              </h1>
              </div>

    </td>
    <td>
      {bill.RefId ? (
          (bill.ClaimStatusDesc === "Approve" || bill.ClaimStatusDesc === "Received") ? bill.BatchNumber ? ("") : (
            <>
              <button
                className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 ml-4"
                onClick={() =>
                  handleButtonClick(
                    `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                  )
                }
              >
                วางบิล
              </button>
            </>
          ) : (
            ""
          )
        ) : (
          "Loading..."
        )
    }
      </td>
  </tr>
  ): "")
        ))
        ) : ""): (
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                )
            }
            </tbody>
          </table> 

          {post ?
      <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
      <div className="flex justify-between text-right">
        <div className="text-right">
          <h1 className="text-lg">Showing {startIndex+1} to {endIndex} of {post ? post.Result.TransactionClaimInfo.length : ""} entries.</h1>
        </div>
      </div>
      <div className="text-right text-base-100 ">
        {/* <div className="text-left text-base-100"> */}
        
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="btn btn-primary ">
            <BiFirstPage className="text-base-100 text-xl text-right" />
          </button>
        )}
        {/* </div>
        <div className="text-center"> */}

        {/* {console.log(endIndex)}
        {console.log(startIndex)}
        {console.log(ITEMS_PER_PAGE)} */}


        {/* </div>
        <div className="text-right"> */}
        {endIndex < currentData.length && (
          <button onClick={handleNextPage} className="btn btn-primary ml-2">
           <BiLastPage className="text-base-100 text-xl" /> 
          </button>
        )}
      </div>
        </div>
        : ""}






        </div>
      {/* </div> */}










    
  </div>
</div>

<dialog id="my_modal_3" className="modal text-xl	w-full">
            <div className="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>

                <h3 className="font-bold text-lg">ส่งเอกสาร วางบิล</h3>
                <hr />
                <div className="flex items-center mt-3">
                  <table className="table table-zebra mt-2">
                    <thead>
                      <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                        <th className="w-2/5">ชื่อไฟล์ จากแผนกการเงิน</th>
                        <th className="w-1/5"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
              {/* {console.log(billList)} */}
                      {billList ? (
                        billList.map((list, index) => 
                          list.documenttypecode !== "003" &&
                          (
                          <tr key={index} className=" bg-neutral text-sm">
                            <td className="px-6 py-4 break-words text-wrap">
                              {list.filename}
                              <br/>{list.originalname}
                            </td>
                            <td className="px-6 py-4 break-words">
                        
                                <div
                                  className="btn btn-primary  mr-2 text-base-100 hover:text-primary hover:bg-base-100"
                                  type="submit"
                                  onClick={() => DocumentBase64(list.filename)}
                                >
                                  Document
                                </div>
                     
                             
                                {/* <div className="btn btn-error  mr-2 text-base-100 hover:text-error hover:bg-base-100" type="submit"
                                onClick={() => CancleDoc(list.filename)}
                                >
                                Cancel
                                </div> */}
                      
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
                </div>
                <div className="grid gap-2 w-full mt-10">
                  <div className="px-2 rounded-md">
                    <div className="flex items-center ">
                      <input
                        type="file"
                        accept=".pdf"
                        className="file-input file-input-bordered file-input-info w-5/6"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                      <div
                        className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 w-1/6 ml-2"
                        onClick={handleUpload}
                      >
                        <FaCloudUploadAlt className="size-6" />
                      </div>
                    </div>
                    <div className="label">
                  <span className="label-text-alt text-error text-sm">
                    ** Upload เอกสาร สำหรับเอกสารวางบิล**
                  </span>
                </div>
                  </div>
                </div>
                {progress.started && (
                  <progress
                    max="100"
                    value={progress.pc}
                    className="mt-2 w-full"
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

                <div className="flex items-center mt-3 ">
                  <table className="table table-zebra mt-2 ">
                    <thead>
                      <tr className="text-base-100 bg-primary text-sm text-center">
                        <th className="w-2/5">ชื่อไฟล์ ที่จะส่งบิลให้บริษัทประกัน</th>
                        <th className="w-1/5"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
              
                      {billList ? (
                        billList.map((list, index) => 
                          list.documenttypecode === "003" &&(
                          <tr key={index} className=" bg-neutral text-sm">
                            <td className="text-wrap">
                              {list.filename}
                              <br/>{list.originalname}
                            </td>
                            <td className="px-6 py-4 break-words">
                        
                                <div
                                  className="btn btn-primary  mr-2 text-base-100 hover:text-primary hover:bg-base-100"
                                  type="submit"
                                  onClick={() => DocumentBase64(list.filename)}
                                >
                                  Document
                                </div>
                     
                             
                                <div className="btn btn-error  mr-2 text-base-100 hover:text-error hover:bg-base-100" type="submit"
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
                </div>
                <div className="modal-action">
                  <div
                    className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100"
                    onClick={submitbilling}
                  >
                    ส่งวางบิล
                  </div>

                </div>
                <div className="label">
                  <span className="label-text-alt text-base-100 text-sm bg-error px-6 py-4 w-full">
                    หลังจากกดปุ่ม "ส่งวางบิล" เรียบร้อยแล้ว <br/>จะไม่สามารถยกเลิกหรือแก้ไขได้ หากยกเลิกต้องติดต่อกับสินไหม หากมีการโอนเงินแล้วจะต้องทำเรื่องโอนเงินคืนก่อน ถึงจะยกเลิกเคสนี้แล้วต้องส่งใหม่ทั้งหมด !!
                  </span>
                </div>
              </form>
            </div>
          </dialog>

          {detailData ? <DetailDischarge data={detailData} /> : ""}



      <dialog id="my_modal_4" className="modal text-xl	">
            <div className="modal-box max-w-3xl">
              <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
                <h3 className="font-bold text-lg">เอกสารทั้งหมด</h3>
                <hr />

                  {/* <div className="rounded-md mt-9">
                    <div className="flex items-center ">
                      <input
                        type="file"
                        accept=".pdf"
                        className="file-input file-input-bordered file-input-info w-5/6"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                      <div
                        className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 w-1/6 ml-2"
                        onClick={handleUpload}
                      >
                        <FaCloudUploadAlt className="size-6" />
                      </div>
                    </div>
                  </div> */}
                {progress.started && (
                  <progress
                    max="100"
                    value={progress.pc}
                    className="mt-2 w-full"
                  ></progress>
                )}

               <h1 className="text-center mt-2">{msg}</h1>  

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
                                <div className="flex items-center mt-3">
                  <table className="table table-zebra mt-2">
                    <thead>
                      <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th className="w-2/5">ชื่อไฟล์</th>
                      <th className="w-2/5">ประเภทเอกสาร</th>
                        <th className="w-1/5"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {billList ? (
                        billList.map((list, index) => (
                          <tr key={index} className=" bg-neutral text-sm">
                            <td className="px-6 py-4 break-words">
                              {list.filename}
                              <br/>{list.originalname}
                            </td>
                            <td className="px-6 py-4 break-words">
                            {
                  
                              docType.Result.map((type,index) => 
                                list.documenttypecode === type.documenttypecode ? (
                              <h1 key={index}>{type.documenttypename} </h1>      
                                  ) : ""
                            ) 
                          }
                          </td>
                          <td className="px-6 py-4 break-words flex items-center">
                        
                                <div
                                  className="btn btn-primary  mr-2 text-base-100 hover:text-primary hover:bg-base-100"
                                  type="submit"
                                  onClick={() => DocumentBase64(list.filename)}
                                >
                                  Document
                                </div>
                     
                             
                                {/* <div className="btn btn-error  mr-2 text-base-100 hover:text-error hover:bg-base-100" type="submit"
                                onClick={() => CancleDoc(list.filename)}
                                >
                                Cancel
                                </div> */}
                      
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
                </div>
            </div>
          </dialog>


      {showModal ? (
        <>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-4xl font-bold mb-4 text-primary">
                วางบิลเรียบร้อยแล้ว
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
