export async function GET() {
  return Response.json([
      {
        accidentplacecode : "1",
        accidentplacename : "Accident in public conveyance",
      },
      {
        accidentplacecode : "2",
        accidentplacename : "Accident in an elevator",
      },
      {
        accidentplacecode : "3",
        accidentplacename : "Burning of theatre, hotel, or public building",
      },
      {
        accidentplacecode : "4",
        accidentplacename : "Other",
      },
  ]);
}
