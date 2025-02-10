import { IndividualComponent } from '@/components/onboarding/signup/individual';
import OnboardingLayout from '../OnboardingLayout';


export default function IndividualPage() {
    return (
        <OnboardingLayout close='LOG IN' currentStep={2} heading="Provide your information to get Started" subheading={'I’m FILING FOR MYSELF'}>
            <IndividualComponent />
        </OnboardingLayout>
    )
}
