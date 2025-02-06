export type TCaseFilterType =
  | "all"
  | "pending"
  | "case"
  | "recent"
  | "active"
  | "reassigned"
  | "unassigned"
  | "concluded"
  | "request";
export type MCaseFilterType = "case" | "magistrate";

export interface ICase {
  caseId: string;
  title: string;
  type: string;
  filingDate: string;
  court: string;
  magistrate: string;
  status: string;
  stage: string;
  name: string;
  email: string;
  districts: string;
  action: string;
}
export interface TManagement {
  name: string;
  email: string;
  districts: string;
  status: string;
  action: string;
}
