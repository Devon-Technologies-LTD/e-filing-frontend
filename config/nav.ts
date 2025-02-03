import { NavItem } from "@/types/nav";

export const navigationLinks: NavItem[] = [
  {
    title: "Your Cases",
    href: "/cases",
    roles: ["LAWYER", "USER", "ADMIN"],
    isActive: (pathname) => pathname === "/cases",
  },
  {
    title: "Drafts",
    href: "/drafts",
    roles: ["LAWYER", "USER"],
    isActive: (pathname) => pathname?.startsWith("/docs/drafts"),
  },
  {
    title: "Track Cases",
    href: "/track-cases",
    roles: ["LAWYER"],
    isActive: (pathname) => pathname?.startsWith("/track"),
  },
  {
    title: "Overview",
    href: "/overview/case",
    roles: ["ASSIGNING_MAGISTRATES", "PRESIDING_MAGISTRATES"],
    isActive: (pathname) => pathname?.startsWith("/overview"),
  },
  {
    title: "Your Cases",
    href: "/your-cases/case",
    roles: ["ASSIGNING_MAGISTRATES", "PRESIDING_MAGISTRATES"],
    isActive: (pathname) => pathname?.startsWith("/your-cases"),
  },
  {
    title: "Case Monitoring",
    href: "/monitoring/case",
    roles: ["ASSIGNING_MAGISTRATES"],
    isActive: (pathname) => pathname?.startsWith("/monitoring"),
  },
  {
    title: "Magistrate Oversight",
    href: "/oversight/all",
    roles: ["ASSIGNING_MAGISTRATES"],
    isActive: (pathname) => pathname?.startsWith("/oversight"),
  },
  {
    title: "User Management",
    href: "/management/all",
    roles: ["ASSIGNING_MAGISTRATES"],
    isActive: (pathname) => pathname?.startsWith("/management"),
  },
];
