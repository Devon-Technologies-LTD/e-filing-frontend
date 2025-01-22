"use client";

import { createContext, useContext, useState } from "react";
import type { CaseFormData, FormStep } from "@/types/file-case";

interface FormContextType {
  currentStep: FormStep;
  formData: CaseFormData;
  setCurrentStep: (step: FormStep) => void;
  updateFormData: (data: Partial<CaseFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<CaseFormData>({
    filingLocation: "",
    claimant: "",
    defendant: "",
    caseTitle: "",
    claimantPhone: "",
    claimantEmail: "",
    claimantAddress: "",
    exhibits: [{ id: 1, title: "", file: undefined }],
  });


  console.log("formData", formData);
  
  const updateFormData = (data: Partial<CaseFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

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
        formData,
        setCurrentStep,
        updateFormData,
        goToNextStep,
        goToPreviousStep,
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
