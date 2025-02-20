"use server";
import CaseFileService, {
  CaseTypeDetails,
  ICreateCaseFileData,
  IDraftFilter,
} from "../_services/case-file";
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
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}
export async function getCaseFiles(payload: IDraftFilter) {
  console.log("this is the payload", payload);

  try {
    const data = await CaseFileService.getCaseFiles(payload);
    console.log("this is from the server function", data);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}
export async function getCaseFilesById(id: string) {
  console.log("first entering by id");
  try {
    const data = await CaseFileService.getCaseFilesbyId(id);
    console.log("this is from the server function", data);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    console.log("server error", error);
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}
export async function deleteCase(id: string) {
  try {
    const data = await CaseFileService.deleteCaseFiles(id);
    console.log("this is from the server function", data);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}
export async function updateCaseFile({
  payload,
  caseFileId,
}: {
  payload: ICreateCaseFileData;
  caseFileId: string;
}) {
  console.log("entering update case");
  try {
    const data = await CaseFileService.patchCaseFile({ payload, caseFileId });
    console.log("response from updating case", data);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}

export async function createCaseType(payload: CaseTypeDetails) {
  console.log("create case type payload", payload);
  try {
    const data = await CaseFileService.postCaseType(payload);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}
export async function getCaseTypes(payload: any, id: string) {
  try {
    const data = await CaseFileService.getCaseTypeDetails({ payload, id });
    console.log("this is from the server function", data);
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}

export async function updateCaseType({
  payload,
  caseFileId,
}: {
  payload: ICreateCaseFileData;
  caseFileId: string;
}) {
  console.log("first entering update case type")
  try {
    const data = await CaseFileService.patchCaseType({ payload, caseFileId });
    return { ...data, success: true };
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
        data: [],
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
        data: [],
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
        data: [],
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
      };
    }
  }
}
