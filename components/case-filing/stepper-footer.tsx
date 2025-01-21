"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FORM_STEPS } from "@/constants/form";
import { useCaseFilingForm } from "@/context/file-case";
import { MoveLeft } from "lucide-react";

export function StepperNavigation() {
  const router = useRouter();
  const { currentStep, goToNextStep, goToPreviousStep } = useCaseFilingForm();

  const handleNextStep = () => {
    goToNextStep();
    router.push(`/case-filing/${currentStep + 1}`);
  };

  const handlePreviousStep = () => {
    goToPreviousStep();
    router.push(`/case-filing/${currentStep - 1}`);
  };

  return (
    <CardFooter className="flex h-20 container py-0 justify-between">
      <Button
        variant="outline"
        className="font-semibold border-2 uppercase border-primary text-xs text-neutral-600 h-11"
        onClick={handlePreviousStep}
        disabled={currentStep === 1}
      >
        <MoveLeft /> Back
      </Button>
      
      <Button
        size={"lg"}
        className="font-bold text-sm h-11"
        onClick={handleNextStep}
        disabled={currentStep === FORM_STEPS.length}
      >
        Next
      </Button>
    </CardFooter>
  );
}
