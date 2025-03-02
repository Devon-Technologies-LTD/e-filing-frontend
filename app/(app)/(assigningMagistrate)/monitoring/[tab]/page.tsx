"use client";

import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, unassignedColumns } from "./_components/table-columns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/admin-file";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";
<<<<<<< HEAD
import { getStatusByTab } from "@/lib/utils";
import { CaseTypes } from "@/types/files/case-type";
=======
import { useRouter } from "next/navigation";
>>>>>>> b4677b643514520e09118f64bb28968933b3cd39
import Pagination from "@/components/ui/pagination";

export default function FilteredCases() {
  const params = useParams();
  const router = useRouter();

<<<<<<< HEAD

=======
>>>>>>> b4677b643514520e09118f64bb28968933b3cd39
  const [currentPage, setCurrentPage] = useState(1);
  const tab = params.tab as TCaseFilterType;
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");


<<<<<<< HEAD
=======
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
>>>>>>> b4677b643514520e09118f64bb28968933b3cd39
  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [tab, {
      search: "", currentPage, status: getStatusByTab(tab),
      selectedCase,
    }],
    queryFn: async () =>
      await getCaseFiles({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        status: getStatusByTab(tab),
      }),
    staleTime: 50000,
  });

  const getColumns = () => {
    return tab === "unassigned" ? unassignedColumns : mainColumns;
  };

  const columns = getColumns();
  const handleRowClick = (row: any) => {
<<<<<<< HEAD
    router.push(`/cases/view/${encodeURIComponent(row.id)}`);
=======
    router.push(`view/${encodeURIComponent(row.id)}`);
>>>>>>> b4677b643514520e09118f64bb28968933b3cd39
  };

  return (
    <div className="space-y-12">
<<<<<<< HEAD
      <CasesDataTableToolbar
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
      />
      <DataTable  onRowClick={handleRowClick} columns={columns} loading={draftsLoading} data={data?.data} />
      <div className="flex justify-end">
        <Pagination
=======
      <CasesDataTableToolbar />
      <DataTable
        onRowClick={handleRowClick}
        columns={columns}
        loading={draftsLoading}
        data={data?.data}
      />
      <div className="flex justify-end">
        <Pagination 
>>>>>>> b4677b643514520e09118f64bb28968933b3cd39
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
