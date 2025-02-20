"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getAuthorizedLinks } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { clearCaseTypeError, clearForm } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";

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
          "px-4 py-3 rounded-md text-sm font-semibold transition-colors",
          isActive?.(pathname) || isLinkActive
            ? "text-primary font-bold bg-secondary-foreground"
            : "hover:bg-secondary-foreground",
          className
        )}
      >
        {title}
        {isActive?.(pathname) || isLinkActive ? (
          <div className="absolute w-3/4 h-1 bg-black rounded-t-full -bottom-6 left-1/2 transform -translate-x-1/2"></div>
        ) : null}
      </Link>
    </div>
  );
}

export function Navigation() {
  const { data: user } = useAppSelector((state) => state.profile);
  const navLinks = getAuthorizedLinks(user?.role as ROLES);
  const dispatch = useDispatch();
  if (!user?.role) return null;

  return (
    <nav className="flex space-x-2">
      {" "}
      {/* Horizontal layout */}
      {navLinks.map((link) => (
        <div
          onClick={() => {
            dispatch(clearForm());
            dispatch(clearCaseTypeError());
            
          }}
        >
          <NavLink key={link.href} {...link} />
        </div>
      ))}
    </nav>
  );
}
