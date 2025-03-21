
"use server";
import UserService from "../_services/user-service";

type ErrorResponse = {
    response?: { status: number; data: { message: string; data?: { error?: string }; error: string } };
    request?: unknown;
    message?: string;
};

export interface Ipage {
    page?: number;
    size?: number;
    role?: string;
    court_division_id?: string;
    division_id?: string;
    search?: string;
    court_type?: string,
    end_date?: string,
    start_date?: string,
    usertype?: string,
    invited_by?: string,
    query?: string,
    status?: string,
    casetype?: string,
    sub_division?: string,
    user_id?: string,
    year?: string,
}

const handleError = (err: unknown) => {
    console.error("API Error:", err);
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
};

const fetchData = async (serviceMethod: Function, params?: any) => {
    try {
        console.log(params);

        const data = await serviceMethod(params);
        return { ...data, success: true };
    } catch (err) {
        return handleError(err);
    }
};
const fetchData2 = async (serviceMethod: Function, params?: any) => {
    try {
        return await serviceMethod(params);
    } catch (err) {
        return handleError(err);
    }
};

export const getUserManagement = (params: Ipage) => fetchData(UserService.getUserManagement, params);
export const getUserManagementFilter = (params: Ipage) => fetchData(UserService.getUserManagementFilter, params);
export const getAllUser = () => fetchData(UserService.getAllUser);
export const getPendingUser = (params: Ipage) => fetchData(UserService.getPendingUsers, params);
export const getOversight = (params: Ipage) => fetchData(UserService.magistrateOversight, params);
export const getCaseMetric = () => fetchData(UserService.caseMetric);
export const getCaseBreakDown = (id: string) => fetchData2(UserService.getCaseBreakDown, id);
export const getMagisterateBreakDown = (id: string) => fetchData(UserService.getMagisterateBreakDown, id);
export const magistrateMetric = () => fetchData(UserService.magistrateMetric);
export const getCaseDistribution = () => fetchData(UserService.getCaseDistribution);

const handleFormAction = async (serviceMethod: Function, formData: FormData) => {
    const formDataObject = Object.fromEntries(formData.entries());
    console.log("Received Form Data:", formDataObject);
    try {
        const data = await serviceMethod(formDataObject);
        console.log("Response from server:", data);
        return { data, success: true, status: 200 };
    } catch (err) {
        return handleError(err);
    }
};

export const InviteUserAction = (_prevState: unknown, formData: FormData) => handleFormAction(UserService.addUserManagement, formData);
export const ActiveUserAction = (_prevState: unknown, formData: FormData) => handleFormAction(UserService.addUserManagement, formData);
