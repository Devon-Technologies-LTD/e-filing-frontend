"use client";

import { ColumnDef } from "@tanstack/react-table";
import DraftTableActionCell from "./action-cell";
import { dateFormatter } from "@/lib/utils";

export interface IDraftsColumn {
  id: string;
  user_id: string;
  title: string;
  description: string;
  court_division_id: string;
  case_type_name: string;
  sub_case_type_name: string;
  division_name: string;
  claimant: Record<string, any>;
  defendant: object;
  status: string;
  created_at: string;
  updated_at: string;
}

export const DraftsColumns: ColumnDef<IDraftsColumn>[] = [
  {
    accessorKey: "updated_at",
    header: "Last Edited",
    cell: ({ row }) => (
      <span>
        {row.original?.updated_at
          ? dateFormatter(row.original?.updated_at)?.fullLongFormat
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: "Case Title",
  },
  {
    accessorKey: "case_type_name",
    header: "Case Type",
  },
  {
    accessorKey: "",
    header: "Action",
    cell: ({ row }) => <DraftTableActionCell row={row} />,
  },
];
