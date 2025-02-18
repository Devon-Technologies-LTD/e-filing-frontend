"use client";

// import { DataTable } from "@/components/data-table";
// import { mockCases } from "@/lib/dummy-data";
import { ICase, TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, DataTable } from "./_components/table-columns";
import { mockCases } from "@/lib/dummy-data";


export default function FilteredCases() {
  const params = useParams();
  const router = useRouter();

  const tab = params.tab as TCaseFilterType;
  const getColumns = () => {
    return mainColumns;
  };
  const columns = getColumns();

  const handleRowClick = (caseId: string) => {
    router.push(`/reviews/details/under-review/${encodeURIComponent(caseId)}`);
  };


  return (
    <div className="space-y-12">
      <CasesDataTableToolbar />
      {/* <DataTable columns={columns} loading={false} data={mockCases} /> */}
      <DataTable
        columns={columns}
        data={mockCases}
        loading={false}
        onRowClick={handleRowClick}
      />
    </div>
  );
}




