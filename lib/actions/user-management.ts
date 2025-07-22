
"use server";
import { axiosInstance } from "../_api/axios-config";
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
    courtype?: string,
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const fetchData = async (serviceMethod: Function, params?: unknown) => {
    try {
        const data = await serviceMethod(params);
        return { ...data, success: true };
    } catch (err) {
        return handleError(err);
    }
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const fetchData2 = async (serviceMethod: Function, params?: unknown) => {
    try {
        return await serviceMethod(params);
    } catch (err) {
        return handleError(err);
    }
};

export const getUserManagement = (params: Ipage) => fetchData(UserService.getUserManagement, params);
export const getUserManagementFilter = (params: Ipage) => fetchData(UserService.getUserManagementFilter, params);
export const getUserCase = () => fetchData2(UserService.getUserCase);
export const getAllUser = () => fetchData(UserService.getAllUser);
export const getPendingUser = (params: Ipage) => fetchData(UserService.getPendingUsers, params);
export const getOversight = (params: Ipage) => fetchData(UserService.magistrateOversight, params);
export const getPerformance = (params: Ipage) => fetchData(UserService.getPerformance, params);
export const getCaseMetric = () => fetchData(UserService.caseMetric);
export const getCaseMetric2 = () => fetchData(UserService.caseMetric2);
export const getCaseBreakDown = (id: string) => fetchData2(UserService.getCaseBreakDown, id);
export const getMagisterateBreakDown = (id: string) => fetchData2(UserService.getMagisterateBreakDown, id);
export const getFinanceBreakDown = (id: string) => fetchData2(UserService.getFinanceBreakDown, id);
export const magistrateMetric = () => fetchData(UserService.magistrateMetric);
export const getFinancialMetric = () => fetchData(UserService.getFinancialMetric);
export const getCaseDistribution = () => fetchData(UserService.getCaseDistribution);
export const breakdown = (type: string, id: string) => {
    if (type === "magistrate") {
        return fetchData2(UserService.getMagisterateBreakDown, id);
    } else if (type === "case") {
        return fetchData2(UserService.getCaseBreakDown, id);
    } else if (type === "finances") {
        return fetchData2(UserService.getFinanceBreakDown, id);
    }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const handleFormAction = async (serviceMethod: Function, formData: FormData) => {
    const formDataObject = Object.fromEntries(formData.entries());
    try {
        const data = await serviceMethod(formDataObject);
        return { data, success: true, status: 200 };
    } catch (err) {
        return handleError(err);
    }
};

export const InviteUserAction = (_prevState: unknown, formData: FormData) => handleFormAction(UserService.addUserManagement, formData);
export const ActiveUserAction = (_prevState: unknown, formData: FormData) => handleFormAction(UserService.addUserManagement, formData);




// export const  = (params: any) => fetchData(

//     UserService.resetPassword, params
// );


export async function resetPassword(
    // prevState: { success: boolean | null; message: string; errors?: any },
    _prevState: unknown,
    formData: FormData,
    
) {
    const data = Object.fromEntries(formData.entries());
    try {
        
        await axiosInstance.post("/auth/change-password", data);
        return { status: 200, success: true, message: "Password changed successfully", errors: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.response) {
            return {
                success: false,
                status: 400,
                message: err.response.data?.message || "An error occurred",
                errors: err.response.data?.errors || {},
            };
        }
        return { success: false, status: 400, message: "Network error. Please try again.", errors: {} };
    }
}
