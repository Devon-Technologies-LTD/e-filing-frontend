'use client'
import { useEffect, useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { useFormState } from "react-dom";
import { verifyOTP } from "@/lib/actions/login";
import { SubmitButton } from "@/components/ui/submit-button"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

export default function PASSWORDOTPCOMPONENT({ email }: { email: any }) {
    const [state, dispatch] = useFormState(verifyOTP, undefined);
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 15 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <AuthLayout
            headerContent={
                <Link
                    href="/login"
                    className="text-sm font-bold text-app-primary relative z-10"
                >
                    Log In
                </Link>
            }
        >
            <form action={dispatch}>
                <div className="flex flex-col text-center justify-center items-center space-y-6 px-4 sm:px-6">
                    <p className="text-app-primary text-2xl sm:text-3xl font-bold">
                        Check your email for a code
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                        We&apos;ve sent a 6-character code to {email}. <br />
                        The code expires shortly, so please enter it soon.
                    </p>
                    <InputOTP maxLength={6} name="otp"
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>

                        <InputOTPGroup className="gap-2">
                            {[...Array(3)].map((_, i) => (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[64px] w-[48px] sm:h-[114px] sm:w-[86px] rounded-md"
                                />
                            ))}
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-neutral-400 mx-4 sm:mx-6" />
                        <InputOTPGroup className="gap-2">
                            {[...Array(3)].map((_, i) => (
                                <InputOTPSlot
                                    key={i + 3}
                                    index={i + 3}
                                    className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[64px] w-[48px] sm:h-[114px] sm:w-[86px] rounded-md"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="text-xs text-red-500 h-2 text-center">
                        {state && state?.message}
                    </p>
                    <SubmitButton value="PROCEED" pendingValue="Processing..." className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2" />

                    <div className="space-y-2 mt-6">
                        <p className="text-xs sm:text-sm text-gray-500">
                            Didn&apos;t get the code?
                        </p>
                        <p className="text-xl font-bold text-gray-500">{formatTime(timeLeft)}</p>
                        <div className="flex items-center justify-center ">
                            <div className="items-center text-app-primary group relative">
                                <p
                                    className={`text-xs text-center font-bold mt-3 z-10 cursor-pointer ${timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-app-primary'}`}
                                    onClick={() => timeLeft <= 0 && setTimeLeft(15 * 60)}
                                >
                                    Resend Code
                                </p>
                                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-app-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-32 group-hover:bg-app-secondary"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}

export { PASSWORDOTPCOMPONENT };