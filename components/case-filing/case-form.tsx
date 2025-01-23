"use client";

import { FormStep } from "@/types/file-case";
import { GeneralOverview } from "./steps/general-overview";
import { useCaseFilingForm } from "@/context/file-case";
import { CaseType } from "./steps/case-type";
import ExhibitForm from "./steps/exhibit-form";
import DocumentUpload from "./steps/document-upload";
import GenerateSeal from "./steps/generate-seal";

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
        return <CaseType />;
      case 3:
        return <DocumentUpload />;
      case 4:
        return <ExhibitForm />;
      case 5:
        return <ExhibitForm />;
      case 6:
        return <GenerateSeal />;
      default:
        return null;
    }
  };

  return <div className="">{renderStep()}</div>;
}
