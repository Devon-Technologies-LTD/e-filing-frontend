import { IDraftsColumn } from "@/app/(app)/drafts/_components/table-columns";
import { ICase, TManagement } from "../types/case";
// import { INotification } from "@/components/activity-list";
import { IUsersColumn } from "@/app/(app)/(assigningMagistrate)/management/[tab]/_components/table-column";
import { USER_STATUS } from "@/types/auth";

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
export const management: TManagement[] = [
  {
    name: "Prince Muteh",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    status: "Active",
    action: "['view profile', 'De-activate User', 'Delete user']",
  },
  {
    name: "Peter John",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    status: "Inactive",
    action: "['view profile', 'De-activate User', 'Delete user']",
  },
  {
    name: "CVfWuse/233456789/2024",
    email: "John Ibuku Johnson vs Jone Jonerite Doc...",
    districts: "CRIMINAL CASE",
    status: "Pending",
    action: "['view profile', 'De-activate User', 'Delete user']",
  },
];

// export const mockUsers: IUsersColumn[] = [
//   {
//     id: "1",
//     name: "Bayo Adetola",
//     first_name: "Bayo Adetola",
//     last_name: "Bayo Adetola",
//     email: "bayoadetola@gmail.com",
//     status: USER_STATUS.ACTIVE,
//     division: "Life Camp",
//     districts: "Wuse zone 1",
//     created_at: null,
//   },
//   {
//     id: "1",
//     name: "Bayo Adetola",
//     first_name: "Bayo Adetola",
//     last_name: "Bayo Adetola",
//     email: "bayoadetola@gmail.com",
//     status: USER_STATUS.INACTIVE,
//     division: "Kuje",
//     districts: "Wuse zone 2",
//     courtType: "Family Court",
//     created_at: "",
//   },
// ];
// export const notifications: INotification[] = [
//   {
//     id: "1",
//     icon: "check",
//     message:
//       "has been submitted and filed successfully. You will be notified of any updates",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "2",
//     icon: "scale",
//     message: "A Magistrate court (Division A) has been assigned to your case",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "3",
//     icon: "initials",
//     initials: "AA",
//     message: "Magistrate Adebayo Adekoya is now presiding over your case",
//     caseNumber: "CV/WZ2/001e/Year Stay tuned for updates!",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "4",
//     icon: "check",
//     message:
//       "has been submitted and filed successfully. You will be notified of any updates",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 weeks ago",
//   },
//   {
//     id: "5",
//     icon: "scale",
//     message: "A Magistrate court (Division A) has been assigned to your case",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 weeks ago",
//   },
//   {
//     id: "6",
//     icon: "hearings",
//     message: "A Magistrate court (Division A) has been assigned to your case",
//     caseNumber: "CV/WZ2/001e/Year",
//     timestamp: "2 weeks ago",
//   },
// ];
// export const documentHistory: INotification[] = [
//   {
//     id: "1",
//     icon: "pdf",
//     message:
//       "A Documents titled “Cases” has been refiled  for the case 567458678 (Uche vs NEPA) . You will be notified of any updates",
//     caseNumber: "",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "2",
//     icon: "shield",
//     message:
//       "Seal and QR code were generated for the case 567458678 (Uche vs NEPA) . You will be notified of any updates",
//     caseNumber: "",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "3",
//     icon: "pdf",
//     message:
//       "23 Documents uploaded for the case 567458678 (Uche vs NEPA) . You will be notified of any updates",
//     caseNumber: "",
//     timestamp: "2 hours ago",
//   },
// ];

