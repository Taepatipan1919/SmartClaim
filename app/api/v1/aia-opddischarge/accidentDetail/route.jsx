export async function GET() {
  return Response.json({
    Result: {
      AccidentDetail: {
        AccidentPlace: "3",
        AccidentDate: "2024-08-01",
        CauseOfInjuryDetail: [
            {
                CauseOfInjury: "W1099",
                CommentOfInjury: "Fall"
            }
        ],
        InjuryDetail: [
            {
                WoundType: "Contusion",
                InjurySide: "Left",
                InjuryArea: "S099"
            }
        ]
  },
  }
  });
}
