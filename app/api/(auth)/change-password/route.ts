// import axios from "axios";
import "dotenv/config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";

const API_URL = process.env.API_URL;
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  const tok = req.cookies.get("authToken")?.value || "";
  const user = getDataFromToken(tok);
  if (!user || !user.accessToken) {
    throw new Error("Access token is missing or invalid");
  }
  const token = user.accessToken;
  const response = await fetch(`${API_URL}/change-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    return new NextResponse(JSON.stringify(errorData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const responseData = await response.json();
  return new NextResponse(JSON.stringify(responseData), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
