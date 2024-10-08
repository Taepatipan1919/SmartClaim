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
        "RefID": "",
        "TransactionNo": "",
        "PID": "1160100078831",
        "PassportNumber": "",
        "IdType": "HOSPITAL_ID",
        "ServiceSettingCode": "I",
        "InsurerCode": null,
        "HN": "52-058092",
        "VN": "",
        "VisitDatefrom": "2024-09-05",
        "VisitDateto": null
    },
    "Result": {
        "PatientInfo": {
            "PatientID": "456114",
            "PID": "1103701284544",
            "PassportNumber": "",
            "HN": "52-058092",
            "TitleTH": "นาย",
            "GivenNameTH": "วุฒิชัย",
            "SurnameTH": "เห่ววิพัฒน์",
            "TitleEN": "MR.",
            "GivenNameEN": "VUDHICHAI",
            "SurnameEN": "HELVIPHAT",
            "DateOfBirth": "1993-12-19",
            "Gender": "ชาย",
            "MobilePhone": "0875182319"
        },
        "EpisodeInfo": [
            {
                "VN": "I010162-67",
                "EpisodeType": "In Patient",
                "VisitDate": "09/05/2024",
                "VisitTime": "17:51:00",
                "VisitDateTime": "09/05/2024 17:51:00",
                "AccidentDate": "04/05/2024",
                "LocationCode": "4144",
                "LocationDesc": "อายุรกรรม",
                "WardCode": "3720",
                "WardDesc": "หอผู้ป่วยชั้น 19ES",
                "BedCode": "19E03",
                "MainCareproviderCode": "45808",
                "MainCareproviderDesc": "พญ. สลิลนาท พานประเสริฐ ",
                "DoctorLicense": "45808",
                "DoctorFirstName": "",
                "DoctorLastName": "",
                "SurgeryType": ""
            }
        ]
    }
});
}
