import { Button } from "@/components/ui/button"
import SignUpLayout from "@/components/SignupLayout"
import { OtpComponent } from '@/components/auth/otp'


export default function OtpPage() {
    return (
        <SignUpLayout
            headerContent={
                <>
                    {/* <div className="text-sm font-medium text-app-primary relative z-10">
                        <Link href="/login">
                            Close
                        </Link>
                    </div> */}
                </>
            }>
            <OtpComponent />
            <div className="flex flex-col gap-4 items-center justify-between w-full space-y-4">
                <footer className="bg-white shadow-sm px-2 py-6 absolute bottom-0 p-4 border-t-2 w-full ">
                    <div className="mx-8 flex justify-end items-center">
                        {/* <BackButton /> */}
                        <Button className="bg-app-primary font-bold text-white p-6">PROCEED</Button>
                    </div>
                </footer>
            </div>
        </SignUpLayout>
    )
}
