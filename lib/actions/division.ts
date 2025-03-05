"use server";
import DivisionsService from "../_services/divisions-service";
import { handleApiError } from "../utils";
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

export async function getUserDivision() {
  try {
    const data  = await DivisionsService.getUserDivision();
    console.log(data);
    return { data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function getAdminDivision() {
  try {
    const data  = await DivisionsService.getAdminDivision();
    console.log(data);
    return { data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
