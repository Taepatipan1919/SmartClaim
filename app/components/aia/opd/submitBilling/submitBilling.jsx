"use client";
import axios from "axios";
import { useState, useEffect, createContext , useRef  , React } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import TextField from '@mui/material/TextField';
 import { save } from "../../../../store/counterSlice";
 import { save2 } from "../../../../store/patientSlice";
// import { save } from "../../../../store/counterSlice";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button ,Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
// import { RefreshIcon, ClipboardIcon, TrashIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaCloudUploadAlt } from "react-icons/fa";
import  DetailDischarge  from "../submitBilling/detailDischarge";




export default function chackData() {
  const InsuranceCode = 13;
  // const  ReDux  = useSelector((state) => ({ ...state }));
  //console.log(ReDux)
  const InsurerCode = 13;
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [massError, setMassError] = useState("");
  const [showFormError, setShowFormError] = useState("");
  const inputRef = useRef(null);
  const [massDocError, setMassDocError] = useState("");
  const [showDocError, setShowDocError] = useState("");
  const [billList, setBillList] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [statusNew, setStatusNew] = useState({});
  const [ file , setFile ] = useState(null);
  const [ progress , setProgress ] = useState({ started: false, pc: 0 });
  const [ msg , setMsg ] = useState(null);
  const [refIdL, setRefIdL] = useState("");
  const [transactionNoL, setTransactionNoL] = useState("");
  const [hNL, setHNL] = useState("");
  const [vNL, setVNL] = useState("");
  const [detailData , setDetailData] = useState("");
  const [base64 , setBase64] = useState("");




const handleUpload = async () => {

  if (!file){
    setMsg("No file selected");
    return;
  }
  setMsg();
  setShowDocError();
  setProgress({ started: false, pc: 0 });

  const formData = new FormData();
  formData.append('file', file);
   formData.append('RefId', refIdL);
   formData.append('TransactionNo', transactionNoL);
   formData.append('HN', hNL);
   formData.append('VN', vNL); 
   formData.append('DocumenttypeCode', "003");
  // console.log(file)
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
    setMsg(<div role="alert" className="alert alert-success">
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
  RefId : refIdL,
  TransactionNo : transactionNoL,
  HN : hNL,
  VN : vNL,
})
.then((response) => {
  setBillList(response.data);
  //console.log(response.data)
})
.catch((err) => {
 // console.error("Error", err)
  console.log(err)
  //  if (err.response.request.status === 500) {
          // setShowFormError("Error");
          // setMassError(err.response.data.HTTPStatus.message);
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

const Refresh = (data) => {
  setShowFormError()
  console.log("-Refresh-")
  const [RefId, TransactionNo , HN , VN] = data.split(' | ');
  console.log({
    RefId : RefId,
    TransactionNo : TransactionNo,
    HN : HN,
    VN : VN,
  })


  axios
  .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-checkclaimstatus/checkclaimstatus",
    {
      "PatientInfo": {
    InsurerCode: InsuranceCode, 
     RefId: RefId,
	TransactionNo: TransactionNo,
    PID: "",
    HN: HN,
    PassportNumber: "",
    IdType:"HOSPITAL_ID",
    VN: VN,
    ClaimNo:""
          }
        }
  )
  .then((response) => {
    console.log(response.data)

    if(response.data.HTTPStatus.statusCode === 200){
      setStatusNew((prevData) => ({
      ...prevData,
      ClaimstatusName : response.data.Result.Data.ClaimstatusName, 
      RefId : response.data.Result.Data.RefId,
      TransactionNo : response.data.Result.Data.transactionNo,
      HN : response.data.Result.Data.HN,     
      VN : response.data.Result.Data.VN,
    }));
  }else{
    setShowFormError("Error");
    setMassError(response.data.HTTPStatus.error);
  }
    
  })
    // setShowModal(true)
    // setTimeout(() => {
    //   setShowModal(false)
    //   //router.push('/aia/opd/submitBilling');
    // }, 5000);
  // })
  .catch((err) => {
   // console.error("Error", err)
    console.log(err)
    //  if (err.response.request.status === 500) {
             setShowFormError("Error");
             setMassError(err.response.data.HTTPStatus.message);
         })  
};

const Detail = (data) => {
  //console.log("-Detail-")
  setShowFormError()
  const [RefId, TransactionNo , HN , VN , GivenNameEN , GivenNameTH , IllnessType , SurnameEN , SurnameTH , TitleEN , TitleTH , VisitDateTime , PID , PassportNumber , SurgeryTypeCode , FurtherClaimNo , FurtherClaimId , DateOfBirth] = data.split(' | ');
  setDetailData({
    InsurerCode : InsurerCode,
    RefId : RefId,
    TransactionNo : TransactionNo,
    HN : HN,
    VN : VN,
    GivenNameEN : GivenNameEN,
    GivenNameTH : GivenNameTH,
    IllnessType : IllnessType,
    SurnameEN : SurnameEN,
    SurnameTH : SurnameTH,
    TitleEN : TitleEN,
    TitleTH : TitleTH,
    VisitDateTime : VisitDateTime,
    PID : PID,
    PassportNumber : PassportNumber,
    SurgeryTypeCode : SurgeryTypeCode,
    FurtherClaimNo : FurtherClaimNo,
    FurtherClaimId : FurtherClaimId,
    DateOfBirth : DateOfBirth,
  })

//   dispatch(save2({
//     value: "มีรายชื่อ2",
//     Data: 
//   {
//     // "IdType": selectedOption,
//     "InsurerCode": InsuranceCode,
//      "DateOfBirth": DateOfBirth,
//     // "Gender": patient.Gender,
//     "GivenNameEN": GivenNameEN,
//     "GivenNameTH": GivenNameTH,
//     "HN": HN,
//     // "MobilePhone": patient.MobilePhone,
//      "PID": PID,
//     "PassportNumber": PassportNumber,
//     "SurnameEN": SurnameEN,
//     "SurnameTH": SurnameTH,
//     "TitleEN": TitleEN,
//     "TitleTH": TitleTH,
//   },
// }));

// dispatch(
//   save({
//     value: "มีข้อมูล2",
//     Data: {
//       RefId: RefId,
//       TransactionNo: TransactionNo,
//       VN: VN,
//       InsurerCode: InsuranceCode,
//       //ServiceSettingCode: statusValue, 
//       IllnessTypeCode: IllnessType,
//       SurgeryTypeCode:  SurgeryTypeCode,
//       //PolicyTypeCode: policyTypeValue,
//       //AccidentDate: accidentDate,
//       VisitDateTime: VisitDateTime,
//       FurtherClaimNo : FurtherClaimNo,
//       FurtherClaimId : FurtherClaimId,
//     },
//   })
// );


  // axios
  // .post(process.env.NEXT_PUBLIC_URL_SV + "v1/utils/detailDocment",
  //   {
  //     "PatientInfo": {
  //   InsurerCode: InsuranceCode, 
  //    RefId: RefId,
	// TransactionNo: TransactionNo,
  //   PID: "",
  //   HN: HN,
  //   PassportNumber: "",
  //   IdType:"HOSPITAL_ID",
  //   VN: VN,
  //   ClaimNo:""
  //         }
  //       }
  // )
  // .then((response) => {
  //   console.log(response.data)
  // })
  // .catch((err) => {
  //   console.log(err)
  //            setShowFormError("Error");
  //            setMassError(err.response.data.HTTPStatus.message);
  //        })  
};

const Cancel = () => {
  // console.log("-Cancel-")
  const isConfirmed = window.confirm('แน่ใจแล้วที่จะยกเลิกการเคลมใช่ไหม');
  if (isConfirmed) {
    console.log('Item deleted');
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

  const handleSubmit =  (event) => {
    //ยังไม่วางบิล
    event.preventDefault();
    setPost();
    let data = {};
    let  dateToValue  = "";
    let dateFromValue = "";


  if(fromValue && toValue){
    dateFromValue = dayjs(fromValue.$d).format('YYYY-MM-DD');
    dateToValue = dayjs(toValue.$d).format('YYYY-MM-DD');

  }

  if(selectedIdType === "PID" && numberValue){
  
    data = {
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        Invoice: "",
        VN: "",
        PID : numberValue,
        PassportNumber : "",
        HN : "",
        DateVisitFrom : dateFromValue,
        ToValue : dateToValue,
      };
}else if (selectedIdType === "Passport" && numberValue){
  
    data = {
      Insurerid: InsuranceCode,
      Status: "09",
      IdType: selectedIdType,
      Invoice: "",
      VN: "",
      PID : "",
      PassportNumber : numberValue,
      HN : "",
      DateVisitFrom : dateFromValue,
      ToValue : dateToValue,
      };
}else if (selectedIdType === "HN" && numberValue){
  
      data = {
        Insurerid: InsuranceCode,
        Status: "09",
        IdType: selectedIdType,
        Invoice: "",
        VN: "",
        PID : "",
        PassportNumber : "",
        HN : numberValue,
        DateVisitFrom : dateFromValue,
        ToValue : dateToValue,
        };
  }else if (selectedIdType === "VN" && numberValue){
  
  data = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    Invoice: "",
    VN: numberValue,
    PID : "",
    PassportNumber : "",
    HN : "",
    DateVisitFrom : dateFromValue,
    ToValue : dateToValue,
    };
}else if (selectedIdType === "Invoice" && numberValue){
  data = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    Invoice: numberValue,
    VN: "",
    PID : "",
    PassportNumber : "",
    HN : "",
    DateVisitFrom : dateFromValue,
    ToValue : dateToValue,
    };
}else if (fromValue && toValue){
  data = {
    PassportNumber : "",
    PID : "",
    HN : "",
      Insurerid: InsuranceCode,
      Status: "09",
      IdType: "",
      VN: "",
      Invoice: "",
      DateVisitFrom : dateFromValue,
      ToValue : dateToValue,
    };

}
if(Object.keys(data).length === 0){
  setShowFormError("Error");
  setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
}else{
  setShowFormError()
console.log(data)

axios
.post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
        //ส่งเป็น statisCode
        data
)
.then((response) => {
  setPost(response.data);
  setShowFormError("");
})
.catch((error) => {
 // console.error("Error", err)
  console.log(error)

          setShowFormError("Error");
          setMassError(error.message);

});

}




}


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const handleSubmit2 = (event) => {
  //วางบิลแล้ว
  event.preventDefault();
  setPost();
  let data = {};
  let  dateToValue  = "";
    let dateFromValue = "";


if(fromValue && toValue){
  dateFromValue = dayjs(fromValue.$d).format('YYYY-MM-DD');
  dateToValue = dayjs(toValue.$d).format('YYYY-MM-DD');

}

if(selectedIdType === "PID" && numberValue){

  data = {
      Insurerid: InsuranceCode,
      Status: "03",
      IdType: selectedIdType,
      Invoice: "",
      VN: "",
      PID : numberValue,
      PassportNumber : "",
      HN : "",
      DateVisitFrom : dateFromValue,
      DateVisitTo : dateToValue,
    };
}else if (selectedIdType === "Passport" && numberValue){

  data = {
    Insurerid: InsuranceCode,
    Status: "03",
    IdType: selectedIdType,
    Invoice: "",
    VN: "",
    PID : "",
    PassportNumber : numberValue,
    HN : "",
    DateVisitFrom : dateFromValue,
    DateVisitTo : dateToValue,
    };
}else if (selectedIdType === "HN" && numberValue){

    data = {
      Insurerid: InsuranceCode,
      Status: "03",
      IdType: selectedIdType,
      Invoice: "",
      VN: "",
      PID : "",
      PassportNumber : "",
      HN : numberValue,
      DateVisitFrom : dateFromValue,
      DateVisitTo : dateToValue,
      };
}else if (selectedIdType === "VN" && numberValue){

data = {
  Insurerid: InsuranceCode,
  Status: "03",
  IdType: selectedIdType,
  Invoice: "",
  VN: numberValue,
  PID : "",
  PassportNumber : "",
  HN : "",
  DateVisitFrom : dateFromValue,
  DateVisitTo : dateToValue,
  };
}else if (selectedIdType === "Invoice" && numberValue){
data = {
  Insurerid: InsuranceCode,
  Status: "03",
  IdType: selectedIdType,
  Invoice: numberValue,
  VN: "",
  PID : "",
  PassportNumber : "",
  HN : "",
  DateVisitFrom : dateFromValue,
  DateVisitTo : dateToValue,
  };
}else if (fromValue && toValue){
data = {
  PID : "",
  HN : "",
    Insurerid: InsuranceCode,
    Status: "03",
    IdType: "",
    VN: "",
    Invoice: "",
    DateVisitFrom : dateFromValue,
    DateVisitTo : dateToValue,
  };

}
if(Object.keys(data).length === 0){
setShowFormError("Error");
setMassError("กรุณากรอก ข้อความที่จะค้นหาให้ครบ");
}else{
setShowFormError()
console.log(data)

axios
.post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-submitbilling/selectbilling",
      //ส่งเป็น statisCode
      data
)
.then((response) => {
setPost(response.data);
setShowFormError("");
})
.catch((error) => {
// console.error("Error", err)
console.log(error)

        setShowFormError("Error");
        setMassError(error.message);

});

}
}
   const submitbilling = (event) => {
    event.preventDefault();
    let filenames = {};
    // document.getElementById("my_modal_3").close()
    filenames = billList.map(Bll => ({ DocName: Bll.filename }));

    axios
      .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-billing-submission/getbilling-submission",{
        InsurerCode: InsuranceCode, 
        RefId: refIdL,
      TransactionNo: transactionNoL,
        PID: "",
        HN: hNL,
        PassportNumber:"",
        IdType:"",
        VN: vNL,
        ClaimNo:"",
        Invoicenumber: "",
        AttachDocList: [
                          filenames,
                        ]
    })
      .then((response) => {
        //console.log(response.data)
        setShowDocError();
        setMassDocError();
        document.getElementById("my_modal_3").close()
        setShowModal(true)
        setTimeout(() => {
          setShowModal(false)
        }, 2000);
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
        //  if (err.response.request.status === 500) {
                 setShowDocError("Error");
                 setMassDocError("Error");
             })  
  }
  const DocumentBase64 = (data) => {
    setMsg();
    setProgress({ started: false, pc: 0 });

    axios
      .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/utils/getDocumentByDocname"
         ,{
        RefId : refIdL,
        TransactionNo : transactionNoL,
        HN : hNL,
        VN : vNL,
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
        //  // console.log(response.data)
        //   const base64String = response.data.base64;

        // const linkSource = `data:application/pdf;base64,${base64String}`;
        //   const pdfWindow = window.open();
        //   pdfWindow.document.write(
        //       `<iframe width='100%' height='99%' src='${linkSource}'></iframe>`
        //   );
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
        //  if (err.response.request.status === 500) {
                 setShowDocError("Error");
                 setMassDocError(err.response.data.HTTPStatus.message);
             })  

  }

   const handleButtonClick = (data) => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setProgress({ started: false, pc: 0 });
    const [RefIdL, TransactionNoL , HNL , VNL] = data.split(' | ');
    setRefIdL(RefIdL)
    setTransactionNoL(TransactionNoL)
    setHNL(HNL)
    setVNL(VNL)
    setMsg(null)
    setBillList();
    axios
      .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/utils/getlistDocumentName",{
        RefId : RefIdL,
        TransactionNo : TransactionNoL,
        HN : HNL,
        VN : VNL,
      })
      .then((response) => {
        setBillList(response.data);
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
        //  if (err.response.request.status === 500) {
                // setShowFormError("Error");
                // setMassError(err.response.data.HTTPStatus.message);
             })  

