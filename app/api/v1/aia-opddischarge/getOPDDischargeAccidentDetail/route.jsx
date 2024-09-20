import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
    Result: {
      AccidentDetailInfo: {
        AccidentPlace: "3",
        AccidentDate: "2024-08-01",
        CauseOfInjuryDetail: [
            {
                CauseOfInjury: "W1099",
                CommentOfInjury: "Fall"
            }
        ],
        InjuryDetail: [
            {
                WoundType: "Contusion",
                InjurySide: "Left",
                InjuryArea: "S099"
            }
        ]
  },
  }
  });
}
