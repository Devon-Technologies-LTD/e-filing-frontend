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
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";

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
      return await getCaseFiles(
        {
          page: currentPage,
          size: DEFAULT_PAGE_SIZE,
          status: getStatusByTab(tab),
          casetype: selectedCase === "all" ? null : selectedCase,
        },
        [
          ROLES.CHIEF_JUDGE,
          ROLES.CENTRAL_REGISTRAR,
          ROLES.ASSIGNING_MAGISTRATE,
          ROLES.CHIEF_JUDGE,
          ROLES.PRESIDING_MAGISTRATE,
          ROLES.DIRECTOR_MAGISTRATE,
        ].includes(user?.role as ROLES)
      );
    },
    staleTime: 50000,
  });

  console.log("first", data);
  const getColumns = () => {
    switch (tab) {
      case "unassigned":
        return UnassignedColumns;
      case "under-review":
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
    <div className="space-y-12">
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
      {data?.data?.length > 0 && (
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
      )}
    </div>
  );
}
