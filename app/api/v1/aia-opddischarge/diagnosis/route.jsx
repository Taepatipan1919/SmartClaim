export async function GET() {
  return Response.json({
    Result: {
      "Diagnosis": [
        {
            "DxName": "Fall on and from stairs and steps: at unspec place: during unspec activity",
            "DxType": "PP",
            "Icd10": "W1099"
        },
        {
            "DxName": "Unspecified injury of head [HI]",
            "DxType": "PP",
            "Icd10": "S099"
        },
        {
            "DxName": "Type 2 diabetes mellitus Without complications",
            "DxType": "CM",
            "Icd10": "E119"
        }
    ],
    },
  });
}
