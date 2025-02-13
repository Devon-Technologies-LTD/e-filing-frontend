import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROLES } from "@/types/auth";

export interface Moversight {
  id?: string;
  name: string;
  division?: string;
  districts?: string;
  courtType?: string;
  caseId?: string;
  title?: string;
  type?: string;
  court?: string;
  magistrate?: string;
  status?: string;
  total?: string;
  active?: string;
  close?: string;
  reassigned?: string;
  resolutionTime?: string;
}

export const mainColumns = (userRole: ROLES, type?: "performance" | "all"): ColumnDef<Moversight>[] => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  let baseColumns: ColumnDef<Moversight>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Magistrate Name",
      cell: ({ row }) => {
        const name = row.original.name;
        const initials = name
          .split(" ")
          .map((part) => part.charAt(0).toUpperCase())
          .join("");

        return (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary-foreground text-black">
                {initials}
              </AvatarFallback>
            </Avatar>
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total Assigned Cases",
    },
    {
      accessorKey: "active",
      header: "Active Cases",
    },
  ];

  let conditionalColumns: ColumnDef<Moversight>[] = [...baseColumns];

  if (type === "performance") {
    conditionalColumns.push(
      {
        accessorKey: "close",
        header: "Closed Cases",
      },
      {
        accessorKey: "reassigned",
        header: "Re-assignment Cases",
      },
      {
        accessorKey: "resolutionTime",
        header: "Avg. Case Resolution (Days)",
      }
    );
  } else {
    conditionalColumns.push(
      {
        accessorKey: "districts",
        header: "District",
      },
      {
        accessorKey: "status",
        header: "Status",
      }
    );
  }

  return conditionalColumns; // ✅ Return only columns, NOT JSX elements
};
