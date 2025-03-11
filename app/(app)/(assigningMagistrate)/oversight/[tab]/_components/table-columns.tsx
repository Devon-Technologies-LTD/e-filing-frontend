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
  districts?: string;
  courtType?: string;
  Status?: string;
  TotalAssignedCases?: number;
  ActiveCases?: number;
}

export const createUserColumns = (
  userRole: ROLES,
  type?: "pending" | "all"
): ColumnDef<IUsersColumn>[] => {
  const baseColumns: ColumnDef<IUsersColumn>[] = [
    {
      id: "Name",
      header: "Name",
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
      header: "Type",
      accessorKey: "Type",
    },
    {
      id: "TotalAssignedCases",
      header: "Total Assigned Cases",
      accessorKey: "TotalAssignedCases",
    },
    {
      id: "ActiveCases",
      header: "Active Cases",
      accessorKey: "ActiveCases",
    },
    {
      id: "Status",
      header: "Status",
      accessorKey: "Status",
      cell: ({ row }) => {
        const status = row.original.Status ? row.original.Status.toLowerCase() : "N/A";

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
            className={`px-2 py-1 rounded-md ${statusColors[status] || "text-gray-600 bg-gray-100"}`}
          >
            {status}
          </StatusBadge>
        );
      },
    },
  ];

  let conditionalColumns: ColumnDef<IUsersColumn>[] = [...baseColumns];

  if (userRole === ROLES.DIRECTOR_MAGISTRATE) {
    const directorColumns: ColumnDef<IUsersColumn>[] = [
      {
        header: "Division",
        accessorKey: "court_division",
      },
      {
        header: "Court Type",
        accessorKey: "courtType",
      },
    ];

    const statusIndex = conditionalColumns.findIndex((column) => column.id === "status");
    if (statusIndex !== -1) {
      const statusColumn = conditionalColumns.splice(statusIndex, 1)[0];
      conditionalColumns.splice(statusIndex, 0, ...directorColumns);
      conditionalColumns.splice(statusIndex + directorColumns.length, 0, statusColumn);
    } else {
      conditionalColumns.unshift(...directorColumns);
    }
  }

  if (userRole === ROLES.ASSIGNING_MAGISTRATE) {
    const assigningColumns: ColumnDef<IUsersColumn>[] = [
      {
        accessorKey: "districts",
        header: "Districts",
      },
    ];

    const statusIndex = conditionalColumns.findIndex((column) => column.id === "status");
    if (statusIndex !== -1) {
      const statusColumn = conditionalColumns.splice(statusIndex, 1)[0];
      conditionalColumns.splice(statusIndex, 0, ...assigningColumns);
      conditionalColumns.splice(statusIndex + assigningColumns.length, 0, statusColumn);
    } else {
      conditionalColumns.unshift(...assigningColumns);
    }
  }

  return conditionalColumns;
};
