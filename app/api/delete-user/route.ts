import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { axiosInstance } from "@/lib/_api/axios-config";

export async function POST(req: NextRequest) {
    try {
        const d = await req.json();
        console.log("Received Data:", d);



        if (!d.userId) {
            return new NextResponse(
                JSON.stringify({
                    status: 400,
                    message: "User ID is required.",
                    success: false,
                }),
                { status: 400 }
            );
        }

        console.log("Deleting User ID:", d.userId);
        const response = await axiosInstance.delete(`/admin/user/${d.userId}`, {
            data: {
                email: d.email,
                is_soft_delete: true
            }
        } as any);
        
        console.log("API Response:", response.data);

        return new NextResponse(JSON.stringify(response.data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err: any) {
        console.error("Error Occurred:", err);

        if (err.response) {
            const { status, data } = err.response;
            console.log("Server responded with error:", data);

            return new NextResponse(
                JSON.stringify({
                    status,
                    message: data?.message || "Validation error occurred.",
                    errors: data?.data?.error || data?.error || "Unknown error.",
                    success: false,
                }),
                { status }
            );
        } else if (err.request) {
            console.error("No response received from server");
            return new NextResponse(
                JSON.stringify({
                    status: 504,
                    message: "Server did not respond. Please try again.",
                    errors: "No response from server.",
                    success: false,
                }),
                { status: 504 }
            );
        } else {
            console.error("Unexpected error:", err.toString());
            return new NextResponse(
                JSON.stringify({
                    status: 500,
                    message: "An unexpected error occurred.",
                    errors: err.toString(),
                    success: false,
                }),
                { status: 500 }
            );
        }
    }
}
