"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import TextField from '@mui/material/TextField';
 import { save } from "../../../../store/counterSlice";
 import { save2 } from "../../../../store/patientSlice";
import { useSelector , useDispatch } from "react-ReDux";
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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function chackData() {
  const InsuranceCode = 13;
const  ReDux  = useSelector((state) => ({ ...state }));
 // console.log(ReDux)
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
  const [statusNew, setStatusNew] = useState({});
  const [ file , setFile ] = useState(null);
  const [ progress , setProgress ] = useState({ started: false, pc: 0 });
  const [ msg , setMsg ] = useState(null);
  const [refIdL, setRefIdL] = useState("");
  const [transactionNoL, setTransactionNoL] = useState("");
  const [hNL, setHNL] = useState("");
  const [vNL, setVNL] = useState("");
  const [detailData , setDetailData] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [claimStatus, setClaimStatus] = useState("");

  useEffect(() => {
    const getClaimStatus = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_SV + "v1/utils/claimStatus/"
      );

      const data = await response.json();
      setClaimStatus(data);
    };
    getClaimStatus();
  }, []);
  const Status = (event) => {
    setStatusValue(event.target.value);
  }


const handleUpload = async () => {
  if (!file){
    setMsg("No file selected");
    return;
  }
  setMsg();
  setProgress({ started: false, pc: 0 });
  const formData = new FormData();
  formData.append('file', file);
  formData.append('VN', 'O477382-67'); 
   formData.append('RefId', 'oljhnklefhbilubsEFJKLb651');
   formData.append('TransactionNo', '70816a0d-107a-4772-9838-4578e874a172');
   formData.append('HN', '66-021995');
   formData.append('DocumentName', file.name);
  // console.log(file)
setMsg(<span className="loading loading-spinner text-info loading-lg"></span>);
setProgress(prevState => {
  return { ...prevState, started: true }
})
try{
  const response = await axios.post(process.env.NEXT_PUBLIC_URL_PD +  "v1/utils/uploadDocuments", formData, {
      onUploadProgress: (progressEvent) => {  setProgress(prevState => {
        return { ...prevState, pc: progressEvent.progress*100 }
      })},
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
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
  Upload Successful</div>)
// console.log("server response",response.data)
axios
.post(process.env.NEXT_PUBLIC_URL_PD + "v1/utils/getlistDocumentName",{
  RefId : RefIdL,
  TransactionNo : TransactionNoL,
  HN : HNL,
  VN : VNL,
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
    </svg>{error.message}</div>)
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
  .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-checkclaimstatus/checkclaimstatus",
    {
      "PatientInfo": {
    InsurerCode: InsuranceCode, 
     RefId: RefId,
	TransactionNo: TransactionNo,
    PID: ReDux.Patient.Data.PID,
    HN: HN,
    PassportNumber: ReDux.Patient.Data.PassportNumber,
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
    event.preventDefault();
    setPost();
    let data = {};
    let  dateToValue  = "";
    let dateFromValue = "";


  if(fromValue && toValue){
    dateFromValue = dayjs(fromValue.$d).format('YYYY-MM-DD');
    dateToValue = dayjs(toValue.$d).format('YYYY-MM-DD');

  }

  if (selectedIdType === "VN" && numberValue){
  
  data = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    Invoice: "",
    VN: numberValue,
    PID : ReDux.Patient.Data.PID,
    PassportNumber : ReDux.Patient.Data.PassportNumber,
    HN : ReDux.Patient.Data.HN,
    DateVisitFrom : dateFromValue,
    ToValue : dateToValue,
    Claimstatuscode : statusValue,
    };
}else if (selectedIdType === "Invoice" && numberValue){
  data = {
    Insurerid: InsuranceCode,
    Status: "09",
    IdType: selectedIdType,
    Invoice: numberValue,
    VN: "",
    PID : ReDux.Patient.Data.PID,
    PassportNumber : ReDux.Patient.Data.PassportNumber,
    HN : ReDux.Patient.Data.HN,
    DateVisitFrom : dateFromValue,
    ToValue : dateToValue,
    Claimstatuscode : statusValue,
    };
}else if (fromValue && toValue){
  data = {
      PID : ReDux.Patient.Data.PID,
      PassportNumber : ReDux.Patient.Data.PassportNumber,
      HN : ReDux.Patient.Data.HN,
      Insurerid: InsuranceCode,
      Status: "09",
      IdType: "",
      VN: "",
      Invoice: "",
      DateVisitFrom : dateFromValue,
      ToValue : dateToValue,
      Claimstatuscode : statusValue,
    };

}else if (statusValue){
  data = {
    PID : "",
    HN : "",
      Insurerid: "",
      IdType: "",
      VN: "",
      Invoice: "",
      DateVisitFrom : dateFromValue,
      DateVisitTo : dateToValue,
      Claimstatuscode : statusValue,
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
   

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="grid gap-1 sm:grid-cols-1 w-full">
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
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
              <p className="ml-64">Visit Date</p>
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
        <InputLabel id="demo-simple-select-label">Claim Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusValue}
          label="Claim Status"
          onChange={Status}
        >
          {claimStatus
                ? claimStatus.map((status, index) => (
                    <MenuItem key={index} value={status.StatusCode}>{status.StatusDescTH}</MenuItem>
                  ))
                : ""}

        </Select>
      </FormControl>
                <button className="btn btn-error text-base-100 text-lg rounded-full px-3 py-2 hover:bg-base-100 hover:text-error ml-2" type="submit">
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
    {statusNew ?
    (bill.RefId ? (bill.ClaimstatusName === "ได้รับเอกสารแล้ว" ? (
      
    <div className="tooltip ml-4" data-tip="Cancel Claim">
    <h1 className="text-primary text-2xl" onClick={() =>Cancel(`${bill.RefId} | ${bill.TransactionNo} | ${bill.HN} | ${bill.VN}`)}><MdCancel /></h1>
</div>
    ): "" )
      : "Loading...")
: ""}
   
</td>
<td>
    {/* <button className="btn btn-primary bg-primary text-base-100 hover:text-primary hover:bg-base-100"
        onClick={() => handleButtonClick(`${bill.RefId} | ${bill.TransactionNo} | ${bill.HN} | ${bill.VN}`)}
        >วางบิล</button> */}
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



{detailData ? <DetailDischarge data={detailData}/>: ""}

</div>
</div>


    </>
  );
}
