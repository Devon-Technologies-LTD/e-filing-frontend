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

export async function validatePayment(casefile_id: string, reference: string) {
  console.log("casefile_id on verify", casefile_id);
  console.log("remita on verify", reference);
  try {
    const data = await PaymentService.validatePayment({
      casefile_id,
      reference,
    });
    console.log("response from validating service", data);
    return { data: data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
