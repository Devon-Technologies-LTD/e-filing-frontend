"use client";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function CasesPage() {
  const { data: user } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (user) {
      let redirectPath = "/cases/recent";
      if (user?.role === ROLES.DIRECTOR_MAGISTRATES) {
        redirectPath = "/cases/assigned";
      }
      redirect(redirectPath);
    } else {
      console.warn(
        "User data not yet available. Consider a loading state or redirect."
      );
    }
  }, [user]);

  return null;
}
