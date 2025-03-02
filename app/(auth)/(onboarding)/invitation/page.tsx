

'use client'

import { useSearchParams } from "next/navigation";
import OnboardingLayout from "../OnboardingLayout";

const InvitationPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Get 'id' from query params

    return (
        <OnboardingLayout close='LOG IN' currentStep={0} heading="Provide your information to get Started" subheading={''}>
            <div>
                <h1>Invitation</h1>
                {id ? <p>Email: {id}</p> : <p>Loading...</p>}
            </div>
        </OnboardingLayout>
    );
};

export default InvitationPage;








