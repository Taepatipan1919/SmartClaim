import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
  return Response.json([
    {
      "filename": "Dome-upload-1119"
    },
    {
      "filename": "Dome-upload-1214"
    },
    {
      "filename": "Dome-upload-2013"
    },
    {
      "filename": "Dome-upload-1210"
    }
    ],
  );
}