'use client'
import { SubmitButton } from "@/components/ui/submit-button"
import InputField from '@/components/ui/InputField';
import TransformingLineLink from "../ui/animation-link";

const RecoverComponent = () => {
    return (
        <>
            <div className="heading">
                <p className="font-bold text-3xl text-app-primary text-center">Recover Your Account</p>
                <p className="text-center text-xs space-x-2 mt-3">
                    <span className="text-muted text-center text-sm text-bold text-gray-400">Enter your SCN ID or NIN, so we can send you account  recovery instructions.</span>
                </p>
            </div>

            <form className="w-full space-y-6">
                <InputField
                    id="SELECT IDENTIFICATION METHOD"
                    type="text"
                    label="SELECT IDENTIFICATION METHOD"
                    name="idnumber"
                    placeholder="CHOOSE A METHOD"
                    required
                />
                <InputField
                    id="ID NUMBER"
                    type="text"
                    label="PASWORD"
                    name="ID NUMBER"
                    placeholder="ID NUMBER"
                    required
                />
                <SubmitButton value="LOG IN" pendingValue="Processing..." className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2" />

                <TransformingLineLink href="moreInfo" text="DONT HAVE ACCESS TO ACCOUNT?" />
            </form>

        </>
    )
}

export { RecoverComponent }
