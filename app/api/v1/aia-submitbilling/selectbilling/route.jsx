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
            Result: {
                Data : [
            {
                RefId: "oljhnklefhbilubsEFJKLb651",
                TransactionNo: "70816a0d-107a-4772-9838-4578e874a172",
                HN: "437536-45",
                VN: "O477382-67",
                TitleTH: "นาย",
                GivenNameTH: "กฤษณ์",
                SurnameTH: "จันทรวงศ์ 1",
                TitleEN: "MR.",
                GivenNameEN: "KRIT",
                SurnameEN: "CHANTARAWONG",
                invoicenumber: "072023012",
                ClaimNo: "C012345678",
                IllnessType: "ACC",
                Claimstatuscode: "09",
                ClaimstatusName: "ได้รับเอกสารแล้ว",
                TotalAmount: "2299",
                VisitDateTime: "2024-09-18",
                batchnumber: "025-240807-02",
                PID: "1103900068701",
                PassportNumber: "",
                SurgeryTypeCode: "N",
                FurtherClaimId: "",
                FurtherClaimNo: "",
                DateOfBirth: "2000-10-19",
            },
            {
                RefId: "RefId2",
                TransactionNo: "7transactionNo2",
                HN: "61-022789",
                VN: "O798212-67",
                TitleTH: "นาย",
                GivenNameTH: "กฤษณ์",
                SurnameTH: "จันทรวงศ์ 2",
                TitleEN: "MR.",
                GivenNameEN: "KRIT",
                SurnameEN: "CHANTARAWONG",
                invoicenumber: "02751568",
                ClaimNo: "C45103495",
                IllnessType: "ILL",
                Claimstatuscode: "03",
                ClaimstatusName: "ได้รับเอกสารแล้ว",
                TotalAmount: "1960",
                VisitDateTime: "2024-09-07",
                batchnumber: "025-240807-02",
                PID: "1103900068701",
                PassportNumber: "",
                SurgeryTypeCode: "N",
                FurtherClaimId: "",
                FurtherClaimNo: "",
                DateOfBirth: "2000-10-19",
            },
            {
                RefId: "RefId3",
                TransactionNo: "7transactionNo2",
                HN: "61-022789",
                VN: "O798212-67",
                TitleTH: "นาย",
                GivenNameTH: "กฤษณ์",
                SurnameTH: "จันทรวงศ์ 3",
                TitleEN: "MR.",
                GivenNameEN: "KRIT",
                SurnameEN: "CHANTARAWONG",
                invoicenumber: "02751568",
                ClaimNo: "C45103495",
                IllnessType: "ILL",
                Claimstatuscode: "03",
                ClaimstatusName: "จ่ายค่าสินไหมทดแทนแล้ว",
                TotalAmount: "1960",
                VisitDateTime: "2024-09-07",
                batchnumber: "025-240807-02",
                PID: "1103900068701",
                PassportNumber: "",
                SurgeryTypeCode: "N",
                FurtherClaimId: "",
                FurtherClaimNo: "",
                DateOfBirth: "2000-10-19",
            },
                ],
        },
        })
  }
  