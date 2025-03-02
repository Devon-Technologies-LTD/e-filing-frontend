export interface LoginResponseData {
  ID: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: ROLES;
  token: string;
}

export type ErrorResponse = {
  name: string;
  response?: {
    status: number;
    data: {
      message: string;
      data?: { error?: string };
      error: string;
    };
  };
  request?: unknown;
  message?: string;
}


export enum ROLES {
  USER = "USER",
  LAWYER = "LAWYER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPER_ADMIN",
  ASSIGNING_MAGISTRATES = "ASSIGNING_MAGISTRATE",
  PRESIDING_MAGISTRATES = "PRESIDING_MAGISTRATE",
  DIRECTOR_MAGISTRATES = "DIRECTOR_MAGISTRATE",
  CHIEF_JUDGE = "CHIEF_JUDGE",
  CENTRAL_REGISTRY = "CENTRAL_REGISTRY",
}
export interface User {
  id: string;
  role: ROLES;
  name: string;
}

export enum USER_STATUS {
  INACTIVE = "inactive",
  ACTIVE = "active",
  PENDING = "pending",
};

export function isFieldErrorObject(
  error: unknown
): error is Record<string, string[]> {
  return (
    typeof error === "object" &&
    error !== null &&
    !Array.isArray(error) &&
    Object.values(error).every(
      (value) => Array.isArray(value) && value.every((item) => typeof item === "string")
    )
  );
}



// Separate function for error handling
export function handleError(err: unknown) {
  const error = err as ErrorResponse;
  console.error(error?.response);

  if (error?.name === "AbortError") {
    return {
      status: 408,
      success: false,
      message: "Request timeout. Please try again.",
      errors: "The request took too long to respond.",
    };
  }

  if (error?.response) {
    return {
      status: error.response.status,
      success: false,

      message: error.response.data?.message || "An error occurred",
      errors:
        typeof error.response.data?.data === "string"
          ? error.response.data.data
          : error.response.data?.data?.error || "An error occurred",
    };
  } else if (error?.request) {
    return {
      status: 504,
      success: false,

      message: "Something went wrong. Please try again.",
      errors: "Unable to process request.",
    };
  } else {
    return {
      status: 500,
      success: false,
      message: error?.message || "An unexpected error occurred.",
      errors: error?.message || "Unknown error.",
    };
  }
}