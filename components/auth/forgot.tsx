"use client";
import { SubmitButton } from "@/components/ui/submit-button";
import InputField from "@/components/ui/InputField";
import TransformingLineLink from "../ui/animation-link";
import { useFormState } from "react-dom";
import { ForgotPasswordAction } from "@/lib/actions/login";
import { toast } from "react-toastify";
import { useEffect } from "react";

const FORGOT = () => {
    const [state, dispatch] = useFormState(ForgotPasswordAction, undefined);

    function isFieldErrorObject(
        error: string | Record<string, string[]>
    ): error is Record<string, string[]> {
        return typeof error !== "string";
    }

    const errors = state?.errors && isFieldErrorObject(state.errors) ? state.errors : {};
    const errorMessage = typeof state?.errors === "string"
        ? state.errors
        : state?.errors?.email;
    useEffect(() => {
        // if (state?.success) {
        //     toast.success(state.success);
        //     redirect("/case-filing");
        // }
        if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <div className="heading">
                <p className="font-bold text-3xl text-app-primary text-center">
                    FORGOT PASSWORD
                </p>
                <p className="text-center text-xs space-x-2 mt-3">
                    <span className="text-muted text-center text-sm text-bold text-gray-400">
                        Enter your account&apos;s email and we&apos;ll send you an email to
                        reset your password
                    </span>
                </p>
            </div>
            <form action={dispatch} className="w-full space-y-6">

                <InputField
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@gmail.com"
                    required
                    error={errors.email?.[0]}
                    // state={state}
                    className={`mt-1 block w-full rounded-md px-3 shadow-sm focus:outline-none sm:text-sm ${errors?.email ? "border-red-500" : "border-gray-300"
                        }`}
                    label="Email"
                />

                {errorMessage && (
                    <p className="text-sm text-red-500 text-center">
                        {errorMessage}
                    </p>
                )}

                <SubmitButton
                    value="SEND EMAIL"
                    pendingValue="Processing..."
                    className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
                />
                <TransformingLineLink href="recover" text="FORGOT THE EMAIL ADDRESS?" />
            </form>
        </>
    );
};

export default FORGOT;
