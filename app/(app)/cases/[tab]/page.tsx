"use client";
import {
  MainColumns,
  UnassignedColumns,
  UnderReviewColumns,
} from "@/app/(app)/cases/[tab]/_components/table-columns";
import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import Pagination from "@/components/ui/pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/case-file";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { getStatusByTab } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CaseTypes } from "@/types/files/case-type";
import { useAppSelector } from "@//hooks/redux";
import { ROLES } from "@/types/auth";

export default function FilteredCases() {
  const params = useParams();
  const tab = params.tab as TCaseFilterType;
  const router = useRouter();
  const [selectedCase, setSelectedCase] = useState<CaseTypes | "all">("all");
  const { data: user } = useAppSelector((state) => state.profile);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [
      "get_cases",
      {
        search: "",
        currentPage,
        status: getStatusByTab(tab),
        selectedCase,
      },
    ],
    queryFn: async () => {
      return await getCaseFiles({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        assignee_id: user?.id,
        status: getStatusByTab(tab),
        casetype: selectedCase === "all" ? null : selectedCase,
        role: user?.role,
      });
    },
    staleTime: 50000,
    refetchInterval: 10000,
  });
  const getColumns = () => {
    switch (tab) {
      case "unassigned":
        return UnassignedColumns;
      case "under-review":
      case "approved-review":
      case "denied-review":
        return UnderReviewColumns;
      default:
        return MainColumns;
    }
  };
  const columns = getColumns();
  const handleRowClick = (row: any) => {
    if (user?.role === ROLES.CENTRAL_REGISTRAR) {
      router.push(`/cases/reviews/${encodeURIComponent(row.id)}`);
    } else {
      router.push(`/cases/view/${encodeURIComponent(row.id)}`);
    }
  };
  return (
    <div className="container flex flex-col py-2 h-full">
      <div className="bg-white overflow-auto p-4 space-y-6 max-h-[calc(100vh-220px)]">
        <CasesDataTableToolbar
          selectedCase={selectedCase}
          setSelectedCase={setSelectedCase}
        />
        <DataTable
          onRowClick={handleRowClick}
          columns={columns}
          loading={draftsLoading}
          data={data?.data}
        />
      </div>
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
