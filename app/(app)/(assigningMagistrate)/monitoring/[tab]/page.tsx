"use client";

import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, unassignedColumns } from "./_components/table-columns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/admin-file";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";

export default function FilteredCases() {
  const params = useParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const tab = params.tab as TCaseFilterType;

  let TYPE: CaseStatus[] = [];

  if (tab === "unassigned") {
    TYPE = [CaseStatus.ToBeAssigned, CaseStatus.UnderReview];
  } else if (tab === "active") {
    TYPE = [CaseStatus.Assigned];
  } else if (tab === "concluded") {
    TYPE = [CaseStatus.StruckOut];
  } else if (tab === "case") {
    TYPE = [
      CaseStatus.Approved,
      CaseStatus.Assigned,
      CaseStatus.Denied,
      CaseStatus.JudgementDelivered,
      CaseStatus.Pending,
      CaseStatus.StruckOut,
      CaseStatus.ToBeAssigned,
      CaseStatus.UnderReview,
    ];
  } else {
    TYPE = [tab as CaseStatus];
  }
  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [tab, { search: "", currentPage }],
    queryFn: async () =>
      await getCaseFiles({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        status: TYPE,
      }),
    staleTime: 50000,
  });

  const getColumns = () => {
    return tab === "unassigned" ? unassignedColumns : mainColumns;
  };

  const columns = getColumns();
  const handleRowClick = (row: any) => {
    router.push(`view/${encodeURIComponent(row.id)}`);
  };

  return (
    <div className="space-y-12">
      <CasesDataTableToolbar />
      <DataTable
        onRowClick={handleRowClick}
        columns={columns}
        loading={draftsLoading}
        data={data?.data}
      />
      <div className="flex justify-end">
        <Pagination 
          currentPage={currentPage}
          total={data?.total_rows ?? 0}
          rowsPerPage={DEFAULT_PAGE_SIZE}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
}
