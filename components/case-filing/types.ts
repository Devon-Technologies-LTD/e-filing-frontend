export type UseCaseFilingFormType = {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  caseOverviewFormData: any;
  setStepOneValidators: (errors: Record<string, string>) => void;
};
