import { useCaseFilingForm } from "@/context/file-case";
import { DocumentFile } from "@/types/exhibit";
import { useEffect, useState } from "react";


export const useDocumentUpload = () => {
  const { formData, updateFormData } = useCaseFilingForm();
  const [documents, setDocuments] = useState<DocumentFile[]>(
    formData.documents || []
  );

  useEffect(() => {
    updateFormData({ documents });
  }, [documents, updateFormData]);

  const addDocument = (type: string) => {
    const newDocument: DocumentFile = {
      id: documents.length + 1,
      type,
      file: null,
    };
    setDocuments((prev) => [...prev, newDocument]);
  };

  const updateDocumentFile = (id: number, file: File) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, file } : doc))
    );
  };

  const removeDocument = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return {
    documents,
    addDocument,
    updateDocumentFile,
    removeDocument,
  };
};
