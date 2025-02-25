import { ICase } from "@/types/case";
import { ColumnDef } from "@tanstack/react-table";

export const mainColumns: ColumnDef<ICase>[] = [
  {
    accessorKey: "filingDate",
    header: "Filing Date",
  },
  {
    accessorKey: "case_suit_number",
    header: "Case Suit (ID)",
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
    accessorKey: "court",
    header: "MGT. DIVISION/COURT",
  },
  {
    accessorKey: "magistrate",
    header: "PRESIDING MAGISTRATE",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];


export const unassignedColumns: ColumnDef<ICase>[] = [
  {
    accessorKey: "filingDate",
    header: "Filing Date",
  },
  {
    accessorKey: "case_suit_number",
    header: "Case Suit (ID)",
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
    accessorKey: "court",
    header: "MGT. DIVISION/COURT",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];