export async function GET() {
  return Response.json({
    Result: {
      Pss: {
        Exclusion: "0",
        FinalScore: "0",
        Findings: [
            {
                Description: "0",
                Exclusion: "0",
                Medical: "0",
                Reference: "0"
            }
        ],
        Id: "0",
        Medical: "0",
      },
    },
  });
}
