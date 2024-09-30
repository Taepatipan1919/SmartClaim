import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    // console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json([
    {
        CauseOverCode : "1",
        CauseOverDesc : "ติดตามการรักษากระดูกหัก (Follow-up after bone fracture)"
    },
    {
        CauseOverCode : "2",
        CauseOverDesc : "ติดตามการรักษาผ่าตัดใหญ่จากอุบัติเหตุ (Follow-up after major surgery)"
    },
    {
        CauseOverCode : "3",
        CauseOverDesc : "ติดตามการรักษาแผลไฟไหม้น้ำร้อนลวกระดับ 3 (Follow-up after 3rd degree burn)"
    },
    {
        CauseOverCode : "4",
        CauseOverDesc : "ติดตามการรักษาเอ็นหรือเส้นประสาทฉีกขาด (Follow-up after torn tendon / torn nerve)"
    },
    {
        CauseOverCode : "5",
        CauseOverDesc : "ติดตามการรักษาสมองหรือไขสันหลังบาดเจ็บในระดับรุนแรง (Follow-up after severe brain injury / spinal cord injury)"
    },
    {
        CauseOverCode : "6",
        CauseOverDesc : "ฉีดวัคซีนบาดทะยักเข็มที่ 3 (Tetanus toxoid II, III)"
    },
    {
        CauseOverCode : "8",
        CauseOverDesc : "อื่น ๆ (Not all of the above)"
    },
]
  );
}
