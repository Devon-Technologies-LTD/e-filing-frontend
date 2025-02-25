"use server";
import { ErrorResponse } from "@/types/auth";
import PaymentService from "../_services/payment-service";
import { handleApiError } from "../utils";

export async function generateRRR(caseFileId: string, amount?: any) {
  console.log("enteringggg generate");
  try {
    const data = await PaymentService.generateRRR(caseFileId, amount);
    console.log("response from genreating rrr", data);
    return { data: data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    // return handleApiError(error);
    return {
      data: error.response?.data,
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred.",
      errors: error.response?.data?.data || null,
      success: true,
    };
  }
}
