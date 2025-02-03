"use client";
import React from "react";
import { SingleCaseHeader } from "../_components/single-case-header";
import { CaseOverview } from "../_components/case_overview";
import { CaseUpdates } from "../_components/case-updates";
import { demoData } from "@/lib/dummy-data";


export default function SingleCasePage({ params }: { params: { id: string } }) {

  return (
    <div className="bg-zinc-100 ">
      <SingleCaseHeader params={params} />
      <div className="container py-4 grid grid-cols-12 gap-5">
        <div className="col-span-7 bg-white p-2">
          <CaseOverview {...demoData} />
        </div>
        <div className="col-span-5 bg-white p-2">
          <CaseUpdates />
        </div>
      </div>
    </div>
  );
}
