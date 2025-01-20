"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";

interface NavLinkProps extends Omit<NavItem, "roles"> {
  className?: string;
}

export function NavLink({ href, title, isActive, className }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <Link
        href={href}
        className={cn(
          "px-4 py-3 rounded-md text-sm font-medium transition-colors",
          isActive?.(pathname)
            ? "text-foreground bg-primary-foreground"
            : "hover:bg-primary-foreground",
          className
        )}
      >
        {title}
        {isActive?.(pathname) ? (
          <div className="absolute w-full h-1 bg-black rounded-t-full -bottom-6 left-0"></div>
        ) : (
          ""
        )}
      </Link>
    </div>
  );
}
