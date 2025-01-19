'use client'
import StepComponent from "./step";
import InputField from '@/components/ui/InputField';
import PasswordField from '@/components/ui/PasswordField';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const LawyerComponent = () => {
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

                <div className="w-[354px]  mr-10 space-y-10">
                    <p className="font-bold text-sm text-neutral-500" >Fields marked with an asterisk (*) are required.</p>
                    <InputField
                        id="email"
                        type="email"
                        label="EMAIL ADDRESS"
                        name="email"
                        placeholder="name@gmail.com"
                        required
                    />

                    <div className="my-6">
                        <Select >
                            <SelectTrigger className="w-[354px] border-0 border-b-[1px] text-neutral-700">
                                <SelectValue className="text-neutral-700" placeholder="Select an Identification Method" />
                            </SelectTrigger>
                            <SelectContent className="bg-white w-[354px] text-zinc-900">
                                <SelectItem value="NIN" className="text-sm font-semibold text-zinc-900">National Identity Number (NIN)</SelectItem>
                                <SelectItem value="IPN" className="text-sm font-semibold text-zinc-900">International Passport Number (IPN)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <InputField
                        id="court"
                        type="text"
                        label="SUPREME COURT NUMBER (SCN)*"
                        name="email"
                        placeholder="e.g BA234RT75W"
                        required
                    />
                    <InputField
                        id="email"
                        type="text"
                        label="PHONE NUMBER"
                        name="email"
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
                        id="password"
                        label="CONFIRM PASSWORD*"
                        name="password"
                        placeholder="Re-enter your password to confirm"
                        required
                    />
                </div>

            </div>
        </>
    )
}

export { LawyerComponent }

