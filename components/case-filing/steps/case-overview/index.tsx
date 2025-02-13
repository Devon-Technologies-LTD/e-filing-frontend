import React from "react";
import CaseOverviewForm from "./form";

export default function CaseOverview() {
  return (
    <div className="lg:w-1/2 mr-10 space-y-10 overflow-y-scroll scrollbar-hide h-[calc(100vh-220px)]">
      <div className="space-y-8">
        <h2 className="text-sm font-bold text-neutral-500">
          Fields marked with an asterisk (*) are required.
        </h2>
        <CaseOverviewForm />
      </div>
    </div>
  );
}
