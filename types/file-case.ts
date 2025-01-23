import { Exhibit, DocumentFile } from "./exhibit";

export type FormStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface CaseFormData {
  filingLocation: string;
  claimant: string;
  defendant: string;
  caseTitle: string;
  claimantPhone: string;
  claimantEmail: string;
  claimantAddress: string;
  exhibits: Exhibit[];
  documents: DocumentFile[];
}

export interface StepProps {
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}
