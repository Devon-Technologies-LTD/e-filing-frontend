"use client";

import { useContext, useState, useEffect } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useFormState } from "react-dom";
import { OTPAction, reSendOtpAction } from "@/lib/actions/signup";
import { useRouter } from "next/navigation";
import { getOtpEmail } from "@/lib/getCookies";
import { toast } from "sonner";
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { OnboardingContext } from '@/context/OnboardingContext';

const OtpComponent = () => {
    const [state, dispatch] = useFormState(OTPAction, undefined);
    const [otpState, dispatchOTP] = useFormState(reSendOtpAction, undefined);
    const [timeLeft, setTimeLeft] = useState(60 * 5);
    const [email, setEmail] = useState<string>("");
    const [isResending, setIsResending] = useState(false);
    const { loading, setLoading, setActive } = useContext(OnboardingContext);
    const router = useRouter();

    // Handle OTP resend response
    useEffect(() => {
        if (!otpState) return;
        toast[otpState.success ? "success" : "error"](otpState.message);
        if (otpState.success) setTimeLeft(300);
        setIsResending(false);
    }, [otpState]);

    // Handle errors in OTP submission
    useEffectAfterMount(() => {
        if (state && CLIENT_ERROR_STATUS.includes(state?.status)) {
            toast.error(state?.message, {
                description: typeof state?.errors === "string"
                    ? state.errors
                    : state?.errors
                        ? Object.values(state.errors).flat().join(", ")
                        : undefined,
            });
        }
        setLoading(false);
    }, [state]);

    // Fetch email from cookies
    useEffect(() => {
        getOtpEmail().then((emailCookie) => {
            if (!emailCookie) router.back();
            else setEmail(emailCookie);
        });
    }, []);

    // Countdown timer
    useEffect(() => {
        setActive(true);
        if (timeLeft === 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(new FormData(e.target as HTMLFormElement));
    };

    const handleResendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsResending(true);
        dispatchOTP(new FormData());
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-full space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex flex-1 justify-center mt-10">
                <div>
                    <div className="text-center">
                        <p className="text-app-primary text-3xl font-bold">Check your email for a code</p>
                        <p className="text-sm font-semibold">
                            We&apos;ve sent a 6-character code to <b>{email}</b>.<br />
                            The code expires shortly, so please enter it soon.
                        </p>
                    </div>

                    <form id="otp-form" onSubmit={handleSubmit} className="space-y-6 text-center">
                        <InputOTP name="otp" maxLength={6} required>
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
                    </form>

                    <div className="text-center space-y-2 mt-6">
                        <p className="text-sm font-semibold">Didn&apos;t get the code?</p>
                        <p className="text-xl font-bold text-gray-500">{formatTime()}</p>
                        <form onSubmit={handleResendOTP}>
                            <button
                                type="submit"
                                className={`text-xs font-bold mt-3 z-10 cursor-pointer ${timeLeft > 0 || isResending ? 'text-gray-400 cursor-not-allowed' : 'text-app-primary'
                                    }`}
                                disabled={timeLeft > 0 || isResending}
                            >
                                {isResending ? 'Resending...' : 'Resend Code'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { OtpComponent };