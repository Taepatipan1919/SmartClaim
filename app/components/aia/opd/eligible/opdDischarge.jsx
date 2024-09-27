"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box , TextField } from '@mui/material';
import { ImBin } from "react-icons/im";
import { IoIosDocument } from "react-icons/io";
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function Page({data}) {
  //console.log(data)
  const InsuranceCode = 13;
  const [patien, setPatien] = useState();
  const [visit, setVisit] = useState();
  const [accidentDetail, setAccidentDetail] = useState();
  const [accidentPlaceValue, setAccidentPlaceValue] = useState("");
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
    AccidentDate: "",
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
 // console.log(PatientInfo)
  useEffect(() => {
        axios
      .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/getOPDDischargePatient",{
        PatientInfo
      })
      .then((response) => {
        setPatien(response.data);
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
  });
  }, []);

//   useEffect(() => {
//     axios
//   .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-retrieve-further-claim-list/getRetrieveFurtherClaim",{
//     PatientInfo
//   })
//   .then((response) => {
//     //console.log(response.data);
//   })
//   .catch((err) => {
//    // console.error("Error", err)
//     console.log(err)
// });
// }, []);

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/getOPDDischargeVisit",{
      PatientInfo
    })
    .then((response) => {
      setVisit(response.data);

    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });

  }, []);
  const combinedString = visit?.Result?.VisitInfo
    ? `${visit.Result.VisitInfo.Weight} / ${visit.Result.VisitInfo.Height}`
    : '';

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/getOPDDischargeAccidentDetail",{
      PatientInfo
    })
    .then((response) => {
      //  console.log(response.data.Result.AccidentDetail.AccidentDate)
      setAccidentDetail(response.data);
      const dateValue = dayjs(response.data.Result.AccidentDetailInfo.AccidentDate);
    
      setValue(dateValue);

    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });

  }, []);

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/utils/accidentPlace/" + InsuranceCode,{
      PatientInfo
    })
    .then((response) => {
      setDataaccidentPlace(response.data);

    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });

  }, []);
  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/utils/injurySide/" + InsuranceCode,{
      PatientInfo
    })
    .then((response) => {
      setDatainjurySide(response.data);

    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });

  }, []);

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/utils/InjuryWoundtype/" + InsuranceCode,{
      PatientInfo
    })
    .then((response) => {
      setDataWoundType(response.data);


    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });

  }, []);

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-opddischarge/getOPDDischargeVitalSign",{
      PatientInfo
    })
    .then((response) => {
      setVitalsign(response.data);

    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });
  }, []);

  useEffect(() => {
    axios
    .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-opddischarge/getOPDDischargeDoctor",{
      PatientInfo
    })
    .then((response) => {
      setDoctor(response.data);

    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });
  }, []);


  useEffect(() => {
    axios
     .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-opddischarge/getOPDDischargeDiagnosis",{
        PatientInfo
      })
      .then((response) => {
        setDiagnosis(response.data);
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
  });
}, []);
  useEffect(() => {
    axios
      .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-opddischarge/getOPDDischargeProcedure",{
        PatientInfo
      })
      .then((response) => {
        setProcedure(response.data);
      })
      .catch((err) => {
       // console.error("Error", err)
        console.log(err)
  });
}, []);
useEffect(() => {
  axios
    .post(process.env.NEXT_PUBLIC_URL_PD2 + "v1/aia-opddischarge/getOPDDischargeInvestigation",{
      PatientInfo
    })
    .then((response) => {
      setInvestigation(response.data);
    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
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
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
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
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
});
}, []);




