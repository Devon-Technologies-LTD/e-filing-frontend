import { navigationLinks } from "@/config/nav";
import { UserRole } from "@/types/auth";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAuthorizedLinks(userRole: UserRole) {
  return navigationLinks.filter((link) => link.roles.includes(userRole));
}