/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { SingleCaseHeader } from "../_components/single-case-header";
import { CaseOverview } from "../_components/case_overview";
import { CaseUpdates } from "../_components/case-updates";
import { demoData } from "@/lib/dummy-data";
import ReusableTabs from "@/components/ui/reusable-tabs";
import { Icons } from "@/components/svg/icons";
import { DocumentUpdates } from "../_components/document_updates";
import { CaseDocumentList } from "../_components/case_documents";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { getCaseFilesById } from "@/lib/actions/case-file";

export default function SingleCasePage({ params }: { params: { id: string } }) {
  const tabs: { id: any; label: string }[] = [
    { id: "overview", label: "Case Overview" },
    { id: "documents", label: "Documents" },
    { id: "decisions", label: "Decisions" },
  ];
  const [activeTab, setActiveTab] = useState("overview");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get_single_case_by_id"],
    queryFn: async () => {
      return await getCaseFilesById(params.id);
    },
    enabled: !!params.id,
  });

  console.log("get single data by id", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-zinc-100 ">
      <SingleCaseHeader data={data} params={params} />
      <div className=" bg-white shadow-xl">
        <div className="container  flex justify-between items-center pt-2">
          <ReusableTabs
            tablistClassName="border-0"
            tabs={tabs}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
          <DropdownMenu>
            <DropdownMenuTrigger className=" ">
              <Tooltip>
                <TooltipTrigger>
                  <Icons.settings />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-zinc-700 bg-white border-0 font-medium text-xs"
                >
                  More Actions
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
              <DropdownMenuItem variant="outline" className="uppercase text-xs">
                Refile other process{" "}
              </DropdownMenuItem>
              <DropdownMenuItem variant="outline" className="uppercase text-xs">
                Request Correction{" "}
              </DropdownMenuItem>{" "}
              <DropdownMenuItem variant="outline" className="uppercase text-xs">
                Withdraw case
              </DropdownMenuItem>{" "}
              <DropdownMenuItem variant="outline" className="uppercase text-xs">
                contact support{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {activeTab === "overview" && (
        <div className="container py-4 grid grid-cols-12 gap-5">
          <div className="col-span-7 bg-white p-2">
            <CaseOverview data={data} />
          </div>{" "}
          <div className="col-span-5 bg-white p-2">
            <CaseUpdates />
          </div>
        </div>
      )}{" "}
      {activeTab === "documents" && (
        <div className="container py-4 grid grid-cols-12 gap-5">
          <div className="col-span-7 bg-white p-2">
            <CaseDocumentList />
          </div>{" "}
          <div className="col-span-5 bg-white p-2">
            <DocumentUpdates />
          </div>
        </div>
      )}
      {activeTab === "decisions" && (
        <div className="container py-4 grid grid-cols-12 gap-5">
          <div className="col-span-7 bg-white p-2">
            <CaseDocumentList />
          </div>{" "}
          <div className="col-span-5 bg-white p-2">
            <DocumentUpdates />
          </div>
        </div>
      )}
    </div>
  );
}
