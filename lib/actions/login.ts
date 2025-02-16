"use server";

import {
  EMailFormSchema,
  LoginFormSchema,
  OTPFormSchema,
  ResetPasswordScheme,
  SignupFormSchema,
} from "@/lib/_definitions";
import authService from "@/lib/_services/auth-service";
import { createSession, deleteSession } from "../server/auth";
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
      data?: { error?: string };
      error: string;
    };
  };
  request?: unknown;
  message?: string;
};

export async function LoginAction(_prevState: unknown, formData: FormData) {
  console.log("formData", formData);
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
  redirect(defaultLoginRedirect(role));
}

export async function googleLoginAction(email: string) {
  let role: ROLES;
  try {
    const res = await authService.googleLoginUser(email);
    console.log(res);
    const data = res.data as LoginResponseData; //Cast to the expected type
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

export async function SignupAction(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  // Validate the image first
  const image = formData.get("image") as File | null;
  if (!image || (typeof File !== "undefined" && !(image instanceof File))) {
    return {
      status: 400,
      errors: "Image file is required",
      message: "Validation failed",
    };
  }

  // Validate the form data with image included
  const result = SignupFormSchema.safeParse({ ...data, image });

  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    const url = `${process.env.NEXT_BASE_URL as string}/api/v1/auth/signup`;
    console.log(url);
    console.log(formData);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        response: {
          status: response.status,
          data: errorData,
        },
      } as ErrorResponse;
    }

    const responseData = (await response.json()) as LoginResponseData;

    // Prepare session data
    const sessionData = {
      user: {
        id: responseData.ID,
        email: responseData.email,
        first_name: responseData.first_name,
        last_name: responseData.last_name,
        phone_number: responseData.phone_number,
        role: responseData.role as ROLES,
      },
      token: responseData.token,
    };
    // Store session data
    cookies().set("otpEmail", result.data.email);
    cookies().set("AuthData", JSON.stringify(sessionData));
  } catch (err: unknown) {
    const error = err as ErrorResponse;
    console.error(error?.response);

    if (error?.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || "An error occurred",
        errors:
          typeof error.response.data?.data === "string"
            ? error.response.data.data
            : error.response.data?.data?.error || "An error occurred",
      };
    } else if (error?.request) {
      return {
        status: 504,
        message: "Something went wrong. Please try again.",
        errors: "Unable to process request.",
      };
    } else {
      return {
        status: 500,
        message: error?.message || "An unexpected error occurred.",
        errors: error?.message || "Unknown error.",
      };
    }
  }
  return redirect("/otp");
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

    console.log(updatedSessionData);

    role = updatedSessionData.user.role;
    await createSession(updatedSessionData);

  } catch (err: unknown) {
    const error = err as ErrorResponse;
    console.log(error);

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
    } else {
      return {
        status: 500,
        message: error?.message || "An unexpected error occurred.",
        errors: error?.message || "Unknown error.",
      };
    }
  }
  return redirect(defaultLoginRedirect(role));

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
    cookies().set("TempToken", data.token);
    console.log(data);
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
    // const email = cookies().get("TempToken")?.value; // Ensure correct cookie handling
    // API call
    await authService.resetPassword({
      new_password: result.data.newPassword,
      confirm_password: result.data.confirmPassword,
      email: email,
    });
    cookies().delete("otpEmail");
    cookies().delete("TempToken");
    // return {
    //   status: 200,
    //   message: "Password has been successfully reset.",
    //   success: true,
    // };
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
