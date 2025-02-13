"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { ROLES, USER_STATUS } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";
import UserManagementDataTableAction from "./data-table-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export interface IUsersColumn {
  id?: string;
  name: string;
  email: string;
  status: USER_STATUS;
  division?: string;
  districts?: string;
  courtType?: string;
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
        const name = row.original.name;
        const initials = name
          .split(" ")
          .map((part) => part.charAt(0).toUpperCase())
          .join("");
        return (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary-foreground text-black">{initials}</AvatarFallback>
            </Avatar>
            <p>{name}</p>
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
        return (
          <StatusBadge
            tooltip={""}
            tooltipProps={{ delayDuration: 200 }}
            status={row.original.status}
          />
        );
      },
    },
  ];

  let conditionalColumns: ColumnDef<IUsersColumn>[] = [...baseColumns];

  if (userRole === ROLES.DIRECTOR_MAGISTRATES) {
    const directorColumns: ColumnDef<IUsersColumn>[] = [
      {
        header: "Division",
        accessorKey: "division",
      },
      {
        header: "Court Type",
        accessorKey: "courtType",
      },
    ];
    const statusIndex = conditionalColumns.findIndex(
      (column) => column.id === "status"
    );
    // basically moving the new columns to a position before status column
    if (statusIndex !== -1) {
      const statusColumn = conditionalColumns.splice(statusIndex, 1)[0];
      conditionalColumns.splice(statusIndex, 0, ...directorColumns);
      conditionalColumns.splice(
        statusIndex + directorColumns.length,
        0,
        statusColumn
      );
    } else {
      conditionalColumns.unshift(...directorColumns);
    }
  }
  if (userRole === ROLES.ASSIGNING_MAGISTRATES) {
    const directorColumns: ColumnDef<IUsersColumn>[] = [
      {
        accessorKey: "districts",
        header: "Districts",
      },
    ];
    const statusIndex = conditionalColumns.findIndex(
      (column) => column.id === "status"
    );
    // basically moving the new columns to a position before status column
    if (statusIndex !== -1) {
      const statusColumn = conditionalColumns.splice(statusIndex, 1)[0];
      conditionalColumns.splice(statusIndex, 0, ...directorColumns);
      conditionalColumns.splice(
        statusIndex + directorColumns.length,
        0,
        statusColumn
      );
    } else {
      conditionalColumns.unshift(...directorColumns);
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
