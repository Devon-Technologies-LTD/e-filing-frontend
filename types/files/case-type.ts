import { EditorState } from "draft-js";

// Define type-safe interfaces
export interface CaseOption {
  value: string;
  label: string;
}

export interface RichTextEditorProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

// Components
export interface FileInputProps {
  id: string;
  label: string;
}

// Define constants for case types and their options
export const CASE_TYPES: CaseOption[] = [
  { value: "CRIMINAL CASE", label: "CRIMINAL CASE" },
  { value: "CIVIL CASE", label: "CIVIL CASE" },
  { value: "FAMILY CASE", label: "FAMILY CASE" },
];
export const CASE_TYPES2: CaseOption[] = [
  { value: "CRIMINAL CASE", label: "CRIMINAL CASE" },
  { value: "CIVIL CASE", label: "CIVIL CASE" },
];
export const COURT_TYPE: CaseOption[] = [
  { value: "Magistrate Court", label: "MAGISTRATE COURT" },
  { value: "Family Court", label: "FAMILY COURT" },
];
export const ALL_DISTRICT: CaseOption[] = [
  { value: "zone1", label: "WUSE ZONE 1" },
  { value: "zone2", label: "WUSE ZONE 2" },
];


export const MAGISTERATE_TYPE: CaseOption[] = [
  { value: "DIRECTOR_MAGISTRATE", label: "DIRECTOR MAGISTRATE" },
  { value: "ASSIGNING_MAGISTRATE", label: "ASSIGNING MAGISTRATE" },
  { value: "PRESIDING_MAGISTRATE", label: "PRESIDING MAGISTRATE" },
];
export const MAGISTERATE_TYPE2: CaseOption[] = [
  { value: "ASSIGNING_MAGISTRATE", label: "ASSIGNING MAGISTRATE" },
  { value: "PRESIDING_MAGISTRATE", label: "PRESIDING MAGISTRATE" },
];
export const MAGISTERATE_STATUS: CaseOption[] = [
  { value: "ACTIVE", label: "ACTIVE MAGISTRATE" },
  { value: "INACTIVE", label: "INACTIVE MAGISTRATE" },
];

// Define the worth options for family cases
export const WORTH_OPTIONS: CaseOption[] = [
  {
    value: "less_equal_one_million",
    label: "LESS THAN OR EQUAL TO A MILLION NAIRA",
  },
  {
    value: "between_one_three_million",
    label: "BETWEEN ONE MILLION AND THREE MILLION",
  },
  {
    value: "between_three_seven_million",
    label: "BETWEEN THREE MILLION AND SEVEN MILLION",
  },
];

// Define the case options
export const CASE_OPTIONS: Record<CaseTypes, CaseOption[]> = {
  criminal: [
    { value: "FIR", label: "FIRST INFORMATION REPORT (FIR)" },
    { value: "DCC", label: "DIRECT CRIMINAL COMPLAINT" },
    { value: "EXPARTE", label: "REQUEST FOR REMAND ORDER (EXPARTE)" },
  ],
  civil: [
    { value: "recovery_premise", label: "RECOVERY OF PREMISE" },
    { value: "default_summon", label: "PLAINT FOR DEFAULT SUMMON" },
    { value: "specific_summon", label: "PLAINT FOR SPECIFIC SUMMON" },
  ],
  family: WORTH_OPTIONS,
};

// Define the valid case types
export type CaseTypes = "criminal" | "civil" | "family";
export type MagistrateTypes = "diirector" | "assigning" | "presiding";

export const CASES_FILED: CaseOption[] = [
  { value: "active", label: "ACTIVE CASES" },
  { value: "pending", label: "PENDING CASES(NON - ASSIGNED)" },
  { value: "reassigned", label: "RE-ASSIGNED CASES" },
  { value: "completed", label: "COMPLETED (CLOSED) CASES" },
];
export type CasesFiled = "active" | "pending" | "reassigned" | "completed";
