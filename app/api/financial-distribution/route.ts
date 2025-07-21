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

export async function GET(req: NextRequest) {
    try {

        const url = `/admin/analyitcs/financial-distribution`;
        // Sending request to external API
        const response = await axiosInstance.get(url);
        

        return new NextResponse(JSON.stringify(response.data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        console.error("Error Occurred:", err);

        if (err.response) {
            const { status, data } = err.response;
            console.error("Server responded with error:", data);

            return new NextResponse(
                JSON.stringify({
                    status,
                    message: data?.message || "Validation error occurred.",
                    errors: data?.errors || data?.error || "Unknown error.",
                    success: false,
                }),
                { status }
            );
        } else if (err.request) {
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
        } else {
            console.error("Unexpected error:", err.message);
            return new NextResponse(
                JSON.stringify({
                    status: 500,
                    message: err.message || "An unexpected error occurred.",
                    errors: err.message || "Unknown error.",
                    success: false,
                }),
                { status: 500 }
            );
        }
    }
}
