"use client";
import { DataTable } from "@/components/data-table";
import React, { useEffect, useState } from "react";
import { DraftsDataTableToolbar } from "./_components/data-table-toolbar";
import { DraftsColumns } from "./_components/table-columns";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles, getCaseFilesById } from "@/lib/actions/case-file";
import { DateRange } from "react-day-picker";
import { dateFormatter, getCaseTypeFields } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";
import {
  addDocument,
  updateLegalCounsels,
  updateMultipleCaseTypeFields,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (row: any) => {
    setSelectedRow(row.id);
  };
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: [
      "get_case_drafts",
      {
        startDate: date?.from,
        endDate: date?.to,
        search: "",
        currentPage,
      },
    ],
    queryFn: async () => {
      return await getCaseFiles({
        page: currentPage,
        size: DEFAULT_PAGE_SIZE,
        status: [CaseStatus.Draft],
        start_date: date?.from
          ? dateFormatter(date?.from as Date).isoFormat
          : null,
        end_date: date?.to ? dateFormatter(date?.to as Date).isoFormat : null,
      });
    },
    staleTime: 50000,
    refetchInterval: 10000,
  });

  const {
    data: singleDraftData,
    isLoading: singleDraftsLoading,
    isError: singleDraftError,
  } = useQuery({
    queryKey: ["get_case_draft_by_id"],
    queryFn: async () => {
      if (!selectedRow) return Promise.reject("No selected row"); // Prevent API call
      return await getCaseFilesById(selectedRow);
    },
    enabled: !!selectedRow,
  });

  useEffect(() => {
    if (singleDraftError) {
      toast.error("Unable to fetch draft details");
    }
  }, [singleDraftError]);

  useEffect(() => {
    if (singleDraftData && selectedRow) {
      const caseTypeFields = getCaseTypeFields(singleDraftData);
      dispatch(updateMultipleCaseTypeFields({ fields: caseTypeFields }));
      dispatch(
        updateLegalCounsels(
          singleDraftData?.casetype?.length > 0
            ? singleDraftData?.casetype[0]?.legal_counsels
            : []
        )
      );
      dispatch(addDocument(singleDraftData.documents));
      setSelectedRow(null);
      router.push(`/case-filing`);
    }
  }, [singleDraftData, dispatch]);

  return (
    <div className="container flex flex-col py-2 h-full">
      <div className="bg-white overflow-auto p-4 space-y-6 max-h-[calc(100vh-220px)]">
        <DraftsDataTableToolbar date={date} setDate={setDate} />
        <DataTable
          onRowClick={handleRowClick}
          columns={DraftsColumns}
          loading={draftsLoading || singleDraftsLoading}
          data={data?.data}
        />
      </div>
      <div className=" fixed bottom-0 container left-0 right-0 py-1.5">
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
    </div>
  );
}