// กดปุ่มส่งเคลม
  const Claim = (event) => {
    event.preventDefault();


    const Datevalue = dayjs(value.$d).format('YYYY-MM-DD');

if(PatientInfo.IllnessTypeCode === "ACC" || PatientInfo.IllnessTypeCode === "ER"){
  const datasave = {
    DataJson: {
      InsurerCode: PatientInfo.InsurerCode,
      DxFreeText : event.target.DxFreeTextText.value,
      AccidentDate : Datevalue,
      AccidentPlace : accidentPlaceValue,
      PresentIllness :  event.target.PresentIllnessText.value,

      InjurySide : injurySide,
      WoundType : woundType,
      CommentOfInjury : event.target.commentOfInjuryText.value,
      FurtherClaimId : PatientInfo.FurtherClaimId,
      FurtherClaimNo : PatientInfo.FurtherClaimNo,
    },
  };
  console.log(datasave)
}else{
  const datasave = {
    DataJson: {
      InsurerCode: PatientInfo.InsurerCode,
      DxFreeText : event.target.DxFreeTextText.value,
      AccidentDate : Datevalue,
      AccidentPlaceCode : accidentPlaceValue,
      PresentIllness :  event.target.PresentIllnessText.value,

      AccidentInjurySideCode : injurySide,
      AccidentInjuryWoundtypeCode : woundType,
      FurtherClaimId : PatientInfo.FurtherClaimId,
      FurtherClaimNo : PatientInfo.FurtherClaimNo,
      CommentOfInjury : "",

    },

  };
  console.log(datasave)
}
 
  //console.log(data)
    setShowModal(true)


    setTimeout(() => {
      setShowModal(false)
      router.push('/aia/opd/checkClaimStatus');
    }, 5000);

  };


  const savefile = (event) => {
    event.preventDefault();
    
    const File = {
      InsurerCode: PatientInfo.InsurerCode,
      // Namefile: event.target.file.value,
    };20
    console.log(File);

  }




  return (
    <>
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
                  {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black"    label="FirstName (TH)" variant="standard" value={patien.Result.PatientInfo.FirstName} /> */}
                  <TextField disabled id="outlined-disabled" label="FirstName (TH)" defaultValue={patien.Result.PatientInfo.FirstName} className="w-full text-black border border-black rounded disabled:text-black" InputProps={{style: { color: 'black' } }}/>
        </Box>
                </div>
                <div className="rounded-md">
         <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                  {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="LastName (TH)" variant="standard" value={patien.Result.PatientInfo.LastName} /> */}
                  <TextField disabled id="outlined-disabled" label="LastName (TH)" defaultValue={patien.Result.PatientInfo.LastName} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="PID" variant="standard" value={PatientInfo.PID} /> */}
                <TextField disabled id="outlined-disabled" label="PID" defaultValue={PatientInfo.PID} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                </div>
              {PatientInfo.PassportNumber ? (
                  <div className="rounded-md">
               <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                    {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="Passport" variant="standard" value={PatientInfo.PassportNumber} /> */}
                    <TextField disabled id="outlined-disabled" label="Passport" defaultValue={PatientInfo.PassportNumber} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                  </div>
                ) : ""} 
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic"  className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="Date of Birth (YYYY-MM-DD)" variant="standard" value={patien.Result.PatientInfo.DOB} /> */}
                <TextField disabled id="outlined-disabled" label="Date of Birth (YYYY-MM-DD)" defaultValue={patien.Result.PatientInfo.DOB} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="HN" variant="standard" value={PatientInfo.HN} /> */}
                <TextField disabled id="outlined-disabled" label="HN" defaultValue={PatientInfo.HN} className="w-full  text-black border border-black rounded disabled:text-black"/>
           </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" disabled className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="Sex" variant="standard" value={patien.Result.PatientInfo.Gender} /> */}
                <TextField disabled id="outlined-disabled" label="Sex" defaultValue={patien.Result.PatientInfo.Gender} className="w-full  text-black border border-black rounded disabled:text-black"/>
           </Box>
                </div>
              </div>
            </div>
            ) : ""}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {visit ? (
             <div className="container mx-auto p-4 justify-center border-solid w-4/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">
              Visit
              </h1>
              <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
                <div className="rounded-md">
              <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="VN" variant="standard" value={visit.Result.VisitInfo.VN} /> */}
                <TextField disabled id="outlined-disabled" label="VN"  className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" defaultValue={visit.Result.VisitInfo.VN} />
           </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="VisitDateTime" variant="standard" value={visit.Result.VisitInfo.VisitDateTime} /> */}
                <TextField disabled id="outlined-disabled"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="VisitDateTime" defaultValue={visit.Result.VisitInfo.VisitDateTime} />
                </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="อาการสำคัญที่มาโรงพยาบาล" variant="standard" value={visit.Result.VisitInfo.ChiefComplaint} /> */}
                <TextField disabled id="outlined-disabled"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="อาการสำคัญที่มาโรงพยาบาล" defaultValue={visit.Result.VisitInfo.ChiefComplaint} />
                </Box>
                </div>
                <div className="rounded-md text-black">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black w-1/2" label="ส่วนสูง" variant="standard" value={visit.Result.VisitInfo.Height} />
                <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black w-1/2" label="น้ำหนัก" variant="standard" value={visit.Result.VisitInfo.Weight} /> */}
                <TextField disabled id="outlined-disabled"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="น้ำหนัก / ส่วนสูง" defaultValue={combinedString} />
                </Box>
                </div>
                {PatientInfo.FurtherClaimNo ? (
                <div className="rounded-md text-black">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                <TextField disabled id="outlined-disabled"   className="w-full text-black rounded disabled:text-black disabled:bg-gray-300" label="ประวัติการรักษาครั้งก่อนหน้า เลขที่อ้างอิง" defaultValue={PatientInfo.FurtherClaimNo} />
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
                {/* <div className="rounded-md">
             
                </div>
                <div className="rounded-md">
                </div>
                <div className="rounded-md">
                </div> */}
               
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
                    <MenuItem key={index} value={inj.DescEN}>{inj.DescTH} - {inj.DescEN}</MenuItem>
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
              </div>
            </div> 
            ) : ""  ) : ""}
              {/* //////////////////////////////////////////////////////////////////////////// */}
              <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
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
              <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
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
                           <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
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
             {PatientInfo.SurgeryTypeCode === "Y" ? (
               <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Procedure</h1>
              <div className="overflow-x-auto">
  <table className="table table-zebra mt-2">
                <thead>
                  <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                    <th></th>
                    <th className="">วันที่ทำหัตถการหรือทำการผ่าตัด</th>
                    <th>ชื่อของหัตถการหรือการผ่าตัด</th>
                    <th>ICD 9 code ของหัตถการหรือการผ่าตัด</th>
                  </tr>
                </thead>
                <tbody>
                  {procedure
                      ? procedure.Result.ProcedureInfo.map((pcr, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td>{pcr.ProcedureDate ? index + 1 : ""}</td>
                            <td>{pcr.ProcedureDate}</td>
                            <td>
                              {pcr.ProcedureName}
                            </td>
                            <td>
                              {pcr.Icd9}
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
            ) : ""}
                    {/* //////////////////////////////////////////////////////////////////////////// */}
                     <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
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
                  {investigation
                      ? investigation.Result.InvestigationInfo.map((inves, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td>{inves.InvestigationCode ? index + 1 : ""}</td>
                            <td>{inves.InvestigationCode}</td>
                            <td>
                              {inves.InvestigationGroup}
                            </td>
                            <td>
                              {inves.InvestigationName}
                            </td>
                            <td>
                              {inves.InvestigationResult}
                            </td>
                            <td>
                              {inves.ResultDateTime}
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
 <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
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
                <tbody class="bg-white divide-y divide-gray-200">
                  {orderItemz
                      ? orderItemz.Result.OrderItemInfo.map((order, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td class="px-6 py-4 whitespace-nowrap">{order.ItemId ? index + 1 : ""}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{order.ItemId}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {order.ItemName}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {order.LocalBillingCode}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {order.LocalBillingName}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {order.ItemAmount}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {order.Initial}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {order.Discount}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
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
                  <tbody class="bg-white divide-y divide-gray-200">
                    {billing
                      ? billing.Result.BillingInfo.map((bill, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td class="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode ? index + 1 : ""}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.LocalBillingName}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.BillingInitial}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.BillingDiscount}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.BillingNetAmount}</td>
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
                            <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
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
                  <tbody class="bg-white divide-y divide-gray-200">
                    {billing
                      ? billing.Result.BillingInfo.map((bill, index) => (
                          <tr
                            key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td class="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode ? index + 1 : ""}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.SimbBillingCode}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.LocalBillingName}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.BillingInitial}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.BillingDiscount}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{bill.BillingNetAmount}</td>
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
        <div className="container mx-auto p-4 justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Upload File</h1>
          <div className="overflow-x-auto mt-6">
            <form>
          <FormControl className="w-80 ">
        <InputLabel id="demo-error-select-label">Type file</InputLabel>
        <Select
        error
        
          labelId="demo-error-select-label"
          id="demo-error-select"
          value={injurySide}
          label="Type file"
          onChange={InjurySide}
        >
          {dataaccidentPlace
                ? dataaccidentPlace.map((acc, index) => (
                    <MenuItem key={index} value={acc.Code}>{acc.Desc}</MenuItem>
                  ))
                : ""}
        </Select>
      </FormControl>
          <input type="file" name="file" className="file-input file-input-bordered file-input-info w-full max-w-xs ml-2" />
          <button
                  className="btn btn-success text-base-100 hover:bg-base-100 hover:text-success ml-2"
                  type="submit"
                  onClick={savefile}
                >
                  Upload
                </button>
                </form>
              <table className="table table-zebra mt-2">
                <thead >
                  <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th className="w-1/5"></th>
                      <th className="w-1/5">Type File</th>
                      <th className="w-2/5">ชื่อไฟล์</th>
                      <th className="w-1/5"></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {/* {billing
                      ? billing.Result.BillingInfo.map((bill, index) => ( */}
                          <tr
                            // key={index}
                            className=" bg-neutral text-sm"
                          >
                            <td class="px-6 py-4 whitespace-nowrap">1</td>
                            <td class="px-6 py-4 whitespace-nowrap">บัตรประชาชน</td>
                            <td class="px-6 py-4 whitespace-nowrap">123456789ำกไดำๆ21กๆ.pdf</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                            <button className="btn btn-secondary text-base-100 hover:bg-base-100 hover:text-secondary  mr-2" type="submit"><IoIosDocument /></button>
                            <button className="btn btn-error text-base-100 hover:bg-base-100 hover:text-error" type="submit"><ImBin /></button>
                            </td>
                          </tr>
                        {/* ))
                      : ""} */}
                  </tbody>
              </table>
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">&nbsp;</div> 
            </div> 
              
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
