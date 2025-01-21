"use client";

import { FormStep } from "@/types/file-case";
import { GeneralOverview } from "./steps/general-overview";
import { useCaseFilingForm } from "@/context/file-case";

export function CaseForm({ initialStep }: { initialStep?: number }) {
  const { currentStep, setCurrentStep } = useCaseFilingForm();

  // Ensure the form context is in sync with the URL
  if (currentStep !== initialStep) {
    setCurrentStep(initialStep as FormStep);
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <GeneralOverview />;
      case 2:
        return <div>Case Types Form</div>;
      case 3:
        return <div>Upload Documents Form</div>;
      case 4:
        return <div>Submit Exhibits Form</div>;
      default:
        return null;
    }
  };

  return <div className="">{renderStep()}</div>;
}
