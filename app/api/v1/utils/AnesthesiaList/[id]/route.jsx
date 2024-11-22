export async function GET() {
  return Response.json([
    {
      id: "L",
      AnesthesiaListDesc: "Local Anesthesia (การฉีดยาชาเฉพาะที่)",
    },
    {
      id: "G",
      AnesthesiaListDesc: "General Anesthesia (การดมยาสลบ)",
    },
    {
      id: "S",
      AnesthesiaListDesc: "Spinal Anesthesia (การฉีดยาชาเข้าช่องไขสันหลัง)",
    },
    {
      id: "B",
      AnesthesiaListDesc: "Brachial Block (การฉีดยาชาเข้าเส้นประสาท)",
    },

   
  ]);
}
