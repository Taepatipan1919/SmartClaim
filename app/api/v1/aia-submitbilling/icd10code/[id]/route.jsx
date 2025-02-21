import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const TransactionQuery = await request.json();
    // console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
            HTTPStatus: {
                statusCode: 200,
                message: "success",
                error: ""
            },
            Result: {
                DiagnosisInfo: [
                    {
                        "DxName": "MCA",
                        "DxType": "PP",
                        "Icd10": "V2999"
                    },
                    {
                        "DxName": "Fracture of upper end of radius: closed",
                        "DxType": "PP",
                        "Icd10": "S5210"
                    },
                    {
                        "DxName": "Type 2 diabetes mellitus Without complications",
                        "DxType": "CM",
                        "Icd10": "E119"
                    }
                ],
        },
        })
  }
  