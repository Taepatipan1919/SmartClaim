import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
    Result: {
      DiagnosisInfo: [
        {
            DxName: "Fall on and from stairs and steps: at unspec place: during unspec activity",
            Dxtypenameinsurance: "PP",
            DxCode: "W1099"
        },
        {
            DxName: "Unspecified injury of head [HI]",
            Dxtypenameinsurance: "PP",
            DxCode: "S099"
        },
        {
            DxName: "Type 2 diabetes mellitus Without complications",
            Dxtypenameinsurance: "CM",
            DxCode: "E119"
        }
    ],
    },
  });
}
