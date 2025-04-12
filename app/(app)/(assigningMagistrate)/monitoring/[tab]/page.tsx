"use client";

import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, unassignedColumns } from "./_components/table-columns";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/admin-file";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { getExcludedStatus, getStatusByTab2 } from "@/lib/utils";
import { CaseTypes } from "@/types/files/case-type";
import Pagination from "@/components/ui/pagination";
import { MonitoringContext } from "@/context/MonitoringContext";
import { useAppSelector } from "@/hooks/redux";

export default function FilteredCases() {
  const params = useParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const tab = params.tab as TCaseFilterType;
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { totalCase, setTotalCase, caseName, setCaseName } = useContext(MonitoringContext);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: user } = useAppSelector((state) => state.profile);

  const baseStatus = {
    status: getStatusByTab2(tab),
    casetype: selectedCase === "all" ? null : selectedCase,
    is_hearing: false,
    request_reassignment: false,
    is_active: false,
    case_name: searchTerm,
    exclude_status: getExcludedStatus(tab),

  };

  const roleBasedStatus: Partial<typeof baseStatus> = (() => {
    if (tab === "reassigned") {
      return { request_reassignment: true, status: [] };
    } else if (tab === "case") {
      return { status: [] };
    }
    else if (tab === "active") {
      return { is_active: true, status: [] };
    }
    else if (tab === "request") {
      return { case_request: true, status: [] };
    }
    else {
      return {};
    }
  })();

  const userRole = user?.role ?? "";
  const status = { ...baseStatus, ...roleBasedStatus };

  const { data, isLoading: draftsLoading, refetch } = useQuery({
    queryKey: ["get_cases", tab, currentPage, selectedCase, searchTerm],
    queryFn: () => getCaseFiles(status, currentPage, DEFAULT_PAGE_SIZE),
    staleTime: 50000,
    refetchInterval: 10000,
  });

  const columns = tab === "unassigned" ? unassignedColumns : mainColumns;

  const handleRowClick = (row: any) => {
    router.push(`/monitoring/view/${encodeURIComponent(row.id)}`);
  };

  useEffect(() => {
    if (data?.total_rows !== undefined) {
      setTotalCase(data.total_rows);
    }
    setCaseName(tab)
  }, [data?.total_rows, setTotalCase, setCaseName, tab]);

  return (
    <div className="space-y-12">
      <CasesDataTableToolbar
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        searchTerm={searchTerm} // ✅ Now correctly passed
        setSearchTerm={setSearchTerm} // ✅ Now correctly passed
      />
      <DataTable onRowClick={handleRowClick} columns={columns} loading={draftsLoading} data={data?.data} />
      {data?.data?.length > 0 && (
        <div className="sticky bottom-0 bg-white py-2">
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              total={data?.total_rows ?? 0}
              rowsPerPage={DEFAULT_PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}