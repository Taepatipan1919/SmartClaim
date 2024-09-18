import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const TransactionQuery = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
      
        
            "HTTPStatus": {
                "statusCode": 200,
                "message": "success",
                "error": ""
            },
            TransactionQuery,
            "Result": [
            {
                "HN": "61-022789",
                "TitleTH": "นาย",
                "GivenNameTH": "กฤษณ์",
                "SurnameTH": "จันทรวงศ์",
                "TitleEN": "MR.",
                "GivenNameEN": "KRIT",
                "SurnameEN": "CHANTARAWONG",
                "เลขที่การเคลม": "",
                "Invoice": "072023012",
                "IllnessType": "ACC",
                "status": "Received",
                "TotalAmount": "2299",
                "VisitDatefrom": "2024-09-17"
            },
            {
                "HN": "61-022789",
                "TitleTH": "นาย",
                "GivenNameTH": "กฤษณ์",
                "SurnameTH": "จันทรวงศ์",
                "TitleEN": "MR.",
                "GivenNameEN": "KRIT",
                "SurnameEN": "CHANTARAWONG",
                "เลขที่การเคลม": "",
                "Invoice": "042023001",
                "IllnessType": "ACC",
                "status": "Received",
                "TotalAmount": "1360",
                "VisitDatefrom": "2024-09-10"
            },
        ],
        })
  }
  