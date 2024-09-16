import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const date = await request.json();
  return NextResponse.json({
    "HTTPStatus": {
        "statusCode": 200,
        "message": "Succ",
        "error": ""
    },
    "TransactionQuery": {
        "RefID": "O61-028993-ppp-ooo-o1",
        "TransactionNo": "XXXXX",
        "PID": "1160100078831",
        "PassportNumber": "ABC12345",
        "IdType": "PASSPORT_NO",
        "StatusClaimCode": "01",
        "InsurerCode": null,
        "HN": "61-024057",
        "VN": "O61-028993",
        "VisitDatefrom": "2024-08-15",
        "VisitDateto": "2024-08-06"
    },
    "Result": {
        "InsuranceResult": {
            "Code": "S",
            "Message": "success",
            "MessageTh": "ทำรายการสำเร็จ"
        },
        "InsuranceData": {
            "RefId": "oljhnklefhbilubsEFJKLb651",
            "TransactionNo": null,
            "InsurerCode": "13",
            "CoverageClaimStatus": false,
            "RemarkList": [],
            "PolicyCoverageDesc": [],
            "CoverageList": [
                {
                    "Type": "HS",
                    "Status": true,
                    "MessageList": [
                        {
                            "PolicyNo": '',
      "PlanName": null,
      "MessageTh": 'สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม',
      "MessageEn": null,
      "RuleNo": 'success'
                        }
                    ]
                },
                {
                    "Type": "HSBypass",
                    "Status": false,
                    "MessageList": [
                        {
                            "PolicyNo": '',
                            "PlanName": null,
                            "MessageTh": 'คุณไม่สามารถใช้สิทธิ์เรียกร้องสินไหม',
                            "MessageEn": null,
                            "RuleNo": null
                        }
                    ]
                },
                {
                    "Type": "AI",
                    "Status": false,
                    "MessageList": [
                        {
                            "PolicyNo": "qm4PFdFIGee+OhD6Oj+a2A==",
                            "PlanName": null,
                            "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                            "MessageEn": null,
                            "RuleNo": "NOT_PASS"
                        },
                        {
                            "PolicyNo": "B2sOKncNHp+KH4ztLfKFug==",
                            "PlanName": null,
                            "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                            "MessageEn": null,
                            "RuleNo": "NOT_PASS"
                        },
                        {
                            "PolicyNo": "+bGlJdL6x4QVk2+WKBEg5A==",
                            "PlanName": null,
                            "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                            "MessageEn": null,
                            "RuleNo": "NOT_PASS"
                        }
                    ]
                }
            ],
            "PolicyInfoList": null
        },
        "InsuranceCustomerDetail": {
            "PolicyNo": "KePRwqn+yqSxwqprG+VeYg==",
            "MemberShipId": "",
            "FirstName": "faKhzfAsEaKu6GIkYGllFQ==",
            "LastName": "77aLy3NcuHyO408XRXsiDg==",
            "NationalId": "HiNMzq8Wwv8Gz7s/ESQwUw=="
        }
    }
  });
}