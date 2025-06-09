"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import useEffectOnce from "/hooks/use-effect-once";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import { save } from "../../../store/counterSlice";
import { save2 } from "../../../store/patientSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";
import { Box, TextField } from "@mui/material";
import { IoIosDocument } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button, Menu, MenuItem, Dialog } from "@mui/material";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Switch from '@mui/material/Switch';
import Input from "@mui/material/Input";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
// import { RefreshIcon, ClipboardIcon, TrashIcon } from '@heroicons/react/outline';
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaCloudUploadAlt } from "react-icons/fa";
import DetailDischargeOPD from "../eligible/detailDischargeOPD";
import DetailDischargeIPD from "../eligible/detailDischargeIPD";
import DetailDischargePRE from "../eligible/detailDischargePRE";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { HiDocumentSearch } from "react-icons/hi";

export default function checkData() {
  const InsuranceCode = 13;
  const [transactionClaimInfo, setTransactionClaimInfo] = useState("");
  const [base64, setBase64] = useState("");
  const [doTransactionData, setDoTransactionData] = useState("");
  const [itemBillingDetails, setItemBillingDetails] = useState("");
  const [detailData, setDetailData] = useState("");
  const [showDetailData, setShowDetailData] = useState(false);
  const [refreshSucc, setRefreshSucc] = useState("");
  
  const [listBilling, setListBilling] = useState();
  const dispatch = useDispatch();
  const [billValue, setBillValue] = useState("ทั้งหมด");
  const [selectData, setSelectData] = useState("");
  const [postData, setPostData] = useState("");
  const [listClaimForm, setListClaimForm] = useState();
  const [selectedIdType, setSelectedIdType] = useState("");
  //const [showFormIsRequestDispute, setShowFormIsRequestDispute] = useState(false);
  const [selectedIdTypeIsRequestDispute, setSelectedIsRequestDispute] = React.useState(false);
  const [patientInfoDetail, setPatientInfoDetail] = useState();
  const [numberValue, setNumberValue] = useState("");
  const [notShowLoc, setNotShowLoc] = useState(false);

  const [showFormCheckEligibleError, setShowFormCheckEligibleError] = useState("");
  const [massFurtherError, setMassFurtherError] = useState("");
  const [formPRE, setFormPRE] = useState(false);
  const [fromValue, setFromValue] = useState(null);
  const [selectPRETypeValue, setSelectPRETypeValue] = useState("");
  const [preAuthTransactionList, setPreAuthTransactionList] = useState("");
  const [dataSelect, setDataSelect] = useState("");
  const [illnessType, setIllnessType] = useState();
  const [toValue, setToValue] = useState(null);
  const [massError, setMassError] = useState("");
  const [iCD10Value, setICD10Value] = useState();
  const [furtherClaimId, setFurtherClaimId] = useState();
  const [showFormError, setShowFormError] = useState("");
  const [invoiceNumberL, setInvoiceNumberL] = useState("");
  const [massCancel, setMassCancel] = useState("");
  // const [showFormCancel, setShowFormCancel] = useState("");
  const [billList, setBillList] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalRefresh, setShowModalRefresh] = useState(false);
  // const [showModalRefreshSucc, setShowModalRefreshSucc] = useState(false);
  const [over45Days, setOver45Days] = useState("");
  const [typeDoc, setTypeDoc] = useState("");
  const [over45, setOver45] = useState("");
  const [doMoney, setDoMoney] = useState(true);
  const router = useRouter();
  // const [statusAllNew, setStatusAllNew] = useState();
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
  const [randomNumber, setRandomNumber] = useState("");

  const [serviceValue, setServiceValue] = useState("OPD");
  const [serviceCode, setServiceCode] = useState("");
  const [total, setTotal] = useState(0);
  const [totalApprovedAmount, setTotalApprovedAmount] = useState("");
  const [totalExcessAmount, setTotalExcessAmount] = useState("");
  const [totalSum, setTotalSum] = useState("");
  const [fromTotalSum, setFromTotalSum] = useState(false);
  // const [selectedValue, setSelectedValue] = useState("");
  // const handleSelectChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const ITEMS_PER_PAGE = 40;
  const [currentData, setCurrentData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const Over45 = (event) => {
    setOver45(event.target.value);
  };
  const TypeDoc = (event) => {
    setTypeDoc(event.target.value);
  };

  useEffectOnce(() => { 

    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_accidentCauseOver45Day +
          InsuranceCode
      )
      .then((response) => {
        //   console.log(response.data)
        setOver45Days(response.data);
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
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    const today = dayjs().format("YYYY-MM-DD");
    const PatientInfo = {
      InsurerCode: InsuranceCode,
      IdType: "",
      InvoiceNumber: "",
      VN: "",
      PID: "",
      PassportNumber: "",
      HN: "",
      // VisitDatefrom: today,
      // VisitDateto: today,
      VisitDatefrom: today,
      VisitDateto: today,
      StatusChangedAtDatefrom: "",
      StatusChangedAtDateto: "",

      StatusClaimCode: "",
      ServiceSettingCode: serviceValue,
    };
    // console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_SearchTransection,
        { PatientInfo }
      )
      .then((response) => {
        setPostData(response.data);
        // console.log(response.data);
        // setShowFormError();
        setCurrentData(response.data.Result.TransactionClaimInfo);
        
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




      })
      .catch((error) => {
        console.log(error);

        setShowFormError("Error");
        setMassError(error.message);
      });
  });
  /////////////////////////////////////////////////////////////////////////////////////
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
  const status = (event) => {
    setStatusValue(event.target.value);
  };
  const type = (event) => {
    setServiceValue(event.target.value);
  };
  const bill = (event) => {
    setBillValue(event.target.value);
  };
  const DelectSearch = () => {
    setStatusValue(null);
    setNumberValue(null);
    setFromValue(null);
    setToValue(null);
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
        setPostData(response.data);
        //  console.log(response.data);
        setCurrentData(response.data.Result.TransactionClaimInfo);
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
        console.log(error);

        setShowFormError("Error");
        setMassError(error.message);
      });
  };

  const SelectPRE = (event) => {
    setListClaimForm("");
    setSelectPRETypeValue("");
    if (event.target.value) {
      const Datavalue = JSON.parse(event.target.value);
      console.log(Datavalue);
      setFormPRE(true);
      setSelectPRETypeValue(Datavalue.ClaimNo);
      setListClaimForm(Datavalue);
    } else {
      setFormPRE(false);
    }
  };
  const NotSelectPRE = (event) => {
    setListClaimForm("");
    setSelectPRETypeValue("");
    setFormPRE(false);
  };

  const DocumentList = (data) => {
    setShowDocError();
    // const [RefId, TransactionNo, PID, PassportNumber, HN, VN, InvoiceNumber] =
    //   data.split(" | ");
    setRefIdL(data.RefId);
    setTransactionNoL(data.TransactionNo);
    setHNL(data.HN);
    setVNL(data.VN);
    setInvoiceNumberL(data.InvoiceNumber);
    setMsg(null);
    setPIDL(data.PID);
    setPassportNumberL(data.PassportNumber);

    const PatientInfo = {
      InsurerCode: InsuranceCode,
      RefId: data.RefId,
      TransactionNo: data.TransactionNo,
      PID: data.PID,
      PassportNumber: data.PassportNumber,
      HN: data.HN,
      VN: data.VN,
      DocumenttypeCode: "",
      Runningdocument: "",
    };

    //   console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
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
  ///////////////////////////////////////////////////
  const DoTransaction = (data) => {
    console.log(data);
    setDoTransactionData(data);
    document.getElementById("DoTransaction").showModal();
  };
  ///////////////////////////////////////////////////
  const Checkcreditlimit = (data) => {
    setOver45("");
    setICD10Value("");
    setItemBillingDetails("");
    setTotal(0);
    setFromTotalSum(false);
    setTotalApprovedAmount();
    setTotalExcessAmount();
    setShowFormError();
    setMassError();

    setTransactionClaimInfo(data);
    setRefIdL(data.RefId);
    setTransactionNoL(data.TransactionNo);
    setHNL(data.HN);
    setVNL(data.VN);
    setInvoiceNumberL(data.InvoiceNumber);
    setMsg(null);
    setPIDL(data.PID);
    setPassportNumberL(data.PassportNumber);
    setFurtherClaimId(data.FurtherClaimId);
    //console.log(data)

    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_listBillingCheckBalance +
          data.VN
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
          setMassError(error.response.data.HTTPStatus.message);
          setShowFormError("Error");
        }
      });

    document.getElementById("DoMoney").showModal();
  };
  ////////////////////////////////
  const handleChangeA1 = (index2, event) => {
    const selectedType = JSON.parse(event.target.value);
    //   setNewItemBillingCheckBalance({ ...newItemBillingCheckBalance,
    //     LocalBillingCode: selectedType.LocalBillingCode,
    //     LocalBillingName: selectedType.LocalBillingName,
    //   });

    const newcauses = itemBillingDetails.map((cause, index) => {
      if (index === index2) {
        return {
          ...cause,
          LocalBillingCode: selectedType.LocalBillingCode,
          LocalBillingName: selectedType.LocalBillingName,
        };
      }
      return cause;
    });
    setItemBillingDetails(newcauses);
  };
  // console.log(itemBillingDetails)
  const handleChangeA2 = (index2, event) => {
    // console.log(itemBillingDetails)
    const newcauses = itemBillingDetails.map((cause, index) => {
      // let sum = 0;
      // itemBillingDetails.forEach((bill) => {
      //   sum += parseInt(bill.BillingInitial, 10);
      // });
      //  setTotal(sum);

      // console.log(cause.BillingInitial+event.target.value)
      if (index === index2) {
        return {
          ...cause,
          BillingInitial: event.target.value,
        };
      }
      return cause;
    });
    setItemBillingDetails(newcauses);
  };
  ////////////////////////////////

  // const handleSumBillingInitial = () => {
  //   let sum = 0; itemBillingDetails.forEach((bill) => {
  //     sum += parseInt(bill.BillingInitial, 10);
  //   });
  //    setTotal(sum);
  //    };
  //////////////////////////////////
  const handleDeleteCauseOfInjuryDetail = (index) => {
    const newItemBillingCheckBalances = itemBillingDetails.filter(
      (_, i) => i !== index
    );
    setItemBillingDetails(newItemBillingCheckBalances);
  };

  /////////////////////////////////////////////////////
  const [newItemBillingCheckBalance, setNewItemBillingCheckBalance] = useState({
    LocalBillingCode: "",
    LocalBillingName: "",
    SimbBillingCode: "",
    BillingInitial: "",
  });

  ////////////////////////////////////////////////////////
  const handleAddItemBillingDetail = () => {
    setItemBillingDetails([...itemBillingDetails, newItemBillingCheckBalance]);
    setNewItemBillingCheckBalance({
      LocalBillingCode: "",
      LocalBillingName: "",
      SimbBillingCode: "",
      BillingInitial: "",
    });
  };
  ////////////////////////////////////////////////////////
  const SubmitSumBilling = () => {
    //console.log(itemBillingDetails)
    // setFromTotalSum(false);

    let sum = 0;
    itemBillingDetails.forEach((bill) => {
      sum += parseFloat(bill.BillingInitial); // ใช้ parseFloat แทน parseInt เพื่อรองรับค่าทศนิยม
    });
    const formattedSum = sum.toFixed(2); // กำหนดให้มีจุดทศนิยม 2 ตำแหน่ง
    setTotal(formattedSum);
  };
  const SubmitBillingCheckBalance = () => {
    setFromTotalSum(true);
    setTotalApprovedAmount();
    setTotalExcessAmount();
    setShowFormError();
    setMassError();

    let sum = 0;
    itemBillingDetails.forEach((bill) => {
      sum += parseInt(bill.BillingInitial, 10);
    });
    // console.log(sum);
    // console.log(itemBillingDetails)
    let num = 0;
    const result = itemBillingDetails.reduce(
      (acc, item) => {
        //          console.log(item)
        //       console.log(num = num + 1)
        // console.log(item.LocalBillingCode)
        // console.log(item.LocalBillingName)
        // console.log(item.BillingInitial)
        // console.log(item.SimbBillingCode)
        acc.BillingInfo.push({
          LocalBillingCode: item.LocalBillingCode,
          LocalBillingName: item.LocalBillingName,
          SimbBillingCode: item.SimbBillingCode,
          PayorBillingCode: item.SimbBillingCode,
          BillingInitial: item.BillingInitial,
          BillingDiscount: "0",
          BillingNetAmount: item.BillingInitial,
        });
        acc.OrderItem.push({
          Discount: "0",
          Initial: item.BillingInitial,
          ItemAmount: "1",
          ItemId: item.LocalBillingCode,
          ItemName: item.LocalBillingName,
          LocalBillingCode: item.LocalBillingCode,
          LocalBillingName: item.LocalBillingName,
          NetAmount: item.BillingInitial,
        });
        return acc;
      },
      {
        BillingInfo: [],
        OrderItem: [],
        TotalBillAmount: sum,
      }
    );

    //console.log(transactionClaimInfo)
    // console.log(result)

    const PatientInfo = {
      InsurerCode: InsuranceCode,
      RefId: transactionClaimInfo.RefId,
      TransactionNo: transactionClaimInfo.TransactionNo,
      // PID: transactionClaimInfo.PID,
      // IdType: transactionClaimInfo.IdType,
      IllnessTypeCode: transactionClaimInfo.IllnessTypeCode,
      HN: transactionClaimInfo.HN,
      VN: transactionClaimInfo.VN,
      VisitDateTime: transactionClaimInfo.VisitDateTime,
      AccidentDate: transactionClaimInfo.AccidentDate,
      ItemBillingCheckBalance: result,
      ICD10: iCD10Value,
      FurtherClaimId: furtherClaimId,
      AccidentCauseOver45Days: over45,
    };
    console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_SubmitBillingCheckBalance,
        {
          PatientInfo,
        }
      )
      .then((response) => {
        // console.log(response.data);
        if (response.data.HTTPStatus.statusCode === 200) {
          // setTotalSum(response.data.Result)

          setTotalApprovedAmount(response.data.Result.TotalApprovedAmount);
          setTotalExcessAmount(response.data.Result.TotalExcessAmount);
        } else {
          setShowFormError("Error");
          setMassError(
            response.data.HTTPStatus.message +
              "\n" +
              response.data.HTTPStatus.error
          );
        }
      })
      .catch((err) => {
        // console.error("Error", err)
        console.log(err);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
        setMassError(err.response.data.HTTPStatus.message);
      });
  };
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  const [messCopy, setMessCopy] = useState("");

  const copyTran = (data) => {
    if (!navigator.clipboard) {
      console.error("Clipboard API ไม่รองรับในเบราว์เซอร์นี้");
      alert("เบราว์เซอร์นี้ไม่รองรับ กับ ฟังชั่น Copy นี้ \nกรุณา Copy ในกรอบสีแดงทั้งหมดครับ");
      return;
    }else{
    const jsonString = JSON.stringify(data, null, 2); // แปลงข้อมูลเป็น JSON String
    const result = navigator.clipboard.writeText(jsonString);

    result.then(() => {
      console.log("copy เรียบร้อย");
      alert("copy เรียบร้อยแล้ว");
    });
    }
  };
  const handleButtonClick = (data) => {
    const generateRandomFiveDigitNumber = () => {
      return String(Math.floor(Math.random() * 100000)).padStart(5, "0");
    };
    const newRandomNumber = generateRandomFiveDigitNumber();
    setRandomNumber(newRandomNumber);

    setShowDocError();

    setRefIdL(data.RefId);
    setTransactionNoL(data.TransactionNo);
    setHNL(data.HN);
    setVNL(data.VN);
    setInvoiceNumberL(data.InvoiceNumber);
    setMsg(null);
    setPIDL(data.PID);
    setPassportNumberL(data.PassportNumber);
    setSelectedIsRequestDispute(false);
    document.getElementById("showFormIsRequestDispute").close();
    //console.log(showFormIsRequestDispute);
    const PatientInfo = {
      InsurerCode: InsuranceCode,
      RefId: data.RefId,
      TransactionNo: data.TransactionNo,
      PID: data.PID,
      PassportNumber: data.PassportNumber,
      HN: data.HN,
      VN: data.VN,
      DocumenttypeCode: "006",
      Runningdocument: newRandomNumber,
    };

    // console.log(PatientInfo);
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getlistDocumentName,
        { PatientInfo }
      )
      .then((response) => {
        setBillList(response.data);
        //    console.log(response.data);
      })
      .catch((err) => {
        // console.error("Error", err)
        console.log(err);
        setShowFormError("Error");
        setMassError(err.response.data.HTTPStatus.message);
      });

    axios
      .get(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_documentType +
          PatientInfo.InsurerCode
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
    formData.append("DocumenttypeCode", typeDoc);
    formData.append("UploadedBy", "");
    formData.append("Runningdocument", randomNumber);
    setMsg(<CircularProgress size="30px" className="text-error text-lg" />);
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
      // console.log("server response",response.data)

      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_getlistDocumentName,
          {
            PatientInfo: {
              InsurerCode: InsuranceCode,
              RefId: refIdL,
              TransactionNo: transactionNoL,
              PID: pIDL,
              PassportNumber: passportNumberL,
              HN: hNL,
              VN: vNL,
              DocumenttypeCode: "",
              DocumentName: "",
              Runningdocument: randomNumber,
            },
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
          setShowFormError("Error");
          setMassError(err.response.data.HTTPStatus.message);
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
  const confirmButton = (data) => {
    console.log(dataSelect);
    // console.log(data)

    const [RefId, TransactionNo, PreauthReferClaimNo, PreauthReferOcc] =
      data.split(" | ");

    const PatientInfo = {
      Insurerid: InsuranceCode,
      PID: dataSelect.PID,
      PassportNumber: dataSelect.PassportNumber,
      IdType: dataSelect.IdType,
      ServiceSettingCode: dataSelect.ServiceSettingCode,
      VN: dataSelect.VN,
      HN: dataSelect.HN,
      VisitDatefrom: dataSelect.VisitDate,
      VisitDateto: "",
    };
    console.log(PatientInfo);

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_PatientSearch,
        {
          PatientInfo,
        }
      )
      .then((response) => {
        const PatientSearch = response.data.Result.PatientInfo[0];
        //  console.log(response.data.Result.PatientInfo)
        dispatch(
          save2({
            value: "มีรายชื่อ",
            Data: {
              IdType: PatientInfo.IdType,
              InsurerCode: PatientInfo.InsuranceCode,
              DateOfBirth: PatientSearch.DateOfBirth,
              Gender: PatientSearch.Gender,
              GivenNameEN: PatientSearch.GivenNameEN,
              GivenNameTH: PatientSearch.GivenNameTH,
              HN: PatientSearch.HN,
              MobilePhone: PatientSearch.MobilePhone,
              PID: PatientSearch.PID,
              PassportNumber: PatientSearch.PassportNumber,
              SurnameEN: PatientSearch.SurnameEN,
              SurnameTH: PatientSearch.SurnameTH,
              TitleEN: PatientSearch.TitleEN,
              TitleTHc: PatientSearch.TitleTH,
            },
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setShowFormError("Error");
        //setMassError(error.response.data.HTTPStatus.message);
        setMassError(
          error.response?.data?.HTTPStatus?.message || "Unknown error"
        );
      });

    dispatch(
      save({
        value: "มีข้อมูล",
        Data: {
          RefId: RefId,
          TransactionNo: TransactionNo,
          VN: dataSelect.VN,
          InsurerCode: InsuranceCode,
          ServiceSettingCode: dataSelect.ServiceSettingCode,
          IllnessTypeCode: dataSelect.IllnessTypeCode,
          SurgeryTypeCode: dataSelect.SurgeryTypeCode,
          PolicyTypeCode: dataSelect.PolicyTypeCode,
          AccidentDate: dataSelect.AccidentDate,
          VisitDateTime: dataSelect.VisitDateTime,
          IsIPDDischarge: dataSelect.IsIPDDischarge,
          PreauthReferClaimNo: PreauthReferClaimNo,
          PreauthReferOcc: PreauthReferOcc,
          Visitlocation: dataSelect.Visitlocation,
          TotalBillAmount: dataSelect.TotalBillAmount,
          TotalExcessAmount: dataSelect.TotalExcessAmount,
          FurtherClaimVN: dataSelect.FurtherClaimVN,
          ReferenceVN: dataSelect.ReferenceVN,
        },
      })
    );

    router.push("/aia/eligible");
  };

  const Refresh = (data) => {
    setShowFormError();
    setShowModalRefresh(true);
    // console.log(data);

    const PatientInfox = {
      InsurerCode: InsuranceCode,
      RefId: data.RefId,
      TransactionNo: data.TransactionNo,
      PID: data.PID,
      PassportNumber: data.PassportNumber,
      HN: data.HN,
      VN: data.VN,
    };
     console.log(PatientInfox);

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
        {
          PatientInfo: PatientInfox,
        }
      )
      .then((response) => {
        setShowModalRefresh(false);
        

          document.getElementById('my_modal_showModalRefreshSucc').showModal()
          const now = new Date();
          setCurrentTime(now.toLocaleTimeString());
          setCurrentDate(now.toLocaleDateString());

        setRefreshSucc(response.data);
        setPostData("");
        setCurrentData("");
        console.log(response.data);

        console.log(patientUpdate);
        if(patientUpdate){
        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SearchTransection,
            patientUpdate
          )
          .then((response) => {
            setPostData(response.data);
            console.log(response.data);
            // setShowFormError();
            setCurrentData(response.data.Result.TransactionClaimInfo);
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
            setPostData(response.data);
            console.log(response.data);
            // setShowFormError();
            setCurrentData(response.data.Result.TransactionClaimInfo);
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
          })
          .catch((error) => {
            console.log(error);

            setShowFormError("Error");
            setMassError(error.message);
          });
        }
        
      })
      .catch((error) => {
        console.log(error);
        setShowFormError("Error");
        setMassError("Error");
      });
  };

  const Detail = (data) => {
    //  console.log(data)
    setSelectData(data);
    //console.log("-Detail-")
    setShowFormError();

    const PatientInfo = {
      Insurerid: InsuranceCode,
      PID: data.PID,
      PassportNumber: data.PassportNumber,
      IdType: data.IdType,
      ServiceSettingCode: data.ServiceSettingCode,
      VN: data.VN,
      HN: data.HN,
      VisitDatefrom: data.VisitDate,
      VisitDateto: "",
    };
    //  console.log(PatientInfo)

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_PatientSearch,
        {
          PatientInfo,
        }
      )
      .then((response) => {
        const PatientSearch = response.data.Result.PatientInfo[0];
        // console.log(PatientSearch)
        dispatch(
          save2({
            value: "มีรายชื่อ",
            Data: {
              IdType: PatientInfo.IdType,
              InsurerCode: PatientInfo.InsuranceCode,
              DateOfBirth: PatientSearch.DateOfBirth,
              Gender: PatientSearch.Gender,
              GivenNameEN: PatientSearch.GivenNameEN,
              GivenNameTH: PatientSearch.GivenNameTH,
              HN: PatientSearch.HN,
              MobilePhone: PatientSearch.MobilePhone,
              PID: PatientSearch.PID,
              PassportNumber: PatientSearch.PassportNumber,
              SurnameEN: PatientSearch.SurnameEN,
              SurnameTH: PatientSearch.SurnameTH,
              TitleEN: PatientSearch.TitleEN,
              TitleTHc: PatientSearch.TitleTH,
            },
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setShowFormError("Error");
        //setMassError(error.response.data.HTTPStatus.message);
        setMassError(
          error.response?.data?.HTTPStatus?.message || "Unknown error"
        );
      });

    dispatch(
      save({
        value: "มีข้อมูล",
        Data: {
          RefId: data.RefId,
          TransactionNo: data.TransactionNo,
          VN: data.VN,
          InsurerCode: InsuranceCode,
          ServiceSettingCode: data.ServiceSettingCode,
          IllnessTypeCode: data.IllnessTypeCode,
          SurgeryTypeCode: data.SurgeryTypeCode,
          PolicyTypeCode: data.PolicyTypeCode,
          AccidentDate: data.AccidentDate,
          VisitDateTime: data.VisitDateTime,
          ReferenceVN: data.ReferenceVN,
          FurtherClaimVN: data.FurtherClaimVN,
          FurtherClaimNo: data.FurtherClaimNo,
          FurtherClaimId: data.FurtherClaimId,
          Visitlocation: data.Visitlocation,
          FurtherClaimVN: dataSelect.FurtherClaimVN,
          ReferenceVN: dataSelect.ReferenceVN,
        },
      })
    );

    router.push("/aia/eligible");
  };

  const Detail2 = (data) => {
    console.log(data);
    setSelectData(data);
    //console.log("-Detail-")
    setDataSelect(data);
    setShowFormError();
    setPreAuthTransactionList();
    setFormPRE(false);
    const PatientInfo = {
      Insurerid: InsuranceCode,
      PID: data.PID,
      PassportNumber: data.PassportNumber,
      IdType: data.IdType,
      ServiceSettingCode: data.ServiceSettingCode,
      VN: data.VN,
      HN: data.HN,
      VisitDatefrom: data.VisitDate,
      VisitDateto: "",
    };
    //  console.log(PatientInfo)

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_PatientSearch,
        {
          PatientInfo,
        }
      )
      .then((response) => {
        const PatientSearch = response.data.Result.PatientInfo[0];
        // console.log(PatientSearch)
        dispatch(
          save2({
            value: "มีรายชื่อ",
            Data: {
              IdType: PatientInfo.IdType,
              InsurerCode: PatientInfo.InsuranceCode,
              DateOfBirth: PatientSearch.DateOfBirth,
              Gender: PatientSearch.Gender,
              GivenNameEN: PatientSearch.GivenNameEN,
              GivenNameTH: PatientSearch.GivenNameTH,
              HN: PatientSearch.HN,
              MobilePhone: PatientSearch.MobilePhone,
              PID: PatientSearch.PID,
              PassportNumber: PatientSearch.PassportNumber,
              SurnameEN: PatientSearch.SurnameEN,
              SurnameTH: PatientSearch.SurnameTH,
              TitleEN: PatientSearch.TitleEN,
              TitleTHc: PatientSearch.TitleTH,
            },
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setShowFormError("Error");
        //setMassError(error.response.data.HTTPStatus.message);
        setMassError(
          error.response?.data?.HTTPStatus?.message || "Unknown error"
        );
      });

    dispatch(
      save({
        value: "มีข้อมูล",
        Data: {
          RefId: data.RefId,
          TransactionNo: data.TransactionNo,
          VN: data.VN,
          InsurerCode: InsuranceCode,
          ServiceSettingCode: data.ServiceSettingCode,
          IllnessTypeCode: data.IllnessTypeCode,
          SurgeryTypeCode: data.SurgeryTypeCode,
          PolicyTypeCode: data.PolicyTypeCode,
          AccidentDate: data.AccidentDate,
          VisitDateTime: data.VisitDateTime,
          IsIPDDischarge: data.IsIPDDischarge,
          PreauthReferClaimNo: data.PreauthReferClaimNo,
          PreauthReferOcc: data.PreauthReferOcc,
          FurtherClaimVN: data.FurtherClaimVN,
          ReferenceVN: data.ReferenceVN,
          Visitlocation: data.Visitlocation,
          FurtherClaimVN: dataSelect.FurtherClaimVN,
          ReferenceVN: dataSelect.ReferenceVN,
        },
      })
    );

    if (
      data.ClaimStatusDesc === "waitting for discharge" &&
      (data.PreauthReferClaimNo === "" || data.PreauthReferClaimNo === null)
    ) {
      setSelectPRETypeValue("");
      const PatientInfo = {
        InsurerCode: InsuranceCode,
        RefId: data.RefId,
        TransactionNo: data.TransactionNo,
        HN: "",
        VN: "",
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_getretrievepreauthlist,
          {
            PatientInfo,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.HTTPStatus.statusCode === 200) {
            setPreAuthTransactionList(response.data);
            document.getElementById("waitting").showModal();
          } else {
            setShowFormError("Error");
            setMassError(response.data.HTTPStatus.message);
          }
        })
        .catch((error) => {
          console.log(error);
          try {
            const ErrorMass = error.config.url;
            const [ErrorMass1, ErrorMass2] = ErrorMass.split("v1/");
            setMassError(
              error.code + " - " + error.message + " - " + ErrorMass2
            );
            setShowFormError("Error");
          } catch (error) {
            setMassError(error.response.data.HTTPStatus.message);
            setShowFormError("Error");
          }
        });
    } else {
      router.push("/aia/eligible");
    }
  };
  const Detail3PRE = (data) => {
    setDetailData("");
    //  console.log(data);
    setShowFormError();
    setDetailData(data);
    // console.log(showDetailData)
    setShowDetailData(true);
  };
  const Detail3IPD = (data) => {
    setDetailData("");
    //  console.log(data);
    setShowFormError();
    setDetailData(data);
    // console.log(showDetailData)
    setShowDetailData(true);
  };
  const Detail3OPD = (data) => {
    setDetailData("");
    // console.log(data);
    setShowFormError();
    setDetailData(data);
    // console.log(showDetailData)
    setShowDetailData(true);
  };

  const showDetailDataClose = () => {
    setShowDetailData(false);
  };

  const DocumentBase64 = (data) => {
    setMsg();
    setProgress({ started: false, pc: 0 });
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
  const submitbilling = (event) => {
    event.preventDefault();

    let filenames = {};
    filenames = billList.map((Bll) => ({ DocName: Bll.filename }));
    //console.log(filenames)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_attachDocList,
        {
          PatientInfo: {
            
            InsurerCode: InsuranceCode,
            RefId: refIdL,
            TransactionNo: transactionNoL,
            HN: hNL,
            VN: vNL,
            DocumenttypeCode: "",
            Runningdocument: randomNumber,
            IsRequestDispute: selectedIdTypeIsRequestDispute,
            AttachDocList: [filenames],
          },
        }
      )
      .then((response) => {
        setBillList();
        console.log(response.data);
        document.getElementById("my_modal_3").close();
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);

          axios
            .post(
              process.env.NEXT_PUBLIC_URL_SV +
                process.env.NEXT_PUBLIC_URL_SearchTransection,
              { PatientInfo: patientUpdate }
            )
            .then((response) => {
              setPostData(response.data);
              // console.log(response.data)
              //  setCurrentData(response.data.Result.TransactionClaimInfo)
              setShowFormError();
            })
            .catch((error) => {
              console.log(error);

              setShowFormError("Error");
              setMassError(error.message);
            });
        }, 2000);
      })
      .catch((error) => {
        // console.error("Error", err)
        console.log(error);
        //  if (err.response.request.status === 500) {
        setShowFormError("Error");
        setMassError(err.response.data.HTTPStatus.message);
      });
  };

  const DeleteDoc = (data) => {
    const isConfirmed = window.confirm("แน่ใจแล้วที่จะลบเอกสารใช่ไหม");
    if (isConfirmed) {
      setMsg();
      setShowDocError();
      setProgress({ started: false, pc: 0 });
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_DeleteDocumentByDocName,
          {
            PatientInfo: {
              RefId: refIdL,
              TransactionNo: transactionNoL,
              DocumentName: data,
            },
          }
        )
        .then((response) => {
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
              Delete Successful
            </div>
          );

          axios
            .post(
              process.env.NEXT_PUBLIC_URL_SV +
                process.env.NEXT_PUBLIC_URL_getcheckclaimstatus,
              {
                PatientInfo: {
                  InsurerCode: InsuranceCode,
                  RefId: refIdL,
                  TransactionNo: transactionNoL,
                  PID: pIDL,
                  PassportNumber: passportNumberL,
                  HN: hNL,
                  VN: vNL,
                },
              }
            )
            .then((response) => {
              //   console.log(response.data);

              setPostData("");
              setCurrentData("");

              console.log(patientUpdate);
              axios
                .post(
                  process.env.NEXT_PUBLIC_URL_SV +
                    process.env.NEXT_PUBLIC_URL_SearchTransection,
                  patientUpdate
                )
                .then((response) => {
                  setPostData(response.data);
                  console.log(response.data);
                  // setShowFormError();
                  setCurrentData(response.data.Result.TransactionClaimInfo);
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
                })
                .catch((error) => {
                  console.log(error);

                  setShowFormError("Error");
                  setMassError(error.message);
                });
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .post(
              process.env.NEXT_PUBLIC_URL_SV +
                process.env.NEXT_PUBLIC_URL_getlistDocumentName,
              {
                PatientInfo: {
                  RefId: refIdL,
                  TransactionNo: transactionNoL,
                  HN: hNL,
                  VN: vNL,
                  DocumenttypeCode: "",
                  DocumentName: "",
                  Runningdocument: randomNumber,
                },
              }
            )
            .then((response) => {
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
    }
  };

  const handleOptionChange = (e) => {
    setSelectedIdType(e.target.value);
  };

  const handleOptionChangeIsRequestDispute = (event) => {
   // console.log(event.target.checked)
  //  document.getElementById("my_modal_3").showModal();
  //  document.getElementById("my_modal_3").close();
    setSelectedIsRequestDispute(event.target.checked);
    if(event.target.checked === true){
      document.getElementById("my_modal_3").close();
      document.getElementById("showFormIsRequestDispute").showModal();
      
      // setShowFormIsRequestDispute(true)
    }else{
      document.getElementById("showFormIsRequestDispute").close();
      // setShowFormIsRequestDispute(false)
    }
  };

  const SuccShowFormIsRequestDispute = (event) => {
       document.getElementById("showFormIsRequestDispute").close();
       document.getElementById("my_modal_3").showModal();
   };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (event) => {
    event.preventDefault();
    setBillList();
    // setStatusAllNew();
    setPostData();
    setShowFormError();
    let data = {};
    let dateToValue = "";
    let dateFromValue = "";
    let PatientInfo;
    if (serviceValue === "OPD") {
      setDoMoney(true);
    } else {
      setDoMoney(false);
    }

    if (serviceValue === "IPD") {
      setNotShowLoc(true);
    } else {
      setNotShowLoc(false);
    }

    if (fromValue && toValue) {
      dateFromValue = dayjs(fromValue.$d).format("YYYY-MM-DD");
      dateToValue = dayjs(toValue.$d).format("YYYY-MM-DD");
    }

    if (selectedIdType === "NATIONAL_ID" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: selectedIdType,
        InvoiceNumber: "",
        ClaimNo: "",
        VN: numberValue.trim(),
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "PASSPORT_NO" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: selectedIdType,
        InvoiceNumber: "",
        ClaimNo: "",
        VN: "",
        PID: "",
        PassportNumber: numberValue.trim(),
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "HOSPITAL_ID" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: selectedIdType,
        InvoiceNumber: "",
        ClaimNo: "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: numberValue.trim(),
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "PID" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: selectedIdType,
        InvoiceNumber: "",
        ClaimNo: "",
        VN: "",
        PID: numberValue.trim(),
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "Invoice" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: selectedIdType,
        InvoiceNumber: numberValue.trim(),
        ClaimNo: "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (selectedIdType === "ClaimNo" && numberValue) {
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: selectedIdType,
        InvoiceNumber: "",
        ClaimNo: numberValue.trim(),
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (fromValue && toValue) {
      console.log("เลือกวันที่");
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: "",
        InvoiceNumber: "",
        ClaimNo: "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: "",
        VisitDatefrom: dateFromValue,
        VisitDateto: dateToValue,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    } else if (statusValue) {
      if (fromValue && toValue) {
        PatientInfo = {
          InsurerCode: InsuranceCode,
          IdType: "",
          InvoiceNumber: "",
          ClaimNo: "",
          VN: "",
          PID: "",
          PassportNumber: "",
          HN: "",
          VisitDatefrom: dateFromValue,
          VisitDateto: dateToValue,
          StatusChangedAtDatefrom: "",
          StatusChangedAtDateto: "",

          StatusClaimCode: statusValue,
          ServiceSettingCode: serviceValue,
        };
      } else {
        const today = dayjs().format("YYYY-MM-DD");
        PatientInfo = {
          InsurerCode: InsuranceCode,
          IdType: "",
          InvoiceNumber: "",
          ClaimNo: "",
          VN: "",
          PID: "",
          PassportNumber: "",
          HN: "",
          VisitDatefrom: today,
          VisitDateto: today,
          StatusChangedAtDatefrom: "",
          StatusChangedAtDateto: "",

          StatusClaimCode: statusValue,
          ServiceSettingCode: serviceValue,
        };
      }
    } else {
      const today = dayjs().format("YYYY-MM-DD");
      PatientInfo = {
        InsurerCode: InsuranceCode,
        IdType: "",
        InvoiceNumber: "",
        ClaimNo: "",
        VN: "",
        PID: "",
        PassportNumber: "",
        HN: "",
        // VisitDatefrom: "",
        // VisitDateto: "",
        VisitDatefrom: today,
        VisitDateto: today,
        StatusChangedAtDatefrom: "",
        StatusChangedAtDateto: "",

        StatusClaimCode: statusValue,
        ServiceSettingCode: serviceValue,
      };
    }

  //  console.log(PatientInfo);
    setPatientUpdate({ PatientInfo });
    if (PatientInfo) {
      setPatientInfoDetail(PatientInfo);
      axios
        .post(
          process.env.NEXT_PUBLIC_URL_SV +
            process.env.NEXT_PUBLIC_URL_SearchTransection,
          { PatientInfo }
        )
        .then((response) => {
          setPostData(response.data);
       //   console.log(response.data);
         // setCurrentData(response.data.Result.TransactionClaimInfo)

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
          console.log(error);

          setShowFormError("Error");
          setMassError(error.message);
        });
    } else {
      setShowFormError("Error");
      setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////// ตัวเลื่อน ตารางซ้าย - ขวา ///////////////////////////////////////////

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;
 // console.log(endIndex +"="+startIndex+"+"+ITEMS_PER_PAGE)
  const datax = currentData.slice(startIndex, endIndex);
  //console.log(currentData)
  useEffectOnce(() => {

    setCount(datax.length);
  }, [datax]);
  //////////////////// Chack Status All///////////////////////////

  const RefreshAll = () => {
    // console.log(data)
    setPostData();
    const extractedRefId = datax.map((item) => item.RefId);
    const extractedTransactionNo = datax.map((item) => item.TransactionNo);

    const PatientInfo = datax.map((item) => ({
      RefId: item.RefId,
      TransactionNo: item.TransactionNo,
    }));

    //console.log(PatientInfo)
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_SV +
          process.env.NEXT_PUBLIC_URL_getcheckclaimstatusListAll,
        { PatientInfo: PatientInfo }
      )
      .then((response) => {
        //   console.log(response.data);

        const AllPatient = response.data.Result.InsuranceData.map((item) => ({
          RefId: item.RefId,
          TransactionNo: item.TransactionNo,
          InsurerCode: item.StatusInfo.InsurerCode,
          BatchNumber: item.StatusInfo.BatchNumber,
          ClaimStatus: item.StatusInfo.ClaimStatus,
          ClaimStatusDesc: item.StatusInfo.ClaimStatusDesc,
          TotalApproveAmount: item.StatusInfo.TotalApproveAmount,
          PaymentDate: item.StatusInfo.PaymentDate,
          InvoiceNumber: item.StatusInfo.InvoiceNumber,
        }));
        //  console.log(AllPatient);
        // setStatusAllNew(AllPatient);
        axios
          .post(
            process.env.NEXT_PUBLIC_URL_SV +
              process.env.NEXT_PUBLIC_URL_SearchTransection,
            { PatientInfo: patientUpdate }
          )
          .then((response) => {
            setPostData(response.data);
            // console.log(response.data)
            //  setCurrentData(response.data.Result.TransactionClaimInfo)
            setShowFormError();
          })
          .catch((error) => {
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
  const CustomTextField = styled(TextField)({
    "& .MuiInputBase-input.Mui-disabled": {
      color: "black", // เปลี่ยนสีข้อความเป็นสีดำ
      cursor: "default", // เปลี่ยนเคอร์เซอร์เป็นแบบปกติ
    },
  });

  /////////////////////////////////////////////////////////////////////

  return (
    <>
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
              variant="standard"
              className="w-96"
              name="number"
              type="text"
              value={numberValue ? numberValue : ""}
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
            <FormControl className="ml-2 w-80">
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
                {serviceCode ? (
                  serviceCode.Result.map((type, index) => (
                    <MenuItem key={index} value={type.servicesettingcode}>
                      {type.servicesettingcode} - {type.servicesettingdesc}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="OPD">OPD - ผู้ป่วยนอก</MenuItem>
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
                value={statusValue ? statusValue : ""}
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
          {patientUpdate ? (
            
            patientUpdate.PatientInfo.ServiceSettingCode === "PRE" ? (
              <div role="tablist" className="tabs tabs-lifted ">
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab w-[500px] text-sm inline-flex space-x-2 whitespace-nowrap"
                  aria-label="รอการส่งเคลม"
                  defaultChecked
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  <table className="table mt-2 text-xs">
                    <thead className="bg-info text-base-100 text-center text-sm">
                      <tr>
                        <th>Visit Date</th>
                        <th>Full Name</th>
                        <th>
                          HN <br /> VN
                        </th>
                        {notShowLoc === true ? "" : <th>Location</th>}
                        {/* <th>
                           Policy Number
                        </th> */}
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
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {postData ? postData.Result.TransactionClaimInfo[0].HN ? (
                        datax
                          .filter(
                            (bill) =>
                              (bill.VisitDate || bill.HN) !== "" &&
                              bill.IsAdmission === null
                          )
                          .map(
                            (bill, index) => (
                              // ((bill.VisitDate || bill.HN) !== "" && bill.IsAdmission === null) && (
                              <tr className="hover text-center" key={index}>
                                <td className="whitespace-nowrap">
                                  {bill.VisitDate}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.TitleTH} {bill.GivenNameTH}{" "}
                                  {bill.SurnameTH}
                                  <br /> ( {bill.ServiceSettingCode} -{" "}
                                  {illnessType
                                    ? illnessType.Result.map((ill) =>
                                        ill.illnesstypecode ===
                                        bill.IllnessTypeCode ? (
                                          <> {ill.illnesstypedesc} </>
                                        ) : (
                                          ""
                                        )
                                      )
                                    : ""}{" "}
                                  )
                                <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.HN ? bill.HN : "-"} <br />{" "}
                                  {bill.VN ? bill.VN : "-"}
                                </td>
                                {notShowLoc === true ? (
                                  ""
                                ) : (
                                  <td className="">{bill.VisitLocation}</td>
                                )}
                                <td className="whitespace-nowrap">
                                  {bill.ClaimNo ? bill.ClaimNo : "-"}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.InvoiceNumber
                                    ? bill.InvoiceNumber
                                    : "-"}{" "}
                                  <br />
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
                                  <div className="grid gap-1 sm:grid-cols-1 w-40 break-all">
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
                                <th className="whitespace-nowrap">
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
                                    ? parseFloat(
                                        bill.TotalExcessAmount
                                      ).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : ""}
                                </th>
                                <td>
                                  {bill.RefId ? (
                                       (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="") &&
                                    bill.ClaimStatusDesc !==
                                      "waitting for discharge" ? (
                                      <>
                                        <div
                                          className="tooltip "
                                          data-tip="รีเฟรช"
                                        >
                                          <h1
                                            className="text-success text-2xl"
                                            onClick={() => Refresh(bill)}
                                          >
                                            <LuRefreshCw />
                                          </h1>
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}
                                  {bill.RefId ? (
                                    bill.BatchNumber && bill.IsIPDDischarge ? (
                                      <div
                                        className="tooltip"
                                        data-tip="ข้อมูลส่งเคลม"
                                      >
                                        <h1
                                          className="text-error text-2xl"
                                          onClick={() => Detail3PRE(bill)}
                                        >
                                          <IoDocumentText />
                                        </h1>
                                      </div>
                                    ) : bill.ClaimStatusDesc === "Approve" ||
                                      (bill.ClaimStatusDesc === "Processing" &&
                                        bill.ServiceSettingCode !== "PRE") ||
                                      bill.ClaimStatusDesc === "Received" ||
                                      bill.ClaimStatusDesc ===
                                        "waitting for discharge" ||
                                      bill.ClaimStatusDesc === "Pending" ? (
                                      bill.IsIPDDischarge === false ||
                                      bill.IsIPDDischarge === null ? (
                                        <>
                                          <div
                                            className="tooltip"
                                            data-tip="ข้อมูลส่งเคลม"
                                          >
                                            {bill.ServiceSettingCode ===
                                            "OPD" ? (
                                              <h1
                                                className="text-primary text-2xl"
                                                onClick={() => Detail(bill)}
                                              >
                                                <IoDocumentText />
                                              </h1>
                                            ) : bill.ClaimStatusDesc !==
                                              "Approve" ? (
                                              <h1
                                                className="text-primary text-2xl"
                                                onClick={() => Detail2(bill)}
                                              >
                                                <IoDocumentText />
                                              </h1>
                                            ) : (
                                              <div
                                                className="tooltip"
                                                data-tip="ข้อมูลส่งเคลม"
                                              >
                                                <h1
                                                  className="text-error text-2xl"
                                                  onClick={() =>
                                                    Detail3PRE(bill)
                                                  }
                                                >
                                                  <IoDocumentText />
                                                </h1>
                                              </div>
                                            )}
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            className="tooltip"
                                            data-tip="ข้อมูลส่งเคลม"
                                          >
                                            <h1
                                              className="text-error text-2xl"
                                              onClick={() => Detail3PRE(bill)}
                                            >
                                              <IoDocumentText />
                                            </h1>
                                          </div>
                                        </>
                                      )
                                    ) : (
                                      <>
                                        <div
                                          className="tooltip"
                                          data-tip="ข้อมูลส่งเคลม"
                                        >
                                          <h1
                                            className="text-error text-2xl"
                                            onClick={() => Detail3PRE(bill)}
                                          >
                                            <IoDocumentText />
                                          </h1>
                                        </div>
                                      </>
                                    )
                                  ) : (
                                    ""
                                  )}

                                  <div
                                    className="tooltip"
                                    data-tip="ดู เอกสารทั้งหมด"
                                  >
                                    <h1
                                      className="text-primary text-2xl"
                                      onClick={() => DocumentList(bill)}
                                    >
                                      <HiDocumentSearch />
                                    </h1>
                                  </div>
                                </td>
                                <td>
                                  {bill.RefId &&
                                  bill.ClaimNo &&
                                  bill.ClaimStatusDesc !== "Cancelled to AIA" &&
                                  bill.ClaimStatusDesc !== "Cancelled" &&
                                  bill.ClaimStatusDesc !== "Reversed" ? (
                                    bill.BatchNumber ? (
                                      ""
                                    ) : bill.ServiceSettingCode === "OPD" ? (
                                      <>
                                        <button
                                          className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                          onClick={() =>
                                            handleButtonClick(bill)
                                          }
                                        >
                                          ส่งเอกสารเพิ่มเติม
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                        onClick={() => handleButtonClick(bill)}
                                      >
                                        ส่งเอกสารเพิ่มเติม
                                      </button>
                                    )
                                  ) : (
                                    ""
                                  )}
                                  {bill.RefId ? (
                                    bill.ServiceSettingCode === "OPD" ? (
                                      bill.ClaimStatusDesc ===
                                        "waitting for discharge" &&
                                      doMoney === true ? (
                                        <>
                                          <button
                                            className="btn btn-sm btn-warning bg-warning hover:bg-base-100 text-xs px-2 py-1"
                                            onClick={() =>
                                              Checkcreditlimit(bill)
                                            }
                                          >
                                            ประมาณการค่าใช้จ่าย
                                          </button>
                                        </>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            )
                            // )
                          )
                        ) : (
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="flex items-center">No data available in table</th>
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
                </div>
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab w-[500px] text-sm inline-flex space-x-2 whitespace-nowrap"
                  aria-label="Admission"
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  <table className="table mt-2 text-xs">
                    <thead className="bg-info text-base-100 text-center text-sm">
                      <tr>
                        <th>Visit Date</th>
                        <th>Full Name</th>
                        <th>
                          HN <br /> VN
                        </th>
                        {notShowLoc === true ? "" : <th>Location</th>}
                        {/* <th>
                           Policy Number
                        </th> */}
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
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {postData ? postData.Result.TransactionClaimInfo[0].HN ? (
                        datax
                          .filter(
                            (bill) =>
                              (bill.VisitDate || bill.HN) !== "" &&
                              bill.IsAdmission === true
                          )
                          .map(
                            (bill, index) => (
                              // ((bill.VisitDate || bill.HN) !== "" && bill.IsAdmission === true) && (
                              <tr className="hover text-center" key={index}>
                                <td className="whitespace-nowrap">
                                  {bill.VisitDate}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.TitleTH} {bill.GivenNameTH}{" "}
                                  {bill.SurnameTH}
                                  <br /> ( {bill.ServiceSettingCode} -{" "}
                                  {illnessType
                                    ? illnessType.Result.map((ill) =>
                                        ill.illnesstypecode ===
                                        bill.IllnessTypeCode ? (
                                          <> {ill.illnesstypedesc} </>
                                        ) : (
                                          ""
                                        )
                                      )
                                    : ""}{" "}
                                  )
                                  <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.HN ? bill.HN : "-"} <br />{" "}
                                  {bill.VN ? bill.VN : "-"}
                                </td>
                                {notShowLoc === true ? (
                                  ""
                                ) : (
                                  <td className="">{bill.VisitLocation}</td>
                                )}
                                 {/* <td className="whitespace-nowrap">
                                     {bill.ClaimNo ? bill.ClaimNo : "-"}
                                   </td> */}
                                <td className="whitespace-nowrap">
                                  {bill.ClaimNo ? bill.ClaimNo : "-"}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.InvoiceNumber
                                    ? bill.InvoiceNumber
                                    : "-"}{" "}
                                  <br />
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
                                  <div className="grid gap-1 sm:grid-cols-1 w-40 break-all">
                                    {bill.ClaimStatusDesc ? (
                                      bill.ClaimStatusDesc_EN !== "Cancelled" &&
                                      bill.ClaimStatusDesc_EN !==
                                        "Cancelled to AIA" &&
                                      bill.ClaimStatusDesc_EN !== "Reversed" &&
                                      bill.ClaimStatusDesc_EN !== "Decline" ? (
                                        bill.ClaimStatusDesc_EN ===
                                          "Approved" ||
                                        bill.ClaimStatusDesc_EN === "Settle" ? (
                                          <a
                                            onClick={() => DoTransaction(bill)}
                                            className="bg-info text-base-100 rounded-full px-3 py-1 w-full"
                                          >
                                            {bill.ClaimStatusDesc_TH}
                                          </a>
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
                                <th className="whitespace-nowrap">
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
                                    ? parseFloat(
                                        bill.TotalExcessAmount
                                      ).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : ""}
                                </th>
                                <td>
                                  {bill.RefId ? (
                                       (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="") &&
                                    bill.ClaimStatusDesc !==
                                      "waitting for discharge" ? (
                                      <>
                                        <div
                                          className="tooltip "
                                          data-tip="รีเฟรช"
                                        >
                                          <h1
                                            className="text-success text-2xl"
                                            onClick={() => Refresh(bill)}
                                          >
                                            <LuRefreshCw />
                                          </h1>
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}

                                  {bill.RefId ? (
                                    bill.BatchNumber && bill.IsIPDDischarge ? (
                                      <div
                                        className="tooltip"
                                        data-tip="ข้อมูลส่งเคลม"
                                      >
                                        <h1
                                          className="text-error text-2xl"
                                          onClick={() => Detail3PRE(bill)}
                                        >
                                          <IoDocumentText />
                                        </h1>
                                      </div>
                                    ) : bill.ClaimStatusDesc === "Approve" ||
                                      (bill.ClaimStatusDesc === "Processing" &&
                                        bill.ServiceSettingCode !== "PRE") ||
                                      bill.ClaimStatusDesc === "Received" ||
                                      bill.ClaimStatusDesc ===
                                        "waitting for discharge" ||
                                      bill.ClaimStatusDesc === "Pending" ? (
                                      bill.IsIPDDischarge === false ||
                                      bill.IsIPDDischarge === null ? (
                                        <>
                                          <div
                                            className="tooltip"
                                            data-tip="ข้อมูลส่งเคลม"
                                          >
                                            {bill.ServiceSettingCode ===
                                            "OPD" ? (
                                              <h1
                                                className="text-primary text-2xl"
                                                onClick={() => Detail(bill)}
                                              >
                                                <IoDocumentText />
                                              </h1>
                                            ) : bill.ClaimStatusDesc !==
                                              "Approve" ? (
                                              <h1
                                                className="text-primary text-2xl"
                                                onClick={() => Detail2(bill)}
                                              >
                                                <IoDocumentText />
                                              </h1>
                                            ) : (
                                              <div
                                                className="tooltip"
                                                data-tip="ข้อมูลส่งเคลม"
                                              >
                                                <h1
                                                  className="text-error text-2xl"
                                                  onClick={() =>
                                                    Detail3PRE(bill)
                                                  }
                                                >
                                                  <IoDocumentText />
                                                </h1>
                                              </div>
                                            )}
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            className="tooltip"
                                            data-tip="ข้อมูลส่งเคลม"
                                          >
                                            <h1
                                              className="text-error text-2xl"
                                              onClick={() => Detail3PRE(bill)}
                                            >
                                              <IoDocumentText />
                                            </h1>
                                          </div>
                                        </>
                                      )
                                    ) : (
                                      <>
                                        <div
                                          className="tooltip"
                                          data-tip="ข้อมูลส่งเคลม"
                                        >
                                          <h1
                                            className="text-error text-2xl"
                                            onClick={() => Detail3PRE(bill)}
                                          >
                                            <IoDocumentText />
                                          </h1>
                                        </div>
                                      </>
                                    )
                                  ) : (
                                    ""
                                  )}

                                  <div
                                    className="tooltip"
                                    data-tip="ดู เอกสารทั้งหมด"
                                  >
                                    <h1
                                      className="text-primary text-2xl"
                                      onClick={() => DocumentList(bill)}
                                    >
                                      <HiDocumentSearch />
                                    </h1>
                                  </div>
                                </td>
                                <td>
                                  {bill.RefId &&
                                  bill.ClaimNo &&
                                  bill.ClaimStatusDesc !== "Cancelled to AIA" &&
                                  bill.ClaimStatusDesc !== "Cancelled" &&
                                  bill.ClaimStatusDesc !== "Reversed" ? (
                                    bill.BatchNumber ? (
                                      ""
                                    ) : bill.ServiceSettingCode === "OPD" ? (
                                      <>
                                        <button
                                          className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                          onClick={() =>
                                            handleButtonClick(bill)
                                          }
                                        >
                                          ส่งเอกสารเพิ่มเติม
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                        onClick={() => handleButtonClick(bill)}
                                      >
                                        ส่งเอกสารเพิ่มเติม
                                      </button>
                                    )
                                  ) : (
                                    ""
                                  )}
                                  {bill.RefId ? (
                                    bill.ServiceSettingCode === "OPD" ? (
                                      bill.ClaimStatusDesc ===
                                        "waitting for discharge" &&
                                      doMoney === true ? (
                                        <>
                                          <button
                                            className="btn btn-sm btn-warning bg-warning hover:bg-base-100 text-xs px-2 py-1"
                                            onClick={() =>
                                              Checkcreditlimit(bill)
                                            }
                                          >
                                            ประมาณการค่าใช้จ่าย
                                          </button>
                                        </>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            )
                            // )
                          )
                        ) : (
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="flex items-center">No data available in table</th>
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
                </div>
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab w-[500px] text-sm inline-flex space-x-2 whitespace-nowrap"
                  aria-label="UR"
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  <table className="table mt-2 text-xs">
                    <thead className="bg-info text-base-100 text-center text-sm">
                      <tr>
                        <th>Visit Date</th>
                        <th>Full Name</th>
                        <th>
                          HN <br /> VN
                        </th>
                        {notShowLoc === true ? "" : <th>Location</th>}
                        {/* <th>
                           Policy Number
                        </th> */}
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
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {postData ? postData.Result.TransactionClaimInfo[0].HN ? (
                        datax
                          .filter(
                            (bill) =>
                              (bill.VisitDate || bill.HN) !== "" &&
                              bill.IsAdmission === false
                          )
                          .map(
                            (bill, index) => (
                              // ((bill.VisitDate || bill.HN) !== "" && bill.IsAdmission === false) && (
                              <tr className="hover text-center" key={index}>
                                <td className="whitespace-nowrap">
                                  {bill.VisitDate}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.TitleTH} {bill.GivenNameTH}{" "}
                                  {bill.SurnameTH}
                                  <br /> ( {bill.ServiceSettingCode} -{" "}
                                  {illnessType
                                    ? illnessType.Result.map((ill) =>
                                        ill.illnesstypecode ===
                                        bill.IllnessTypeCode ? (
                                          <> {ill.illnesstypedesc} </>
                                        ) : (
                                          ""
                                        )
                                      )
                                    : ""}{" "}
                                  )
                                  <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.HN ? bill.HN : "-"} <br />{" "}
                                  {bill.VN ? bill.VN : "-"}
                                </td>
                                {notShowLoc === true ? (
                                  ""
                                ) : (
                                  <td className="">{bill.VisitLocation}</td>
                                )}
                                 {/* <td className="whitespace-nowrap">
                                     {bill.ClaimNo ? bill.ClaimNo : "-"}
                                   </td> */}
                                <td className="whitespace-nowrap">
                                  {bill.ClaimNo ? bill.ClaimNo : "-"}
                                </td>
                                <td className="whitespace-nowrap">
                                  {bill.InvoiceNumber
                                    ? bill.InvoiceNumber
                                    : "-"}{" "}
                                  <br />
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
                                  <div className="grid gap-1 sm:grid-cols-1 w-40 break-all">
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
                                <th className="whitespace-nowrap">
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
                                    ? parseFloat(
                                        bill.TotalExcessAmount
                                      ).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : ""}
                                </th>
                                <td>
                                  {bill.RefId ? (
                                          (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
                                          (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
                                          (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="") &&
                                    bill.ClaimStatusDesc !==
                                      "waitting for discharge" ? (
                                      <>
                                        <div
                                          className="tooltip "
                                          data-tip="รีเฟรช"
                                        >
                                          <h1
                                            className="text-success text-2xl"
                                            onClick={() => Refresh(bill)}
                                          >
                                            <LuRefreshCw />
                                          </h1>
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}

                                  {bill.RefId ? (
                                    bill.BatchNumber && bill.IsIPDDischarge ? (
                                      <div
                                        className="tooltip"
                                        data-tip="ข้อมูลส่งเคลม"
                                      >
                                        <h1
                                          className="text-error text-2xl"
                                          onClick={() => Detail3PRE(bill)}
                                        >
                                          <IoDocumentText />
                                        </h1>
                                      </div>
                                    ) : bill.ClaimStatusDesc === "Approve" ||
                                      (bill.ClaimStatusDesc === "Processing" &&
                                        bill.ServiceSettingCode !== "PRE") ||
                                      bill.ClaimStatusDesc === "Received" ||
                                      bill.ClaimStatusDesc ===
                                        "waitting for discharge" ||
                                      bill.ClaimStatusDesc === "Pending" ? (
                                      bill.IsIPDDischarge === false ||
                                      bill.IsIPDDischarge === null ? (
                                        <>
                                          <div
                                            className="tooltip"
                                            data-tip="ข้อมูลส่งเคลม"
                                          >
                                            {bill.ServiceSettingCode ===
                                            "OPD" ? (
                                              <h1
                                                className="text-primary text-2xl"
                                                onClick={() => Detail(bill)}
                                              >
                                                <IoDocumentText />
                                              </h1>
                                            ) : bill.ClaimStatusDesc !==
                                              "Approve" ? (
                                              <h1
                                                className="text-primary text-2xl"
                                                onClick={() => Detail2(bill)}
                                              >
                                                <IoDocumentText />
                                              </h1>
                                            ) : (
                                              <div
                                                className="tooltip"
                                                data-tip="ข้อมูลส่งเคลม"
                                              >
                                                <h1
                                                  className="text-error text-2xl"
                                                  onClick={() =>
                                                    Detail3PRE(bill)
                                                  }
                                                >
                                                  <IoDocumentText />
                                                </h1>
                                              </div>
                                            )}
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            className="tooltip"
                                            data-tip="ข้อมูลส่งเคลม"
                                          >
                                            <h1
                                              className="text-error text-2xl"
                                              onClick={() => Detail3PRE(bill)}
                                            >
                                              <IoDocumentText />
                                            </h1>
                                          </div>
                                        </>
                                      )
                                    ) : (
                                      <>
                                        <div
                                          className="tooltip"
                                          data-tip="ข้อมูลส่งเคลม"
                                        >
                                          <h1
                                            className="text-error text-2xl"
                                            onClick={() => Detail3PRE(bill)}
                                          >
                                            <IoDocumentText />
                                          </h1>
                                        </div>
                                      </>
                                    )
                                  ) : (
                                    ""
                                  )}

                                  <div
                                    className="tooltip"
                                    data-tip="ดู เอกสารทั้งหมด"
                                  >
                                    <h1
                                      className="text-primary text-2xl"
                                      onClick={() => DocumentList(bill)}
                                    >
                                      <HiDocumentSearch />
                                    </h1>
                                  </div>
                                </td>
                                <td>
                                  {bill.RefId &&
                                  bill.ClaimNo &&
                                  bill.ClaimStatusDesc !== "Cancelled to AIA" &&
                                  bill.ClaimStatusDesc !== "Cancelled" &&
                                  bill.ClaimStatusDesc !== "Reversed" ? (
                                    bill.BatchNumber ? (
                                      ""
                                    ) : bill.ServiceSettingCode === "OPD" ? (
                                      <>
                                        <button
                                          className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                          onClick={() =>
                                            handleButtonClick(bill)
                                          }
                                        >
                                          ส่งเอกสารเพิ่มเติม
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                        onClick={() => handleButtonClick(bill)}
                                      >
                                        ส่งเอกสารเพิ่มเติม
                                      </button>
                                    )
                                  ) : (
                                    ""
                                  )}
                                  {bill.RefId ? (
                                    bill.ServiceSettingCode === "OPD" ? (
                                      bill.ClaimStatusDesc ===
                                        "waitting for discharge" &&
                                      doMoney === true ? (
                                        <>
                                          <button
                                            className="btn btn-sm btn-warning bg-warning hover:bg-base-100 text-xs px-2 py-1"
                                            onClick={() =>
                                              Checkcreditlimit(bill)
                                            }
                                          >
                                            ประมาณการค่าใช้จ่าย
                                          </button>
                                        </>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            )
                            // )
                          )
                        ) : (
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="flex items-center">No data available in table</th>
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
                </div>
              </div>
            ) : (patientUpdate.PatientInfo.ServiceSettingCode === "IPD" ?(
              //IPD
              <table className="table mt-2 text-xs">
                <thead className="bg-info text-base-100 text-center text-sm">
                  <tr>
                    <th>Visit Date</th>
                    <th>Full Name</th>
                    <th>
                      HN <br /> VN
                    </th>
                    {notShowLoc === true ? "" : <th>Location</th>}
                    {/* <th>
                           Policy Number
                    </th> */}
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
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {postData ? postData.Result.TransactionClaimInfo[0].HN ? (
                    datax
                      .filter((bill) => (bill.VisitDate || bill.HN) !== "")
                      .map(
                        (bill, index) => (
                          // (bill.VisitDate || bill.HN) !== "" && (
                          <tr className="hover text-center" key={index}>
                            <td className="whitespace-nowrap">
                              {bill.VisitDate}
                            </td>
                            <td className="whitespace-nowrap">
                              {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                              <br /> ( {bill.ServiceSettingCode} -{" "}
                              {illnessType
                                ? illnessType.Result.map((ill) =>
                                    ill.illnesstypecode ===
                                    bill.IllnessTypeCode ? (
                                      <> {ill.illnesstypedesc} </>
                                    ) : (
                                      ""
                                    )
                                  )
                                : ""}{" "}
                              )
                              <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
                            </td>
                            <td className="whitespace-nowrap">
                              {bill.HN ? bill.HN : "-"} <br />{" "}
                              {bill.VN ? bill.VN : "-"}
                            </td>
                            {notShowLoc === true ? (
                              ""
                            ) : (
                              <td className="">{bill.VisitLocation}</td>
                            )}
                             {/* <td className="whitespace-nowrap">
                                     {bill.ClaimNo ? bill.ClaimNo : "-"}
                                   </td> */}
                            <td className="whitespace-nowrap">
                              {bill.ClaimNo ? bill.ClaimNo : "-"}
                            </td>
                            <td className="whitespace-nowrap">
                              {bill.InvoiceNumber ? bill.InvoiceNumber : "-"}{" "}
                              <br />
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
                              <div className="grid gap-1 sm:grid-cols-1 w-40 break-all">
                                {bill.ClaimStatusDesc ? (
                                  bill.ClaimStatusDesc_EN !== "Cancelled" &&
                                  bill.ClaimStatusDesc_EN !==
                                    "Cancelled to AIA" &&
                                  bill.ClaimStatusDesc_EN !== "Reversed" &&
                                  bill.ClaimStatusDesc_EN !== "Decline" ? (
                                    bill.ClaimStatusDesc_EN === "Approved" ||
                                    bill.ClaimStatusDesc_EN === "Settle" ? (
                                      <button 
                                      onClick={() => DoTransaction(bill)}
                                      className="bg-info text-base-100 rounded-full px-3 py-1 w-full">
                                        {bill.ClaimStatusDesc_TH}
                                      </button>
                                    ) : bill.ClaimStatusDesc_EN === "Approve" ||
                                      bill.ClaimStatusDesc_EN === "Received" ||
                                      bill.ClaimStatusDesc_EN === "Pending" ||
                                      bill.ClaimStatusDesc_EN === "AddDoc" ||
                                      bill.ClaimStatusDesc_EN ===
                                        "Processing" ? (
                                      bill.ClaimStatusDesc_EN === "Pending" ? (
                                        <button
                                          onClick={() => DoTransaction(bill)}
                                          className="bg-accent text-base-100 rounded-full px-3 py-1 w-full"
                                        >
                                          {bill.ClaimStatusDesc_TH}
                                        </button>
                                        ) : bill.ClaimStatusDesc_EN === "Processing" ? (  <button onClick={() => DoTransaction(bill)} className="bg-accent text-base-100 rounded-full px-3 py-1 w-full">{bill.ClaimStatusDesc_TH}</button> ) :(
                                        <button
                                          onClick={() => DoTransaction(bill)}
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
                            <th className="whitespace-nowrap">
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
                                ? parseFloat(
                                    bill.TotalExcessAmount
                                  ).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : ""}
                            </th>
                            <td>
                              {bill.RefId ? (
                                       (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="") &&
                                bill.ClaimStatusDesc !==
                                  "waitting for discharge" ? (
                                  <>
                                    <div className="tooltip " data-tip="รีเฟรช">
                                      <h1
                                        className="text-success text-2xl"
                                        onClick={() => Refresh(bill)}
                                      >
                                        <LuRefreshCw />
                                      </h1>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}

                              {bill.RefId ? (
                                bill.BatchNumber && bill.IsIPDDischarge ? (
                                  <div
                                    className="tooltip"
                                    data-tip="ข้อมูลส่งเคลม"
                                  >
                                    <h1
                                      className="text-error text-2xl"
                                      onClick={() => Detail3IPD(bill)}
                                    >
                                      <IoDocumentText />
                                    </h1>
                                  </div>
                                ) : bill.ClaimStatusDesc === "Approve" ||
                                  (bill.ClaimStatusDesc === "Processing" &&
                                    bill.ServiceSettingCode !== "PRE") ||
                                  bill.ClaimStatusDesc === "Received" ||
                                  bill.ClaimStatusDesc ===
                                    "waitting for discharge" ||
                                  bill.ClaimStatusDesc === "Pending" ? (
                                  bill.IsIPDDischarge === false ||
                                  bill.IsIPDDischarge === null ? (
                                    <>
                                      <div
                                        className="tooltip"
                                        data-tip="ข้อมูลส่งเคลม"
                                      >
                                        {bill.ServiceSettingCode === "OPD" ? (
                                          <h1
                                            className="text-primary text-2xl"
                                            onClick={() => Detail(bill)}
                                          >
                                            <IoDocumentText />
                                          </h1>
                                        ) : bill.ClaimStatusDesc !==
                                          "Approve" ? (
                                          <h1
                                            className="text-primary text-2xl"
                                            onClick={() => Detail2(bill)}
                                          >
                                            <IoDocumentText />
                                          </h1>
                                        ) : (
                                          <div
                                            className="tooltip"
                                            data-tip="ข้อมูลส่งเคลม"
                                          >
                                            <h1
                                              className="text-error text-2xl"
                                              onClick={() => Detail3IPD(bill)}
                                            >
                                              <IoDocumentText />
                                            </h1>
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  ) : bill.ClaimNo === "" ?(
                                    <div
                                    className="tooltip"
                                    data-tip="ข้อมูลส่งเคลม"
                                  >
                                    <h1
                                    className="text-primary text-2xl"
                                    onClick={() => Detail2(bill)}
                                  >
                                    <IoDocumentText />
                                  </h1>
                                  </div>
                                  ):(
                                    <>
                                      <div
                                        className="tooltip"
                                        data-tip="ข้อมูลส่งเคลม"
                                      >
                                        <h1
                                          className="text-error text-2xl"
                                          onClick={() => Detail3IPD(bill)}
                                        >
                                          <IoDocumentText />
                                        </h1>
                                      </div>
                                    </>
                                  )
                                ) : (
                                  <>
                                    <div
                                      className="tooltip"
                                      data-tip="ข้อมูลส่งเคลม"
                                    >
                                      <h1
                                        className="text-error text-2xl"
                                        onClick={() => Detail3IPD(bill)}
                                      >
                                        <IoDocumentText />
                                      </h1>
                                    </div>
                                  </>
                                )
                              ) : (
                                ""
                              )}

                              <div
                                className="tooltip"
                                data-tip="ดู เอกสารทั้งหมด"
                              >
                                <h1
                                  className="text-primary text-2xl"
                                  onClick={() => DocumentList(bill)}
                                >
                                  <HiDocumentSearch />
                                </h1>
                              </div>
                            </td>
                            <td>
                              {bill.RefId &&
                              bill.ClaimNo &&
                              bill.ClaimStatusDesc !== "Cancelled to AIA" &&
                              bill.ClaimStatusDesc !== "Cancelled" &&
                              bill.ClaimStatusDesc !== "Reversed" ? (
                                bill.BatchNumber ? (
                                  ""
                                ) : bill.ServiceSettingCode === "OPD" ? (
                                  <>
                                    <button
                                      className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                      onClick={() => handleButtonClick(bill)}
                                    >
                                      ส่งเอกสารเพิ่มเติม
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                    onClick={() => handleButtonClick(bill)}
                                  >
                                    ส่งเอกสารเพิ่มเติม
                                  </button>
                                )
                              ) : (
                                ""
                              )}
                              {bill.RefId ? (
                                bill.ServiceSettingCode === "OPD" ? (
                                  bill.ClaimStatusDesc ===
                                    "waitting for discharge" &&
                                  doMoney === true ? (
                                    <>
                                      <button
                                        className="btn btn-sm btn-warning bg-warning hover:bg-base-100 text-xs px-2 py-1 whitespace-nowrap"
                                        onClick={() => Checkcreditlimit(bill)}
                                      >
                                        ประมาณการค่าใช้จ่าย
                                      </button>
                                    </>
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        )
                        // )
                      )
                    ) : (
                      <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="flex items-center">No data available in table</th>
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
            )
          : (
                       //OPD ที่ เลือก 
                       <table className="table mt-2 text-xs">
                       <thead className="bg-info text-base-100 text-center text-xs">
                         <tr>
                           <th>Visit Date</th>
                           <th>Full Name</th>
                           <th>
                             HN <br /> VN
                           </th>
                           {notShowLoc === true ? "" : <th>Location</th>}
                           {/* <th>
                           Policy Number
                           </th> */}
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
                           <th></th>
                           <th></th>
                         </tr>
                       </thead>
                       <tbody>
                         {postData ? postData.Result.TransactionClaimInfo[0].HN ? (
                           datax
                             .filter((bill) => (bill.VisitDate || bill.HN) !== "")
                             .map(
                               (bill, index) => (
                                 // (bill.VisitDate || bill.HN) !== "" && (
                                 <tr className="hover text-center" key={index}>
                                   <td className="whitespace-nowrap">
                                     {bill.VisitDate}
                                   </td>
                                   <td className="whitespace-nowrap">
                                     {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                                     <br /> ( {bill.ServiceSettingCode} -{" "}
                                     {illnessType
                                       ? illnessType.Result.map((ill) =>
                                           ill.illnesstypecode ===
                                           bill.IllnessTypeCode ? (
                                             <> {ill.illnesstypedesc} </>
                                           ) : (
                                             ""
                                           )
                                         )
                                       : ""}{" "}
                                     )
                                     <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
                                   </td>
                                   <td className="whitespace-nowrap">
                                     {bill.HN ? bill.HN : "-"} <br />{" "}
                                     {bill.VN ? bill.VN : "-"}
                                   </td>
                                   {notShowLoc === true ? (
                                     ""
                                   ) : (
                                     <td className="">{bill.VisitLocation}</td>
                                   )}
                                    {/* <td className="whitespace-nowrap">
                                     {bill.ClaimNo ? bill.ClaimNo : "-"}
                                   </td> */}
                                   <td className="whitespace-nowrap">
                                     {bill.ClaimNo ? bill.ClaimNo : "-"}
                                   </td>
                                   <td className="whitespace-nowrap">
                                     {bill.InvoiceNumber ? bill.InvoiceNumber : "-"}{" "}
                                     <br />
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
                                     <div className="grid gap-1 sm:grid-cols-1 w-40 break-all">
                                       {bill.ClaimStatusDesc ? (
                                         bill.ClaimStatusDesc_EN !== "Cancelled" &&
                                         bill.ClaimStatusDesc_EN !==
                                           "Cancelled to AIA" &&
                                         bill.ClaimStatusDesc_EN !== "Reversed" &&
                                         bill.ClaimStatusDesc_EN !== "Decline" ? (
                                           bill.ClaimStatusDesc_EN === "Approved" ||
                                           bill.ClaimStatusDesc_EN === "Settle" ? (
                                             <button
                                               onClick={() => DoTransaction(bill)}
                                               className="bg-info text-base-100 rounded-full px-3 py-1 w-full"
                                             >
                                               {bill.ClaimStatusDesc_TH}
                                             </button>
                                           ) : bill.ClaimStatusDesc_EN === "Approve" ||
                                             bill.ClaimStatusDesc_EN === "Received" ||
                                             bill.ClaimStatusDesc_EN === "Pending" ||
                                             bill.ClaimStatusDesc_EN === "AddDoc" ||
                                             bill.ClaimStatusDesc_EN === "Processing" ? (
                                             bill.ClaimStatusDesc_EN === "Pending" ? (
                                               <button
                                                 onClick={() => DoTransaction(bill)}
                                                 className="bg-accent text-base-100 rounded-full px-3 py-1 w-full"
                                               >
                                                 {bill.ClaimStatusDesc_TH}
                                               </button>
                                           ) : bill.ClaimStatusDesc_EN === "Processing" ? (  <button onClick={() => DoTransaction(bill)} className="bg-accent text-base-100 rounded-full px-3 py-1 w-full">{bill.ClaimStatusDesc_TH}</button> ) :(
                                               <button
                                                 onClick={() => DoTransaction(bill)}
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
                                   <th className="whitespace-nowrap">
                                     {bill.TotalBillAmount
                                       ? parseFloat(bill.TotalBillAmount).toLocaleString(
                                           "en-US",
                                           {
                                             minimumFractionDigits: 2,
                                             maximumFractionDigits: 2,
                                           }
                                         )
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
                                       ? parseFloat(
                                           bill.TotalExcessAmount
                                         ).toLocaleString("en-US", {
                                           minimumFractionDigits: 2,
                                           maximumFractionDigits: 2,
                                         })
                                       : ""}
                                   </th>
                                   <td>
                                     {bill.RefId ? (
                                       (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="") &&
                                       bill.ClaimStatusDesc !==
                                         "waitting for discharge" ? (
                                         <>
                                           <div className="tooltip " data-tip="รีเฟรช">
                                             <h1
                                               className="text-success text-2xl"
                                               onClick={() => Refresh(bill)}
                                             >
                                               <LuRefreshCw />
                                             </h1>
                                           </div>
                                         </>
                                       ) : (
                                         ""
                                       )
                                     ) : (
                                       ""
                                     )}
         
                                     {bill.RefId ? (
                                       bill.BatchNumber ? (
                                         <div
                                           className="tooltip"
                                           data-tip="ข้อมูลส่งเคลม"
                                         >
                                           <h1
                                             className="text-error text-2xl"
                                             onClick={() => Detail3OPD(bill)}
                                           >
                                             <IoDocumentText />
                                           </h1>
                                         </div>
                                       ) : bill.ClaimStatusDesc === "Approve" ||
                                         (bill.ClaimStatusDesc === "Processing" &&
                                           bill.ServiceSettingCode !== "PRE") ||
                                         bill.ClaimStatusDesc === "Received" ||
                                         bill.ClaimStatusDesc ===
                                           "waitting for discharge" ||
                                         bill.ClaimStatusDesc === "Pending" ? (
                                         bill.IsIPDDischarge === false ||
                                         bill.IsIPDDischarge === null ? (
                                           <>
                                             <div
                                               className="tooltip"
                                               data-tip="ข้อมูลส่งเคลม"
                                             >
                                               {bill.ServiceSettingCode === "OPD" ? (
                                                 <h1
                                                   className="text-primary text-2xl"
                                                   onClick={() => Detail(bill)}
                                                 >
                                                   <IoDocumentText />
                                                 </h1>
                                               ) : bill.ClaimStatusDesc !== "Approve" ? (
                                                 <h1
                                                   className="text-primary text-2xl"
                                                   onClick={() => Detail2(bill)}
                                                 >
                                                   <IoDocumentText />
                                                 </h1>
                                               ) : (
                                                 <div
                                                   className="tooltip"
                                                   data-tip="ข้อมูลส่งเคลม"
                                                 >
                                                   <h1
                                                     className="text-error text-2xl"
                                                     onClick={() => Detail3OPD(bill)}
                                                   >
                                                     <IoDocumentText />
                                                   </h1>
                                                 </div>
                                               )}
                                             </div>
                                           </>
                                         ) : (
                                           <>
                                             <div
                                               className="tooltip"
                                               data-tip="ข้อมูลส่งเคลม"
                                             >
                                               <h1
                                                 className="text-error text-2xl"
                                                 onClick={() => Detail3OPD(bill)}
                                               >
                                                 <IoDocumentText />
                                               </h1>
                                             </div>
                                           </>
                                         )
                                       ) : (
                                         <>
                                           <div
                                             className="tooltip"
                                             data-tip="ข้อมูลส่งเคลม"
                                           >
                                             <h1
                                               className="text-error text-2xl"
                                               onClick={() => Detail3OPD(bill)}
                                             >
                                               <IoDocumentText />
                                             </h1>
                                           </div>
                                         </>
                                       )
                                     ) : (
                                       ""
                                     )}
         
                                     <div
                                       className="tooltip"
                                       data-tip="ดู เอกสารทั้งหมด"
                                     >
                                       <h1
                                         className="text-primary text-2xl"
                                         onClick={() => DocumentList(bill)}
                                       >
                                         <HiDocumentSearch />
                                       </h1>
                                     </div>
                                   </td>
                                   <td>
                                     {bill.RefId &&
                                     bill.ClaimNo &&
                                     bill.ClaimStatusDesc !== "Cancelled to AIA" &&
                                     bill.ClaimStatusDesc !== "Cancelled" &&
                                     bill.ClaimStatusDesc !== "Reversed" ? (
                                       bill.BatchNumber ? (
                                         ""
                                       ) : bill.ServiceSettingCode === "OPD" ? (
                                         <>
                                           <button
                                             className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                             onClick={() => handleButtonClick(bill)}
                                           >
                                             ส่งเอกสารเพิ่มเติม
                                           </button>
                                         </>
                                       ) : (
                                         <button
                                           className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                           onClick={() => handleButtonClick(bill)}
                                         >
                                           ส่งเอกสารเพิ่มเติม
                                         </button>
                                       )
                                     ) : (
                                       ""
                                     )}
                                     {bill.RefId ? (
                                       bill.ServiceSettingCode === "OPD" ? (
                                         bill.ClaimStatusDesc ===
                                           "waitting for discharge" &&
                                         doMoney === true ? (
                                           <>
                                             <button
                                               className="btn btn-sm btn-warning bg-warning hover:bg-base-100 text-xs px-2 py-1 whitespace-nowrap"
                                               onClick={() => Checkcreditlimit(bill)}
                                             >
                                               ประมาณการค่าใช้จ่าย
                                             </button>
                                           </>
                                         ) : (
                                           ""
                                         )
                                       ) : (
                                         ""
                                       )
                                     ) : (
                                       ""
                                     )}
                                   </td>
                                 </tr>
                               )
                               // )
                             ) 
                         ) : (
                           <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="flex items-center">No data available in table</th>
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
                
          )
          )
          ) : (
            //OPD วันนี้
            <table className="table mt-2 text-xs">
              <thead className="bg-info text-base-100 text-center text-sm">
                <tr>
                  <th>Visit Date</th>
                  <th>Full Name</th>
                  <th>
                    HN <br /> VN
                  </th>
                  {notShowLoc === true ? "" : <th>Location</th>}
                  {/* <th>
                           Policy Number
                  </th> */}
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
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {postData ? postData.Result.TransactionClaimInfo[0].HN ? (
                  datax
                    .filter((bill) => (bill.VisitDate || bill.HN) !== "")
                    .map(
                      (bill, index) => (
                        // (bill.VisitDate || bill.HN) !== "" && (
                        <tr className="hover text-center" key={index}>
                          <td className="whitespace-nowrap">
                            {bill.VisitDate}
                          </td>
                          <td className="whitespace-nowrap">
                            {bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}
                            <br /> ( {bill.ServiceSettingCode} -{" "}
                            {illnessType
                              ? illnessType.Result.map((ill) =>
                                  ill.illnesstypecode ===
                                  bill.IllnessTypeCode ? (
                                    <> {ill.illnesstypedesc} </>
                                  ) : (
                                    ""
                                  )
                                )
                              : ""}{" "}
                            )
                            <br />{bill.PolicyTypeCode === "CS" ? "( ประกันกลุ่ม )" : "( ประกันบุคคล )"}
                          </td>
                          <td className="whitespace-nowrap">
                            {bill.HN ? bill.HN : "-"} <br />{" "}
                            {bill.VN ? bill.VN : "-"}
                          </td>
                          {notShowLoc === true ? (
                            ""
                          ) : (
                            <td className="">{bill.VisitLocation}</td>
                          )}
                           {/* <td className="">
                           {bill.ClaimNo ? bill.ClaimNo : "-"}
                                   </td> */}
                          <td className="whitespace-nowrap">
                            {bill.ClaimNo ? bill.ClaimNo : "-"}
                          </td>
                          <td className="whitespace-nowrap">
                            {bill.InvoiceNumber ? bill.InvoiceNumber : "-"}{" "}
                            <br />
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
                            <div className="grid gap-1 sm:grid-cols-1 w-40 break-all">
                              {bill.ClaimStatusDesc ? (
                                bill.ClaimStatusDesc_EN !== "Cancelled" &&
                                bill.ClaimStatusDesc_EN !==
                                  "Cancelled to AIA" &&
                                bill.ClaimStatusDesc_EN !== "Reversed" &&
                                bill.ClaimStatusDesc_EN !== "Decline" ? (
                                  bill.ClaimStatusDesc_EN === "Approved" ||
                                  bill.ClaimStatusDesc_EN === "Settle" ? (
                                    <button
                                      onClick={() => DoTransaction(bill)}
                                      className="bg-info text-base-100 rounded-full px-3 py-1"
                                    >
                                      {bill.ClaimStatusDesc_TH}
                                    </button>
                                  ) : bill.ClaimStatusDesc_EN === "Approve" ||
                                    bill.ClaimStatusDesc_EN === "Received" ||
                                    bill.ClaimStatusDesc_EN === "Pending" ||
                                    bill.ClaimStatusDesc_EN === "AddDoc" ||
                                    bill.ClaimStatusDesc_EN === "Processing" ? (
                                    bill.ClaimStatusDesc_EN === "Pending" ? (
                                      <button
                                        onClick={() => DoTransaction(bill)}
                                        className="bg-accent text-base-100 rounded-full px-3 py-1"
                                      >
                                        {bill.ClaimStatusDesc_TH}
                                      </button>
                                   ) : bill.ClaimStatusDesc_EN === "Processing" ? (  <button onClick={() => DoTransaction(bill)} className="bg-accent text-base-100 rounded-full px-3 py-1 w-full">{bill.ClaimStatusDesc_TH}</button> ) :(
                                      <button
                                        onClick={() => DoTransaction(bill)}
                                        className="bg-success text-base-100 rounded-full px-3 py-1 "
                                      >
                                        {bill.ClaimStatusDesc_TH}
                                      </button>
                                    )
                                  ) : (
                                    <button
                                      onClick={() => DoTransaction(bill)}
                                      className="bg-warning  rounded-full px-3 py-1 "
                                    >
                                      {bill.ClaimStatusDesc_TH}
                                    </button>
                                  )
                                ) : (
                                  <button
                                    onClick={() => DoTransaction(bill)}
                                    className="bg-error text-base-100 rounded-full px-3 py-1 "
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
                          <th className="whitespace-nowrap">
                            {bill.TotalBillAmount
                              ? parseFloat(bill.TotalBillAmount).toLocaleString(
                                  "en-US",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )
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
                              ? parseFloat(
                                  bill.TotalExcessAmount
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : ""}
                          </th>
                          <td>
                            {bill.RefId ? (
                                       (bill.ClaimStatusDesc !== "Cancelled to AIA" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Cancelled" || bill.ClaimNo !="") &&
                                       (bill.ClaimStatusDesc !== "Reversed"|| bill.ClaimNo !="") &&
                              bill.ClaimStatusDesc !==
                                "waitting for discharge" ? (
                                <>
                                  <div className="tooltip " data-tip="รีเฟรช">
                                    <h1
                                      className="text-success text-2xl"
                                      onClick={() => Refresh(bill)}
                                    >
                                      <LuRefreshCw />
                                    </h1>
                                  </div>
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}

                            {bill.RefId ? (
                              bill.BatchNumber ? (
                                <div
                                  className="tooltip"
                                  data-tip="ข้อมูลส่งเคลม"
                                >
                                  <h1
                                    className="text-error text-2xl"
                                    onClick={() => Detail3OPD(bill)}
                                  >
                                    <IoDocumentText />
                                  </h1>
                                </div>
                              ) : bill.ClaimStatusDesc === "Approve" ||
                                (bill.ClaimStatusDesc === "Processing" &&
                                  bill.ServiceSettingCode !== "PRE") ||
                                bill.ClaimStatusDesc === "Received" ||
                                bill.ClaimStatusDesc ===
                                  "waitting for discharge" ||
                                bill.ClaimStatusDesc === "Pending" ? (
                                bill.IsIPDDischarge === false ||
                                bill.IsIPDDischarge === null ? (
                                  <>
                                    <div
                                      className="tooltip"
                                      data-tip="ข้อมูลส่งเคลม"
                                    >
                                      {bill.ServiceSettingCode === "OPD" ? (
                                        <h1
                                          className="text-primary text-2xl"
                                          onClick={() => Detail(bill)}
                                        >
                                          <IoDocumentText />
                                        </h1>
                                      ) : bill.ClaimStatusDesc !== "Approve" ? (
                                        <h1
                                          className="text-primary text-2xl"
                                          onClick={() => Detail2(bill)}
                                        >
                                          <IoDocumentText />
                                        </h1>
                                      ) : (
                                        <div
                                          className="tooltip"
                                          data-tip="ข้อมูลส่งเคลม"
                                        >
                                          <h1
                                            className="text-error text-2xl"
                                            onClick={() => Detail3OPD(bill)}
                                          >
                                            <IoDocumentText />
                                          </h1>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="tooltip"
                                      data-tip="ข้อมูลส่งเคลม"
                                    >
                                      <h1
                                        className="text-error text-2xl"
                                        onClick={() => Detail3OPD(bill)}
                                      >
                                        <IoDocumentText />
                                      </h1>
                                    </div>
                                  </>
                                )
                              ) : (
                                <>
                                  <div
                                    className="tooltip"
                                    data-tip="ข้อมูลส่งเคลม"
                                  >
                                    <h1
                                      className="text-error text-2xl"
                                      onClick={() => Detail3OPD(bill)}
                                    >
                                      <IoDocumentText />
                                    </h1>
                                  </div>
                                </>
                              )
                            ) : (
                              ""
                            )}

                            <div
                              className="tooltip"
                              data-tip="ดู เอกสารทั้งหมด"
                            >
                              <h1
                                className="text-primary text-2xl"
                                onClick={() => DocumentList(bill)}
                              >
                                <HiDocumentSearch />
                              </h1>
                            </div>
                          </td>
                          <td>
                            {bill.RefId &&
                            bill.ClaimNo &&
                            bill.ClaimStatusDesc !== "Cancelled to AIA" &&
                            bill.ClaimStatusDesc !== "Cancelled" &&
                            bill.ClaimStatusDesc !== "Reversed" ? (
                              bill.BatchNumber ? (
                                ""
                              ) : bill.ServiceSettingCode === "OPD" ? (
                                <>
                                  <button
                                    className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                    onClick={() => handleButtonClick(bill)}
                                  >
                                    ส่งเอกสารเพิ่มเติม
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100 whitespace-nowrap btn-sm text-xs px-2 py-1"
                                  onClick={() => handleButtonClick(bill)}
                                >
                                  ส่งเอกสารเพิ่มเติม
                                </button>
                              )
                            ) : (
                              ""
                            )}
                            {bill.RefId ? (
                              bill.ServiceSettingCode === "OPD" ? (
                                bill.ClaimStatusDesc ===
                                  "waitting for discharge" &&
                                doMoney === true ? (
                                  <>
                                    <button
                                      className="btn btn-sm btn-warning bg-warning hover:bg-base-100 text-xs px-2 py-1 whitespace-nowrap"
                                      onClick={() => Checkcreditlimit(bill)}
                                    >
                                      ประมาณการค่าใช้จ่าย
                                    </button>
                                  </>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      )
                      // )
                    )
                  ) : (
                    <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="flex items-center">No data available in table</th>
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
          )}
          {postData ? postData.Result.TransactionClaimInfo[0].HN &&
(
            <div className="grid gap-1 sm:grid-cols-2 w-full mt-4">
              <div className="flex justify-between text-right">
                <div className="text-right">
                  <h1 className="text-lg">
                    Showing {startIndex + 1} to {endIndex} of{" "}
                    {postData
                      ? postData.Result.TransactionClaimInfo.length
                      : ""}{" "}
                    entries.
                  </h1>
                </div>
              </div>
              <div className="text-right text-base-100 ">
                {currentPage > 1 && (
                  <button
                    onClick={handlePreviousPage}
                    className="btn btn-primary "
                  >
                    <BiFirstPage className="text-base-100 text-xl text-right" />
                  </button>
                )}
                {endIndex < currentData.length && (
                  <button
                    onClick={handleNextPage}
                    className="btn btn-primary ml-2"
                  >
                    <BiLastPage className="text-base-100 text-xl" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          <dialog id="my_modal_3" className="modal text-xl	">
            <div className="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <form onSubmit={submitbilling}>
                <h3 className="font-bold text-lg ">ส่งเอกสารเพิ่มเติม</h3>
                <hr />
                <div className="px-2 rounded-md">
                <div className="flex items-center ">
              <Switch
                checked={selectedIdTypeIsRequestDispute}
                onChange={handleOptionChangeIsRequestDispute}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <p className="text-left ml-2">ส่งโต้แย้งการพิจารณาสินไหม</p>
              </div>
              </div>

                <div className="rounded-md mt-9">
                  <div className="flex items-center ">
                    <input
                      type="file"
                      accept=".pdf"
                      className="file-input file-input-bordered file-input-info w-3/6"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                    <select
                      className="select select-bordered w-2/6 ml-2"
                      onChange={TypeDoc}
                      value={typeDoc}
                      required
                    >
                      <option value="">-กรุณาเลือก-</option>
                        {docType
    ? docType.Result.filter(type => {
        if (selectedIdTypeIsRequestDispute === true) {
          return type.documenttypecode === "014"; // แสดงเฉพาะ REQUESTED_DISPUTE
        } else {
          return type.documenttypecode !== "014"; // ซ่อน REQUESTED_DISPUTE
        }
      }).map((type, index) => (
        <option key={index} value={type.documenttypecode}>
          {type.documenttypename}
        </option>
      ))
    : ""}
                    </select>

                    <div
                      className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 w-1/6 ml-2"
                      onClick={handleUpload}
                    >
                      Upload File
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
                <div className="flex items-center mt-3">
                  <table className="table table-zebra mt-2">
                    <thead>
                      <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                        <th className="w-2/5">ชื่อไฟล์</th>
                        <th className="w-1/5">ประเภทเอกสาร</th>
                        <th className="w-1/5"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {billList ? (
                        billList.map((list, index) => (
                          <tr key={index} className=" bg-neutral  text-sm">
                            <td className="px-6 py-4 text-wrap break-all">
                              {list.filename}
                              <br />
                              {list.originalname}
                            </td>
                            <td className="px-6 py-4 text-wrap break-all">
                              {docType.Result.map((type, index) =>
                                list.documenttypecode ===
                                type.documenttypecode ? (
                                  <h1 key={index}>{type.documenttypename} </h1>
                                ) : (
                                  ""
                                )
                              )}
                            </td>
                            <td className="px-6 py-4 break-all">
                              <div
                                className="btn btn-primary  mr-2 text-base-100 hover:text-primary hover:bg-base-100"
                                type="submit"
                                onClick={() => DocumentBase64(list.filename)}
                              >
                                Document
                              </div>

                              <div
                                className="btn btn-error  mr-2 text-base-100 hover:text-error hover:bg-base-100"
                                type="submit"
                                onClick={() => DeleteDoc(list.filename)}
                              >
                                Delete
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
                  <button className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100">
                    ส่งเอกสาร
                  </button>
                </div>
              </form>
            </div>
          </dialog>

          <dialog id="my_modal_4" className="modal text-xl	">
            <div className="modal-box max-w-4xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
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
                    {/* {console.log(docType)} */}
                    {billList ? (
                      billList.map((list, index) => (
                        <tr key={index} className=" bg-neutral text-sm">
                          <td className="px-6 py-4 break-all">
                            {list.filename}
                            <br />
                            {list.originalname}
                          </td>
                          <td className="px-6 py-4 break-all">
                            {docType.Result.map((type, index) =>
                              list.documenttypecode ===
                              type.documenttypecode ? (
                                <h1 key={index}>{type.documenttypename} </h1>
                              ) : (
                                ""
                              )
                            )}
                          </td>
                          <td className="px-6 py-4 flex items-center">
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
            </div>
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
                      //  RefID : doTransactionData.RefId,
                       HN : doTransactionData.HN,
                       PID : doTransactionData.PID,
                      //  Passport : doTransactionData.PassportNumber,
                       VN : doTransactionData.VN,

                    });
                  }}
                >
                  Copy
                </button>
              </center>
            </div>
          </dialog>

          <Dialog open={showDetailData} onClose={showDetailDataClose}>
            {showDetailData &&
              (detailData.ServiceSettingCode === "OPD" ? (
                <DetailDischargeOPD data={detailData} />
              ) : detailData.ServiceSettingCode === "IPD" ? (
                <DetailDischargeIPD data={detailData} />
              ) : (
                <DetailDischargePRE data={detailData} />
              ))}
          </Dialog>

          <dialog id="DoMoney" className="modal text-xl	">
            <div className="modal-box max-w-7xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg">ประมาณการค่าใช้จ่าย</h3>
              <hr />

              {showFormError === "Error" || totalApprovedAmount === 0 ? (
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
                  <span>
                    {massError}{" "}
                    {totalApprovedAmount === 0
                      ? "ขออภัย มีค่าใช้จ่ายส่วนที่เกินวงเงินคุ้มครอง ที่ลูกค้าต้องชำระเพิ่ม."
                      : ""}
                  </span>
                </div>
              ) : (
                ""
              )}

              <TextField
                error
                id="outlined-error"
                label="ICD10"
                variant="outlined"
                className="w-full mt-4"
                value={iCD10Value}
                onChange={(e) => setICD10Value(e.target.value)}
              />

              <select
                className="select select-bordered w-full mt-2"
                onChange={Over45}
                value={over45}
                required
              >
                <option>
                  สาเหตุของการมารับการรักษาเกิน 45 วัน จากการเกิดอุบัติเหตุ
                </option>
                {over45Days
                  ? over45Days.Result.map((over, index) => (
                      <option key={index} value={over.causeovercode}>
                        - {over.causeoverdesc}
                      </option>
                    ))
                  : ""}
              </select>

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
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {console.log(itemBillingDetails)} */}
                    {itemBillingDetails
                      ? itemBillingDetails.map((cause, index) => (
                          <TableRow key={index} className=" bg-neutral text-sm">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <select
                                className="select select-bordered mt-2 x-3 py-1 border-2 bg-base-100 break-all w-full"
                                // value={`${cause.LocalBillingCode}`}
                                onChange={(e) => handleChangeA1(index, e)}
                              >
                                <option>
                                  {cause.LocalBillingCode} -{" "}
                                  {cause.LocalBillingName}
                                </option>
                                {listBilling
                                  ? listBilling.ItemBillingCheckBalance.map(
                                      (type, index) => (
                                        <option
                                          key={index}
                                          value={JSON.stringify(type)}
                                        >
                                          {type.LocalBillingCode} -{" "}
                                          {type.LocalBillingName}
                                        </option>
                                      )
                                    )
                                  : ""}
                              </select>
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                className="bg-base-100 w-full m-2"
                                value={cause.BillingInitial}
                                onChange={(e) => handleChangeA2(index, e)}
                              />
                            </TableCell>
                            <TableCell>
                              <div
                                onClick={() =>
                                  handleDeleteCauseOfInjuryDetail(index)
                                }
                                className="btn btn-error text-base-100 text-xl"
                              >
                                <FaCircleMinus />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : ""}
                    <TableRow>
                      <TableCell>
                        <FaCirclePlus className="text-xl" />
                      </TableCell>

                      <TableCell>
                        <select
                          className="select select-bordered w-full mt-2"
                          onChange={(e) => {
                            const selectedType = JSON.parse(e.target.value);
                            // console.log(selectedType);
                            setNewItemBillingCheckBalance({
                              ...newItemBillingCheckBalance,
                              LocalBillingCode: selectedType.LocalBillingCode,
                              LocalBillingName: selectedType.LocalBillingName,
                              SimbBillingCode: selectedType.SimbBillingCode,
                            });
                          }}
                          required
                        >
                          <option>- กรุณาเลือก -</option>
                          {listBilling
                            ? listBilling.ItemBillingCheckBalance.map(
                                (type, index) => (
                                  <option
                                    key={index}
                                    value={JSON.stringify(type)}
                                  >
                                    {type.LocalBillingCode} -{" "}
                                    {type.LocalBillingName}
                                  </option>
                                )
                              )
                            : ""}
                        </select>
                      </TableCell>
                      <TableCell>
                        <div className="m-2">
                          <TextField
                            type="text"
                            className="bg-base-100 w-full "
                            value={newItemBillingCheckBalance.BillingInitial}
                            onChange={(e) =>
                              setNewItemBillingCheckBalance({
                                ...newItemBillingCheckBalance,
                                BillingInitial: e.target.value,
                              })
                            }
                            placeholder=""
                          />
                        </div>
                      </TableCell>
                      {newItemBillingCheckBalance.LocalBillingCode ? (
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
                  </TableBody>
                </Table>
                <div className="grid gap-2 sm:grid-cols-6  bg-primary w-full whitespace-normal text-center text-lg">
                  <div className=""></div>
                  <div className="rounded-md"></div>
                  <div className="rounded-md"></div>
                  <div
                    className="px-3 py-1 m-1 w-full btn btn-success text-base-100 hover:text-success hover:bg-base-100"
                    type="submit"
                    onClick={SubmitSumBilling}
                  >
                    ประมาณการค่าใช้จ่าย
                  </div>
                  <div className="rounded-md px-3 py-1 border-2 bg-base-100 break-all m-1">
                    {parseFloat(total).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="rounded-md"></div>
                </div>
                {fromTotalSum && (
                  <div className="grid gap-2 sm:grid-cols-6  bg-primary w-full whitespace-normal text-center text-lg">
                    <div className="rounded-md"></div>
                    <div className="rounded-md"></div>
                    <div className="rounded-md"></div>
                    <div className="rounded-md text-base-100 mt-4">
                      จำนวนเงินที่คุ้มครอง
                    </div>
                    <div className="rounded-md px-3 py-1 border-2 bg-base-100 break-all m-1">
                      {totalApprovedAmount ? (
                        totalApprovedAmount
                      ) : (
                        <CircularProgress
                          size="30px"
                          className="text-error text-lg"
                        />
                      )}
                    </div>
                    <div className="rounded-md"></div>
                    <div className="rounded-md"></div>
                    <div className="rounded-md"></div>
                    <div className="rounded-md"></div>
                    <div className="rounded-md text-base-100 mt-4">
                      ส่วนเกินความคุ้มครอง
                    </div>
                    <div className="rounded-md px-3 py-1 border-2 bg-base-100 break-all m-1">
                      {totalExcessAmount ? (
                        totalExcessAmount
                      ) : (
                        <CircularProgress
                          size="30px"
                          className="text-error text-lg"
                        />
                      )}
                    </div>
                  </div>
                )}
              </TableContainer>

              <div className="modal-action">
                {total !== 0 ? (
                  <div
                    className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100"
                    type="submit"
                    onClick={SubmitBillingCheckBalance}
                  >
                    ส่งประมาณการค่าใช้จ่ายให้ประกัน
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </dialog>

          <dialog id="waitting" className="modal text-xl ">
            <div className="modal-box w-full h-full max-w-7xl items-center">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <h1 className="text-accent text-3xl text-center">
                  รายการจองสิทธิ์ {selectData.ServiceSettingCode}
                </h1>

                <div className="flex items-center justify-center">
                  <div className="grid gap-1 sm:grid-cols-3 w-full  whitespace-normal text-center">
                    <div className="rounded-md"></div>
                    <div className="rounded-md w-full text-center">
                      <div className="mt-2">
                        <div role="tablist" className="tabs-bordered">
                          <input
                            type="radio"
                            name="my_tabs_1"
                            role="tab"
                            className="tab text-xl"
                            aria-label="ไม่เคยจองสิทธิ์มาก่อน"
                            onChange={NotSelectPRE}
                            defaultChecked
                          />

                          <input
                            type="radio"
                            name="my_tabs_1"
                            role="tab"
                            className="tab text-xl"
                            aria-label="รายการที่จองสิทธิ์"
                          />
                          <div role="tabpanel" className="tab-content mt-4">
                            <label className="form-control w-full">
                              <select
                                className="select select-bordered"
                                defaultValue={selectPRETypeValue}
                                onChange={SelectPRE}
                              >
                                <option value="">-กรุณาเลือก-</option>
                                {preAuthTransactionList
                                  ? preAuthTransactionList.Result.InsuranceData.PreAuthTransactionList.map(
                                      (ftc, index) => (
                                        <option
                                          key={index}
                                          value={JSON.stringify(ftc)}
                                        >
                                          เลขกรมธรรม์: {ftc.ClaimNo},
                                          วันที่เข้ารักษา:{" "}
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
                          {listClaimForm ? (
                            <div
                              className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 "
                              onClick={() =>
                                confirmButton(
                                  `${selectData.RefId} | ${selectData.TransactionNo} | ${listClaimForm.ClaimNo} | ${listClaimForm.OccerrenceNo}`
                                )
                              }
                            >
                              ยืนยัน
                            </div>
                          ) : (
                            <div
                              className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100 "
                              onClick={() =>
                                confirmButton(
                                  `${selectData.RefId} | ${selectData.TransactionNo} |  | `
                                )
                              }
                            >
                              ยืนยัน
                            </div>
                          )}
                        </div>
                        {showFormCheckEligibleError === "Error" ? (
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
                            <span>{massError || massFurtherError}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="rounded-md"></div>
                  </div>
                </div>
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
                            {listClaimForm
                              ? listClaimForm.Diagnosis.map(
                                  (Diagnosis, index) => (
                                    <tr className="bg-base-200" key={index}>
                                      <td>{Diagnosis.Icd10}</td>
                                      <td>{Diagnosis.DxName}</td>
                                    </tr>
                                  )
                                )
                              : ""}
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
                            {listClaimForm
                              ? listClaimForm.Procedure.map(
                                  (Procedure, index) => (
                                    <tr className="bg-base-200" key={index}>
                                      <td>{Procedure.Icd9}</td>
                                      <td>{Procedure.ProcedureName}</td>
                                      <td>{Procedure.ProcedureDate}</td>
                                    </tr>
                                  )
                                )
                              : ""}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                    ส่งเอกสารเพิ่มเติมเรียบร้อย
                  </h2>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <dialog id="showFormIsRequestDispute" className="modal text-sm ">
            <div className="modal-box max-w-3xl items-center">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"    onClick={SuccShowFormIsRequestDispute}>
                  ✕
                </button>
                <h1 className="text-accent text-3xl text-center">
                การส่งโต้แย้งการพิจารณาสินไหม
                </h1>
                <hr />
                <h5 className="mt-2">
               1. ส่งแก้ไขรายการค่าใช้จ่ายหลังจาก AIA อนุมัติการเรียกร้องสินไหมแล้ว<br />
               </h5>
               <h2 className="ml-4">- กรณีภายใน 24 ชั่วโมง นับจาก วันส่งเคลม → สามารถส่งโต้แย้ง ผ่านระบบได้ในช่วงเวลา 08.30-19.00น.<br /></h2>
               <h2 className="ml-4">- กรณีเกินกว่า 24 ชั่วโมง แต่ไม่เกิน 7 วัน นับจาก วันส่งเคลม → สามารถส่งโต้แย้ง ผ่านระบบได้ในช่วงเวลา 08.30-19.00น. พร้อมแนบหนังสือชี้แจงเหตุผลที่ขอเปลี่ยนแปลงค่าใช้จ่ายลงนามโดยท่านผู้อำนวยการรพ.<br /></h2>
               <h2 className="ml-4">- กรณีเกิน 7 วัน → AIA ขอไม่รับการพิจารณาแก้ไขรายการค่าใช้จ่าย ขอยืนยันตามผลพิจารณาที่ตอบกลับครั้งแรก หากผู้เอาประกันหรือตัวแทนมีการโต้แย้ง โปรดแจ้งให้ส่งเรียกร้องสินไหมกับทางบริษัทโดยตรง<br /></h2>
               <h5 className="mt-2">  2. รายการที่ต้องการส่งแก้ไขรายการค่าใช้จ่าย จะต้องเป็นสถานะ อนุมัติการเรียกร้องสินไหม (Approve) เท่านั้น และยังไม่ดำเนินการวางบิลเข้ามา<br /> </h5>
               <h5 className="mt-2">  3. เอกสารที่ต้องส่ง upload เข้ามาเมื่อส่งแก้ไขรายการค่าใช้จ่าย<br /></h5>
               <h2 className="ml-4">- ใบตอบกลับการพิจารณาสินไหม (Claim Form C) พร้อมระบุรายละเอียดที่ต้องการแก้ไข<br /></h2>
               <h2 className="ml-4">- ใบแจ้งค่ารักษาพยาบาล Invoice และ Detail Invoice ที่มีการเปลี่ยนแปลง<br /></h2>
               <h3 className="ml-4">- หนังสือชี้แจงเหตุผลที่ขอเปลี่ยนแปลงค่าใช้จ่ายลงนามโดยท่านผู้อำนวยการรพ. (สำหรับกรณีส่งแก้ไขรายการค่าใช้จ่าย เกินกว่า 24 ชั่วโมง แต่ไม่เกิน 7 วัน)</h3>
              <h2 className="text-error mt-6">*** หมายเหตุ ***<br /> </h2>
              <h2 className="ml-4">- วันส่งเคลม = day 0<br /></h2>
              <h2 className="ml-4">- เวลาทำการ 08.30-19.00 น. กรณีส่งนอกเวลาทำการจะพิจารณาในวันถัดไป<br /></h2>
             
                
              </form>
            </div>
          </dialog>

          {showModalRefresh ? (
            <>
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                  <CircularProgress disableShrink className="text-error"/>

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

        </div>

    </>
  );
}
