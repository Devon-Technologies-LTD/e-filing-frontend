import { NextResponse } from "next/server";

export async function GET() {
  try {

    // const res = await axios.post(`${API_URL}/logout`, data);


    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
