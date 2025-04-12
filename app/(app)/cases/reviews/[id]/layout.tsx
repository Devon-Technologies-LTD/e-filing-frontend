"use client";
import React from "react";
import { SideNav } from "../components/side-nav";
import { useQuery } from "@tanstack/react-query";
import {
  getAdminCaseFilesById,
  getCostAssesment,
} from "@/lib/actions/case-file";
import CaseDocumentListSkeleton from "../../view/_components/view-document-skeleton";
import { ReviewActions } from "../components/review-actions";
import { StatusBadge } from "@/components/ui/status-badge";
import { CaseStatus, CriminalCaseSubType } from "@/constants";
import { Icons } from "@/components/svg/icons";
import { CaseFileContext } from "../components/case-file-context";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["get_single_case_by_id", params.id],
    queryFn: () => getAdminCaseFilesById(params.id),
    enabled: !!params.id,
  });
  const { data: costBreakdown, isLoading: breakdownLoading } = useQuery({
    queryKey: ["cost_breakdown", params.id],
    queryFn: () => getCostAssesment(params.id),
    enabled: !!params.id,
  });

  if (isLoading || breakdownLoading) {
    return <CaseDocumentListSkeleton />;
  }
  return (
    <CaseFileContext.Provider value={{ data }}>
      <section className="h-full flex flex-col">
        <div className="container py-3 ">
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold text-gray-600">
              CASE REVIEWS/{data?.case_suit_number}
            </div>
            {data.sub_case_type_name ===
            CriminalCaseSubType.REQUEST_FOR_REMAND_ORDER ? (
              <StatusBadge
                tooltip=""
                tooltipProps={{ delayDuration: 200 }}
                status={CaseStatus.ActionRequired}
                className={`px-2 py-1 flex gap-1 items-center rounded-md`}
              >
                Action Required <Icons.alert />
              </StatusBadge>
            ) : (
              <StatusBadge
                tooltip=""
                tooltipProps={{ delayDuration: 200 }}
                status={data.status as any}
                className={`px-2 py-1 rounded-md`}
              >
                {data.status}
              </StatusBadge>
            )}
          </div>
        </div>

        <div className="md:grid md:grid-cols-[minmax(220px,_4fr)_minmax(0,_8fr)] md:gap-6 lg:grid-cols-[minmax(240px,_4fr)_minmax(0,_8fr)] lg:gap-10 container flex-1 min-h-0">
          <aside className="fixed top-14 z-30 hidden w-full shrink-0 md:sticky md:block">
            <div className="no-scrollbar h-full overflow-auto pr-4">
              <SideNav data={data} costBreakdown={costBreakdown?.data} />
            </div>
          </aside>
          <main className="overflow-auto">{children}</main>
        </div>
        <div className="sticky bg-white shadow-inner bottom-0 w-full z-50">
          <ReviewActions data={data} />
        </div>
      </section>
    </CaseFileContext.Provider>
  );
}
