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

  useEffect(() => {
 let DetailVisit;
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
      console.log(response.data.Result.TransactionClaimInfo[0]);
    setPatientInfo(response.data.Result.TransactionClaimInfo[0]);
    DetailVisit = response.data.Result.TransactionClaimInfo[0];
    //console.log(DetailVisit)




    axios
  .post(process.env.NEXT_PUBLIC_URL_SV + process.env.NEXT_PUBLIC_URL_ReviewOPDDischarge,{
    "PatientInfo": {
      "InsurerCode": 13, 
      "RefId": DetailVisit.RefId,
      "TransactionNo": DetailVisit.TransactionNo,   
      "PID": DetailVisit.PID,
      "HN": DetailVisit.HN,
      "GivenNameTH": DetailVisit.GivenNameTH,
      "SurnameTH": DetailVisit.SurnameTH,
      "DateOfBirth": DetailVisit.DateOfBirth,
      "PassportNumber": DetailVisit.PassportNumber,
      "IdType":"HOSPITAL_ID",
      "VN": DetailVisit.VN,
      "VisitDateTime": DetailVisit.VisitDate+" 00:00",
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
   
  }, [data]);

  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="justify-center border-solid m-auto border-2 border-warning rounded-lg p-4">
            <h1 className="font-black text-accent text-3xl ">Patient Info</h1>
            <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
              <div className="rounded-md">
                <Box
                  sx={{
                    backgroundColor: "#e5e7eb",
                    padding: 0,
                    borderRadius: 0,
                  }}
                >
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="FirstName (TH)"
                    defaultValue={
                      patientInfo
                        ? patientInfo.GivenNameTH
                          ? patientInfo.GivenNameTH
                          : ""
                        : ""
                    }
                    className="w-full text-black border border-black rounded disabled:text-black"
                    InputProps={{ style: { color: "black" } }}
                  />
                </Box>
              </div>
              <div className="rounded-md">
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="LastName (TH)"
                    defaultValue={
                      patientInfo
                        ? patientInfo.SurnameTH
                          ? patientInfo.SurnameTH
                          : ""
                        : ""
                    }
                    className="w-full"
                  />
              </div>
              <div className="rounded-md">
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="PID"
                    defaultValue={patientInfo.PID}
                    className="w-full"
                    disabled
                  />
              </div>
              {patientInfo.PassportNumber ? (
                <div className="rounded-md">
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Passport"
                      defaultValue={patientInfo.PassportNumber}
                      className="w-full"
                      disabled
                    />
        
                </div>
              ) : (
                ""
              )}
              <div className="rounded-md">
                <TextField
                      disabled
                      id="outlined-disabled"
                      label="Date of Birth (YYYY-MM-DD)"
                      value="{transactionClaimInfo.Patient.Dob}"
                      className="w-full"
                      disabled
                    />

              </div>
              <div className="rounded-md">
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="HN"
                    defaultValue={patientInfo.HN}
                    className="w-full"
                    disabled
                  />
              </div>
              <div className="rounded-md">
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="VN"
                    defaultValue={patientInfo.VN}
                    className="w-full"
                    disabled
                  />
              </div>
              {patien ? (
                <div className="rounded-md">
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Sex"
                      defaultValue={patien.Result.PatientInfo.Gender}
                      className="w-full"
                      disabled
                    />
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
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="Cheif Complaint and duration"
                      name="ChiefComplaint"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.ChiefComplaint : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="Chronic disease"
                      name="UnderlyingCondition"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.UnderlyingCondition : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="Diagnosis"
                      name="Diagnosis"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.DxFreeText : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="Present illness or Cause of Injury"
                      name="ChiefComplaint"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PresentIllness : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="Physical exam"
                      name="ChiefComplaint"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PhysicalExam : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="Treatment"
                      name="ChiefComplaint"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PlanOfTreatment : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="ProcedureFreeText"
                      name="ChiefComplaint"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.ProcedureFreeText : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="rounded-md mt-2">
                    <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="AdditionalNote"
                      name="ChiefComplaint"
                      multiline
                      rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.AdditionalNote : ""}
                      inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
            </div>
            <div className="flex  w-full mt-4">
                  <div className="w-1/5">
                  <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="วันที่เริ่มมีอาการ"
                      name="signSymptomsDate"
                      multiline
                      //rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.signSymptomsDate : ""}
                      //inputProps={{ maxLength: 200 }}
                      disabled
                    />
                  </div>
                  <div className="w-1/5 ml-2">
                  <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="ระดับความรู้สึกตัว (วัดแบบ Glascow Coma Score 3-15)"
                      name="comaScore"
                      multiline
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.comaScore : ""}
                      disabled
                    />
                  </div>
                  <div className="w-1/5 ml-2">
                  <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="จำนวนวันพักฟื้นหลังการผ่าตัด"
                      name="expectedDayOfRecovery"
                      multiline
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.expectedDayOfRecovery : ""}
                      disabled
                    />
                  </div>
            </div>
            <div className="border-solid border-2 mt-2">
                  <h1 className="mt-2 ml-2 text-accent text-lg">
                    การเจ็บป่วยนี่เกี่ยวข้องกับสิ่งแวดล้อมอื่นๆ 
                  </h1>
                  <div className="flex items-center mt-2 ml-2">
                    {transactionClaimInfo ? (
                      transactionClaimInfo.Visit.AlcoholRelated === "true" ? (
                        <input
                          type="checkbox"
                          id="alcoholRelated"
                          name="alcoholRelated"
                          className="checkbox"
                          defaultChecked
                          disabled
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
                      transactionClaimInfo.Visit.pregnant === "true" ? (
                        <input
                          type="checkbox"
                          id="pregnant"
                          name="pregnant"
                          className="checkbox"
                          defaultChecked
                          disabled
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
                      transactionClaimInfo.Visit.privateCase === "true" ? (
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
                        <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="วันที่เข้ารับการรักษาก่อนการรักษาครั้งนี้"
                      name="PreviousTreatmentDate"
                      multiline
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PreviousTreatmentDate : ""}
                      disabled
                    />
                    </div>
                        <div className="w-2/5 ml-2">
                        <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="ชื่อโรงพยาบาลที่เข้ารับการรักษาก่อนการรักษาครั้งนี้"
                      name="PreviousTreatmentDetail"
                      multiline
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.PreviousTreatmentDetail : ""}
                      disabled
                    />
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
              <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="AccidentDate"
                      name="AccidentDate"
                      multiline
                     // rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.AccidentDetail.AccidentDate : ""}
                      //inputProps={{ maxLength: 200 }}
                      disabled
                    />
              </div>
              <div className="w-2/5 ml-2">
              <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="สถานที่เกิดอุบัติเหตุ"
                      name="AccidentPlace"
                      multiline
                     // rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.AccidentDetail.AccidentPlace : ""}
                      //inputProps={{ maxLength: 200 }}
                      disabled
                    />
              </div>
              <div className="w-2/5 ml-2">
              <TextField

                      className="w-full"
                      id="outlined-multiline-static"
                      label="สาเหตุของการมารับการรักษาเกิน 45 วัน จากการเกิดอุบัติเหตุ"
                      name="AccidentCauseOver45Days"
                      multiline
                     // rows={4}
                      defaultValue={transactionClaimInfo ? transactionClaimInfo.Visit.AccidentCauseOver45Days : ""}
                      //inputProps={{ maxLength: 200 }}
                      disabled
                    />
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
