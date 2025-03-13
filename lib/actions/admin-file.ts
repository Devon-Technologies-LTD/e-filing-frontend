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


export async function getCaseFiles(payload: IDraftFilter) {
    console.log("this is the payload", payload);

    try {
        const data = await CaseFileService.getCaseFilesAdmin(payload);
        return { ...data, success: true };
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        console.log(error);

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