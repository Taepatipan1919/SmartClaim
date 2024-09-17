export async function GET() {
  return Response.json({
    Result: {
      Procedure: [
        {
          Icd9: "",
          ProcedureDate: "",
          ProcedureName: ""
      }
    ],
    },
  });
}
