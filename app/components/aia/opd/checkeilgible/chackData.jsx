"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { save } from "../../../../store/counterSlice";
import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

export default function chackData() {
  const InsuranceCode = 13;
  const [post, setPost] = useState("");
  const [serviceSetting, setServiceSetting] = useState();
  const [policyType, setPolicyType] = useState();
  const [illnessType, setIllnessType] = useState();
  const [illnessSurgery, setIllnessSurgery] = useState();
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState();
  const [detailVN, setDetailVN] = useState();

  useEffect(() => {
    const getIllnessSurgery = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL +
          "/v1/utils/IllnessSurgery/" +
          InsuranceCode
      );
      const data = await response.json();
      setIllnessSurgery(data);
    };
    getIllnessSurgery();
  }, []);

  useEffect(() => {
    const getIllnessType = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/v1/utils/IllnessType/" + InsuranceCode
      );
      const data = await response.json();
      setIllnessType(data);
    };
    getIllnessType();
  }, []);
  useEffect(() => {
    const getPolicyType = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/v1/utils/policyType/" + InsuranceCode
      );
      const data = await response.json();
      setPolicyType(data);
    };
    getPolicyType();
  }, []);
  useEffect(() => {
    const getServiceSetting = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/v1/utils/serviceSetting/"
      );
      const data = await response.json();
      setServiceSetting(data);
    };
    getServiceSetting();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const search = {
    //   //   id: event.target.id.value,
    //   date: event.target.date.value,
    //   type: event.target.type.value,
    // };
    axios
      .get(process.env.NEXT_PUBLIC_URL + "/v1/utils/chackpatient/")
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => console.error("Error", err));
  };

  const check = (event) => {
    event.preventDefault();
    console.log(result);
    setDetailVN(event.target.selectVN.value);
    axios
      .post(process.env.NEXT_PUBLIC_URL + "/v1/utils/eligible/episodelist/", {
        DataJson: {
          IdType: post.PatientInfo.IdType,
          PID: post.PatientInfo.PID,
          PolicyType: event.target.selecttype.value,
          ServiceSetting: "",
          IllnessType: event.target.selectillnesstype.value,
          SurgeryType: event.target.selectisurgerytype.value,
          Patient: {
            FirstName: post.PatientInfo.FirstName,
            LastName: post.PatientInfo.LastName,
            Dob: post.PatientInfo.DOB,
          },
          Visit: {
            VN: event.target.selectVN.value,
          },
        },
      })
      .then(function (response) {
        //console.log(response);
        setResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setShowForm(!showForm);

    document.getElementById("my_modal_3").showModal();
  };
  const { DataTran } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // const router = useRouter();
  const confirmButton = () => {
    dispatch(
      save({
        value: "มีข้อมูล",
        Data: {
          RefId: result.Data.RefId,
          TransactionNo: result.Data.TransactionNo,
          VN: detailVN,
          InsuranceCode: InsuranceCode,
        },
      })
    );

    // setTimeout(() => {
    //   router.push("/aia"); // เปลี่ยน '/new-page' เป็นหน้าที่คุณต้องการเปลี่ยนไป
    // }, 5000); // 5000 มิลลิวินาที = 5 วินาที
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center w-1/2 m-auto ">
          <div className="px-2">
            {" "}
            <div className="">
              <p className="text-left">
                วันที่เข้ารับการรักษา&nbsp;
                <span className="text-secondary">*</span>&nbsp;
              </p>
              <input
                type="date"
                name="date"
                id="date"
                className="input input-bordered input-info"
                required
              />
            </div>
          </div>
          <div className="px-2">
            {" "}
            <div className="">
              <p className="text-left">
                ประเภทการเข้ารักษา&nbsp;
                <span className="text-secondary">*</span>&nbsp;
              </p>
              <select
                className="select select-bordered w-52 max-w-xs"
                name="type"
                id="type"
                required
              >
                <option></option>
                {serviceSetting
                  ? serviceSetting.Data.map((Service, index) => (
                      <option key={index}>
                        {Service.Code} - {Service.Desc}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </div>
          <div className="">
            <div className="p-6">
              <button type="submit" className="btn btn-neutral text-base-100">
                <div className="text-xl">Search</div>
              </button>
            </div>
          </div>
        </div>
      </form>

      {post ? (
        <>
          {post.Result.Code === "S" ? (
            <>
              <form onSubmit={check}>
                {/* <form> */}
                <div className="justify-center border-solid w-5/5 m-auto border-4 rounded-lg p-4">
                  <h1 className="font-black text-accent text-3xl ">
                    Patient Details
                  </h1>
                  <div className="flex">
                    <div className="w-1/2">ชื่อ - นามสกุล</div>
                    <div className="w-1/2">
                      {" "}
                      {post.PatientInfo.Title} {post.PatientInfo.FirstName}{" "}
                      {post.PatientInfo.LastName}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2">วัน / เดือน / ปี เกิด(ค.ศ.)</div>
                    <div className="w-1/2">{post.PatientInfo.DOB}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2">เพศ</div>
                    <div className="w-1/2">{post.PatientInfo.Gender}</div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2">รหัสผู้ป่วย</div>
                    <div className="w-1/2">{post.PatientInfo.HN}</div>
                  </div>
                  <h1 className="font-black text-accent text-3xl ">
                    Visit Details
                  </h1>
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>VN</th>
                          <th>VisitDate</th>
                          <th>AccidentDate</th>
                          <th>LocationDesc</th>
                          <th>WardDesc</th>
                          <th>DoctorLicense</th>
                          <th>MainCareproviderDecs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {post.EpisodeInfo.map((ep, index) => (
                          <tr key={index} className="hover">
                            <td>
                              <input
                                type="radio"
                                name="selectVN"
                                value={ep.VN}
                                className="radio checked:bg-blue-500"
                                defaultChecked
                              />
                            </td>
                            <td>{ep.VN}</td>
                            <td>{ep.VisitDateTime}</td>
                            <td>{ep.AccidentDate}</td>
                            <td>{ep.LocationDesc}</td>
                            <td>{ep.WardDesc}</td>
                            <td>{ep.DoctorLicense}</td>
                            <td>{ep.MainCareproviderDecs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>
                            ประเภทกรมธรรม์&nbsp;
                            <span className="text-secondary">*</span>
                          </th>
                          <td>
                            <select
                              className="select select-bordered w-64 max-w-xs"
                              name="selecttype"
                              required
                            >
                              <option></option>
                              {policyType
                                ? policyType.map((policy, index) => (
                                    <option key={index}>
                                      {policy.PolicyTypeDesc}
                                    </option>
                                  ))
                                : ""}
                            </select>
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <th>
                            ประเภทของการรักษา&nbsp;
                            <span className="text-secondary">*</span>
                          </th>
                          <td>
                            <select
                              className="select select-bordered w-64 max-w-xs"
                              name="selectillnesstype"
                              required
                            >
                              <option></option>
                              {illnessType
                                ? illnessType.map((ill, index) => (
                                    <option key={index}>
                                      {ill.IllnessTypeDesc}
                                    </option>
                                  ))
                                : ""}
                            </select>
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <th>
                            การผ่าตัด&nbsp;
                            <span className="text-secondary">*</span>
                          </th>
                          <td>
                            <select
                              className="select select-bordered w-64 max-w-xs"
                              name="selectisurgerytype"
                              required
                            >
                              <option></option>
                              {illnessSurgery
                                ? illnessSurgery.map((Illne, index) => (
                                    <option key={index}>
                                      {Illne.ISDescription}
                                    </option>
                                  ))
                                : ""}
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button
                    className="btn btn-accent w-full hover:text-white text-xl"
                    type="submit"
                    // onClick={() =>

                    // }
                    //onClick={axiosFetch}
                  >
                    Check Eligible
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div
                role="alert"
                className="alert alert-error justify-center flex flex-row w-1/2 m-auto"
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
                <span>ไม่พบข้อมูล กรุณาลองใหม่อีกครั้ง</span>
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {/* {showForm && ( */}
      <dialog id="my_modal_3" className="modal text-xl	">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <h1 className="text-neutral text-3xl ">รายการสิทธิ์ประกัน</h1>
            <hr />
            {result
              ? result.Data.CoverageList.map((e, index) => (
                  <div key={index}>
                    <ul>
                      <li>
                        {e.Status === true ? (
                          <>Insurer : {result.Data.Insurer}</>
                        ) : (
                          ""
                        )}
                        <ul>
                          <li>
                            {e.Status === true ? <>TypeTh : {e.TypeTh}</> : ""}{" "}
                          </li>
                          <li>
                            {e.Status === true ? (
                              <>
                                {e.MessageList.map((ee, index) => (
                                  <div key={index}>- {ee.PlanName}</div>
                                ))}
                              </>
                            ) : (
                              ""
                            )}
                            <hr />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ))
              : ""}
            <div className="modal-action">
              <button
                className="btn btn-neutral text-base-100"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                ยืนยันการเคลม
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal text-xl">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <h3 className="font-bold text-lg">ข้อมูลการส่งเคลม</h3>
            <hr />
            <div className="flex pt-3 text-xl">
              <input type="radio" name="exampleRadios" defaultChecked />
              <p className="text-left">&nbsp;เข้ารักษาครั้งแรก</p>
            </div>
            <div className="flex text-xl">
              <input type="radio" name="exampleRadios" />
              <p className="text-left">&nbsp;เข้ารักษาแบบต่อเนื่อง</p>
            </div>
            <div className="flex text-xl">
              <select className="select select-bordered w-64 max-w-xs">
                <option></option>
              </select>
            </div>

            <div className="modal-action">
              {/* <Link
                                    href={`/aia/opd/opdDischarge`}
                                  >  */}
              <button
                className="btn btn-neutral text-base-100"
                onClick={confirmButton}
              >
                ยืนยัน
              </button>
              {/* </Link>  */}
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
