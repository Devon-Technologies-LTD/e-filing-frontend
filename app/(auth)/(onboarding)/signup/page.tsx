import { Signup } from '@/components/auth/signup'
import OnboardingLayout from '../OnboardingLayout';

export default function LawyerPage() {
    return (
        <OnboardingLayout close='Close' currentStep={1} heading="How will you be filling your cases"  subheading={''}>
            <Signup />
        </OnboardingLayout>
    );
}