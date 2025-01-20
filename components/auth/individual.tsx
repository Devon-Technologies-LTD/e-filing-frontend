'use client'
import StepComponent from "./step";
import { useState } from "react";
import Nin from "@/public/assets/images/nin.png";
import Image from "next/image";
import InputField from '@/components/ui/InputField';
import TransformingLineLink from "../ui/animation-link";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const IndividualComponent = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>("");

    return (
        <>
            <div className="flex w-full h-full space-x-2">
                <div className="w-[354px] border-r-2 mr-10">
                    <StepComponent
                        currentStep={2}
                        totalSteps={3}
                        heading="Provide your information to get started!"
                        subheading="I'm FILING FOR MYSELF"
                    />
                </div>

                <div
                    className="w-full mr-10 space-y-10 overflow-y-scroll scrollbar-hide"
                    style={{
                        height: 'calc(100vh - 220px)',
                    }}
                >
                    <div className="w-[354px]">
                        <p className="font-bold text-sm text-neutral-500" >Fields marked with an asterisk (*) are required.</p>
                        <InputField
                            id="email"
                            type="email"
                            label="EMAIL ADDRESS *"
                            name="email"
                            placeholder="name@gmail.com"
                            required
                        />

                        <div className="my-6">
                            <Select onValueChange={(value) => setSelectedMethod(value)}>
                                <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
                                    <SelectValue className="text-neutral-700" placeholder="Select an Identification Method" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-[354px] text-zinc-900">
                                    <SelectItem value="NIN" className="text-sm font-semibold text-zinc-900">National Identity Number (NIN)</SelectItem>
                                    <SelectItem value="IPN" className="text-sm font-semibold text-zinc-900">International Passport Number (IPN)</SelectItem>
                                    <SelectItem value="DriverLience" className="text-sm font-semibold text-zinc-900">Drivers License Number</SelectItem>
                                    <SelectItem value="voterCard" className="text-sm font-semibold text-zinc-900">Voters Identification Number</SelectItem>
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
                </div>
            </div>
        </>
    )
}

export { IndividualComponent }

