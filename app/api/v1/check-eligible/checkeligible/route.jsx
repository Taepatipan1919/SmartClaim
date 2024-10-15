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
        "Result": {
            "InsuranceResult": {
                "Code": "S",
                "Message": "success",
                "MessageTh": "ทำรายการสำเร็จ"
            },
            "InsuranceData": {
                "RefId": "pEKhwJse+NHAEc0sSghKp8bNr83caECQjC+vvuEaIKY=",
                "TransactionNo": "e44a7b54-cfb1-4570-8667-8b78d7191ac8",
                "InsurerCode": "13",
                "CoverageClaimStatus": true,
                "RemarkList": [],
                "PolicyCoverageDesc": [],
                "CoverageList": [
                    {
                        "Type": "ผลประโยชน์ค่ารักษาพยาบาล",
                        "Status": false,
                        "MessageList": [
                            {
                                "PolicyNo": "",
                                "PlanName": null,
                                "MessageTh": "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
                                "MessageEn": null,
                                "RuleNo": "success"
                            },
                            {
                                "PolicyNo": "",
                                "PlanName": null,
                                "MessageTh": "คุณไม่สามารถใช้สิทธิ์เรียกร้องสินไหม",
                                "MessageEn": null,
                                "RuleNo": null
                            },
                            {
                                "PolicyNo": "P3xxxxxx96",
                                "PlanName": null,
                                "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                                "MessageEn": null,
                                "RuleNo": "NOT_PASS"
                            },
                            {
                                "PolicyNo": "T4xxxxxx71",
                                "PlanName": null,
                                "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                                "MessageEn": null,
                                "RuleNo": "NOT_PASS"
                            }
                        ]
                    },
                    {
                        "Type": "ผลประโยชน์ค่ารักษาพยาบาลที่ต้องตรวจสอบความคุ้มครองโดยเจ้าหน้าที่ AIA",
                        "Status": false,
                        "MessageList": [
                            {
                                "PolicyNo": "",
                                "PlanName": null,
                                "MessageTh": "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
                                "MessageEn": null,
                                "RuleNo": "success"
                            },
                            {
                                "PolicyNo": "",
                                "PlanName": null,
                                "MessageTh": "คุณไม่สามารถใช้สิทธิ์เรียกร้องสินไหม",
                                "MessageEn": null,
                                "RuleNo": null
                            },
                            {
                                "PolicyNo": "P3xxxxxx96",
                                "PlanName": null,
                                "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                                "MessageEn": null,
                                "RuleNo": "NOT_PASS"
                            },
                            {
                                "PolicyNo": "T4xxxxxx71",
                                "PlanName": null,
                                "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                                "MessageEn": null,
                                "RuleNo": "NOT_PASS"
                            }
                        ]
                    },
                    {
                        "Type": "ผลประโยชน์ค่าชดเชย",
                        "Status": true,
                        "MessageList": [
                            {
                                "PolicyNo": "",
                                "PlanName": null,
                                "MessageTh": "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
                                "MessageEn": null,
                                "RuleNo": "success"
                            },
                            {
                                "PolicyNo": "",
                                "PlanName": null,
                                "MessageTh": "คุณไม่สามารถใช้สิทธิ์เรียกร้องสินไหม",
                                "MessageEn": null,
                                "RuleNo": null
                            },
                            {
                                "PolicyNo": "P3xxxxxx96",
                                "PlanName": null,
                                "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                                "MessageEn": null,
                                "RuleNo": "NOT_PASS"
                            },
                            {
                                "PolicyNo": "T4xxxxxx71",
                                "PlanName": null,
                                "MessageTh": "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
                                "MessageEn": null,
                                "RuleNo": "NOT_PASS"
                            }
                        ]
                    }
                ],
                "PolicyInfoList": []
            },
            "InsuranceCustomerDetail": {
                "PolicyNo": "P3xxxxxx96",
                "MemberShipId": "",
                "FirstName": "เทxxxxxxx้า",
                "LastName": "เอxxไอ",
                "NationalId": "31xxxxxxxxx45"
            }
        }
        })
  }
  