export async function GET() {
    return Response.json([
        {
            "id": 1,
            "InsurerCode": 13,
            "ISCode": "Y",
            "ISDescription": "มีการผ่าตัด"
        },
        {
            "id": 2,
            "InsurerCode": 13,
            "ISCode": "N",
            "ISDescription": "ไม่มีการผ่าตัด"
        }
    ]);
  }
  