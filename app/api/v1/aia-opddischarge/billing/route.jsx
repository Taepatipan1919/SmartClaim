export async function GET() {
  return Response.json({
    Result: {
      Billing: [
        {
          LocalBillingCode: "1.1.1(3)",
          LocalBillingName: "ยาผู้ป่วยนอก",
          SimbBillingCode: "1.1.1(3)",
          PayorBillingCode: "1.1.1(3)",
          BillingInitial: "1000",
          BillingDiscount: "800",
          BillingNetAmount: "200"
      },
      {
          LocalBillingCode: "1.1.12",
          LocalBillingName: "ค่าบริการพยาบาล",
          SimbBillingCode: "1.1.12(1)",
          PayorBillingCode: "1.1.12(1)",
          BillingInitial: "300",
          BillingDiscount: "150",
          BillingNetAmount: "150"
      },
      {
          LocalBillingCode: "1.1.14",
          LocalBillingName: "ค่าบริการโรงพยาบาล",
          SimbBillingCode: "1.1.14(2.1)",
          PayorBillingCode: "1.1.14(2.1)",
          BillingInitial: "500",
          BillingDiscount: "300",
          BillingNetAmount: "200"
      },
      {
          LocalBillingCode: "1.2.1(10)",
          LocalBillingName: "ค่าแพทย์ตรวจรักษา",
          SimbBillingCode: "1.2.1(10)",
          PayorBillingCode: "1.2.1(10)",
          BillingInitial: "150",
          BillingDiscount: "0",
          BillingNetAmount: "150"
      },
      {
          LocalBillingCode: "1.1.5",
          LocalBillingName: "X-Ray",
          SimbBillingCode: "1.1.5(1)",
          PayorBillingCode: "1.1.5(1)",
          BillingInitial: "100",
          BillingDiscount: "40",
          BillingNetAmount: "60"
      }
    ],
    TotalBillAmount: "760",
  },
  });
}
