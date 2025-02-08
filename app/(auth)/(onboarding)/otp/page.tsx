import { OtpComponent } from "@/components/onboarding/signup/otp"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import SignUpLayout from "@/components/SignupLayout";

export default function OtpPage() {
    return (
        <>
            <SignUpLayout
                headerContent={
                    <div className="text-sm font-extrabold text-app-primary">
                        <Link href="/login">
                            LOG IN
                        </Link>
                    </div>
                }>
                <div className="flex flex-col items-center w-full px-4 md:px-8 space-y-6">
                    <OtpComponent />
                </div>
                <footer className="bg-white shadow-sm fixed bottom-0 left-0 w-full px-4 py-4 border-t-2">
                    <div className="flex flex-col md:flex-row justify-end items-center gap-4">
                        {/* <BackButton /> */}
                        <Button type="submit" form="lawyer-form" className="bg-app-primary font-bold text-white p-6">PROCEED</Button>
                    </div>
                </footer>
            </SignUpLayout>
        </>

    )
}
