import { Signup } from '@/components/auth/signup'
import Link from "next/link";
import { BackButton } from '@/components/ui/back-button';
import SignUpLayout from "@/components/SignupLayout";

export default function LawyerPage() {
    return (
        <SignUpLayout
            headerContent={
                <div className="text-sm font-extrabold text-app-primary">
                    <Link href="/login">
                        Close
                    </Link>
                </div>
            }>
                
            {/* Main Lawyer Component */}
            <div className="flex flex-col items-center w-full px-4 md:px-8 space-y-6">
                <Signup />
            </div>

            {/* Footer */}
            <footer className="bg-white shadow-sm fixed bottom-0 left-0 w-full px-4 py-4 border-t-2">
                <div className="mx-8 flex justify-between items-center">
                    <BackButton />
                </div>
            </footer>
        </SignUpLayout>
    );
}