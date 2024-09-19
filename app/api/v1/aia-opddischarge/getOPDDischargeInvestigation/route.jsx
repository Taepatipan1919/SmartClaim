export async function GET() {
  return Response.json({
    Result: {
      InvestigationInfo: [
        {
          InvestigationCode: "",
          InvestigationGroup: "",
          InvestigationName: "",
          InvestigationResult: "",
          ResultDateTime: ""
        }
    ],
  },
  });
}
