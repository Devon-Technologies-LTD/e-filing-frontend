"use client";

import { ICase, TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, DataTable } from "./_components/table-columns";
import { mockCases } from "@/lib/dummy-data";

export default function FilteredCases() {
  const params = useParams();
  const router = useRouter();

  const tab = params.tab as TCaseFilterType;
  console.log(tab);

  const getColumns = () => {
    return mainColumns; // Since all cases return mainColumns, we can simplify
  };
  const columns = getColumns();

  const handleRowClick = (caseId: string) => {
    router.push(`/reviews/details/${tab}/${encodeURIComponent(caseId)}`);
  };

  return (
    <div className="space-y-12">
      <CasesDataTableToolbar />
      <DataTable columns={columns} data={mockCases} loading={false} onRowClick={handleRowClick} />
    </div>
  );
}
