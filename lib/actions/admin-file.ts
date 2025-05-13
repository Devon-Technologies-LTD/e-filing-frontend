"use server";
import CaseFileService, {
    IDraftFilter,
} from "../_services/case-file";
import UserService from "../_services/user-service";

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

const handleError = (err: unknown) => {
    const error = err as ErrorResponse;

    if (error?.response) {
        return {
            status: error.response.status,
            message: error.response.data.message,
            errors: error.response.data.data,
            success: false,
            data: [],
        };
    }

    if (error?.request) {
        return {
            status: 504,
            message: "Something went wrong. Please try again.",
            errors: "Unable to process request.",
            success: false,
            data: [],
        };
    }

    if (error?.message) {
        return {
            status: 500,
            message: error.message,
            errors: error.message,
            success: false,
            data: [],
        };
    }

    return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
        data: [],
    };
};

export async function getCaseFiles(payload: IDraftFilter, page: number, size: number) {
    try {
        const data = await CaseFileService.getCaseFilesAdmin(payload, page, size);
        return { ...data, success: true };
    } catch (err) {
        console.log(err);
        return handleError(err);
    }
}

export async function getHearing() {
    try {
        const data = await CaseFileService.getHearing();
        return { ...data, success: true };
    } catch (err) {
        return handleError(err);
    }
}
export async function getSingleHearing(id: string) {
    try {
        const data = await CaseFileService.getSingleHearing(id);
        return { ...data, success: true };
    } catch (err) {
        return handleError(err);
    }
}

export async function getNotification() {
    try {
        const data = await UserService.getNotification();
        return { ...data, success: true };
    } catch (err) {
        return handleError(err);
    }
}

export async function updateNotification(id: string) {
    try {
        const data = await UserService.updateNotification(id);
        return { ...data, success: true };
    } catch (err) {
        return handleError(err);
    }
}
export async function getVerification() {
    try {
        const data = await UserService.getVerification();
        return { data: data, success: true, message: "success" };
    } catch (err) {
        return handleError(err);
    }
}
