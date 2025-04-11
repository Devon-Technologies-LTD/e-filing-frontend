"use server";
import DocumentService, {
  DeleteDocumentPayload,
} from "../_services/document-service";
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

export async function uploadDocumentAction(formData: FormData) {
  try {
    const data = await DocumentService.uploadDocument(formData);
    return { data: data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}

export async function updateDocumentAction(formData: FormData) {
  try {
    const data = await DocumentService.uploadDocument(formData);
    return { data: data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    handleApiError(error);
  }
}
export async function deleteDocumentAction(payload: DeleteDocumentPayload) {
  try {
    const data = await DocumentService.deleteDocument(payload);
    return { data: data, success: true };
  } catch (err: unknown) {
    console.log("err thrown", err);
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
