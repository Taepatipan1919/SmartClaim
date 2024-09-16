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
            "TransactionQuery": {
                "RefID": "O61-028993-ppp-ooo-o1",
                "TransactionNo": "XXXXX",
                "PID": "1160100078831",
                "PassportNumber": "ABC12345",
                "IdType": "PASSPORT_NO",
                "StatusClaimCode": "01",
                "InsurerCode": 13,
                "HN": "61-022781",
                "VN": "O61-028993",
                "VisitDatefrom": "2024-08-15",
                "VisitDateto": "2024-08-06"
            },
            "Result": {
                "PatientInfo": {
                    "PatientDatabase": {
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
                    "PatientTrakcare": {
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
                    }
                }
            }
        
        })
  }
  