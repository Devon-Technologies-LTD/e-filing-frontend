import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CaseDetailsResponse } from "@/lib/_services/case-file";
import { dateFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const MainColumns: ColumnDef<CaseDetailsResponse>[] = [
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
      return (
        <StatusBadge
          tooltip={""}
          tooltipProps={{ delayDuration: 200 }}
          status={row.original.status?.toLowerCase() as any}
        />
      );
    },
  },
];

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
    cell: ({ row }) => {
      return <span>{row.original.division_name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <StatusBadge
          tooltip={""}
          tooltipProps={{ delayDuration: 200 }}
          status={row.original.status?.toLowerCase() as any}
        />
      );
    },
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
      const title = row.original.title;
      return (
        <Tooltip>
          <TooltipTrigger>
            <div
              className="max-w-32 text-left line-clamp-2 break-words"
              title={title}
            >
              {title}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-zinc-700 bg-white border-0 font-medium text-xs"
          >
            <div className="max-w-32 line-clamp-2 break-words" title={title}>
              {title} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Corrupti corporis enim excepturi quaerat necessitatibus eius
              impedit ullam aliquid facilis laudantium, odit ex? Ducimus,
              exercitationem odit. Cum incidunt aliquid ducimus iure?
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Case Type",
    cell: ({ row }) => {
      const casetype = row.original.case_type_name;
      const subName = row.original.sub_case_type_name?.toLowerCase();
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
    cell: ({ row }) => {
      return <span>{row.original.division_name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <StatusBadge
          tooltip={row.original.status?.toLowerCase()}
          tooltipProps={{ delayDuration: 200 }}
          status={row.original.status?.toLowerCase() as any}
        />
      );
    },
  },
];
