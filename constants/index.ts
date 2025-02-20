export const DEFAULT_PAGE_SIZE = 50;
export const allowedUploadTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpg",
  "image/png",
];
export const DOCUMENT_MAX_SIZE = 10 * 1024 * 1024;

export enum CaseStatus {
  Draft = "draft",
  Pending = "pending",
  ToBeAssigned = "to be assigned",
  JudgementDelivered = "judgement delivered",
  StruckOut = "struck out",
  Approved = "approved",
  UnderReview = "under review",
  Denied = "denied",
  Assigned = "assigned",
}

export enum CaseTypeData {
  CIVIL_CASE = "CIVIL CASE",
  FAMILY_CASE = "FAMILY CASE",
  CRIMINAL_CASE = "CRIMINAL CASE",
}

export enum CivilCaseSubType {
  PLAINT_FOR_SPECIFIC_SUMMONS = "PLAINT FOR SPECIFIC SUMMONS",
  PLAINT_FOR_DEFAULT_SUMMONS = "PLAINT FOR DEFAULT SUMMONS",
  RECOVERY_OF_PREMISE = "RECOVERY OF PREMISE",
}
export enum CivilCaseSubTypeValueWorth {
  LessThanOne = "LESS THAN OR EQUAL TO ₦1,000,000",
  BetweenOneAndThree = "BETWEEN ₦1,000,000 AND ₦3,000,000",
  BetweenThreeAndSeven = "BETWEEN ₦3,000,000 AND ₦7,000,000",
}

export enum FamilyCaseSubType {
  WITNESS_STATEMENT_OF_OATH = "WITNESS STATEMENT OF OATH",
  NOTICE_OF_INTENTION_TO_DEFEND = "NOTICE OF INTENTION TO DEFEND",
  FORM_48 = "FORM 48",
  MEMORANDUM_OF_CONDITIONAL_APPEARANCE = "MEMORANDUM OF CONDITIONAL APPEARANCE",
  INTERPLEADER = "INTERPLEADER",
  LEGAL_GUARDIANSHIP = "LEGAL GUARDIANSHIP",
  MOTION_ON_NOTICE = "MOTION ON NOTICE",
  APPLICATION_FOR_PUBLIC_ADOPTION = "APPLICATION FOR PUBLIC ADOPTION",
  EXHIBIT_FOR_APPLICATION_FOR_PUBLIC_ADOPTION = "EXHIBIT FOR APPLICATION FOR PUBLIC ADOPTION",
  MOTION_EX_PARTE = "MOTION EX PARTE",
  APPLICATION_FOR_COMMENCEMENT = "APPLICATION FOR COMMENCEMENT",
  FORM_49 = "FORM 49",
  OATH_AFFIDAVIT = "OATH/AFFIDAVIT",
}

export enum OtherDocuments {
  CHARGE_SHEET = "CHARGE SHEET",
  MOTION_FOR_BAIL = "MOTION FOR BAIL",
  COUNTER_AFFIDAVIT = "COUNTER AFFIDAVIT",
}

export enum CriminalCaseSubType {
  FIRST_INFORMATION_REPORT = "FIRST INFORMATION REPORT (FIR)",
  DIRECT_COMPLAIN = "DIRECT COMPLAIN",
  REQUEST_FOR_REMAND_ORDER = "REQUEST FOR REMAND ORDER (EXPARTE)",
}
