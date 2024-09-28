import { NextResponse, type NextRequest } from "next/server";

// export function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const query = searchParams.get("q");
//   return Response.json({ query });
// }


export async function POST(request: Request) {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    console.log(userData)
    
    return NextResponse.json({ ...userData,user:userData,success:true });
}