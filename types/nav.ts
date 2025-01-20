import { UserRole } from "./auth";

export interface NavItem {
  title: string;
  href: string;
  roles: UserRole[];
  isActive?: (pathname: string) => boolean;
}
