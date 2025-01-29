
import { PASSWORDOTPCOMPONENT } from "@/components/auth/passwordOtp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function PASSWORDOTP() {
  const cookieStore = cookies();
  const emailCookie = cookieStore.get("otpEmail");
  if (!emailCookie?.value) {
    redirect("/forgot");
  }

  return <PASSWORDOTPCOMPONENT email={emailCookie?.value} />;

}
