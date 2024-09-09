export async function GET(request, { params }) {
  // if (params.id === "1103900068701" && params.date === "2024-08-24") {
  // if (params.id === "66021995") {
  console.log("ดึงข้อมูลเช็คสำเร็จ");
  return Response.json({
    Result: {
      Code: "S",
      Message: "success",
      MessageTh: "ทำรายการสำเร็จ",
    },
    PatientInfo: {
      PID: "1103900068701",
      PIDEncrypt: "1103900068701Eng",
      Passport: "",
      PassportEncrypt: "",
      HN: "66-021995",
      Title: "นาย",
      Gender: "ผู้ชาย",
      FirstName: "ปฏิภาณ",
      LastName: "ไขไพรวัน",
      DOB: "19/10/2000",
      IdType: "NATIONAL_ID",
    },
    EpisodeInfo: [
      {
        VN: "I66-021574",
        Episodetype: "I",
        VisitDate: "2024-01-31",
        VisitTime: "12:00",
        VisitDateTime: "2024-01-31 12:00",
        AccidentDate: "2024-01-31",
        LocationCode: "2543",
        LocationDesc: "คลินิกอายุรกรรม",
        WardCode: "",
        WardDesc: "",
        BedCode: "",
        MainCareproviderCode: "C220266",
        DoctorLicense: "PM271045",
        DoctorFirstName: "ปริญญา",
        DoctorLastName: "แสนลคร",
        MainCareproviderDecs: "พญ. ปริญญา แสนลคร",
        SurgeryType: "N",
        DoctorRole: "OWNER",
      },
      {
        VN: "I66-099999",
        Episodetype: "I",
        VisitDate: "2024-01-31",
        VisitTime: "17:59",
        VisitDateTime: "2024-01-31 59:00",
        AccidentDate: "2024-01-31",
        LocationCode: "2543",
        LocationDesc: "คอมพิวเตอร์",
        WardCode: "",
        WardDesc: "",
        BedCode: "",
        MainCareproviderCode: "C220266",
        DoctorLicense: "PM271045",
        DoctorFirstName: "สมชาย",
        DoctorLastName: "รักชาติ",
        MainCareproviderDecs: "นพ. สมชาย รักชาติ",
        SurgeryType: "N",
        DoctorRole: "OWNER",
      },
    ],
  });
  // } else {
  //   console.log("ดึงข้อมูลเช็คไม่สำเร็จ");
  //   return Response.json({
  //     Result: {
  //       Code: "E",
  //       Message: "Error",
  //       MessageTh: "ทำรายการไม่สำเร็จ",
  //     },
  //   });
  // }
}
