import { ICaseTypes } from "@/redux/slices/case-filing-slice";
import { LockIcon, InfoIcon } from "lucide-react";
import { ROLES } from "../auth";
import { Claimant } from "@/components/case-filing/hooks";

export type Location = {
  value: string;
  label: string;
};

export interface IUsersColumn {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  role: ROLES;
  status: string;
  court_division: string;
  sub_division?: string;
  court_type: string;
  created_at?: Date | undefined;
}

export interface FormField {
  id: any;
  name: keyof Claimant;
  label: string;
  placeholder: string;
  tooltipText?: string;
  tooltipTitle?: string;
  icon?: typeof LockIcon | typeof InfoIcon;
  tooltipIcon?: typeof InfoIcon;
  required?: boolean;
}

export const FILING_LOCATIONS: Location[] = [
  { value: "wuse-2", label: "WUSE ZONE 2" },
  { value: "garki", label: "GARKI" },
  { value: "wuse", label: "WUSE" },
  { value: "life-camp", label: "LIFE-CAMP" },
  { value: "lugbe", label: "LUGBE" },
  { value: "jiwa", label: "JIWA" },
  { value: "karu", label: "KARU" },
];

export const FORM_FIELDS: FormField[] = [
  // {
  //   id: "claimant",
  //   name: "claimant_name",
  //   label: "CLAIMANT",
  //   tooltipTitle: "WHO IS A COMPLAINT",
  //   tooltipText:
  //     "the person who officially reports a problem or wrongdoing, usually to the police or a court, asking for action to be taken. They are the one making the complaint in a case.",
  //   tooltipIcon: InfoIcon,
  //   placeholder: "Prince Joe",
  //   required: true,
  // },
  // {
  //   id: "defendant",
  //   name: "defendant_name",
  //   label: "DEFENDANT",
  //   tooltipTitle: "WHO IS A DEFENDANT",
  //   tooltipText:
  //     "The person or persons who responds to a claim or accusation, you made against them",
  //   tooltipIcon: InfoIcon,
  //   placeholder: "Prince Joe",
  //   required: true,
  // },
  // {
  //   id: "case-title",
  //   name: "title",
  //   label: "CASE TITLE",
  //   tooltipText: "Enter the title of the case",
  //   placeholder: "Enter title here",
  //   required: true,
  // },
  {
    id: "claimant_phone_number",
    name: "phone_number",
    label: "CLAIMANT PHONE NUMBER",
    placeholder: "08123456789",
    required: true,
  },
  {
    id: "claimant_email_address",
    name: "email_address",
    label: "CLAIMANT EMAIL ADDRESS",
    placeholder: "example@email.com",
    required: true,
  },
  {
    id: "claimant_address",
    name: "address",
    label: "CLAIMANT PHYSICAL ADDRESS",
    tooltipText: "Enter the physical address of the claimant",
    placeholder: "Enter address here",
    required: true,
  },
];

// Additional type for form state
export type FormData = {
  [key: string]: string;
};

// Optional: Add validation types
export type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => boolean;
};

export type ValidationRules = {
  [key: string]: ValidationRule;
};
