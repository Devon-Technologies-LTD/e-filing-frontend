"use server";
import PublicApis from "../_services/constants.service";
import { handleApiError } from "../utils";

export async function getCaseTypes() {
  try {
    const data = await PublicApis.getAllTypes();
    return data;
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
