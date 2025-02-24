"use client";
import {
  mainColumns,
  unassignedColumns,
} from "@/app/(app)/cases/[tab]/_components/table-columns";
import { DataTable } from "@/components/data-table";
import { TCaseFilterType } from "@/types/case";
import { useParams } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import Pagination from "@/components/ui/pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/case-file";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";

export default function FilteredCases() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [
      "get_cases",
      {
        search: "",
        currentPage,
      },
    ],
    queryFn: async () => {
      return await getCaseFiles({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        status: [
          CaseStatus.Approved,
          CaseStatus.Assigned,
          CaseStatus.Denied,
          CaseStatus.JudgementDelivered,
          CaseStatus.Pending,
          CaseStatus.StruckOut,
          CaseStatus.ToBeAssigned,
          CaseStatus.UnderReview,
        ],
        // start_data: date?.from
        //   ? dateFormatter(date?.from as Date).isoFormat
        //   : null,
        // end_date: date?.to ? dateFormatter(date?.to as Date).isoFormat : null,
      });
    },
    staleTime: 50000,
  });
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
      <DataTable columns={columns} loading={draftsLoading} data={data?.data} />
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

