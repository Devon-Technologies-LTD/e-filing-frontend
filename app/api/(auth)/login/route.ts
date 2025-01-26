import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Example: Authentication logic
    if (email === "user@example.com" && password === "password123") {
      return NextResponse.json({ message: "Login successful" }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
