"use server"; // This marks the function as server-side only

import { verifySession } from "@/lib/server/auth";

export async function getSession() {
  const session = await verifySession();
  return session?.user ?? null;
}
