export type TCaseFilterType = "recent" | "active" | "unassigned" | "concluded";

export interface ICase {
  caseId: string;
  title: string;
  type: string;
  filingDate: string;
  court: string;
  magistrate: string;
  status: string;
  stage: string;
}
