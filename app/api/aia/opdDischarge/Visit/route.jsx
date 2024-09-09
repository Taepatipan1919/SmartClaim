export async function GET() {
  return Response.json({
    DataJson: {
      Visit:{
      PatienPreviousTreatmentDate: "",
      PatienPreviousTreatmentDetail: "",
      PatienPrivateCase: "flase",
      PatienSignSymptomsDate: "",
      PatienUnderlyingCondition: "",
      PatienWeight: "",
    },
    },
  });
}
