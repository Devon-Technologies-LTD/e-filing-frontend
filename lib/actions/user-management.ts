"use server";
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


export interface Ipage {
    page?: number;
    size?: number;
}


export async function getUserManagement(params: Ipage) {
    try {
        const data = await UserService.getUserManagement(params);
        return { ...data, success: true };
    } catch (err: unknown) {
        console.log(err);
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

export async function getAllUser() {
    try {
        const data = await UserService.getAllUser();
        return { ...data, success: true };
    } catch (err: unknown) {
        console.log(err);
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

export async function getPendingUser(params: Ipage) {
    try {
        const data = await UserService.getPendingUsers(params);
        return { ...data, success: true };
    } catch (err: unknown) {
        console.log(err);
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


export async function InviteUserAction(_prevState: unknown, formData: FormData) {
    const formDataObject = Object.fromEntries(formData.entries());

    console.log("Received Form Data:", formDataObject);

    try {
        const data = await UserService.addUserManagement(formDataObject);
        console.log("Response from server:", data);
        return { data, success: true, status: 200 };
    } catch (err: unknown) {
        console.error("Error in InviteUserAction:", err);
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
        } else {
            return {
                status: 500,
                message: error.message || "An unexpected error occurred.",
                errors: error.message || "Unknown error.",
                success: false,
                data: [],
            };
        }
    }
}
export async function ActiveUserAction(_prevState: unknown, formData: FormData) {
    const formDataObject = Object.fromEntries(formData.entries());

    console.log("Received Form Data:", formDataObject);

    try {
        const data = await UserService.addUserManagement(formDataObject);
        console.log("Response from server:", data);
        return { data, success: true, status: 200 };
    } catch (err: unknown) {
        console.error("Error in InviteUserAction:", err);
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
        } else {
            return {
                status: 500,
                message: error.message || "An unexpected error occurred.",
                errors: error.message || "Unknown error.",
                success: false,
                data: [],
            };
        }
    }
}
