export async function GET() {
  return Response.json({
    Result: {
      Investigation: [
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
