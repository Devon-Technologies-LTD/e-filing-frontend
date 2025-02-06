"use client";

import { useRouter } from "next/navigation";
import Link from "next/link"; // Use Next.js Link for navigation
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useCaseFilingForm } from "@/context/file-case";
import { MoveLeft } from "lucide-react";

export function OnboaringFooter() {
    const router = useRouter();
    const { currentStep, goToNextStep, goToPreviousStep } = useCaseFilingForm();

    const handleNextStep = () => {
        goToNextStep();
        router.push(`/signup/${currentStep + 1}`);
    };

    const handlePreviousStep = () => {
        goToPreviousStep();
        router.push(`/signup/${currentStep - 1}`);
    };

    return (
        <CardFooter className="flex h-20  py-0 justify-between">
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
        </CardFooter>
    );
}