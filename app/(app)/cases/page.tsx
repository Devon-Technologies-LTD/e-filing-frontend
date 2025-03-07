"use client";
import SuspenseLoader from "@/components/suspense-loader";
import { useAppSelector } from "@/hooks/redux";
import { ROLES } from "@/types/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const getRedirectPath = (role: string | undefined): string => {
  if (!role) return "/login";

  switch (role) {
    case ROLES.DIRECTOR_MAGISTRATE:
    case ROLES.PRESIDING_MAGISTRATE:
      return "/cases/assigned";
    case ROLES.ASSIGNING_MAGISTRATE:
      return "/cases/case";
    case ROLES.CENTRAL_REGISTRAR:
      return "/cases/under-review";
    default:
      return "/cases/recent";
  }
};

export default function CasesPage() {
  const { data: user } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (!user) return;

    const redirectPath = getRedirectPath(user.role);
    redirect(redirectPath);
  }, [user]);

  if (!user) {
    return <SuspenseLoader />;
  }

  return null;
}
