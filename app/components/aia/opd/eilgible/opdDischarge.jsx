"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function Page({data}) {
  //console.log(data)
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
  // const [diagnosis, setDiagnosis] = useState();
  // const [billing, setBilling] = useState();
  // const [orderitem, setOrderItem] = useState();
  const [result, setResult] = useState("");

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
        "InsurerCode": data.DataTran.Data.InsurerCode, 
        "RefId": data.DataTran.Data.RefId,
        "TransactionNo": data.DataTran.Data.TransactionNo,
        "PID": data.Patient.Data.PID,
        "HN": data.Patient.Data.HN,
        "PassportNumber": data.Patient.Data.PassportNumber,
        "IdType": data.Patient.Data.IdType,
        "VN": data.DataTran.Data.VN,
        "PolicyTypeCode": data.DataTran.Data.PolicyTypeCode,
        "ServiceSettingCode": data.DataTran.Data.ServiceSettingCode, 
        "IllnessTypeCode": data.DataTran.Data.IllnessTypeCode,
        "SurgeryTypeCode":  data.DataTran.Data.SurgeryTypeCode,
        "AccidentDate": data.DataTran.Data.AccidentDate,
}
  useEffect(() => {
        axios
      .get(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/patient",{
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

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/visit",{
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

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/accidentDetail",{
      PatientInfo
    })
    .then((response) => {
      setAccidentDetail(response.data);

    })
    .catch((err) => {
     // console.error("Error", err)
      console.log(err)
    });

  }, []);

  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/accidentDetail/dataaccidentPlace",{
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
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/accidentDetail/injurySide",{
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
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/accidentDetail/woundType",{
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
    .get(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/vitalsign",{
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


//   useEffect(() => {
//     axios
//       .post(process.env.NEXT_PUBLIC_URL_SV + "v1/aia-opddischarge/diagnosis",{
//         PatientInfo
//       })
//       .then((response) => {
//         setDiagnosis(response.data);
//       })
//       .catch((err) => {
//        // console.error("Error", err)
//         console.log(err)
//   });

//     // const getDiagnosis = async () => {
//     //   const response = await fetch(
//     //     `http://localhost:3000/api/v1/aia-opddischarge/diagnosis`
//     //   );
//     //   const data = await response.json();
//     //   setDiagnosis(data);
//     // };
//     // getDiagnosis();
//   }, []);
// console.log(diagnosis)






  // useEffect(() => {
  //   const getBilling = async () => {
  //     const response = await fetch(
  //       `http://localhost:3000/api/v1/aia-opddischarge/billing`
  //     );
  //     const data = await response.json();
  //     setBilling(data);
  //   };
  //   getBilling();
  // }, []);

  // useEffect(() => {
  //   const getOrderItem = async () => {
  //     const response = await fetch(
  //       `http://localhost:3000/api/v1/aia-opddischarge/orderitem`
  //     );
  //     const data = await response.json();
  //     setOrderItem(data);
  //   };
  //   getOrderItem();
  // }, []);

  //console.log(diagnosis);
  //console.log(visit);
  //console.log(diagnosis);
  //console.log("Test", process.env.Test);
  //console.log(billing)

  const Claim = (event) => {
    event.preventDefault();
    const data = {
      DataJson: {
        Name: patien.PatientInfo.FirstName,
      },
    };
    fetch(`http://localhost:3000/api/v1/aia-opddischarge/checkClaimStatus/`, {
      method: "POST",
      headers: {
        "Context-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setResult(result);

        console.log(result);
      });
  };

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
              <div className="grid gap-2 sm:grid-cols-4 w-full">
                <div className="rounded-md">
                  <TextField id="standard-basic" label="FirstName (TH)" variant="standard" value={patien.Result.Patient.FirstName} />
                </div>
                <div className="rounded-md">
                  <TextField id="standard-basic" label="LastName (TH)" variant="standard" value={patien.Result.Patient.LastName} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="PID" variant="standard" value={PatientInfo.PID} />
                </div>
              {PatientInfo.PassportNumber ? (
                  <div className="rounded-md">
                    <TextField id="standard-basic" label="Passport" variant="standard" value={PatientInfo.PassportNumber} />
                  </div>
                ) : ""} 
                <div className="rounded-md">
                <TextField id="standard-basic" label="Date of Birth (YYYY-MM-DD)" variant="standard" value={patien.Result.Patient.DOB} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="HN" variant="standard" value={PatientInfo.HN} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="Sex" variant="standard" value={patien.Result.Patient.Gender} />
                </div>
              </div>
            </div>
            ) : ""}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {visit ? (
            <div className="justify-center border-solid w-4/5 m-auto border-2 border-warning rounded-lg p-4">
              <h1 className="font-black text-accent text-3xl ">
              Visit
              </h1>
              <div className="grid gap-2 sm:grid-cols-4 w-full">
                <div className="rounded-md">
                <TextField id="standard-basic" label="VN" variant="standard" value={visit.Result.Visit.VN} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="VisitDateTime" variant="standard" value={visit.Result.Visit.VisitDateTime} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="อาการสำคัญที่มาโรงพยาบาล" variant="standard" value={visit.Result.Visit.ChiefComplaint} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="ข้อวินิจฉัยโรค" variant="standard" value={visit.Result.Visit.DxFreeText} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="ส่วนสูง" variant="standard" value={visit.Result.Visit.Height} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="น้ำหนัก" variant="standard" value={visit.Result.Visit.Weight} />
                </div>
              </div>
            </div> 
            ) : ""}
              {/* //////////////////////////////////////////////////////////////////////////// */}
              {PatientInfo.IllnessTypeCode === "ACC" || PatientInfo.IllnessTypeCode === "ER" ? (accidentDetail ? (
              <div className="justify-center border-solid w-4/5 m-auto border-2 border-error rounded-lg p-4">
              <h1 className="font-black text-accent text-3xl ">
              AccidentDetail
              </h1>
              <div className="flex  w-full mt-4">
                <div className="w-1/5">
                <TextField error id="standard-error-helper-text" label="วันที่เกิดอุบัติเหตุ" variant="standard" value={accidentDetail.Result.AccidentDetail.AccidentDate} />
                </div>
                <div className="w-2/5">
                <FormControl fullWidth>
        <InputLabel id="demo-error-select-label">สถานที่เกิดอุบัติเหตุ</InputLabel>
        <Select
        error
        className="mx-2"
          labelId="demo-error-select-label"
          id="demo-error-select"
          value={injurySide}
          label=""
          onChange={InjurySide}
        >
          {dataaccidentPlace
                ? dataaccidentPlace.Result.map((acc, index) => (
                    <MenuItem key={index} value={acc.Code}>{acc.Desc}</MenuItem>
                  ))
                : ""}
        </Select>
      </FormControl>
                </div>
              <div className="w-2/5">
          {/* <TextField error id="standard-error-helper-text" className="w-full" label="" variant="standard" value={""} />  */}
          <TextField
          error
          className="w-full mx-2"
          id="outlined-error"
          label="เกิดอุบัติเหตุว่ามีลักษณะบาดแผลอย่างไร"
          defaultValue=""
        />
                </div> 
              </div>
              <div className="flex  w-full mt-4">
                <div className="w-1/5">
                <FormControl fullWidth>
        <InputLabel id="demo-error-select-label">ข้างที่ได้รับบาดเจ็บจากการเกิดอุบัติเหตุ</InputLabel>
        <Select
        error
          labelId="demo-error-select-label"
          id="demo-error-select"
          value={accidentPlaceValue}
          label=""
          onChange={AccidentPlace}
        >
          {datainjurySide
                ? datainjurySide.Result.map((inj, index) => (
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
          value={woundType}
          label=""
          onChange={WoundType}
        >
          {DataWoundType
                ? DataWoundType.Result.map((wound, index) => (
                    <MenuItem key={index} value={wound.Code}>{wound.Desc}</MenuItem>
                  ))
                : ""}
        </Select>
      </FormControl>
                </div>
              </div>
                {/* <div className="rounded-md">
                <TextField id="standard-basic" label="ข้อวินิจฉัยโรค" variant="standard" value={visit.Result.Visit.DxFreeText} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="ส่วนสูง" variant="standard" value={visit.Result.Visit.Height} />
                </div>
                <div className="rounded-md">
                <TextField id="standard-basic" label="น้ำหนัก" variant="standard" value={visit.Result.Visit.Weight} />
                </div> */}
          
            </div> 
            ) : ""  ) : ""}
              {/* //////////////////////////////////////////////////////////////////////////// */}

              {/* <div className="grid gap-2 sm:grid-cols-4 w-full pt-2">
                <div className="rounded-md">
                  วันที่เข้ารับการรักษาครั้งก่อน
                  <input
                    type="text"
                    value={
                      visit
                        ? visit.DataJson.Visit.PatienPreviousTreatmentDate
                        : ""
                    }
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  ชื่อโรงพยาบาลครั้งก่อน
                  <input
                    type="text"
                    value={
                      visit
                        ? visit.DataJson.Visit.PatienPreviousTreatmentDate
                        : ""
                    }
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  เป็นเคสพิเศษ
                  <input
                    type="text"
                    value={
                      visit
                        ? visit.DataJson.Visit.PatienPrivateCase === "true"
                          ? "เคสพิเศษ"
                          : "เคสปกติ"
                        : ""
                    }
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  วันที่เริ่มมีอาการ
                  <input
                    type="text"
                    value={
                      visit ? visit.DataJson.Visit.PatienSignSymptomsDate : ""
                    }
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  โรคประจำตัว
                  <input
                    type="text"
                    value={
                      visit
                        ? visit.DataJson.Visit.PatienUnderlyingCondition
                        : ""
                    }
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  น้ำหนัก
                  <input
                    type="text"
                    value={
                      visit
                        ? visit.DataJson.Visit.PatienWeight
                        : "" + " " + visit
                        ? visit.DataJson.Visit.PatienWeight === ""
                          ? ""
                          : "kg"
                        : ""
                    }
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
              </div> */}
              {/* <h1 className="font-black text-accent text-3xl ">Diagnosis</h1>
              <div className="grid gap-2 sm:grid-cols-3 w-full pt-2">
                {diagnosis
                  ? diagnosis.DataJson.Diagnosis.map((bbe, index) => {
                      return (
                        <div className="" key={index}>
                          {index + 1}. ชื่อของการวินิจฉัยโรค : {bbe.DxName}{" "}
                          <br /> */}
                          {/* ชนิดของการวินิจฉัยโรค : {bbe.DxType} <br /> */}
                          {/* //////////////////////////////////////////////////////////////////////////// */}
                          {/* {bbe.DxType === "PP" ? "Principal (โรคหลักที่ให้การรักษา)" : ""}
{bbe.DxType === "CP" ? "Complication (โรคหรือภาวะแทรกซ้อน)" : ""}
{bbe.DxType === "CM" ? "Co-morbid (โรคร่วม)" : ""}
{bbe.DxType === "OT" ? "Other" : ""}   */}
                          {/* //////////////////////////////////////////////////////////////////////////// */}
                          {/* รหัสอ้างอิงของการวินิจฉัยโรค (ICD10) : {bbe.Icd10}
                        </div>
                      );
                    })
                  : ""}
              </div>
              <input
                type="file"
                className="file-input file-input-bordered file-input-info max-w-xs"
              />
              <div className="py-2">
                <hr />
              </div> */}
              <div className="overflow-x-auto">
                <h1 className="font-black text-accent text-3xl ">VitalSign</h1>
                <table className="table">
                  <thead>
                    <tr className="text-base-100 bg-accent py-8 text-sm w-full text-center">
                      <th>ลำดับ</th>
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
                        ? vitalsign.Result.VitalSign.map((vts, index) => (
                            <tr
                              key={index}
                              className="text-primary bg-neutral text-sm"
                            >
                              <td>{index + 1}</td>
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
                                  (vts.PainScore === "" ? "" : "score")}
                              </td>
                              <td>
                                {vts.RespiratoryRate +
                                  " " +
                                  (vts.RespiratoryRate === "" ? "" : "min")}
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
                        : "เยอะกว่า 5"
                      }
                  </tbody>
                </table> 
                {/* <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-accent w-full whitespace-normal text-center">
                  <div className="rounded-md"></div>
                  <div className="rounded-md"></div>
                  <div className="rounded-md "></div>
                  <div className="rounded-md ">&nbsp;</div> */}
              </div> 
              {/* </div>
              <div className="py-2">
                <hr />
              </div>
              <h1 className="font-black text-accent text-3xl ">OrderItem</h1>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-base-100 bg-accent py-8 text-sm w-full whitespace-normal text-center">
                      <th>ลำดับ</th>
                      <th>Code</th>
                      <th>ชื่อรายการค่าใช้จ่าย</th>
                      <th>จำนวนเงิน (ก่อนหักส่วนลด)</th>
                      <th>ส่วนลด</th>
                      <th>จำนวนเงิน (หลังหักส่วนลด)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billing
                      ? billing.DataJson.Billing.map((bill, index) => (
                          <tr
                            key={index}
                            className="text-base-100 bg-neutral text-sm"
                          >
                            <td>{index + 1}</td>
                            <td>{bill.SimbBillingCode}</td>
                            <td>{bill.LocalBillingName}</td>
                            <td>{bill.BillingInitial}</td>
                            <td>{bill.BillingDiscount}</td>
                            <td>{bill.BillingNetAmount}</td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div> */}
              {/* <div className="text-right mr-20"> */}
              {/* <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-accent whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md ">สรุปค่ารักษาพยาบาล</div>
                <div className="rounded-md ">
                  ฿ {billing ? billing.DataJson.TotalBillAmount : ""}
                </div>
              </div>
              <div className="py-2">
                <hr />
              </div>
              <h1 className="font-black text-accent text-3xl ">
                รายละเอียดค่ารักษาพยาบาล
              </h1>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-base-100 bg-accent py-8 text-sm w-full whitespace-normal text-center">
                      <th>ลำดับ</th>
                      <th>SIMB</th>
                      <th>รายละเอียดค่ารักษาพยาบาล</th>
                      <th>จำนวนเงิน (ก่อนหักส่วนลด)</th>
                      <th>ส่วนลด</th>
                      <th>จำนวนเงิน (หลังหักส่วนลด)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billing
                      ? billing.DataJson.Billing.map((bill, index) => (
                          <tr
                            key={index}
                            className="text-base-100 bg-neutral text-sm"
                          >
                            <td>{index + 1}</td>
                            <td>{bill.SimbBillingCode}</td>
                            <td>{bill.LocalBillingName}</td>
                            <td>{bill.BillingInitial}</td>
                            <td>{bill.BillingDiscount}</td>
                            <td>{bill.BillingNetAmount}</td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div> */}
              {/* <div className="text-right mr-20"> */}
              {/* <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-accent whitespace-normal text-center">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md ">สรุปค่ารักษาพยาบาล</div>
                <div className="rounded-md ">
                  ฿ {billing ? billing.DataJson.TotalBillAmount : ""}
                </div>
              </div>
              <div className="py-2">
                <hr />
              </div>
              <div className="py-2">
                <button
                  className="btn btn-neutral text-base-100 mr-4 "
                  type="submit"
                >
                  ส่งการเรียกร้องค่าสินไหม
                </button>
              </div>*/}
            
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
    </>
  );
}
