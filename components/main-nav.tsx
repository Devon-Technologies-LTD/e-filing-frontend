"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Navigation } from "./nav-link";
import { Button } from "./ui/button";
import Link from "next/link";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data } = useAppSelector((state) => state.profile);

  // TODO: this should be dynamic and changed to database user role enum
  return (
    <nav
      className={cn("flex items-center gap-3 text-sm xl:gap-2", className)}
      {...props}
    >
      <Navigation />
      {data?.role && (
        <>
          {[ROLES.LAWYER].includes(data?.role) && (
            <Link href="/case-filing">
              <Button variant="default" size="sm" className="h-10 uppercase">
                File a Case
              </Button>
            </Link>
          )}
        </>
      )}
    </nav>
  );
}
