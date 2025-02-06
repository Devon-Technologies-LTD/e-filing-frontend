import { LawyerComponent } from '@/components/onboarding/signup/lawyer';
import { BackButton } from '@/components/ui/back-button';
import { SubmitButton } from '@/components/ui/submit-button';
import Link from "next/link";
import SignUpLayout from '@/components/Signup-Layout';


export default function LawyerPage() {
    return (
        <>
            <SignUpLayout loginLink={<Link href="/login">LOG IN</Link>}>
                <div className="flex flex-col items-center w-full px-4 md:px-8 space-y-6">
                    <LawyerComponent />
                </div>
                <footer className="bg-white shadow-sm fixed bottom-0 left-0 w-full px-4 py-4 border-t-2">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <BackButton />
                        <SubmitButton
                            value="Create Account"
                            submitform="lawyer-form"
                            pendingValue="Processing..."
                            className="md:w-auto bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
                        />
                    </div>
                </footer>
            </SignUpLayout>

        </>
    );
}