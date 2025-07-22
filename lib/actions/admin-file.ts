"use server";
import { ROLES } from "@/types/auth";
import CaseFileService, { IDraftFilter } from "../_services/case-file";
import UserService from "../_services/user-service";

type ErrorResponse = {
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
};

const handleError = (err: unknown) => {
  const error = err as ErrorResponse;

  if (error?.response) {
    return {
      status: error.response.status,
      message: error.response.data.message,
      errors: error.response.data.data,
      success: false,
      data: [],
    };
  }

  if (error?.request) {
    return {
      status: 504,
      message: "Something went wrong. Please try again.",
      errors: "Unable to process request.",
      success: false,
      data: [],
    };
  }

  if (error?.message) {
    return {
      status: 500,
      message: error.message,
      errors: error.message,
      success: false,
      data: [],
    };
  }

  return {
    status: 500,
    message: "An unexpected error occurred.",
    errors: "Unknown error.",
    success: false,
    data: [],
  };
};

export async function getCaseFiles(
  payload: IDraftFilter,
  page: number,
  size: number
) {
  try {
    const data = await CaseFileService.getCaseFilesAdmin(payload, page, size);
    return { ...data, success: true };
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}

export async function getHearing() {
  try {
    const data = await CaseFileService.getHearing();
    return { ...data, success: true };
  } catch (err) {
    return handleError(err);
  }
}
export async function getSingleHearing(id: string, role: ROLES) {
  try {
    if ([ROLES.LAWYER, ROLES.USER].includes(role as ROLES)) {
      const data = await CaseFileService.getSingleHearingUser(id);
      return { ...data, success: true };
    } else {
      const data = await CaseFileService.getSingleHearing(id);
      return { ...data, success: true };
    }
  } catch (err) {
    return handleError(err);
  }
}

export async function getNotification() {
  try {
    const data = await UserService.getNotification();
    return { ...data, success: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function updateNotification(id: string) {
  try {
    const data = await UserService.updateNotification(id);
    return { ...data, success: true };
  } catch (err) {
    return handleError(err);
  }
}
export async function getVerification(role: ROLES) {
  try {
    let data;
    if (role == ROLES.USER || role === ROLES.LAWYER) {
      data = await UserService.getVerification();
    } else {
      data = await UserService.getVerificationAdmin();
    }
    return { data: data, success: true, message: "success" };
  } catch (err) {
    return handleError(err);
  }
}
