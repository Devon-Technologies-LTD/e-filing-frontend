"use client";
import { cn, getAuthorizedLinks } from "@/lib/utils";
import { NavLink } from "./nav-link";
import { Button } from "./ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // TODO: this should be dynamic and changed to database user role enum
  const navLinks = getAuthorizedLinks("admin");

  return (
    <nav
      className={cn("flex items-center gap-3 text-sm xl:gap-4", className)}
      {...props}
    >
      {navLinks.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
      <Button variant="default" size="lg" className="h-12 uppercase">
        File a Case
      </Button>
    </nav>
  );
}
