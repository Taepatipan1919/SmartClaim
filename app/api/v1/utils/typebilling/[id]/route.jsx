export async function GET() {
    return Response.json({
      
        
            HTTPStatus: {
                statusCode: 200,
                message: "success",
                error: ""
            },
            Result: [
                {
                    Code: "1",
                    Selecttype: "ประเมินราคาด้วย VN",
                },
                {
                    Code: "2",
                    Selecttype: "Package Bundle",
                },
        ],
        })
  }
  