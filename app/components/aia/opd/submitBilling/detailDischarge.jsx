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
  
    // console.log(data)
  const [patientInfo, setPatientInfo] = useState({});

  const [patien, setPatien] = useState();
  const [transactionClaimInfo, setTransactionClaimInfo] = useState();
  const [visit, setVisit] = useState();
  
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
    setPatien();
    // setPatientInfo();
    document.getElementById("my_modal_4").showModal();
  }, [data]);

  useEffect(() => {
   
    axios
  .post(process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_ReviewOPDDischarge,{
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

  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
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
                              <label className="text-gray-700 mb-2">Sex</label>
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
                      <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                        <div className="rounded-md"></div>
                        <div className="rounded-md"></div>
                        <div className="rounded-md "></div>
                        <div className="rounded-md ">&nbsp;</div>
                      </div>
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
                    <div className="grid gap-2 sm:grid-cols-4 text-base-100 bg-primary w-full whitespace-normal text-center">
                        <div className="rounded-md"></div>
                        <div className="rounded-md"></div>
                        <div className="rounded-md "></div>
                        <div className="rounded-md ">&nbsp;</div>
                      </div>
            </TableContainer>
          </div>




        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
