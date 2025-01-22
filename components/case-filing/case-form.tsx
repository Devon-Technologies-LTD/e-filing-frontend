"use client";

import { FormStep } from "@/types/file-case";
import { GeneralOverview } from "./steps/general-overview";
import { useCaseFilingForm } from "@/context/file-case";
import ExhibitForm from "./steps/exhibit-form";
import DocumentUpload from "./steps/document-upload";

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
        return <DocumentUpload />;
      case 4:
        return <ExhibitForm />;
      default:
        return null;
    }
  };

  return <div className="w-1/2">{renderStep()}</div>;
}
