import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
      
        "HTTPStatus": {
            "statusCode": 200,
            "message": "success",
            "error": ""
        },
        "Result": {
            "PatientInfo": [
                {
                    "PatientID": "835609",
                    "PID": "1160100078831",
                    "PassportNumber": "ABC12345",
                    "HN": "61-022789",
                    "TitleTH": "นาย",
                    "GivenNameTH": "กฤษณ์",
                    "SurnameTH": "จันทรวงศ์",
                    "TitleEN": "MR.",
                    "GivenNameEN": "KRIT",
                    "SurnameEN": "CHANTARAWONG",
                    "DateOfBirth": "1985-07-15",
                    "Gender": "ชาย",
                    "MobilePhone": "0899232557"
                },
             ],
            }
        })
  }
  