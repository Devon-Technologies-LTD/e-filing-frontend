import Link from "next/link"
import { BackButton } from '@/components/ui/back-button'
import { Button } from "@/components/ui/button"
import SignUpLayout from "@/components/SignupLayout"
import { IndividualComponent } from '@/components/auth/individual'

export default function IndividualPage() {
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
            <IndividualComponent />
            <div className="flex flex-col gap-4 items-center justify-between w-full space-y-4">
                <footer className="bg-white shadow-sm px-2 py-6 absolute bottom-0 p-4 border-t-2 w-full ">
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
