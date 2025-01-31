// app/lib/getCookies.ts
import { cookies } from "next/headers";

export function getOtpEmail() {
  const cookieStore = cookies();
  return cookieStore.get("otpEmail")?.value;
}
