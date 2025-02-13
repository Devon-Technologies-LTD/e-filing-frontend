"use client";
import {
  mainColumns,
  unassignedColumns,
} from "@/app/(app)/cases/[tab]/_components/table-columns";
import { DataTable } from "@/components/data-table";
import { mockCases } from "@/lib/dummy-data";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as TCaseFilterType;
  const getColumns = () => {
    switch (tab) {
      case "unassigned":
        return unassignedColumns;
      default:
        return mainColumns;
    }
  };
  const columns = getColumns();

  return (
    <div className="space-y-12">
      <CasesDataTableToolbar />
      <DataTable columns={columns} loading={false} data={mockCases} />
    </div>
  );
}
