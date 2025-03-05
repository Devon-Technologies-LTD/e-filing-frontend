"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import OnboardingLayout from "../OnboardingLayout";
import { InvitationComponent } from "@/components/onboarding/invitation";
import { toast } from "sonner";

const InvitationPage = () => {
    // const searchParams = useSearchParams();
    // const email = searchParams.get("email");

    const searchParams = useSearchParams();
    const otp = searchParams.get("otp");
    const email = searchParams.get("email") ?? "";
    const encodedEmail = email.replace(/ /g, "+");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const acceptInvite = async () => {
            if (!encodedEmail || !otp) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.post(`/api/accept-invite`, { email: encodedEmail, otp });
                console.log("Invitation accepted:", response.data);
                toast.success("Invite has been accepted successfully");
            } catch (err: any) {
                console.error("Error:", err);
                toast.success(err.response?.data?.message);
                setError(err.response?.data?.message || "Failed to fetch invitation");
            } finally {
                setLoading(false);
            }
        };

        acceptInvite();
    }, [encodedEmail, otp]);

    return (
        <OnboardingLayout close="LOG IN" currentStep={3} heading="Provide your information to get Started" subheading="">
            {loading && <p>Loading invitation...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <InvitationComponent email={encodedEmail} />
        </OnboardingLayout>
    );
};

export default InvitationPage;
