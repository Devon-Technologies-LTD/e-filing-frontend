import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { axiosInstance } from "@/lib/_api/axios-config";
import { cookies } from "next/headers";

// Define response type
interface AcceptInviteResponse {
    token: string;
    id: string;
    message?: string;
    success?: boolean;
}

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();
        if (!email || !otp) {
            return new NextResponse(
                JSON.stringify({
                    status: 400,
                    message: "Email and OTP are required.",
                    success: false,
                }),
                { status: 400 }
            );
        }
        const response = await axiosInstance.get<AcceptInviteResponse>(`/user/accept-invite/${email}/${otp}`);
        cookies().set("TempToken", response.data.token);
        cookies().set("TempID", response.data.id);
        return new NextResponse(JSON.stringify(response.data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err: any) {
        console.error("Error Occurred:", err);
        if (err.response) {
            const { status, data } = err.response;
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
                    status: 500,
                    message: "No response from server",
                    success: false,
                }),
                { status: 500 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                status: 500,
                message: "Internal server error",
                success: false,
            }),
            { status: 500 }
        );
    }
}
