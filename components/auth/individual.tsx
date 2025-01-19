'use client'
import StepComponent from "./step";
import InputField from '@/components/ui/InputField';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const IndividualComponent = () => {
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

                <div className="w-[354px]  mr-10 space-y-10">
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
                        <Select >
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

            </div>
        </>
    )
}

export { IndividualComponent }

