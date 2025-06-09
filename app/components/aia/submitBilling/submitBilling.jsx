"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import useEffectOnce from "/hooks/use-effect-once";
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
import { Button, Menu, MenuItem , Dialog } from "@mui/material";
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
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
export default function checkData() {
  const InsuranceCode = 13;
  //const ReDux = useSelector((state) => ({ ...state }));
  const [doTransactionData, setDoTransactionData] = useState("");
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
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
  const [file, setFile] = useState(null);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  
  const [refreshSucc, setRefreshSucc] = useState("");
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [refIdL, setRefIdL] = useState("");
  const [showModalRefresh, setShowModalRefresh] = useState(false);
  const [pIDL, setPIDL] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [billValue, setBillValue] = useState("ทั้งหมด")
  const [passportNumberL, setPassportNumberL] = useState("");
  const [randomNumber, setRandomNumber] = useState('');
  const [illnessType, setIllnessType] = useState();
  const [transactionNoL, setTransactionNoL] = useState("");
  const [hNL, setHNL] = useState("");
  const [vNL, setVNL] = useState("");
  const [patientUpdate, setPatientUpdate] = useState("");
  const [invoiceNumberL, setInvoiceNumberL] = useState("");
  const [serviceValue, setServiceValue] = useState("OPD");
  const [serviceCode, setServiceCode] = useState("");
  const [detailData, setDetailData] = useState("");
  const [showDetailData, setShowDetailData] = useState(false);
  const [showDocError, setShowDocError] = useState("");
  const [massDocError, setMassDocError] = useState("");
  const [base64, setBase64] = useState("");
  const [notShowLoc, setNotShowLoc] = useState(false);

  const copyTran = (data) => {
    const jsonString = JSON.stringify(data, null, 2); // แปลงข้อมูลเป็น JSON String
    const result = navigator.clipboard.writeText(jsonString);

    result.then(() => {
      console.log(jsonString);
    });

  };
  const DoTransaction = (data) => {
    console.log(data);
    setDoTransactionData(data);
    document.getElementById("DoTransaction").showModal();
  };
  useEffectOnce(() => {
    setPost("");
    setCurrentData("");
    axios
    .get(
      process.env.NEXT_PUBLIC_URL_SV +
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
      setMassError(err.message);
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
        if(serviceValue === "IPD"){
          if(response.data.Result.TransactionClaimInfo[0].HN){
          const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
          setCurrentData(response.data.Result.TransactionClaimInfo)
          async function fetchData() {
            const promises = response.data.Result.TransactionClaimInfo.map(async (item) => {
              const response2 = await axios.post(
                process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNo,
                { "PatientInfo": { "RefId": item.RefId } }
              );
              return { ...item, PolicyNo: response2.data.Result.PolicyNumberInfo };
            });
          
            const results = await Promise.all(promises); // รอให้ทุก Promise เสร็จ
  
  
  
  
            const promises2 = results.map(async (item) => {
              const response3 = await axios.post(
                process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNodetail,
                { "PatientInfo": { "RefId": item.RefId } }
              );
              return { ...item, PolicyNodetail: response3.data.Result.PolicyNumberInfo };
            });
          
            const results2 = await Promise.all(promises2); // รอให้ทุก Promise เสร็จ
           // console.log(results)
            console.log(results2); // results จะเป็น array ที่มีข้อมูลทั้งหมดรวมกับ PolicyNodetail
  
            setCurrentData(results2);
          }
          fetchData();


          setPost(filteredClaims);
          }else{

            setPost(response.data.Result.TransactionClaimInfo);
          }

        }else{
          setPost(response.data.Result.TransactionClaimInfo);
        }
      })
      .catch((error) => {
        console.log(error);

        setShowFormError("Error");
        setMassError(error.message);
      });
    });

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
      setBillList();
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
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_getlistDocumentClaim,
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
  useEffectOnce(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
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
          setMassError(error.response.data.HTTPStatus.message);
          setShowFormError("Error");
        }
      });
  });
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
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getlistDocumentClaim,
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
    setStatusValue(null);
    setNumberValue(null);
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
    if(serviceValue === "IPD"){
      console.log("IPD")
      if(response.data.Result.TransactionClaimInfo[0].HN){
      const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
      setCurrentData(response.data.Result.TransactionClaimInfo)
      async function fetchData() {
        const promises = response.data.Result.TransactionClaimInfo.map(async (item) => {
          const response2 = await axios.post(
            process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNo,
            { "PatientInfo": { "RefId": item.RefId } }
          );
          return { ...item, PolicyNo: response2.data.Result.PolicyNumberInfo };
        });
      
        const results = await Promise.all(promises); // รอให้ทุก Promise เสร็จ




        const promises2 = results.map(async (item) => {
          const response3 = await axios.post(
            process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNodetail,
            { "PatientInfo": { "RefId": item.RefId } }
          );
          return { ...item, PolicyNodetail: response3.data.Result.PolicyNumberInfo };
        });
      
        const results2 = await Promise.all(promises2); // รอให้ทุก Promise เสร็จ
       // console.log(results)
        console.log(results2); // results จะเป็น array ที่มีข้อมูลทั้งหมดรวมกับ PolicyNodetail

        setCurrentData(results2);
      }
      fetchData();
      setPost(filteredClaims);
      }else{

        setPost(response.data.Result.TransactionClaimInfo);
      }

    }else{
      console.log("OPD")
      setPost(response.data.Result.TransactionClaimInfo);
    }
  })
  .catch((error) => {
    console.log(error);

    setShowFormError("Error");
    setMassError(error.message);
  });
};
  const Refresh = (data) => {
    setShowModalRefresh(true);
    setPost("");
    setCurrentData("");
    setShowFormError();
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
    console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
        { PatientInfo }
      )
      .then((response) => {
        console.log(response.data);

        document.getElementById('my_modal_showModalRefreshSucc').showModal()
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
        setCurrentDate(now.toLocaleDateString());
        setRefreshSucc(response.data);

        console.log(patientUpdate);
        if(patientUpdate){
        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SearchTransection,
            patientUpdate
          )
          .then((response) => {
            console.log(response.data)
            setShowModalRefresh(false);
            if(serviceValue === "IPD"){
              if(response.data.Result.TransactionClaimInfo[0].HN){
              const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
              setCurrentData(response.data.Result.TransactionClaimInfo)
              async function fetchData() {
                const promises = response.data.Result.TransactionClaimInfo.map(async (item) => {
                  const response2 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNo,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNo: response2.data.Result.PolicyNumberInfo };
                });
              
                const results = await Promise.all(promises); // รอให้ทุก Promise เสร็จ
      
      
      
      
                const promises2 = results.map(async (item) => {
                  const response3 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNodetail,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNodetail: response3.data.Result.PolicyNumberInfo };
                });
              
                const results2 = await Promise.all(promises2); // รอให้ทุก Promise เสร็จ
               // console.log(results)
                console.log(results2); // results จะเป็น array ที่มีข้อมูลทั้งหมดรวมกับ PolicyNodetail
      
                setCurrentData(results2);
              }
              fetchData();
              setPost(filteredClaims);
              }else{

                setPost(response.data.Result.TransactionClaimInfo);
              }
  
            }else{
              setPost(response.data.Result.TransactionClaimInfo);
            }
          })
          .catch((error) => {
            console.log(error);

            setShowFormError("Error");
            setMassError(error.message);
          });
        }else{

          const today = dayjs().format("YYYY-MM-DD");
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
            StatusChangedAtDatefrom: "",
            StatusChangedAtDateto: "",
      
            StatusClaimCode: "",
            ServiceSettingCode: serviceValue,
          };


          axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SearchTransection,
              { PatientInfo } 
          )
          .then((response) => {
            console.log(response.data)
            setShowModalRefresh(false);
            if(serviceValue === "IPD"){
              if(response.data.Result.TransactionClaimInfo[0].HN){
              const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
              setCurrentData(response.data.Result.TransactionClaimInfo)
              async function fetchData() {
                const promises = response.data.Result.TransactionClaimInfo.map(async (item) => {
                  const response2 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNo,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNo: response2.data.Result.PolicyNumberInfo };
                });
              
                const results = await Promise.all(promises); // รอให้ทุก Promise เสร็จ
      
      
      
      
                const promises2 = results.map(async (item) => {
                  const response3 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNodetail,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNodetail: response3.data.Result.PolicyNumberInfo };
                });
              
                const results2 = await Promise.all(promises2); // รอให้ทุก Promise เสร็จ
               // console.log(results)
                console.log(results2); // results จะเป็น array ที่มีข้อมูลทั้งหมดรวมกับ PolicyNodetail
      
                setCurrentData(results2);
              }
              fetchData();
              setPost(filteredClaims);
              }else{

                setPost(response.data.Result.TransactionClaimInfo);
              }
  
            }else{
              setPost(response.data.Result.TransactionClaimInfo);
            }
          })
          .catch((error) => {
            console.log(error);

            setShowFormError("Error");
            setMassError(error.message);
          });
        }


      })

      .catch((error) => {
        // console.error("Error", error)
        console.log(error);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
         setMassError(error.response.data.HTTPStatus.message);




         

        console.log(patientUpdate);
        if(patientUpdate){
        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SearchTransection,
            patientUpdate
          )
          .then((response) => {
            console.log(response.data)
            if(serviceValue === "IPD"){
              if(response.data.Result.TransactionClaimInfo[0].HN){
              const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
              setCurrentData(response.data.Result.TransactionClaimInfo)
              async function fetchData() {
                const promises = response.data.Result.TransactionClaimInfo.map(async (item) => {
                  const response2 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNo,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNo: response2.data.Result.PolicyNumberInfo };
                });
              
                const results = await Promise.all(promises); // รอให้ทุก Promise เสร็จ
      
      
      
      
                const promises2 = results.map(async (item) => {
                  const response3 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNodetail,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNodetail: response3.data.Result.PolicyNumberInfo };
                });
              
                const results2 = await Promise.all(promises2); // รอให้ทุก Promise เสร็จ
               // console.log(results)
                console.log(results2); // results จะเป็น array ที่มีข้อมูลทั้งหมดรวมกับ PolicyNodetail
      
                setCurrentData(results2);
              }
              fetchData();
              setPost(filteredClaims);
              }else{

                setPost(response.data.Result.TransactionClaimInfo);
              }
  
            }else{
              setPost(response.data.Result.TransactionClaimInfo);
            }
          })
          .catch((error) => {
            console.log(error);

            setShowFormError("Error");
            setMassError(error.message);
          });
        }else{

          const today = dayjs().format("YYYY-MM-DD");
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
            StatusChangedAtDatefrom: "",
            StatusChangedAtDateto: "",
      
            StatusClaimCode: "",
            ServiceSettingCode: serviceValue,
          };


          axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SearchTransection,
              { PatientInfo } 
          )
          .then((response) => {
            console.log(response.data)

            if(serviceValue === "IPD"){
              if(response.data.Result.TransactionClaimInfo[0].HN){
              const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
              setCurrentData(response.data.Result.TransactionClaimInfo)
              async function fetchData() {
                const promises = response.data.Result.TransactionClaimInfo.map(async (item) => {
                  const response2 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNo,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNo: response2.data.Result.PolicyNumberInfo };
                });
              
                const results = await Promise.all(promises); // รอให้ทุก Promise เสร็จ
      
      
      
      
                const promises2 = results.map(async (item) => {
                  const response3 = await axios.post(
                    process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNodetail,
                    { "PatientInfo": { "RefId": item.RefId } }
                  );
                  return { ...item, PolicyNodetail: response3.data.Result.PolicyNumberInfo };
                });
              
                const results2 = await Promise.all(promises2); // รอให้ทุก Promise เสร็จ
               // console.log(results)
                console.log(results2); // results จะเป็น array ที่มีข้อมูลทั้งหมดรวมกับ PolicyNodetail
      
                setCurrentData(results2);
              }
              fetchData();
              setPost(filteredClaims);
              }else{

                setPost(response.data.Result.TransactionClaimInfo);
              }
            }else{
              setPost(response.data.Result.TransactionClaimInfo);
            }
          })
          .catch((error) => {
            console.log(error);

            setShowFormError("Error");
            setMassError(error.message);
          });
        }
      });


  };

  const Detail = (data) => {
    console.log(showDetailData)
    setShowFormError();
    setShowDetailData(true);
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
  const showDetailDataClose = () => {
    setShowDetailData(false);
  }

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
          process.env.NEXT_PUBLIC_URL_SV +
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
    if(serviceValue === "IPD"){
      setNotShowLoc(true);
    }else{
      setNotShowLoc(false);
    }
    if (selectedIdType === "NATIONAL_ID" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: selectedIdType,
        InvoiceNumber: "",
        ClaimNo : "",
        VN: numberValue.trim(),
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
        ClaimNo : "",
        VN: "",
        PID: "",
        PassportNumber: numberValue.trim(),
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
        ClaimNo : "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: numberValue.trim(),
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
        ClaimNo : "",
        VN: "",
        PID: numberValue.trim(),
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "ClaimNo" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
         IdType: selectedIdType,
        InvoiceNumber: "",
        ClaimNo : numberValue.trim(),
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
        ClaimNo : "",
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
          ClaimNo : "",
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
        ClaimNo : "",
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
   ClaimNo : "",
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
      setPatientUpdate({ PatientInfo });

    if(PatientInfo){
      setPatientInfoDetail(PatientInfo)

     axios
       .post(
         process.env.NEXT_PUBLIC_URL_SV +
           process.env.NEXT_PUBLIC_URL_SearchTransection,
         { PatientInfo }
       )
       .then((response) => {
          console.log(response.data.Result)
        if(serviceValue === "IPD"){
          console.log("IPD")
          if(response.data.Result.TransactionClaimInfo[0].HN){
          const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
          setPost(filteredClaims);
          // console.log(filteredClaims);
          }else{

            setPost(response.data.Result.TransactionClaimInfo);
          }
        }else{
          console.log("OPD")
          setPost(response.data.Result.TransactionClaimInfo);
        }
         
      
         setCurrentData(response.data.Result.TransactionClaimInfo)
         async function fetchData() {
          const promises = response.data.Result.TransactionClaimInfo.map(async (item) => {
            const response2 = await axios.post(
              process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNo,
              { "PatientInfo": { "RefId": item.RefId } }
            );
            return { ...item, PolicyNo: response2.data.Result.PolicyNumberInfo };
          });
        
          const results = await Promise.all(promises); // รอให้ทุก Promise เสร็จ




          const promises2 = results.map(async (item) => {
            const response3 = await axios.post(
              process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_getListPolicyNodetail,
              { "PatientInfo": { "RefId": item.RefId } }
            );
            return { ...item, PolicyNodetail: response3.data.Result.PolicyNumberInfo };
          });
        
          const results2 = await Promise.all(promises2); // รอให้ทุก Promise เสร็จ
         // console.log(results)
          console.log(results2); // results จะเป็น array ที่มีข้อมูลทั้งหมดรวมกับ PolicyNodetail

          setCurrentData(results2);
        }
        fetchData();
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
        process.env.NEXT_PUBLIC_URL_SV +
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


        }, 2000);

      }else{
          console.log(response.data);
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
  const DocumentBase64All = (data) => {
    setMsg();
    setProgress({ started: false, pc: 0 });
    const PA= {
       RefId: refIdL,
          TransactionNo: transactionNoL,
          HN: hNL,
          VN: vNL,
          DocumentName: data,
    }
    console.log(PA)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getDocumentByDocname,
        {
          RefId: refIdL,
          TransactionNo: transactionNoL,
          HN: hNL,
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
  process.env.NEXT_PUBLIC_URL_SV +
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
  // console.log(PatientInfo)
  axios
    .post(
      process.env.NEXT_PUBLIC_URL_SV +
        process.env.NEXT_PUBLIC_URL_getlistDocumentClaim,
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
        process.env.NEXT_PUBLIC_URL_SV +
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
    const isConfirmed = window.confirm("แน่ใจแล้วที่จะยกเลิกเอกสารใช่ไหม");
    if (isConfirmed) {
    setMsg();
    setShowDocError();
    setProgress({ started: false, pc: 0 });
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_isClaimExcludedByDocName,
        {
          "PatientInfo": {
          RefId: refIdL,
          TransactionNo: transactionNoL,
          DocumentName: data,
          }
        }
      )
      .then((response) => {
        console.log(response.data);

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
      //console.log(PatientInfo)
      setBillList();
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_getlistDocumentClaim,
          {
            PatientInfo
          }
        )
        .then((response) => {
          console.log(response.data);
          setBillList(response.data);
          
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
      Runningdocument : "",
      
    };
    //console.log(PatientInfo)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getlistDocumentClaim,
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

    document.getElementById("my_modal_3").showModal();
  };
  const formatNumber = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  
  ////////////////////////// ตัวเลื่อน ตารางซ้าย - ขวา ///////////////////////////////////////////
  const ITEMS_PER_PAGE = 40
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

  //  const RefreshAll = () => {
  //   setPost("");
  //   setCurrentData("");
  // // const extractedRefId = data.map(item => item.RefId);
  // // const extractedTransactionNo = data.map(item => item.TransactionNo);

  // const PatientInfo = data.map(item => ({
  //   RefId: item.RefId,
  //   TransactionNo: item.TransactionNo
  // }));
  
  
      
    
  //   //console.log(PatientInfo)
  //    axios
  //      .post(
  //        process.env.NEXT_PUBLIC_URL_SV +
  //          process.env.NEXT_PUBLIC_URL_getcheckclaimstatusListAll,
  //        { "PatientInfo" :   PatientInfo  }
  //      )
  //      .then((response) => {
  //        console.log(response.data);

  //       //  const All = data.map(item => item.TransactionNo);
  //        const AllPatient = response.data.Result.InsuranceData.map(item => ({
  //         RefId: item.RefId,
  //         TransactionNo: item.TransactionNo,
  //           InsurerCode: item.StatusInfo.InsurerCode,
  //           BatchNumber:  item.StatusInfo.BatchNumber,
  //            ClaimStatus:  item.StatusInfo.ClaimStatus,
  //            ClaimStatusDesc:  item.StatusInfo.ClaimStatusDesc,
  //            TotalApproveAmount:  item.StatusInfo.TotalApproveAmount,
  //            PaymentDate:  item.StatusInfo.PaymentDate,
  //            InvoiceNumber:  item.StatusInfo.InvoiceNumber,
  //       }));
  //        console.log(AllPatient)

  //        axios
  //        .post(
  //          process.env.NEXT_PUBLIC_URL_SV +
  //            process.env.NEXT_PUBLIC_URL_SearchTransection,
  //          { PatientInfo }
  //        )
  //        .then((response) => {

  //        //  console.log(response.data);
  //          setShowFormError();
  //          if(serviceValue === "IPD"){
  //           const filteredClaims = response.data.Result.TransactionClaimInfo.filter(claim => claim.IsIPDDischarge === true);
  //           setCurrentData(response.data.Result.TransactionClaimInfo)
  //           setPost(filteredClaims);

  //         }else{
  //           setPost(response.data.Result.TransactionClaimInfo);
  //         }
  //        })
  //        .catch((error) => {
  //          // console.error("Error", error)
  //          console.log(error);
  
  //          setShowFormError("Error");
  //          setMassError(error.message);
  //        });
 
  //       })
  //      .catch((error) => {
  //        console.log(error);
  //        setShowFormError("Error");
  //        setMassError(error.message);
  //      });
  //  };

    ///////////////////////////////////////////////
  
   useEffectOnce(() => {
    setCount(data.length);
  });
/////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="bg-base-100 border-base-300 rounded-box w-5/5 ">
        <form onSubmit={handleSubmit}>
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
                id="ClaimNo"
                name="identity_type"
                value="ClaimNo"
                className="checkbox checkbox-info"
                checked={selectedIdType === "ClaimNo"}
                onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;ClaimNo &nbsp;</p>
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

          <table className="table mt-2 text-xs">
          <thead className="bg-info text-base-100 text-center text-sm">
              <tr>
                       <th>Visit Date</th>
                <th>Full Name</th>
                <th>
                  HN <br /> VN
                </th>
                {notShowLoc === true ? "" : <th>Location</th>}
                {/* <th>Policy Number</th> */}
                <th>ClaimNo</th>
                <th>
                  Invoicenumber <br />
                  BatchNumber
                </th>
                <th>PolicyNo</th>
                <th className="w-40 ">Status</th>
                <th>
                  Total
                  <br />
                  Billamount
                </th>
                <th>
                  Approved
                  <br />
                  Amount
                </th>
                <th>
                  Excess
                  <br />
                  Amount
                </th>
                <th>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>

            {post ? post[0] ? (
      post.map((bill, index) => 
      (( ((bill.VisitDate||bill.HN) !== "")  && bill.ClaimStatusDesc_EN !=="waitting for discharge") && 
        ((billValue === "ทั้งหมด") ?(
                    <tr className="hover text-center" key={index}>
                      <td>{bill.VisitDate}</td>
                      <td>
                        {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                          <br /> ( {bill.ServiceSettingCode} -{" "}
                          {illnessType 
                            ? illnessType.Result.map((ill) =>
                                ill.illnesstypecode === bill.IllnessTypeCode ? (
                                  <> {ill.illnesstypedesc} </>
                                ) : (
                                  ""
                                )
                              )
                            : ""}{" "}
                          )
                          <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
                      </td>
                      <td> {bill.HN ? bill.HN : "-"} <br />{" "}
                      {bill.VN ? bill.VN : "-"}</td>
                      {notShowLoc === true ? "" :  <td>{bill.VisitLocation}</td>}
                      {/* <td>{bill.ClaimNo}</td> */}
                      <td>{bill.ClaimNo}</td>
                      <td>   {bill.InvoiceNumber ? bill.InvoiceNumber : "-"} <br />
                      {bill.BatchNumber}</td>
                      <td>
           
             <Tippy
content={
<div className="absolute left-1/2 -translate-x-1/2 top-full w-auto min-w-max bg-base-300 text-white text-sm p-3 rounded-lg transition-opacity duration-200 group-hover:opacity-100">
 <table className="">
 <thead className="bg-info ">
   <tr>
     <th className="border border-black px-2 py-1 text-black">เลขที่กรมธรรม์</th>
     <th className="border border-black px-2 py-1 text-black">สัญญาเพิ่มเติม</th>
     <th className="border border-black px-2 py-1 text-black">ผลการตรวจสอบ</th>
   </tr>
 </thead>
 <tbody>
 {bill.PolicyNodetail ? bill.PolicyNodetail[0] ? (
     bill.PolicyNodetail.map((policy, index) => (
       <tr key={index}>
         <td className="border border-black px-2 py-1 text-black">{policy.PolicyNo}</td>
         <td className="border border-black px-2 py-1 text-black">{policy.PlanName}</td>
         <td className="border border-black px-2 py-1 text-black">{policy.MessageTH}</td>
       </tr>
     ))
   ) : (
     <tr>
       <td colSpan="3" className="text-center border border-black px-2 py-1">
         ไม่มีข้อมูลกรมธรรม์
       </td>
     </tr>
   ): ""}
 </tbody>
</table>
</div>
}>

{bill.PolicyNo
   ? 

<div style={{ width: "170px",display: "flex", flexWrap: "wrap" }}>
{
   bill.PolicyNo.map((policy, index) => (
     <div
     key={index}
     style={{
       width: "50%",
       textAlign: index % 2 === 0 ? "right" : "left", // จัดให้เลขคู่ขวา เลขคี่ซ้าย
       padding: "2px",
     }}
   >
       <p key={index} value={policy.PolicyNo}>
         {policy.PolicyNo}
       </p>
       </div>

     ))
     }
     </div>
    
    : ""}

</Tippy>
   
</td>
                      <td>
                      <div className="grid gap-1 sm:grid-cols-1 w-full">
                              {bill.ClaimStatusDesc ? (
                                      bill.ClaimStatusDesc_EN !== "Cancelled" &&
                                      bill.ClaimStatusDesc_EN !==
                                        "Cancelled to AIA" &&
                                      bill.ClaimStatusDesc_EN !== "Reversed" &&
                                      bill.ClaimStatusDesc_EN !== "Decline" ? (
                                        bill.ClaimStatusDesc_EN ===
                                          "Approved" ||
                                        bill.ClaimStatusDesc_EN === "Settle" ? (
                                          <button
                                            onClick={() => DoTransaction(bill)}
                                            className="bg-info text-base-100 rounded-full px-3 py-1 w-full"
                                          >
                                            {bill.ClaimStatusDesc_TH}
                                          </button>
                                        ) : bill.ClaimStatusDesc_EN ===
                                            "Approve" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Received" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Pending" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "AddDoc" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Processing" ? (
                                          bill.ClaimStatusDesc_EN ===
                                          "Pending" ? (
                                            <button
                                              onClick={() =>
                                                DoTransaction(bill)
                                              }
                                              className="bg-accent text-base-100 rounded-full px-3 py-1 w-full"
                                            >
                                              {bill.ClaimStatusDesc_TH}
                                            </button>
                                           ) : bill.ClaimStatusDesc_EN === "Processing" ? (  <button onClick={() => DoTransaction(bill)} className="bg-accent text-base-100 rounded-full px-3 py-1 w-full">{bill.ClaimStatusDesc_TH}</button> ) :(
                                            <button
                                              onClick={() =>
                                                DoTransaction(bill)
                                              }
                                              className="bg-success text-base-100 rounded-full px-3 py-1 w-full"
                                            >
                                              {bill.ClaimStatusDesc_TH}
                                            </button>
                                          )
                                        ) : (
                                          <button
                                            onClick={() => DoTransaction(bill)}
                                            className="bg-warning  rounded-full px-3 py-1 w-full"
                                          >
                                            {bill.ClaimStatusDesc_TH}
                                          </button>
                                        )
                                      ) : (
                                        <button
                                          onClick={() => DoTransaction(bill)}
                                          className="bg-error text-base-100 rounded-full px-3 py-1 w-full"
                                        >
                                          {bill.ClaimStatusDesc_TH}
                                        </button>
                                      )
                                    ) : (
                                      ""
                                    )}
                 


                 <span style={{ display: "inline", whiteSpace: "nowrap" }} className="mt-2">
  {bill.FurtherClaimNo || bill.FurtherClaimId ? <a className="bg-secondary text-base-100 rounded-full px-3 py-1  w-full">แบบต่อเนื่อง</a> : ""}
  {bill.AccidentDate || bill.IllnessTypeCode === "ACC" || bill.IllnessTypeCode === "ER" ? <a className="bg-error text-base-100 rounded-full px-3 py-1  w-full ml-1">อุบัติเหตุ</a> : ""}
</span>
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
                                        bill.TotalApprovedAmount
                                      ).toLocaleString("en-US", {
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
                            ( (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
                            (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
                            (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="")) ? (
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
                        <div className="tooltip" data-tip="ข้อมูลส่งเคลม">
                          <h1
                            className="text-error text-2xl"
                            onClick={() =>
                              Detail(
                                 `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate} | ${bill.Runningdocument} | ${bill.futherclaimVN} | ${bill.Visitlocation}`
                              )
                            }
                          >
                            <IoDocumentText />
                          </h1>
                        </div>

                                                      </>
                                                    ) :  "" )) : ( "")}
        

                        <div
                                  className="tooltip"
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
                           (bill.ClaimStatusDesc === "Approve") ? bill.BatchNumber ? ("") : (
                              <>
                                <button
                                  className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 ml-4 whitespace-nowrap btn-sm text-xs px-2 py-1"
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
      ) : (
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>No data available in table</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      ): ""}
            </tbody>
          </table> 

          {post ? post[0] ? (
      <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
      <div className="flex justify-between text-right">
        <div className="text-right">
          <h1 className="text-lg">Showing {startIndex+1} to {endIndex} of {post ? post.length : ""} entries.</h1>
        </div>
      </div>
      <div className="text-right text-base-100 ">
        {/* <div className="text-left text-base-100"> */}
        
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="btn btn-primary ">
            <BiFirstPage className="text-base-100 text-xl text-right" />
          </button>
        )}
        {endIndex < currentData.length && (
          <button onClick={handleNextPage} className="btn btn-primary ml-2">
           <BiLastPage className="text-base-100 text-xl" /> 
          </button>
        )}
      </div>
        </div>
       ) : "" : ""}








         
        </div>
      {/* </div> */}


</div>



     <input type="radio" name="my_tabs_2" role="tab"  className="tab w-[500px] text-sm inline-flex space-x-2 whitespace-nowrap" aria-label="รอวางบิล"     />
     <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
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

          <table className="table mt-2 text-xs">
          <thead className="bg-info text-base-100 text-center text-sm">
              <tr>
              <th>Visit Date</th>
                <th>Full Name</th>
                <th>
                  HN <br /> VN
                </th>
                {notShowLoc === true ? "" : <th>Location</th>}
                {/* <th>Policy Number</th> */}
                <th>ClaimNo</th>
                <th>
                  Invoicenumber <br />
                  BatchNumber
                </th>
                <th>PolicyNo</th>
                <th className="w-40 ">Status</th>
                <th>
                  Total
                  <br />
                  Billamount
                </th>
                <th>
                  Approved
                  <br />
                  Amount
                </th>
                <th>
                  Excess
                  <br />
                  Amount
                </th>
                <th>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {post ? post[0] ? (

post.map((bill, index) => 
  (( ((bill.VisitDate||bill.HN) !== "")  && bill.ClaimStatusDesc_EN !=="waitting for discharge") && 
 ((bill.ClaimStatusDesc_EN !== "Cancelled")&&(bill.ClaimStatusDesc_EN !== "Cancelled to AIA")&&!bill.BatchNumber ? (
  //  console.log("ยังไม่วางบิล")
  <tr className="hover text-center" key={index}>
    <td>{bill.VisitDate}</td>
    <td>
    {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                          <br /> ( {bill.ServiceSettingCode} -{" "}
                          {illnessType
                            ? illnessType.Result.map((ill) =>
                                ill.illnesstypecode === bill.IllnessTypeCode ? (
                                  <> {ill.illnesstypedesc} </>
                                ) : (
                                  ""
                                )
                              )
                            : ""}{" "}
                          )
                          <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
    </td>
    <td>{bill.HN ? bill.HN : "-"} <br />{" "}
    {bill.VN ? bill.VN : "-"}
    </td>
    {notShowLoc === true ? "" :  <td>{bill.VisitLocation}</td> }
    {/* <td>{bill.ClaimNo}</td> */}
    <td>{bill.ClaimNo}</td>
    <td>   {bill.InvoiceNumber ? bill.InvoiceNumber : "-"} <br />
                      {bill.BatchNumber}
  </td>
  <td>
             
             <Tippy
content={
<div className="absolute left-1/2 -translate-x-1/2 top-full w-auto min-w-max bg-base-300 text-white text-sm p-3 rounded-lg transition-opacity duration-200 group-hover:opacity-100">
 <table className="">
 <thead className="bg-info ">
   <tr>
     <th className="border border-black px-2 py-1 text-black">เลขที่กรมธรรม์</th>
     <th className="border border-black px-2 py-1 text-black">สัญญาเพิ่มเติม</th>
     <th className="border border-black px-2 py-1 text-black">ผลการตรวจสอบ</th>
   </tr>
 </thead>
 <tbody>
 {bill.PolicyNodetail ? bill.PolicyNodetail[0] ? (
     bill.PolicyNodetail.map((policy, index) => (
       <tr key={index}>
         <td className="border border-black px-2 py-1 text-black">{policy.PolicyNo}</td>
         <td className="border border-black px-2 py-1 text-black">{policy.PlanName}</td>
         <td className="border border-black px-2 py-1 text-black">{policy.MessageTH}</td>
       </tr>
     ))
   ) : (
     <tr>
       <td colSpan="3" className="text-center border border-black px-2 py-1">
         ไม่มีข้อมูลกรมธรรม์
       </td>
     </tr>
   ): ""}
 </tbody>
</table>
</div>
}>

{bill.PolicyNo
   ? 

<div style={{ width: "170px",display: "flex", flexWrap: "wrap" }}>
{
   bill.PolicyNo.map((policy, index) => (
     <div
     key={index}
     style={{
       width: "50%",
       textAlign: index % 2 === 0 ? "right" : "left", // จัดให้เลขคู่ขวา เลขคี่ซ้าย
       padding: "2px",
     }}
   >
       <p key={index} value={policy.PolicyNo}>
         {policy.PolicyNo}
       </p>
       </div>

     ))
     }
     </div>
    
    : ""}

</Tippy>
   
</td>
    <td>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
                              {bill.ClaimStatusDesc ? (
                                      bill.ClaimStatusDesc_EN !== "Cancelled" &&
                                      bill.ClaimStatusDesc_EN !==
                                        "Cancelled to AIA" &&
                                      bill.ClaimStatusDesc_EN !== "Reversed" &&
                                      bill.ClaimStatusDesc_EN !== "Decline" ? (
                                        bill.ClaimStatusDesc_EN ===
                                          "Approved" ||
                                        bill.ClaimStatusDesc_EN === "Settle" ? (
                                          <button
                                            onClick={() => DoTransaction(bill)}
                                            className="bg-info text-base-100 rounded-full px-3 py-1 w-full"
                                          >
                                            {bill.ClaimStatusDesc_TH}
                                          </button>
                                        ) : bill.ClaimStatusDesc_EN ===
                                            "Approve" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Received" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Pending" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "AddDoc" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Processing" ? (
                                          bill.ClaimStatusDesc_EN ===
                                          "Pending" ? (
                                            <button
                                              onClick={() =>
                                                DoTransaction(bill)
                                              }
                                              className="bg-accent text-base-100 rounded-full px-3 py-1 w-full"
                                            >
                                              {bill.ClaimStatusDesc_TH}
                                            </button>
                                           ) : bill.ClaimStatusDesc_EN === "Processing" ? (  <button onClick={() => DoTransaction(bill)} className="bg-accent text-base-100 rounded-full px-3 py-1 w-full">{bill.ClaimStatusDesc_TH}</button> ) :(
                                            <button
                                              onClick={() =>
                                                DoTransaction(bill)
                                              }
                                              className="bg-success text-base-100 rounded-full px-3 py-1 w-full"
                                            >
                                              {bill.ClaimStatusDesc_TH}
                                            </button>
                                          )
                                        ) : (
                                          <button
                                            onClick={() => DoTransaction(bill)}
                                            className="bg-warning  rounded-full px-3 py-1 w-full"
                                          >
                                            {bill.ClaimStatusDesc_TH}
                                          </button>
                                        )
                                      ) : (
                                        <button
                                          onClick={() => DoTransaction(bill)}
                                          className="bg-error text-base-100 rounded-full px-3 py-1 w-full"
                                        >
                                          {bill.ClaimStatusDesc_TH}
                                        </button>
                                      )
                                    ) : (
                                      ""
                                    )}
                 


                 <span style={{ display: "inline", whiteSpace: "nowrap" }} className="mt-2">
  {bill.FurtherClaimNo || bill.FurtherClaimId ? <a className="bg-secondary text-base-100 rounded-full px-3 py-1  w-full">แบบต่อเนื่อง</a> : ""}
  {bill.AccidentDate || bill.IllnessTypeCode === "ACC" || bill.IllnessTypeCode === "ER" ? <a className="bg-error text-base-100 rounded-full px-3 py-1  w-full ml-1">อุบัติเหตุ</a> : ""}
</span>
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
                                        bill.TotalApprovedAmount
                                      ).toLocaleString("en-US", {
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
          ( (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
          (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
          (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="")) ? (
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
      <div className="tooltip" data-tip="ข้อมูลส่งเคลม">
        <h1
          className="text-error text-2xl"
          onClick={() =>
            Detail(
               `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate} | ${bill.Runningdocument} | ${bill.futherclaimVN} | ${bill.Visitlocation}`
            )
          }
        >
          <IoDocumentText />
        </h1>
      </div>
                                    </>
                                  ) : ( "")) : ( "")}


      <div
                className="tooltip"
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
          (bill.ClaimStatusDesc === "Approve") ? bill.BatchNumber ? ("") : (
            <>
              <button
                className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 ml-4 whitespace-nowrap btn-sm text-xs px-2 py-1"
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
  ): "")
        ))
      ) : (
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>No data available in table</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      ): ""}
            </tbody>
          </table> 

          {post ? post[0] ? (
      <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
      <div className="flex justify-between text-right">
        <div className="text-right">
          <h1 className="text-lg">Showing {startIndex+1} to {endIndex} of {post ? post.length : ""} entries.</h1>
        </div>
      </div>
      <div className="text-right text-base-100 ">
        {/* <div className="text-left text-base-100"> */}
        
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="btn btn-primary ">
            <BiFirstPage className="text-base-100 text-xl text-right" />
          </button>
        )}
        {endIndex < currentData.length && (
          <button onClick={handleNextPage} className="btn btn-primary ml-2">
           <BiLastPage className="text-base-100 text-xl" /> 
          </button>
        )}
      </div>
        </div>
      ) : "" : ""}


        </div>
  

   
  </div>

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

          <table className="table mt-2 text-xs">
          <thead className="bg-info text-base-100 text-center text-sm">
              <tr>
              <th>Visit Date</th>
                <th>Full Name</th>
                <th>
                  HN <br /> VN
                </th>
                {notShowLoc === true ? "" : <th>Location</th>}
                {/* <th>Policy Number</th> */}
                <th>ClaimNo</th>
                <th>
                  Invoicenumber <br />
                  BatchNumber
                </th>
                <th>PolicyNo</th>
                <th className="w-40 ">Status</th>
                <th>
                  Total
                  <br />
                  Billamount
                </th>
                <th>
                  Approved
                  <br />
                  Amount
                </th>
                <th>
                  Excess
                  <br />
                  Amount
                </th>
                <th>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {post ? post[0] ? (
      post.map((bill, index) => 
        (( ((bill.VisitDate||bill.HN) !== "")  && bill.ClaimStatusDesc_EN !=="waitting for discharge") && 
 (bill.BatchNumber ? (
  //  console.log("ยังไม่วางบิล")
  <tr className="hover text-center" key={index}>
    <td>{bill.VisitDate}</td>
    <td>
    {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                          <br /> ( {bill.ServiceSettingCode} -{" "}
                          {illnessType
                            ? illnessType.Result.map((ill) =>
                                ill.illnesstypecode === bill.IllnessTypeCode ? (
                                  <> {ill.illnesstypedesc} </>
                                ) : (
                                  ""
                                )
                              )
                            : ""}{" "}
                          )
                          <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
    </td>
    <td>   {bill.HN ? bill.HN : "-"} <br />{" "}
    {bill.VN ? bill.VN : "-"}
    </td>
    {notShowLoc === true ? "" :  <td>{bill.VisitLocation}</td>}
    {/* <td>{bill.ClaimNo}</td> */}
    <td>{bill.ClaimNo}</td>
    <td>  
       {bill.InvoiceNumber ? bill.InvoiceNumber : "-"} <br />
                      {bill.BatchNumber}</td>
    <td>
    <td>
             
             <Tippy
content={
<div className="absolute left-1/2 -translate-x-1/2 top-full w-auto min-w-max bg-base-300 text-white text-sm p-3 rounded-lg transition-opacity duration-200 group-hover:opacity-100">
 <table className="">
 <thead className="bg-info ">
   <tr>
     <th className="border border-black px-2 py-1 text-black">เลขที่กรมธรรม์</th>
     <th className="border border-black px-2 py-1 text-black">สัญญาเพิ่มเติม</th>
     <th className="border border-black px-2 py-1 text-black">ผลการตรวจสอบ</th>
   </tr>
 </thead>
 <tbody>
 {bill.PolicyNodetail ? bill.PolicyNodetail[0] ? (
     bill.PolicyNodetail.map((policy, index) => (
       <tr key={index}>
         <td className="border border-black px-2 py-1 text-black">{policy.PolicyNo}</td>
         <td className="border border-black px-2 py-1 text-black">{policy.PlanName}</td>
         <td className="border border-black px-2 py-1 text-black">{policy.MessageTH}</td>
       </tr>
     ))
   ) : (
     <tr>
       <td colSpan="3" className="text-center border border-black px-2 py-1">
         ไม่มีข้อมูลกรมธรรม์
       </td>
     </tr>
   ): ""}
 </tbody>
</table>
</div>
}>

{bill.PolicyNo
   ? 

<div style={{ width: "170px",display: "flex", flexWrap: "wrap" }}>
{
   bill.PolicyNo.map((policy, index) => (
     <div
     key={index}
     style={{
       width: "50%",
       textAlign: index % 2 === 0 ? "right" : "left", // จัดให้เลขคู่ขวา เลขคี่ซ้าย
       padding: "2px",
     }}
   >
       <p key={index} value={policy.PolicyNo}>
         {policy.PolicyNo}
       </p>
       </div>

     ))
     }
     </div>
    
    : ""}

</Tippy>
   
</td>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
                              {bill.ClaimStatusDesc ? (
                                      bill.ClaimStatusDesc_EN !== "Cancelled" &&
                                      bill.ClaimStatusDesc_EN !==
                                        "Cancelled to AIA" &&
                                      bill.ClaimStatusDesc_EN !== "Reversed" &&
                                      bill.ClaimStatusDesc_EN !== "Decline" ? (
                                        bill.ClaimStatusDesc_EN ===
                                          "Approved" ||
                                        bill.ClaimStatusDesc_EN === "Settle" ? (
                                          <button
                                            onClick={() => DoTransaction(bill)}
                                            className="bg-info text-base-100 rounded-full px-3 py-1 w-full"
                                          >
                                            {bill.ClaimStatusDesc_TH}
                                          </button>
                                        ) : bill.ClaimStatusDesc_EN ===
                                            "Approve" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Received" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Pending" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "AddDoc" ||
                                          bill.ClaimStatusDesc_EN ===
                                            "Processing" ? (
                                          bill.ClaimStatusDesc_EN ===
                                          "Pending" ? (
                                            <button
                                              onClick={() =>
                                                DoTransaction(bill)
                                              }
                                              className="bg-accent text-base-100 rounded-full px-3 py-1 w-full"
                                            >
                                              {bill.ClaimStatusDesc_TH}
                                            </button>
                                           ) : bill.ClaimStatusDesc_EN === "Processing" ? (  <button onClick={() => DoTransaction(bill)} className="bg-accent text-base-100 rounded-full px-3 py-1 w-full">{bill.ClaimStatusDesc_TH}</button> ) :(
                                            <button
                                              onClick={() =>
                                                DoTransaction(bill)
                                              }
                                              className="bg-success text-base-100 rounded-full px-3 py-1 w-full"
                                            >
                                              {bill.ClaimStatusDesc_TH}
                                            </button>
                                          )
                                        ) : (
                                          <button
                                            onClick={() => DoTransaction(bill)}
                                            className="bg-warning  rounded-full px-3 py-1 w-full"
                                          >
                                            {bill.ClaimStatusDesc_TH}
                                          </button>
                                        )
                                      ) : (
                                        <button
                                          onClick={() => DoTransaction(bill)}
                                          className="bg-error text-base-100 rounded-full px-3 py-1 w-full"
                                        >
                                          {bill.ClaimStatusDesc_TH}
                                        </button>
                                      )
                                    ) : (
                                      ""
                                    )}
                 


                 <span style={{ display: "inline", whiteSpace: "nowrap" }} className="mt-2">
  {bill.FurtherClaimNo || bill.FurtherClaimId ? <a className="bg-secondary text-base-100 rounded-full px-3 py-1  w-full">แบบต่อเนื่อง</a> : ""}
  {bill.AccidentDate || bill.IllnessTypeCode === "ACC" || bill.IllnessTypeCode === "ER" ? <a className="bg-error text-base-100 rounded-full px-3 py-1  w-full ml-1">อุบัติเหตุ</a> : ""}
</span>
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
                                        bill.TotalApprovedAmount
                                      ).toLocaleString("en-US", {
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
          ( (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
          (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
          (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="")) ? (
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
      <div className="tooltip" data-tip="ข้อมูลส่งเคลม">
        <h1
          className="text-error text-2xl"
          onClick={() =>
            Detail(
               `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate} | ${bill.Runningdocument} | ${bill.futherclaimVN} | ${bill.Visitlocation}`
            )
          }
        >
          <IoDocumentText />
        </h1>
      </div>
                                    </>
                                  ) : ( "")) : ( "")}


      <div
                className="tooltip"
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
         (bill.ClaimStatusDesc === "Approve") ? bill.BatchNumber ? ("") : (
            <>
              <button
                className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 ml-4 whitespace-nowrap btn-sm text-xs px-2 py-1"
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
  ): "")
        ))
      ) : (
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>No data available in table</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      ): ""}
            </tbody>
          </table> 
          {post ? post[0] ? (
      <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
      <div className="flex justify-between text-right">
        <div className="text-right">
          <h1 className="text-lg">Showing {startIndex+1} to {endIndex} of {post ? post.length : ""} entries.</h1>
        </div>
      </div>
    
      <div className="text-right text-base-100 ">

        
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="btn btn-primary ">
            <BiFirstPage className="text-base-100 text-xl text-right" />
          </button>
        )}
        {endIndex < currentData.length && (
          <button onClick={handleNextPage} className="btn btn-primary ml-2">
           <BiLastPage className="text-base-100 text-xl" /> 
          </button>
        )}
      </div>
        </div>
        ) : "" : ""}
 






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
                        <th className="w-1/5">ประเภทเอกสาร</th>
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
                            <td className="px-6 py-4 break-words text-wrap">
                            {docType.Result.map((type, index) =>
                              list.documenttypecode ===
                              type.documenttypecode ? (
                                <h1 key={index}>{type.documenttypename} </h1>
                              ) : (
                                ""
                              )
                            )}
                            </td>
                            <td className="px-6 py-4 break-words">
                        
                                <div
                                  className="btn btn-primary  mr-2 text-base-100 hover:text-primary hover:bg-base-100"
                                  type="submit"
                                  onClick={() => DocumentBase64(list.filename)}
                                >
                                  Document
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
                        <th className="w-1/5">ประเภทเอกสาร</th>
                        <th className="w-1/5"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {/* {console.log(billList)} */}
                      {billList ? (
                        billList.map((list, index) => 
                          list.documenttypecode === "003" &&(
                          <tr key={index} className=" bg-neutral text-sm">
                            <td className="text-wrap">
                              {list.filename}
                              <br/>{list.originalname}
                            </td>
                            <td className="text-wrap">
                            {docType.Result.map((type, index) =>
                              list.documenttypecode ===
                              type.documenttypecode ? (
                                <h1 key={index}>{type.documenttypename} </h1>
                              ) : (
                                ""
                              )
                            )}
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

          <Dialog open={showDetailData} onClose={showDetailDataClose}>
          <DetailDischarge data={detailData} /> 
          </Dialog>



      <dialog id="my_modal_4" className="modal text-xl	">
            <div className="modal-box max-w-3xl">
              <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
                <h3 className="font-bold text-lg">เอกสารทั้งหมด</h3>
                <hr />

          
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
                            <td className="px-6 py-4 break-all">
                              {list.filename}
                              <br/>{list.originalname}
                            </td>
                            <td className="px-6 py-4 break-all">
                            {
                              docType.Result.map((type,index) => 
                                list.documenttypecode === type.documenttypecode ? (
                              <h1 key={index}>{type.documenttypename} </h1>      
                                  ) : ""
                            ) 
                          }
                          </td>
                          <td className="px-6 py-4 break-all flex items-center">
                        
                                <div
                                  className="btn btn-primary  mr-2 text-base-100 hover:text-primary hover:bg-base-100"
                                  type="submit"
                                  onClick={() => DocumentBase64All(list.filename)}
                                >
                                  Document
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
      {showModalRefresh ? (
            <>
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
           {showFormError === "Error" ? (


              // <div className="bg-white p-8 rounded shadow-lg">
                      <div className="modal-box max-w-3xl">
                                      <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setShowModalRefresh(false)} >✕</button>
               <h2 className="text-xl font-bold mb-4 text-error"> 
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
               </h2>  
               </form>
               </div>
           ): (
                  <CircularProgress disableShrink className="text-error"/>         
           )}
              </div>
            </>
          ) : (
            ""
          )}



<dialog id="my_modal_showModalRefreshSucc" className="modal">
  <div className="modal-box">
  <h3 className="font-bold text-2xl ">Update Status</h3>
  <hr/>
  <h3 className="font-bold text-2xl text-center text-error">
  DateTime : {currentDate} {currentTime}
  </h3>
    <h3 className="font-bold text-2xl text-accent text-center">
    Status : {refreshSucc ? refreshSucc.Result.InsuranceData.ClaimStatusDesc_TH : ""}
    </h3>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>





<dialog id="DoTransaction" className="modal text-xl">
            <div className="modal-box max-w-4xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">ข้อมูล Transaction & RefID</h3>
              <hr />
              <div
                role="alert"
                className="alert alert-error mt-2 text-base-100"
              >
                <span>
                  TransactionNo : {doTransactionData.TransactionNo} <br />
                  {/* RefID : {doTransactionData.RefId} <br /> */}
                  HN : {doTransactionData.HN} <br />
                  PID : {doTransactionData.PID} <br />
                  {/* Passport : {doTransactionData.PassportNumber} <br /> */}
                  VN : {doTransactionData.VN} <br />
                </span>
              </div>

              <center>
                <button
                  className="btn btn-success bg-success text-base-100 hover:text-success hover:bg-base-100 mt-2"
                  onClick={() => {
                    copyTran({
                      TransactionNo : doTransactionData.TransactionNo,
                      // RefID : doTransactionData.RefId,
                      HN : doTransactionData.HN,
                      PID : doTransactionData.PID,
                      // Passport : doTransactionData.PassportNumber,
                      VN : doTransactionData.VN,
                   });
                  }}
                  //   const textToCopy = document.getElementById(`TransactionNo: ${doTransactionData.TransactionNo}\nRefID: ${doTransactionData.RefId}`);
                  //    alert("เบราว์เซอร์ของคุณไม่รองรับ Copy API\nกรุณา Copy เฉพาะกรอบสีแดงทั้งหมดครับ");
                >
                  Copy
                </button>
              </center>
            </div>
          </dialog>



    </>
  );
}
