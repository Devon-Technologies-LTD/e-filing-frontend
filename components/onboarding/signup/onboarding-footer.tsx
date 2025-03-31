"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useCaseFilingForm } from "@/context/file-case";
import { MoveLeft } from "lucide-react";
import { SubmitButton } from "@/components/ui/submit-button";
import { useContext } from "react";
import { OnboardingContext } from '@/context/OnboardingContext';


interface OnboardingLayout {
    currentStep: number;
}

export function OnboaringFooter({ currentStep }: OnboardingLayout) {

    const { loading, setLoading } = useContext(OnboardingContext);

    const router = useRouter();
    const { goToPreviousStep } = useCaseFilingForm();
    const handlePreviousStep = () => {
        goToPreviousStep();
        if (currentStep == 1) {
            router.push(`/login`);
        }
        if (currentStep == 2) {
            router.push(`/signup`);
        }
        router.back();
    };

    return (
        <CardFooter className="flex h-20 py-0 justify-between">
            {currentStep === 1 ? (
                <Link href="/login">
                    <Button
                        variant="outline"
                        className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
                    >
                        <MoveLeft className="mr-2" /> Back
                    </Button>
                </Link>
            ) : (
                <Button
                    variant="outline"
                    className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
                    onClick={handlePreviousStep}
                    disabled={currentStep < 1}
                >
                    <MoveLeft className="mr-2" /> Back
                </Button>
            )}

            {currentStep === 2 && (
                <div className="flex flex-col md:flex-row justify-end items-center gap-4">
                    <SubmitButton loading={loading} pendingValue="Processing..." submitform="lawyer-form" className="bg-app-primary font-bold text-white p-6" value="Create Account" />
                </div>
            )}
            {currentStep === 3 && (
                <div className="flex flex-col md:flex-row justify-end items-center gap-4">
                    <SubmitButton loading={loading} pendingValue="Processing..." submitform="otp-form" className="bg-app-primary font-bold text-white p-6" value="Proceed" />
                </div>
            )}
        </CardFooter>
    );
}
