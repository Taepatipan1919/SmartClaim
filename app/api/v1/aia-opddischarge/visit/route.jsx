export async function GET() {
  return Response.json({
    Result : {
      Visit:{
        FurtherClaimId: "",
        AccidentCauseOver45Days: "",
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
        Vn: "VN2024OPD",
        Weight: "60"
    },
  },
  });
}
