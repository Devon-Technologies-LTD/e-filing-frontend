import { createContext, useContext } from "react";

export const CaseFileContext = createContext<any>(null);

export const useCaseFile = () => {
  const context = useContext(CaseFileContext);
  if (!context) {
    throw new Error("useCaseFile must be used within CaseFileProvider");
  }
  return context;
};