import { navigationLinks } from "@/config/nav";
import { ROLES } from "@/types/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { jwtDecode } from "jwt-decode";
import { TCaseFilterType } from "@/types/case";
import {
  CaseStatus,
  CivilCaseSubType,
  CivilCaseSubTypeValueWorth,
  CivilDocumentTitles,
  SpecificSummonsValueWorth,
} from "@/constants";

// interface DecodedToken {
//   exp: number;
//   iat: number;
//   [key: string]: any; // Add more properties as needed
// }

// export function decodeToken(token: string): DecodedToken {
//   return jwtDecode<DecodedToken>(token);
// }

// utils/errorHandler.ts
export function handleApiError2(error: any) {
  console.error("API Error:", error);
  return {
    success: false,
    data: {
      message: error.response?.data?.message || "Something went wrong",
      error: error.response?.data?.data?.error || "Unknown error",
    },
  };
}

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
  let date = new Date(dateString);

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    console.warn("Invalid date provided:", dateString);
    date = new Date(); // Fallback to the current date
  }

  return {
    fullDateTime: date.toLocaleString(), // 2/17/2025, 10:23:35 AM
    fullDate: date.toLocaleDateString(), // 2/17/2025
    isoFormat: date.toISOString(), // 2025-02-17T09:23:35.493Z
    humanFriendly: date.toDateString(), // Mon Feb 17 2025
    ddmmyyyy_hhmmss: `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
          .getSeconds()
          .toString()
          .padStart(2, "0")}`,
    relativeTime: (() => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutesAgo = Math.floor(diff / 60000);
      const hoursAgo = Math.floor(diff / 3600000);
      const daysAgo = Math.floor(diff / 86400000);
      if (minutesAgo === 0) return "Just now";
      if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
      if (hoursAgo < 24) return `${hoursAgo} hours ago`;
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
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

export const getCaseTypeFields = (data: any) => ({
  // current_step: +data.steps,
  case_file_id: data?.id ?? "",
  claimant_address: data?.claimant?.address ?? "",
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
  counsel_name: data?.casetype?.[0]?.legal_counsels[0]?.name ?? "",
});

export const formatErrors = (errors: any) => {
  return Object.entries(errors)
    .map(([key, message]) => `${key}: ${message}`)
    .join("\n");
};

export const getStatusByTab = (tab: TCaseFilterType) => {
  switch (tab) {
    case "pending":
      return [CaseStatus.Pending, CaseStatus.UnderReview];
    case "case":
      return [
        CaseStatus.Approved,
        CaseStatus.ToBeAssigned,
        CaseStatus.UnderReview,
        CaseStatus.JudgementDelivered,
        CaseStatus.StruckOut,
        CaseStatus.Assigned,
      ];
    case "recent":
      return [
        CaseStatus.UnderReview,
        CaseStatus.Assigned,
        CaseStatus.Approved,
        CaseStatus.ToBeAssigned,
      ];
    case "active":
      return [CaseStatus.Approved, CaseStatus.Assigned];
    case "assigned":
      return [CaseStatus.Assigned];
    case "submitted":
      return [CaseStatus.Assigned];
    case "under-review":
      return [CaseStatus.UnderReview];
    case "approved-review":
      return [CaseStatus.Approved];
    case "denied-review":
      return [CaseStatus.Denied];
    case "unassigned":
      return [CaseStatus.UnderReview, CaseStatus.ToBeAssigned];
    case "concluded":
      return [CaseStatus.JudgementDelivered];
    default:
      return [
        CaseStatus.Approved,
        CaseStatus.Assigned,
        CaseStatus.Denied,
        CaseStatus.JudgementDelivered,
        CaseStatus.Pending,
        CaseStatus.StruckOut,
        CaseStatus.ToBeAssigned,
        CaseStatus.UnderReview,
      ];
  }
};
export const getStatusByTab2 = (tab: TCaseFilterType) => {
  switch (tab) {
    case "pending":
      return [CaseStatus.Pending, CaseStatus.UnderReview];
    case "case":
      return [];
    case "recent":
      return [
        CaseStatus.UnderReview,
        CaseStatus.Assigned,
        CaseStatus.Approved,
        CaseStatus.ToBeAssigned,
      ];
    case "active":
      return [CaseStatus.Approved, CaseStatus.Assigned];
    case "assigned":
      return [CaseStatus.Assigned];
    case "submitted":
      return [CaseStatus.Assigned];
    case "under-review":
      return [CaseStatus.UnderReview];
    case "approved-review":
      return [CaseStatus.Approved];
    case "denied-review":
      return [CaseStatus.Denied];
    case "unassigned":
      return [CaseStatus.UnderReview, CaseStatus.ToBeAssigned];
    case "concluded":
      return [CaseStatus.JudgementDelivered];
    default:
      return [
        CaseStatus.Approved,
        CaseStatus.Assigned,
        CaseStatus.Denied,
        CaseStatus.JudgementDelivered,
        CaseStatus.Pending,
        CaseStatus.StruckOut,
        CaseStatus.ToBeAssigned,
        CaseStatus.UnderReview,
      ];
  }
};

export const handleApiError = (error: any) => {
  if (error?.response) {
    return {
      data: error.response.data,
      status: error.response.status,
      message:
        error.response.data?.message ||
        error.response.data ||
        "An error occurred.",
      errors: error.response.data?.data || null,
      success: false,
    };
  }

  if (error?.request) {
    return {
      data: null,
      status: 504,
      message: "Something went wrong. Please try again.",
      errors: "Unable to process request.",
      success: false,
    };
  }

  return {
    data: null,
    status: 500,
    message: error?.message || "An unexpected error occurred.",
    errors: error?.message || "Unknown error.",
    success: false,
  };
};

const recoveryTitleMap: Record<
  CivilCaseSubTypeValueWorth,
  Partial<CivilDocumentTitles>
> = {
  [CivilCaseSubTypeValueWorth.LessThanOne]:
    CivilDocumentTitles.PlaintRecoveryOfPremises1MCivil,
  [CivilCaseSubTypeValueWorth.BetweenOneAndThree]:
    CivilDocumentTitles.PlaintRecoveryOfPremises1M3M,
  [CivilCaseSubTypeValueWorth.BetweenThreeAndSeven]:
    CivilDocumentTitles.PlaintRecoveryOfPremises3M7M,
};

const plaintTitleMap: Record<
  SpecificSummonsValueWorth,
  Partial<CivilDocumentTitles>
> = {
  [SpecificSummonsValueWorth.LessThanOne]:
    CivilDocumentTitles.PlaintForSpecificSummonsDefaultSummonsLeq5K,
  [SpecificSummonsValueWorth.BetweenFiveAndFifty]:
    CivilDocumentTitles.PlaintForSpecificSummonsDefaultSummons5K50K,
  [SpecificSummonsValueWorth.BetweenFiftyAndFiveHundred]:
    CivilDocumentTitles.PlaintForSpecificSummonsDefaultSummons50K500K,
  [SpecificSummonsValueWorth.BetweenFiveHundredAndOneMillion]:
    CivilDocumentTitles.PlaintForSpecificSummonsDefaultSummons500K1M,
  [SpecificSummonsValueWorth.BetweenOneMillionAndSevenMillion]:
    CivilDocumentTitles.PlaintForSpecificSummonsDefaultSummons1M7M,
};

export const getTitleByRecoveryAmount = ({
  type,
  recoveryAmount,
}: {
  type: CivilCaseSubType;
  recoveryAmount: CivilCaseSubTypeValueWorth | SpecificSummonsValueWorth;
}): string => {
  if (type === CivilCaseSubType.RECOVERY_OF_PREMISE) {
    return recoveryTitleMap[recoveryAmount as CivilCaseSubTypeValueWorth] || "";
  }
  if (
    [
      CivilCaseSubType.PLAINT_FOR_DEFAULT_SUMMONS,
      CivilCaseSubType.PLAINT_FOR_SPECIFIC_SUMMONS,
    ].includes(type)
  ) {
    return (
      plaintTitleMap[recoveryAmount as SpecificSummonsValueWorth] ||
      "PARTICULARS OF PLAINT"
    );
  }
  return "";
};
