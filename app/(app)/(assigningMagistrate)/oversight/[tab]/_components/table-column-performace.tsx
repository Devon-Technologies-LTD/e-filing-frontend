"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { ROLES } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface IUsersColumn {
  Division: string;
  Name: string;
  Type: string;
  court_division?: string;
  courtType?: string;
  Status?: string;
  TotalAssignedCases?: number;
  ActiveCases?: number;
}

export const createPerformanceColumns = (
  userRole: ROLES,
  type?: "pending" | "all"
): ColumnDef<IUsersColumn>[] => {
  const baseColumns: ColumnDef<IUsersColumn>[] = [

    {
      id: "Name",
      header: "Magistrate Name",
      accessorKey: "Name",
      cell: ({ row }) => {
        const Name = row.original.Name || "";
        const initials = Name
          ? Name.split(" ")
            .map((part) => part.charAt(0).toUpperCase())
            .join("")
          : "";

        return (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary-foreground text-black">
                {initials}
              </AvatarFallback>
            </Avatar>
            <p>{Name}</p>
          </div>
        );
      },
    },

    {
      id: "TotalCases",
      header: "Total Assigned Cases",
      accessorKey: "TotalCases",
    },
    {
      id: "ActiveCases",
      header: "Active Cases",
      accessorKey: "ActiveCases",
    },
    {
      id: "ClosedCases",
      header: "Closed Cases",
      accessorKey: "ClosedCases",
    },
    {
      id: "ReassignedCases",
      header: "Reassigned Cases",
      accessorKey: "ReassignedCases",
    },
 
  ];

  let conditionalColumns: ColumnDef<IUsersColumn>[] = [...baseColumns];

  return conditionalColumns;
};
