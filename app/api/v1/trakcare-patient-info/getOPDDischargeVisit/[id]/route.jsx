export async function GET() {
  return Response.json({
    Result : {
      VisitInfo:{
        FurtherClaimId: "",
        AdditionalNote: "AdditionalNote",
        AlcoholRelated: true,
        ChiefComplaint: "fall",
        ComaScore: "15",
        DxFreeText: "Type 2 diabetes mellitus, without complications   ,Essential (primary) hypertension   ,Mixed hyperlipidaemia   ,Acute nasopharyngitis [common cold]",
        ExpectedDayOfRecovery: "45",
        Height: "180",
        PhysicalExam: "contusion",
        PlanOfTreatment: "PlanOfTreatment",
        Pregnant: false,
        PresentIllness: "fall with contusion",
        PreviousTreatmentDate: "PreviousTreatmentDate",
        PreviousTreatmentDetail: "PreviousTreatmentDetail",
        PrivateCase: true,
        ProcedureFreeText: "ProcedureFreeText",
        SignSymptomsDate: "2024-10-19",
        UnderlyingCondition: "DM",
        VisitDateTime: "2024-09-01 00:00",
        VN: "O415202-67",
        Weight: "60"
    },
  },
  });
}
