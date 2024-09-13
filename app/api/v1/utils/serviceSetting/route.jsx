export async function GET() {
  return Response.json({
    {
      "ServiceSettingCode": "OPD",
      "ServiceSettingDesc": "ผู้ป่วยนอก",
      "insurerid": 13,
      "insurers": {
          "insurercode": 13,
          "insurername": "เอไอเอ"
      }
  },
  {
      "ServiceSettingCode": "IPD",
      "ServiceSettingDesc": "ผู้ป่วยใน",
      "insurerid": 13,
      "insurers": {
          "insurercode": 13,
          "insurername": "เอไอเอ"
      }
  },
  {
      "ServiceSettingCode": "PRE",
      "ServiceSettingDesc": "ส่งพิจารณาเคลมก่อนทำการผ่าตัด (Pre-Authorization, Pre-Arrangement)",
      "insurerid": 13,
      "insurers": {
          "insurercode": 13,
          "insurername": "เอไอเอ"
      }
  }
  });
}
