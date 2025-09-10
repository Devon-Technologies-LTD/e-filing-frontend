"use client";

import { ColumnDef } from "@tanstack/react-table";
import { dateFormatter } from "@/lib/utils";


// lib/types.ts
export type Status = "ACTIVE" | "SUSPENDED" | "PENDING";

export interface Exemption {
  id: string;
  user: string;
  email: string;
  created_at: string;
  expires_at: string;
  status: Status;
  updated_at: string;
  case_type_name: string;
}

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

export const DraftsColumns: ColumnDef<Exemption>[] = [
  {
    accessorKey: "exemption_code",
    header: "Exemption ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span>
        {row.original?.created_at
          ? dateFormatter(row.original?.created_at)?.fullLongFormat
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "expires",
    header: "Expires",
    cell: ({ row }) => (
      <span>
        {row.original?.expires_at
          ? dateFormatter(row.original?.expires_at)?.fullLongFormat
          : ""}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",

  },

];
