"use client";
import ExhibitForm from "./steps/exhibit-form";
import DocumentUpload from "./steps/document-upload";
import GenerateSeal from "./steps/generate-seal";
import CaseOverview from "./steps/case-overview";
import CaseTypes from "./steps/case-type-form";
import PreviewPage from "./steps/preview-form";
import { useAppSelector } from "@/hooks/redux";

export function CaseForm() {
  const { current_step } = useAppSelector((data) => data.caseFileForm);

  const renderStep = () => {
    switch (current_step) {
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
