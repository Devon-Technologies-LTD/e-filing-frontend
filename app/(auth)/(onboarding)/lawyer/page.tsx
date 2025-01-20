import { LawyerComponent } from '@/components/auth/lawyer'
import Link from "next/link"
import { BackButton } from '@/components/ui/back-button'
import { Button } from "@/components/ui/button"
import SignUpLayout from "@/components/SignupLayout"


export default function LawyerPage() {
    return (
        <SignUpLayout
            headerContent={
                <>
                    <div className="text-sm font-extrabold text-app-primary relative z-10">
                        <Link href="/login">
                            LOG IN
                        </Link>
                    </div>
                </>
            }>
            <LawyerComponent />
            <div className="flex flex-col gap-4 items-center justify-between w-full space-y-4">
                <footer className="bg-white shadow-sm px-2  absolute bottom-0 p-4 border-t-2 w-full ">
                    <div className="mx-8 flex justify-between items-center">
                        <BackButton />
                        <Button className="bg-app-primary font-bold text-white p-6">
                            <Link href="/otp">Create Account</Link>
                        </Button>
                    </div>
                </footer>
            </div>
        </SignUpLayout>
    )
}
