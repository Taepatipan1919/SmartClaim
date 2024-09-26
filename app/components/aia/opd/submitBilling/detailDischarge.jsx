"use client";
import { useState, useEffect } from "react";
import { Box , TextField } from '@mui/material';

export default function DetailDischarge({data}) {
  //console.log(data)
  const [patientInfo, setPatientInfo] = useState("");

  useEffect(() => {
setPatientInfo({
  InsurerCode: data.InsurerCode, 
  RefId: data.RefId,
  TransactionNo: data.TransactionNo,
  PID: data.PID,
  HN: data.HN,
  GivenNameTH: data.GivenNameTH,
  SurnameTH: data.SurnameTH,
  DateOfBirth: data.DateOfBirth,
  PassportNumber: data.PassportNumber,
  IdType: data.IdType,
  VN: data.VN,
  VisitDateTime: data.VisitDateTime,
  FurtherClaimId: "",
  ChiefComplaint:"",
  PresentIllness:"",
  AccidentDate: "",
  AccidentPlaceCode: "",
  WoundDetails: "",
  AccidentInjurySideCode: "",
  AccidentInjuryWoundtypeCode: "",
  PolicyTypeCode: data.PolicyTypeCode,
  ServiceSettingCode: data.ServiceSettingCode, 
  IllnessTypeCode: data.IllnessTypeCode,
  SurgeryTypeCode:  data.SurgeryTypeCode,
  FurtherClaimNo : data.FurtherClaimNo,
  FurtherClaimId : data.FurtherClaimId,
  })
 // console.log(PatientInfo)
 
  document.getElementById('my_modal_4').showModal();
}, [data]);



  return (
    <>
      <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="justify-center border-solid w-4/5 m-auto border-2 border-warning rounded-lg p-4">
              <h1 className="font-black text-accent text-3xl ">
                Patient Info
              </h1>
              <div className="grid gap-2 sm:grid-cols-4 w-full mt-2">
                <div className="rounded-md">
          <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0}}>
                  {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black"    label="FirstName (TH)" variant="standard" value={FirstName} /> */}
                  <TextField disabled id="outlined-disabled" label="FirstName (TH)" defaultValue={patientInfo.GivenNameTH} className="w-full text-black border border-black rounded disabled:text-black" InputProps={{style: { color: 'black' } }}/>
        </Box>
                </div>
                <div className="rounded-md">
         <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                  {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="LastName (TH)" variant="standard" value={LastName} /> */}
                  <TextField disabled id="outlined-disabled" label="LastName (TH)" defaultValue={patientInfo.SurnameTH} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="PID" variant="standard" value={PatientInfo.PID} /> */}
                <TextField disabled id="outlined-disabled" label="PID" defaultValue={patientInfo.PID} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                </div>
              {patientInfo.PassportNumber ? (
                  <div className="rounded-md">
               <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                    {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="Passport" variant="standard" value={PatientInfo.PassportNumber} /> */}
                    <TextField disabled id="outlined-disabled" label="Passport" defaultValue={patientInfo.PassportNumber} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                  </div>
                ) : ""} 
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic"  className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="Date of Birth (YYYY-MM-DD)" variant="standard" value={DOB} /> */}
                <TextField disabled id="outlined-disabled" label="Date of Birth (YYYY-MM-DD)" defaultValue={patientInfo.DateOfBirth} className="w-full  text-black border border-black rounded disabled:text-black"/>
        </Box>
                </div>
                <div className="rounded-md">
                <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                {/* <TextField id="standard-basic" className="text-black bg-gray-200 border border-gray-300 rounded p-2 disabled:text-black" label="HN" variant="standard" value={PatientInfo.HN} /> */}
                <TextField disabled id="outlined-disabled" label="HN" defaultValue={patientInfo.HN} className="w-full  text-black border border-black rounded disabled:text-black"/>
           </Box>
                </div>
                <div className="rounded-md">
                {/* <Box sx={{backgroundColor: '#e5e7eb', padding: 0, borderRadius: 0,}}>
                <TextField disabled id="outlined-disabled" label="Sex" defaultValue={"Gender"} className="w-full  text-black border border-black rounded disabled:text-black"/>
                </Box> */}
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
