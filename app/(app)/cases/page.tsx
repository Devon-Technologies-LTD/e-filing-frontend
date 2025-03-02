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
<<<<<<< HEAD
      if ([ROLES.DIRECTOR_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES].includes(user?.role)) {
=======
      if (
        [ROLES.DIRECTOR_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES].includes(
          user?.role
        )
      ) {
>>>>>>> b4677b643514520e09118f64bb28968933b3cd39
        redirectPath = "/cases/assigned";
      }
      if (user?.role === ROLES.ASSIGNING_MAGISTRATES) {
        redirectPath = "/cases/case";
      }
      redirect(redirectPath);
    } else {
      <SuspenseLoader />;
    }
  }, [user]);

  return null;
}
