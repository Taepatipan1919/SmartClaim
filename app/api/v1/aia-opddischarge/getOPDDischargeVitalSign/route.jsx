import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const date = await request.json();
    console.log("ดึงข้อมูลเช็คสำเร็จ");
    return NextResponse.json({
    Result: {
      VitalSignInfo: [
        {
            "DiastolicBp": "83",
            "HeartRate": "94",
            "OxygenSaturation": "97",
            "PainScore": "0",
            "RespiratoryRate": "18",
            "SystolicBp": "117",
            "Temperature": "36.07",
            "VitalSignEntryDateTime": "2024-07-31 07:56"
        },
        {
            "DiastolicBp": "83",
            "HeartRate": "94",
            "OxygenSaturation": "97",
            "PainScore": "0",
            "RespiratoryRate": "18",
            "SystolicBp": "117",
            "Temperature": "36.07",
            "VitalSignEntryDateTime": "2024-07-31 07:56"
        },
        {
            "DiastolicBp": "83",
            "HeartRate": "94",
            "OxygenSaturation": "97",
            "PainScore": "0",
            "RespiratoryRate": "18",
            "SystolicBp": "117",
            "Temperature": "36.07",
            "VitalSignEntryDateTime": "2024-07-31 07:56"
        },
        {
            "DiastolicBp": "83",
            "HeartRate": "94",
            "OxygenSaturation": "97",
            "PainScore": "0",
            "RespiratoryRate": "18",
            "SystolicBp": "117",
            "Temperature": "36.07",
            "VitalSignEntryDateTime": "2024-07-31 07:56"
        },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // },
        // {
        //     "DiastolicBp": "83",
        //     "HeartRate": "94",
        //     "OxygenSaturation": "97",
        //     "PainScore": "0",
        //     "RespiratoryRate": "18",
        //     "SystolicBp": "117",
        //     "Temperature": "36.07",
        //     "VitalSignEntryDateTime": "2024-07-31 07:56"
        // }
    ]
    },
  });
}
