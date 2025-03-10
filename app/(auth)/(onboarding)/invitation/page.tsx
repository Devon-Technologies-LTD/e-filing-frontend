"use client";

import { useSearchParams } from "next/navigation";
import OnboardingLayout from "../OnboardingLayout";
import { InvitationComponent } from "@/components/onboarding/invitation";

const InvitationPage = () => {
    const searchParams = useSearchParams();
    const otp = searchParams.get("otp") ?? ""; // Provide a default value if otp is null
    const email = searchParams.get("email") ?? "";
    const encodedEmail = email.replace(/ /g, "+");

    return (
        <OnboardingLayout close="LOG IN" currentStep={3} heading="Provide your information to get Started" subheading="">
            <InvitationComponent email={encodedEmail} otpz={otp} />
        </OnboardingLayout>
    );
};

export default InvitationPage;