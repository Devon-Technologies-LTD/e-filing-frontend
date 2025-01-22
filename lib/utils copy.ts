import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { jwtDecode } from "jwt-decode"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeToken(token: string) {
  const decoded = jwtDecode(token)
  return decoded
}

// helper function to take any string and return a version with only the initials and have them capitalized
export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

// helper function to convert FormData to object preserving multiple values with repeated names as arrays
export function formDataToObject(formData: FormData): Record<string, any> {
  const entries = Array.from(formData.entries());

  // Group entries by name and concatenate values for repeated names
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
  }, {} as Record<string, any>);

  // Remove empty string values from arrays
  const cleanedEntries = Object.entries(groupedEntries).map(([key, value]) => {
    if (Array.isArray(value)) {
      return [key, value.filter((item) => item !== '')];
    }
    return [key, value];
  });

  return Object.fromEntries(cleanedEntries);
}

export const dataUrl = 'data:text/html;base64,PGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZTVlNWU1O2FuaW1hdGlvbjphbmltYXRlZC1wdWxzZSAycyBpbmZpbml0ZTtiYWNrZ3JvdW5kLWNvbG9yOiNlNWU1ZTU7Ym9yZGVyLXJhZGl1czowLjI1cmVtO2JhY2tncm91bmQtY29sb3I6I2U1ZTVlNTsiPgogIDxzdmcgc3R5bGU9IndpZHRoOjIuNXJlbTtoZWlnaHQ6Mi41cmVtO2NvbG9yOiM4MDgwODA7Y29sb3I6IzgwODA4MDsiIGFyaWEtaGlkZGVuPSJ0cnVlIiB4bWxucz0iKGxpbmsgdW5hdmFpbGFibGUpIiBmaWxsPSJjdXJyZW50Q29sb3IiIHZpZXdCb3g9IjAgMCAyMCAxOCI+CiAgICA8cGF0aCBkPSJNMTggMEgyYTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMCAwLTItMlptLTUuNSA0YTEuNSAxLjUgMCAxIDEgMCAzIDEuNSAxLjUgMCAwIDEgMC0zWm00LjM3NiAxMC40ODFBMSAxIDAgMCAxIDE2IDE1SDRhMSAxIDAgMCAxLS44OTUtMS40NDdsMy41LTdBMSAxIDAgMCAxIDcuNDY4IDZhLjk2NS45NjUgMCAwIDEgLjkuNWwyLjc3NSA0Ljc1NyAxLjU0Ni0xLjg4N2ExIDEgMCAwIDEgMS42MTguMWwyLjU0MSA0YTEgMSAwIDAgMSAuMDI4IDEuMDExWiIvPgogIDwvc3ZnPgo8L2Rpdj4K'


// helper function to add a delimiter to a number separating it with commas after every 3 digits starting from the right
export function addCommasToNumber(number: number) {
  return number.toLocaleString('en-US');
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
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

// Utility function to format Date object as yyyy-MM-dd
export const formatDate = (date: Date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
