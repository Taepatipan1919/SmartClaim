import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
    Result: {
      ProcedureInfo: [
        {
            "Icd9": "5719",
            "ProcedureName": "Other cystotomy",
            "ProcedureDate": "2024-08-03"
        }
    ],
    },
  });
}
