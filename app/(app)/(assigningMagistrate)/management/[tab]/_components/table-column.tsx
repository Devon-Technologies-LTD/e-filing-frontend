"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { ROLES } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";
import UserManagementDataTableAction from "./data-table-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface IUsersColumn {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  role: ROLES;
  status: string;
  court_division: string;
  districts?: string;
  court_type: string;
  created_at?: Date | undefined;
}

export const createUserColumns = (
  userRole: ROLES,
  type?: "pending" | "all"
): ColumnDef<IUsersColumn>[] => {
  const baseColumns: ColumnDef<IUsersColumn>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => {
        const firstName = row.original.first_name || "";
        const lastName = row.original.last_name || "";

        // Ensure initials are safely extracted
        const initials = firstName
          ? firstName
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase())
            .join("")
          : "";

        const initials2 = lastName
          ? lastName
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase())
            .join("")
          : "";

        return (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary-foreground text-black">
                {initials}{initials2}
              </AvatarFallback>
            </Avatar>
            <p>{firstName} {lastName}</p>
          </div>
        );
      },
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status ? row.original.status?.toLowerCase() : "N/A"

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
        accessorKey: "court_type",
      },
    ];

    const statusIndex = conditionalColumns.findIndex(
      (column) => column.id === "status"
    );

    // Move the new columns before the "status" column
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
        accessorKey: "court_division",
        header: "Districts",
      },
    ];

    const statusIndex = conditionalColumns.findIndex(
      (column) => column.id === "status"
    );

    // Move the new columns before the "status" column
    if (statusIndex !== -1) {
      const statusColumn = conditionalColumns.splice(statusIndex, 1)[0];
      conditionalColumns.splice(statusIndex, 0, ...assigningColumns);
      conditionalColumns.splice(statusIndex + assigningColumns.length, 0, statusColumn);
    } else {
      conditionalColumns.unshift(...assigningColumns);
    }
  }

  if (type !== "pending") {
    conditionalColumns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return <UserManagementDataTableAction row={row} />;
      },
    });
  }

  return conditionalColumns;
};
