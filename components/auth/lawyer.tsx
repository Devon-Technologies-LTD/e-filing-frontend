'use client';

import { useState } from "react";
import StepComponent from "./step";
import InputField from '@/components/ui/InputField';
import PasswordField from '@/components/ui/PasswordField';
import Nin from "@/public/assets/images/nin.png";
import Image from "next/image";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TransformingLineLink from "../ui/animation-link";

const LawyerComponent = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>("");

    return (
        <>
            <div className="flex w-full h-full space-x-2">
                <div className="w-[354px] border-r-2 mr-10">
                    <StepComponent
                        currentStep={2}
                        totalSteps={3}
                        heading="Provide your information to get started!"
                        subheading="I'm a Legal Practitioner"
                    />
                </div>

                <div
                    className="w-full mr-10 space-y-10 overflow-y-scroll scrollbar-hide"
                    style={{
                        height: 'calc(100vh - 220px)',
                    }}
                >
                    <div className="w-[354px]">
                        <p className="font-bold text-sm text-neutral-500">Fields marked with an asterisk (*) are required.</p>
                        <InputField
                            id="email"
                            type="email"
                            label="EMAIL ADDRESS"
                            name="email"
                            placeholder="name@gmail.com"
                            required
                        />

                        <div className="my-6">
                            <Select onValueChange={(value) => setSelectedMethod(value)}>
                                <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
                                    <SelectValue className="text-neutral-700 text-xs" placeholder="Select an Identification Method" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-[354px] text-zinc-900">
                                    <SelectItem value="NIN" className="text-xs font-semibold text-zinc-900 hover:text-gray-600">National Identity Number (NIN)</SelectItem>
                                    <SelectItem value="IPN" className="text-xs font-semibold text-zinc-900">International Passport Number (IPN)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className={`w-[800px] space-y-10 ${selectedMethod === "NIN" ? "block" : "hidden"}`}>
                        <div className="w-[354px]">
                            <InputField
                                id="nin"
                                type="text"
                                label="National Identity Number (NIN)*"
                                name="nin"
                                placeholder="eg. 09876543212345"
                                required
                            />
                            <p className="text-xs mt-10 text-muted text-neutral-600">
                                UPLOAD NATIONAL IDENTITY CARD*
                            </p>
                        </div>
                        <div className="flex">
                            <div className="max-w-[354px]">
                                <div className="bg-zinc-100 h-[145px] mb-3 w-full flex items-center justify-center">
                                    <TransformingLineLink href="#" text="Click or Drag file here" />
                                </div>

                                <p className="text-sm font-bold text-neutral-600">FRONT PAGE VIEW</p>
                                <p className="text-xs font-bold text-neutral-600">Please upload a clear and legible image of your ID card.
                                    Accepted formats are JPG, PNG, or PDF, with a maximum file size of 5MB.</p>
                            </div>
                            <div className="ml-5 p-4">
                                <Image
                                    src={Nin}
                                    alt="legal-image"
                                    height={1000}
                                    width={500}
                                    className="w-full h-full object-cover object-center group-hover:grayscale-0 grayscale transition-transform duration-300 ease-in-out "
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-[354px] space-y-10">
                        <InputField
                            id="court"
                            type="text"
                            label="SUPREME COURT NUMBER (SCN)*"
                            name="email"
                            placeholder="e.g BA234RT75W"
                            required
                        />
                        <InputField
                            id="phone"
                            type="text"
                            label="PHONE NUMBER"
                            name="phone"
                            placeholder="e.g +2347030338024"
                            required
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

            </div>
        </>
    );
};

export { LawyerComponent };
