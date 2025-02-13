import { OtpComponent } from "@/components/onboarding/signup/otp"
import OnboardingLayout from "../OnboardingLayout";

export default function OtpPage() {
    return (
        <>
            <OnboardingLayout close='LOG IN' currentStep={3} heading="Please Input the One Time Password Sent (OTP)" subheading={""}>
                <OtpComponent />
            </OnboardingLayout>
        </>
    )
}
