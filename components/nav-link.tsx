"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getAuthorizedLinks } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { clearCaseTypeError, clearForm } from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { Menu, X } from "lucide-react"; // Icon components

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
          "block px-4 py-3 rounded-md text-sm font-semibold transition-colors",
          isActive?.(pathname) || isLinkActive
            ? "text-primary font-bold bg-secondary-foreground"
            : "hover:bg-secondary-foreground",
          className
        )}
      >
        {title}
        {isActive?.(pathname) || isLinkActive ? (
          <div className="absolute w-3/4 h-1 bg-black rounded-t-full -bottom-1 left-1/2 transform -translate-x-1/2"></div>
        ) : null}
      </Link>
    </div>
  );
}

export function Navigation() {
  const { data: user } = useAppSelector((state) => state.profile);
  const navLinks = getAuthorizedLinks(user?.role as ROLES);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user?.role) return null;

  const handleNavClick = () => {
    dispatch(clearForm());
    dispatch(clearCaseTypeError());
    setMenuOpen(false); // Close menu after click (on mobile)
  };

  return (
    <nav className="w-full">
      {/* Mobile toggle button */}
      <div className="flex justify-between items-center md:hidden mb-2">
        <span className="font-bold text-lg">Menu</span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black p-2"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Nav items */}
      <div
        className={cn(
          "flex-col md:flex md:flex-row md:space-x-2",
          menuOpen ? "flex" : "hidden md:flex"
        )}
      >
        {navLinks.map((link) => (
          <div key={link.href} onClick={handleNavClick}>
            <NavLink {...link} />
          </div>
        ))}
      </div>
    </nav>
  );
}
