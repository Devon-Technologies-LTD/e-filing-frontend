'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getAuthorizedLinks } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import { ROLES } from "@/types/auth";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/getSession"; // Import server function

interface NavLinkProps extends Omit<NavItem, "roles"> {
  className?: string;
}

export function NavLink({ href, title, isActive, className }: NavLinkProps) {
  const pathname = usePathname();
  const isLinkActive = pathname.startsWith(href);

  return (
    <div className="relative">
      <Link
        href={href}
        className={cn(
          "text-center text-sm py-2 px-1 rounded-md font-semibold ",
          isActive?.(pathname) || isLinkActive
            ? "text-foreground bg-secondary-foreground"
            : "hover:bg-secondary-foreground",
          className
        )}
      >
        {title}
        {isActive?.(pathname) || isLinkActive ? (
          <div className="absolute w-full  bg-black left-0"></div>
        ) : null}
      </Link>
    </div>
  );
}

export function Navigation() {
  const [user, setUser] = useState<{ role?: ROLES } | null>(null);
  const [navLinks, setNavLinks] = useState<NavItem[]>([]); // Store links separately

  useEffect(() => {
    getSession().then((userData) => {
      if (userData && userData.role) {
        setUser(userData);
        setNavLinks(getAuthorizedLinks(userData.role)); // Only set once
      }
    });
  }, []); // Empty dependency array ensures it runs only once

  if (!user) return null; // Prevent rendering until session is fetched

  return (
    <nav className="flex space-x-4"> {/* Horizontal layout */}
      {navLinks.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}
