import { ROLES } from "@/types/auth";
import { NavItem } from "@/types/nav";

export const navigationLinks: NavItem[] = [
  {
    title: "Your Cases",
    href: "/cases",
    roles: [ROLES.LAWYER],
    isActive: (pathname) => pathname === "/cases",
  },
  {
    title: "Drafts",
    href: "/drafts",
    roles: [ROLES.LAWYER],
    isActive: (pathname) => pathname?.startsWith("/docs/drafts"),
  },
  {
    title: "Track Cases",
    href: "/track-cases",
    roles: [ROLES.LAWYER],
    isActive: (pathname) => pathname?.startsWith("/track"),
  },
  {
    title: "Overview",
    href: "/overview/case",
    roles: [ROLES.ASSIGNING_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES, ROLES.CHIEF_JUDGE, ROLES.CENTRAL_REGISTRY],
    isActive: (pathname) => pathname?.startsWith("/overview"),
  },
  {
    title: "Your Cases",
    href: "/your-cases/case",
    roles: [ROLES.ASSIGNING_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES],
    isActive: (pathname) => pathname?.startsWith("/your-cases"),
  },
  {
    title: "Case Reviews",
    href: "/reviews/case",
    roles: [ROLES.CENTRAL_REGISTRY],
    isActive: (pathname) => pathname?.startsWith("/reviews"),
  },
  {
    title: "Audit Logs",
    href: "/audit/case",
    roles: [ROLES.CENTRAL_REGISTRY],
    isActive: (pathname) => pathname?.startsWith("/audit"),
  },
  {
    title: "Case Monitoring",
    href: "/monitoring/case",
    roles: [ROLES.ASSIGNING_MAGISTRATES, ROLES.CHIEF_JUDGE],
    isActive: (pathname) => pathname?.startsWith("/monitoring"),
  },
  {
    title: "Magistrate Oversight",
    href: "/oversight/all",
    roles: [ROLES.ASSIGNING_MAGISTRATES, ROLES.CHIEF_JUDGE],
    isActive: (pathname) => pathname?.startsWith("/oversight"),
  },
  {
    title: "User Management",
    href: "/management/all",
    roles: [ROLES.ASSIGNING_MAGISTRATES, ROLES.CHIEF_JUDGE],
    isActive: (pathname) => pathname?.startsWith("/management"),
  },
];
