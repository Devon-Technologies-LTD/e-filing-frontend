'use server'

import { LoginFormSchema, ROLES, SignupFormSchema } from "@/lib/_definitions"
import authService from "@/lib/_services/auth-service"
import auth from "../auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface LoginResponseData {
    ID: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    token: ROLES;
}

type ErrorResponse = {
    response?: {
        status: number;
        data: {
            message: string;
            data: string; // If `data` has a specific structure, replace `any` with its type.
        };
    };
    request?: unknown;
    message?: string;
};

export async function LoginAction(_prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = LoginFormSchema.safeParse(data);
    if (!result.success) {
        return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Login failed' };
    }
    try {
        const res = await authService.loginUser(result.data);
        const data = res.data as LoginResponseData;  //Cast to the expected type
        const sessionData = {
            user: {
                id: data.ID,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
                role: data.role as ROLES,
            },
            token: data.token,
        };
        await auth.createSession(sessionData);
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        if (error?.response) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                errors: error.response.data.data,
            };
        } else if (error?.request) {
            return {
                status: 504,
                message: 'Something went wrong. Please try again.',
                errors: 'Unable to process request.',
            };
        } else if (error?.message) {
            return {
                status: 500,
                message: error.message,
                errors: error.message,
            };
        } else {
            return {
                status: 500,
                message: 'An unexpected error occurred.',
                errors: 'Unknown error.',
            };
        }
    }

    redirect(DEFAULT_LOGIN_REDIRECT);
}
export async function SignupAction(_prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = SignupFormSchema.safeParse(data);
    if (!result.success) {
        return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Login failed' };
    }
    try {
        const res = await authService.signupUser(result.data);
        console.log(res);
        const data = res.data as LoginResponseData;
        const sessionData = {
            user: {
                id: data.ID,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
                role: data.role as ROLES,
            },
            token: data.token,
        };
        await auth.createSession(sessionData);
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        if (error?.response) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                errors: error.response.data.data,
            };
        } else if (error?.request) {
            return {
                status: 504,
                message: 'Something went wrong. Please try again.',
                errors: 'Unable to process request.',
            };
        } else if (error?.message) {
            return {
                status: 500,
                message: error.message,
                errors: error.message,
            };
        } else {
            return {
                status: 500,
                message: 'An unexpected error occurred.',
                errors: 'Unknown error.',
            };
        }
    }
    redirect(DEFAULT_LOGIN_REDIRECT);
    // redirect("/otp");
}
export async function OTPAction(_prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = SignupFormSchema.safeParse(data);
    if (!result.success) {
        return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Login failed' };
    }
    try {
        const res = await authService.signupUser(result.data);
        console.log(res);
        const data = res.data as LoginResponseData;
        const sessionData = {
            user: {
                id: data.ID,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
                role: data.role as ROLES,
            },
            token: data.token,
        };
        await auth.createSession(sessionData);
    } catch (err: unknown) {
        const error = err as ErrorResponse;
        if (error?.response) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                errors: error.response.data.data,
            };
        } else if (error?.request) {
            return {
                status: 504,
                message: 'Something went wrong. Please try again.',
                errors: 'Unable to process request.',
            };
        } else if (error?.message) {
            return {
                status: 500,
                message: error.message,
                errors: error.message,
            };
        } else {
            return {
                status: 500,
                message: 'An unexpected error occurred.',
                errors: 'Unknown error.',
            };
        }
    }
    redirect(DEFAULT_LOGIN_REDIRECT);
}
export async function logoutAction() {
    auth.deleteSession();
    auth.user = null;
    redirect('/login');
}

