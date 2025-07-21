"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { ROLES } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface IUsersColumn {
  Name: string;
  Type: string;
  Division: string;
  court_division?: string;
  courtType?: string;
  Status?: string;
  TotalAssignedCases?: number;
  ActiveCases?: number;
  subDivision?: string;
}

export const createUserColumns = (
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
      id: "Type",
      header: "Magistrate Type",
      accessorKey: "Type",
    },
    {
      id: "Division",
      header: "Division",
      accessorKey: "Division",
    },
  ];

  if (userRole === ROLES.ASSIGNING_MAGISTRATE) {
    baseColumns.push({
      id: "sub_division",
      header: "Sub Division",
      accessorKey: "sub_division",
    });
  }

  baseColumns.push(
    {
      id: "TotalAssignedCases",
      header: "Total Assigned Cases",
      accessorKey: "TotalAssignedCases",
      cell: ({ row }) => `${row.original.TotalAssignedCases || 0} Case(s)`,
    },
    {
      id: "ActiveCases",
      header: "Active Cases",
      accessorKey: "ActiveCases",
      cell: ({ row }) => `${row.original.ActiveCases || 0} Case(s)`,
    },
    {
      id: "Status",
      header: "Status",
      accessorKey: "Status",
      cell: ({ row }) => {
        const status = row.original.Status
          ? (row.original.Status || "").toLowerCase()
          : "N/A";
        const statusColors: Record<string, string> = {
          pending: "text-yellow-600 bg-yellow-100",
          active: "text-green-600 bg-green-100",
          inactive: "text-red-600 bg-red-100",
        };
        return (
          <StatusBadge
            tooltip=""
            tooltipProps={{ delayDuration: 200 }}
            status={status as any}
            className={`px-2 py-1 rounded-md ${
              statusColors[status] || "text-gray-600 bg-gray-100"
            }`}
          >
            {status}
          </StatusBadge>
        );
      },
    }
  );

  return baseColumns;
};
