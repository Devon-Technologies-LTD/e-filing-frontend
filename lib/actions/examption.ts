'use server';
import { ErrorResponse } from "@/types/auth";
import { axiosInstance } from "../_api/axios-config";
import ExemptionService from "../_services/exemption-service";
import { handleApiError } from "../utils";

interface ExemptionData {
  id: string;
  user_id: string;
  name: string;
  email: string;
  exemption_code: string;
  status: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}



export async function createExemption(email: string): Promise<ApiResponse<ExemptionData>> {
  try {
    const response = await ExemptionService.createExemption(email);
    const payload = response.data;

    console.log("This is a data =->", JSON.stringify(payload));
    return payload as ApiResponse<ExemptionData>; // cast to our known shape
  } catch (err) {
    console.error("this is an error", err);

    return normalizeApiError(err) as ApiResponse<ExemptionData>;
  }
}


export async function createExemptionSimple(email: string) {
  try {
    console.log('Making API call to:', `/admin/user/exempt-user/${email}`);

    const response = await axiosInstance.get(`/admin/user/exempt-user/${email}`);

    console.log('Raw API response:', response);

    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('Simple error handler:', error);

    // Very basic error handling to avoid recursion
    let errorMessage = "An error occurred";

    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      data: {
        error: errorMessage,
        message: errorMessage
      }
    };
  }
}

export async function getExemption() {
  try {
    const res = await ExemptionService.getExemption();
    return res.data ?? [];
  } catch (err) {
    return handleApiError(err);
  }
}

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



function normalizeApiError(error: unknown) {
  // Default fallback
  let message = "An unexpected error occurred";

  // Axios error handling
  if (typeof error === "object" && error !== null) {
    const err = error as any;

    // If backend returned a response (common with Axios)
    if (err.response?.data) {
      message = err.response.data.message || message;
      return {
        success: false,
        message,
        data: err.response.data.data || null,
      };
    }

    // If it’s just an error with a message
    if (err.message) {
      message = err.message;
    }
  }

  return {
    success: false,
    message,
    data: null,
  };
}
