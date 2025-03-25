'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import InputField from '@/components/ui/InputField';
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { CLIENT_ERROR_STATUS } from "@/lib/_constants";
import { toast } from "sonner"
import { LoginPasswordField } from "@/components/passwordField";
import DragDropUploader from "./DragDropUploaderNIN";
import { SignupAction } from "@/lib/actions/signup";
import { isFieldErrorObject } from "@/types/auth";

const IndividualComponent = () => {
    const [state, dispatch] = useFormState(SignupAction, undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const errors = state?.errors && isFieldErrorObject(state.errors) ? state.errors : {};
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
    }, [state]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        dispatch(formData);
    };
    useEffect(() => {
        if (state) {
            setLoading(false);
        }
    }, [state]);

    return (
        <>
            <div className="flex flex-col md:flex-row w-full h-full  md:space-y-0 md:space-x-6">
                <form id="lawyer-form" onSubmit={handleSubmit} className="md:w-2/3 space-y-10" autoComplete="off">
                    <input type="hidden" name="role" value="USER" />
                    <input type="hidden" name="last_name" value="last_user" />
                    <input type="hidden" name="gender" value="male" />
                    <div
                        className="w-full flex-1 space-y-6 overflow-y-auto scrollbar-hide px-4 md:px-0"
                        style={{
                            height: "calc(100vh - 300px)",
                        }}
                    >
                        <div>
                            <p className="font-bold text-sm text-neutral-500">
                                Fields marked with an asterisk (*) are required.
                            </p>
                            <br />
                            <InputField
                                id="first"
                                type="text"
                                label="First Name"
                                name="first_name"
                                placeholder="John"
                                required
                                error={errors.first_name?.[0]}
                            />
                        </div>
                        <div>
                            <InputField
                                id="lastName"
                                type="text"
                                label="Last Name"
                                name="last_name"
                                placeholder="Doe"
                                required
                                error={errors.last_name?.[0]}
                            />
                        </div>
                        <div>
                            <InputField
                                id="email"
                                type="email"
                                label="EMAIL ADDRESS"
                                name="email"
                                placeholder="name@gmail.com"
                                required
                                error={errors.email?.[0]}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(/\s/g, ''); // Remove spaces
                                }}
                            />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <InputField
                                    id="nin"
                                    type="text"
                                    label="National Identity Number (NIN)"
                                    name="nin"
                                    placeholder="e.g. 09876543212345"
                                    required
                                    error={errors.nin?.[0]}
                                />
                                <p className="text-sm font-bold mt-4 text-neutral-600">
                                    UPLOAD NATIONAL IDENTITY CARD*
                                </p>
                            </div>
                            <DragDropUploader />
                        </div>
                        <div className="space-y-6">
                            <InputField
                                id="phone"
                                type="text"
                                label="PHONE NUMBER"
                                name="phone_number"
                                placeholder="e.g 07030338024"
                                required
                                error={errors.phone_number?.[0]}
                            />
                            <LoginPasswordField showStrength={true} label="PASSWORD" name="password" placeholder="********" />
                            <LoginPasswordField label="CONFIRM PASSWORD" name="confirm_password" placeholder="********" />

                        </div>
                    </div>
                    {loading && (
                        <div className="flex justify-center items-center mt-1">
                            <div className="spinner"></div> {/* Add spinner */}
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}

export { IndividualComponent }

