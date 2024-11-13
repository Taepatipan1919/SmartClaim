import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
 //  console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json(
        {
            "HTTPStatus": {
                "statusCode": 200,
                "message": "success",
                "error": ""
            },
            "Result": {
                "ClaimFormListInfo": [
                    {
                        "VN": "O518488-67",
                        "VisiDate": "06/08/2023",
                        "LocationDesc": "ศัลยกรรมกระดูกและข้อ",
                        "DoctorFirstName": "นพ. กิตติภูมิ โชคจรัสกิจ(FT)",
                        "PresentIllness": "injury 29/7/66 ก้าวแล้วเข่าพลิกมีเสียงที่เข่า",
                        "DiagnosisInfo": [
                            {
                                "DxCode": "M626",
                                "DxName": "Other specified orthopaedic follow-up care"
                            }
                        ]
                    },
                    {
                        "VN": "O592279-67",
                        "VisiDate": "30/07/2023",
                        "LocationDesc": "ศัลยกรรมกระดูกและข้อ",
                        "DoctorFirstName": "",
                        "PresentIllness": "",
                        "DiagnosisInfo": [
                            {
                                "DxCode": "M626",
                                "DxName": "Muscle strain"
                            }
                        ]
                    },
                    {
                        "VN": "O390182-66",
                        "VisiDate": "23/07/2023",
                        "LocationDesc": "ศัลยกรรมกระดูกและข้อ",
                        "DoctorFirstName": "นพ. กิตติภูมิ โชคจรัสกิจ(FT)",
                        "PresentIllness": "f/u ปวดเข่าด้านขวา 2 wk ปวดมากกว่าน่อง\r\n\r\nทำงาน supervisor ต้องเดินตรวจงาน\r\nขึ้นลงบันไดมาก ยืนเดินมาก\r\n\r\nno ud ไม่แพ้ยา / f/u ปวดน่อง + หลังเข่าด้านขวา 2 wk\r\n\r\nทำงาน supervisor ต้องเดินตรวจงาน\r\n\r\nno ud ไม่แพ้ยา / f/u ปวดเข่าด้านขวา 2 wk ปวดมากกว่าน่อง\r\n\r\nทำงาน supervisor ต้องเดินตรวจงาน\r\n\r\nno ud ไม่แพ้ยา",
                        "DiagnosisInfo": [
                            {
                                "DxCode": "Z478",
                                "DxName": "Other specified orthopaedic follow-up care"
                            }
                        ]
                    },
                    {
                        "VN": "O369757-66",
                        "VisiDate": "12/07/2023",
                        "LocationDesc": "ศัลยกรรมกระดูกและข้อ",
                        "DoctorFirstName": "",
                        "PresentIllness": "ปวดน่อง + หลังเข่าด้านขวา 2 วัน\r\n\r\nทำงาน supervisor ต้องเดินตรวจงาน\r\n\r\nno ud ไม่แพ้ยา",
                        "DiagnosisInfo": [
                            {
                                "DxCode": "M7919",
                                "DxName": "Myalgia: site unspecified"
                            }
                        ]
                    },
                    {
                        "VN": "O300305-66",
                        "VisiDate": "06/06/2023",
                        "LocationDesc": "ศัลยกรรมกระดูกและข้อ",
                        "DoctorFirstName": "",
                        "PresentIllness": "",
                        "DiagnosisInfo": [
                            {
                                "DxCode": "M5456",
                                "DxName": "Low back pain Lumbar region"
                            },
                            {
                                "DxCode": "M722",
                                "DxName": "Plantar fascial fibromatosis"
                            }
                        ]
                    }
                ]
            }
        }
    );
}
