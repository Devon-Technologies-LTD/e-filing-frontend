export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SEAL_FEE = 500;
export const DEFAULT_EXHIBIT_FEE = 500;
export const DEFAULT_CHARGES_PERCENTAGE = 10;
export const defaultAllowedUploadTypes = [
  "application/pdf",
  "image/jpeg",
  "image/pjpeg",
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
  Hearing = "IsHearing",
  ActionRequired = "action required",
  UNASSIGNED = "UNASSIGNED",
}

export const getInitials = (name: string | undefined) => {
  if (!name) return "CN";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return initials.toUpperCase();
};


export enum CaseTypeData {
  CIVIL_CASE = "CIVIL CASE",
  FAMILY_CASE = "FAMILY CASE",
  CRIMINAL_CASE = "CRIMINAL CASE",
}

export enum CivilCaseSubType {
  PLAINT_FOR_SPECIFIC_SUMMONS = "PLAINT FOR SPECIFIC SUMMONS",
  PLAINT_FOR_DEFAULT_SUMMONS = "PLAINT FOR DEFAULT SUMMONS",
  RECOVERY_OF_PREMISE = "RECOVERY OF PREMISE",
  Interpleader = "INTERPLEADER",
  OriginatingApplication = "ORIGINATING APPLICATION",
}
export enum CivilCaseSubTypeValueWorth {
  LessThanOne = "LESS THAN OR EQUAL TO ₦1,000,000",
  BetweenOneAndThree = "BETWEEN ₦1,000,000 AND ₦3,000,000",
  BetweenThreeAndSeven = "BETWEEN ₦3,000,000 AND ₦7,000,000",
}
export enum SpecificSummonsValueWorth {
  LessThanOne = "LESS THAN OR EQUAL TO ₦5,000",
  BetweenFiveAndFifty = "BETWEEN ₦5,000 AND ₦50,000",
  BetweenFiftyAndFiveHundred = "BETWEEN ₦50,000 AND ₦500,000",
  BetweenFiveHundredAndOneMillion = "BETWEEN ₦500,000 AND ₦1,000,000",
  BetweenOneMillionAndSevenMillion = "BETWEEN ₦1,000,000 AND ₦7,000,000",
}

export enum OtherDocuments {
  CHARGE_SHEET = "CHARGE SHEET",
  MOTION_FOR_BAIL = "MOTION FOR BAIL",
  COUNTER_AFFIDAVIT = "COUNTER AFFIDAVIT",
}

export enum CriminalCaseSubType {
  FIRST_INFORMATION_REPORT = "FIRST INFORMATION REPORT (FIR)",
  DIRECT_COMPLAIN = "DIRECT CRIMINAL COMPLAINT",
  REQUEST_FOR_REMAND_ORDER = "REQUEST FOR REMAND ORDER (EXPARTE)",
}

export enum CriminalDocumentTitles {
  FIRST_INFORMATION_REPORT = "First Information Report (FIR)",
  DIRECT_COMPLAIN = "Direct Criminal Complaint (DCC)",
  REQUEST_FOR_REMAND_ORDER = "Request for Remand Order (Exparte)",
}
export enum FamilyDocumentMainTitles {
  WitnessStatementOnOath = "Witness Statement on Oath",
}
export enum CriminalOtherDocumentTitles {
  ChargeSheet = "Charge Sheet",
  MotionForBail = "Motion for Bail",
  CounterAffidavit = "Counter Affidavit",
}
export enum CivilDocumentTitles {
  PlaintRecoveryOfPremises1M = "Plaint/Recovery of Premises (≤₦1M)",
  PlaintForSpecificSummonsDefaultSummonsLeq5K = "Plaint for specific summons/Default Summons (≤₦5K)",
  PlaintRecoveryOfPremises3M7M = "Plaint/Recovery of Premises (₦3M–₦7M)",
  PlaintRecoveryOfPremises1MCivil = "Plaint/Recovery of Premises (≤₦1M)",
  PlaintRecoveryOfPremises1M3M = "Plaint/Recovery of Premises (₦1M–₦3M)",
  PlaintForSpecificSummonsDefaultSummons5K50K = "Plaint for specific summons/Default Summons (₦5K–₦50K)",
  PlaintForSpecificSummonsDefaultSummons50K500K = "Plaint for specific summons/Default Summons (₦50K–₦500K)",
  PlaintForSpecificSummonsDefaultSummons500K1M = "Plaint for specific summons/Default Summons (₦500K–₦1M)",
  PlaintForSpecificSummonsDefaultSummons1M7M = "Plaint for specific summons/Default Summons (₦1M–₦7M)",
  OtherPlaintsDocument = "Particulars of Claim",
  Interpleader = "INTERPLEADER",
  OriginatingApplication = "ORIGINATING APPLICATION",
}

