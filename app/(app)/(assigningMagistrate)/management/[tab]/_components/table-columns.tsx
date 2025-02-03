import { ICase } from "@/types/case";
import { ColumnDef } from "@tanstack/react-table";

export const mainColumns: ColumnDef<ICase>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "districts",
    header: "Districts",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "action",
    header: "ACTIONS",
  },
];


export const unassignedColumns: ColumnDef<ICase>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "districts",
    header: "Districts",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "action",
    header: "ACTIONS",
  },
];