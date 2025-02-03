"use server";

import { SignJWT, jwtVerify } from "jose";
import { TSessionData } from "@/lib/_definitions";
import { ALGORITHM, SECRET } from "@/lib/_constants";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { decodeToken } from "../utils";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(SECRET);

type TCookieHelper = {
  name: string;
  options: Partial<ResponseCookie>;
  duration: number;
};

const cookieHelper: TCookieHelper = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

// ✅ Exporting async functions individually
export async function encrypt(payload: any) {
  return new SignJWT(payload).setProtectedHeader({ alg: ALGORITHM }).sign(key);
}

export async function decrypt(session: any) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: [ALGORITHM],
    });
    return payload;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

export async function verifySession() {
  const cookie = cookies().get(cookieHelper.name)?.value;
  const session = await decrypt(cookie);
  return session as TSessionData | null;
}

export async function createSession(userData: TSessionData) {
  const decryptedToken = decodeToken(userData.token);
  const expires = decryptedToken.exp
    ? decryptedToken.exp * 1000
    : new Date(Date.now() + cookieHelper.duration);
  const session = await encrypt({ ...userData, expires });
  cookies().set(cookieHelper.name, session, {
    ...cookieHelper.options,
    expires,
  });
}

export async function deleteSession() {
  cookies().delete(cookieHelper.name);
  redirect("/login");
}

export async function getUser() {
  const session = await verifySession();
  return session?.user?.id;
}

export async function getToken() {
  const session = await verifySession();
  return session?.token;
}
