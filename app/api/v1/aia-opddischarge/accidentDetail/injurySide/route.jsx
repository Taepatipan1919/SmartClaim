export async function GET() {
  return Response.json({
    Result: [
      {
        Code : "1",
        DescTH : "ซ้าย",
        DescEN : "Left",
      },
      {
        Code : "2",
        DescTH : "ขวา",
        DescEN : "Right",
      },
    ]
  });
}
