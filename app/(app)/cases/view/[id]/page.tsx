/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { SingleCaseHeader } from "../_components/single-case-header";
import { CaseOverview } from "../_components/case_overview";
import { CaseUpdates } from "../_components/case-updates";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { DocumentUpdates } from "../_components/document_updates";
import { CaseDocumentList } from "../_components/case_documents";
import { useQuery } from "@tanstack/react-query";
import {
  getAdminCaseFilesById,
  getCaseFilesById,
  getCostAssesment,
  getDecision,
} from "@/lib/actions/case-file";
import { ROLES } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { getCaseTypeFields } from "@/lib/utils";
import {
  addDocument,
  clearForm,
  updateMultipleCaseTypeFields,
  updateStep,
} from "@/redux/slices/case-filing-slice";
import { useDispatch } from "react-redux";
import CaseDocumentListSkeleton from "../_components/view-document-skeleton";
import { CaseDecisionList } from "../_components/case_decision";

export default function SingleCasePage({ params }: { params: { id: string } }) {
  const { data: user } = useAppSelector((state) => state.profile);
  const navigate = useRouter();
  const dispatch = useDispatch();

  const tabs: { id: any; label: string }[] = [
    { id: "overview", label: "Case Overview" },
    { id: "documents", label: "Documents" },
    { id: "decisions", label: "Decisions" },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get_single_case_by_id", { id: params.id }],
    queryFn: async () => {
      if (
        [
          ROLES.DIRECTOR_MAGISTRATE,
          ROLES.ASSIGNING_MAGISTRATE,
          ROLES.PRESIDING_MAGISTRATE,
          ROLES.CHIEF_JUDGE,
          ROLES.CENTRAL_REGISTRAR,
        ].includes(user?.role as ROLES)
      ) {
        return await getAdminCaseFilesById(params.id);
      } else {
        return await getCaseFilesById(params.id);
      }
    },
    enabled: !!params.id,
  });
  const { data: costBreakdown, isLoading: breakdownLoading } = useQuery({
    queryKey: ["cost_breakdown", params.id],
    queryFn: () => getCostAssesment(params.id),
    enabled: !!params.id,
  });
  const { data: decision, isLoading: decisionLoading } = useQuery({
    queryKey: ["decision", params.id],
    queryFn: () => getDecision(params.id),
    enabled: !!params.id,
  });

  const handleRefileProcesses = () => {
    const caseTypeFields = getCaseTypeFields(data);
    dispatch(clearForm());
    dispatch(updateStep(3));
    dispatch(updateMultipleCaseTypeFields({ fields: caseTypeFields }));
    dispatch(addDocument([]));
    navigate.push(`${params?.id}/refile-documents`);
  };

  if (isLoading || breakdownLoading || decisionLoading) {
    return <CaseDocumentListSkeleton />;
  }
  return (
    <div className="bg-zinc-100 h-full overflow-auto">
      <SingleCaseHeader data={data} params={params} />
      <div className=" bg-white shadow-md">
        <div className="container  flex justify-between items-center pt-2">
          <ReusableTabs
            tablistClassName="border-0"
            tabs={tabs}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
        </div>
      </div>
      <section className="py-4">
        {activeTab === "overview" && (
          <div className="container py-4 grid grid-cols-12 gap-5">
            <div className="col-span-7 bg-white p-2">
              <CaseOverview costBreakdown={costBreakdown?.data} data={data} />
            </div>
            <div className="col-span-5 bg-white p-2">
              <CaseUpdates id={data.id} />
            </div>
          </div>
        )}
        
        {activeTab === "documents" && (
          <div className="container py-4 grid grid-cols-12 gap-5">
            <div className="col-span-7 bg-white p-2">
              <CaseDocumentList data={data} />
            </div>
            <div className="col-span-5 bg-white p-2">
              <DocumentUpdates id={params.id} />
            </div>
          </div>
        )}

        {activeTab === "decisions" && (
          <div className="container py-4 grid grid-cols-12 gap-5">
            <div className="col-span-7 bg-white p-2">
              <CaseDecisionList data={decision?.data.data} />
            </div>
            <div className="col-span-5 bg-white p-2">
              <DocumentUpdates id={params.id} />
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
