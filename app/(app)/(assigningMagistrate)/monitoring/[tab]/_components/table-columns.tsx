import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { CaseDetailsResponse } from "@/lib/_services/case-file";
import { dateFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const mainColumns: ColumnDef<CaseDetailsResponse>[] = [
  {
    accessorKey: "filingDate",
    header: "Filing Date",
    cell: ({ row }) => (
      <span>
        {row.original?.created_at
          ? dateFormatter(row.original?.created_at)?.fullDate
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "case_suit_number",
    header: "Case Suit (ID)",
  },
  {
    accessorKey: "title",
    header: "Case Title",
  },
  {
    accessorKey: "type",
    header: "Case Type",
    cell: ({ row }) => {
      const casetype = row.original.case_type_name;
      const subName = row.original.sub_case_type_name?.toLowerCase();
      return (
        <div>
          <span className="uppercase">
            {casetype ? `${casetype} CASE:` : ""}
          </span>
          <br />
          <span className="capitalize">{subName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "court",
    header: "MGT. DIVISION/COURT",
    cell: ({ row }) => {
      return <span>{row.original.division_name}</span>;
    },
  },
  {
    accessorKey: "magistrate",
    header: "PRESIDING MAGISTRATE",
    cell: ({ row }) => {
      return (
        <div className="flex break-all items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-secondary-foreground text-black">
              {row.original.assignee_name
                ? row.original.assignee_name
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()
                : ""}{" "}
            </AvatarFallback>
          </Avatar>
          {row.original?.assignee_name ?? "---------"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status?.toLowerCase() || ""; // Safe fallback
      const caseRequest = row.original.case_request_status || ""; // Safe fallback
      return (
        <StatusBadge
          tooltip=""
          tooltipProps={{ delayDuration: 200 }}
          status={(caseRequest === "CASE REQUEST SUBMITTED") ? caseRequest : (status === "to be assigned") ? row.original.reassignment_status : status}
        />
      );
    },
  },
];

export const unassignedColumns: ColumnDef<CaseDetailsResponse>[] = [
  {
    accessorKey: "filingDate",
    header: "Filing Date",
    cell: ({ row }) => (
      <span>
        {row.original?.created_at
          ? dateFormatter(row.original?.created_at)?.fullDate
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "case_suit_number",
    header: "Case Suit (ID)",
  },
  {
    accessorKey: "title",
    header: "Case Title",
  },
  {
    accessorKey: "type",
    header: "Case Type",
    cell: ({ row }) => {
      const casetype = row.original.case_type_name;
      const subName = row.original.sub_case_type_name?.toLowerCase();
      return (
        <div>
          <span className="uppercase">
            {casetype ? `${casetype} CASE:` : ""}
          </span>
          <br />
          <span className="capitalize">{subName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "court",
    header: "MGT. DIVISION/COURT",
    cell: ({ row }) => {
      return <span>{row.original.division_name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status?.toLowerCase() || ""; // Safe fallback
      const caseRequest = row.original.case_request_status || ""; // Safe fallback
      return (
        <StatusBadge
          tooltip=""
          tooltipProps={{ delayDuration: 200 }}
          status={(caseRequest === "CASE REQUEST SUBMITTED") ? caseRequest : (status === "to be assigned") ? row.original.reassignment_status : status}
        />
      );
    },
  },

];
