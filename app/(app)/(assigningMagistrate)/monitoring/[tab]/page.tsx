"use client";

import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, unassignedColumns } from "./_components/table-columns";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/admin-file";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";
import { getStatusByTab } from "@/lib/utils";
import { CaseTypes } from "@/types/files/case-type";
import Pagination from "@/components/ui/pagination";
import { MonitoringContext } from "@/context/MonitoringContext";

export default function FilteredCases() {
  const params = useParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const tab = params.tab as TCaseFilterType;
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { totalCase, setTotalCase } = useContext(MonitoringContext); // Use the context properly

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [tab, {
      search: "", currentPage, status: getStatusByTab(tab),
      selectedCase,
    }],
    queryFn: async () =>
      await getCaseFiles({
        page: currentPage,
        casetype:"FAMILY",
        size: DEFAULT_PAGE_SIZE,
        // casetype: selectedCase === "all" ? null : selectedCase,
        status: getStatusByTab(tab),
      }),
    staleTime: 50000,
  });

  const getColumns = () => {
    return tab === "unassigned" ? unassignedColumns : mainColumns;
  };

  const columns = getColumns();
  const handleRowClick = (row: any) => {
    router.push(`/monitoring/view/${encodeURIComponent(row.id)}`);
  };

  useEffect(() => {
    if (data?.total_rows !== undefined) {
      setTotalCase(data.total_rows);
    }
  }, [data, setTotalCase]);

  return (
    <div className="space-y-12">
      <CasesDataTableToolbar
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <DataTable onRowClick={handleRowClick} columns={columns} loading={draftsLoading} data={data?.data} />

      {data?.data?.length > 0 && (
        <div className="fixed bottom-0 container left-0 right-0 py-2">
          <div className="flex justify-center">
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
      )}
    </div>
  );
}
