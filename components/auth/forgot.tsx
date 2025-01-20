'use client'
import { SubmitButton } from "@/components/ui/submit-button"
import InputField from '@/components/ui/InputField';
import TransformingLineLink from "../ui/animation-link";

const FORGOT = () => {
    return (
        <>
            <div className="heading">
                <p className="font-bold text-3xl text-app-primary text-center">FORGOT PASSWORD</p>
                <p className="text-center text-xs space-x-2 mt-3">
                    <span className="text-muted text-center text-sm text-bold text-gray-400">Enter your account&apos;s email and we&apos;ll send you an email to reset your password</span>
                </p>
            </div>
            <form className="w-full space-y-6">
                <InputField
                    id="username"
                    type="email"
                    label="EMAIL ADDRESS"
                    name="username"
                    placeholder="name@gmail.com"
                    required />
                <SubmitButton value="SEND EMAIL" pendingValue="Processing..." className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2" />

                <TransformingLineLink href="recover" text="FORGOT THE EMAIL ADDRESS?" />


            </form>
        </>
    )
}

export default FORGOT;
