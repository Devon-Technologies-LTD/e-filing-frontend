"use client";

import { ColumnDef } from "@tanstack/react-table";
import DraftTableActionCell from "./action-cell";

export interface IDraftsColumn {
  id: string;
  lastEdit: string;
  title: string;
  type: string;
}

export const DraftsColumns: ColumnDef<IDraftsColumn>[] = [
  {
    accessorKey: "lastEdit",
    header: "Last Edited",
  },
  {
    accessorKey: "title",
    header: "Case Title",
  },
  {
    accessorKey: "type",
    header: "Case Type",
  },
  {
    accessorKey: "",
    header: "Action",
    cell: ({ row }) => <DraftTableActionCell row={row} />,
  },
];
