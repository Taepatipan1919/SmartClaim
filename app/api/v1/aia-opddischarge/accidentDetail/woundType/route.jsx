export async function GET() {
  return Response.json({
    Result: [
      {
        Code : "Abrasion",
        Desc : "แผลถลอก (Abrasion wound)",
      },
      {
        Code : "Contusion",
        Desc : "แผลช้ำเขียวหรือฟกช้ำ (Contusion wound)",
      },
      {
        Code : "Laceration",
        Desc : "แผลฉีกขาด(Laceration wound)",
      },
      {
        Code : "Puncture",
        Desc : "แผลโดนแทง (Puncture wound)",
      },
      {
        Code : "Gunshot",
        Desc : "แผลช้ำเขียวหรือฟกช้ำ (Contusion wound)",
      },
      {
        Code : "Contusion",
        Desc : "แผลกระสุนปืน (Gunshot wound)",
      },
      {
        Code : "Avulsion",
        Desc : "แผลหลุดหาย (Avulsion wound)",
      },
      {
        Code : "Fracture",
        Desc : "แผลกระดูกหัก (Fracture wound)",
      },
      {
        Code : "Amputation",
        Desc : "แผลถูกตัดขาด (Amputation wound)",
      },
      {
        Code : "Burn",
        Desc : "น้ำร้อนลวก (Burn wound)",
      },
      {
        Code : "Chemical",
        Desc : "แผลถูกสารเคมีหรือสารพิษ (Chemical wound)",
      },
      {
        Code : "Other",
        Desc : "แผลอื่น ๆ (Other wound))",
      },
    ]
  });
}