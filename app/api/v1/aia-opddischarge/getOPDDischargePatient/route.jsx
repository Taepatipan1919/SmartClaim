import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
    Result: {
      PatientInfo: {
      HN: "66-021995",
      Title: "นาย",
      FirstName: "ปฏิภาณ",
      LastName: "ไขไพรวัน",
      Gender: "M",
      DOB: "2000-10-19",
      PID: "1103900068701",
      Passport: "",
    },
  }
  });
}
