import { LawyerComponent } from '@/components/onboarding/signup/lawyer';
import OnboardingLayout from '../OnboardingLayout';

export default function LawyerPage() {
    return (
        <>
            <OnboardingLayout close='LOG IN' currentStep={2} heading="Provide your information to get Started" subheading='I’m a Legal Practitioner'>
                <LawyerComponent />
            </OnboardingLayout>
        </>
    );
}