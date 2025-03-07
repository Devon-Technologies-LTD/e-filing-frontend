"use server";
import CaseFileService, {
  CaseTypeDetails,
  IChangeStatus,
  ICreateCaseFileData,
  IDraftFilter,
} from "../_services/case-file";
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

export async function createCaseFile(payload: ICreateCaseFileData) {
  try {
    const data = await CaseFileService.postCaseFile(payload);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function getCaseFiles(
  payload: IDraftFilter,
  isAdmin: boolean = false
) {
  try {
    const data = isAdmin
      ? await CaseFileService.getCaseFilesAdmin(payload)
      : await CaseFileService.getCaseFiles(payload);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function getAdminCaseFiles(payload: IDraftFilter) {
  try {
    const data = await CaseFileService.getCaseFilesAdmin(payload);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function getCaseActivity(id: string) {
  try {
    const data = await CaseFileService.getCaseActivity(id);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function getCaseFilesById(id: string) {
  try {
    const data = await CaseFileService.getCaseFilesbyId(id);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function getAdminCaseFilesById(id: string) {
  try {
    const data = await CaseFileService.getAdminCaseFilesbyId(id);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function deleteCase(id: string) {
  try {
    const data = await CaseFileService.deleteCaseFiles(id);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function changeCaseStatus(id: string, payload: IChangeStatus) {
  try {
    const data = await CaseFileService.changeCaseStatus(id, payload);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function updateCaseFile({
  payload,
  caseFileId,
}: {
  payload: ICreateCaseFileData;
  caseFileId: string;
}) {
  try {
    const data = await CaseFileService.patchCaseFile({ payload, caseFileId });
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}

export async function createCaseType(payload: CaseTypeDetails) {
  try {
    const data = await CaseFileService.postCaseType(payload);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
export async function getCaseTypes(payload: any, id: string) {
  try {
    const data = await CaseFileService.getCaseTypeDetails({ payload, id });
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}

export async function updateCaseType({
  payload,
  caseFileId,
}: {
  payload: ICreateCaseFileData;
  caseFileId: string;
}) {
  try {
    const data = await CaseFileService.patchCaseType({ payload, caseFileId });
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    return handleApiError(error);
  }
}
