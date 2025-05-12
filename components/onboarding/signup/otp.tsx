"use client";

import { useContext, useState, useEffect, useRef } from "react";

import { useFormState } from "react-dom";
import { OTPAction, reSendOtpAction } from "@/lib/actions/signup";
import { useRouter } from "next/navigation";
import { getOtpEmail } from "@/lib/getCookies";
import { toast } from "sonner";
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { OnboardingContext } from '@/context/OnboardingContext';

// Custom OTP input component
const CustomOtpInput = ({
    value,
    onChange,
    numInputs = 6,
    shouldAutoFocus = true
}: {
    value: string;
    onChange: (value: string) => void;
    numInputs?: number;
    shouldAutoFocus?: boolean;
}) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // Initialize inputRefs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, numInputs);

        // Auto focus first input when component mounts if shouldAutoFocus is true
        if (shouldAutoFocus && inputRefs.current[0]) {
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [numInputs, shouldAutoFocus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value: inputValue } = e.target;

        // Prevent non-numeric inputs
        if (inputValue && !/^\d*$/.test(inputValue)) return;

        // Handle paste event (could contain multiple characters)
        if (inputValue.length > 1) {
            const pastedValue = inputValue.split('').slice(0, numInputs);
            const newValue = value.split('');

            pastedValue.forEach((char, idx) => {
                if (index + idx < numInputs) {
                    newValue[index + idx] = char;
                }
            });

            const updatedValue = newValue.join('').slice(0, numInputs);
            onChange(updatedValue);

            // Focus on appropriate field after paste
            const focusIndex = Math.min(index + pastedValue.length, numInputs - 1);
            if (focusIndex < numInputs) {
                inputRefs.current[focusIndex]?.focus();
            }
            return;
        }

        // Handle single character input
        const newValue = value.split('');
        newValue[index] = inputValue;
        onChange(newValue.join(''));

        // Auto focus next input when current one is filled
        if (inputValue && index < numInputs - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Move to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            // Update value to remove previous digit
            const newValue = value.split('');
            newValue[index - 1] = '';
            onChange(newValue.join(''));
        }

        // Navigate with arrow keys
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            e.preventDefault();
        }

        if (e.key === 'ArrowRight' && index < numInputs - 1) {
            inputRefs.current[index + 1]?.focus();
            e.preventDefault();
        }
    };

    // Handle paste event at container level
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, numInputs);
        if (!/^\d*$/.test(pasteData)) return; // Only allow numeric paste

        onChange(pasteData.padEnd(value.length, value.slice(pasteData.length)).slice(0, numInputs));

        // Focus the appropriate input after paste
        const focusIndex = Math.min(pasteData.length, numInputs - 1);
        if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex]?.focus();
        }
    };

    return (
        <div
            className="flex justify-center flex-wrap gap-y-3"
            onPaste={handlePaste}
        >
            {Array.from({ length: numInputs }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={numInputs}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el: HTMLInputElement | null) => {
                        inputRefs.current[index] = el;
                    }}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[86px] md:h-[114px] mx-1 sm:mx-2 border border-gray-300 rounded text-xl text-center bg-white"
                    autoComplete="one-time-code"
                    aria-label={`digit ${index + 1}`}
                />
            ))}
        </div>
    );
};

const OtpComponent = () => {
    const [state, dispatch] = useFormState(OTPAction, undefined);
    const [otpState, dispatchOTP] = useFormState(reSendOtpAction, undefined);
    const [timeLeft, setTimeLeft] = useState(60 * 5);
    const [email, setEmail] = useState<string>("");
    const [isResending, setIsResending] = useState(false);
    const { loading, setLoading, setActive } = useContext(OnboardingContext);
    const router = useRouter();

    const [otp, setOtp] = useState('');

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
    }, [router]);

    // Countdown timer
    useEffect(() => {
        setActive(true);
        if (timeLeft === 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, setActive]);

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
                        <input type="hidden" name="otp" value={otp} />
                        <CustomOtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            shouldAutoFocus
                        />

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