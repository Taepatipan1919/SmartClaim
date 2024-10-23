"use client";
import { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function DetailDischarge({ data }) {
  
     console.log(data)
  const [patientInfo, setPatientInfo] = useState({});

  const [patien, setPatien] = useState();
  const [transactionClaimInfo, setTransactionClaimInfo] = useState();
  const [visit, setVisit] = useState();
  const [fileList, setFileList] = useState("")
  const [massDocError, setMassDocError] = useState("");
  const [showDocError, setShowDocError] = useState("");


  useEffect(() => {

    axios
    .post(
      process.env.NEXT_PUBLIC_URL_SV +
        process.env.NEXT_PUBLIC_URL_SearchTransection,
     {
      "PatientInfo": {
        "InsurerCode": data.InsurerCode, 
        "PID": data.PID,
        "PassportNumber": data.PassportNumber,
        "HN": data.HN,
        "VN": data.VN,
        "InvoiceNumber":"",
        "StatusClaimCode":"",
        "VisitDatefrom":"",
        "VisitDateto": ""
    }
    }
    )
    .then((response) => {
      setTransactionClaimInfo();
      console.log(response.data.Result.TransactionClaimInfo[0]);
    setPatientInfo(response.data.Result.TransactionClaimInfo[0]);

    })
    .catch((error) => {
      console.log(error);
    });


  }, [data]);

  useEffect(() => {
    setMassDocError();
    setShowDocError();
    axios
    .post(
      process.env.NEXT_PUBLIC_URL_SV +
        process.env.NEXT_PUBLIC_URL_getlistDocumentName,
     {
      "PatientInfo": {
        InsurerCode: 13, 
        RefId: data.RefId,
        TransactionNo: data.TransactionNo,
        HN: data.HN,
        VN: data.VN,
        DocumenttypeCode : "",
        Runningdocument: "",
        }
    }
    )
    .then((response) => {
      setFileList(response.data);

    })
    .catch((error) => {
      console.log(error);
    });


  }, [data]);

  useEffect(() => {
    setPatien();
    // setPatientInfo();
    document.getElementById("my_modal_4").showModal();
  }, [data]);

  useEffect(() => {
   
    axios
  .post(process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_ReviewOPDDischarge,
    {
    "PatientInfo": {
      "InsurerCode": 13, 
      "RefId": data.RefId,
      "TransactionNo": data.TransactionNo,   
      "PID": data.PID,
      "HN": data.HN,
      "GivenNameTH": "",
      "SurnameTH": "",
      "DateOfBirth": "",
      "PassportNumber": data.PassportNumber,
      "IdType":"",
      "VN": data.VN,
      "VisitDateTime": "",
      "AccidentDate":"",
      "PolicyTypeCode":"",
      "ServiceSettingCode": "", 
      "IllnessTypeCode": "",
      "SurgeryTypeCode":  ""

      }
  })
  .then((response) => {
    setTransactionClaimInfo(response.data.Result.InsuranceData);
    console.log(response.data.Result.InsuranceData)
  })
  .catch((error) => {
   // console.error("Error", err)
    console.log(error)
  });

  }, [data]);

  const DocumentBase64 = (docname) => {
    console.log(data.VN)
    console.log(docname)
    setMassDocError();
    setShowDocError();
    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD2 +
          process.env.NEXT_PUBLIC_URL_getDocumentByDocname,
        {
          DocumentName: docname,
        //  RefId: data.RefId,
        //  TransactionNo: data.TransactionNo,
        //  HN: data.HN,
          VN: data.VN,
        }
      )
      .then((response) => {
     //   setBase64(response.data);

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



  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-7xl">
          <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4">
            <h1 className="font-black text-accent text-3xl ">Patient Info</h1>
            <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
              <div className="rounded-md">
                  <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-2">FirstName (TH)</label>
                      <input
                          type="text"
                          value={
                            patientInfo
                              ? patientInfo.GivenNameTH
                                ? patientInfo.GivenNameTH
                                : ""
                              : ""
                          }
                          readOnly
                          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                   </div>
              </div>
              <div className="rounded-md">
                  <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-2">LastName (TH)</label>
                      <input
                          type="text"
                          defaultValue={
                            patientInfo
                              ? patientInfo.SurnameTH
                                ? patientInfo.SurnameTH
                                : ""
                              : ""
                          }
                          readOnly
                          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                   </div>
              </div>
              <div className="rounded-md">
                  <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-2">PID</label>
                      <input
                          type="text"
                          defaultValue={patientInfo.PID}
                          readOnly
                          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                   </div>
              </div>
              {patientInfo.PassportNumber ? (
                <div className="rounded-md">
                          <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-2">Passport</label>
                      <input
                          type="text"
                          defaultValue={patientInfo.PassportNumber}
                          readOnly
                          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                   </div>
                </div>
              ) : (
                ""
              )}
              <div className="rounded-md">
                <div className="rounded-md">
                   <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-2">Date of Birth (YYYY-MM-DD)</label>
                      <input
                          type="text"
                          defaultValue={transactionClaimInfo ? transactionClaimInfo.Patient.Dob : ""}
                          readOnly
                          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                   </div>
                </div>

              </div>
              <div className="rounded-md">
                                     <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-2">HN</label>
                      <input
                          type="text"
                          defaultValue={patientInfo.HN}
                          readOnly
                          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                   </div>
              </div>
              <div className="rounded-md">
              <div className="flex flex-col mb-4">
                    <label className="text-gray-700 mb-2">VN</label>
                      <input
                          type="text"
                          defaultValue={patientInfo.VN}
                          readOnly
                          className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                   </div>
              </div>
              {patien ? (

                <div className="rounded-md">
                              <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">Sex</label>
                                <input
                                    type="text"
                                    defaultValue={patien.Result.PatientInfo.Gender}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4 mt-2">
            <h1 className="font-black text-accent text-3xl ">Visit</h1>
            <div className="grid gap-2 sm:grid-cols-2 w-full mt-4">
                  <div className="rounded-md mt-2">
                                                <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">ChiefComplaint</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.ChiefComplaint : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="rounded-md mt-2">
                       <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">Chronic disease</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.UnderlyingCondition : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="rounded-md mt-2">
                  <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">Diagnosis</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.DxFreeText : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="rounded-md mt-2">
                  <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">Present illness or Cause of Injury</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PresentIllness : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="rounded-md mt-2">
                  <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">Physical exam</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PhysicalExam : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="rounded-md mt-2">
                  <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">Treatment</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PlanOfTreatment : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="rounded-md mt-2">
                                     <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">ProcedureFreeText</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.ProcedureFreeText : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="rounded-md mt-2">
                      <div className="flex flex-col">
                              <label className="text-gray-700 mb-2">AdditionalNote</label>
                                <textarea
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.AdditionalNote : ""}
                                    readOnly
                                    rows={4}
                                    inputProps={{ maxLength: 200 }}
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
            </div>
            <div className="flex  w-full mt-4">
                  <div className="w-1/5">
                  <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">วันที่เริ่มมีอาการ</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.signSymptomsDate : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="w-1/5 ml-2">
                                      <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">ระดับความรู้สึกตัว</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.comaScore : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
                  <div className="w-1/5 ml-2">
                    <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">วันพักฟื้นหลังการผ่าตัด</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.expectedDayOfRecovery : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                  </div>
            </div>
            <div className="border-solid border-2 mt-2">
                  <h1 className="mt-2 ml-2 text-accent text-lg">
                    การเจ็บป่วยนี่เกี่ยวข้องกับสิ่งแวดล้อมอื่นๆ 
                  </h1>
                  <div className="flex items-center mt-2 ml-2">
                    {transactionClaimInfo ? (
                      transactionClaimInfo.Visit.AlcoholRelated === true ? (
                        <input
                          type="checkbox"
                          id="alcoholRelated"
                          name="alcoholRelated"
                          className="checkbox"
                          disabled defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          id="alcoholRelated"
                          name="alcoholRelated"
                          className="checkbox"
                          disabled
                        />
                      )
                    ) : (
                      ""
                    )}

                    <p className="text-left ml-2">
                      การเจ็บป่วยครั้งนี้เกี่ยวข้องกับแอลกอฮอล์ หรือ ยาเสพติด
                    </p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                    {transactionClaimInfo ? (
                      transactionClaimInfo.Visit.Pregnant === true ? (
                        <input
                          type="checkbox"
                          id="pregnant"
                          name="pregnant"
                          className="checkbox"
                          disabled defaultChecked
                        />

                   
                      ) : (
                        <input
                          type="checkbox"
                          id="pregnant"
                          name="pregnant"
                          className="checkbox"
                          disabled
                        />
                      
                      )
                    ) : (
                      ""
                    )}

                    <p className="text-left ml-2">
                    ตั้งครรภ์
                    </p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                    {transactionClaimInfo ? (
                      transactionClaimInfo.Visit.PrivateCase === true ? (
                        <input
                          type="checkbox"
                          id="privateCase"
                          name="privateCase"
                          className="checkbox"
                          disabled defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          id="privateCase"
                          name="privateCase"
                          className="checkbox"
                          disabled
                        />
                      )
                    ) : (
                      ""
                    )}

                    <p className="text-left ml-2">
                    เป็นเคสพิเศษ
                    </p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                    {transactionClaimInfo ? (
                      (transactionClaimInfo.Visit.PreviousTreatmentDate||transactionClaimInfo.Visit.PreviousTreatmentDetail) ? (
                        <input
                          type="checkbox"
                          id="privateCase"
                          name="privateCase"
                          className="checkbox"
                          defaultChecked
                          disabled
                        />
                
                      ) : (
                        <input
                          type="checkbox"
                          id="privateCase"
                          name="privateCase"
                          className="checkbox"
                          disabled
                        />
              
                      )
                    ) : (
                      ""
                    )}
                    <p className="text-left ml-2">
                    เคยเข้ารับการรักษาก่อนการรักษาครั้งนี้
                    </p>
                  </div> 
                  <div className="flex items-center mt-2 ml-2"></div> 
                    {transactionClaimInfo ? (
                       (transactionClaimInfo.Visit.PreviousTreatmentDate||transactionClaimInfo.Visit.PreviousTreatmentDetail) ? (
                    <div className="flex  w-full mt-2">
                        <div className="w-1/4">
                        <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">วันที่เข้ารับการรักษาก่อนการรักษาครั้งนี้</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PreviousTreatmentDate : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                    </div>
                        <div className="w-2/5 ml-2">
                                            <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">ชื่อโรงพยาบาลที่เข้ารับการรักษาก่อนการรักษาครั้งนี้</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PreviousTreatmentDetail : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                             </div>
                        </div>
                      </div>
                      ): ""): ""}
                  </div>
                  <div className="flex items-center mt-2 ml-2"></div> 
          </div>
          <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4 mt-2">
            <h1 className="font-black text-error text-3xl ">AccidentDetail</h1>
            <div className="flex  w-full mt-2">
              <div className="w-1/5 ">
              <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">AccidentDate</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.AccidentDetail.AccidentDate : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                </div>
              </div>
              <div className="w-2/5 ml-2">
                                  <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">สถานที่เกิดอุบัติเหตุ</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.AccidentDetail.AccidentPlace : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                      </div>
              </div>
              <div className="w-3/5 ml-2">
              <div className="flex flex-col mb-4">
                              <label className="text-gray-700 mb-2">สาเหตุของการมารับการรักษาเกิน 45 วัน จากการเกิดอุบัติเหตุ</label>
                                <input
                                    type="text"
                                    defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.AccidentCauseOver45Days : ""}
                                    readOnly
                                    className="border-2 border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                                  />
                      </div>
              </div>
            </div>

            <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                                สาเหตุของการเกิดอุบัติเหตุ (ICD10 code)
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-2/5 text-center">
                                คำอธิบายอวัยวะที่ได้รับจากการเกิดอุบัติเหตุว่ามีลักษณะบาดแผลอย่างไร
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.AccidentDetail.CauseOfInjuryDetail.map(
                                (cause, index) =>
                                  cause.CauseOfInjury  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {cause.CauseOfInjury ? (
                                                cause.CauseOfInjury
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {cause.CommentOfInjury ? (
                                                cause.CommentOfInjury
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
            <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-1/7 text-center">
                              อวัยวะที่ได้บาดเจ็บจากการเกิดอุบัติเหตุ (ICD10 Code)
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-3/7 text-center">
                              ข้างของอวัยวะที่ได้รับบาดเจ็บจากการเกิดอุบัติเหตุ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100  text-sm w-3/7 text-center">
                              ลักษณะบาดแผลที่ได้รับจากการเกิดอุบัติเหตุ
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.AccidentDetail.InjuryDetail.map(
                                (injury, index) =>
                                injury.InjuryArea  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.InjuryArea ? (
                                                injury.InjuryArea
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.InjurySide ? (
                                                injury.InjurySide
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {injury.WoundType ? (
                                                injury.WoundType
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
          </div>
 {/* //////////////////////////////////////////////////////////////////////////// */}
    <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">VitalSign</h1>
              <div className="overflow-x-auto">
          <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              วันเวลาที่วัดสัญญาณชีพ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              การเต้นของชีพจร
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ความเข้มข้นของออกซิเจนในเลือด
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              คะแนนระดับของความเจ็บปวด
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              อัตราการหายใจ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ค่าความดันโลหิต
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              อุณหภูมิร่างกาย
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.VitalSign.map(
                                (vts, index) =>
                                  vts.VitalSignEntryDateTime && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {vts.VitalSignEntryDateTime ? (
                                                vts.VitalSignEntryDateTime
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {vts.HeartRate ? (
                                                vts.HeartRate
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {vts.OxygenSaturation ? (
                                                vts.OxygenSaturation
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {vts.PainScore ? (
                                                vts.PainScore
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {vts.RespiratoryRate ? (
                                                vts.RespiratoryRate
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {vts.SystolicBp ? (
                                                vts.SystolicBp 
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                              &nbsp;/&nbsp;
                                              {vts.DiastolicBp ? (
                                              vts.DiastolicBp
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {vts.Temperature ? (
                                                vts.Temperature
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
        </div>
      </div>
 {/* //////////////////////////////////////////////////////////////////////////// */}
 <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Doctor</h1>
              <div className="overflow-x-auto">
 <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              เลขใบประกอบวิชาชีพแพทย์ผู้ให้การรักษา
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ชื่อ - นามสกุล แพทย์ผู้ให้การรักษา
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              สถานะของแพทย์ผู้ให้การรักษา
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.Doctor.map(
                                (dc, index) =>
                                  dc.DoctorLicense  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {dc.DoctorLicense ? (
                                                dc.DoctorLicense
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {dc.DoctorFirstName ? (
                                                dc.DoctorFirstName
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {dc.DoctorRole ? (
                                                dc.DoctorRole
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
          </div>
 {/* //////////////////////////////////////////////////////////////////////////// */}
 <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Diagnosis</h1>
              <div className="overflow-x-auto">
 <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              รหัส
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ชื่อของการวินิจฉัยโรค
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ชนิดของการวินิจฉัยโรค
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.Diagnosis.map(
                                (diagnosis, index) =>
                                  diagnosis.Icd10  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {diagnosis.Icd10 ? (
                                                diagnosis.Icd10
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {diagnosis.DxName ? (
                                                diagnosis.DxName
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {diagnosis.DxType ? (
                                                diagnosis.DxType
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
          </div>
     {/* //////////////////////////////////////////////////////////////////////////// */}
 <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Procedure</h1>
              <div className="overflow-x-auto">
 <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              Icd 9 Code ของหัตถการหรือการผ่าตัด
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ชื่อของหัตถการหรือการผ่าตัด
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              วันที่ทำหัตถการหรือทำการผ่าตัด
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.Procedure.map(
                                (proce, index) =>
                                  proce.Icd9  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {proce.Icd9 ? (
                                                proce.Icd9
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {proce.ProcedureName ? (
                                                proce.ProcedureName
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {proce.ProcedureDate ? (
                                                proce.ProcedureDate
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
          </div>
 {/* //////////////////////////////////////////////////////////////////////////// */}
 <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Investigation</h1>
              <div className="overflow-x-auto">
 <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              รหัสอ้างอิง
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ชื่อกลุ่มของการตรวจทางห้องปฏิบัติการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ชื่อของการตรวจทางห้องปฏิบัติการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              ผลของการตรวจทางห้องปฏิบัติการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              วันเวลาที่แสดงผลของการตรวจทางห้องปฏิบัติการ
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.Investigation.map(
                                (Investigation, index) =>
                                  Investigation.InvestigationCode  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {Investigation.InvestigationCode ? (
                                                Investigation.InvestigationCode
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {Investigation.InvestigationGroup ? (
                                                Investigation.InvestigationGroup
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {Investigation.InvestigationName ? (
                                                Investigation.InvestigationName
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {Investigation.InvestigationResult ? (
                                                Investigation.InvestigationResult
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {Investigation.ResultDateTime ? (
                                                Investigation.ResultDateTime
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
          </div>
 {/* //////////////////////////////////////////////////////////////////////////// */}
 <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">OrderItem</h1>
              <div className="overflow-x-auto">
 <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary w-full">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-48">
                              รหัสของรายการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-48">
                              ชื่อรายการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              Code ของรายการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-48">
                              ชื่อของรายการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-24 text-wrap">
                              จำนวนปริมาณของรายการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-24 text-wrap">
                              จำนวนเงินตั้งต้นของรายการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-24 text-wrap">
                              จำนวนส่วนลดของรายการ
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-24 text-wrap">
                              จำนวนเงินหลังหักส่วนลดของรายการ
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.OrderItem.map(
                                (OrderItem, index) =>
                                  OrderItem.ItemId  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.ItemId ? (
                                                OrderItem.ItemId
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.ItemName ? (
                                                OrderItem.ItemName
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.LocalBillingCode ? (
                                                OrderItem.LocalBillingCode
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.LocalBillingName ? (
                                                OrderItem.LocalBillingName
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.ItemAmount ? (
                                                OrderItem.ItemAmount
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.Initial ? (
                                                OrderItem.Initial
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.Discount ? (
                                                OrderItem.Discount
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {OrderItem.NetAmount ? (
                                                OrderItem.NetAmount
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
          </div>
 {/* //////////////////////////////////////////////////////////////////////////// */}
 <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">รายละเอียดค่ารักษาพยาบาล</h1>
              <div className="overflow-x-auto">
 <TableContainer component={Paper} className="mt-2">
                      <Table className="table">
                        <TableHead>
                          <TableRow className="bg-primary">
                            <TableCell className="w-2"></TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-48">
                              SIMB
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-48">
                              รายละเอียดค่ารักษาพยาบาล
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              จำนวนเงิน (ก่อนหักส่วนลด)
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center w-48">
                              ส่วนลด
                              </h1>
                            </TableCell>
                            <TableCell>
                              <h1 className="text-base-100 bg-primary text-sm w-full text-center">
                              จำนวนเงิน (หลังหักส่วนลด)
                              </h1>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactionClaimInfo
                            ? transactionClaimInfo.Billing.map(
                                (bill, index) =>
                                  bill.SimbBillingCode  && (
                                    <TableRow
                                      key={index}
                                      className=" bg-neutral text-sm"
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {bill.SimbBillingCode ? (
                                                bill.SimbBillingCode
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {bill.LocalBillingName ? (
                                                bill.LocalBillingName
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {bill.BillingInitial ? (
                                                bill.BillingInitial
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {bill.BillingDiscount ? (
                                                bill.BillingDiscount
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      <TableCell>
                                            <div className="rounded-full px-3 py-2 border-2 bg-base-100 break-all">
                                              {bill.BillingNetAmount ? (
                                                bill.BillingNetAmount
                                              ) : (
                                                <>&nbsp;</>
                                              )}
                                            </div>
                                      </TableCell>
                                      </TableRow>
                                )
                            )
                          : ""}
                        </TableBody>
                    </Table>
            </TableContainer>
            <div className="grid gap-2 sm:grid-cols-6  bg-primary w-full whitespace-normal text-center text-lg">
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md"></div>
                <div className="rounded-md px-3 py-2 border-2 bg-base-100 break-all m-1">สรุปค่ารักษาพยาบาล</div>
                <div className="rounded-md px-3 py-2 border-2 bg-base-100 break-all m-1">
                  { transactionClaimInfo ? transactionClaimInfo.TotalBillAmount : "" } 
                </div>
              </div>
            </div>
          </div>
 {/* //////////////////////////////////////////////////////////////////////////// */}
  <div className="container mx-auto justify-center border-solid w-5/5 m-auto border-2 border-warning rounded-lg p-4 mt-2">
              <h1 className="font-black text-accent text-3xl ">Upload File</h1>
              <div className="overflow-x-auto mt-6">
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
                <div className="flex items-center ">

                <table className="table  mt-2">
                  <thead>
                    <tr className="text-base-100 bg-primary py-8 text-sm w-full text-center">
                      <th className="w-2/5">ชื่อไฟล์</th>
                      <th className="w-1/5"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fileList ? (
                      fileList.map((list, index) => (
                        <tr key={index} className=" bg-neutral text-sm">
                          <td className="px-6 py-4 whitespace-nowrap">
                          {list.filename}
                          <br/>{list.originalname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          
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
  </div>



          
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
