"use server";

import {
  EMailFormSchema,
  LoginFormSchema,
  OTPFormSchema,
  ResetPasswordScheme,
} from "@/lib/_definitions";
import authService from "@/lib/_services/auth-service";
import { createSession, deleteSession } from "../server/auth";
import { redirect } from "next/navigation";
import { defaultLoginRedirect } from "@/routes";
import { cookies } from "next/headers";
import { z } from "zod";
import { ErrorResponse, handleError, LoginResponseData, ROLES } from "@/types/auth";

export async function LoginAction(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = LoginFormSchema.safeParse(data);
  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "Invalid Email Address",
    };
  }
  let role: ROLES;
  try {
    const res = await authService.loginUser(result.data);
    const data = res.data as LoginResponseData; //Cast to the expected type
    const sessionData = {
      user: {
        id: data.ID,
        email: data.email,
        first_name: data.first_name,
        court_type: data.court_type,
        court_division_id: data.court_division_id,
        court_divison: data.court_divison,
        sub_division: data.sub_division,
        last_name: data.last_name,
        phone_number: data.phone_number,
        role: data.role as ROLES,
      },
      token: data.token,
    };
    console.log(sessionData);
    role = sessionData.user.role;
    await createSession(sessionData);
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        errors: error.response.data.data,
        success: false,
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
      };
    } else if (error?.message) {
      return {
        status: 500,
        message: error.message,
        errors: error.message,
        success: false,
      };
    } else {
      return {
        status: 500,
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
        success: false,
      };
    }
  }
  redirect(defaultLoginRedirect(role));
}

export interface LoginResponseData2 {
  user: {
    id: string;
    email: string;
    first_name: string;
    court_type: string;
    court_division_id: string;
    court_divison: string;
    sub_division: string;
    last_name: string;
    phone_number: string;
    role: ROLES;
  }
  token: string;
}


export async function googleLoginAction(email: string) {
  let role: ROLES;
  
  try {
    const res = await authService.googleLoginUser(email);
    const data = res.data as LoginResponseData2;
    const sessionData = {
      user: {
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.first_name,
        court_type: data.user.court_type,
        court_division_id: data.user.court_division_id,
        court_divison: data.user.court_divison,
        sub_division: data.user.sub_division,
        last_name: data.user.last_name,
        phone_number: data.user.phone_number,
        role: data.user.role as ROLES,
      },
      token: data.token,
    };
    role = sessionData.user.role;
    await createSession(sessionData);
  } catch (err: unknown) {
    return handleError(err);
  }

  redirect(defaultLoginRedirect(role));
}

export async function ForgotPasswordAction(
  _prevState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData);
  const result = EMailFormSchema.safeParse(data);
  console.log(result);

  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "",
      success: false,
    };
  }

  try {
    // Simulate API call (uncomment when ready)
  const resultz =  await authService.forgotPassword(result.data);
  console.log(resultz);
  
    // Store email in cookie/session
    cookies().set("otpEmail", result.data.email);
  } catch (err: any) {
    if (err?.response) {
      return {
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.data['error'],
        success: false,
      };
    } else if (err.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
        success: false,
      };
    } else {
      return {
        status: 500,
        message: err.message,
        errors: err.message,
        success: false,
      };
    }
  }
  // return { redirectUrl: "/password-otp" };
  redirect("/password-otp");
}

export async function logoutAction() {
  deleteSession();
  redirect("/login");
}

export async function verifyOTP(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = OTPFormSchema.safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten
        ().fieldErrors,
      message: "",
    };
  }
  try {
    const email = cookies().get("otpEmail")?.value; // Ensure correct cookie handling
    if (!email) {
      return {
        status: 400,
        message: "Email not found in session. Please restart the process.",
        errors: "Missing email.",
      };
    }
    // api
    const res = await authService.verifyOtp({
      otp: result.data.otp,
      email: email,
    });
    const data = res.data as LoginResponseData; //Cast to the expected type
    cookies().set("TempToken", data.token);
  } catch (err: any) {
    console.error("Failed to verify OTP:", err);
    return {
      status: err?.response?.status || 500,
      message: err?.response?.data?.message || "Failed to verify OTP.",
      errors: err?.response?.data?.errors || "An unknown error occurred.",
    };
  }
  redirect("/reset-password");
}

export async function changePassword(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = z
    .object({
      oldPassword: z
        .string()
        .min(1, { message: "Password field must not be empty." }),
      newPassword: z
        .string()
        .min(1, { message: "Password field must not be empty." }),
    })
    .safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "",
    };
  }

  try {
    const email = cookies().get("otpEmail")?.value;
    if (!email) {
      return {
        status: 400,
        message: "Email not found in session. Please restart the process.",
        errors: "Missing email.",
      };
    }
    await authService.changePassword({
      old_password: result.data.oldPassword,
      new_password: result.data.newPassword,
      email: email,
    });
    // If OTP is correct, clear the session/cookie
    cookies().delete("otpEmail");
  } catch (err: any) {
    console.error("Failed to verify OTP:", err);
    return {
      status: err?.response?.status || 500,
      message: err?.response?.data?.message || "Failed to verify OTP.",
      errors: err?.response?.data?.errors || "An unknown error occurred.",
    };
  }
  redirect("/reset-password");
}

export async function resetPassword(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = ResetPasswordScheme.safeParse(data);
  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "",
      success: false,
    };
  }
  try {
    const email = cookies().get("otpEmail")?.value;
    if (!email) {
      return {
        status: 400,
        message: "Email not found in session. Please restart the process.",
        errors: "Missing email.",
        success: false,
      };
    }
    const token = cookies().get("TempToken")?.value;
    console.log("This token  " + token);

    // API call
    await authService.resetPassword({
      new_password: result.data.newPassword,
      confirm_password: result.data.confirmPassword,
      email: email,
    });
    cookies().delete("otpEmail");
    cookies().delete("TempToken");
    return {
      status: 200,
      message: "Password has been successfully, Please Login.",
      success: true,
    };
  } catch (err: any) {
    console.error("Failed to reset password:", err);
    return {
      status: err?.response?.status || 500,
      message: err?.response?.data?.message || "Failed to reset password.",
      errors: err?.response?.data?.errors || "An unknown error occurred.",
      success: false,
    };
  }
  redirect("/login");
}

