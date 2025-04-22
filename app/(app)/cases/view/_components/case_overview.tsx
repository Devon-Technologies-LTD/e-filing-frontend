"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClaimantInfo } from "./claimant-info";
import { MagistrateCourtInfo } from "./magistrate-court-info";
import { CaseTypeInfo } from "./case-type-info";
import { dateFormatter, generateCaseTitle } from "@/lib/utils";
import { Claimant, useSaveForm } from "@/components/case-filing/hooks";
import {
  ICaseTypes,
  IDocumentFileType,
} from "@/redux/slices/case-filing-slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { CostBreakdown } from "../../reviews/components/cost-breakdown";
interface CaseOverviewProps {
  id: string;
  caseNumber: string;
  court_division: string;
  case_type_name: string;
  sub_case_type_name: string;
  title: string;
  created_at: string;
  claimant: Claimant[];
  defendant: Claimant[];
  division_name: string;
  casetype: Partial<ICaseTypes> & {
    id: string;
    sub_case_type_name: string;
    case_type_name: string;
  };
  documents: IDocumentFileType[];
}

interface IProps {
  data: CaseOverviewProps;
  costBreakdown: any[];
}

export function CaseOverview({ data, costBreakdown }: IProps) {
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutation: { mutate: saveForm, isPending: formPending },
  } = useSaveForm({
    step: 1,
    isDraft: false,
    onSuccess: () => {
      setIsEdit(false);
      toast.success("Defendant Information updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["get_single_case_by_id"],
      });
    },
  });
  const handleSubmit = (formData: any) => {
    saveForm({
      data: {
        claimant: data.claimant,
        defendant: formData,
        court_division: data.court_division,
        title: generateCaseTitle(data.claimant, formData),
      },
      case_file_id: data?.id,
    });
  };

  const defendant = data?.defendant;
  const claimant = data?.claimant;

  // For defendant names
  const defName = defendant
    ? defendant
        .map(
          (d, index) =>
            `${index + 1}: ${d?.last_name || ""} ${d?.middle_name || ""} ${
              d?.first_name || ""
            }`
        )
        .join("\n") // Line break after each entry
    : "N/A";

  // For claimant names
  const claimName = claimant
    ? claimant
        .map(
          (c, index) =>
            `${index + 1}: ${c?.last_name || ""} ${c?.middle_name || ""} ${
              c?.first_name || ""
            }`
        )
        .join("\n") // Line break after each entry
    : "N/A";

  // For defendant emails
  const defEmail = defendant
    ? defendant
        .map((d, index) => `${index + 1}: ${d?.email_address || "N/A"}`)
        .join("\n") // Line break after each entry
    : "N/A";

  // For claimant emails
  const claimEmail = claimant
    ? claimant
        .map((c, index) => `${index + 1}: ${c?.email_address || "N/A"}`)
        .join("\n") // Line break after each entry
    : "N/A";

  // For defendant addresses
  const defAddress = defendant
    ? defendant
        .map((d, index) => `${index + 1}: ${d?.address || "N/A"}`)
        .join("\n") // Line break after each entry
    : "N/A";

  // For claimant addresses
  const claimAddress = claimant
    ? claimant
        .map((c, index) => `${index + 1}: ${c?.address || "N/A"}`)
        .join("\n") // Line break after each entry
    : "N/A";

  // For defendant phone numbers
  const defPhone = defendant
    ? defendant
        .map((d, index) => `${index + 1}: ${d?.phone_number || "N/A"}`)
        .join("\n") // Line break after each entry
    : "N/A";

  // For claimant phone numbers
  const claimPhone = claimant
    ? claimant
        .map((c, index) => `${index + 1}: ${c?.phone_number || "N/A"}`)
        .join("\n") // Line break after each entry
    : "N/A";

  return (
    <div className="space-y-6">
      {/* Case Header */}
      <div className="space-y-1 p-4 flex justify-between items-center">
        <div className="max-w-lg">
          <h1 className="text-base font-bold text-black overflow-hidden truncate">
            <Tooltip>
              <TooltipTrigger className=" w-full">
                <span className="truncate">{data?.title}</span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="text-primary break-all font-bold bg-white border-0 text-sm"
              >
                <div className="max-w-lg whitespace-normal break-words">
                  {data.title}
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          <div className="flex items-center justify-between text-sm font-medium">
            <span>{data?.caseNumber ?? ""}</span>
          </div>
        </div>
        <span className="font-medium">
          Filed on:{" "}
          <span className="font-bold text-base">
            {dateFormatter(data?.created_at).fullDate}
          </span>
        </span>
      </div>
      <ScrollArea className="max-h-[calc(100dvh-300px)] overflow-y-auto rounded-md px-4">
        {/* Claimant Information */}
        <div className="space-y-6">
          <ClaimantInfo
            name={claimName}
            email={claimEmail}
            address={claimAddress}
            phone={claimPhone}
          />
          <ClaimantInfo
            type="defendant"
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onSubmit={handleSubmit}
            loading={formPending}
            name={defName}
            email={defEmail}
            address={defAddress}
            phone={defPhone}
            defendant={defendant}
          />
          {/* Magistrate Court Information */}
          <MagistrateCourtInfo
            division={data?.division_name ?? ""}
            district="----"
            magistrate="----"
          />{" "}
          <CaseTypeInfo
            kind={data?.casetype?.sub_case_type_name || "----"}
            type={data?.casetype?.case_type_name || "----"}
            worth={data?.casetype?.recovery_amount || "----"}
          />
          <CostBreakdown data={data} costBreakdown={costBreakdown} />
        </div>
      </ScrollArea>
    </div>
  );
}
