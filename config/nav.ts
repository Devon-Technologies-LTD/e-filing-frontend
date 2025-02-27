import { ROLES } from "@/types/auth";
import { NavItem } from "@/types/nav";

export const navigationLinks: NavItem[] = [
  {
    title: "Overview",
    href: "/overview/case",
    roles: [
      ROLES.ASSIGNING_MAGISTRATES,
      ROLES.DIRECTOR_MAGISTRATES,
      ROLES.PRESIDING_MAGISTRATES,
      ROLES.CHIEF_JUDGE,
      ROLES.CENTRAL_REGISTRY,

    ],
    isActive: (pathname) => pathname?.startsWith("/overview"),
  },
  {
    title: "Your Cases", //adewale
    href: "/cases",
    roles: [ROLES.LAWYER, ROLES.USER, ROLES.DIRECTOR_MAGISTRATES, ROLES.ASSIGNING_MAGISTRATES, ROLES.PRESIDING_MAGISTRATES],
    isActive: (pathname) => pathname === "/cases",
  },
  {
    title: "Drafts", //adewale
    href: "/drafts",
    roles: [ROLES.LAWYER, ROLES.USER],
    isActive: (pathname) => pathname?.startsWith("/docs/drafts"),
  },
  {
    title: "Track Cases", //adewale
    href: "/track-cases",
    roles: [ROLES.LAWYER, ROLES.USER],
    isActive: (pathname) => pathname?.startsWith("/track"),
  },
  // {
  //   title: "Your Cases",
  //   href: "/your-cases/case",
  //   roles: [ROLES.ASSIGNING_MAGISTRATES],
  //   isActive: (pathname) => pathname?.startsWith("/your-cases"),
  // },
  {
    title: "Case Reviews",
    href: "/reviews/under-review",
    roles: [ROLES.CENTRAL_REGISTRY,  ROLES.CHIEF_JUDGE], //mote remove cheif judge role
    isActive: (pathname) => pathname?.startsWith("/reviews"),
  },
  {
    title: "Audit Logs",
    href: "/audit",
    roles: [ROLES.CENTRAL_REGISTRY, ],
    isActive: (pathname) => pathname?.startsWith("/audit"),
  },
  {
    title: "Case Monitoring",
    href: "/monitoring/case",
    roles: [
      ROLES.ASSIGNING_MAGISTRATES,
      ROLES.CHIEF_JUDGE,
      ROLES.DIRECTOR_MAGISTRATES, 
    ],
    isActive: (pathname) => pathname?.startsWith("/monitoring"),
  },
  {
    title: "Magistrate Oversight",
    href: "/oversight/all",
    roles: [
      ROLES.ASSIGNING_MAGISTRATES,
      ROLES.CHIEF_JUDGE,
      ROLES.DIRECTOR_MAGISTRATES, 
    ],
    isActive: (pathname) => pathname?.startsWith("/oversight"),
  },
  {
    title: "User Management",
    href: "/management/all",
    roles: [
      ROLES.CHIEF_JUDGE,
      ROLES.DIRECTOR_MAGISTRATES,
      ROLES.ASSIGNING_MAGISTRATES, 
    ],
    isActive: (pathname) => pathname?.startsWith("/management"),
  },
];
