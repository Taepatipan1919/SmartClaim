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
                "VisitInfo": {
                    "VisitDate": "2024-03-16",
                    "VisitTime": "08:15",
                    "VisitDateTime": "2024-03-16 08:15",
                    "Vn": "O144009-67",
                    "HN": "61-022789",
                    "FullName": "กฤษณ์   จันทรวงศ์"
                },
            BillingInfo: [
                {
                    "LocalBillingCode": "0101001",
                    "LocalBillingName": "1.1.1(1) ค่ายาบัญชี ก",
                    "SimbBillingCode": "1.1.1(1)",
                    "BillingInitial": "350",
                },
                {
                    "LocalBillingCode": "0114021",
                    "LocalBillingName": "1.1.14(2.1) ค่าบริการโรงพยาบาลกรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.1.14(2.1)",
                    "BillingInitial": "150",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                },
                {
                    "LocalBillingCode": "0121001",
                    "LocalBillingName": "1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก",
                    "SimbBillingCode": "1.2.1(1)",
                    "BillingInitial": "500",
                }

            ],
        },
        })
  }
  