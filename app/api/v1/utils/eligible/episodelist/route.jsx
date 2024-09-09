import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const date = await request.json();
  return NextResponse.json({
    Result: {
      Code: "S",
      Message: "success",
      MessageTh: "ทำรายการสำเร็จ",
    },
    Data: {
      RefId: "oljhnklefhbilubsEFJKLb651",
      TransactionNo: "16a793d4-d525-4780-8396-801e43dfcb1f",
      InsurerCode: "13",
      Insurer: "AIA",
      CoverageClaimStatus: true,
      RemarkList: [],
      PolicyCoverageDesc: [],
      CoverageList: [
        {
          Type: "HS",
          TypeTh: "ผลประโยชน์ค่ารักษาพยาบาล",
          Status: true,
          MessageList: [
            {
              PolicyNo: "OOzzLf31i2MNfIiLlFwt3A==",
              PlanName: "ME",
              MessageTh: "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
              MessageEn: null,
              RuleNo: "PASS",
            },
            {
              PolicyNo: "1w5ezGYYui/OL6bzVzewIg==",
              PlanName: "Infinite care (new standard)",
              MessageTh: "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
              MessageEn: null,
              RuleNo: "PASS",
            },
            {
              PolicyNo: "1w5ezGYYui/OL6bzVzewIg==",
              PlanName: "H&S Extra (new standard)",
              MessageTh: "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
              MessageEn: null,
              RuleNo: "PASS",
            },
            {
              PolicyNo: "1w5ezGYYui/OL6bzVzewIg==",
              PlanName: "H&S (New standard)",
              MessageTh: "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
              MessageEn: null,
              RuleNo: "PASS",
            },
            {
              PolicyNo: "v0aqmirs9/CowezoRnJO3Q==",
              PlanName: "AIA e-Smart Health",
              MessageTh: "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
              MessageEn: null,
              RuleNo: "PASS",
            },
          ],
        },
        {
          Type: "HSBypass",
          TypeTh:
            "ผลประโยชน์ค่ารักษาพยาบาลที่ต้องตรวจสอบความคุ้มครองโดยเจ้าหน้าที่ AIA",
          Status: true,
          MessageList: [
            {
              PolicyNo: "",
              PlanName: null,
              MessageTh:
                "กรณีไม่สามารถใช้สิทธิ์เรียกร้องสินไหมและต้องการให้เจ้าหน้าที่ AIA พิจารณาเคส สามารถส่งพิจารณาโดยเลือก ตรวจสอบความคุ้มครองโดยเจ้าหน้าที่ AIA ทั้งนี้ในกรณีที่ AIA ได้แจ้งผลการพิจารณาเบื้องต้นว่าไม่สามารถใช้สิทธิ์ได้ บริษัทขอสงวนสิทธิ์ไม่คุ้มครองค่ารักษาพยาบาล หากทางเจ้าหน้าที่ AIA ได้ทำการพิจารณาเอกสารทั้งหมดแล้ว",
              MessageEn: null,
              RuleNo: "PASS",
            },
          ],
        },
        {
          Type: "AI",
          TypeTh: "ผลประโยชน์ค่าชดเชย",
          Status: false,
          MessageList: [
            {
              PolicyNo: "OOzzLf31i2MNfIiLlFwt3A==",
              PlanName: null,
              MessageTh: "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
              MessageEn: null,
              RuleNo: "NOT_PASS",
            },
            {
              PolicyNo: "1w5ezGYYui/OL6bzVzewIg==",
              PlanName: null,
              MessageTh: "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
              MessageEn: null,
              RuleNo: "NOT_PASS",
            },
            {
              PolicyNo: "v0aqmirs9/CowezoRnJO3Q==",
              PlanName: null,
              MessageTh: "ไม่สามารถใช้บริการเรียกร้องสินไหมได้",
              MessageEn: null,
              RuleNo: "NOT_PASS",
            },
          ],
        },
      ],
      PolicyInfoList: null,
    },
  });
}
