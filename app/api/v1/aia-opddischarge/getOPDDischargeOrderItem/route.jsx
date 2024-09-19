export async function GET() {
  return Response.json({
    Result: {
      OrderItem: [
        {
          "Discount": "40",
          "Initial": "100",
          "ItemAmount": "1",
          "ItemId": "00012345",
          "ItemName": "Film",
          "LocalBillingCode": "1.1.5",
          "LocalBillingName": "Film X-Ray",
          "NetAmount": "60"
      },
      {
          "ItemId": "110082415185009401",
          "ItemName": "ค่าบริการพยาบาล",
          "LocalBillingCode": "1.1.12",
          "LocalBillingName": "1.1.12 ค่าบริการทางการพยาบาล",
          "ItemAmount": "1",
          "Initial": "50",
          "Discount": "0",
          "NetAmount": "50"
      },
      {
          "ItemId": "HE0020",
          "ItemName": "CBC (Complete Blood Count)",
          "LocalBillingCode": "1.1.4",
          "LocalBillingName": "1.1.4 ค่าตรวจ LAB",
          "ItemAmount": "1",
          "Initial": "33",
          "Discount": "0",
          "NetAmount": "33"
      }
    ],
  },
  });
}
