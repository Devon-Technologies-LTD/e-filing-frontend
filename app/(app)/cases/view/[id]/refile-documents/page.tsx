"use client";
import DocumentUpload from "@/components/case-filing/steps/document-upload";
import ExhibitForm from "@/components/case-filing/steps/exhibit-form";
import GenerateSeal from "@/components/case-filing/steps/generate-seal";
import PreviewPage from "@/components/case-filing/steps/preview-form";
import { useAppSelector } from "@/hooks/redux";
import React from "react";

export default function Page() {
  const { current_step } = useAppSelector((data) => data.caseFileForm);

  const renderStep = () => {
    switch (current_step) {
      case 3:
        return <DocumentUpload isRefiling />;
      case 4:
        return <ExhibitForm />;
      case 5:
        return <PreviewPage isRefiling />;
      case 6:
        return <GenerateSeal />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
