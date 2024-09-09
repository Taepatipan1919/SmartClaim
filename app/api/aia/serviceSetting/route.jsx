export async function GET() {
  return Response.json({
    Result: {
      Code: "S",
      Message: "success",
      MessageTh: "ทำรายการสำเร็จ",
    },
    Data: [
      {
        Code: "OPD",
        Desc: "ผู้ป่วยนอก",
      },
      {
        Code: "IPD",
        Desc: "ผู้ป่วยใน",
      },
      {
        Code: "PRE",
        Desc: "ส่งพิจารณาเคลมก่อนทำการผ่าตัด (Pre-Authorization, Pre-Arrangement)",
      },
    ],
  });
}
