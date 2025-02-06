'use client';

import StepComponent from "../../auth/step";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

// import { useFormState } from "react-dom";
// import { SignupAction } from "@/lib/actions/login";

const OtpComponent = () => {
    // const [state, dispatch] = useFormState(SignupAction, undefined);
    return (
        <>
            <div className="flex flex-col md:flex-row w-full h-full space-y-6 md:space-y-0 md:space-x-6">
                {/* <div className="w-full md:max-w-xs md:border-r-2 md:pr-6">
                    <StepComponent
                        currentStep={3}
                        totalSteps={3}
                        heading="Please Input the One Time Password Sent (OTP)!"
                        subheading="I'm a Legal Practitioner"
                    />
                </div> */}
                <div className="flex-1 flex justify-center items-center">
                    <form id="otp-form"  >
                        <div className="col flex flex-col text-center  justify-center items-center space-y-6">
                            <p className="text-app-primary text-3xl font-bold">Check your email for a code</p>
                            <p className="text-xs" >We&apos;ve sent a 6-character code to janedoe@gmail.com. <br />
                                The code expires shortly, so please enter it soon.</p>
                            <InputOTP maxLength={6}>
                                <InputOTPGroup className="gap-2">
                                    <InputOTPSlot index={0} className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]" />
                                    <InputOTPSlot index={1} className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]" />
                                    <InputOTPSlot index={2} className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]" />
                                </InputOTPGroup>
                                <InputOTPSeparator className="text-neutral-400 mx-6 " />
                                <InputOTPGroup className="gap-2">
                                    <InputOTPSlot index={3} className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]" />
                                    <InputOTPSlot index={4} className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]" />
                                    <InputOTPSlot index={5} className="border-[1px] text-lg border-gray-300 bg-white size-20 h-[114px] w-[86px]" />
                                </InputOTPGroup>
                            </InputOTP>
                            

                            <div className="space-y-2 mt-6">
                                <p className="text-xs" >Did&apos;nt get the code?</p>

                                <p className="text-xl font-bold text-gray-500">00:15:10</p>

                                <p className="text-xs">Resend Code</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export { OtpComponent };
