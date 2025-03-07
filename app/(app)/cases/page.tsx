"use client";
import SuspenseLoader from "@/components/suspense-loader";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function CasesPage() {
  const { data: user } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (user) {
      let redirectPath = "/cases/recent";
      if (
        [ROLES.DIRECTOR_MAGISTRATE, ROLES.PRESIDING_MAGISTRATE].includes(
          user?.role
        )
      ) {
        redirectPath = "/cases/assigned";
      }
      if (user?.role === ROLES.ASSIGNING_MAGISTRATE) {
        redirectPath = "/cases/case";
      }
      if (user?.role === ROLES.CENTRAL_REGISTRAR) {
        redirectPath = "/cases/under-review";
      }
      redirect(redirectPath);
    } else {
      <SuspenseLoader />;
    }
  }, [user]);

  return null;
}
