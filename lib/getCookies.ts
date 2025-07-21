'use server'
import { cookies } from "next/headers";

export async function getOtpEmail() {
  const cookieStore = cookies();
  return cookieStore.get("otpEmail")?.value;
}
