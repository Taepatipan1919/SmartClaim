"use client";
import { useState, useEffect } from "react";
export default function Page({ params }) {
  const [patien, setPatien] = useState();
  const [visit, setVisit] = useState();
  const [vitalsign, setVitalsign] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [billing, setBilling] = useState();
  const [orderitem, setOrderItem] = useState();
  const [result, setResult] = useState("");
  useEffect(() => {
    const getDiagnosis = async () => {
      const response = await fetch(
        `http://localhost:3001/api/opdDischarge/Diagnosis`
      );
      const data = await response.json();
      setDiagnosis(data);
    };
    getDiagnosis();
  }, []);

  useEffect(() => {
    const getVisit = async () => {
      const response = await fetch(
        `http://localhost:3001/api/opdDischarge/Visit`
      );
      const data = await response.json();
      setVisit(data);
    };
    getVisit();
  }, []);

  useEffect(() => {
    const getVitalsign = async () => {
      const response = await fetch(
        `http://localhost:3001/api/opdDischarge/VitalSign`
      );
      const data = await response.json();
      setVitalsign(data);
    };
    getVitalsign();
  }, []);

  useEffect(() => {
    const getPatien = async () => {
      const response = await fetch(
        `http://localhost:3001/api/opdDischarge/PatienDischarge/`
      );
      const data = await response.json();
      setPatien(data);
    };
    getPatien();
  }, []);

  useEffect(() => {
    const getBilling = async () => {
      const response = await fetch(
        `http://localhost:3001/api/opdDischarge/Billing`
      );
      const data = await response.json();
      setBilling(data);
    };
    getBilling();
  }, []);
  useEffect(() => {
    const getOrderItem = async () => {
      const response = await fetch(
        `http://localhost:3001/api/opdDischarge/OrderItem`
      );
      const data = await response.json();
      setOrderItem(data);
    };
    getOrderItem();
  }, []);
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
    fetch(`http://localhost:3001/api/checkClaimStatus/`, {
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
          <div className="breadcrumbs text-xl ml-20">
            <ul>
              <li>
                <a>ตรวจสอบสิทธิ์</a>
              </li>
              <li>
                <p className="text-secondary">ข้อมูลผู่ป่วย</p>
              </li>
              <li>
                <a>วางบิล</a>
              </li>
              <li>
                <a>สถานะการเคลม</a>
              </li>
            </ul>
          </div>
          <form onSubmit={Claim}>
            <div className="justify-center border-solid w-4/5 m-auto border-4 rounded-lg p-4">
              <h1 className="font-black text-accent text-3xl ">
                ข้อมูลส่วนตัว
              </h1>
              <div className="grid gap-2 sm:grid-cols-4 w-full">
                <div className="rounded-md">
                  <h1>ชื่อ </h1>
                  <input
                    type="text"
                    value={patien.PatientInfo.FirstName}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  <h1>นามสกุล</h1>
                  <input
                    type="text"
                    value={patien.PatientInfo.LastName}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  <h1>บัตรประชาชน</h1>
                  <input
                    type="text"
                    value={patien.PatientInfo.PID}
                    className="input input-bordered w-full max-w-xs background-color-"
                    disabled
                  />
                </div>
                {patien.PatientInfo.Passport ? (
                  <div className="rounded-md">
                    <h1>Passport</h1>
                    <input
                      type="text"
                      value={patien.PatientInfo.Passport}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="rounded-md">
                  <h1>วันเกิด</h1>
                  <input
                    type="text"
                    value={patien.PatientInfo.DOB}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  <h1>HN </h1>
                  <input
                    type="text"
                    value={patien.PatientInfo.HN}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  <h1>เพศ </h1>
                  <input
                    type="text"
                    value={patien.PatientInfo.Gender}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="justify-center border-solid w-4/5 m-auto border-4 rounded-lg p-4">
              <h1 className="font-black text-accent text-3xl ">
                ข้อมูลการตรวจ
              </h1>
              <div className="grid gap-2 sm:grid-cols-4 w-full">
                <div className="rounded-md">
                  VN <br />
                  <input
                    type="text"
                    value={patien.EpisodeInfo.VN}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  วันเวลาที่เข้ารับการรักษา
                  <input
                    type="text"
                    value={patien.EpisodeInfo.VisitDateTime}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  รหัสแพทย์
                  <input
                    type="text"
                    value={patien.EpisodeInfo.DoctorLicense}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  ชื่อ-นามสกุล แพทย์
                  <input
                    type="text"
                    value={
                      patien.EpisodeInfo.DoctorFirstName +
                      " " +
                      patien.EpisodeInfo.DoctorLastName
                    }
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
                <div className="rounded-md">
                  สถานะของแพทย์
                  <input
                    type="text"
                    value={patien.EpisodeInfo.DoctorRole}
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </div>
              </div>
              {/* //////////////////////////////////////////////////////////////////////////// */}
              {/* {patien.EpisodeInfo.DoctorRole === "OWNER"
  ? "แพทย์เจ้าของไข้"
  : ""}
{patien.EpisodeInfo.DoctorRole === "ADM"
  ? "แพทย์ที่ Admit"
  : ""}
{patien.EpisodeInfo.DoctorRole === "DSC"
  ? "แพทย์ที่ Discharge"
  : ""}
{patien.EpisodeInfo.DoctorRole === "CONSULT"
  ? "แพทย์ Consult"
  : ""}
{patien.EpisodeInfo.DoctorRole === "SURGEON"
  ? "แพทย์ผ่าตัด"
  : ""}
{patien.EpisodeInfo.DoctorRole === "ASST"
  ? "แพทย์ช่วยผ่าตัด"
  : ""}
{patien.EpisodeInfo.DoctorRole === "ANES" ? "แพทย์ดมยา" : ""}
{patien.EpisodeInfo.DoctorRole === "OTHER" ? "แพทย์อื่น ๆ" : ""} */}
              {/* //////////////////////////////////////////////////////////////////////////// */}

              <div className="grid gap-2 sm:grid-cols-4 w-full pt-2">
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
              </div>
              <h1 className="font-black text-accent text-3xl ">Diagnosis</h1>
              <div className="grid gap-2 sm:grid-cols-3 w-full pt-2">
                {diagnosis
                  ? diagnosis.DataJson.Diagnosis.map((bbe, index) => {
                      return (
                        <div className="" key={index}>
                          {index + 1}. ชื่อของการวินิจฉัยโรค : {bbe.DxName}{" "}
                          <br />
                          {/* ชนิดของการวินิจฉัยโรค : {bbe.DxType} <br /> */}
                          {/* //////////////////////////////////////////////////////////////////////////// */}
                          {/* {bbe.DxType === "PP" ? "Principal (โรคหลักที่ให้การรักษา)" : ""}
{bbe.DxType === "CP" ? "Complication (โรคหรือภาวะแทรกซ้อน)" : ""}
{bbe.DxType === "CM" ? "Co-morbid (โรคร่วม)" : ""}
{bbe.DxType === "OT" ? "Other" : ""}   */}
                          {/* //////////////////////////////////////////////////////////////////////////// */}
                          รหัสอ้างอิงของการวินิจฉัยโรค (ICD10) : {bbe.Icd10}
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
              </div>
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
                      ? vitalsign.DataJson.Result.NumberVitalSign === "false"
                        ? vitalsign.DataJson.VitalSign.map((aa, index) => (
                            <tr
                              key={index}
                              className="text-base-100 bg-neutral text-sm"
                            >
                              <td>{index + 1}</td>
                              <td>{aa.VitalSignEntryDateTime}</td>
                              <td>
                                {aa.DiastolicBp +
                                  " " +
                                  (aa.DiastolicBp === "" ? "" : "mmHg")}
                              </td>
                              <td>
                                {aa.HeartRate +
                                  " " +
                                  (aa.HeartRate === "" ? "" : "bpm")}
                              </td>
                              <td>
                                {aa.OxygenSaturation +
                                  " " +
                                  (aa.OxygenSaturation === "" ? "" : "%")}
                              </td>
                              <td>
                                {aa.PainScore +
                                  " " +
                                  (aa.PainScore === "" ? "" : "score")}
                              </td>
                              <td>
                                {aa.RespiratoryRate +
                                  " " +
                                  (aa.RespiratoryRate === "" ? "" : "min")}
                              </td>
                              <td>
                                {aa.SystolicBp +
                                  " " +
                                  (aa.SystolicBp === "" ? "" : "mmHg")}
                              </td>
                              <td>
                                {aa.Temperature +
                                  " " +
                                  (aa.Temperature === "" ? "" : "℃")}
                              </td>
                            </tr>
                          ))
                        : "เยอะกว่า 5"
                      : ""}
                  </tbody>
                </table>
                {/* <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-accent w-full whitespace-normal text-center">
                  <div className="rounded-md"></div>
                  <div className="rounded-md"></div>
                  <div className="rounded-md "></div>
                  <div className="rounded-md ">&nbsp;</div>
                </div> */}
              </div>
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
              </div>
              {/* <div className="text-right mr-20"> */}
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-accent whitespace-normal text-center">
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
              </div>
              {/* <div className="text-right mr-20"> */}
              <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-accent whitespace-normal text-center">
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
    </>
  );
}
