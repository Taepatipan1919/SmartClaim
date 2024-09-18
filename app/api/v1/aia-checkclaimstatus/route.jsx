import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const TransactionQuery = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
      
        
            HTTPStatus: {
                statusCode: 200,
                message: "success",
                error: ""
            },
            TransactionQuery,
            Result: [
            {
                HN: "61-022789",
                VN: "O458789-66",
                TitleTH: "นาย",
                GivenNameTH: "กฤษณ์",
                SurnameTH: "จันทรวงศ์",
                TitleEN: "MR.",
                GivenNameEN: "KRIT",
                SurnameEN: "CHANTARAWONG",
                Invoice: "072023012",
                ClaimNo: "C012345678",
                IllnessType: "ACC",
                status: "Received",
                TotalAmount: "2299",
                VisitDateTime: "2024-09-18",
            },
            {
                HN: "61-022789",
                VN: "O798212-67",
                TitleTH: "นาย",
                GivenNameTH: "กฤษณ์",
                SurnameTH: "จันทรวงศ์",
                TitleEN: "MR.",
                GivenNameEN: "KRIT",
                SurnameEN: "CHANTARAWONG",
                Invoice: "02751568",
                ClaimNo: "C45103495",
                IllnessType: "ILL",
                status: "Processing",
                TotalAmount: "1960",
                VisitDateTime: "2024-09-07",
            },
        ],
        })
  }
  