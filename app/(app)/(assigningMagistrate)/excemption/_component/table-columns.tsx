"use client";

import { ColumnDef } from "@tanstack/react-table";
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
    accessorKey: "exemption_id",
    header: "Exemption ID",
    cell: ({ row }) => (
      <span>
        {row.original?.updated_at
          ? dateFormatter(row.original?.updated_at)?.fullLongFormat
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Created",
  },
  {
    accessorKey: "expires_at",
    header: "Expires",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const casetype = row.original.case_type_name;
      return (
        <span className="uppercase">{casetype ? `${casetype}` : <i className="text-xs">No Case type selected yet</i>}</span>
      );
    },
  },

];
