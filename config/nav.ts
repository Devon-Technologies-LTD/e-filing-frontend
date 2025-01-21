import { NavItem } from "@/types/nav";

export const navigationLinks: NavItem[] = [
  {
    title: "Your Cases",
    href: "/cases",
    roles: ["admin", "user", "guest"],
    isActive: (pathname) => pathname === "/cases",
  },
  {
    title: "Drafts",
    href: "/drafts",
    roles: ["admin", "user"],
    isActive: (pathname) => pathname?.startsWith("/docs/drafts"),
  },
  {
    title: "Track Cases",
    href: "/track",
    roles: ["admin"],
    isActive: (pathname) => pathname?.startsWith("/track"),
  },
  {
    title: "File",
    href: "/track",
    roles: ["user"],
    isActive: (pathname) => pathname?.startsWith("/track"),
  },
];
