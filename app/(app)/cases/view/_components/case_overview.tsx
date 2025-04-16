"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClaimantInfo } from "./claimant-info";
import { MagistrateCourtInfo } from "./magistrate-court-info";
import { CaseTypeInfo } from "./case-type-info";
import { dateFormatter } from "@/lib/utils";
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
import CostAssessment from "@/components/case-filing/cost-assessment";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { CostBreakdown } from "../../reviews/components/cost-breakdown";
import { getCostAssesment } from "@/lib/actions/case-file";

interface CaseOverviewProps {
  id: string;
  caseNumber: string;
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
  console.log("dataaa", data);
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutation: { mutate: saveForm, isPending: formPending },
  } = useSaveForm({
    step: 2,
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
        case_type: data?.case_type_name,
        sub_case_type: data?.sub_case_type_name,
        case_file_id: data?.id,
        case_type_id: data?.casetype?.id,
        // defendant_address: formData.address,
        // defendant_email_address: formData.email,
        // defendant_name: formData.name,
        // defendant_phone_number: formData.phone,
        ...data,
        claimant: data?.casetype.claimant,
        defendant: [
          {
            address: formData?.address,
            email_address: formData?.email,
            first_name: formData?.firstname,
            last_name: formData?.lastname,
            // :formData?.lastname,
          },
        ],
      },
    });
  };
  const defendant = data?.defendant?.[0];
  const claimant = data?.claimant?.[0];
  const defName =
    `${defendant?.last_name || ""} ${defendant?.middle_name || ""} ${
      defendant?.first_name || ""
    }`.trim() || "N/A";
  const claimName =
    `${claimant?.last_name || ""} ${claimant?.middle_name || ""} ${
      claimant?.first_name || ""
    }`.trim() || "N/A";

  const defEmail = defendant?.email_address || "N/A";
  const claimEmail = claimant?.email_address || "N/A";
  const defAddress = defendant?.address || "N/A";
  const claimAddress = claimant?.address || "N/A";
  const defPhone = defendant?.phone_number || "N/A";
  const claimPhone = claimant?.phone_number || "N/A";
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
