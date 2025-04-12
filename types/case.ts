export type TCaseFilterType =
  | "all"
  | "pending"
  | "case"
  | "recent"
  | "active"
  | "reassigned"
  | "assigned"
  | "registerars"
  | "under-review"
  | "approved-review"
  | "denied-review"
  | "unassigned"
  | "concluded"
  | "performing"
  | "IsHearing"
  | "request"
  | "submitted";
export type MCaseFilterType = "case" | "magistrate" | "financial";

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

export interface IMetric {
  id: number;
  title: string;
  total: string;
  lastYear: string;
  variant?: string;
  description: string;
  districts: { name: string; cases: number }[];
}

export interface Notifications {
  id: string;
  title: string;
  description: string;
  case_id?: string;
  status: string;
  created_at: string;
}
