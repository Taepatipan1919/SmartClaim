export async function GET() {
  return Response.json({
    PatientInfo: {
      HN: "66-021995",
      Title: "นาย",
      FirstName: "ปฏิภาณ",
      LastName: "ไขไพรวัน",
      Gender: "ผู้ชาย",
      DOB: "2000-10-19",
      PID: "1103900068701",
      Passport: "",
    },
    EpisodeInfo: {
      VN: "I66-021574",
      VisitDate: "2024-01-31",
      VisitTime: "12:00",
      VisitDateTime: "2024-01-31 12:00",
      DoctorLicense: "PM271045",
      DoctorFirstName: "ปริญญา",
      DoctorLastName: "แสนลคร",
      DoctorRole: "OWNER",
    },
  });
}
