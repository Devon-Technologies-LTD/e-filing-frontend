"use client";

import { useState, useEffect } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { OTPAction } from "@/lib/actions/signup";
import { useRouter } from "next/navigation";
import { getOtpEmail } from "@/lib/getCookies";

const OtpComponent = () => {
    const [state, dispatch] = useFormState(OTPAction, undefined);
    const [timeLeft, setTimeLeft] = useState(300);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        const fetchEmail = async () => {
            const emailCookie = await getOtpEmail(); // Await the Promise
            if (!emailCookie) {
                router.back();
            } else {
                setEmail(emailCookie);
            }
        };
        fetchEmail();
    }, [router]);
    useEffect(() => {
        if (timeLeft === 0) {
            setResendDisabled(false);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const handleResend = () => {
        setTimeLeft(300);
        setResendDisabled(true);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        await dispatch(formData);
        setLoading(false);
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-full space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 flex justify-center items-center">
                <form id="otp-form" onSubmit={handleSubmit} className="space-y-6 text-center">
                    <p className="text-app-primary text-3xl font-bold">Check your email for a code</p>
                    <p className="text-sm font-semibold">
                        We&apos;ve sent a 6-character code to {email}.<br />
                        The code expires shortly, so please enter it soon.
                    </p>
                    <p className="text-xs text-red-500 h-2 mt-3 text-center">
                        {state?.message}
                    </p>

                    <InputOTP name="otp" maxLength={6}>
                        <InputOTPGroup className="gap-2">
                            {[...Array(3)].map((_, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]"
                                />
                            ))}
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-neutral-400 mx-6" />
                        <InputOTPGroup className="gap-2">
                            {[...Array(3)].map((_, index) => (
                                <InputOTPSlot
                                    key={index + 3}
                                    index={index + 3}
                                    className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <div className="space-y-2 mt-6">
                        <p className="text-sm font-semibold">Didn&apos;t get the code?</p>
                        <p className="text-xl font-bold text-gray-500">{formatTime()}</p>
                        <Button variant="link" onClick={handleResend} disabled={resendDisabled} className="text-xs">
                            Resend Code
                        </Button>
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center mt-2">
                            <div className="spinner"></div> {/* Add spinner */}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export { OtpComponent };
