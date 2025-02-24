"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Navigation } from "./nav-link";
import { Button } from "./ui/button";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { clearCaseTypeError, clearForm } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data } = useAppSelector((state) => state.profile);
  const dispatch = useDispatch();
  const router = useRouter();
  // TODO: this should be dynamic and changed to database user role enum
  return (
    <nav
      className={cn("flex items-center gap-3 text-sm xl:gap-2", className)}
      {...props}
    >
      <Navigation />
      {data?.role && (
        <>
          {[ROLES.LAWYER, ROLES.USER].includes(data?.role) && (
            <Button
              onClick={() => {
                dispatch(clearForm());
                dispatch(clearCaseTypeError());
                router.push("/case-filing");
              }}
              variant="default"
              size="medium"
              className="h-10 uppercase"
            >
              File a Case
            </Button>
          )}
        </>
      )}
    </nav>
  );
}
