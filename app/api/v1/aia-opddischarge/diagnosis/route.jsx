export async function GET() {
  return Response.json({
    DataJson: {
      Diagnosis: [
      {
        DxName: "",
        DxType: "PP",
        Icd10: "X599T149",
    },
    {
      DxName: "",
      DxType: "CP",
      Icd10: "X599T149",
  },
  ]
    },
  });
}
