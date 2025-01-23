'use server'

import { LoginFormSchema } from "@/lib/_definitions"
import authService from "@/lib/_services/auth-service"

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

export async function loginAction(_prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData);

    const result = LoginFormSchema.safeParse(data);

    if (!result.success) {
        return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Login failed' };
    }

    try {
        // const res = await authService.loginUser(result.data);
        // const sessionData = {
        //     user: {
        //         staff_id: res.data.staff,
        //         id: res.data.ID,
        //         email: res.data.email,
        //         first_name: res.data.first_name,
        //         last_name: res.data.last_name,
        //         role: res.data.role,
        //     },
        //     token: res.data.token,
        // };
        // await auth.createSession(sessionData);
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

    // redirect(DEFAULT_LOGIN_REDIRECT);
}

export async function LoginAction(_prevState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData);
    const result = LoginFormSchema.safeParse(data);

    if (!result.success) {
        return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Login failed' };
    }

    try {
        const res = await authService.loginUser(result.data);
        console.log(res.data);
        // const sessionData = {
        //     user: {
        //         staff_id: res.data.staff,
        //         id: res.data.id,
        //         email: res.data.email,
        //         first_name: res.data.firstname,
        //         last_name: res.data.lastname,
        //         role: res.data.role,
        //     },
        //     token: res.data.token,
        // };
        // await auth.createSession(sessionData);
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

    // redirect(DEFAULT_LOGIN_REDIRECT);
}

// export async function logoutAction(_formData: FormData) {
//     auth.deleteSession();
//     auth.user = null;
//     redirect('/login');
// }
