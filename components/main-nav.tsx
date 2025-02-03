"use client";
import { cn } from "@/lib/utils";
import { Navigation } from "./nav-link";
import { Button } from "./ui/button";
import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // TODO: this should be dynamic and changed to database user role enum
  // const navLinks = getAuthorizedLinks("admin");
  return (
    <nav
      className={cn("flex items-center gap-3 text-sm xl:gap-4", className)}
      {...props}
    >
      <Navigation />
      <Link href="/case-filing">
        <Button variant="default" size="sm" className="h-10 uppercase">
          File a Case
        </Button>
      </Link>
    </nav>
  );
}
