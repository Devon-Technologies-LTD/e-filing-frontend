import axios from "axios";
import { getToken } from "../server/auth";
import { NEXT_BASE_URL } from "../_constants";

const DEFAULT_TIMEOUT = 10000;

const axiosInstance = axios.create({
  baseURL: NEXT_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
});

// Request interceptor
axiosInstance.interceptors.request.use(async (config: any) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = token;
  }

  // Log request details
  console.log("🚀 [Request]");
  console.log("URL:", `${config.baseURL}${config.url}`);
  console.log("Method:", config.method?.toUpperCase());
  console.log("Headers:", config.headers);
  console.log("Payload:", config.data);

  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response details
    console.log("✅ [Response]");
    console.log("URL:", response.config.url);
    console.log("Status:", response.status);
    console.log("Data:", response.data);

    return response;
  },
  async (error) => {
    // Log error details
    console.log("❌ [Error Response]");
    if (error.response) {
      console.log("URL:", error.config?.url);
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    } else {
      console.log("Error Message:", error.message);
    }

    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      return Promise.reject({
        ...error,
        message: "Request timed out. Please try again.",
      });
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
