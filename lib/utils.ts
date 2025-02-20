import { navigationLinks } from "@/config/nav";
import { ROLES } from "@/types/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { jwtDecode } from "jwt-decode";

// interface DecodedToken {
//   exp: number;
//   iat: number;
//   [key: string]: any; // Add more properties as needed
// }

// export function decodeToken(token: string): DecodedToken {
//   return jwtDecode<DecodedToken>(token);
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthorizedLinks(userRole: ROLES) {
  return navigationLinks.filter((link) => link.roles.includes(userRole));
}

export function decodeToken(token: string) {
  const decoded = jwtDecode(token);
  return decoded;
}

// helper function to take any string and return a version with only the initials and have them capitalized
export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function formDataToObject(
  formData: FormData
): Record<string, string | File | (string | File)[]> {
  const entries = Array.from(formData.entries());

  const groupedEntries = entries.reduce((acc, [key, value]) => {
    if (acc[key]) {
      if (Array.isArray(acc[key])) {
        acc[key].push(value);
      } else {
        acc[key] = [acc[key], value];
      }
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string | File | (string | File)[]>);

  const cleanedEntries = Object.entries(groupedEntries).map(([key, value]) => {
    if (Array.isArray(value)) {
      return [key, value.filter((item) => item !== "")];
    }
    return [key, value];
  });

  return Object.fromEntries(cleanedEntries);
}

export const dataUrl =
  "data:text/html;base64,PGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZTVlNWU1O2FuaW1hdGlvbjphbmltYXRlZC1wdWxzZSAycyBpbmZpbml0ZTtiYWNrZ3JvdW5kLWNvbG9yOiNlNWU1ZTU7Ym9yZGVyLXJhZGl1czowLjI1cmVtO2JhY2tncm91bmQtY29sb3I6I2U1ZTVlNTsiPgogIDxzdmcgc3R5bGU9IndpZHRoOjIuNXJlbTtoZWlnaHQ6Mi41cmVtO2NvbG9yOiM4MDgwODA7Y29sb3I6IzgwODA4MDsiIGFyaWEtaGlkZGVuPSJ0cnVlIiB4bWxucz0iKGxpbmsgdW5hdmFpbGFibGUpIiBmaWxsPSJjdXJyZW50Q29sb3IiIHZpZXdCb3g9IjAgMCAyMCAxOCI+CiAgICA8cGF0aCBkPSJNMTggMEgyYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMCAwLTItMlptLTUuNSA0YTEuNSAxLjUgMCAxIDEgMCAzIDEuNSAxLjUgMCAwIDEgMC0zWm00LjM3NiAxMC40ODFBMSAxIDAgMCAxIDE2IDE1SDRhMSAxIDAgMCAxLS44OTUtMS40NDdsMy41LTdBMSAxIDAgMCAxIDcuNDY4IDZhLjk2NS45NjUgMCAwIDEgLjkuNWwyLjc3NSA0Ljc1NyAxLjU0Ni0xLjg4N2ExIDEgMCAwIDEgMS42MTguMWwyLjU0MSA0YTEgMSAwIDAgMSAuMDI4IDEuMDExWiIvPgogIDwvc3ZnPgo8L2Rpdj4K";

// helper function to add a delimiter to a number separating it with commas after every 3 digits starting from the right
export function addCommasToNumber(number: number) {
  return number.toLocaleString("en-US");
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

// Utility function to format Date object as yyyy-MM-dd
export const formatDate = (date: Date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

export function dateFormatter(dateString: string | Date) {
  const date = new Date(dateString);

  return {
    fullDateTime: date.toLocaleString(), // 2/17/2025, 10:23:35 AM
    fullDate: date.toLocaleDateString(), // 2/17/2025, 10:23:35 AM
    isoFormat: date.toISOString(), // 2025-02-17T09:23:35.493Z
    humanFriendly: date.toDateString(), // Mon Feb 17 2025
    ddmmyyyy_hhmmss: `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(
        2,
        "0"
      )}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    relativeTime: (() => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutesAgo = Math.floor(diff / 60000);
      return `${minutesAgo} minutes ago`;
    })(),
    amPmFormat: (() => {
      const hours = date.getHours() % 12 || 12;
      const ampm = date.getHours() >= 12 ? "PM" : "AM";
      return `${hours}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${ampm}, ${date.toDateString()}`;
    })(),
    timeOnly: date.toLocaleTimeString(), // 10:23:35 AM
    fullLongFormat: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }), // Monday, February 17, 2025
    unixTimestamp: Math.floor(date.getTime() / 1000), // 1739793815 (Unix seconds)
  };
}

export const getCaseFileFields = (data: any) => ({
  case_file_id: data?.id ?? "",
  claimant_address: data?.claimant?.name ?? "",
  claimant_email_address: data?.claimant?.email_address ?? "",
  claimant_name: data?.claimant?.name ?? "",
  claimant_phone_number: data?.claimant?.phone_number ?? "",
  claimant_whats_app: data?.casetype?.[0]?.claimant?.whats_app ?? "",
  court_division: data?.court_division_id ?? "",
  defendant_address: data?.casetype?.[0]?.defendant?.address ?? "",
  defendant_email_address: data?.casetype?.[0]?.defendant?.email_address ?? "",
  defendant_name:
    (data?.casetype?.[0]?.defendant?.name || data?.defendant?.name) ?? "",
  defendant_phone_number: data?.casetype?.[0]?.defendant?.phone_number ?? "",
  defendant_whats_app: data?.casetype?.[0]?.defendant?.whats_app ?? "",
  title: data?.title ?? "",
});

export const getCaseTypeFields = (data: any) => ({
  case_type: data?.casetype?.[0]?.case_type_name ?? "",
  case_type_id: data?.casetype?.[0]?.id ?? "",
  cost_claimed: data?.casetype?.[0]?.cost_claimed ?? "",
  dated_this: data?.casetype?.[0]?.dated_this ?? "",
  direct_complain: data?.casetype?.[0]?.direct_complain ?? "",
  interest_claimed: data?.casetype?.[0]?.interest_claimed ?? "",
  notes: data?.casetype?.[0]?.notes ?? "",
  property_description: data?.casetype?.[0]?.property_description ?? "",
  recovery_amount: data?.casetype?.[0]?.recovery_amount ?? "",
  registrar: data?.casetype?.[0]?.registrar ?? "",
  relief_sought: data?.casetype?.[0]?.relief_sought ?? "",
  rental_value: data?.casetype?.[0]?.rental_value ?? "",
  sub_case_type: data?.casetype?.[0]?.sub_case_type_name ?? "",
  sum_claimed: data?.casetype?.[0]?.sum_claimed ?? "",
  summon_court_description:
    data?.casetype?.[0]?.summon_details?.court_description ?? "",
  summon_date: data?.casetype?.[0]?.summon_details?.data ?? "",
  summon_state_location:
    data?.casetype?.[0]?.summon_details?.state_location ?? "",
  summon_time: data?.casetype?.[0]?.summon_details?.time ?? "",
  value_worth: data?.casetype?.[0]?.value_worth ?? "",
});