export const demoData = {
  caseNumber: "CV/WZ2/001e/Year",
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

export const caseMetric = {
  histogram: {
    labels: [
      "Wuse Zone 1",
      "Wuse Zone 2",
      "Wuse Zone 3",
      "Wuse Zone 4",
      "Wuse Zone 5",
    ],
    data: [4500, 3200, 6000, 2500, 4000],
    label: "Case Frequency",
    histogramTitle: "Case Distribution Across Wuse Division",
  },
  data: [
    {
      id: 1,
      title: "Total Case Filed",
      total: "5,675,000",
      lastYear: "12,200",
      variant: "total",
      color: "bg-neutral-200",
      description: "The total number of cases filed under Wuse zone 6.",
      districts: [
        { name: "Wuse Zone 1", cases: 4500 },
        { name: "Wuse Zone 2", cases: 3200 },
        { name: "Wuse Zone 3", cases: 6000 },
        { name: "Wuse Zone 1", cases: 4500 },
        { name: "Wuse Zone 2", cases: 3200 },
        { name: "Wuse Zone 3", cases: 6000 },
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
      variant: "active",
      color: "bg-green-50",
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
      variant: "unassigned",
      lastYear: "2,450",
      color: "bg-orange-50",
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
      variant: "reassigned",
      lastYear: "2,450",
      color: "bg-zinc-50",
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
      variant: "concluded",
      total: "1,890,000",
      lastYear: "2,450",
      color: "bg-zinc-100",
      description: "The total number of cases  filed under wuse zone 2.",
      districts: [
        { name: "Wuse Zone 1", cases: 2000 },
        { name: "Wuse Zone 2", cases: 1500 },
        { name: "Wuse Zone 3", cases: 3000 },
      ],
    },
  ],
};
export const centralMetric = {
  histogram: {
    labels: [
      "Total Cases Reviewed",
      "Pending Reviews",
      "Approved Reviews",
      "Denied Reviews",
    ],
    data: [4500, 3200, 6000, 2500, 4000],
    label: "No of cases",
    histogramTitle: "REviewed Status",
  },
};
export const presidingmetric = {
  histogram: {
    labels: [
      "Total Assigned Cases",
      "Active Cases",
      "Closed Cases",
      "Re-assinged",
    ],
    data: [4500, 3200, 6000, 2500, 4000],
    label: "No. of Case",
    histogramTitle: "Cases Status",
  },
  data: [
    {
      id: 1,
      title: "Total Case Filed",
      total: "5,675,000",
      lastYear: "12,200",
      variant: "total",
      color: "bg-neutral-200",
      description: "The total number of cases filed under Wuse zone 6.",
      districts: [
        { name: "Wuse Zone 1", cases: 4500 },
        { name: "Wuse Zone 2", cases: 3200 },
        { name: "Wuse Zone 3", cases: 6000 },
        { name: "Wuse Zone 1", cases: 4500 },
        { name: "Wuse Zone 2", cases: 3200 },
        { name: "Wuse Zone 3", cases: 6000 },
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
      variant: "active",
      color: "bg-green-50",
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
      variant: "unassigned",
      lastYear: "2,450",
      color: "bg-orange-50",
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
      variant: "reassigned",
      lastYear: "2,450",
      color: "bg-zinc-50",
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
      variant: "concluded",
      total: "1,890,000",
      lastYear: "2,450",
      color: "bg-zinc-100",
      description: "The total number of cases  filed under wuse zone 2.",
      districts: [
        { name: "Wuse Zone 1", cases: 2000 },
        { name: "Wuse Zone 2", cases: 1500 },
        { name: "Wuse Zone 3", cases: 3000 },
      ],
    },
  ],
};

export const chiefJudgeCaseMetric = {
  histogram: {
    labels: [
      "Wuse Zone 2",
      "Garki",
      "Wuse Zone 6",
      "Lugbe",
      "Jiwa",
      "Karu",
      "Karsi",
      "Kuje",
      "Bwari",
      "Mpape",
      "Kubwa",
    ],
    data: [4500, 3200, 6000, 2500, 4000, 4000, 3923, 45542, 2344, 8432],
    label: "Case Frequency",
    histogramTitle: "Case Distribution Across Divisions (Abuja)",
  },
  data: [
    {
      id: 1,
      title: "Total Case Filed",
      total: "5,675,000",
      lastYear: "12,200",
      color: "bg-zinc-100",
      description: "The total number of cases filed under Wuse zone 6.",
      districts: [
        { name: "Wuse Zone 1", cases: 4500 },
        { name: "Wuse Zone 2", cases: 3200 },
        { name: "Wuse Zone 3", cases: 6000 },
        { name: "Wuse Zone 1", cases: 4500 },
        { name: "Wuse Zone 2", cases: 3200 },
        { name: "Wuse Zone 3", cases: 6000 },
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
      color: "bg-green-50",
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
      color: "bg-orange-50",
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
      color: "bg-zinc-50",
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
      color: "bg-zinc-100",
      description: "The total number of cases  filed under wuse zone 2.",
      districts: [
        { name: "Wuse Zone 1", cases: 2000 },
        { name: "Wuse Zone 2", cases: 1500 },
        { name: "Wuse Zone 3", cases: 3000 },
      ],
    },
  ],
};
export const magistrateMetric = {
  histogram: {
    labels: [
      "Wuse Zone 1",
      "Wuse Zone 2",
      "Wuse Zone 3",
      "Wuse Zone 4",
      "Wuse Zone 5",
      "Wuse Zone 6",
      "Wuse Zone 7",
      "Wuse Zone 8",
      "Wuse Zone 9",
      "Wuse Zone 10",
    ],
    data: [2000, 1500, 3000, 1000, 2500, 3000, 1000, 2500, 2000, 1500],
    label: "Magistrate Frequency",
    histogramTitle: "Magistrate Distribution Across Wuse Division",
  },
  data: [
    {
      id: 4,
      title: "Re-assigned Cases",
      total: "1,890,000",
      lastYear: "2,450",
      color: "bg-gray-100",
      description: "The total number of cases filed under Wuse Zone 2.",
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
      description: "The total number of cases filed under Wuse Zone 2.",
      districts: [
        { name: "Wuse Zone 1", cases: 2000 },
        { name: "Wuse Zone 2", cases: 1500 },
        { name: "Wuse Zone 3", cases: 3000 },
      ],
    },
  ],
};
export const chiefJudgeMagistrateMetric = {
  histogram: {
    labels: [
      "Wuse Zone 2",
      "Garki",
      "Wuse Zone 6",
      "Lugbe",
      "Jiwa",
      "Karu",
      "Karsi",
      "Kuje",
      "Bwari",
      "Mpape",
      "Kubwa",
    ],
    data: [2000, 1500, 3000, 1000, 2500, 3000, 1000, 2500, 2000, 1500],
    label: "Magistrate Frequency",
    histogramTitle: "Magistrate Distribution Across Divisions (ABUJA)",
  },
  data: [
    {
      id: 4,
      title: "Re-assigned Cases",
      total: "1,890,000",
      lastYear: "2,450",
      color: "bg-gray-100",
      description: "The total number of cases filed under Wuse Zone 2.",
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
      description: "The total number of cases filed under Wuse Zone 2.",
      districts: [
        { name: "Wuse Zone 1", cases: 2000 },
        { name: "Wuse Zone 2", cases: 1500 },
        { name: "Wuse Zone 3", cases: 3000 },
      ],
    },
  ],
};

export const hearings = [
  {
    caseNumber: "CV/WZ2/001e/Year",
    parties:
      "Johnathan Smith and Associates vs. The Federal Housing Development Corporation of the State of New Lagos",
    description:
      "Breach of Contract Regarding Urban Development Project Phase 3, Filed on Behalf of Affected Stakeholders",
    hearingDate: "12th January, 2025",
    hearingTime: "9:00 AM",
    displayDate: "12/01/2025",
  },
  {
    caseNumber: "CV/WZ2/001e/Year",
    parties:
      "Doe Legal Services vs. The City Planning Authority of Greater Abuja",
    description:
      "Dispute Over Land Use Regulations and Compensation Claims for Displaced Residents",
    hearingDate: "15th February, 2025",
    hearingTime: "10:30 AM",
    displayDate: "15/02/2025",
  },
  {
    caseNumber: "CV/WZ2/001e/Year",
    parties: "Green Energy Ltd. vs. National Power Grid Authority",
    description: "Contractual Violations in Renewable Energy Supply Agreements",
    hearingDate: "20th March, 2025",
    hearingTime: "11:45 AM",
    displayDate: "20/03/2025",
  },
];
