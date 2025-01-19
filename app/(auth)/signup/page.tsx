import { Signup } from '@/components/auth/signup'
import Link from "next/link"
import { BackButton } from '@/components/ui/back-button'
import SignUpLayout from "@/components/SignupLayout"


export default function AdminLoginPage() {
    return (
        <SignUpLayout
            headerContent={
                <> 
                    <div className="text-sm font-extrabold text-app-primary relative z-10">
                        <Link href="/login">
                            Close
                        </Link>
                    </div>
                </>
            }>
            {/* Main section */}
            <Signup />
            {/* END OF FMain section */}
            <div className="flex flex-col gap-4 items-center justify-between w-full space-y-4">
                <footer className="bg-white shadow-sm px-2 py-6 absolute bottom-0 p-4 border-t-2 w-full ">
                    <div className="mx-8 flex justify-between items-center">
                        <BackButton />
                        {/* <Button className="bg-app-primary text-white p-6">Create Account</Button> */}
                    </div>
                </footer>
            </div>
        </SignUpLayout>
    )
}
