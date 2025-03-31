"use client";

import { ICase, TCaseFilterType } from "@/types/case";
import { useParams, useRouter } from "next/navigation";
import { CasesDataTableToolbar } from "./_components/data-table-toolbar";
import { mainColumns, DataTable } from "./_components/table-columns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseFiles } from "@/lib/actions/case-file";
import { CaseStatus, DEFAULT_PAGE_SIZE } from "@/constants";

export default function FilteredCases() {
  const params = useParams();
  const router = useRouter();

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
      return await getCaseFiles(
        {
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
        },
        currentPage,
        DEFAULT_PAGE_SIZE,
      );
    },
    staleTime: 50000,
  });

  const tab = params.tab as TCaseFilterType;
  console.log(tab);

  const getColumns = () => {
    return mainColumns; // Since all cases return mainColumns, we can simplify
  };
  const columns = getColumns();

  const handleRowClick = (caseId: string) => {
    router.push(`/reviews/details/${tab}/${encodeURIComponent(caseId)}`);
  };

  return (
    <div className="space-y-12">
      <CasesDataTableToolbar />
      <DataTable columns={columns} data={data?.data} loading={draftsLoading} onRowClick={handleRowClick} />
    </div>
  );
}
