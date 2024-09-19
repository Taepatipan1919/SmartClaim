export async function GET() {
  return Response.json({
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
