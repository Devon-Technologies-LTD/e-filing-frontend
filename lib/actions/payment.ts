"use server";
import { ErrorResponse } from "@/types/auth";
import PaymentService from "../_services/payment-service";
import { handleApiError } from "../utils";

export async function generateRRR(caseFileId: string, amount?: any) {
  console.log("enteringggg generate");
  try {
    const data = await PaymentService.generateRRR(caseFileId, amount);
    console.log("response from generating service rrr", data);
    return { data: data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}

export async function validatePayment(
  casefile_id: string,
  reference: string,
  payment_method: string
) {
  try {
    const data = await PaymentService.validatePayment({
      casefile_id,
      reference,
      payment_method,
    });
    return { data: data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
