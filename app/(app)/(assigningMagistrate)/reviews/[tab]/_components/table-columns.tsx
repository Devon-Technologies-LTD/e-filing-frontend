import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICase } from "@/types/case";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableContentLoader from "@/components/table-content-loader";

// Define columns
export const mainColumns: ColumnDef<ICase>[] = [
  {
    accessorKey: "caseId",
    header: "Case (Suit) ID",
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
    accessorKey: "date",
    header: "Date Filed",
  },
  {
    accessorKey: "court",
    header: "MGT. District",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {
        Active: "bg-green-50 text-green-700",
        Pending: "bg-blue-50 text-blue-600",
        Inactive: "bg-red-100 text-red-800",
      };

      return (
        <span className={`px-2 py-1 rounded-md text-sm font-bold ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
          {status}
        </span>
      );
    },
  },
];

interface DataTableProps {
  columns: ColumnDef<ICase>[];
  data: ICase[];
  loading: boolean;
  onRowClick: (caseId: string) => void;
}


export const DataTable: React.FC<DataTableProps> = ({ columns, data, loading, onRowClick }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md">
      {loading ? (
        <TableContentLoader columns={columns} />

      ) : (
        <Table className="space-y-2">
          {/* Table Header */}
          <TableHeader className="bg-zinc-50 h-12">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}
                    className="uppercase font-bold text-sm"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick(row.original.caseId)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onRowClick(row.original.caseId);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-24 text-left font-bold">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
