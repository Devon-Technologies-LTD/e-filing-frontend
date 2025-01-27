import { LawyerComponent } from '@/components/auth/lawyer';
import Link from "next/link";
import { BackButton } from '@/components/ui/back-button';
import { Button } from "@/components/ui/button";
import SignUpLayout from "@/components/SignupLayout";

export default function LawyerPage() {
    return (
        <SignUpLayout
            headerContent={
                <div className="text-sm font-extrabold text-app-primary">
                    <Link href="/login">
                        LOG IN
                    </Link>
                </div>
            }
        >
            {/* Main Lawyer Component */}
            <div className="flex flex-col items-center w-full px-4 md:px-8 space-y-6">
                <LawyerComponent />
            </div>

            {/* Footer */}
            <footer className="bg-white shadow-sm fixed bottom-0 left-0 w-full px-4 py-4 border-t-2">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <BackButton />
                    <Button type="submit" form="lawyer-form" className="bg-app-primary font-bold text-white w-full md:w-auto">
                        Create Account
                    </Button>
                </div>
            </footer>
        </SignUpLayout>
    );
}


{/* <Link href="/otp">Create Account</Link> */ }
