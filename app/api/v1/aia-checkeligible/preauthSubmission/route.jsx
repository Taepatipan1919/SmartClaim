import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const date = await request.json();
  return NextResponse.json(
    {
        Result: {
            Code: "S",
            Message: "success",
            MessageTh: "ทำรายการสำเร็จ",
        },
        Data: {
            RefId: "string",
            TransactionNo : "string",
            InsurerCode: 13,
            DataJsonType: null,
            DataJson: null,
            AttachDocList: [],
            PreAuthTransactionList: [
                {
                    ClaimNo: "string1",
                    OccerrenceNo: "string1",
                    ClaimStatus: "string1",
                    ClaimStatusDesc: "string1",
                    ExpectedAdmitDate: "string1",
                    VisitDateTime: "string1",
                    Procedure: [
                           {
                                    Icd9: "string1",
                                     ProcedureName: "string1",
                                     ProcedureDate: "string1",
                            },
                            {
                                Icd9: "string1",
                                 ProcedureName: "string1",
                                 ProcedureDate: "string1",
                        },
                     ],
                    Diagnosis: [
                          {
                                     Icd10: "string1",
                                    DxName: "string1", 
                            },
                            {
                                Icd10: "string1",
                               DxName: "string1", 
                       },
                     ],
             },
             {
                ClaimNo: "string2",
                OccerrenceNo: "string2",
                ClaimStatus: "string2",
                ClaimStatusDesc: "string2",
                ExpectedAdmitDate: "string2",
                VisitDateTime: "string2",
                Procedure: [
                       {
                                Icd9: "string2",
                                 ProcedureName: "string2",
                                 ProcedureDate: "string2",
                        },
                        {
                            Icd9: "string2",
                             ProcedureName: "string2",
                             ProcedureDate: "string2",
                    },
                    {
                        Icd9: "string2",
                         ProcedureName: "string2",
                         ProcedureDate: "string2",
                },
                 ],
                Diagnosis: [
                      {
                                 Icd10: "string2",
                                DxName: "string2", 
                        },
                        {
                            Icd10: "string2",
                           DxName: "string2", 
                   },
                   {
                    Icd10: "string2",
                   DxName: "string2", 
           },
                 ],
         },
         {
            ClaimNo: "string3",
            OccerrenceNo: "string3",
            ClaimStatus: "string3",
            ClaimStatusDesc: "string3",
            ExpectedAdmitDate: "string3",
            VisitDateTime: "string3",
            Procedure: [
                   {
                            Icd9: "string3",
                             ProcedureName: "string3",
                             ProcedureDate: "string3",
                    },
                    {
                        Icd9: "string3",
                         ProcedureName: "string3",
                         ProcedureDate: "string3",
                },
                {
                    Icd9: "string3",
                     ProcedureName: "string3",
                     ProcedureDate: "string3",
            },
            {
                Icd9: "string3",
                 ProcedureName: "string3",
                 ProcedureDate: "string3",
        },
             ],
            Diagnosis: [
                  {
                             Icd10: "string3",
                            DxName: "string3", 
                    },
                    {
                        Icd10: "string3",
                       DxName: "string3", 
               },
               {
                Icd10: "string3",
               DxName: "string3", 
       },
       {
        Icd10: "string3",
       DxName: "string3", 
},
             ],
     },
            ],
            },
    }
    )					
  };
