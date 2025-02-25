"use server";

import { OTPFormSchema, SignupFormSchema, } from "@/lib/_definitions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ErrorResponse, handleError, LoginResponseData, ROLES } from "@/types/auth";
import authService from "../_services/auth-service";
import { createSession } from "../server/auth";
import { defaultLoginRedirect } from "@/routes";
import { NEXT_BASE_URL } from "@/lib/_constants"


export async function reSendOtpAction(_prevState: unknown, formData: FormData) {
    try {
        const email = cookies().get("otpEmail")?.value;
        if (!email) {
            return {
                status: 400,
                message: "Email not found in session. Please restart the process.",
                errors: "Missing email.",
                success: false,  // Ensure success is always included
            };
        }
        const res = await authService.resendOtp({ email });

        return {
            status: 200,
            message: "Email sent successfully.",
            success: true,  // Ensure success is always included
        };

    } catch (err: unknown) {
        return handleError(err);  // handleError now always includes `success`
    }
}

export async function OTPAction(_prevState: unknown, formData: FormData) {
    const dataz = Object.fromEntries(formData);
    const result = OTPFormSchema.safeParse(dataz);

    if (!result.success) {
        return {
            status: 400,
            errors: result.error.flatten().fieldErrors,
            message: "Login failed",
        };
    }

    let role: ROLES;
    try {
        const email = cookies().get("otpEmail")?.value;
        if (!email) {
            return {
                status: 400,
                message: "Email not found in session. Please restart the process.",
                errors: "Missing email.",
            };
        }

        const res = await authService.verifyOtp({
            otp: result.data.otp,
            email: email,
        });

        const responseData = res.data as LoginResponseData;

        // Retrieve stored session data
        const storedData = cookies().get("AuthData")?.value;
        if (!storedData) {
            return {
                status: 400,
                message: "Session data missing. Please restart the process.",
                errors: "Missing session data.",
            };
        }

        const sessionData = JSON.parse(storedData);
        const updatedSessionData = {
            user: {
                id: sessionData.user.id,
                email: responseData.email,
                first_name: sessionData.user.first_name,
                last_name: sessionData.user.last_name,
                phone_number: sessionData.user.phone_number,
                role: sessionData.user.role as ROLES,
            },
            token: responseData.token,
        };

        role = updatedSessionData.user.role;
        await createSession(updatedSessionData);
    } catch (err: unknown) {
        return handleError(err);
    }
    return redirect(defaultLoginRedirect(role));
}

export async function SignupAction(_prevState: unknown, formData: FormData) {
    // Extract form data
    const data = Object.fromEntries(formData.entries());
    const image = formData.get("image") as File | null;

    if (!image) {
        return {
            status: 400,
            message: "Image file is required",
        };
    }

    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(image.type)) {
        return {
            status: 400,
            message: "Invalid image format. Only JPG and PNG are allowed.",
        };
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (image.size > maxSize) {
        return {
            status: 400,
            message: "File size exceeds the 5MB limit.",
        };
    }

    // Upload the image to the API
    const uploadFormData = new FormData();
    uploadFormData.append("image", image);

    const result = SignupFormSchema.safeParse({ ...data });
    if (!result.success) {
        return {
            status: 400,
            errors: result.error.flatten().fieldErrors,
            message: "Validation failed, please check input fields",
        };
    }

    try {
        const url = `${NEXT_BASE_URL}/auth/signup`;
        const signupResponse = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if (!signupResponse.ok) {
            const errorData = await signupResponse.json();
            throw {
                response: {
                    status: signupResponse.status,
                    data: errorData,
                },
            };
        }
        const responseData = await signupResponse.json();
        // Prepare session data
        const sessionData = {
            user: {
                id: responseData.ID,
                email: responseData.email,
                first_name: responseData.first_name,
                last_name: responseData.last_name,
                phone_number: responseData.phone_number,
                role: responseData.role,
            },
            token: responseData.token,
        };

        // Store session data
        cookies().set("otpEmail", result.data.email);
        cookies().set("AuthData", JSON.stringify(sessionData));
    } catch (err: unknown) {
        return handleError(err);
    }
    // Redirect to OTP page
    redirect("/otp");
}