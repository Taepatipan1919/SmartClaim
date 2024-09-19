export async function GET() {
  return Response.json([
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
  ]);
}
