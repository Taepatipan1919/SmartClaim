import { NextRequest, NextResponse } from "next/server";

export async function GET(NextRequest, { params }) {
  // const Formdata = await req.formData();
  // const HN = Formdata.get("HN");
  // const FirstName = Formdata.get("FirstName");
  return NextResponse.json({
    RefId: HN,
    Username: FirstName,
    HospitalCode: "",
    InsurerCode: "",
    ElectronicSignature: "",
    DataJsonType: "",
    DataJson: {
      IdType: "",
      Id: "",
      PolicyType: "",
      ServiceSetting: "",
      IllnessType: "",
      SurgeryType: "",
      Patient: {
        FirstName: "",
        LastName: "",
        Dob: "",
      },
      Visit: {
        VisitDateTime: "",
        AccidentDate: "",
      },
    },
  });
}
