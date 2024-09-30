import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
    Result : {
      VisitInfo:{
        FurtherClaimId: "",
        AdditionalNote: "",
        AlcoholRelated: true,
        ChiefComplaint: "fall",
        ComaScore: "15",
        DxFreeText: "fall with contusion",
        ExpectedDayOfRecovery: "45",
        Height: "180",
        PhysicalExam: "contusion",
        PlanOfTreatment: "",
        Pregnant: false,
        PresentIllness: "fall with contusion",
        PreviousTreatmentDate: "",
        PreviousTreatmentDetail: "",
        PrivateCase: true,
        ProcedureFreeText: "",
        SignSymptomsDate: "2024-09-01",
        UnderlyingCondition: "DM",
        VisitDateTime: "2024-09-01 00:00",
        VN: "VN2024OPD",
        Weight: "60"
    },
  },
  });
}
