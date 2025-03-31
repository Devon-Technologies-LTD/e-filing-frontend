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

interface CaseOverviewProps {
  id: string;
  caseNumber: string;
  case_type_name: string;
  title: string;
  created_at: string;
  claimant: Claimant;
  defendant: Claimant;
  division_name: string;
  casetype: (Partial<ICaseTypes> & {
    sub_case_type_name: string;
    case_type_name: string;
  })[];
  documents: IDocumentFileType[];
}

interface IProps {
  data: CaseOverviewProps;
}

export function CaseOverview({ data }: IProps) {
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
        case_file_id: data?.id,
        defendant_address: formData.address,
        defendant_email_address: formData.email,
        defendant_name: formData.name,
        defendant_phone_number: formData.phone,
      },
    });
  };
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
            name={data?.claimant?.name ?? ""}
            email={data?.claimant?.email_address ?? ""}
            address={data?.claimant?.address ?? ""}
            phone={data?.claimant?.phone_number ?? ""}
          />
          <ClaimantInfo
            type="defendant"
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onSubmit={handleSubmit}
            loading={formPending}
            name={data?.defendant?.name ?? ""}
            email={data?.defendant?.email_address ?? ""}
            address={data?.defendant?.address ?? ""}
            phone={data?.defendant?.phone_number ?? ""}
          />
          {/* Magistrate Court Information */}
          <MagistrateCourtInfo
            division={data?.division_name ?? ""}
            district="----"
            magistrate="----"
          />{" "}
          {data?.casetype?.length > 0 && (
            <CaseTypeInfo
              kind={data?.casetype[0]?.sub_case_type_name || "----"}
              type={data?.casetype[0]?.case_type_name || "----"}
              worth={data?.casetype[0]?.recovery_amount || "----"}
            />
          )}
          <CostAssessment
            sub_case_type={
              data?.casetype?.length > 0
                ? data?.casetype[0]?.sub_case_type_name
                : ""
            }
            variant="view"
            documents={data?.documents || []}
            case_type={
              data?.casetype?.length > 0
                ? data?.casetype[0]?.case_type_name
                : ""
            }
            recovery_amount={
              data?.casetype?.length > 0
                ? data?.casetype[0]?.recovery_amount
                : ""
            }
          />
        </div>
      </ScrollArea>
    </div>
  );
}
