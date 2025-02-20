import { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  isSubmitting: boolean;
  setIsSubmitting: (state: boolean) => void;
}

// Creating the context
const FormContext = createContext<FormContextType | null>(null);

interface FormProviderProps {
  children: ReactNode;
}

// Creating the provider
export function FormProvider({ children }: FormProviderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <FormContext.Provider value={{ isSubmitting, setIsSubmitting }}>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook for accessing the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
