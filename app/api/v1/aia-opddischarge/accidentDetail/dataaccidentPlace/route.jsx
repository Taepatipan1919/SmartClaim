export async function GET() {
  return Response.json({
    Result: [
      {
        Code : "1",
        Desc : "Accident in public conveyance",
      },
      {
        Code : "2",
        Desc : "Accident in an elevator",
      },
      {
        Code : "3",
        Desc : "Burning of theatre, hotel, or public building",
      },
      {
        Code : "4",
        Desc : "Other",
      },
    ]
  });
}
