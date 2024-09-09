export async function GET() {
  return Response.json([
    {
      id: 1,
      InsurerCode: 13,
      PolicyTypeCode: "IB",
      PolicyTypeDesc: "ประกันรายบุคคล",
    },
    {
      id: 2,
      InsurerCode: 13,
      PolicyTypeCode: "CS",
      PolicyTypeDesc: "ประกันกลุ่ม",
    },
  ]);
}
