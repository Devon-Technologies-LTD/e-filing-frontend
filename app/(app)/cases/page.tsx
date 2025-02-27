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
      if ([ROLES.DIRECTOR_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES].includes(user?.role)) {
        redirectPath = "/cases/assigned";
      }
      if (user?.role === ROLES.ASSIGNING_MAGISTRATES) {
        redirectPath = "/cases/case";
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
