"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClaimantInfo } from "./claimant-info";
import { MagistrateCourtInfo } from "./magistrate-court-info";
import { CaseTypeInfo } from "./case-type-info";
import { CostAssessment, FilingDate } from "./case-assessment";

interface CaseOverviewProps {
  caseNumber: string;
  title: string;
  filedDate: string;
  filings: FilingDate[];
}

export function CaseOverview({
  caseNumber,
  title,
  filedDate,
  filings
}: CaseOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Case Header */}
      <div className="space-y-1 p-4 flex justify-between items-start">
        <div className="max-w-lg">
          <h1 className="text-base font-bold text-black truncate">{title}</h1>
          <div className="flex items-center justify-between text-sm font-medium">
            <span>{caseNumber}</span>
          </div>
        </div>
        <span>Filed on: {filedDate}</span>
      </div>
      <ScrollArea className="max-h-[calc(100dvh-300px)] overflow-y-auto rounded-md px-4">
        {/* Claimant Information */}
        <div className="space-y-6">
          <ClaimantInfo
            name="John Doe"
            email="johndoe@gmail.com"
            address="22 Maitama Close"
            phone="+23480123456"
          />
          {/* Magistrate Court Information */}
          <MagistrateCourtInfo
            division="kuje"
            district="Kuje District"
            magistrate="Adebayo Adekoya"
          />{" "}
          <CaseTypeInfo
            kind="Recovery Of Premise"
            type="Criminal"
            worth="Less than a million"
          />
          <CostAssessment filings={filings} />
        </div>
        {/* Case Type Information */}
      </ScrollArea>
    </div>
  );
}
