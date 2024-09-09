export async function GET() {
  return Response.json([
    {
      id: 1,
      InsurerCode: 13,
      IllnessTypeCode: "ILL",
      IllnessTypeDesc: "เจ็บป่วย",
    },
    {
      id: 2,
      InsurerCode: 13,
      IllnessTypeCode: "ACC",
      IllnessTypeDesc: "อุบัติเหตุ (เกิน 24 ชม.)",
    },
    {
      id: 3,
      InsurerCode: 13,
      IllnessTypeCode: "ER",
      IllnessTypeDesc: "อุบัติเหตุ (ฉุกเฉินภายใน 24 ชม.)",
    },
    {
      id: 4,
      InsurerCode: 13,
      IllnessTypeCode: "DEN",
      IllnessTypeDesc: "ทันตกรรม",
    },
    {
      id: 5,
      InsurerCode: 13,
      IllnessTypeCode: "DAY",
      IllnessTypeDesc: "DAY CASE",
    },
    {
      id: 6,
      InsurerCode: 13,
      IllnessTypeCode: "MAT",
      IllnessTypeDesc: "Maternity",
    },
    {
      id: 7,
      InsurerCode: 13,
      IllnessTypeCode: "HD",
      IllnessTypeDesc: "ผู้ป่วยนอก ล้างไต",
    },
    {
      id: 8,
      InsurerCode: 13,
      IllnessTypeCode: "CMT",
      IllnessTypeDesc: "ผู้ป่วยนอก เคมี/รังสีบำบัด",
    },
    {
      id: 9,
      InsurerCode: 13,
      IllnessTypeCode: "CHK",
      IllnessTypeDesc: "ผู้ป่วยนอก ตรวจสุขภาพ",
    },
    {
      id: 10,
      InsurerCode: 13,
      IllnessTypeCode: "VAC",
      IllnessTypeDesc: "ผู้ป่วยนอก วัคซีน",
    },
    {
      id: 11,
      InsurerCode: 13,
      IllnessTypeCode: "FU",
      IllnessTypeDesc: "ผู้ป่วยนอก เจ็บป่วย (นัดติดตามอาการหลังจาก Admit)",
    },
  ]);
}
