"use server";
import PublicApis from "../_services/constants.service";
import { handleApiError } from "../utils";

export async function getCaseTypes() {
  try {
    const data = await PublicApis.getCaseTypes();
    return { data: data, success: true };
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function getSubCaseTypes(type: string) {
  try {
    const data = await PublicApis.getSubCaseTypes(type);
    return { data: data, success: true };
  } catch (error: any) {
    return handleApiError(error);
  }
}
export async function getWorth(payload: { type: string }) {
  try {
    const data = await PublicApis.getWorth(payload);
    return { data: data, success: true };
  } catch (error: any) {
    return handleApiError(error);
  }
}
export async function getDocumentFees() {
  try {
    const data = await PublicApis.getDocumentFees();
    return data;
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function getOtherDocumentsByCaseType(case_type: string, category:string) {
  try {
    const data = await PublicApis.getOtherDocumentsByCaseType(
      case_type,
      category
    );
    return { data: data, success: true };
  } catch (error: any) {
    return handleApiError(error);
  }
}
