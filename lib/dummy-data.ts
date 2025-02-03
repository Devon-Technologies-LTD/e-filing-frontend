import { IDraftsColumn } from "@/app/(app)/drafts/_components/table-columns";
import { ICase, Management } from "../types/case";

interface Notification {
  id: string;
  icon: "check" | "scale" | "initials" | "hearings";
  message: string;
  caseNumber: string;
  timestamp: string;
  initials?: string;
}

export const mockCases: ICase[] = [
  {
    caseId: "CVfWuse/233456789/2024",
    title: "John Ibuku Johnson vs Jone Jonerite Doc...",
    type: "CRIMINAL CASE",
    filingDate: "12/02/2025",
    court: "Koru - Koru Site",
    magistrate: "Boryo Aderola",
    status: "IN PROGRESS",
    stage: "First Information Report",
    name: "CVfWuse/233456789/2024",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    action: "Koru - Koru Site",
  },
  {
    caseId: "CVfWuse/233456789/2024",
    title: "John Ibuku Johnson vs Jone Jonerite Doc...",
    type: "CRIMINAL CASE",
    filingDate: "12/02/2025",
    court: "Koru - Koru Site",
    magistrate: "Boryo Aderola",
    status: "IN PROGRESS",
    stage: "First Information Report",
    name: "CVfWuse/233456789/2024",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    action: "Koru - Koru Site",
  },
];
export const management: Management[] = [
  {
    name: "CVfWuse/233456789/2024",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    status: "12/02/2025",
    action: "Koru - Koru Site",
  },
  {
    name: "CVfWuse/233456789/2024",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    status: "12/02/2025",
    action: "Koru - Koru Site",
  },
  {
    name: "CVfWuse/233456789/2024",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    status: "12/02/2025",
    action: "Koru - Koru Site",
  },
];

export const mockDrafts: IDraftsColumn[] = [
  {
    id: "1",
    title: "John Ibuku Johnson vs Jone Jonerite Doc...",
    type: "CRIMINAL CASE",
    lastEdit: "12/02/2025",
  },
  {
    id: "2",
    title: "John Ibuku Johnson vs Jone Jonerite Doc...",
    type: "CRIMINAL CASE",
    lastEdit: "12/02/2025",
  },
];

export const notifications: Notification[] = [
  {
    id: "1",
    icon: "check",
    message:
      "has been submitted and filed successfully. You will be notified of any updates",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    icon: "scale",
    message: "A Magistrate court (Division A) has been assigned to your case",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    icon: "initials",
    initials: "AA",
    message: "Magistrate Adebayo Adekoya is now presiding over your case",
    caseNumber: "CV/Wuse/233456789/2024 Stay tuned for updates!",
    timestamp: "2 hours ago",
  },
  {
    id: "4",
    icon: "check",
    message:
      "has been submitted and filed successfully. You will be notified of any updates",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 weeks ago",
  },
  {
    id: "5",
    icon: "scale",
    message: "A Magistrate court (Division A) has been assigned to your case",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 weeks ago",
  },
  {
    id: "6",
    icon: "hearings",
    message: "A Magistrate court (Division A) has been assigned to your case",
    caseNumber: "CV/Wuse/233456789/2024",
    timestamp: "2 weeks ago",
  },
];

export const demoData = {
  caseNumber: "CV/Wuse/233456789/2024",
  title:
    "Johnathan Smith and Associates vs. The Federal Housing Development Corporation",
  filedDate: "12/02/2024",
  claimant: {
    name: "John Doe",
    email: "johndoe@gmail.com",
    address: "22 Maitama Close",
    phone: "+23480123456",
  },
  court: {
    division: "Kuje",
    district: "Kuje District",
    magistrate: "Adebayo Adekoya",
  },
  caseType: {
    type: "Criminal",
    kind: "Recovery Of Premise",
    worth: "Less than a million",
  },
  filings: [
    {
      date: "12/02/2024",
      documents: [
        {
          title: "",
          items: [
            { name: "Originating Applications", amount: 500.0 },
            { name: "Motion Exparte", amount: 500.0 },
          ],
        },
        {
          title: "Exhibits",
          items: [{ name: "Car Light Picture", amount: 500.0 }],
        },
      ],
    },
    {
      date: "15/02/2024",
      documents: [
        {
          title: "",
          items: [
            { name: "Originating Applications", amount: 500.0 },
            { name: "Motion Exparte", amount: 500.0 },
          ],
        },
        {
          title: "Exhibits",
          items: [],
        },
      ],
    },
  ],
};

export const caseMetric = [
  {
    id: 1,
    title: "Total Case Filed",
    total: "5,675,000",
    lastYear: "12,200",
    color: "bg-gray-300",
    description: "The total number of cases filed under Wuse zone 6.",
    districts: [
      { name: "Wuse Zone 1", cases: 4500 },
      { name: "Wuse Zone 2", cases: 3200 },
      { name: "Wuse Zone 3", cases: 6000 },
    ],
  },
  {
    id: 2,
    title: "Active Cases",
    total: "3,890,000",
    lastYear: "9,450",
    color: "bg-slate-200",
    description: "Cases that are still ongoing in Wuse division.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 3,
    title: "Unassigned Cases",
    total: "1,890,000",
    lastYear: "2,450",
    color: "bg-gray-100",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 4,
    title: "Re-assigned Cases",
    total: "1,890,000",
    lastYear: "2,450",
    color: "bg-gray-100",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 5,
    title: "Concluded Cases",
    total: "1,890,000",
    lastYear: "2,450",
    color: "bg-gray-100",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
];
export const magistrateMetric = [
  {
    id: 4,
    title: "Re-assigned Cases",
    total: "1,890,000",
    lastYear: "2,450",
    color: "bg-gray-100",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
  {
    id: 5,
    title: "Concluded Cases",
    total: "1,890,000",
    lastYear: "2,450",
    color: "bg-slate-200",
    description: "The total number of cases  filed under wuse zone 2.",
    districts: [
      { name: "Wuse Zone 1", cases: 2000 },
      { name: "Wuse Zone 2", cases: 1500 },
      { name: "Wuse Zone 3", cases: 3000 },
    ],
  },
];
