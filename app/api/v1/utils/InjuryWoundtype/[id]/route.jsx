export async function GET() {
  return Response.json([
      {
        woundtypecode : "Abrasion",
        woundtypename : "แผลถลอก (Abrasion wound)",
      },
      {
        woundtypecode : "Contusion",
        woundtypename : "แผลช้ำเขียวหรือฟกช้ำ (Contusion wound)",
      },
      {
        woundtypecode : "Laceration",
        woundtypename : "แผลฉีกขาด(Laceration wound)",
      },
      {
        woundtypecode : "Puncture",
        woundtypename : "แผลโดนแทง (Puncture wound)",
      },
      {
        woundtypecode : "Gunshot",
        woundtypename : "แผลช้ำเขียวหรือฟกช้ำ (Contusion wound)",
      },
      {
        woundtypecode : "Contusion",
        woundtypename : "แผลกระสุนปืน (Gunshot wound)",
      },
      {
        woundtypecode : "Avulsion",
        woundtypename : "แผลหลุดหาย (Avulsion wound)",
      },
      {
        woundtypecode : "Fracture",
        woundtypename : "แผลกระดูกหัก (Fracture wound)",
      },
      {
        woundtypecode : "Amputation",
        woundtypename : "แผลถูกตัดขาด (Amputation wound)",
      },
      {
        woundtypecode : "Burn",
        woundtypename : "น้ำร้อนลวก (Burn wound)",
      },
      {
        woundtypecode : "Chemical",
        woundtypename : "แผลถูกสารเคมีหรือสารพิษ (Chemical wound)",
      },
      {
        woundtypecode : "Other",
        woundtypename : "แผลอื่น ๆ (Other wound))",
      },
    ]);
}