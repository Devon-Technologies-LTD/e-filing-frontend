import type { NextRequest } from "next/server";
import { NextResponse } from "next/server"; // Next.js' Response object
import { axiosInstance } from "@/lib/_api/axios-config";

type ErrorResponse = {
    name: string;
    response?: {
        status: number;
        data: {
            message: string;
            data?: { error?: string }; // Some errors are nested under `data`
            error?: string; // Some APIs return an `error` key directly
        };
    };
    request?: unknown;
    message?: string;
};

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received Data:", data);

        // Sending request to external API
        const response = await axiosInstance.post(`/admin/user`, data);
        console.log("API Response:", response.data);

        return new NextResponse(JSON.stringify(response.data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        const error = err as ErrorResponse;
        console.log("Error Occurred:", error);

        if (error?.response) {
            const { status, data } = error.response;

            console.log("Server responded with error:", data);

            return new NextResponse(
                JSON.stringify({
                    status,
                    message: data.message || "Validation error occurred.",
                    errors: data.data || data.error || "Unknown error.", // Fix: Extract error message correctly
                    success: false,
                }),
                { status } // ✅ Ensure the correct HTTP status is returned
            );
        } else if (error?.request) {
            console.error("No response received from server");
            return new NextResponse(
                JSON.stringify({
                    status: 504,
                    message: "Something went wrong. Please try again.",
                    errors: "Unable to process request.",
                    success: false,
                }),
                { status: 504 }
            );
        } else if (error?.message) {
            console.error("Unexpected error:", error.message);
            return new NextResponse(
                JSON.stringify({
                    status: 500,
                    message: error.message,
                    errors: error.message,
                    success: false,
                }),
                { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({
                    status: 500,
                    message: "An unexpected error occurred.",
                    errors: "Unknown error.",
                    success: false,
                }),
                { status: 500 }
            );
        }
    }
}
