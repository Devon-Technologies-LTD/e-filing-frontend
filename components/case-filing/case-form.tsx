"use client";

import { FormStep } from "@/types/file-case";
// import { GeneralOverview } from "./steps/general-overview";
import { useCaseFilingForm } from "@/context/file-case";
// import { CaseType } from "./steps/case-type";
import ExhibitForm from "./steps/exhibit-form";
import DocumentUpload from "./steps/document-upload";
import GenerateSeal from "./steps/generate-seal";
import CaseOverview from "./steps/case-overview";
import CaseTypes from "./steps/case-type-form";
import PreviewPage from "./steps/preview-form";
import { useEffect } from "react";

export function CaseForm({ initialStep }: { initialStep?: number }) {
  const { currentStep, setCurrentStep } = useCaseFilingForm();

   useEffect(() => {
     if (currentStep !== initialStep) {
       setCurrentStep(initialStep as FormStep);
     }
   }, [initialStep, currentStep, setCurrentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CaseOverview />;
      case 2:
        return <CaseTypes />;
      case 3:
        return <DocumentUpload />;
      case 4:
        return <ExhibitForm />;
      case 5:
        return <PreviewPage />;
      case 6:
        return <GenerateSeal />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
