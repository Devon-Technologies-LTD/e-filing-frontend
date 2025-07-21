"use client";
import { SubmitButton } from "@/components/ui/submit-button";
import InputField from "@/components/ui/InputField";
import { useFormState } from "react-dom";
import { ForgotPasswordAction } from "@/lib/actions/login";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { toast } from "sonner"


const FORGOT = () => {
    const [state, dispatch] = useFormState(ForgotPasswordAction, undefined);
    useEffectAfterMount(() => {
        if (state?.message && !state.success) {
            toast.error(state.errors);
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
            <form action={dispatch} className="w-full space-y-8">

                <InputField
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@gmail.com"
                    required
                    className={`mt-1 block w-full rounded-md px-3 shadow-sm focus:outline-none sm:text-sm  "border-gray-300"}`}
                    label="Email"
                />
                <SubmitButton
                    value="SEND EMAIL"
                    pendingValue="Processing..."
                    className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
                />
            </form>
        </>
    );
};

export default FORGOT;