export enum CivilOtherDocumentTitles {
  NoticeOfIntentionToDefend = "Notice of Intention to Defend",
  WitnessStatementOnOath = "Witness Statement on Oath",
  MemorandumOfAppearance = "Memorandum of appearance",
  OathAffidavit_Civil = "Affidavit",
  Motions = "Motions",
  MotionExparte_Civil = "Motion Exparte",
  MotionOnNotice_Civil = "Motion on Notice",
}

export enum FamilyDocumentTitles {
  Form49 = "Form 49",
  Form48 = "Form 48",
  Affidavit = "Affidavit",
  ApplicationForPublicAdoption = "Application for Public adoption",
  MemorandumOfConditionalAppearance = "Memorandum of conditional appearance",
  MotionExparte = "Motion Exparte",
  LegalGuardianship = "Legal Guardianship",
  NoticeOfIntentionToDefend = "Notice of Intention to Defend",
  MotionOnNotice = "Motion on Notice",
  PrivateAdoption = "Private Adoption",
  ApplicationForCommencement = "Application for Commencement",
}

export enum DocumentTitlesEnum {
  NoticeOfIntentionToDefend = "Notice of Intention to Defend",
  PlaintRecoveryOfPremises1M = "Plaint/Recovery of Premises (≤₦1M)",
  Motions = "Motions",
  PlaintForSpecificSummonsDefaultSummonsLeq5K = "Plaint for specific summons/Default Summons (≤₦5K)",
  ApplicationForCommencement = "Application for Commencement",
  PlaintRecoveryOfPremises3M7M = "Plaint/Recovery of Premises (₦3M–₦7M)",
  Form49 = "Form 49",
  Form48 = "Form 48",
  OathAffidavit = "Affidavit",
  ApplicationForPublicAdoption = "Application for Public adoption",
  PlaintRecoveryOfPremises1MCivil = "Plaint/Recovery of Premises (≤₦1M)",
  MemorandumOfConditionalAppearance = "Memorandum of conditional appearance",
  ChargeSheet = "Charge Sheet",
  PlaintForSpecificSummonsDefaultSummons5K50K = "Plaint for specific summons/Default Summons (₦5K–₦50K)",
  ExhibitForPrivateAdoption = "Exhibit for Private Adoption",
  PlaintRecoveryOfPremises1M3M = "Plaint/Recovery of Premises (₦1M–₦3M)",
  FinalWrittenAddress = "Final Written Address",
  PlaintForSpecificSummonsDefaultSummons500K1M = "Plaint for specific summons/Default Summons (₦500K–₦1M)",
  DirectCriminalComplaintDCC = "Direct Criminal Complaint (DCC)",
  OathAffidavit_Civil = "Affidavit",
  EachExhibit = "Each Exhibit",
  PlaintForSpecificSummonsDefaultSummons50K500K = "Plaint for specific summons/Default Summons (₦50K–₦500K)",
  MotionExparte_Family = "Motion Exparte",
  ExhibitForApplicationForPublicAdoption = "Exhibit for Application for public adoption",
  MotionOnNotice_Civil = "Motion on Notice",
  FirstInformationReportFIR = "First Information Report (FIR)",
  LegalGuardianship = "Legal Guardianship",
  MotionForBail = "Motion for Bail",
  NoticeOfIntentionToDefend_Family = "Notice of Intention to Defend",
  MotionOnNotice_Family = "Motion on Notice",
  PlaintForSpecificSummonsDefaultSummons1M7M = "Plaint for specific summons/Default Summons (₦1M–₦7M)",
  RequestForRemandOrderExparte = "Request for Remand Order (Exparte)",
  OriginatingApplication = "Originating Application",
  CounterAffidavit = "Counter Affidavit",
  WitnessStatementOnOath = "Witness Statement on Oath",
  PrivateAdoption = "Private Adoption",
  Interpleader = "Interpleader",
  MotionExparte_Civil = "Motion Exparte",
  MemorandumOfAppearance = "Memorandum of appearance",
  ExhibitForLegalGuardianship = "Exhibit for Legal Guardianship",
}
