import { CaseFormData } from "@/types/file-case";

// validation.ts
export const validateStep1 = (data: CaseFormData) => {
  const errors: string[] = [];
  if (!data.claimant) errors.push("Claimant is required.");
  if (!data.defendant) errors.push("Defendant is required.");
  // Add more validations as needed
  return errors;
};

export const validateStep2 = (data: CaseFormData) => {
  const errors: string[] = [];
  if (!data.caseTitle) errors.push("Case title is required.");
  // Add more validations as needed
  return errors;
};

// Add more validation functions for other steps...
