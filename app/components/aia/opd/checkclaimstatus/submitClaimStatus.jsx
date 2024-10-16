"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { save } from "../../../../store/counterSlice";
import { save2 } from "../../../../store/patientSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
// import { RefreshIcon, ClipboardIcon, TrashIcon } from '@heroicons/react/outline';
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaCloudUploadAlt } from "react-icons/fa";
import DetailDischarge from "../submitBilling/detailDischarge";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { HiDocumentSearch } from "react-icons/hi";
export default function chackData() {
  const InsuranceCode = 13;
  const [base64, setBase64] = useState("");
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const [invoiceNumberL, setInvoiceNumberL] = useState("");
  const [massCancel, setMassCancel] = useState("");
  const [showFormCancel, setShowFormCancel] = useState("");
  const [billList, setBillList] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [statusNew, setStatusNew] = useState({});
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [refIdL, setRefIdL] = useState("");
  const [transactionNoL, setTransactionNoL] = useState("");
  const [hNL, setHNL] = useState("");
  const [vNL, setVNL] = useState("");
  const [pIDL, setPIDL] = useState("");
  const [passportNumberL, setPassportNumberL] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [claimStatus, setClaimStatus] = useState("");
  const [massDocError, setMassDocError] = useState("");
  const [showDocError, setShowDocError] = useState("");
  const [patientUpdate, setPatientUpdate] = useState("");
  const [docType, setDocType] = useState("");
  const [randomNumber, setRandomNumber] = useState('');

  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {

    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_claimStatus +
          InsuranceCode
      )
      .then((response) => {
        setClaimStatus(response.data);
        //console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        // try{
        //   const ErrorMass = error.config.url
        //   const [ErrorMass1, ErrorMass2] = ErrorMass.split('v1/');
        //   setMassSummitError(error.code +" - "+error.message +" - "+ErrorMass2);
        //   setShowSummitError("Error")
        // }
        // catch (error) {
        //   setMassSummitError(error.response.data.HTTPStatus.message);
        //   setShowSummitError("Error");
      });
  }, []);
  const status = (event) => {
    setStatusValue(event.target.value);
  };
  const DocumentList = (data) => {
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
      })
      .catch((err) => {
        // console.error("Error", err)
        console.log(err);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
        setMassError(err.response.data.HTTPStatus.message);
      });


    document.getElementById("my_modal_4").showModal();
  };

  const handleButtonClick = (data) => {
    const generateRandomFiveDigitNumber = () => {
      return String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    };
    const newRandomNumber = generateRandomFiveDigitNumber();
    setRandomNumber(newRandomNumber);
    console.log(newRandomNumber);



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
      DocumenttypeCode : "006",
      Runningdocument : newRandomNumber,
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
        console.log(response.data);
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
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_documentType+ PatientInfo.InsurerCode
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

    document.getElementById("my_modal_3").showModal();
  };

  const handleUpload = async () => {
    if (!file) {
      setMsg("No file selected");
     // console.log(transactionNoL)
      return;
      
    }
    setMsg();
    setShowDocError();
    setProgress({ started: false, pc: 0 });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("VN", vNL);
    formData.append("RefId", refIdL);
    formData.append("TransactionNo", transactionNoL);
    formData.append("HN", hNL);
    formData.append("DocumentName", file.name);
    formData.append("insurerid", InsuranceCode);
    formData.append("DocumenttypeCode", "006");
    formData.append("UploadedBy", "");
    formData.append("Runningdocument", randomNumber);
    setMsg(
      <span className="loading loading-spinner text-info loading-lg"></span>
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
      // console.log("server response",response.data)

      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD +
            process.env.NEXT_PUBLIC_URL_getlistDocumentName,
          {
            "PatientInfo" : {
            InsurerCode: InsuranceCode,
            RefId: refIdL,
            TransactionNo: transactionNoL,
            PID: pIDL,
            PassportNumber: passportNumberL,
            HN: hNL,
            VN: vNL,
            DocumenttypeCode: "",
            DocumentName : "",
            Runningdocument : randomNumber,
          }
        }
        )
        .then((response) => {
          setBillList(response.data);
          //console.log(response.data)
        })
        .catch((error) => {
          // console.error("Error", err)
          console.log(error);
          //  if (err.response.request.status === 500) {
          // setShowFormError("Error");
          // setMassError(err.response.data.HTTPStatus.message);
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

  const Refresh = (data) => {
   //  setPost()
   setStatusNew()
    setShowFormError();
   // console.log("-Refresh-");
   const [RefId, TransactionNo, PID, PassportNumber, HN, VN, 
    InvoiceNumber,PolicyTypeCode, IdType, IllnessTypeCode, ServiceSettingCode, SurgeryTypeCode, FurtherClaimNo, FurtherClaimId, AccidentDate, VisitDateTime, VisitDate] = data.split(" | ");
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
          process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
        { PatientInfo }
      )
      .then((response) => {
        console.log(response.data);

        if (response.data.HTTPStatus.statusCode === 200) {
         // console.log(response.data)
          setStatusNew((prevData) => ({
            ...prevData,
            InsurerCode: response.data.Result.InsuranceData.InsurerCode,
            BatchNumber: response.data.Result.InsuranceData.BatchNumber,
            ClaimStatus: response.data.Result.InsuranceData.ClaimStatus,
            ClaimStatusDesc: response.data.Result.InsuranceData.ClaimStatusDesc,
            TotalApproveAmount: response.data.Result.InsuranceData.TotalApproveAmount,
            PaymentDate: response.data.Result.InsuranceData.PaymentDate,
            InvoiceNumber: response.data.Result.InsuranceData.InvoiceNumber,
            RefId : response.data.Result.InsuranceData.RefId,
            TransactionNo : response.data.Result.InsuranceData.TransactionNo,
            // HN : response.data.Result.InsuranceData.HN,
            // VN : response.data.Result.InsuranceData.VN,
          }));

          // setShowModal(true)
          // setTimeout(() => {
          //   setShowModal(false)
            //router.push('/aia/opd/submitBilling');
          // }, 5000);
        } else {
          setShowFormError("Error");
          setMassError(response.data.HTTPStatus.error);
        }


       })
      .catch((error) => {
        console.log(error);
        // try {
        //   const ErrorMass = error.config.url;
        //   const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
        //   setMassError(
        //     error.code + " - " + error.message + " - " + ErrorMass2
        //   );
        //   setShowFormError("Error");
        // } catch (error) {
        //   setMassError("Error ในการเปิดไฟล์");
        //   setShowFormError("Error");
        // }
      });
  };

  const Detail = (data) => {
      //  console.log(data)
    //console.log("-Detail-")
    setShowFormError();
    const [RefId, TransactionNo, PID, PassportNumber, HN, VN, 
      InvoiceNumber,PolicyTypeCode, IdType, IllnessTypeCode, ServiceSettingCode, SurgeryTypeCode, FurtherClaimNo, FurtherClaimId, AccidentDate, VisitDateTime, VisitDate, randomNumberold] = data.split(" | ");

      const   PatientInfo = {
        Insurerid: InsuranceCode,
        PID: PID,
        PassportNumber: PassportNumber,
        IdType: IdType,
        ServiceSettingCode: ServiceSettingCode,
        VN: VN,
        HN: HN,
        VisitDatefrom: VisitDate,
        VisitDateto: "",
      }
      console.log(PatientInfo)

      axios
        .post(
          process.env.NEXT_PUBLIC_URL_PD +
            process.env.NEXT_PUBLIC_URL_getEpisodeByHN,{PatientInfo}
        )
        .then((response) => {
        const  getEpisodeByHN = response.data.Result.PatientInfo;
          console.log(getEpisodeByHN)
          dispatch(save2({
            value: "มีรายชื่อ",
            Data:
          {
            IdType: IdType,
            InsurerCode: InsuranceCode,
            DateOfBirth: getEpisodeByHN.DateOfBirth,
            Gender: getEpisodeByHN.Gender,
            GivenNameEN: getEpisodeByHN.GivenNameEN,
            GivenNameTH: getEpisodeByHN.GivenNameTH,
            HN: getEpisodeByHN.HN,
            MobilePhone: getEpisodeByHN.MobilePhone,
             PID: getEpisodeByHN.PID,
            PassportNumber: getEpisodeByHN.PassportNumber,
            SurnameEN: getEpisodeByHN.SurnameEN,
            SurnameTH: getEpisodeByHN.SurnameTH,
            TitleEN: getEpisodeByHN.TitleEN,
            TitleTH: getEpisodeByHN.TitleTH,
          },
        }));

        })
        .catch((error) => {
          console.log(error);
          setShowFormError("Error");
          //setMassError(error.response.data.HTTPStatus.message);
          setMassError(error.response?.data?.HTTPStatus?.message || 'Unknown error');
        });
    
    

    dispatch(
      save({
        value: "มีข้อมูล",
        Data: {
          RefId: RefId,
          TransactionNo: TransactionNo,
          VN: VN,
          InsurerCode: InsuranceCode,
          ServiceSettingCode: ServiceSettingCode,
          IllnessTypeCode: IllnessTypeCode,
          SurgeryTypeCode:  SurgeryTypeCode,
          PolicyTypeCode: PolicyTypeCode,
          AccidentDate: AccidentDate,
          VisitDateTime: VisitDateTime,
          FurtherClaimNo : FurtherClaimNo,
          FurtherClaimId : FurtherClaimId,
          Runningdocument :  randomNumberold,

        },
      })
    );



    router.push("/aia/opd/eligible");


  };
  const DocumentBase64 = (data) => {
    setMsg();
    setProgress({ started: false, pc: 0 });
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
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
  const submitbilling = (event) => {
    event.preventDefault();

    let filenames = {};
    filenames = billList.map((Bll) => ({ DocName: Bll.filename }));
      //console.log(filenames)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 + process.env.NEXT_PUBLIC_URL_attachDocList,
        {
          "PatientInfo": {
          InsurerCode: InsuranceCode,
          RefId: refIdL,
          TransactionNo: transactionNoL,
          HN: hNL,
          VN: vNL,
          DocumenttypeCode  : "",
          Runningdocument: randomNumber,
          AttachDocList: [filenames],
        }
        }
      )
      .then((response) => {
        console.log(response.data);
       document.getElementById("my_modal_3").close();
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          //router.push('/aia/opd/submitBilling');
        }, 2000);
      })
      .catch((error) => {
        // console.error("Error", err)
        console.log(error);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
        //  setMassError(err.response.data.HTTPStatus.message);
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
            RefId: refIdL,
            TransactionNo: transactionNoL,
            HN: hNL,
            VN: vNL,
            DocumenttypeCode: "",
            DocumentName : "",
            Runningdocument : randomNumber,
            }
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
  const Cancel = (data) => {
     setPost();
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

          axios
          .post(process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_SearchTransection,patientUpdate)
          .then((response) => {
            console.log(response.data)
            setPost(response.data);
         //   setShowFormError();

          })
          .catch((error) => {
            console.log(error)
                    setShowFormError("Error");
                    setMassError(error.message);
          });

        })


        .catch((error) => {
          // console.error("Error", err)
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
    setBillList();
    setStatusNew({});
    setPost();
    setShowFormError();
    let data = {};
    let dateToValue = "";
    let dateFromValue = "";
    let PatientInfo;

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
      };
    } else if (statusValue) {
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
      };
    }

    console.log(PatientInfo);
    setPatientUpdate({PatientInfo});
    if (PatientInfo) {
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_SearchTransection,
          { PatientInfo }
        )
        .then((response) => {
          setPost(response.data);
          console.log(response.data)
          setShowFormError();
        })
        .catch((error) => {
          console.log(error);

          setShowFormError("Error");
          setMassError(error.message);
        });
    } else {
      setShowFormError("Error");
      setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
    }

    // if(Object.keys(data).length === 0){
    //   setShowFormError("Error");
    //   setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
    // }else{
    //   setShowFormError()
    // console.log(data)

    // // axios
    // // .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
    // //         //ส่งเป็น statisCode
    // //         data
    // // )
    // // .then((response) => {
    // //   setPost(response.data);
    // //   setShowFormError("");
    // // })
    // // .catch((error) => {
    // //  // console.error("Error", err)
    // //   console.log(error)

    // //           setShowFormError("Error");
    // //           setMassError(error.message);

    // // });

    // }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-1 sm:grid-cols-1 w-full">
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
              <p className="text-left">&nbsp;PASSPORT &nbsp;</p>
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
                id="Invoice"
                name="identity_type"
                value="Invoice"
                className="checkbox checkbox-info"
                checked={selectedIdType === "Invoice"}
                onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Invoice &nbsp;</p>
              <p className="ml-64">Visit Date</p>
            </div>
            <TextField
              id="standard-multiline-flexible"
              label="กรอกข้อความ"
              // multiline
              // maxRows={4}
              variant="standard"
              className="w-96"
              name="number"
              type="text"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="ml-5 w-40"
                label="Date From"
                value={fromValue}
                onChange={(newDate) => setFromValue(newDate)}
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="ml-2 w-40"
                label="Date To"
                value={toValue}
                onChange={(newDate) => setToValue(newDate)}
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>
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
              className="btn btn-error text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-error ml-2"
              type="submit"
            >
              <FaSearch /> ค้นหา
            </button>
          </div>
        </div>
      </form>

      <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4 mt-6">
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
          {showFormCancel === "Cancel" ? (
            <div
              role="alert"
              className="alert alert-success mt-2 text-base-100"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{massCancel}</span>
            </div>
          ) : (
            ""
          )}

          <table className="table mt-2">
            <thead className="bg-info text-base-100 text-center text-lg ">
              <tr>
                <th></th>
                <th>Visit Date</th>
                <th>Full Name</th>
                <th>HN</th>
                <th>VN</th>
                <th>ClaimNo</th>
                <th>Invoicenumber</th>
                <th>Status</th>
                <th>จำนวนวงเงินที่อนุมัติ</th>
                <th>ยอดส่วนเกิน</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {post ? (
                post.HTTPStatus.statusCode === 200 ? (
                  post.Result.TransactionClaimInfo.map((bill, index) => (
                    (bill.VisitDate||bill.HN) !== "" && (
                    <tr className="hover text-center" key={index}>
                      <th>{index + 1}</th>
                      <td>{bill.VisitDate}</td>
                      <td>
                        {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                      </td>
                      <td>{bill.HN}</td>
                      <td>{bill.VN}</td>
                      <td>{bill.ClaimNo}</td>
                      <td>{bill.InvoiceNumber}</td>
                      <td>
                        <a className="bg-success text-base-100 rounded-full px-3 py-2">
                          {statusNew
                            ? bill.TransactionNo === statusNew.TransactionNo
                              ? statusNew.ClaimStatus                           
                              : bill.ClaimStatusDesc 
                            : "Loading..."}
                        </a>
                      </td>
                      <th>
                        {bill.TotalApprovedAmount
                          ? bill.TotalApprovedAmount
                          : ""}
                      </th>
                      <th>
                        {bill.TotalExcessAmount
                          ? bill.TotalExcessAmount
                          : ""}
                      </th>
                      <td>
                        <div className="tooltip" data-tip="รีเฟรช">
                          <h1
                            className="text-primary text-2xl"
                            onClick={() =>
                              Refresh(
                                `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate}`
                              )
                            }
                          >
                            <LuRefreshCw />
                          </h1>
                        </div>
                        <div className="tooltip ml-4" data-tip="ข้อมูลส่งเคลม">
                          <h1
                            className="text-primary text-2xl"
                            onClick={() =>
                              Detail(
                                 `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber} | ${bill.PolicyTypeCode} | ${bill.IdType} | ${bill.IllnessTypeCode} | ${bill.ServiceSettingCode} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.AccidentDate} | ${bill.VisitDateTime} | ${bill.VisitDate} | ${bill.Runningdocument}`
                              )
                            }
                          >
                            <IoDocumentText />
                          </h1>
                        </div>
                        { bill.RefId ? (
                            (bill.ClaimStatusDesc !== "Cancelled" && bill.ClaimStatusDesc !== "Reversed") ? (
                        
                        <div
                                  className="tooltip ml-4"
                                  data-tip="ยกเลิกการเคลม"
                                >
                                  <h1
                                    className="text-primary text-2xl"
                                    onClick={() =>
                                      Cancel(
                                        `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                                      )
                                    }
                                  >
                                    <MdCancel />
                                  </h1>
                                </div>
                              
                            ) :"" ):""}

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
                  { bill.RefId ? (
                            (bill.ClaimStatusDesc === "Approve" || bill.ClaimStatusDesc === "Received") ? (
                              <>
                                <button
                                  className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 ml-4"
                                  onClick={() =>
                                    handleButtonClick(
                                      `${bill.RefId} | ${bill.TransactionNo} | ${bill.PID} | ${bill.PassportNumber} | ${bill.HN} | ${bill.VN} | ${bill.InvoiceNumber}`
                                    )
                                  }
                                >
                                  ส่งเอกสารเพิ่มเติม
                                </button>
                              </>
                            ) : (
                              ""
                            )
                          ) : (
                            "Loading..."
                          )}
                      </td>
                    </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <th></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th></th>
                  </tr>
                )
              ) : (
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th></th>
                </tr>
              )}
            </tbody>
          </table>



          <dialog id="my_modal_3" className="modal text-xl	">
            <div className="modal-box max-w-3xl">
              <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form  onSubmit={submitbilling}> 
                <h3 className="font-bold text-lg">ส่งเอกสาร เพิ่มเติม</h3>
                <hr />
                {/* <div className="grid gap-2 sm:grid-cols-2 w-full mt-2">
                <div className="rounded-md">

                <p className="text-left">Document Type</p>
                <select  className="select select-bordered w-full mt-2" onChange={handleSelectChange} required>
                      <option></option>
                      {docType
                  ? docType.Result.map((type, index) => (
                              <option
                                key={index}
                                value={type.documenttypecode}>
                                      {type.documenttypename}
                              </option>
                            )
                          )
                        : ""}
                      <></>
                    </select>
          </div> */}

                  <div className="rounded-md mt-9">
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
                  {/* </div> */}
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
                                <div className="flex items-center mt-3">
                  <table className="table table-zebra mt-2">
                    <thead>
                      <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                        <th className="w-2/5">ชื่อไฟล์</th>
                        <th className="w-1/5"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {billList ? (
                        billList.map((list, index) => (
                          <tr key={index} className=" bg-neutral text-sm">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {list.filename}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                        
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
          {/* {msg === "Docsucc" ? */}
                <div className="modal-action">
                  <button
                    className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100"
                  >
                    ส่งเอกสาร
                  </button>
                </div> 
{/* : ""
} */}
             </form> 
            </div>
          </dialog>


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
                        <th className="w-1/5"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {billList ? (
                        billList.map((list, index) => (
                          <tr key={index} className=" bg-neutral text-sm">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {list.filename}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                        
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
                ส่งเอกสารเพิ่มเติมเรียบร้อย
              </h2>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
        </div>
      </div>
    </>
  );
}
