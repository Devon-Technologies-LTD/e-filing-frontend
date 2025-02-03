"use server";

import {
  EMailFormSchema,
  LoginFormSchema,
  OTPFormSchema,
  SignupFormSchema,
} from "@/lib/_definitions";
import authService from "@/lib/_services/auth-service";
import  { createSession, deleteSession } from "../server/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT, defaultLoginRedirect } from "@/routes";
import { cookies } from "next/headers";
import { z } from "zod";
import { ROLES } from "@/types/auth";

interface LoginResponseData {
  ID: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: ROLES;
  token: string;
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
  const userType = data.userType;
  const result = LoginFormSchema.safeParse(data);
  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "Login failed",
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
        last_name: data.last_name,
        phone_number: data.phone_number,
        role: userType as ROLES,
        // role: data.role as ROLES,
      },
      token: data.token,
    };
    role = sessionData.user.role;
    await createSession(sessionData);
    // return {
    //   status: 200,
    //   message: "Login successful.",
    //   success: true,
    // };
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

  // redirect(DEFAULT_LOGIN_REDIRECT);
  redirect(defaultLoginRedirect(role));
}
export async function SignupAction(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = SignupFormSchema.safeParse(data);
  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "Login failed",
    };
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
    await createSession(sessionData);
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
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
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
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
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
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "Login failed",
    };
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
    await createSession(sessionData);
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
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
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
        message: "An unexpected error occurred.",
        errors: "Unknown error.",
      };
    }
  }
  redirect(DEFAULT_LOGIN_REDIRECT);
}

export async function ForgotPasswordAction(
  _prevState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData);
  const result = EMailFormSchema.safeParse(data);

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
    await authService.forgotPassword(result.data);
    // Store email in cookie/session
    cookies().set("otpEmail", result.data.email);
  } catch (err: any) {
    console.log(err);
    if (err?.response) {
      return {
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.data,
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
      errors: result.error.flatten().fieldErrors,
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

    console.log(data.token);
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
  const result = z
    .object({
      confirmPassword: z
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

    // API call
    await authService.resetPassword({
      new_password: result.data.newPassword,
      confirm_password: result.data.confirmPassword,
      email: email,
    });

    cookies().delete("otpEmail");

    return {
      status: 200,
      message: "Password has been successfully reset.",
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
}
