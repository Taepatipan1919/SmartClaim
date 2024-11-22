export async function GET() {
  return Response.json([
    {
      id: "true",
      IsPackageDesc: "Package",
    },
    {
      id: "false",
      IsPackageDesc: "Non package",
    },
  ]);
}
