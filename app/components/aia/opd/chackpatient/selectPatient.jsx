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

  useEffect(() => {
    const getClaimStatus = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_URL_claimStatus);

      const data = await response.json();
      setClaimStatus(data);
    };
    getClaimStatus();
  }, []);
  //console.log(claimStatus);
  const handleSubmit = (event) => {
    event.preventDefault();

    const search = {
      datefrom: event.target.datefrom.value,
      dateto: event.target.dateto.value,
      PID: event.target.PID.value,
      status: "555",
    };

    axios
      .get(process.env.NEXT_PUBLIC_URL_chackpatient)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => console.error("Error", err));
  };

  //console.log(post);
  return (
    <>
      <div className="justify-center border-solid w-11/12 m-auto border-4 rounded-lg p-4">
        <button
          className="btn btn-success text-base-100 text-lg rounded-full px-3 py-2"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <FaUserPlus /> เพิ่มผู้ป่วย
        </button>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-5 w-full">
            <div className="px-2 rounded-md">
              <p className="text-left">DateFrom</p>
              <input
                type="date"
                name="datefrom"
                id="datefrom"
                // value={post ? post.PatientInfo.HN : ""}
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">DateTo</p>
              <input
                type="date"
                name="dateto"
                // value={post ? post.PatientInfo.HN : ""}
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">บัตรประชาชน / พาสปอร์ต</p>
              <input
                type="text"
                name="PID"
                // value={post ? post.PatientInfo.HN : ""}
                className="input input-accent w-full rounded-full px-3 py-2"
                // required
              />
            </div>
            <div className="px-2 rounded-md">
              <p className="text-left">Status Claim</p>
              <select
                className="select input-accent w-full rounded-full px-3 py-2"
                name="status"
                id="status"
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
                    <FaSearch /> ค้นหา
                  </button>
                </div>
                <div className="rounded-md"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="justify-center border-solid w-11/12 m-auto border-4 rounded-lg p-4 mt-6">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-info text-base-100 text-center text-lg">
              <tr>
                <th>ลำดับ</th>
                <th>บัตรประชาชน / พาสปอร์ต</th>
                <th>รหัสผู้ป่วย (HN)</th>
                <th>ชื่อ - นามสกุล</th>
                <th>วัน/เดือน/ปีเกิด</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                {post ? (
                  post.Result.Code === "S" ? (
                    <>
                      <th className="text-center">1</th>
                      <td>
                        {post.PatientInfo.PID} {post.PatientInfo.Passport}
                      </td>
                      <td className="text-center">{post.PatientInfo.HN}</td>
                      <td>
                        {post.PatientInfo.Title}
                        {post.PatientInfo.FirstName} {post.PatientInfo.LastName}
                      </td>
                      <td className="text-center">{post.PatientInfo.DOB}</td>
                      <td>
                        <div className="grid gap-1 sm:grid-cols-2 w-full text-accent ">
                          <Link href={`/aia/opd/checkeilgible`}>
                            <button className="btn bg-white text-accent w-full hover:text-base-100 hover:bg-neutral">
                              {/* <RiFileUserFill /> */}
                              ตรวจสอบสิทธิ์
                            </button>
                          </Link>
                          <button
                            className="btn bg-white text-accent w-full hover:text-base-100 hover:bg-neutral"
                            onClick={() =>
                              document.getElementById("my_modal_1").showModal()
                            }
                          >
                            {/* <MdEditDocument /> */}
                            ตรวจสอบข้อมูล
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
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
            <h1 className="font-black text-accent text-3xl ">เพิ่มผู้ป่วย</h1>

            <div className="grid gap-2 sm:grid-cols-2 w-full">
              <div className="rounded-md ">
                <div className="flex items-center ">
                  <input type="radio" name="exampleRadios" defaultChecked />
                  <p className="text-left">&nbsp;เลขบัตรประชาชน</p>
                </div>
                <div className="flex items-center ">
                  <input type="radio" name="exampleRadios" />
                  <p className="text-left">&nbsp;พาสปอร์ต</p>
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
                <p className="text-left">วัน/เดือน/ปีเกิด (ค.ศ.)</p>
              </div>
              <div className="rounded-md text-center">xxxxxx</div>
              <div className="rounded-md ">
                <p className="text-left">รหัสผู้ป่วย (HN)</p>
              </div>
              <div className="rounded-md text-center">xxxxxx</div>
              <div className="rounded-md ">
                <p className="text-left">ชื่อ - นามสกุล (TH)</p>
              </div>
              <div className="rounded-md text-center">xxxxxx</div>
              <div className="rounded-md ">
                <p className="text-left">ชื่อ - นามสกุล (EN)</p>
              </div>
              <div className="rounded-md text-center">xxxxxx</div>
              <div className="rounded-md "></div>
              <div className="rounded-md ">
                <button
                  type="submit"
                  className="btn btn-accent text-base-100 text-lg rounded-full px-3 py-2 center"
                >
                  <RiSave3Fill /> บันทึก
                </button>
              </div>
            </div>
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
            <h1 className="font-black text-accent text-3xl ">แก้ไข</h1>

            <div className="grid gap-2 sm:grid-cols-3 w-full">
              <div className="rounded-md "></div>
              <div className="rounded-md text-center">DataBase</div>
              <div className="rounded-md text-center">Trakcere</div>
              <div className="rounded-md ">
                <p className="text-left">เลขบัตรประชาชน/พาสปอร์ต</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">วัน/เดือน/ปีเกิด (ค.ศ.)</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">รหัสผู้ป่วย (HN)</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">ชื่อ - นามสกุล (TH)</p>
              </div>
              <div className="rounded-md text-center">XXXXXX</div>
              <div className="rounded-md text-center">YYYYYY</div>
              <div className="rounded-md ">
                <p className="text-left">ชื่อ - นามสกุล (EN)</p>
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
