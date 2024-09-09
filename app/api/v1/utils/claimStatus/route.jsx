export async function GET() {
  return Response.json([
      {
        StatusDescTH: "จ่ายค่าสินไหมทดแทนแล้ว",
        StatusDescEN: "Settle",
      },
      {
        StatusDescTH: "อนุมัติการเรียกร้องสินไหม",
        StatusDescEN: "Approve",
      },
      {
        StatusDescTH: "กำลังพิจารณา",
        StatusDescEN: "Processing",
      },
      {
        StatusDescTH: "ไม่อนุมัติการเรียกร้องสินไหมครั้งนี้",
        StatusDescEN: "Decline",
      },
      {
        StatusDescTH: "ยกเลิกรายการ",
        StatusDescEN: "Cancelled",
      },
      {
        StatusDescTH: "ไม่พบข้อมูล",
        StatusDescEN: "Not Applicable",
      },
      {
        StatusDescTH: "ขอเอกสารเพิ่มเติม",
        StatusDescEN: "Pending",
      },
      {
        StatusDescTH: "ได้รับเอกสารแล้ว",
        StatusDescEN: "Received",
      },
      {
        StatusDescTH: "ได้รับเอกสารเพิ่มเติมแล้ว",
        StatusDescEN: "AddDoc",
      },
    ],
  );
}