document.getElementById("my_modal_3").showModal()

   }



   

  return (
    <>
    <div role="tablist" className="tabs tabs-lifted">
      <input type="radio" name="my_tabs_2" role="tab" className="tab text-error" aria-label="รายการที่ยังไม่วางบิล" defaultChecked/>
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-5/5">
    
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
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="Passport"
                        name="identity_type"
                        value="Passport"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Passport&nbsp;</p>
              <input
                        type="radio"
                        id="HN"
                        name="identity_type"
                        value="HN"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN&nbsp;</p>
              <input
                        type="radio"
                        id="VN"
                        name="identity_type"
                        value="VN"
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
                        checked={selectedIdType === 'Invoice'}
                        onChange={handleOptionChange}
                
              />
              <p className="text-left">&nbsp;Invoice &nbsp;</p>
              <p className="ml-6">Visit Date</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="กรอกข้อความ"
          multiline
          maxRows={4}
          variant="standard"
          className="w-96"
          name="number"
          type="text"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
        />
      
     
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-10 w-40"
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
                <button className="btn btn-error text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-error ml-2" type="submit">
                    <FaSearch /> ค้นหา
                  </button>
      
   
       </div>

       </div>

  </form>
  </div>

  <input
    type="radio"
    name="my_tabs_2"
    role="tab"
    className="tab text-success"
    aria-label="รายการที่วางบิลแล้ว"
     />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-5/5">
<form onSubmit={handleSubmit2}>
<div className="grid gap-1 sm:grid-cols-1 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
            <input
                        type="radio"
                        id="PID"
                        name="identity_type"
                        value="PID"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                        type="radio"
                        id="Passport"
                        name="identity_type"
                        value="Passport"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;Passport&nbsp;</p>
              <input
                        type="radio"
                        id="HN"
                        name="identity_type"
                        value="HN"
                        className="checkbox checkbox-info"
                        // defaultChecked
                        onChange={handleOptionChange}
              />
              <p className="text-left">&nbsp;HN&nbsp;</p>
              <input
                        type="radio"
                        id="VN"
                        name="identity_type"
                        value="VN"
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
                        checked={selectedIdType === 'Invoice'}
                        onChange={handleOptionChange}
                
              />
              <p className="text-left">&nbsp;Invoice &nbsp;</p>
              <p className="ml-6">Visit Date</p>
            </div>
            <TextField
          id="standard-multiline-flexible"
          label="กรอกข้อความ"
          multiline
          maxRows={4}
          variant="standard"
          className="w-96"
          name="number"
          type="text"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
        />
      
     
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className="ml-10 w-40"
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
                <button className="btn btn-success text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-success ml-2" type="submit">
                    <FaSearch /> ค้นหา
                  </button>
      
   
       </div>

       </div>

  </form>
  </div>
  </div>




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
            ) : ""
            }

          
 <table className="table mt-2">
    <thead className="bg-info text-base-100 text-center text-lg ">
      <tr>
        <th></th>
        <th>Visit Date</th>
        <th>Full Name</th>
        <th>VN</th>
        <th>ClaimNo</th>
        <th>Invoicenumber</th>
        <th>Status</th>
        <th>ยอดเงิน</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {post ? post.HTTPStatus.statusCode === 200 ? 
    (post.Result.Data.map((bill, index) => (
<tr className="hover text-center" key={index}>
   <th>{index+1}
   </th>
   <td>{bill.VisitDateTime}</td>
      <td>{bill.TitleTH} {bill.GivenNameTH} {bill.SurnameTH}</td>
      <td>{bill.VN}</td>
      <td>{bill.ClaimNo}</td>
      <td>{bill.invoicenumber}</td>
        <td ><a className="bg-success text-base-100 rounded-full px-3 py-2">{statusNew ? (bill.RefId === statusNew.RefId ? (statusNew.ClaimstatusName) : bill.ClaimstatusName) : "Loading..."}</a></td>
        <th>{bill.TotalAmount}</th>
        <td>
    <div className="tooltip" data-tip="Refresh">
        <h1 className="text-primary text-2xl" onClick={() => Refresh(`${bill.RefId} | ${bill.TransactionNo} | ${bill.HN} | ${bill.VN}`)}><LuRefreshCw /></h1>
    </div>
    <div className="tooltip ml-4" data-tip="Detail">
        <h1 className="text-primary text-2xl" onClick={() => Detail(`${bill.RefId} | ${bill.TransactionNo} | ${bill.HN} | ${bill.VN} | ${bill.GivenNameEN} | ${bill.GivenNameTH} | ${bill.IllnessType} | ${bill.SurnameEN} | ${bill.SurnameTH} | ${bill.TitleEN} | ${bill.TitleTH} | ${bill.VisitDateTime} | ${bill.PID} | ${bill.PassportNumber} | ${bill.SurgeryTypeCode} | ${bill.FurtherClaimNo} | ${bill.FurtherClaimId} | ${bill.DateOfBirth}`)}><IoDocumentText /></h1>
    </div>
    <div className="tooltip ml-4" data-tip="Cancel Claim">
        <h1 className="text-primary text-2xl" onClick={() =>Cancel(`${bill.RefId} | ${bill.TransactionNo} | ${bill.HN} | ${bill.VN}`)}><MdCancel /></h1>
    </div>

   
</td>
<td>
    <button className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100"
        onClick={() => handleButtonClick(`${bill.RefId} | ${bill.TransactionNo} | ${bill.HN} | ${bill.VN}`)}
        >วางบิล</button>
    </td>
       
      </tr>

   ) 
  )): (

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
  
    ): (
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
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>

                                <h3 className="font-bold text-lg">
                                  ส่งเอกสาร วางบิล
                                </h3>
                                <hr />
                                {/* <div className="flex items-center mt-3">
                                <TextField
                                className="w-full"
                                color="primary"
          id="outlined-multiline-static"
          label="หมายเหตุ"
          name="textmass"
          multiline
          rows={6}
        />
              </div> */}
          <div className="grid gap-2 w-full mt-2">
            <div className="px-2 rounded-md">
              <div className="flex items-center ">
                            <input type="file" accept=".pdf" className="file-input file-input-bordered file-input-info w-5/6" onChange={ (e) => { setFile(e.target.files[0]) } } ref={inputRef}/> 
                            <div className="btn btn-success text-base-100 hover:text-success hover:bg-base-100 w-1/6 ml-2" onClick={ handleUpload }>
                                <FaCloudUploadAlt className="size-6"/>
                            </div>
              </div>
            </div>
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




                              <div className="flex items-center mt-3">
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
                        </tr>
                      )} 
                  </tbody>
              </table>
            
                              </div>
                                <div className="modal-action">
                                    <div className="btn btn-primary text-base-100 hover:text-primary hover:bg-base-100"
                                  onClick={submitbilling}
                                    >
                                      ส่งบิล
                                    </div>
                                </div>
                              </form>
                            </div>
                          </dialog>



{detailData ? <DetailDischarge data={detailData}/>: ""}

</div>
</div>






{showModal ? (
  <>
          {/* <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">ส่งเคลมเรียบร้อย</h2>
               
            </div>
        </div> */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-primary">วางบิลเรียบร้อยแล้ว</h2>
          </div>
        </div>
  </>
) : ""}

    </>
  );
}
