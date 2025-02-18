"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { CaseOverViewData, FormStep } from "@/types/file-case";
import { DocumentFileType, Exhibit } from "@/types/exhibit";

interface FormContextType {
  exhibitFormData: Exhibit[];
  documentUpload: DocumentFileType[];
  updateExhibitFormData: (data: Exhibit[]) => void;
  addDocumentUpload: (data: DocumentFileType) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [exhibitFormData, setExhibitFormData] = useState<Exhibit[]>([
    { id: 1, title: "", file: undefined },
  ]);
  const [documentUpload, setDocumentUpload] = useState<DocumentFileType[]>([]);

  const updateExhibitFormData = useCallback((data: Exhibit[]) => {
    setExhibitFormData(data);
  }, []);
  
  const addDocumentUpload = useCallback((data: DocumentFileType) => {
    setDocumentUpload((prev) => [...prev, data]);
  }, []);

  return (
    <FormContext.Provider
      value={{
        documentUpload,
        addDocumentUpload,
        exhibitFormData,
        updateExhibitFormData,
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
