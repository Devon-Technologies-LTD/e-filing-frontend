import { ColumnDef } from "@tanstack/react-table";

export interface IDraftsColumn {
  lastEdit: string;
  title: string;
  type: string;
}


export const draftsColumns: ColumnDef<IDraftsColumn>[] = [
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
];
