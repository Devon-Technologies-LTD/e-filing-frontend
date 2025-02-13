"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { CaseOverViewData, FormStep } from "@/types/file-case";
import { DocumentFileType, Exhibit } from "@/types/exhibit";

interface FormContextType {
  currentStep: FormStep;
  exhibitFormData: Exhibit[];
  documentUpload: DocumentFileType[];
  caseOverviewFormData: CaseOverViewData;
  setCurrentStep: (step: FormStep) => void;
  updateExhibitFormData: (data: Exhibit[]) => void;
  updateDocumentUpload: (data: DocumentFileType[]) => void;
  updateCaseOverViewFormData: (data: Partial<CaseOverViewData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [caseOverviewFormData, setCaseOverviewFormData] =
    useState<CaseOverViewData>({
      filingLocation: "",
      claimant: "",
      defendant: "",
      caseTitle: "",
      claimantPhone: "",
      claimantEmail: "",
      claimantAddress: "",
    });

  const [exhibitFormData, setExhibitFormData] = useState<Exhibit[]>([
    { id: 1, title: "", file: undefined },
  ]);
  const [documentUpload, setDocumentUpload] = useState<DocumentFileType[]>([]);

  const updateExhibitFormData = useCallback((data: Exhibit[]) => {
    setExhibitFormData(data);
  }, []);
  const updateDocumentUpload = useCallback((data: DocumentFileType[]) => {
    setDocumentUpload(data);
  }, []);

  const updateCaseOverViewFormData = useCallback(
    (data: Partial<CaseOverViewData>) => {
      setCaseOverviewFormData((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        documentUpload,
        updateDocumentUpload,
        exhibitFormData,
        setCurrentStep,
        updateExhibitFormData,
        updateCaseOverViewFormData,
        goToNextStep,
        goToPreviousStep,
        caseOverviewFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useCaseFilingForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within a FormProvider");
  return context;
};
