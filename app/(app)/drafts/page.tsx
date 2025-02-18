"use client";
import { DataTable } from "@/components/data-table";
import React, { useState } from "react";
import { DraftsDataTableToolbar } from "./_components/data-table-toolbar";
import { DraftsColumns } from "./_components/table-columns";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/case-file";
import { DateRange } from "react-day-picker";
import { dateFormatter } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

export default function Page() {
  const router = useRouter();
  const handleRowClick = (row: any) => {
    console.log("first", row);
    router.push(`/case-filing/drafts/${row?.id}`);
  };
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [
      "get_case_drafts",
      {
        startDate: date?.from,
        endDate: date?.to,
        search: "",
        currentPage
      },
    ],
    queryFn: async () => {
      return await getCaseFiles({
        start_data: date?.from
          ? dateFormatter(date?.from as Date).isoFormat
          : null,
        end_date: date?.to ? dateFormatter(date?.to as Date).isoFormat : null,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 50000,
  });

  return (
    <div className="container py-8">
      <div className="bg-white p-4 space-y-6">
        <DraftsDataTableToolbar date={date} setDate={setDate} />
        <DataTable
          onRowClick={handleRowClick}
          columns={DraftsColumns}
          loading={draftsLoading}
          data={data?.data}
        />
        <Pagination
          currentPage={currentPage}
          total={data?.total_rows ?? 0}
          rowsPerPage={rowsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
}
