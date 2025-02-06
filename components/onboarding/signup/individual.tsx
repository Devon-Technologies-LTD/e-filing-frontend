'use client'
import StepComponent from "../../auth/step";
import { useState } from "react";
import { useFormState } from "react-dom";
import Nin from "@/public/assets/images/nin.png";
import Image from "next/image";
import InputField from '@/components/ui/InputField';
import TransformingLineLink from "../../ui/animation-link";
import { SignupAction } from "@/lib/actions/login";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const IndividualComponent = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [state, dispatch] = useFormState(SignupAction, undefined);


    return (
        <>
            <div className="flex flex-col md:flex-row w-full h-full space-y-6 md:space-y-0 md:space-x-6">
                {/* <div className="w-full md:max-w-xs md:border-r-2 md:pr-6">
                    <StepComponent
                        currentStep={2}
                        totalSteps={3}
                        heading="Provide your information to get started!"
                        subheading="I'm FILING FOR MYSELF"
                    />
                </div> */}

                <form id="individual-form" action={dispatch} className="md:w-1/3 justify-start items-start space-y-6">
                    <input type="hidden" name="role" value="USER" />
                    <div
                        className="w-full flex-1 space-y-6 overflow-y-auto scrollbar-hide px-4 md:px-0"
                        style={{
                            height: "calc(100vh - 220px)",
                        }}
                    >
                        <div>
                            <p className="font-bold text-sm text-neutral-500" >Fields marked with an asterisk (*) are required.</p>
                            <p className="text-sm text-red-500 h-2 text-center">
                                {state?.message}
                            </p>
                            <br />
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
                                    <SelectTrigger className="border-0 border-b-[1px] text-neutral-700">
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

                            <div className={`w-[800px] space-y-10 ${selectedMethod === "NIN" ? "block" : "hidden"}`}>
                                <div className="md:max-w-sm">
                                    <InputField
                                        id="nin"
                                        type="text"
                                        label="National Identity Number (NIN)"
                                        name="nin"
                                        placeholder="eg. 09876543212345"
                                        required
                                    />
                                    <p className="text-xs mt-10 text-muted text-neutral-600">
                                        UPLOAD NATIONAL IDENTITY CARD*
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="md:max-w-sm">
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
                </form>


            </div>
        </>
    )
}

export { IndividualComponent }

