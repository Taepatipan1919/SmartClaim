export async function GET() {
  return Response.json({
    Result: {
      Doctor: [
        {
          DoctorLicense: "0000039159",
          DoctorRole: "OWNER",
          DoctorFirstName: "สมพร",
          DoctorLastName: "สังวาระ"
      }
    ],
  },
  });
}
