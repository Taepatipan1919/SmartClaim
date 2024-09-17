export async function GET() {
  return Response.json({
    Result: {
      VitalSign: [
        {
          DiastolicBp: "79",
          HeartRate: "86",
          OxygenSaturation: "99",
          PainScore: "0",
          RespiratoryRate: "20",
          SystolicBp: "124",
          Temperature: "36.7",
          VitalSignEntryDateTime: "2024-08-05",
        },
      ],
    },
  });
}
