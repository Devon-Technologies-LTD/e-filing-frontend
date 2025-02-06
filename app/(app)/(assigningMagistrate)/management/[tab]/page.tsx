"use client";

import { DataTable } from "@/components/data-table";
import { management } from "@/lib/dummy-data";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, unassignedColumns } from "./_components/table-columns";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as TCaseFilterType;
  const getColumns = () => {
    switch (tab) {
      case "all":
        return unassignedColumns;
      default:
        return mainColumns;
    }
  };
  const columns = getColumns();
  return (
    <div className="space-y-8">
      <CasesDataTableToolbar columns={columns} tab={tab} />
      <DataTable columns={columns} loading={false} data={management} />
    </div>
  );
}
