"use client";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import SelectPatient from "../../../../components/aia/checkpatient/selectPatient";
import OpdDischarge from "../../../../components/aia/eligible/opdDischarge";
import IpdDischarge from "../../../../components/aia/eligible/ipdDischarge";
import PreDischarge from "../../../../components/aia/eligible/preDischarge";
import CheckData from "../../../../components/aia/checkeilgible/checkData";

export default function Home() {
  const DataTran = useSelector((state) => ({ ...state }));
  //console.log(DataTran)

  return (
    <>
      {DataTran.Patient.value === "มีรายชื่อ" ? (
        <>
          {DataTran.DataTran.value === "มีข้อมูล" ? (
            <>
                   {
              DataTran.DataTran.Data.ServiceSettingCode === "OPD" ? 
              (
               <h1
              className="font-black text-accent text-3xl "
              data-theme="mytheme" >
              OPD
            </h1> 
              )
            : (DataTran.DataTran.Data.ServiceSettingCode === "IPD" ? 
              (
            <h1
            className="font-black text-accent text-3xl "
            data-theme="mytheme" >
            IPD
          </h1> 
              )  : (DataTran.DataTran.Data.ServiceSettingAbbr === "PRE-01" ? 
                  (
                <h1
                className="font-black text-accent text-3xl "
                data-theme="mytheme" >
                Pre - Authorization
              </h1> 
                    )  : (
                <h1
                className="font-black text-accent text-3xl "
                data-theme="mytheme" >
                Pre - Admission
              </h1> 
                    )
           )
            )
            }


              <div className="breadcrumbs text-xl">
                <ul>
                  <li>ข้อมูลผู้ป่วย</li>
                  <li>ตรวจสอบสิทธิ์</li>
                  <li>
                    <a className="text-error underline ">ส่งยอดเคลม</a>
                  </li>
                </ul>
              </div>
            {
              DataTran.DataTran.Data.ServiceSettingCode === "OPD" ? <OpdDischarge data={DataTran} /> : DataTran.DataTran.Data.ServiceSettingCode === "IPD" ? <IpdDischarge data={DataTran} /> : <PreDischarge data={DataTran} />
            
            }
            </>
          ) : (
            <>
              <h1
                className="font-black text-accent text-3xl "
                data-theme="mytheme"
              >
                ตรวจสอบสิทธิ์
              </h1>

              <div className="breadcrumbs text-xl">
                <ul>
                  <li>ข้อมูลผู้ป่วย</li>
                  <li>
                    <a className="text-error underline ">ตรวจสอบสิทธิ์</a>
                  </li>
                </ul>
              </div>
              <CheckData />
      <br />  
            </>
          )}
        </>
      ) : (
        <>
          <h1 className="font-black text-accent text-3xl " data-theme="mytheme">
            ข้อมูลผู้ป่วย
          </h1>

          <div className="breadcrumbs text-xl">
            <ul>
              <li>
                <a className="text-error underline ">ข้อมูลผู้ป่วย</a>
              </li>
            </ul>
          </div>
          <SelectPatient />
        </>
      )}
    </>
  );
}
