'use client';

import { useState } from "react";
import StepComponent from "./step";
import InputField from '@/components/ui/InputField';
import PasswordField from '@/components/ui/PasswordField';
import Nin from "@/public/assets/images/nin.png";
import Image from "next/image";
import { useFormState } from "react-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TransformingLineLink from "../ui/animation-link";
import { SignupAction } from "@/lib/actions/login";

const LawyerComponent = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [state, dispatch] = useFormState(SignupAction, undefined);

    // Type guard for field error object
    function isFieldErrorObject(
        error: string | Record<string, string[]>
    ): error is Record<string, string[]> {
        return typeof error !== "string";
    }

    // Inside the component
    const errors = state?.errors && isFieldErrorObject(state.errors) ? state.errors : {};

    return (
        <div className="flex flex-col md:flex-row w-full h-full space-y-6 md:space-y-0 md:space-x-6">
            {/* Sidebar */}
            <div className="w-full md:max-w-[25%] md:border-r-2 md:pr-6">
                <StepComponent
                    currentStep={2}
                    totalSteps={3}
                    heading="Provide your information to get started!"
                    subheading="I'm a Legal Practitioner"
                />
            </div>
            <form id="lawyer-form" action={dispatch} className="md:w-1/3 space-y-6">
                {/* Main Content */}

                <input type="hidden" name="role" value="LAWYER" />
                <input type="hidden" name="first_name" value="firn_user" />
                <input type="hidden" name="last_name" value="last_user" />
                <input type="hidden" name="gender" value="male" />
                <div
                    className="w-full flex-1 space-y-6 overflow-y-auto scrollbar-hide px-4 md:px-0"
                    style={{
                        height: 'calc(100vh - 220px)',
                    }}
                >
                    {/* Instructions */}
                    <div>
                        <p className="font-bold text-sm text-neutral-500">
                            Fields marked with an asterisk (*) are required.
                        </p>
                        <p className="text-sm text-red-500 h-2 text-center">{state?.message}</p>
                        <br />
                        <InputField
                            id="email"
                            type="email"
                            label="EMAIL ADDRESS"
                            name="email"
                            placeholder="name@gmail.com"
                            required
                            error={errors.email?.[0]}
                        />

                        <div className="mt-6">
                            <Select onValueChange={(value) => setSelectedMethod(value)}>
                                <SelectTrigger className="w-full border-0 border-b-[1px] text-neutral-700">
                                    <SelectValue
                                        className="text-neutral-700 text-sm"
                                        placeholder="Select an Identification Method"
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-zinc-900">
                                    <SelectItem
                                        value="NIN"
                                        className="text-sm font-semibold text-zinc-900 hover:text-gray-600"
                                    >
                                        National Identity Number (NIN)
                                    </SelectItem>
                                    <SelectItem
                                        value="IPN"
                                        className="text-sm font-semibold text-zinc-900"
                                    >
                                        International Passport Number (IPN)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* NIN Section */}
                    {selectedMethod === "NIN" && (
                        <div className="space-y-6">
                            <div>
                                <InputField
                                    id="nin"
                                    type="text"
                                    label="National Identity Number (NIN)*"
                                    name="nin"
                                    placeholder="e.g. 09876543212345"
                                    required
                                    error={errors.nin?.[0]}
                                />
                                <p className="text-sm mt-4 text-neutral-600">
                                    UPLOAD NATIONAL IDENTITY CARD*
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                                <div className="w-full md:max-w-[50%]">
                                    <div className="bg-zinc-100 h-[145px] mb-3 flex items-center justify-center">
                                        <TransformingLineLink href="#" text="Click or Drag file here" />
                                    </div>
                                    <p className="text-sm font-bold text-neutral-600">FRONT PAGE VIEW</p>
                                    <p className="text-xs font-bold text-neutral-600">
                                        Please upload a clear and legible image of your ID card. Accepted formats are
                                        JPG, PNG, or PDF, with a maximum file size of 5MB.
                                    </p>
                                </div>
                                <div className="w-full md:max-w-[50%]">
                                    <Image
                                        src={Nin}
                                        alt="legal-image"
                                        className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other Fields */}
                    <div className="space-y-6">
                        <InputField
                            id="court"
                            type="text"
                            label="SUPREME COURT NUMBER (SCN)*"
                            name="court"
                            placeholder="e.g BA234RT75W"
                            required
                            error={errors.court?.[0]}
                        />
                        <InputField
                            id="phone"
                            type="text"
                            label="PHONE NUMBER"
                            name="phone_number"
                            placeholder="e.g +2347030338024"
                            required
                            error={errors.phone_number?.[0]}
                        />
                        <PasswordField
                            id="password"
                            label="PASSWORD*"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <PasswordField
                            id="confirm-password"
                            label="CONFIRM PASSWORD*"
                            name="confirm-password"
                            placeholder="Re-enter your password to confirm"
                            required
                        />
                    </div>
                </div>
            </form >
        </div>

    );
};

export { LawyerComponent };
