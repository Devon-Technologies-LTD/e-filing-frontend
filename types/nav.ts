import { ROLES } from "./auth";

export interface NavItem {
  title: string;
  href: string;
  roles: ROLES[];
  isActive?: (pathname: string) => boolean;
}
