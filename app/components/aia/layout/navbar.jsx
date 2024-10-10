import React from "react";
import { FaUserLargeSlash } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

export default function navbar() {
  const DataTran = useSelector((state) => ({ ...state }));

  const dataArray = [
    {
      InsurerCode: DataTran.Patient.Data.InsuranceCode,
      DateOfBirth: DataTran.Patient.Data.DateOfBirth,
      Gender: DataTran.Patient.Data.Gender,
      GivenNameEN: DataTran.Patient.Data.GivenNameEN,
      GivenNameTH: DataTran.Patient.Data.GivenNameTH,
      HN: DataTran.Patient.Data.HN,
      MobilePhone: DataTran.Patient.Data.MobilePhone,
      PID: DataTran.Patient.Data.PID,
      SurnameEN: DataTran.Patient.Data.SurnameEN,
      SurnameTH: DataTran.Patient.Data.SurnameTH,
      TitleEN: DataTran.Patient.Data.TitleEN,
      TitleTH: DataTran.Patient.Data.TitleTH,
    },
  ];

  const tooltipText = dataArray
    .map(
      (item) =>
        `FullName (TH): ${item.TitleTH} ${item.GivenNameTH} ${item.SurnameTH}\nFullName (EN): ${item.TitleEN} ${item.GivenNameEN} ${item.SurnameEN}\nHN : ${item.HN}\nPID: ${item.PID}\nDate Of Birth : ${item.DateOfBirth}\nMobilePhone : ${item.MobilePhone}`
    )
    .join("\n\n");

  return (
    <>
      <div className="sticky top-0 h-screen  ">
        {DataTran.Patient.value === "มีรายชื่อ" ? (
          <>
            <Tooltip
              title={<pre>{tooltipText}</pre>}
              arrow
              className="absolute right-2 top-6 mt-2 -translate-y-1/2 bg-primary text-base-100 hover:bg-error"
            >
              <button className="btn">
                {DataTran.Patient.value === "มีรายชื่อ" ? <FaUserLarge /> : ""}
              </button>
            </Tooltip>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
