import { LockIcon, InfoIcon } from 'lucide-react';

// Type definitions
export type Location = {
    value: string;
    label: string;
}

export interface FormField {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    tooltipText?: string;
    icon?: typeof LockIcon | typeof InfoIcon;
    tooltipIcon?: typeof InfoIcon;
    required?: boolean;
}

// Constants (not interfaces)
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
    {
        id: "claimant",
        name: "claimant",
        label: "CLAIMANT*",
        tooltipText: "Enter the name of the claimant",
        tooltipIcon: InfoIcon,
        placeholder: "Prince Joe",
        icon: LockIcon,
        required: true,
    },
    {
        id: "defendant",
        name: "defendant",
        label: "DEFENDANT*",
        tooltipText: "Enter the name of the defendant",
        tooltipIcon: InfoIcon,
        placeholder: "Prince Joe",
        required: true,
    },
    {
        id: "case-title",
        name: "caseTitle",
        label: "CASE TITLE*",
        tooltipText: "Enter the title of the case",
        placeholder: "Prince Joe",
        required: true,
    },
    {
        id: "claimant-phone",
        name: "claimantPhone",
        label: "CLAIMANT PHONE NUMBER*",
        placeholder: "Prince Joe",
        required: true,
    },
    {
        id: "claimant-email",
        name: "claimantEmail",
        label: "CLAIMANT EMAIL ADDRESS*",
        placeholder: "Prince Joe",
        icon: LockIcon,
        required: true,
    },
    {
        id: "claimant-address",
        name: "claimantAddress",
        label: "CLAIMANT PHYSICAL ADDRESS*",
        tooltipText: "Enter the physical address of the claimant",
        placeholder: "Prince Joe",
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