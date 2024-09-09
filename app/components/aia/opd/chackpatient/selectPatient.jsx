import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";
import { RiFileUserFill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
// import { DataContext } from '@/app/page'

export default function SelectPatient() {
  const InsuranceCode = 13;
  const [claimStatus, setClaimStatus] = useState();
  const [post, setPost] = useState("");
  const [create, setCreate] = useState("");

  useEffect(() => {
    const getClaimStatus = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "v1/utils/claimStatus/"
      );

      const data = await response.json();
      setClaimStatus(data);
    };
    getClaimStatus();
  }, []);

  const createPatientInfo = (event) => {
    event.preventDefault();
    const search = {
      IdType: event.target.exampleRadios.value,
      PID: event.target.PID.value,
    };
    console.log(search);
    if (search.IdType === "PIDType") {
      //console.log("PID");

      axios
        .get(
          process.env.NEXT_PUBLIC_URL_PD +
            "v1/aia-patient-info/PatientInfo2/" +
            InsuranceCode +
            "/" +
            search.PID
        )
        .then((response) => {
          setCreate(response.data);
        })
        .catch((err) => console.error("Error", err));
    } else {
      console.log("Passport");
    }
  };
  function saveCreate() {
    axios
      .post(process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info", {
        PatientInfo: {
          Insurerid: InsuranceCode, // ควรเป็น integer ไม่ใช่ string
          PatientID: create.Result.PatientInfo.PatientID, // ควรเป็น integer ไม่ใช่ string
          PID: create.Result.PatientInfo.PID,
          PassportNumber: create.Result.PatientInfo.PassportNumber,
          HN: create.Result.PatientInfo.HN,
          TitleTH: create.Result.PatientInfo.TitleTH,
          GivenNameTH: create.Result.PatientInfo.GivenNameTH,
          SurnameTH: create.Result.PatientInfo.SurnameTH,
          TitleEN: create.Result.PatientInfo.TitleEN,
          GivenNameEN: create.Result.PatientInfo.GivenNameEN,
          SurnameEN: create.Result.PatientInfo.SurnameEN,
          DateOfBirth: create.Result.PatientInfo.DateOfBirth,
          Gender: create.Result.PatientInfo.Gender,
          MobilePhone: create.Result.PatientInfo.MobilePhone,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //console.log(dataCreate);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        process.env.NEXT_PUBLIC_URL_PD + "v1/aia-patient-info/PatientSearch",
        {
          PatientInfo: {
            datefrom: event.target.DateFrom.value,
            dateto: event.target.DateTo.value,
            IdType: event.target.exampleRadios.value,
            PID: event.target.PID.value,
            HN: event.target.HN.value,
            ClaimStatusCode: event.target.ClaimStatusCode.value,
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        setPost(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // console.log(post.data)
  return (
    <>
      {/* <div className="justify-center border-solid w-screen m-auto border-4 rounded-lg p-4"> */}
      <button
        className="btn btn-success text-base-100 text-lg rounded-full px-3 py-2"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <FaUserPlus /> Create Patient
      </button>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-1 sm:grid-cols-3 w-full">
          <div className="px-2 rounded-md">
            <p className="text-left">DateFrom</p>
            <input
              type="date"
              name="DateFrom"
              id="DateFrom"
              // value={post ? post.PatientInfo.HN : ""}
              className="input input-accent w-full rounded-full px-3 py-2"
              // required
            />
          </div>
          <div className="px-2 rounded-md">
            <p className="text-left">DateTo</p>
            <input
              type="date"
              name="DateTo"
              id="DateTo"
              // value={post ? post.PatientInfo.HN : ""}
              className="input input-accent w-full rounded-full px-3 py-2"
              // required
            />
          </div>
          <div className="px-2 rounded-md">
            <div className="flex items-center ">
              <input
                type="radio"
                name="exampleRadios"
                id="PIDType"
                value="PIDType"
                defaultChecked
              />
              <p className="text-left">&nbsp;Personal ID &nbsp;</p>
              <input
                type="radio"
                name="exampleRadios"
                id="PassportType"
                value="PassportType"
              />
              <p className="text-left">&nbsp;Passport &nbsp;</p>
            </div>
            <input
              type="text"
              name="PID"
              // value={post ? post.PatientInfo.HN : ""}
              className="input input-accent w-full rounded-full px-3 py-2"
              // required
            />
          </div>
          <div className="px-2 rounded-md">
            <p className="text-left">HN</p>
            <input
              type="text"
              name="HN"
              // value={post ? post.PatientInfo.HN : ""}
              className="input input-accent w-full rounded-full px-3 py-2"
              // required
            />
          </div>
          <div className="px-2 rounded-md">
            <p className="text-left">Claim Status</p>
            <select
              className="select input-accent w-full rounded-full px-3 py-2"
              name="ClaimStatusCode"
              id="ClaimStatusCode"
              //required
            >
              <option></option>
              {claimStatus
                ? claimStatus.map((status, index) => (
                    <option key={index}>{status.StatusDescTH}</option>
                  ))
                : ""}
            </select>
          </div>
          <div className="rounded-md pt-6">
            <div className="grid gap-1 sm:grid-cols-2 w-full">
              <div className="rounded-md">
                <button className="btn btn-neutral text-base-100 text-lg rounded-full px-3 py-2">
                  <FaSearch />
                </button>
              </div>
              <div className="rounded-md"></div>
            </div>
          </div>
        </div>
      </form>
      {/* </div> */}
      <div className="justify-center border-solid w-full m-auto border-4 rounded-lg p-4 mt-6">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-info text-base-100 text-center text-lg">
              <tr>
                <th>ลำดับ</th>
                <th>Personal ID</th>
                <th>Passport</th>
                <th>HN</th>
                <th>Fullname</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                {post
                  ? post.data.HTTPStatus.statusCode === 200
                    ? post.data.Result.PatientInfo.map((patientinfo, index) => (
                        <>
                          <th className="text-center" key={index}>
                            {index + 1}
                          </th>
                          <td>{patientinfo.PID}</td>
                          <td>{patientinfo.PID}</td>
                          <td className="text-center">{patientinfo.HN}</td>
                          <td>
                            {patientinfo.TitleTH}
                            {patientinfo.GivenNameTH} {patientinfo.SurnameTH}
                          </td>
                          <td className="text-center">
                            {patientinfo.DateOfBirth}
                          </td>
                          <td>
                            <div className="grid gap-1 sm:grid-cols-2 w-full text-accent ">
                              <Link href={`/aia/opd/checkeilgible`}>
                                <button className="btn bg-white text-accent w-full hover:text-base-100 hover:bg-neutral">
                                  Chack Eilgible
                                </button>
                              </Link>
                              <button
                                className="btn bg-white text-accent w-full hover:text-base-100 hover:bg-neutral"
                                onClick={() =>
                                  document
                                    .getElementById("my_modal_1")
                                    .showModal()
                                }
                              >
                                Verify
                              </button>
                            </div>
                          </td>
                        </>
                      ))
                    : ""
                  : ""}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="justify-center border-solid ">
            <h1 className="font-black text-accent text-3xl ">Create Patient</h1>
            <form onSubmit={createPatientInfo}>
              <div className="grid gap-2 sm:grid-cols-2 w-full">
                <div className="rounded-md ">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exampleRadios"
                      id="PIDType"
                      value="PIDType"
                      defaultChecked
                    />
                    <p className="text-left">&nbsp;Personal ID</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exampleRadios"
                      id="PassportType"
                      value="PassportType"
                    />
                    <p className="text-left">&nbsp;Passport</p>
                  </div>
                </div>
                <div className="rounded-md ">
                  <div className="relative">
                    {/* <input
                    type="text"
                    name="id"
                    //value="1103900068701"
                    className="input input-bordered input-info w-full rounded-full px-3 py-2"
                    required
                  /> */}
                    <input
                      type="text"
                      name="PID"
                      className="input input-bordered w-full pr-16"
                    />
                    <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                      <FaSearch />
                    </button>
                  </div>
                </div>
                {/* <div className="rounded-md">
                <button
                  type="submit"
                  className="btn btn-accent text-base-100 text-lg w-full rounded-full px-3 py-2"
                >
                  <FaSearch /> ค้นหา
                </button>
              </div> */}
                <div className="rounded-md ">
                  <p className="text-left">Date Of Birth</p>
                </div>
                <div className="rounded-md">
                  {create ? create.Result.PatientInfo.DateOfBirth : "xxxxxx"}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">HN</p>
                </div>
                <div className="rounded-md ">
                  {create ? create.Result.PatientInfo.HN : "xxxxxx"}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">GivenName - Surname (TH)</p>
                </div>
                <div className="rounded-md ">
                  {create ? (
                    <>
                      {create.Result.PatientInfo.TitleTH}{" "}
                      {create.Result.PatientInfo.GivenNameTH}{" "}
                      {create.Result.PatientInfo.SurnameTH}
                    </>
                  ) : (
                    "xxxxxx"
                  )}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">GivenName - Surname (EN)</p>
                </div>
                <div className="rounded-md ">
                  {create ? (
                    <>
                      {create.Result.PatientInfo.TitleEN}{" "}
                      {create.Result.PatientInfo.GivenNameEN}{" "}
                      {create.Result.PatientInfo.SurnameEN}
                    </>
                  ) : (
                    "xxxxxx"
                  )}
                </div>
                <div className="rounded-md ">
                  <p className="text-left">Mobile Phone</p>
                </div>
                <div className="rounded-md ">
                  {create ? create.Result.PatientInfo.MobilePhone : "xxxxxx"}
                </div>
                <div className="rounded-md "></div>
                <div className="rounded-md ">
                  {create ? (
                    <>
                      <button
                        type="submit"
                        className="btn btn-accent text-base-100 text-lg rounded-full px-3 py-2 center"
                        onClick={saveCreate}
                      >
                        <RiSave3Fill /> Save
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div>{error ? (
                  <>
                  <div role="alert" className="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Error! Task failed successfully.</span>
</div>
                  </>
                ) : ""}</div> */}
              </div>
            </form>
          </div>
        </div>
      </dialog>
      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="justify-center border-solid ">
            <h1 className="font-black text-accent text-3xl ">Update Data</h1>

            <div className="grid gap-2 sm:grid-cols-3 w-full">
              <div className="rounded-md "></div>
              <div className="rounded-md text-center">DataBase</div>
              <div className="rounded-md text-center">Trakcere</div>
              <div className="rounded-md ">
                <p className="text-left">Personal ID</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">Passport</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">Date of Birth</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">HN</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">GivenName - Surname (TH)</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">GivenName - Surname (EN)</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">Mobile Phone</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md "></div>
              <div className="rounded-md "></div>
              <div className="rounded-md ">
                <button
                  type="submit"
                  className="btn btn-accent text-base-100 text-lg w-full rounded-full px-3 py-2"
                >
                  <RiSave3Fill /> Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
