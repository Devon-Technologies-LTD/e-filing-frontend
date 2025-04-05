import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { dateFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { IUsersColumn } from "@/types/files/general";
import { ROLES } from "@/types/auth";
import { CaseDetailsResponse } from "@/lib/_services/case-file";

export const createUserColumns = (
  userRole: ROLES,
  type?: "pending" | "all"
): ColumnDef<CaseDetailsResponse>[] => {
  const columns: ColumnDef<CaseDetailsResponse>[] = [
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
      cell: ({ row }) => {
        const title = row.original?.title || "N/A";

        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate max-w-[200px] cursor-pointer" title={title}>
                {title}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span>{title}</span>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Case Type",
      cell: ({ row }) => {
        const casetype = row.original?.case_type_name || "N/A";
        const subName = row.original?.sub_case_type_name?.toLowerCase() || "";

        return (
          <div>
            <span className="uppercase">{casetype ? `${casetype}:` : ""}</span>
            <br />
            <span className="capitalize">{subName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "court",
      header: "MGT. DIVISION/COURT",
      cell: ({ row }) => <span>{row.original?.division_name || "N/A"}</span>,
    },
    {
      accessorKey: "magistrate",
      header: "Presiding Magistrate",
      cell: ({ row }) => {
        const assigneeName = row.original?.assignee_name || "---------";

        return (
          <div className="flex break-all items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary-foreground text-black">
                {assigneeName
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {assigneeName}
          </div>
        );
      },
    },
  ];

  // Add Status column conditionally
  columns.push({
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        tooltip=""
        tooltipProps={{ delayDuration: 200 }}
        status={
          (((userRole === ROLES.USER || userRole === ROLES.LAWYER ) && row.original.review_status == "Denied")
            ? "Denied"
            : row.original?.status
          )?.toLowerCase() as any
        }
      />
    ),
  });

  return columns;
};

export const UnassignedColumns: ColumnDef<CaseDetailsResponse>[] = [
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
    accessorKey: "type",
    header: "Case Type",
    cell: ({ row }) => {
      const casetype = row.original?.case_type_name || "N/A";
      const subName = row.original?.sub_case_type_name?.toLowerCase() || "";

      return (
        <div>
          <span className="uppercase">{casetype ? `${casetype}:` : ""}</span>
          <br />
          <span className="capitalize">{subName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "court",
    header: "MGT. DIVISION/COURT",
    cell: ({ row }) => <span>{row.original?.division_name || "N/A"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        tooltip=""
        tooltipProps={{ delayDuration: 200 }}
        status={row.original?.status?.toLowerCase() as any}
      />
    ),
  },
];

export const UnderReviewColumns: ColumnDef<CaseDetailsResponse>[] = [
  {
    accessorKey: "case_suit_number",
    header: "Case Suit (ID)",
  },
  {
    accessorKey: "title",
    header: "Case Title",
    cell: ({ row }) => {
      const title = row.original?.title || "N/A";

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="max-w-32 text-left truncate break-words cursor-pointer"
              title={title}
            >
              {title}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-zinc-700 bg-white border-0 font-medium text-xs"
          >
            <div className="max-w-32 truncate break-words">{title}</div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Case Type",
    cell: ({ row }) => {
      const casetype = row.original?.case_type_name || "N/A";
      const subName = row.original?.sub_case_type_name?.toLowerCase() || "";

      return (
        <div>
          <span className="uppercase">{casetype ? `${casetype}:` : ""}</span>
          <br />
          <span className="capitalize">{subName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "filingDate",
    header: "Date Filed",
    cell: ({ row }) => (
      <span>
        {row.original?.created_at
          ? dateFormatter(row.original?.created_at)?.fullDate
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "court",
    header: "MGT. DISTRICT",
    cell: ({ row }) => <span>{row.original?.division_name || "N/A"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        tooltip={row.original?.review_status?.toLowerCase()}
        tooltipProps={{ delayDuration: 200 }}
        status={row.original?.review_status?.toLowerCase() as any}
      />
    ),
  },
];
