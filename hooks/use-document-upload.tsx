import { useCaseFilingForm } from "@/context/file-case";
import { DocumentFileType } from "@/types/exhibit";
import { useEffect, useState } from "react";

export const useDocumentUpload = () => {
  const { documentUpload, updateDocumentUpload } = useCaseFilingForm();
  const [documents, setDocuments] = useState<DocumentFileType[]>(
    documentUpload || []
  );

  useEffect(() => {
    updateDocumentUpload(documents);
  }, [documents, updateDocumentUpload]);

  const addDocument = (type: string) => {
    const newDocument: DocumentFileType = {
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
