export async function GET() {
  return Response.json({
    
      "HTTPStatus": {
          "statusCode": 200,
          "message": "success",
          "error": ""
      },
      "Result": [
          {
              "idtypecode": "NATIONAL_ID",
              "idtypedesc_th": "หมายเลขบัตรประจำตัวประชาชน",
              "idtypedesc_en": "NATIONAL_ID",
              "insurerid": 13,
              "insurers": {
                  "insurercode": 13,
                  "insurername": "เอไอเอ"
              }
          },
          {
              "idtypecode": "PASSPORT",
              "idtypedesc_th": "หมายเลข passport",
              "idtypedesc_en": "PASSPORT",
              "insurerid": 13,
              "insurers": {
                  "insurercode": 13,
                  "insurername": "เอไอเอ"
              }
          },
          {
              "idtypecode": "MEMBERSHIP_ID",
              "idtypedesc_th": "หมายเลขประจำตัวสมาชิก",
              "idtypedesc_en": "MEMBERSHIP_ID",
              "insurerid": 13,
              "insurers": {
                  "insurercode": 13,
                  "insurername": "เอไอเอ"
              }
          },
          {
              "idtypecode": "POLICY_NUMBER",
              "idtypedesc_th": "หมายเลขกรมธรรม์",
              "idtypedesc_en": "POLICY_NUMBER",
              "insurerid": 13,
              "insurers": {
                  "insurercode": 13,
                  "insurername": "เอไอเอ"
              }
          },
          {
              "idtypecode": "CUSTOMER_ID",
              "idtypedesc_th": "รหัสลูกค้า",
              "idtypedesc_en": "CUSTOMER_ID",
              "insurerid": 13,
              "insurers": {
                  "insurercode": 13,
                  "insurername": "เอไอเอ"
              }
          }
      ]
  
});
}
