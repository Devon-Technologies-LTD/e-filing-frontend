
export type FormStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface CaseOverViewData {
  filingLocation: string;
  claimant: string;
  defendant: string;
  caseTitle: string;
  claimantPhone: string;
  claimantEmail: string;
  claimantAddress: string;
}
export interface StepProps {
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}
