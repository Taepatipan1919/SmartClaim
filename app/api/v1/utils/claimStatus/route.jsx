export async function GET() {
  return Response.json([
      {
        StatusCode : "01",
        StatusDescTH: "จ่ายค่าสินไหมทดแทนแล้ว",
        StatusDescEN: "Settle",
        Insurerid : "13",
      },
      {
        StatusCode : "02",
        StatusDescTH: "อนุมัติการเรียกร้องสินไหม",
        StatusDescEN: "Approve",
        Insurerid : "13",
      },
      {
        StatusCode : "03",
        StatusDescTH: "กำลังพิจารณา",
        StatusDescEN: "Processing",
        Insurerid : "13",
      },
      {
        StatusCode : "04",
        StatusDescTH: "ไม่อนุมัติการเรียกร้องสินไหมครั้งนี้",
        StatusDescEN: "Decline",
        Insurerid : "13",
      },
      {
        StatusCode : "06",
        StatusDescTH: "ยกเลิกรายการ",
        StatusDescEN: "Cancelled",
        Insurerid : "13",
      },
      {
        StatusCode : "07",
        StatusDescTH: "ไม่พบข้อมูล",
        StatusDescEN: "Not Applicable",
        Insurerid : "13",
      },
      {
        StatusCode : "08",
        StatusDescTH: "ขอเอกสารเพิ่มเติม",
        StatusDescEN: "Pending",
        Insurerid : "13",
      },
      {
        StatusCode : "09",
        StatusDescTH: "ได้รับเอกสารแล้ว",
        StatusDescEN: "Received",
        Insurerid : "13",
      },
      {
        StatusCode : "10",
        StatusDescTH: "ได้รับเอกสารเพิ่มเติมแล้ว",
        StatusDescEN: "AddDoc",
        Insurerid : "13",
      },
    ],
  );
}